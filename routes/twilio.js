import express from "express";

const router = express.Router();

router.all("/voice", (req, res) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">
    Hello. Your AI calling agent is now working successfully.
  </Say>
</Response>`;

  res.set("Content-Type", "text/xml");
  res.send(xml);
});

export default router;