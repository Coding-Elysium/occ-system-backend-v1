import mongoose from "mongoose";

const decisionSecondLevelSchema = mongoose.Schema({
  decision: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: "N/A"
  },
  case_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CivilCase",
    required: true,
  },
});

const SchemaDecisionSecondLevel = mongoose.model(
  "DecisionSecondLevel",
  decisionSecondLevelSchema
);

export default SchemaDecisionSecondLevel;
