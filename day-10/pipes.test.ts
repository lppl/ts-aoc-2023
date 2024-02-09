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

test("Sample. Part 2. Enclosed 2", () => {
    const input = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ.F7FJ-
L---JF-JLJ....FJLJJ7
|F|F-JF---7...L7L|7|
|FFJF7L7F-JF7..L---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;
    expect(countEnclosed(input)).toBe(10);
});

test("Sample. Part 2. Enclosed 3", () => {
    const input = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;
    expect(countEnclosed(input)).toBe(8);
});

test("Sample. Part 2. custom 1", () => {
    const input = `
F-7
|.S
L-J
`.trim();
    expect(countEnclosed(input)).toBe(1);
});

test("Sample. Part 2. custom 2", () => {
    const input = `
F-S
|.|
L-J
`.trim();
    expect(countEnclosed(input)).toBe(1);
});

test("Personal. Part 2", () => {
    const input = readFileSync('./input-personal-2.txt').toString();
    const actual = countEnclosed(input);
    expect(actual).toBe(-1);
});
