import mongoose, { Schema, type InferSchemaType } from "mongoose";

const MedicineSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        time: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'taken'],
            default: 'pending'
        }
    },
    {
        timestamps: true
    }
);

export type IMedicine = InferSchemaType<typeof MedicineSchema>;
const Medicine = mongoose.models.Medicine || mongoose.model('Medicine', MedicineSchema);

export default Medicine;
