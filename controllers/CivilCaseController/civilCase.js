import CivilCase from "../../schema/CivilCaseSchema/CivilCaseSchema.js";
import SchemaDecisionCourtAppeal from "../../schema/CivilCaseSchema/DecisionCourtAppeals.js";
import SchemaDecisionFirstLevel from "../../schema/CivilCaseSchema/DecisionFirstLevelCourt.js";
import SchemaDecisionSecondLevel from "../../schema/CivilCaseSchema/DecisionSecondLevelCourt.js";
import SchemaDecisionSupremeCourt from "../../schema/CivilCaseSchema/DecisionSupremeCourt.js";
import {
  civilCaseValidation,
  decisionCourtAppealsValidation,
  decisionSupremeCourtValidation,
  firstLevelDecisionValidation,
  secondLevelDecisionValidation,
} from "../../validation/validation.js";

//!======================================================== CIVIL CASE ============================================================

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

export const decisionFirstLevel = async (req, res) => {
  try {
    const { error } = firstLevelDecisionValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    const { courtOfOrigin, remarks, decision, date, case_id } = req.body;

    const newDecision = new SchemaDecisionFirstLevel({
      courtOfOrigin,
      remarks,
      decision,
      date,
      case_id,
    });

    const savedDecision = await newDecision.save();
    res.status(201).json(savedDecision);
  } catch (error) {
    console.error("Error creating decision:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getDecisionFirstLevel = async (req, res) => {
  try {
    const { case_id } = req.params;

    const firstLevelDecision = await SchemaDecisionFirstLevel.find({ case_id });

    if (firstLevelDecision.length === 0) {
      return res
        .status(404)
        .json({ message: "First-level decision not found." });
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

    const firstLevelDecision = await SchemaDecisionFirstLevel.findByIdAndDelete(
      id
    );

    if (!firstLevelDecision) {
      return res.status(404).json({ message: "First level not found." });
    }
    res
      .status(200)
      .json({ message: "First level decision deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

export const updateFirstLevel = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = firstLevelDecisionValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    const { courtOfOrigin, remarks, decision, date, case_id } = req.body;

    const updatedDecision = await SchemaDecisionFirstLevel.findByIdAndUpdate(
      id,
      {
        courtOfOrigin,
        remarks,
        decision,
        date,
        case_id,
      },
      { new: true }
    );

    if (!updatedDecision) {
      return res
        .status(404)
        .json({ message: "First-level decision not found." });
    }

    res.status(200).json(updatedDecision);
  } catch (error) {
    console.error("Error updating first-level decision:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//!======================================================== SECOND DECISION ============================================================

export const decisionSecondLevel = async (req, res) => {
  try {
    const {
      decision,
      date,
      case_id,
    } = req.body;

    if (!decision || !case_id) {
      return res
        .status(400)
        .json({ message: "Decision and case_id are required." });
    }

    const { error } = secondLevelDecisionValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    const newDecision = new SchemaDecisionSecondLevel({
      decision,
      date,
      case_id,
    });

    const savedDecision = await newDecision.save();
    res.status(201).json(savedDecision);
  } catch (error) {
    console.error("Error creating decision:", error);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

export const getDecisionSecondLevel = async (req, res) => {
  try {
    const { case_id } = req.params;

    const decisionSecondLevel = await SchemaDecisionSecondLevel.find({
      case_id,
    });

    if (decisionSecondLevel.length === 0) {
      return res
        .status(404)
        .json({ message: "First-level decision not found." });
    }

    res.status(200).json(decisionSecondLevel);
  } catch (error) {
    console.error("Error fetching first-level decision:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteSecondLevel = async (req, res) => {
  try {
    const { id } = req.params;

    const secondLevelDecision =
      await SchemaDecisionSecondLevel.findByIdAndDelete(id);

    if (!secondLevelDecision) {
      return res.status(404).json({ message: "First level not found." });
    }
    res
      .status(200)
      .json({ message: "First level decision deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

export const updateSecondLevel = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = secondLevelDecisionValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    const { decision, dateOfDecision, finality, dateOfFinality, case_id } = req.body;

    const updatedDecision = await SchemaDecisionSecondLevel.findByIdAndUpdate(
      id,
      {
        decision,
        dateOfDecision,
        finality,
        dateOfFinality,
        case_id, 
      },
      { new: true }
    );

    if (!updatedDecision) {
      return res
        .status(404)
        .json({ message: "First-level decision not found." });
    }

    res.status(200).json(updatedDecision);
  } catch (error) {
    console.error("Error updating first-level decision:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//!================================================= COURT APPEALS ==============================================================

export const courtAppeals = async (req, res) => {
  try {
    const { error } = decisionCourtAppealsValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    const {
      dateOfAppeal,
      division,
      decision,
      finality,
      dateOfFinality,
      case_id,
    } = req.body;

    const newDecision = new SchemaDecisionCourtAppeal({
      dateOfAppeal,
      division,
      decision,
      dateOfFinality,
      finality,
      case_id,
    });

    const savedDecision = await newDecision.save();
    res.status(201).json(savedDecision);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

export const getCourtAppeals = async (req, res) => {
  try {
    const { case_id } = req.params;
    const courtAppeals = await SchemaDecisionCourtAppeal.find({ case_id });
    res.status(201).json(courtAppeals);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

export const deleteCourtAppeals = async (req, res) => {
  try {
    const { id } = req.params;
    const courtAppeals = await SchemaDecisionCourtAppeal.findByIdAndDelete(id);
    res.status(201).json(courtAppeals);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

export const updateCourtAppeals = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = decisionCourtAppealsValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    const {date, division, dateOfAppeal, decision, finality, dateOfFinality } =
      req.body;

    const updatedDecision = await SchemaDecisionCourtAppeal.findByIdAndUpdate(
      id,
      {
        dateOfAppeal,
        division,
        decision,
        finality,
        dateOfFinality,
      },
      { new: true }
    );

    if (!updatedDecision) {
      return res
        .status(404)
        .json({ message: "First-level decision not found." });
    }

    res.status(200).json(updatedDecision);
  } catch (error) {
    console.error("Error updating first-level decision:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//!================================================= SUPREME COURT ==============================================================

export const supremeCourt = async (req, res) => {
  try {
    const { decision, date, case_id } = req.body;

    const { error } = decisionSupremeCourtValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    const supremeCourt = new SchemaDecisionSupremeCourt({
      decision,
      date,
      case_id,
    });

    const newDecision = await supremeCourt.save();

    res.status(200).json(newDecision);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getSupremeCourt = async (req, res) => {
  try {
    const { case_id } = req.params;
    const supremeCourt = await SchemaDecisionSupremeCourt.find({ case_id });
    res.status(201).json(supremeCourt);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteSupremeCourt = async (req, res) => {
  try {
    const { id } = req.params;
    await SchemaDecisionSupremeCourt.findByIdAndDelete(id);
    res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

export const updateSupremeCourt = async (req, res) => {
  try {
    const { id } = req.params;
    const { decision, date, case_id } = req.body;

    const { error } = decisionSupremeCourtValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    const updateNewDecision =
      await SchemaDecisionSupremeCourt.findByIdAndUpdate(
        id,
        { decision, date, case_id },
        { new: true }
      );

    if (!updateNewDecision) {
      return res
        .status(404)
        .json({ message: "Supreme Court decision not found." });
    }

    res.status(200).json(updateNewDecision);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};
