import { type Request, type Response } from 'express';
import AuditLog from '../models/AuditLog.ts';

export const getAuditLogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const logs = await AuditLog.find().sort({ timestamp: -1 }).limit(50); // Get latest 50
        res.status(200).json({ success: true, logs });
    } catch (error) {
        console.error('Error in getAuditLogs:', error);
        res.status(500).json({ success: false, message: 'Server Error fetching logs' });
    }
};

export const deleteAuditLog = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await AuditLog.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Log deleted' });
    } catch (error) {
        console.error('Error in deleteAuditLog:', error);
        res.status(500).json({ success: false, message: 'Server Error deleting log' });
    }
};

export const deleteAllAuditLogs = async (req: Request, res: Response): Promise<void> => {
    try {
        await AuditLog.deleteMany({});
        res.status(200).json({ success: true, message: 'All logs deleted' });
    } catch (error) {
        console.error('Error in deleteAllAuditLogs:', error);
        res.status(500).json({ success: false, message: 'Server Error deleting all logs' });
    }
};
