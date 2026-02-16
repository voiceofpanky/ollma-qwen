#!/bin/bash

ollama serve &

sleep 5

# Use a small model that fits Render Starter
ollama pull phi3:mini || true

node server.js