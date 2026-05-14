import axios from "axios";

export const askGemma = async (message) => {

  try {

    const response = await axios.post(
      "https://integrate.api.nvidia.com/v1/chat/completions",
      {
        model: "google/gemma-3n-e4b-it",
        messages: [
          {
            role: "system",
            content:
              "You are a professional AI receptionist. Keep replies short and friendly.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.5,
        top_p: 0.7,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {

    console.log(
      "Gemma Error:",
      error.response?.data || error.message
    );

    return "Sorry, I am having trouble responding right now.";
  }
};