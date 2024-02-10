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

export function countDistance(galaxy: string): number {
    const stars = [];
    const lines = galaxy.split('\n');

    for (let y = 0; y < lines.length; y += 1) {
        const line = lines[y];
        for(let x = 0; x < line.length; x += 1) {
            const sign = line[x];
            if (sign === '#') {
                stars.push({x, y});
            }
        }
    }

    let distance = 0;
    for (let s1 = 0; s1 < stars.length - 1; s1 += 1) {
        for (let s2 = s1 + 1; s2 < stars.length; s2 += 1) {
            distance += Math.abs(stars[s2].x - stars[s1].x) + Math.abs(stars[s2].y - stars[s1].y);
        }
    }
    return distance;
}