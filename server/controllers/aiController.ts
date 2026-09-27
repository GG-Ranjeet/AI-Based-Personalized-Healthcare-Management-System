import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { chatSession } from "../models/chatSession.ts";

dotenv.config();

const ai = new GoogleGenAI();

const startNewChat = async (req: express.Request, res: express.Response) => {
    if (!req.body || !req.body.userMessage) {
        return res.status(400).json({ error: "Missing userMessage in request body" });
    }
    const { userMessage } = req.body;
    console.log(`User: ${userMessage}`);

    // Create a new chat session with an empty history
    const chat = ai.chats.create({
        model: "gemini-3.6-flash",
        history: []
    });

    // Send the initial message
    const response = await chat.sendMessage({ message: userMessage });
    const updatedHistory = await chat.getHistory();

    // Generate a unique session ID (you can use any method you prefer)
    const sessionId = `session_${Date.now()}`;
    await chatSession.updateSessionHistory(sessionId, updatedHistory);
    console.log(`Sweta: ${response.text}`);
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
        history: savedHistory
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

export { startNewChat, continueChat, getSessions, getSessionHistory };