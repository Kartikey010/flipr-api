import mongoose from "mongoose"

 const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export const notesModal = mongoose.model("Note", NoteSchema);