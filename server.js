/*import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';
import { processQuery } from './processQuery.js';

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/prompt', async (req, res) => {
    const { prompt } = req.body;
      const localOllamaURL = "http://localhost:11434/api/generate";
      const message = await processQuery(localOllamaURL, prompt);
   
    processQuery(localOllamaURL, prompt)
        .then(message => res.json({ message }))
        .catch(error => res.status(500).json({ message: "Malfunction! " + error.message }));
});

app.use((req, res) => {
    res.sendStatus(404);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});  */


import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { processQuery } from './processQuery.js';

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/prompt', async (req, res) => {
  try {
    const { prompt } = req.body;
    const localOllamaURL = "http://localhost:11434/api/generate";

    // Call processQuery only ONCE
    const message = await processQuery(localOllamaURL, prompt);

    // Return proper JSON to the frontend
    res.json({ message });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Malfunction! " + error.message });
  }
});

app.use((req, res) => {
  res.sendStatus(404);
});

const port = 3000;
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
