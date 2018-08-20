/**
 * basics of a jest test
 * describe states what is about to occur
 * test states what it is going to test
 */

// this is a basic skeleton
/*
describe('module/class name', () => {
    describe('function i am testing', () => {
        test('it does something', () => {
            // strict matching is this object
            expect(someValue).toBe(expectedValue);

            // have the same properties
            expect(someValue).toEqual(expectedValue);
        });
    });
});
*/

// items we are testing
const a = 1;
const myArray = ['apple', 'bannana'];

// simple test example
describe('these test will pass', () => {
    test('a === 1', () => {
        const expected = 1;

        // this exatly matches an object
        expect(a).toBe(expected);
    });

    test('a == true', () => {
        // this is a truthy value
        expect(a).toBeTruthy();
    });

    test('array matches expected', () => {
        const expected = ['apple', 'bannana'];

        // contain the same properties as expected
        expect(myArray).toEqual(expected);

        // is not an exact match
        expect(myArray).not.toBe(expected);

        // to use toBe you'd need a expect on a passed in value like so
        const example = (arr) => {
            expect(arr).toBe(expected);
        };

        example(expected);
    });
});
