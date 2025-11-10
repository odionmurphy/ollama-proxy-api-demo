// Documentation: https://github.com/ollama/ollama/blob/main/docs/api.md
/*
export async function processQuery(url, prompt) {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",},
    
    body: JSON.stringify({
      model: "llama3.2",
      messages: [
        { role: "system", content: "Answer with a short message." },
        { role: "user", content: prompt }
      ]
    }),
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const data = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const lines = decoder.decode(value, { stream: true }).split('\n');
    for (const line of lines) {
      if (line.trim()) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.done) continue;
          data.push(parsed.message?.content || parsed.response || '');
        } catch (error) {
          console.error("JSON parse error:", error);
        }
      }
    }
  }

  return data.join("");
}
*/


export async function processQuery(url, prompt) {
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gemma3:1b",                // ✅ Use your installed model
      prompt: "Answer briefly: " + prompt
    }),
  };

  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const data = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const lines = decoder.decode(value, { stream: true }).split("\n");
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const parsed = JSON.parse(line);
        if (parsed.response) data.push(parsed.response);
      } catch (err) {
        console.warn("Skipping malformed JSON:", line);
      }
    }
  }

  return data.join("");
}

