import {expect, test} from "bun:test";
import {countDistance, countDistanceWithExpand, expand} from "./observatory";
import {readFileSync} from "fs";

test('Expand. No effect.', () => {
    const input = `#.\n.#`.trim();
    const output = `#.\n.#`.trim();
    expect(expand(input)).toBe(output);
})

test('Expand in vertical.', () => {
    const input = `#.\n..\n.#`;
    const output = `#.\n..\n..\n.#`;
    expect(expand(input)).toBe(output);
})

test('Expand in horizontal.', () => {
    const input = `#..\n..#`;
    const output = `#...\n...#`;
    expect(expand(input)).toBe(output);
})

test('Expand. Sample 1.', () => {
    const input = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
    `.trim();
    const output = `
....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#.......
    `.trim();
    expect(expand(input)).toBe(output);
})


test('Count distance. No expansion.', () => {
    const input = `#.\n.#`.trim();
    expect(countDistance(input)).toBe(2);
})

test('Count distance. Expansion in vertical', () => {
    const input = `#.\n..\n..\n.#`;
    expect(countDistance(input)).toBe(4);
})

test('Count distance. Expansion in horizontal.', () => {
    const input = `#...\n...#`;
    expect(countDistance(input)).toBe(4);
})

test('Count distance. Sample 1.', () => {
    const input = `
....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#....... 
    `.trim();
    expect(countDistance(input)).toBe(374);
})

test('Personal. Part 1', () => {
    const input = readFileSync('./input-personal-part-1.txt').toString();
    expect(countDistance(expand(input))).toBe(9724940);
})


test('Count distance part II. No expansion.', () => {
    const input = `#.\n.#`.trim();
    expect(countDistanceWithExpand(input, 2)).toBe(2);
})

test('Count distance part II. Expansion in vertical', () => {
    const input = `#.\n..\n.#`;
    expect(countDistanceWithExpand(input, 2)).toBe(4);
})

test('Count distance part II. Expansion in horizontal.', () => {
    const input = `#..\n..#`;
    expect(countDistanceWithExpand(input, 2)).toBe(4);
})

test('Count distance part II. Expansion in vertical', () => {
    const input = `#.\n..\n.#`;
    expect(countDistanceWithExpand(input, 1_000_000)).toBe(1_000_002);
})

test('Count distance part II. Expansion in horizontal.', () => {
    const input = `#..\n..#`;
    expect(countDistanceWithExpand(input, 1_000_000)).toBe(1_000_002);
})

test('Personal. Part 2', () => {
    const input = readFileSync('./input-personal-part-1.txt').toString();
    expect(countDistanceWithExpand(input)).toBe(569052586852);
})
