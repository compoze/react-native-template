import { requiredFieldsEmpty, ObjectToValidate, ValidationObject } from "../../src/utilities/FormValidation";

describe('requiredFieldsEmpty', () => {
    it('Returns Is Empty if no arguments provided', async () => {
        // arrange
        const expected: ValidationObject[] = [{
            fieldName: 'lenght',
            message: 'Is Empty',
        }];

        // act
        const actual = requiredFieldsEmpty();

        // assert
        expect(actual).toEqual(expected);
    });

    it('Returns an object if any arguments are empty strings', async () => {
        // arrange
        const validationFields: ObjectToValidate[] = [
            { key: 'First Name', value: 'firstName' },
            { key: 'Last Name', value: 'lastName' },
            { key: 'email', value: '' },
            { key: 'password', value: 'password' },
        ];

        // act
        const actual = requiredFieldsEmpty(...validationFields);

        // assert
        expect(actual.length).toBe(1);
    });

    it('Returns empty array if all arguments are truthy', async () => {
        // arrange
        const validationFields: ObjectToValidate[] = [
            { key: 'First Name', value: 'firstName' },
            { key: 'Last Name', value: 'lastName' },
            { key: 'email', value: 'email' },
            { key: 'password', value: 'password' },
        ];

        // act
        const actual = requiredFieldsEmpty(...validationFields);

        // assert
        expect(actual.length).toBe(0);
    });
});
