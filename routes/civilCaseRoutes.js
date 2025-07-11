import express from "express";
import {
  civilCaseAdd,
  deleteCivilCase,
  getCivilCaseById,
  getCivilCases,
  updateCivilCase,
} from "../controllers/civilCaseController.js";
const router = express.Router();

router.post("/add", civilCaseAdd);
router.get("/read", getCivilCases);
router.get("/read/:id", getCivilCaseById);
router.put("/update/:id", updateCivilCase);
router.delete("/delete/:id", deleteCivilCase);

export default router;
