FROM python:3.12

# If true, serve the admin UI.
ARG SERVE_ADMIN_UI=True

# The Postgres database to connect to.
ARG DB=postgresql://dewydbuser:dewydbpwd@postgresql:5432/dewydb
ENV DB=${DB}

# Whether migrations should be applied to the database.
# ARG APPLY_MIGRATIONS=True

# The environment the application is running in.
ARG ENVIRONMENT=LOCAL
ENV ENVIRONMENT=${ENVIRONMENT}

# The OpenAI API Key to use for OpenAI models (if using OpenAI models).
ARG OPENAI_API_KEY
ENV OPENAI_API_KEY=${OPENAI_API_KEY}

# The path for caching artifacts used by LlamaIndex.
ARG LLAMA_INDEX_CACHE_DIR=None
ENV LLAMA_INDEX_CACHE_DIR=${LLAMA_INDEX_CACHE_DIR}

# The path for caching artifacts used by HuggingFace.
ARG HF_HOME=None
ENV HF_HOME=${HF_HOME}

RUN pip install --upgrade pip && pip install dewy

EXPOSE 8000

CMD [ "dewy" ]