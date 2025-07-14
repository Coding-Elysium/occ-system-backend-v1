import express from "express";
import {
  civilCaseAdd,
  decisionFirstLevel,
  decisionSecondLevel,
  deleteCivilCase,
  deleteFirstLevel,
  deleteSecondLevel,
  getCivilCaseById,
  getCivilCases,
  getDecisionFirstLevel,
  getDecisionSecondLevel,
  updateCivilCase,
  updateFirstLevel,
  updateSecondLevel,
  updateStatus,
} from "../../controllers/CivilCaseController/civilCase.js";

const router = express.Router();

router.post("/add", civilCaseAdd);
router.get("/read", getCivilCases);
router.get("/read/:id", getCivilCaseById);
router.put("/update/:id", updateCivilCase);
router.delete("/delete/:id", deleteCivilCase);
router.put("/update-status", updateStatus);

router.post("/add/decision/firstlevel", decisionFirstLevel);
router.get("/read/decision/firstlevel/:case_id", getDecisionFirstLevel);
router.delete("/delete/decision/firstlevel/:id", deleteFirstLevel);
router.put("/update/decision/firstlevel/:id", updateFirstLevel);

router.post("/add/decision/secondlevel", decisionSecondLevel);
router.get("/read/decision/secondlevel/:case_id", getDecisionSecondLevel);
router.delete("/delete/decision/secondlevel/:id", deleteSecondLevel);
router.put("/update/decision/secondlevel/:id", updateSecondLevel);

export default router;
