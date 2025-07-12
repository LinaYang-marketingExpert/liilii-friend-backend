import mongoose, { Schema } from "mongoose";
// import { v4 as uuidv4 } from "uuid";

const UserSchema = new Schema({
    telegramId: {
        type: String,
        required: true,
        unique: true
    }
}, {
  timestamps: true, 
})

export const userDB = mongoose.model("users", UserSchema);