export async function sendMessage(message) {
  try {
    const response = await fetch('https://your-colab-fastapi-url.com/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from API');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending message:', error);
    return "I'm sorry, I'm having trouble connecting to the server. Please try again later.";
  }
}

// Mock function for development - replace with actual implementation
export function getMockResponse(message) {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        resolve("Hello! I'm MediChat, your medical AI assistant. How can I help you today?");
      } else if (message.toLowerCase().includes('headache')) {
        resolve("Headaches can be caused by various factors including stress, dehydration, lack of sleep, or more serious conditions. How long have you been experiencing this symptom? Any other symptoms accompanying it?");
      } else if (message.toLowerCase().includes('fever')) {
        resolve("A fever is often a sign that your body is fighting an infection. It's generally considered a fever when your temperature is 100.4°F (38°C) or higher. Are you experiencing any other symptoms alongside the fever?");
      } else {
        resolve("Thank you for sharing that information. While I can provide general medical information, I recommend consulting with a healthcare professional for personalized medical advice. Is there anything specific you'd like to know about this condition?");
      }
    }, 1000);
  });
}