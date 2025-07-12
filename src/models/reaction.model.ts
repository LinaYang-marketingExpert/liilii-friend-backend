import mongoose, { Schema } from "mongoose";

const AnimalSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    date: {
        type: String, 
        required: true,
    },
    emotion: {
        type: String, 
        required: true,
    },
    reaction: {
        type: String,
        enum: ['love', 'funny', 'cool'],
        required: true,
    },
    messageId: {
        type: Number, 
    },
}, {
    timestamps: true,
});

export const reactionDB = mongoose.model("reactions", AnimalSchema);
