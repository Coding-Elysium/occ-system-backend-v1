import CivilCase from "../../schema/CivilCaseSchema/CivilCaseSchema.js";
import DecisionFirstLevel from "../../schema/CivilCaseSchema/DecisionFirstLevelCourt.js";
import DecisionSecondLevel from "../../schema/CivilCaseSchema/DecisionSecondLevelCourt.js";
import { civilCaseValidation, firstLevelDecisionValidation } from "../../validation/validation.js";

export const civilCaseAdd = (req, res) => {
  try {
    const { error } = civilCaseValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newCivilCase = new CivilCase(req.body);

    newCivilCase
      .save()
      .then((civilCase) => res.status(201).json(civilCase))
      .catch((error) => res.status(500).json({ message: error.message }));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCivilCases = async (req, res) => {
  try {
    const civilCases = await CivilCase.find();
    res.status(200).json(civilCases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCivilCaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const civilCase = await CivilCase.findById(id);
    if (!civilCase) {
      return res.status(404).json({ message: "Civil case not found." });
    }
    res.status(200).json(civilCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCivilCase = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = civilCaseValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedCivilCase = await CivilCase.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCivilCase) {
      return res.status(404).json({ message: "Civil case not found." });
    }
    res.status(200).json(updatedCivilCase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCivilCase = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCivilCase = await CivilCase.findByIdAndDelete(id);
    if (!deletedCivilCase) {
      return res.status(404).json({ message: "Civil case not found." });
    }
    res.status(200).json({ message: "Civil case deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { ids, status } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No case IDs provided." });
    }

    if (!status || typeof status !== "string") {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const result = await CivilCase.updateMany(
      { _id: { $in: ids } },
      { $set: { status: status } },
      { runValidators: false }
    );

    res.status(200).json({
      message: `Updated status of ${result.modifiedCount} case(s) to "${status}".`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//!======================================================== FIRST DECISION ============================================================

export const decisionFirstLevel = async(req, res) => {
  try {
    const { error } = firstLevelDecisionValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ 
        message: error.details.map(err => err.message) 
      });
    }

    const { remarks, decision, case_id, date } = req.body;

    const newDecision = new DecisionFirstLevel({
      remarks,
      decision,
      case_id,
      date
    });

    const savedDecision = await newDecision.save();
    res.status(201).json(savedDecision);
  } catch (error) {
    console.error("Error creating decision:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export const getDecisionFirstLevel = async (req, res) => {
  try {
    const { case_id } = req.params;

    const firstLevelDecision = await DecisionFirstLevel.find({ case_id });

    if (firstLevelDecision.length === 0) {
      return res.status(404).json({ message: "First-level decision not found." });
    }

    res.status(200).json(firstLevelDecision);
  } catch (error) {
    console.error("Error fetching first-level decision:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteFirstLevel = async (req, res) => {
  try {
    const { id } = req.params;

    const firstLevelDecision = await DecisionFirstLevel.findByIdAndDelete(id);

    if (!firstLevelDecision) {
      return res.status(404).json({ message: "First level not found." });
    }
    res.status(200).json({ message: "First level decision deleted successfully." })
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}

export const updateFirstLevel = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = firstLevelDecisionValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    const { remarks, decision, case_id, date } = req.body;

    const updatedDecision = await DecisionFirstLevel.findByIdAndUpdate(
      id,
      {
        remarks,
        decision,
        case_id,
        date,
      },
      { new: true } 
    );

    if (!updatedDecision) {
      return res.status(404).json({ message: "First-level decision not found." });
    }

    res.status(200).json(updatedDecision);
  } catch (error) {
    console.error("Error updating first-level decision:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


//!======================================================== SECOND DECISION ============================================================

export const decisionSecondLevel = async(req, res) => {
  try {
    const { decision, case_id, judgement, finality } = req.body;

    if (!decision || !case_id) {
      return res.status(400).json({ message: "Decision and case_id are required." });
    }

    const newDecision = new DecisionSecondLevel({
      decision,
      case_id,
      judgement,
      finality,
    });

    const savedDecision = await newDecision.save();
    res.status(201).json(savedDecision);
  } catch (error) {
    console.error("Error creating decision:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}