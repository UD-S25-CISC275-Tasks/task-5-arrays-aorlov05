/**
 * Consume an array of numbers, and return a new array containing
 * JUST the first and last number. If there are no elements, return
 * an empty array. If there is one element, the resulting list should
 * the number twice.
 */
export function bookEndList(numbers: number[]): number[] {
    if (numbers.length < 1) {
        return [];
    }

    return [numbers[0], numbers[numbers.length - 1]];
}

/**
 * Consume an array of numbers, and return a new array where each
 * number has been tripled (multiplied by 3).
 */
export function tripleNumbers(numbers: number[]): number[] {
    return numbers.map((value: number): number => value * 3);
}

/**
 * Consume an array of strings and convert them to integers. If
 * the number cannot be parsed as an integer, convert it to 0 instead.
 */
export function stringsToIntegers(numbers: string[]): number[] {
    return numbers.map((str: string) => {
        const strToInt: number = parseInt(str);
        return isNaN(strToInt) ? 0 : strToInt;
    });
}

/**
 * Consume an array of strings and return them as numbers. Note that
 * the strings MAY have "$" symbols at the beginning, in which case
 * those should be removed. If the result cannot be parsed as an integer,
 * convert it to 0 instead.
 */
// Remember, you can write functions as lambdas too! They work exactly the same.
export const removeDollars = (amounts: string[]): number[] => {
    const removeDollarSigns: string[] = amounts.map((value: string) =>
        value.startsWith("$") ? value.substring(1) : value,
    );
    return stringsToIntegers(removeDollarSigns);
};

/**
 * Consume an array of messages and return a new list of the messages. However, any
 * string that ends in "!" should be made uppercase. Also, remove any strings that end
 * in question marks ("?").
 */
export const shoutIfExclaiming = (messages: string[]): string[] => {
    const uppercaseExclamations: string[] = messages.map((value: string) =>
        value.endsWith("!") ? value.toUpperCase() : value,
    );
    return uppercaseExclamations.filter(
        (value: string) => !value.endsWith("?"),
    );
};

/**
 * Consumes an array of words and returns the number of words that are LESS THAN
 * 4 letters long.
 */
export function countShortWords(words: string[]): number {
    return words.filter((value: string) => value.length < 4).length;
}

/**
 * Consumes an array of colors (e.g., 'red', 'purple') and returns true if ALL
 * the colors are either 'red', 'blue', or 'green'. If an empty list is given,
 * then return true.
 */
export function allRGB(colors: string[]): boolean {
    return colors.every(
        (value: string) =>
            value === "red" || value === "blue" || value === "green",
    );
}

/**
 * Consumes an array of numbers, and produces a string representation of the
 * numbers being added together along with their actual sum.
 *
 * For instance, the array [1, 2, 3] would become "6=1+2+3".
 * And the array [] would become "0=0".
 */
export function makeMath(addends: number[]): string {
    // Get sum of all elements in addends array
    const sum: number = addends.reduce(
        (currentTotal: number, num: number) => currentTotal + num,
        0,
    );
    // Concatenate every value in array with + in front, then removes the first plus
    const additionExpression: string = addends
        .reduce(
            (previousValue: string, currentValue: number) =>
                previousValue + "+" + currentValue.toString(),
            "",
        )
        .substring(1);
    // If there were no values concatenated, then return 0=0, otherwise return math expression
    return `${sum}=${additionExpression.length > 0 ? additionExpression : 0}`;
}

/**
 * Consumes an array of numbers and produces a new array of the same numbers,
 * with one difference. After the FIRST negative number, insert the sum of all
 * previous numbers in the list. If there are no negative numbers, then append
 * the sum to the list.
 *
 * For instance, the array [1, 9, -5, 7] would become [1, 9, -5, 10, 7]
 * And the array [1, 9, 7] would become [1, 9, 7, 17]
 */
export function injectPositive(values: number[]): number[] {
    // Checks if there's a negative number in the array and returns it's index
    const findNegativeIndex: number = values.findIndex(
        (value: number) => value < 0,
    );
    if (findNegativeIndex === -1) {
        // If there are no negative numbers, push the sum of all array elements to the end
        const sum: number = values.reduce(
            (currentTotal: number, num: number) => currentTotal + num,
            0,
        );
        return [...values, sum];
    } else {
        // Get sum of all elements before first negative element
        const sumBeforeNegative: number = values.reduce(
            (currentTotal: number, num: number, currentIndex: number) =>
                currentIndex >= findNegativeIndex ? currentTotal : (
                    currentTotal + num
                ),
            0,
        );
        // Inserts the sum of elements before the negative element after itself
        const valuesCopy: number[] = [...values];
        valuesCopy.splice(findNegativeIndex + 1, 0, sumBeforeNegative);
        return valuesCopy;
    }
}
