import { FieldValues, FieldKeys } from 'components/forms/UserInfo';

export const getDuplicateKeyErrors = (
  duplicatedKeys: Partial<Record<FieldKeys, string | number>>,
  values: Partial<FieldValues>,
): Partial<FieldValues> => {
  const errors: Partial<FieldValues> = {};
  (Object.keys(duplicatedKeys) as Array<FieldKeys>).forEach((key) => {
    const dupe = duplicatedKeys[key]?.toString();
    const value = values[key]?.toString();
    if (dupe && value && dupe === value) {
      errors[key] = 'This value is already linked to an existing user';
    }
  });
  return errors;
};
