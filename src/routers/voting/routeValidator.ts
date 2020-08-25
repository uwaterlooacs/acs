import { body } from 'express-validator';
import { VOTING_STAGE } from '../../types/voting';
import { getStringEnumValues } from '../../utils/enum';

const routeValidator = (route: string) => {
  switch (route) {
    case '/stage':
      return [
        body('stage').custom((val) => {
          if (!getStringEnumValues(VOTING_STAGE).includes(val))
            throw new Error('Invalid voting stage');
          return true;
        }),
      ];
    default:
      throw new Error(
        `Route validator for relative path "${route}" on user router does not exist.`,
      );
  }
};

export default routeValidator;
