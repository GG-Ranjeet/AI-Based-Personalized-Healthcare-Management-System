import mongoose from "mongoose";

const ChatSessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },
    title: { type: String, default: null }, // Optional custom title
    isPinned: { type: Boolean, default: false },
    history: { type: Array, default: [] }, // Stores the Gemini history array directly
    updatedAt: { type: Date, default: Date.now }
});

const ChatSession = mongoose.model("ChatSession", ChatSessionSchema);

export const chatSession = {
    async findSessionHistory(sessionId: string) {
        const session = await ChatSession.findOne({ sessionId }).lean();
        return session ? session.history : null;
    },
    async updateSessionHistory(sessionId: string, history: any[]) {
        const session = await ChatSession.findOneAndUpdate(
            { sessionId },
            {
                history,
                updatedAt: new Date()
            },
            { upsert: true, new: true } // Create a new document if it doesn't exist
        ).lean();
        return session;
    },
    async getAllSessions() {
        return await ChatSession.find({}, { sessionId: 1, title: 1, isPinned: 1, updatedAt: 1, history: 1 })
            .sort({ isPinned: -1, updatedAt: -1 }) // Pinned first, then newest
            .lean();
    },
    async deleteSession(sessionId: string) {
        return await ChatSession.findOneAndDelete({ sessionId });
    },
    async renameSession(sessionId: string, title: string) {
        return await ChatSession.findOneAndUpdate(
            { sessionId },
            { title, updatedAt: new Date() },
            { new: true }
        );
    },
    async pinSession(sessionId: string, isPinned: boolean) {
        return await ChatSession.findOneAndUpdate(
            { sessionId },
            { isPinned, updatedAt: new Date() },
            { new: true }
        );
    }
}