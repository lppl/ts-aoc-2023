const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const min = "0".charCodeAt(0);
const max = "9".charCodeAt(0);
console.log('codes of 0 and 9', {min, max})

const sum =  input.split('\n').map(line => {
    console.assert(line.length > 0, "lines should have at least 2 signs");
    let left = '';
    let right = '';

    for (let i =0; i < line.length; i++) {
        const code = line.charCodeAt(i);
       if (min <= code && code <= max) {
           left = line[i];
           break;
       }
    }
    for (let i =line.length - 1; i >= 0; i--) {
        const code = line.charCodeAt(i);
        if (min <= code && code <= max) {
            right = line[i];
            break;
        }
    }
    return Number(left + right);
}).reduce((s, c) => s + c, 0);

console.log({sum})

export {};