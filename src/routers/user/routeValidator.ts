import { check, oneOf } from 'express-validator';

const routeValidator = (route: string) => {
  switch (route) {
    case '/membership-check':
      return [
        oneOf(
          [
            check('emailOrWatIAMUserId')
              .isEmail()
              .withMessage('Invalid email')
              .normalizeEmail(),
            check('emailOrWatIAMUserId')
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
