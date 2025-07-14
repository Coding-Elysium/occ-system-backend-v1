import mongoose from "mongoose";

const decisionCourtAppealSchema = mongoose.Schema({
    dateOfAppealOne: {
        type: Date,
    },
    decision: {
        type: String,
    },
    resolution: {
        type: Date,
    },
    finality: {
        type: String,
    },
    dateOfAppealTwo: {
        type: Date
    },
    case_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CivilCase", 
        required: true,
    },
});

const DecisionCourtAppeal = mongoose.model("DecisionFirstLevel", decisionCourtAppealSchema);

export default DecisionCourtAppeal;
