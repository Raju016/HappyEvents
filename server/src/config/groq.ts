import './env'; // makes sure .env has been loaded

// Read at call time (not import time) so tests and restarts pick up changes.
export const getGroqConfig = () => ({
  apiKey: (process.env.GROQ_API_KEY || '').trim(),
  // Configurable on purpose. Verify the id against https://console.groq.com/docs/models
  model: (process.env.GROQ_MODEL || 'llama-3.3-70b-versatile').trim(),
  timeoutMs: Number(process.env.GROQ_TIMEOUT_MS) || 20000,
});

export const isGroqConfigured = () => {
  const { apiKey } = getGroqConfig();
  return apiKey.length > 0 && !apiKey.toLowerCase().includes('your_groq_api_key');
};
