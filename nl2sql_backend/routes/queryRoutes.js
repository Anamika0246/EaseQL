const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/query", async (req, res) => {
  const { query, table } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are an SQL expert." },
          { role: "user", content: `Convert this to SQL: ${query} for table ${table}` }
        ],
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    res.json({ sql: response.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate SQL" });
  }
});

module.exports = router;
