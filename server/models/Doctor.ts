import mongoose, { Document, Schema } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  avatar: string;
  specialty: string;
  experience: string;
  rating: string;
  hospital: string;
  fee: string;
  availability: string;
}

const DoctorSchema = new Schema<IDoctor>({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: String, required: true },
  rating: { type: String, required: true },
  hospital: { type: String, required: true },
  fee: { type: String, required: true },
  availability: { type: String, required: true }
});

export default mongoose.model<IDoctor>('Doctor', DoctorSchema);
