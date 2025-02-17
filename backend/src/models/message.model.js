import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    // Clerk user ID
    senderId: {
      type: String,
      required: true,
    },
    // Clerk user ID
    receiverId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
