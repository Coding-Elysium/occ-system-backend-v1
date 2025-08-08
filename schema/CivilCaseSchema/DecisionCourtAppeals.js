import mongoose from "mongoose";

const decisionCourtAppealSchema = mongoose.Schema({
  dateOfAppeal: {
    type: Date,
  },
  division: {
    type: String,
  },
  decision: {
    type: String,
  },
  finality: {
    type: String,
  },
  dateOfFinality: {
    type: Date,
  },
  case_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CivilCase",
    required: true,
  },
});

const SchemaDecisionCourtAppeal = mongoose.model(
  "DecisionCourtAppeal",
  decisionCourtAppealSchema
);

export default SchemaDecisionCourtAppeal;
