import { check } from 'express-validator';

const validator = (route: string) => {
  switch (route) {
    case '/':
      return [
        check('email').isString(),
        check('interestedEvents').isArray(),
        check('otherFeedback').isString(),
      ];
    default:
      throw new Error(
        `Validator for relative path "${route}" on mailingList router does not exist.`,
      );
  }
};

export default validator;
