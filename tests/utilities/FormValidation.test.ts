import { requiredFieldsEmpty } from "../../src/utilities/FormValidation";

describe('requiredFieldsEmpty', () => {
    it('Returns true if no arguments provided', async () => {
        // arrange
        const expected: boolean = true;

        // act
        const actual = requiredFieldsEmpty();

        // assert
        expect(actual).toBe(expected);
    });

    it('Returns true if any arguments are empty strings', async () => {
        // arrange
        const expected: boolean = true;

        // act
        const actual = requiredFieldsEmpty('test','test','');

        // assert
        expect(actual).toBe(expected);
    });

    it('Returns true if any arguments are 0', async () => {
        // arrange
        const expected: boolean = true;

        // act
        const actual = requiredFieldsEmpty('test',1,0);

        // assert
        expect(actual).toBe(expected);
    });

    it('Returns true if any arguments are false', async () => {
        // arrange
        const expected: boolean = true;

        // act
        const actual = requiredFieldsEmpty('test',1,false);

        // assert
        expect(actual).toBe(expected);
    });

    it('Returns fales if all arguments are truthy', async () => {
        // arrange
        const expected: boolean = false;

        // act
        const actual = requiredFieldsEmpty('test',1,true);

        // assert
        expect(actual).toBe(expected);
    });
});
