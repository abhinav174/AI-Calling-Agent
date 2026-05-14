import express from "express";

const router = express.Router();

router.post("/tts", async (req, res) => {
  try {
    res.json({
      message: "TTS endpoint ready",
    });
  } catch (error) {
    res.status(500).json({
      error: "TTS failed",
    });
  }
});

export default router;