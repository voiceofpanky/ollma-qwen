#!/bin/bash

# Start Ollama server in background
ollama serve &

# Give Ollama time to boot
sleep 5

# Pull Qwen3 model
ollama pull qwen3:8b || true

# Start Node server
node server.js