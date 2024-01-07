import {expect, test} from "bun:test";
import {readFileSync} from "fs";
import {countEnclosed, findFurthest} from "./pipes";

test("Sample. Part 1. Furthest.", () => {
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

test("Sample. Part 2. Enclosed", () => {
    const input = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;
    expect(countEnclosed(input)).toBe(4);
});

test("Personal. Part 2", () => {
    const input = readFileSync('./input-personal-1.txt').toString();
    const actual = findFurthest(input);
    expect(actual).toBe(7173);
});
