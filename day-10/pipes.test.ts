import {expect, test} from "bun:test";
import {readFileSync} from "fs";
import {findFurthest} from "./pipes";

test("sample 1", () => {
    const input = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;
    expect(findFurthest(input)).toBe(8);
});

test("sample 1", () => {
    const input = readFileSync('./input-personal-1.txt').toString();
    const actual = findFurthest(input);
    expect(actual).toBeGreaterThan(7172);
    expect(actual).toBe(-1);
});
