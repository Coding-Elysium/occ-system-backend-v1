import express from "express";
import {
  civilCaseAdd,
  deleteCivilCase,
  getCivilCaseById,
  getCivilCases,
  updateCivilCase,
  updateStatus,
} from "../controllers/civilCaseController.js";
const router = express.Router();

router.post("/add", civilCaseAdd);
router.get("/read", getCivilCases);
router.get("/read/:id", getCivilCaseById);
router.put("/update/:id", updateCivilCase);
router.delete("/delete/:id", deleteCivilCase);

router.put("/update-status", updateStatus);

export default router;
