import { check, oneOf, query, body } from 'express-validator';
import {
  isPassword,
  isStudentNumber,
  isSemester,
  isFaculty,
} from '../../utils/customValidators';
import { MEMBERSHIP_STATUS } from '@acs/shared';

const routeValidator = (route: string) => {
  switch (route) {
    case '/signup':
      return [
        check('firstName').isString().trim(),
        check('lastName').isString().trim(),
        check('email').isEmail().normalizeEmail(),
        check('watIAMUserId').notEmpty().trim(),
        check('studentNumber').custom(isStudentNumber),
        check('semester').custom(isSemester),
        check('faculty').custom(isFaculty),
        check('password').custom(isPassword),
        check('paid').optional().isBoolean(),
        check('picture').optional().isString().trim(),
      ];
    case '/membership':
      return [
        body('membershipStatus').custom((val) => {
          if (!Object.values(MEMBERSHIP_STATUS).includes(val))
            throw new Error('Invalid membership status');
          return true;
        }),
      ];
    case '/membership/check':
      return [
        oneOf(
          [
            query('emailOrWatIAMUserId')
              .isEmail()
              .withMessage('Invalid email')
              .normalizeEmail(),
            query('emailOrWatIAMUserId')
              .isAlphanumeric()
              .withMessage('Invalid WatIAM user id')
              .trim(),
          ],
          'emailOrWatIAMUserId is not a valid email or WatIAM user id',
        ),
      ];
    default:
      throw new Error(
        `Route validator for relative path "${route}" on user router does not exist.`,
      );
  }
};

export default routeValidator;
