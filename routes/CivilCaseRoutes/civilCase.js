import express from "express";
import {
  civilCaseAdd,
  courtAppeals,
  decisionFirstLevel,
  decisionSecondLevel,
  deleteCivilCase,
  deleteCourtAppeals,
  deleteFirstLevel,
  deleteSecondLevel,
  deleteSupremeCourt,
  getCivilCaseById,
  getCivilCases,
  getCourtAppeals,
  getDecisionFirstLevel,
  getDecisionSecondLevel,
  getSupremeCourt,
  supremeCourt,
  updateCivilCase,
  updateCourtAppeals,
  updateFirstLevel,
  updateSecondLevel,
  updateStatus,
  updateSupremeCourt,
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

router.post("/add/decision/courtappeals", courtAppeals);
router.get("/read/decision/courtappeals/:case_id", getCourtAppeals);
router.delete("/delete/decision/courtappeals/:id", deleteCourtAppeals);
router.put("/update/decision/courtappeals/:id", updateCourtAppeals);

router.post("/add/decision/supremecourt", supremeCourt);
router.get("/read/decision/supremecourt/:case_id", getSupremeCourt);
router.delete("/delete/decision/supremecourt/:id", deleteSupremeCourt);
router.put("/update/decision/supremecourt/:id", updateSupremeCourt);


export default router;
