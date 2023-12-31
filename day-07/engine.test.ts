import {readFileSync} from 'fs';
import {Engine} from './engine';
import {expect, test} from "bun:test";


const resolveHands = (hands: string) => {
    const engine = new Engine();
    for (const line of hands.trim().split('\n')) {
        engine.addLine(line);
    }
    return engine.resolve();
}

const resolveHandsFromFile = (file: string) => {
    return resolveHands(readFileSync(file).toString());
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
