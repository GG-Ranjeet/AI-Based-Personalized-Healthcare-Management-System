import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { chatSession } from "../models/chatSession.ts";

dotenv.config();

const ai = new GoogleGenAI();

const AI_SYSTEM_INSTRUCTION = `
You are a Personalized Healthcare Recommendation Assistant. Your goal is to analyze the user's symptoms, estimate risk, and recommend the appropriate medical care.

When a user describes their symptoms, structure your response as follows:

### 🩺 Symptom Analysis
Briefly explain what might be causing these symptoms based on the information provided.

### ⚠️ Risk Assessment
Classify the risk level as **Low**, **Moderate**, or **High (Emergency)**. Briefly state why.

### 🏥 Recommended Department
Specify the type of doctor or department the user should consult (e.g., General Physician, Dermatologist, Orthopedist, Emergency Room).

### 🩹 Immediate First-Aid / Home Care
Provide safe, generic, over-the-counter or home care advice to manage discomfort while waiting for professional care.

### ❓ Clarifying Questions
Ask 1-3 short follow-up questions to help narrow down the possibilities if needed.

Formatting rules:
- Always respond using standard Markdown.
- Use ### for section headings.
- Use **bold text** for important terms.
- Use - for bullet points.
- Use numbered lists when appropriate.
- Use blank lines between paragraphs and sections.
- Do NOT use HTML tags such as <br>, <strong>, <p>, or <div>.
- Do NOT escape Markdown characters.
- Do NOT wrap the response in a Markdown code block.
`.trim();

const startNewChat = async (req: express.Request, res: express.Response) => {
    if (!req.body || !req.body.userMessage) {
        return res.status(400).json({ error: "Missing userMessage in request body" });
    }
    const { userMessage } = req.body;
    console.log(`User: ${userMessage}`);

    // Create a new chat session with an empty history
    const chat = ai.chats.create({
        model: "gemini-3.6-flash",
        history: [],
        config: {
            systemInstruction: AI_SYSTEM_INSTRUCTION
        }
    });

    // Send the initial message
    const response = await chat.sendMessage({ message: userMessage });
    const updatedHistory = await chat.getHistory();

    // Generate a unique session ID (you can use any method you prefer)
    const sessionId = `session_${Date.now()}`;
    await chatSession.updateSessionHistory(sessionId, updatedHistory);
    // console.log(`Sweta: ${response.text}`);
    res.json({ sessionId, reply: response.text, updatedHistory });
}

const continueChat = async (req: express.Request, res: express.Response) => {
    const sessionId = Array.isArray(req.params.sessionId)
        ? req.params.sessionId[0]
        : req.params.sessionId;
    console.log(req.body);
    const { userMessage } = req.body;

    // Fetch the history array previously saved for this specific session ID
    const savedHistory = await chatSession.findSessionHistory(sessionId) || [];

    // Re-create the chat session with that history
    const chat = ai.chats.create({
        model: "gemini-3.6-flash",
        history: savedHistory,
        config: {
            systemInstruction: AI_SYSTEM_INSTRUCTION
        }
    });

    // Send the new message
    const response = await chat.sendMessage({ message: userMessage });

    // Extract the newly updated history (which now includes the latest exchange)
    const updatedHistory = await chat.getHistory();
    

    // Save the updated history array back to your database
    await chatSession.updateSessionHistory(sessionId, updatedHistory);

    res.json({ reply: response.text });
}

const getSessions = async (req: express.Request, res: express.Response) => {
    const sessions = await chatSession.getAllSessions();
    res.json({ sessions });
}

const getSessionHistory = async (req: express.Request, res: express.Response) => {
    const sessionId = Array.isArray(req.params.sessionId)
        ? req.params.sessionId[0]
        : req.params.sessionId;
    const history = await chatSession.findSessionHistory(sessionId);
    res.json({ history });
}

const deleteSession = async (req: express.Request, res: express.Response) => {
    const sessionId = req.params.sessionId as string;
    await chatSession.deleteSession(sessionId);
    res.json({ success: true, message: "Session deleted" });
}

const renameSession = async (req: express.Request, res: express.Response) => {
    const sessionId = req.params.sessionId as string;
    const { title } = req.body;
    await chatSession.renameSession(sessionId, title);
    res.json({ success: true, message: "Session renamed" });
}

const pinSession = async (req: express.Request, res: express.Response) => {
    const sessionId = req.params.sessionId as string;
    const { isPinned } = req.body;
    await chatSession.pinSession(sessionId, isPinned);
    res.json({ success: true, message: "Session pin status updated" });
}

export { startNewChat, continueChat, getSessions, getSessionHistory, deleteSession, renameSession, pinSession };