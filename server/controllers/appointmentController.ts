import { type Request, type Response } from 'express';
import Appointment from '../models/Appointment.ts';

export const getAppointments = async (req: Request | any, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId || req.user?.id;
        const appointments = await Appointment.find({ patientId: userId, status: { $ne: 'Cancelled' } }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createAppointment = async (req: Request | any, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId || req.user?.id;
        const { doctorId, doctorName, specialty, hospital, date, time, reason, doctorAvatar } = req.body;

        const newAppointment = new Appointment({
            patientId: userId,
            doctorId,
            doctorName,
            specialty,
            hospital,
            date,
            time,
            reason,
            doctorAvatar
        });

        await newAppointment.save();
        res.status(201).json({ success: true, appointment: newAppointment });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const cancelAppointment = async (req: Request | any, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId || req.user?.id;
        const { id } = req.params;

        const appointment = await Appointment.findOneAndUpdate(
            { _id: id, patientId: userId },
            { status: 'Cancelled' },
            { new: true }
        );

        if (!appointment) {
            res.status(404).json({ success: false, message: 'Appointment not found' });
            return;
        }

        res.status(200).json({ success: true, message: 'Appointment cancelled', appointment });
    } catch (error) {
        console.error('Error cancelling appointment:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
