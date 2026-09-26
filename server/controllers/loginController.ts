import { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import Patient from '../models/Patients.ts';
import type { CustomRequest } from '../customInterfaces.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ success: false, message: 'Email and password fields are required' });
            return;
        }

        const patient = await Patient.findOne({ email }).select('+password');
        if (!patient) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        const isMatch = await bcrypt.compare(password, patient.password);

        if (!isMatch) {
            res.status(400).json({ success: false, message: 'Invalid Credentials' });
            return;
        }

        const payload = {
            userId: patient._id,
            userName: patient.name,
            email: patient.email,
            role: patient.role,
        };
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const accessToken = jwt.sign(
            payload,
            secret,
            { expiresIn: "15m" }
        );
        const refreshToken = jwt.sign(
            payload,
            secret,
            { expiresIn: "7d" }
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ success: true, message: 'Login successful', patient: payload, token: accessToken });

    } catch (error) {
        console.error('Error in loginController:', error);
    }
}
