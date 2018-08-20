// here we looking at mocking functions

// very basic function mocks
const myFirstMock = jest.fn();
const mySecondMock = jest.fn();

// mocking a function with a function
const myThirdMock = jest.fn((a, b, c, cb) => {
    if (a === 'object') {
        return cb({ b, c });
    }

    if (a === 'array') {
        return cb([b, c]);
    }

    return cb(`${a} ${b} ${c}`);
});

// mocking return values, for times you need it to return something specific
const myFourthMock = jest.fn();
myFourthMock.mockReturnValue('hello');

// this function gets called after every test function
beforeEach(() => {
    mySecondMock.mockReset();
    myThirdMock.mockReset();
});

describe('examples with mocks', () => {
    describe('myFirstMock', () => {
        test('has never been called', () => {
            // never called
            expect(myFirstMock).not.toBeCalled();

            // another way of never called
            expect(myFirstMock).toHaveBeenCalledTimes(0);
        });

        test('has been called once', () => {
            myFirstMock();

            // has been called
            expect(myFirstMock).toBeCalled();

            // has been called exactly once
            expect(myFirstMock).toHaveBeenCalledTimes(1);
        });

        test('has been called twice.. see comments in code', () => {
            /**
             * with each test we'll need to reset this as it increments each time
             * you would want to do beforeEach(() => { myFirstMock.mockReset(); })
             */
            myFirstMock();

            // has been called
            expect(myFirstMock).toBeCalled();

            // has been called more than once
            expect(myFirstMock).not.toHaveBeenCalledTimes(1);
            expect(myFirstMock).toHaveBeenCalledTimes(2);
        });
    });

    describe('mySecondMock', () => {
        test('has never been called', () => {
            // never called
            expect(mySecondMock).not.toBeCalled();

            // another way of never called
            expect(mySecondMock).toHaveBeenCalledTimes(0);
        });

        test('has been called once', () => {
            mySecondMock();

            // has been called
            expect(mySecondMock).toBeCalled();

            // has been called exactly once
            expect(mySecondMock).toHaveBeenCalledTimes(1);
        });

        test('has been called only once still... see comments myFirstMock test', () => {
            mySecondMock();

            // has been called
            expect(mySecondMock).toBeCalled();

            // has been called more than once
            expect(mySecondMock).not.toHaveBeenCalledTimes(2);
            expect(mySecondMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('myThirdMock', () => {
        // this kind of test allows you to verify that the variables passed in match expected
        test('testing variables match as expected', () => {
            const a = 'my';
            const b = 'hello';
            const c = 'world test';

            const expected = `${a} ${b} ${c}`;

            myThirdMock(a, b, c, (result) => {
                expect(result).toBe(expected);
            });

            /**
             * verify that the variables passed in match as expected
             *
             * myMock.mock.calls is An array containing the call arguments of all calls
             * that have been made to this mock function. Each item in the array is an
             * array of arguments that were passed during the call. If there was more
             * than one call to the function during this test there would be more than
             * one array.
             */
            expect(myThirdMock.mock.calls[0][0]).toBe(a);
            expect(myThirdMock.mock.calls[0][1]).toBe(b);
            expect(myThirdMock.mock.calls[0][2]).toBe(c);
        });

        test('another way to access a mocked function', () => {
            // another way we can access our mocked function
            const mock = jest.fn().mockName('myThirdMock');

            const a = 'array';
            const b = 1;
            const c = 2;

            const expected = [1, 2];

            mock(a, b, c, (result) => {
                expect(result).toEqual(expected);
            });
        });
    });

    describe('myFourthMock', () => {
        // sometimes you need to mock a return for a function.
        const result = myFourthMock();
        const expected = 'hello';

        expect(result).toBe(expected);
    });
});
