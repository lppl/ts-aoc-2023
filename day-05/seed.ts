"use strict";
const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const lines = input.split('\n');

console.assert(lines.length > 0, "Input should give multiple lines");

const seeds = lines[0].split(': ')[1]!.split(' ').map(n => parseInt(n));

const chunks = [];
let currentChunk: null | [string, string, [number, number, number][]] = null;

for (const line of lines.slice(1)) {
    if (line === '') {
        currentChunk = null;
    } else if (line.endsWith(' map:')) {
        console.assert(currentChunk === null, "current chunk should be closed at this point");
        const els = line.split(/\s|-/g)
        console.assert(els.length === 4, `Line should split into four parts, but ${JSON.stringify(els)}`, els)
        const [from, _, to] = els;
        currentChunk = [from, to, []]
        chunks.push(currentChunk);
    } else {
        console.assert(currentChunk !== null, `currentChunk should not be a null`)
        const numbers = line.split(' ').map(n => Number(n))
        console.assert(numbers.length === 3, `Range should contain 3 numbers`);
        // @ts-ignore
        currentChunk![2].push(numbers);
    }
}

for (const [,, transitions] of chunks) {
    for (let i = 0; i < seeds.length; i++) {
        for (const [destination, source, length] of transitions) {
            const seed = seeds[i];
            if (seed >= source && seed < source + length) {
                seeds[i] += destination - source;
                break;
            }
        }
    }
}

const expected = 35;
if (Math.min(...seeds) === expected) {
    console.log('Success', expected, 'is valid expected result')
} else {
    console.error('Failure', seeds, "do not contain expected result - ", expected)
}

export {};