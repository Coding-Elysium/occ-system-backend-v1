import Joi from "joi";

export const civilCaseValidation = Joi.object({
  docketNumber: Joi.string().required(),
  petitioner: Joi.array().items(Joi.string()).min(1).required(),
  respondents: Joi.array().items(Joi.string()).min(1).required(),
  nature: Joi.string().required(),
  description: Joi.string().required(),
  branch: Joi.string().required(),
  status: Joi.string()
    .valid(
      "Pending",
      "Withdrawn",
      "Dismissed",
      "Archived",
      "Appealed Case",
      "Remanded to the Court of Origin"
    )
    .required(),
});

export const firstLevelDecisionValidation = Joi.object({
  courtOfOrigin: Joi.string().allow("", null),
  remarks: Joi.string().allow("", null),
  decision: Joi.string().required(),
  date: Joi.date().optional().allow(null),
  case_id: Joi.string().required(),
});

export const secondLevelDecisionValidation = Joi.object({
  decision: Joi.string().required(),
  dateOfDecision: Joi.date().optional().allow(null),
  finality: Joi.string().allow("", null),
  dateOfFinality: Joi.date().optional().allow(null),
  case_id: Joi.string().required(),
});

export const decisionCourtAppealsValidation = Joi.object({
  division: Joi.string().required(),
  dateOfAppeal: Joi.date().optional().allow(null),
  decision: Joi.string().required(),
  finality: Joi.string().allow("", null),
  dateOfFinality: Joi.date().optional().allow(null),
  case_id: Joi.string().required(),
});

export const decisionSupremeCourtValidation = Joi.object({
  decision: Joi.string().required(),
  date: Joi.date().optional().allow(null),
  case_id: Joi.string().required(),
});
