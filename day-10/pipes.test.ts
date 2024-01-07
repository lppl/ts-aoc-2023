import {expect, test} from "bun:test";
import {readFileSync} from "fs";
import {findFurthest} from "./pipes";

test("Sample. Part 1", () => {
    const input = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;
    expect(findFurthest(input)).toBe(8);
});

test("Personal. Part 1", () => {
    const input = readFileSync('./input-personal-1.txt').toString();
    const actual = findFurthest(input);
    expect(actual).toBe(7173);
});