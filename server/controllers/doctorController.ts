import { type Request, type Response } from 'express';
import Doctor from '../models/Doctor.ts';

const seedDoctors = [
  {
    name: "Dr. Ananya Sharma",
    avatar: "female",
    specialty: "General Medicine",
    experience: "12 years exp.",
    rating: "4.9 ★",
    hospital: "City Central Healthcare",
    fee: "₹500",
    availability: "Mon - Sat (09:00 AM - 04:00 PM)"
  },
  {
    name: "Dr. Amitab Roy",
    avatar: "male",
    specialty: "Cardiology",
    experience: "18 years exp.",
    rating: "4.9 ★",
    hospital: "Heart & Vascular Institute",
    fee: "₹800",
    availability: "Mon - Fri (10:00 AM - 02:00 PM)"
  },
  {
    name: "Dr. Rajesh Varma",
    avatar: "male",
    specialty: "Neurology",
    experience: "15 years exp.",
    rating: "4.8 ★",
    hospital: "Neuro Care & Brain Clinic",
    fee: "₹750",
    availability: "Tue - Sat (11:00 AM - 05:00 PM)"
  },
  {
    name: "Dr. Vikram Sethi",
    avatar: "male",
    specialty: "Gastroenterology",
    experience: "10 years exp.",
    rating: "4.7 ★",
    hospital: "Digestive Health Specialty",
    fee: "₹600",
    availability: "Mon - Sat (02:00 PM - 07:00 PM)"
  },
  {
    name: "Dr. Sneha Kapoor",
    avatar: "female",
    specialty: "Dermatology",
    experience: "9 years exp.",
    rating: "4.8 ★",
    hospital: "Skin & Laser Center",
    fee: "₹550",
    availability: "Mon - Fri (10:00 AM - 03:00 PM)"
  },
  {
    name: "Dr. Priya Nair",
    avatar: "female",
    specialty: "ENT Specialist",
    experience: "11 years exp.",
    rating: "4.9 ★",
    hospital: "ENT & Allergy Clinic",
    fee: "₹500",
    availability: "Mon - Sat (09:30 AM - 01:30 PM)"
  },
  {
    name: "Dr. Sanjay Gupta",
    avatar: "male",
    specialty: "Orthopedics",
    experience: "14 years exp.",
    rating: "4.8 ★",
    hospital: "Bone & Joint Super Specialty",
    fee: "₹700",
    availability: "Mon - Sat (11:00 AM - 04:00 PM)"
  },
  {
    name: "Dr. Meera Joshi",
    avatar: "female",
    specialty: "Ophthalmology",
    experience: "8 years exp.",
    rating: "4.7 ★",
    hospital: "Vision Care Eye Hospital",
    fee: "₹500",
    availability: "Tue - Sun (10:00 AM - 02:00 PM)"
  }
];

export const getDoctors = async (req: Request, res: Response): Promise<void> => {
  try {
    let doctors = await Doctor.find({});
    
    // Automatically seed data if the collection is empty
    if (doctors.length === 0) {
      await Doctor.insertMany(seedDoctors);
      doctors = await Doctor.find({});
    }
    
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
