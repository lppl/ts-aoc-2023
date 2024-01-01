import {expect, test} from "bun:test";
import {readFileSync} from "fs";
import {Navigator} from "./navigator";


test(`When each step takes to victory take one left step`, () => {
    const navigator = new Navigator;
    navigator.addLine("L");
    navigator.addLine("");
    navigator.addLine("AAA = (ZZZ, AAA)");
    navigator.addLine("ZZZ = (ZZZ, ZZZ)");
    expect(navigator.resolve()).toBe(1);
});

test(`When each step takes to victory take one right step`, () => {
    const navigator = new Navigator;
    navigator.addLine("R");
    navigator.addLine("");
    navigator.addLine("AAA = (AAA, ZZZ)");
    navigator.addLine("ZZZ = (ZZZ, ZZZ)");
    expect(navigator.resolve()).toBe(1);
});

[
    {steps: 2, file: './input-sample-1.txt'},
    {steps: 6, file: './input-sample-2.txt'},
    {steps: 18673, file: './input-personal.txt'},
].forEach(({steps, file}) => {
    test(`"${file}" should be solved in ${steps} steps`, () => {
        const navigator = new Navigator;
        readFileSync(file).toString().split('\n').forEach(line => {
            navigator.addLine(line);
        })
        expect(navigator.resolve()).toBe(steps);
    });
});