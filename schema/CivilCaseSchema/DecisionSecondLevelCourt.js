import mongoose from "mongoose";

const decisionSecondLevelSchema = mongoose.Schema({
  decision: {
    type: String,
    required: true,
  },
  dateOfDecision: {
    type: Date,
    required: true,
  },
  finality: {
    type: String,
  },
  dateOfFinality: {
    type: Date,
    required: true,
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
