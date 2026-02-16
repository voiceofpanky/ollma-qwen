#!/bin/bash

ollama serve &

sleep 5

ollama pull qwen2:0.5b || true

node server.js