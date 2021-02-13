import { body, query } from 'express-validator';
import { LOCAL_ROUTES } from './types';

const getValidations = (route: LOCAL_ROUTES) => {
  switch (route) {
    case LOCAL_ROUTES.CREATE_NOMINATION:
      return [
        body('position').isMongoId(),
        body('candidate').isMongoId(),
        body('video').isString(),
        body('writeUp').optional().isString(),
      ];
    case LOCAL_ROUTES.SECOND_NOMINEE:
    case LOCAL_ROUTES.DECLINE_NOMINATION:
    case LOCAL_ROUTES.VOTE_NOMINEE:
    case LOCAL_ROUTES.GET_NOMINATIONS:
    case LOCAL_ROUTES.DELETE_NOMINATION:
      return [query('id').isMongoId()];
    default:
      return [];
  }
};

export default getValidations;
