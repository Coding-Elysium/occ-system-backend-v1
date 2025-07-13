import CivilCase from "../schema/CivilCaseSchema/CivilCaseSchema.js";
import { civilCaseValidation } from "../validation/validation.js";

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
