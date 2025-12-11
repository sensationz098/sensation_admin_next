import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["ADMIN", "STAFF", "STUDENT"],
    default: "STUDENT",
  }
}, { timestamps: true });

export const User = models.User || model("User", UserSchema);
