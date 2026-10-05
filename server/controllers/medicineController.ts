import { type Request, type Response } from "express";
import Medicine from "../models/Medicine.ts";

export const getMedicines = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        let medicines = await Medicine.find({ userId }).sort({ createdAt: 1 });
        
        // Auto-seed if empty for demo purposes
        if (medicines.length === 0) {
            const seed = [
                { userId, name: 'Amoxicillin 500mg', time: '08:00 AM', status: 'pending' },
                { userId, name: 'Vitamin D3', time: '01:00 PM', status: 'pending' },
                { userId, name: 'Lisinopril 10mg', time: '08:00 PM', status: 'pending' }
            ];
            await Medicine.insertMany(seed);
            medicines = await Medicine.find({ userId }).sort({ createdAt: 1 });
        }

        res.json({ medicines });
    } catch (error) {
        res.status(500).json({ error: "Server error fetching medicines" });
    }
};

export const markTaken = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const { id } = req.params;
        const medicine = await Medicine.findOneAndUpdate(
            { _id: id, userId },
            { status: 'taken' },
            { new: true }
        );
        if (!medicine) return res.status(404).json({ error: "Medicine not found" });
        res.json({ medicine });
    } catch (error) {
        res.status(500).json({ error: "Server error updating medicine" });
    }
};
