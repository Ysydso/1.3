FROM mcr.microsoft.com/playwright:v1.40.1-jammy AS e2e

# Set a non-root user for running the container
USER playwright


RUN corepack enable

COPY package.json .
RUN pnpm install --ignore-scripts

COPY package.json .
COPY <path_to_necessary_files> .
