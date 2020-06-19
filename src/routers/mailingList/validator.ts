import { check } from 'express-validator';

const validator = (route: string) => {
  switch (route) {
    case '/':
      return [
        check('email')
          .optional({ checkFalsy: true })
          .isEmail()
          .normalizeEmail(),
        check('interestedEvents').isArray(),
        check('interestedEvents.*').notEmpty(),
        check('otherFeedback').isString(),
      ];
    default:
      throw new Error(
        `Validator for relative path "${route}" on mailingList router does not exist.`,
      );
  }
};

export default validator;
