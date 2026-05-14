import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

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

    const reply = response.data.choices[0].message.content;

    res.json({
      reply,
    });
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

export default router;