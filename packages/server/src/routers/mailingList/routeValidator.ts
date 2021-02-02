import { check } from 'express-validator';
import { LOCAL_ROUTES } from './types';

const routeValidator = (route: LOCAL_ROUTES) => {
  switch (route) {
    case LOCAL_ROUTES.UPDATE_SHEET:
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
      return [];
  }
};

export default routeValidator;
