import mongoose from "mongoose";

const decisionSecondLevelSchema = mongoose.Schema({
    decision: {
        type: String, 
        required: true,
    },
    case_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CivilCase", 
        required: true,
    },
    judgement: {
        type: Date,
        required: true,
    },
    finality: {
        type: String,
    }
});

const SchemaDecisionSecondLevel = mongoose.model("DecisionSecondLevel", decisionSecondLevelSchema);

export default SchemaDecisionSecondLevel;
