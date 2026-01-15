// Import required libraries
import express from "express";   
import cors from "cors";         
import dotenv from "dotenv";    

// Load values from .env file
dotenv.config();

// Create express app instance
const app = express();

// Enable CORS so frontend requests are allowed
app.use(cors());

// Allow backend to read JSON data sent from frontend
app.use(express.json());

/* -------------------------------------------------
   Local fallback logic (used when Gemini quota hits)
---------------------------------------------------*/
function extractKeywordsLocally(text) {
  // 1️⃣ Try sentence-based extraction
  let sentences = text
    .split(/[.?!]/)
    .map(s => s.trim())
    .filter(s => s.length >= 25 && s.length <= 140);

  if (sentences.length >= 2) {
    return sentences.slice(0, 3);
  }

  // 2️⃣ Fallback: split by commas (definitions / long sentences)
  let parts = text
    .split(",")
    .map(s => s.trim())
    .filter(s => s.length >= 25);

  if (parts.length >= 2) {
    return parts.slice(0, 3);
  }

  // 3️⃣ Ultimate fallback: return meaningful chunk
  return [text.trim().slice(0, 180)];
}
// API route to extract important highlights from text
app.post("/highlight", async (req, res) => {
  try {
   
    const { text } = req.body;

    // If text is empty or only spaces, return empty highlights
    if (!text || !text.trim()) {
      return res.json({ success: false, highlights: [] });
    }

    const prompt = `
You are an intelligent text highlighter.

Task:
- Identify ONLY the 2 or 3 MOST important ideas from the paragraph
- Rank importance mentally and choose the top ones only
- Prefer short PHRASES over full sentences
- If a sentence is used, it must be the MOST critical one
- Copy text EXACTLY from the paragraph
- Do NOT rewrite, summarize, or explain
- Do NOT include everything
- Output ONLY a JSON array of strings
- Maximum 3 items (never more)

Paragraph:
"""${text}"""
`;

    // Call Gemini API to process the text
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    // Convert Gemini response to JSON
    const data = await response.json();

    // Log full Gemini response for debugging
    console.log("GEMINI RESPONSE:", JSON.stringify(data, null, 2));

    /* ----------------------------------------------
       🔥 QUOTA / API FAILURE HANDLING (CRITICAL)
    -----------------------------------------------*/
    if (data?.error?.code === 429) {
      console.warn("Gemini quota exceeded. Using local fallback.");
      return res.json({
        success: true,
        highlights: extractKeywordsLocally(text)
      });
    }

    // Extract raw text output from Gemini response
    const rawText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // If no valid response text is found, fallback
    if (!rawText) {
      return res.json({
        success: true,
        highlights: extractKeywordsLocally(text)
      });
    }

    // Extract only the JSON array part from Gemini output
    const match = rawText.match(/\[[\s\S]*\]/);
    if (!match) {
      return res.json({
        success: true,
        highlights: extractKeywordsLocally(text)
      });
    }

    // Convert extracted JSON string into JavaScript array
    let highlights = JSON.parse(match[0]);

    // Safety check: limit highlights to maximum 3 items
    highlights = highlights.slice(0, 3);

    // Send final highlights back to frontend
    res.json({
      success: true,
      highlights
    });

  } catch (err) {
    
    console.error("SERVER ERROR:", err);

    // Final safety fallback (never break UI)
    res.json({
      success: true,
      highlights: extractKeywordsLocally(req.body.text || "")
    });
  }
});
app.get("/", (req, res) => {
  res.send("🚀 Smart Text Highlighter API is running!");
});

// Start backend server on port 5001
app.listen(5001, () => {
  console.log("Server running on 5001");
});
