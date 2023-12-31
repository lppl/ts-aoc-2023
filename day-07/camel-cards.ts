import * as readline from 'readline';

import {Engine} from "./engine";

const rl = readline.createInterface({
    input: process.stdin,
});

const engine = new Engine();
rl.on('line', (line) => {
    engine.addLine(line);
}).on('close', () => {
    const result = engine.resolve()
    console.log("Result: ", result);
});

// 250692844 is not the answer