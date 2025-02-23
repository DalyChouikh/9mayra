import mongoose, { Document, Schema, Model } from "mongoose";
import { IChild } from "./child";

export interface IParent extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    location: string;
    phone: string;
    children: mongoose.Types.ObjectId[] | IChild[];
    createdAt?: Date;
    updatedAt?: Date;
}

const parentSchema = new Schema<IParent>(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: { type: String, required: true },
        location: { type: String, required: true },
        phone: { type: String, required: true },
        children: [{ type: Schema.Types.ObjectId, ref: "Child" }],
    },
    { timestamps: true }
);

// Add indexes for better query performance
parentSchema.index({ email: 1 });
parentSchema.index({ phone: 1 });

export const Parent: Model<IParent> = mongoose.models.Parent || mongoose.model<IParent>("Parent", parentSchema);