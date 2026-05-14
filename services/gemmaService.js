import axios from "axios";

export const askGemma = async (message) => {
  const response = await axios.post(
    "https://integrate.api.nvidia.com/v1/chat/completions",
    {
      model: "google/gemma-3n-e4b-it",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 200,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
};