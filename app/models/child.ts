import mongoose, { Document, Schema, Model } from "mongoose";
import { IParent } from "./parent";

export interface IChild extends Document {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    parentId: mongoose.Types.ObjectId | IParent;
    createdAt?: Date;
    updatedAt?: Date;
}

const childSchema = new Schema<IChild>(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        dateOfBirth: { type: Date, required: true },
        parentId: {
            type: Schema.Types.ObjectId,
            ref: "Parent",
            required: true,
            index: true
        }
    },
    { timestamps: true }
);

// Add compound index for querying children by parent
childSchema.index({ parentId: 1, lastName: 1, firstName: 1 });

export const Child: Model<IChild> = mongoose.models.Child || mongoose.model<IChild>("Child", childSchema);
