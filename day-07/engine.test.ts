import {readFileSync} from 'fs';
import {Engine} from './engine';
import {expect, test} from "bun:test";


const resolveHands = (hands: string, useJokers = false) => {
    const engine = new Engine(useJokers);
    for (const line of hands.trim().split('\n')) {
        engine.addLine(line);
    }
    return engine.resolve();
}

const resolveHandsFromFile = (file: string, useJokers = false) => {
    return resolveHands(readFileSync(file).toString(), useJokers);
}

test("Score of sample input is 6440", () => {
    expect(resolveHandsFromFile('./input-sample.txt')).toBe(6440)
});

test("Score of personal input is not 250692844", () => {
    expect(resolveHandsFromFile('./input-personal.txt')).not.toBe(250692844)
});

test("Score of sample reddit is 6592", () => {
    expect(resolveHandsFromFile('./input-sample-reddit-1.txt')).toBe(6592)
});

test("Score of sample jokers is 5905", () => {
    expect(resolveHandsFromFile('./input-sample-start.txt', true)).toBe(5905)
});

test("Score of personal jokers is x", () => {
    expect(resolveHandsFromFile('./input-personal-start.txt', true)).toBe(248029057)
});

test("Score of reddit jokers is 6839", () => {
    expect(resolveHandsFromFile('./input-sample-reddit-2.txt', true)).toBe(6839)
});
