// OpenAI Hello World Example
// Replace 'YOUR_API_KEY' with your actual OpenAI API key
async function chatWithOpenAI(userMessage) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY" // <--- Replace with your actual API key!
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }]
    })
  });
  let data;
  try {
    data = await response.json();
  } catch (e) {
    throw new Error('Could not parse response from OpenAI API.');
  }
  if (!response.ok) {
    // OpenAI error responses have an 'error' field
    const errMsg = data && data.error && data.error.message ? data.error.message : response.status + ' ' + response.statusText;
    throw new Error('OpenAI API error: ' + errMsg);
  }
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    throw new Error('Unexpected API response structure: ' + JSON.stringify(data));
  }
  return data.choices[0].message.content;
}

// DOM elements
const input = document.getElementById('user-input');
const button = document.getElementById('send-btn');
const output = document.getElementById('output');

button.addEventListener('click', async () => {
  const userMessage = input.value.trim();
  if (!userMessage) return;
  output.textContent = 'Thinking...';
  try {
    const aiResponse = await chatWithOpenAI(userMessage);
    output.textContent = aiResponse;
  } catch (err) {
    output.textContent = 'Error: ' + (err.message || err);
  }
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') button.click();
}); 