import express from "express";

const router = express.Router();

router.all("/voice", (req, res) => {

  console.log("Twilio request received");

  res.set("Content-Type", "text/xml");

  res.send(`
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice">
        Hello. Your AI calling agent is now working successfully.
    </Say>
</Response>
  `);
});

export default router;