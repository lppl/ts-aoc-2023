const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const lines = input.split('\n');


const numbers: { line: number, start: number, end: number, number: number }[] = [];
const symbols: { line: number, position: number, symbol: string }[] = [];


for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];
    let num = '';
    for (let i = 0; i < line.length; i++) {
        const sign = line[i];
        if (Number.isNaN(Number(sign))) {
            if (num.length) {
                numbers.push({
                    line: lineIndex,
                    start: i - num.length,
                    end: i - 1,
                    number: Number(num)
                })
                num = '';
            }
            if (sign !== '.') {
                symbols.push({
                    line: lineIndex,
                    position: i,
                    symbol: sign
                });
            }
        } else {
            num += sign;
        }
    }
}

const checked = numbers.map(({line, start, end, number}) => {
    const adjusted = symbols.filter((s) => {
        const isYAlign = Math.abs(line - s.line) <= 1;
        const isXAlign = (s.position >= start - 1) && (s.position <= end + 1);
        return isYAlign && isXAlign;
    }).map(s => s.symbol);

    const isAdjusted = adjusted.length > 0;

    return {
        line, start, end, number, isAdjusted, adjusted
    }
})

const partNumbers = checked.filter((o) => o.isAdjusted).map((o) => o.number);
const otherNumbers = checked.filter((o) => !o.isAdjusted).map((o) => o.number);
const sum = partNumbers.reduce((s, c) => s + c, 0);
console.log({partNumbers, otherNumbers, sum})

console.assert(sum === 4361, `Result is not correct: ${sum} !== 4361`);

export {}