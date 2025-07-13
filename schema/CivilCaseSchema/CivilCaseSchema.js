import mongoose from "mongoose";
import Counter from "./CounterSchema.js";
import { capitalizeFirstLetter } from "../../helper/helper.js";

const civilCaseSchema = mongoose.Schema({
  bookNumber: {
    type: String,
    unique: true,
  },
  docketNumber: {
    type: Number,
    unique: true,
  },
  petitioner: {
    type: [String],
  },
  respondents: {
    type: [String],
  },
  nature: {
    type: String,
  },
  status: {
    type: String,
    enum: ["-----", "withdrawn", "dismissed", "archived", "appealed case"],
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

  if (this.nature) {
    this.nature = capitalizeFirstLetter(this.nature);
  }

  if (this.status) {
    this.status = capitalizeFirstLetter(this.status);
  }

  next();
});

const CivilCase = mongoose.model("CivilCase", civilCaseSchema);

export default CivilCase;
