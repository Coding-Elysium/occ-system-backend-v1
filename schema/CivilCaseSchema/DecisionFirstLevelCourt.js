import mongoose from "mongoose";

const decisionFirstLevelSchema = mongoose.Schema({
    remarks: {
        type: String,
    },
    decision: {
        type: String, 
        required: true,
    },
    case_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CivilCase", 
        required: true,
    },
    date: {
        type: Date,
    },
});

const SchemaDecisionFirstLevel = mongoose.model("DecisionFirstLevel", decisionFirstLevelSchema);

export default SchemaDecisionFirstLevel;
