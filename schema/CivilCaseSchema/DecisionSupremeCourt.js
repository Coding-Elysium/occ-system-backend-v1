import mongoose from "mongoose";

const decisionSupremeCourtSchema = mongoose.Schema({
  decision: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  case_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CivilCase",
    required: true,
  },
});

const SchemaDecisionSupremeCourt = mongoose.model(
  "DecisionSupremeCourt",
  decisionSupremeCourtSchema
);

export default SchemaDecisionSupremeCourt;
