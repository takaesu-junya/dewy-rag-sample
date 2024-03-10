# Let's create Dewy CLI Tool

The tutorial:
https://dewykb.github.io/docs/Examples/langchain.js/

# Notes
## How to start application
- Start dev container
- Inside the dev container, do docker build with argument of OPENAI API KEY for python container and typescript container

## Roles for each containers:
- python
    - Running dewy the vector db
- typescript
    - Dewy client providing cli interface for user
- postgresql
    - backend for dewy which contains actual data for dewy to retrieve

