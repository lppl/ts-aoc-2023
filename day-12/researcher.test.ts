"use strict";
import {expect, test} from "bun:test";
import * as console from "console";
import {readFileSync} from "fs";

function sum(acc: number, n: number): number {
    return acc + n;
}

function toInt(n: string): number {
    return parseInt(n);
}

function toCheckSum(gears: string): number[] {
    let lastGear: '#' | '.' = gears[0] as any;
    let len = 0;
    const result = [];
    for (const gear of gears) {
        if (gear === lastGear) {
            len += 1;
        } else if (gear === '.') {
            result.push(len);
            lastGear = '.';
        } else if (lastGear === '.') {
            lastGear = '#';
            len = 1;
        }
    }
    if (lastGear !== '.') {
        result.push(len);
    }
    return result;
}

function isSame(a: number[], b: number[]) {
    if (a.length !== b.length) {
        return false;
    }

    for (let i = 0; i < a.length; i += 1) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
}

function checkLine(parts: string[], checkSum: number[]): number {
    const checkSumOfParts = parts.map(s => s.length);

    if (isSame(checkSumOfParts, checkSum)) {
        return 1;
    }

    for (let i = 0; i < parts.length; i += 1) {
        const part = parts[i];
        if (part.includes('?')) {
            const partsWithBroken = [...parts];
            partsWithBroken[i] = part.replace('?', '#');
            const partsWithWorking = [...parts];
            partsWithWorking.splice(i, 1, ...part.replace('?', '.').split('.').filter(s => s.length));

            return checkLine(partsWithWorking, checkSum) + checkLine(partsWithBroken, checkSum);
        }
    }

    return 0;
}

function check(records: string): number {
    const ret: number[] = [];

    for (const line of records.split('\n')) {
        const [gears, rawGroups] = line.split(' ');
        const checkSum = rawGroups.split(',').map(toInt);
        const parts = gears.split('.').filter(s => s.length);

        ret.push(checkLine(parts, checkSum));
    }

    return ret.reduce(sum, 0);
}

test.each([
    [`???.### 1,1,3`, 1],
    [`.??..??...?##. 1,1,3`, 4],
    [`?#?#?#?#?#?#?#? 1,3,1,6`, 1],
    [`????.#...#... 4,1,1`, 1],
    [`????.######..#####. 1,6,5`, 4],
    [`?###???????? 3,2,1`, 10],
])('Part 1. Line %p have %i solutions', (input, expected) => {
    expect(check(input)).toBe(expected);
})

test('Part 1. Sample', () => {
    const input = `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`.trim();
    expect(check(input)).toBe(21);
})

test('Part 1. Personal', () => {
    const input = readFileSync('./input-personal-part-1.txt').toString();
    expect(check(input)).toBe(-1);
})
