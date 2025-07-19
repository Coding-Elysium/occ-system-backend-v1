import mongoose from "mongoose";

const decisionCourtAppealSchema = mongoose.Schema({
  division: {
    type: String,
  },
  dateOfAppeal: {
    type: Date,
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
