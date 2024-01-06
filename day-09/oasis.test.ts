import {expect, test} from "bun:test";
import {readFileSync} from "fs";
import {predict, predictPrev} from "./oasis";

[
    {results: [18, 28, 68], file: './input-sample-1.txt'},
].forEach(({results, file}) => {
    const lines = readFileSync(file).toString().split('\n');
    results.forEach((expected, i) => {
        const line = lines[i];
        test(`"In ${file}" line ${i} should be solved as ${expected}. [${line}]`, () => {
            const p = line.split(" ").map(Number);
            expect(predict(p)).toBe(expected);
        });
    })
});

[
    {results: [-3, 0, 5], file: './input-sample-1.txt'},
].forEach(({results, file}) => {
    const lines = readFileSync(file).toString().split('\n');
    results.forEach((expected, i) => {
        const line = lines[i];
        test(`"In ${file}" line ${i} should be solved as ${expected}. [${line}]`, () => {
            const p = line.split(" ").map(Number);
            expect(predictPrev(p)).toBe(expected);
        });
    })
});


test("Result part 1", () => {
    const actual = readFileSync("./input-personal-1.txt")
        .toString()
        .split('\n')
        .map(line => line.split(" ").map(Number))
        .map(predict)
        .reduce((acc, c) => acc + c, 0);

    expect(actual).toBe(1798691765);
})

test("Result part 2", () => {
    const actual = readFileSync("./input-personal-1.txt")
        .toString()
        .split('\n')
        .map(line => line.split(" ").map(Number))
        .map(predictPrev)
        .reduce((acc, c) => acc + c, 0);

    expect(actual).toBe(1104);
})
