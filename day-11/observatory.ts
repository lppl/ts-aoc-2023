export function expand(galaxy: string): string {
    const lines = galaxy.split('\n');
    const expanse = [];
    const colWithStart = new Array(lines[0].length).fill(false);
    for (let y = 0; y < lines.length; y += 1) {
        const line = lines[y];
        let lineHasStar = false;
        for (let x = 0; x < line.length; x += 1) {
            const sign = line[x];
            if (sign === '#') {
                colWithStart[x] = true;
                lineHasStar = true;
            }
        }
        if (lineHasStar) {
            expanse.push(line.split(''));
        } else {
            expanse.push(line.split(''));
            expanse.push(line.split(''));
        }
    }

    for (let oldX = 0, newX = 0; oldX < colWithStart.length; oldX += 1, newX += 1) {
        const hasStar = colWithStart[oldX];
        if (!hasStar) {
            for (const line of expanse) {
                line.splice(newX, 0, '.');
            }
            newX += 1;
        }
    }

    return expanse.map(line => line.join('')).join('\n');
}