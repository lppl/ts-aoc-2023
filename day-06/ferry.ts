import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
});


let distance: number[];
let time: number[];
let races: [number, number][];

rl.on('line', (line) => {
    const foo = line.split(':');
    console.assert(foo.length === 2);
    const [label, rawValues] = foo;
    console.assert(["Time", "Distance"].includes(label));
    const values = rawValues.trim().split(/\s+/g).map(n => parseInt(n));
    if (label === "Time") {
        time = values;
    } else if (label === "Distance") {
        distance = values;
    }
    if (distance && time) {
        console.assert(time.length === distance.length)
        races = distance.map((d, i) => [time[i], d])
    }
}).on('close', () => {
    let result = 1;
    for(const [time, bestDistance] of races)  {
        let count = 0;
        for (let i = 0; i < time; i += 1) {
            if ((time - i) * i > bestDistance) {
                count += 1;
            }
        }
        result *= count;
    }
    console.log(result);
});
