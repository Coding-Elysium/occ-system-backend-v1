import mongoose from "mongoose";

const decisionSupremeCourtSchema = mongoose.Schema({
    decision: {
        type: String, 
        required: true,
    },
    case_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CivilCase", 
        required: true,
    },
    resolution: {
        type: Date
    }
});

const DecisionSupremeCourt = mongoose.model("DecisionSupremeCourt", decisionSupremeCourtSchema);

export default DecisionSupremeCourt;
