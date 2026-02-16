FROM ollama/ollama:latest

# Install Node.js
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

COPY start.sh /start.sh
RUN chmod +x /start.sh

ENTRYPOINT ["/bin/bash", "/start.sh"]