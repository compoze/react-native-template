import {
  requiredFieldsEmpty,
  ObjectToValidate,
  ValidationObject,
} from './FormValidation';

describe('FormValidation', () => {
  describe('requiredFieldsEmpty', () => {
    it('Returns Is Empty if no arguments provided', async () => {
      const expected: ValidationObject[] = [
        {
          fieldName: 'length',
          message: 'Is Empty',
        },
      ];

      const actual = requiredFieldsEmpty();

      expect(actual).toEqual(expected);
    });

    it('Returns a validation object if any arguments are empty', async () => {
      const validationFields: ObjectToValidate[] = [
        { key: 'First Name', value: 'firstName' },
        { key: 'Last Name', value: 'lastName' },
        { key: 'email', value: '' },
        { key: 'password', value: 'password' },
        { key: 'numberOfDependents', value: '0' },
      ];

      const actual = requiredFieldsEmpty(...validationFields);

      expect(actual).toEqual([
        {
          fieldName: 'email',
          message: 'email cannot be empty',
        },
      ]);
    });

    it('Returns empty array if all values are present', async () => {
      const validationFields: ObjectToValidate[] = [
        { key: 'First Name', value: 'firstName' },
        { key: 'Last Name', value: 'lastName' },
        { key: 'email', value: 'email' },
        { key: 'password', value: 'password' },
      ];

      const actual = requiredFieldsEmpty(...validationFields);

      expect(actual.length).toBe(0);
    });
  });
});
