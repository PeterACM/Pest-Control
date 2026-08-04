import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini AI SDK
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", business: "Pest Free Services Durban" });
});

// Live Chat API route powered by Gemini AI
app.post("/api/chat", async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const systemInstruction = `You are representing Pest Free Services (trading as Grant's Pest Free Services) in Durban, South Africa.
Your company offers P36112 Department of Agriculture licensed pest control and sub-contracted timber repairs across greater Durban (Umbilo, Morningside, North Beach, Umhlanga, Westville, Musgrave, etc.).
Key company highlights:
- Licensing: P36112 Department of Agriculture licensed.
- Specialty: Wood-borer and termite treatment using products registered with the Department of Agriculture as an effective alternative to fumigation. An initial on-site property assessment is compulsory to determine timber accessibility.
- 14+ years in business (since April 2011), served 650+ Durban households.
- Broad pest coverage: Wood-borer, cockroaches (gel baiting + cleanliness partnership), ants, bed bugs, dust mites, mosquitoes, snake relocation, gecko control.
- Timber Repairs: We dispatch trusted sub-contractors for roof, door, window, and floor timber replacement.
- Business Details: CC Reg B2011063958, Address: 24 Kensington Gardens, Umbilo, Durban, 4001. Landline: 031 205 3371, Email: pestfreeservice@gmail.com.

Your tone should be warm, friendly, authoritative, reassuring, professional, and uniquely Durban-focused.
Answer user questions concisely, emphasize that an initial on-site property assessment is compulsory, explain pricing requires an assessment, and encourage users to use the online booking system to request an assessment, call 031 205 3371, or email pestfreeservice@gmail.com.`;

    if (process.env.GEMINI_API_KEY) {
      try {
        const chatPrompt = conversationHistory && Array.isArray(conversationHistory)
          ? conversationHistory.map((h: any) => `${h.role === 'user' ? 'User' : 'Pest Free Services'}: ${h.text}`).join('\n') + `\nUser: ${message}`
          : message;

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: chatPrompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const reply = response.text || "Thank you for reaching out to Pest Free Services! How can we assist with your pest or borer concerns in Durban today?";
        return res.json({ reply });
      } catch (geminiError) {
        console.error("Gemini API Error:", geminiError);
      }
    }

    // Smart fallback if API key is not yet set or encounters an issue
    let fallbackReply = "Hello! Welcome to Pest Free Services in Durban. ";
    const msgLower = message.toLowerCase();

    if (msgLower.includes("borer") || msgLower.includes("wood")) {
      fallbackReply += "We specialize in registered wood-borer control using Department of Agriculture registered chemical products as an effective alternative to fumigation. An on-site property assessment is required to check timber accessibility. Would you like to request an assessment?";
    } else if (msgLower.includes("tent") || msgLower.includes("fumigat")) {
      fallbackReply += "Our treatment is an effective alternative to fumigation using registered products. An on-site assessment is compulsory to ascertain whether the alternative to fumigation is possible for your property structure.";
    } else if (msgLower.includes("quote") || msgLower.includes("cost") || msgLower.includes("price") || msgLower.includes("free")) {
      fallbackReply += "We do not offer free quotes over the phone as treatments vary by property structure. An on-site property assessment is necessary. You can use our online form right here to request an assessment!";
    } else if (msgLower.includes("snake") || msgLower.includes("emergency")) {
      fallbackReply += "For urgent snake or gecko control in Durban, please keep a safe distance and call us directly at 031 205 3371 or request an urgent slot on our booking page.";
    } else {
      fallbackReply += "We cover wood-borer, cockroaches, ants, bed bugs, dust mites, mosquitoes, snakes, geckos, and sub-contracted timber repairs across Durban. How can we assist you today?";
    }

    return res.json({ reply: fallbackReply });
  } catch (err: any) {
    console.error("Server Error in /api/chat:", err);
    res.status(500).json({ error: "Failed to process chat message" });
  }
});

// Booking submission API endpoint
app.post("/api/bookings", (req, res) => {
  const booking = req.body;
  const reference = `PFS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  res.json({
    success: true,
    reference,
    message: "Booking received successfully! Grant will contact you shortly to confirm the appointment.",
    booking: { ...booking, reference },
  });
});

// Contact inquiry submission API endpoint
app.post("/api/contact", (req, res) => {
  res.json({
    success: true,
    message: "Thank you for contacting Pest Free Services Durban. Grant Arnold will respond to your message shortly.",
  });
});

// Vite Middleware setup for dev vs production
async function startServer() {
  // Explicitly serve static assets from the public directory
  app.use(express.static(path.join(process.cwd(), "public")));
  app.use("/public", express.static(path.join(process.cwd(), "public")));

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Pest Free Services app running on http://localhost:${PORT}`);
  });
}

startServer();
