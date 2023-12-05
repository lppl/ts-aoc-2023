const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const cubes = new Map(Object.entries({
    red: 12,
    green: 13,
    blue: 14
}));

const result = input.split('\n').map(line => {
    const [left, right] = line.split(':');
    const id = Number(left.replace('Game ', ''));
    const subsets = right
        .trim()
        .split(';')
        .map(
            subset => subset
                .trim()
                .split(',')
                .map((foo) => {
                    const [count, color] = foo.trim().split(' ');
                    return Number(cubes.get(color)) >= Number(count);
                })
                .every(s => s))
        .every(s => s)
    return [id, subsets]
})
    .filter(([,isPossible]) => isPossible)
    .reduce((sum, [id]) => sum + Number(id), 0)

export {};
