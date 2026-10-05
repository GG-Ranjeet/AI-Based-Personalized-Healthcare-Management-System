import { type Request, type Response } from 'express';
import Patient from '../models/Patients.ts';
import crypto from 'crypto';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await Patient.find().sort({ createdAt: -1 }).lean();
        
        const usersWithAvatar = users.map(user => {
            const email = (user.email || "").toLowerCase().trim();
            const hash = crypto.createHash('md5').update(email).digest('hex');
            return {
                ...user,
                avatarUrl: `https://www.gravatar.com/avatar/${hash}?d=identicon`
            };
        });

        res.status(200).json({ success: true, users: usersWithAvatar });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Server error fetching users' });
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, role, department, status, password } = req.body;
        
        // Use default password if not provided
        const userPassword = password || 'Password123!';

        const newUser = new Patient({
            name,
            email,
            role,
            department: department || 'General',
            status: status || 'Active',
            password: userPassword
        });

        await newUser.save();
        res.status(201).json({ success: true, user: newUser });
    } catch (error: any) {
        console.error('Error creating user:', error);
        res.status(500).json({ success: false, message: error.message || 'Server error creating user' });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedUser = await Patient.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedUser) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: 'Server error updating user' });
    }
};
