import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { formatDocumentsAsString } from "langchain/util/document";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";

import { Dewy } from 'dewy-ts';
import { DewyRetriever } from 'dewy-langchainjs';

import { success, error } from '../utils/colors';

export async function query(question: string, options: { collection: string, dewyEndpoint: string, openaiApiKey: string; }): Promise<void> {
    console.log(success(`Querying ${options.collection} collection for: "${question}"`));

    try {
        const model = new ChatOpenAI({
            openAIApiKey: options.openaiApiKey
        });
        const dewy = new Dewy({
            BASE: options.dewyEndpoint
        });

        const retriever = new DewyRetriever({ dewy, collection: options.collection });

        const prompt = PromptTemplate.fromTemplate(`Answer the question base only on the following context:
        {context}
        
        Question: {question}`);

        const chain = RunnableSequence.from([
            {
                context: retriever.pipe(formatDocumentsAsString),
                question: new RunnablePassthrough()
            },
            prompt,
            model,
            new StringOutputParser()
        ]);

        const stream = await chain.streamLog(question);

        console.log("Answer:");
        for await (const chunk of stream) {
            if (chunk.ops?.length > 0 && chunk.ops[0].op === 'add') {
                const addOp = chunk.ops[0];
                if (
                    addOp.path.startsWith("/logs/ChatOpenAI") &&
                    typeof addOp.value === 'string' &&
                    addOp.value.length
                ) {
                    process.stdout.write(addOp.value);
                }
            }
        }

    } catch (err: any) {
        console.error(error(`Failed to query: ${err.message}`));
        console.error(options);
    }
}

