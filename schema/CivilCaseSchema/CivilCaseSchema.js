import mongoose from "mongoose";
import { capitalizeFirstLetter } from "../../helper/helper.js";

const civilCaseSchema = mongoose.Schema({
  docketNumber: {
    type: String,
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
  description: {
    type: String,
  },
  branch: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "withdrawn", "dismissed", "archived", "appealed case"],
  },
});

civilCaseSchema.pre("save", async function (next) {
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
