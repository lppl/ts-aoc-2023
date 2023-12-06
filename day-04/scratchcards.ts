const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const parsedInput = input.split('\n').filter(line => line).map(line => {
    const [id, rest] = line.replace('Card ', '').trim().split(':');
    const [left, right] = rest.replace(/\s+/g, ' ').split(' | ').map(part => part.trim().split(' ').map(s => Number(s)));
    return {
        id: Number(id), left, right
    }
});

const calculatedPoints = parsedInput.map(card => {
    const count = card.left.filter(num => card.right.includes(num)).length;

    if (count == 0) {
        return 0
    } else {
        return Math.pow(2, count - 1);
    }
});

console.log({calc: calculatedPoints});

const result = calculatedPoints.reduce((s, c) => s + c, 0);
const target = 13;

if (result === target) {
    console.log('Congrats!!! Result is correct: ', result);
} else {
    console.error(`Incorrect result: ${result} !== ${target}`);
}
