import { body, query } from 'express-validator';
import { LOCAL_ROUTES } from './types';

const getValidations = (route: LOCAL_ROUTES) => {
  switch (route) {
    case LOCAL_ROUTES.CREATE_NOMINATION:
      return [
        body('position').isMongoId(),
        body('candidate').isMongoId(),
        body('seconds').optional().isNumeric(),
        body('video').optional().isString(),
        body('writeUp').optional().isString(),
      ];
    case LOCAL_ROUTES.SECOND_NOMINEE:
    case LOCAL_ROUTES.DECLINE_NOMINATION:
    case LOCAL_ROUTES.VOTE_NOMINEE:
      return [query('nomination').isMongoId()];
    default:
      return [];
  }
};

export default getValidations;
