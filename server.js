import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ollama URL (internal)
const OLLAMA_URL = "http://localhost:11434";

// Health check for Render
app.get("/health", (req, res) => {
  res.json({ status: "ok", upstream: OLLAMA_URL });
});

// FIXED: /api/tags route
app.get("/api/tags", async (req, res) => {
  try {
    const response = await axios.get(`${OLLAMA_URL}/api/tags`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate
app.post("/api/generate", async (req, res) => {
  const { prompt, model = "phi3:mini" } = req.body;

  try {
    const response = await axios.post(`${OLLAMA_URL}/api/generate`, {
      model,
      prompt,
      stream: false,
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Chat
app.post("/api/chat", async (req, res) => {
  const { messages, model = "phi3:mini" } = req.body;

  try {
    const response = await axios.post(`${OLLAMA_URL}/api/chat`, {
      model,
      messages,
      stream: false,
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Node proxy listening on port ${PORT}`);
  console.log(`Using Ollama at: ${OLLAMA_URL}`);
});
