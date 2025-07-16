import Joi from "joi";

export const civilCaseValidation = Joi.object({
  bookNumber: Joi.string().required(),
  docketNumber: Joi.string().required(),
  petitioner: Joi.array().items(Joi.string()).min(1).required(),
  respondents: Joi.array().items(Joi.string()).min(1).required(),
  nature: Joi.string().required(),
  branch: Joi.string().required(),
  status: Joi.string()
    .valid("-----", "withdrawn", "dismissed", "archived", "appealed case")
    .required(),
});

export const firstLevelDecisionValidation = Joi.object({
  remarks: Joi.string().allow("", null),
  decision: Joi.string().required(),
  case_id: Joi.string().required(),
  date: Joi.date().optional().allow(null),
});

export const secondLevelDecisionValidation = Joi.object({
  decision: Joi.string().required(),
  case_id: Joi.string().required(),
  judgement: Joi.date().optional().allow(null),
  finality: Joi.string().allow("", null),
});

export const decisionCourtAppealsValidation = Joi.object({
  dateOfAppealOne: Joi.date().optional().allow(null),
  decision: Joi.string().required(),
  resolution: Joi.date().optional().allow(null),
  finality: Joi.string().allow("", null),
  dateOfAppealTwo: Joi.date().optional().allow(null),
  case_id: Joi.string().required(),
});

export const decisionSupremeCourtValidation = Joi.object({
  decision: Joi.string().required(),
  case_id: Joi.string().required(),
  resolution: Joi.date().optional().allow(null),
});
