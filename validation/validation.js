import Joi from "joi";

export const civilCaseValidation = Joi.object({
  bookNumber: Joi.string().required(),
  petitioner: Joi.array().items(Joi.string()).min(1).required(),
  respondents: Joi.array().items(Joi.string()).min(1).required(),
  nature: Joi.string().required(),
  status: Joi.string()
    .valid("-----", "withdrawn", "dismissed", "archived", "appealed case")
    .required(),
});

export const firstLevelDecisionValidation = Joi.object({
  remarks: Joi.string().allow('', null), 
  decision: Joi.string().required(),
  case_id: Joi.string().required(),
  date: Joi.date().optional().allow(null), 
});