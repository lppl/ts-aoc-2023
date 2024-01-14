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

test.only("Sample. Part 2. Enclosed", () => {
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

test("Sample. Part 2. Enclosed 2", () => {
    const input = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;
    expect(countEnclosed(input)).toBe(10);
});

test("Sample. Part 2. custom 1", () => {
    const input = `
F-7
|.S
L-J
`.trim();
    expect(countEnclosed(input)).toBe(1);
});

test("Sample. Part 2. custom 1", () => {
    const input = `
F-S
|.|
L-J
`.trim();
    expect(countEnclosed(input)).toBe(1);
});
