import { body } from 'express-validator';
import { LOCAL_ROUTES } from './types';

const positionBodyValidations = [
  body('title').isString(),
  body('description').isString(),
  body('isOpen').isBoolean(),
  body('occupant').optional().isMongoId(),
];

const getValidations = (route: LOCAL_ROUTES) => {
  switch (route) {
    case LOCAL_ROUTES.CREATE_POSITION:
      return positionBodyValidations;
    case LOCAL_ROUTES.UPDATE_POSITION:
      return [body('id').isMongoId(), ...positionBodyValidations];
    case LOCAL_ROUTES.DELETE_POSITION:
      return [body('id').isMongoId()];
    default:
      return [];
  }
};

export default getValidations;
