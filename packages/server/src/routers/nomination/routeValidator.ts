import { body, query } from 'express-validator';
import { LocalRoutes } from './types';

const getValidations = (route: LocalRoutes) => {
  switch (route) {
    case LocalRoutes.CREATE_NOMINATION:
      return [
        body('position').isMongoId(),
        body('candidate').isMongoId(),
        body('seconds').optional().isNumeric(),
        body('video').optional().isString(),
        body('writeUp').optional().isString(),
      ];
    case LocalRoutes.SECOND_NOMINEE:
    case LocalRoutes.DECLINE_NOMINATION:
    case LocalRoutes.VOTE_NOMINEE:
      return [query('nomination').isMongoId()];
    default:
      return [];
  }
};

export default getValidations;
