import express from "express";

const router = express.Router();

router.post("/speech", async (req, res) => {
  try {
    res.json({
      transcript: "Speech recognition endpoint ready",
    });
  } catch (error) {
    res.status(500).json({
      error: "Speech recognition failed",
    });
  }
});

export default router;