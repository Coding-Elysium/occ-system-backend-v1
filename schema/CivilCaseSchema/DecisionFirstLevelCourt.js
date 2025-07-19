import mongoose from "mongoose";

const decisionFirstLevelSchema = mongoose.Schema({
  courtOfOrigin: {
    type: String,
  },
  remarks: {
    type: String,
    required: true,
  },
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

const SchemaDecisionFirstLevel = mongoose.model(
  "DecisionFirstLevel",
  decisionFirstLevelSchema
);

export default SchemaDecisionFirstLevel;
