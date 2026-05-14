// import express from "express";

// const router = express.Router();

// router.all("/voice", (req, res) => {
//   res.set("Content-Type", "text/xml");

//   res.send('<?xml version="1.0" encoding="UTF-8"?><Response><Say voice="alice">Hello. Your AI calling agent is now working successfully.</Say></Response>');
// });

// export default router;
import express from "express";
import { askGemma } from "../services/gemmaService.js";

const router = express.Router();

router.post("/voice", async (req, res) => {

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather
        input="speech"
        action="/api/process-speech"
        method="POST"
        speechTimeout="auto"
        speechModel="phone_call"
    >
        <Say voice="alice">
            Hello. Welcome to our AI receptionist. How may I help you today?
        </Say>
    </Gather>
</Response>`;

  res.set("Content-Type", "text/xml");
  res.send(xml);
});

router.post("/process-speech", async (req, res) => {

  try {

    const userSpeech =
      req.body.SpeechResult || "I could not hear anything";

    console.log("Caller:", userSpeech);

    const aiReply = await askGemma(userSpeech);

    console.log("AI:", aiReply);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather
        input="speech"
        action="/api/process-speech"
        method="POST"
        speechTimeout="auto"
        speechModel="phone_call"
    >
        <Say voice="alice">
            ${aiReply}
        </Say>
    </Gather>
</Response>`;

    res.set("Content-Type", "text/xml");
    res.send(xml);

  } catch (error) {

    console.log(error);

    const errorXml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice">
        Sorry, something went wrong.
    </Say>
</Response>`;

    res.set("Content-Type", "text/xml");
    res.send(errorXml);
  }
});

export default router;