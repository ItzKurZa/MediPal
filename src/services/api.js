import axios from 'axios';

export async function sendMessage(userMessage) {
  try {
    const messageContent = typeof userMessage === 'object' ? userMessage.content : userMessage;

    const response = await axios.post(
      'https://puma-verified-marmoset.ngrok-free.app/api/chat',
      { prompt: messageContent },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.response;
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
    return "I'm sorry, I'm having trouble connecting to the server. Please try again later.";
  }
}

// Keeping getMockResponse for fallback if needed
export function getMockResponse(message) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        resolve("Hello! I'm MediPal, your medical AI assistant. How can I help you today?");
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