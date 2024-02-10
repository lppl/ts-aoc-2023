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
        for (let x = 0; x < line.length; x += 1) {
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

export function countDistanceWithExpand(galaxy: string, expand_cost = 1_000_000): number {
    const stars = [];
    const lines = galaxy.split('\n');

    const colCost = new Array(lines[0].length).fill(expand_cost);
    const rowCost = new Array(lines.length).fill(expand_cost);

    for (let y = 0; y < lines.length; y += 1) {
        const line = lines[y];
        for (let x = 0; x < line.length; x += 1) {
            if (line[x] === '#') {
                colCost[x] = 1;
                rowCost[y] = 1;
            }
        }
    }

    for (let y = 0, offsetY = 0; y < lines.length; y += 1, offsetY += rowCost[y]) {
        const line = lines[y];
        for (let x = 0, offsetX = 0; x < line.length; x += 1, offsetX += colCost[x]) {
            if (line[x] === '#') {
                stars.push({x: offsetX, y: offsetY});
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
