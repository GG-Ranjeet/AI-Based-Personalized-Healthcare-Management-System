import mongoose, { Document, Schema } from 'mongoose';

export interface IAppointment extends Document {
  patientId: Schema.Types.ObjectId;
  doctorId: string;
  doctorName: string;
  doctorAvatar?: string;
  specialty: string;
  hospital: string;
  date: string;
  time: string;
  reason: string;
  status: 'Confirmed' | 'Cancelled' | 'Completed';
  createdAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: String, required: true },
  doctorName: { type: String, required: true },
  doctorAvatar: { type: String },
  specialty: { type: String, required: true },
  hospital: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Confirmed', 'Cancelled', 'Completed'], default: 'Confirmed' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IAppointment>('Appointment', AppointmentSchema);
