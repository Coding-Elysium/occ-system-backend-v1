import mongoose from "mongoose";
import Counter from "./CounterSchema.js";

const civilCaseSchema = mongoose.Schema({
  bookNumber: {
    type: String,
    required: true,
    unique: true,
  },
  docketNumber: {
    type: Number,
    unique: true,
  },
  petitioner: {
    type: String,
    required: true,
  },
  respondents: {
    type: [String],
    required: true,
  },
  nature: {
    type: String,
    required: true,
  },
});

civilCaseSchema.pre("save", async function (next) {
  if (this.isNew && !this.docketNumber) {
    const counter = await Counter.findOneAndUpdate(
      { id: "docketNumber" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.docketNumber = counter.seq;
  }
  next();
});

const CivilCase = mongoose.model("CivilCase", civilCaseSchema);

export default CivilCase;
