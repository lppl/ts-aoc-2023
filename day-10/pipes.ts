const enum Direction {
    Top = "Top",
    Bottom = "Bottom",
    Right = "Right",
    Left = "Left",
}

const Steps = {
    Top: {x: 0, y: -1},
    Bottom: {x: 0, y: 1},
    Left: {x: -1, y: 0},
    Right: {x: 1, y: 0},
}

const directions = [
    Direction.Top,
    Direction.Bottom,
    Direction.Right,
    Direction.Left,
];

const opposite = {
    [Direction.Top]: Direction.Bottom,
    [Direction.Right]: Direction.Left,
    [Direction.Left]: Direction.Right,
    [Direction.Bottom]: Direction.Top,
}

const transitions: Record<Direction, Record<string, Direction>> = {
    [Direction.Top]: {
        "|": Direction.Bottom,
        "J": Direction.Left,
        "L": Direction.Right,
    },
    [Direction.Bottom]: {
        "|": Direction.Top,
        "F": Direction.Right,
        "7": Direction.Left,
    },
    [Direction.Left]: {
        "-": Direction.Right,
        "7": Direction.Bottom,
        "J": Direction.Top,
    },
    [Direction.Right]: {
        "-": Direction.Left,
        "L": Direction.Top,
        "F": Direction.Bottom,
    },
}

const s = (v: any) => JSON.stringify(v)

type Point = { x: number, y: number };

function move(a: Point, b: Point): Point {
    return {
        x: a.x + b.x,
        y: a.y + b.y
    }
}

function isDirection(dir: any): dir is Direction {
    return directions.includes(dir);
}

function samePoint(a: Point, b: Point): boolean {
    return a.x === b.x && a.y === b.y;
}

export function findFurthest(input: string, max = 1_000_000) {
    const map = input.split("\n");
    const w = map[0].length;

    const startIndex = input.replaceAll("\n", "").indexOf("S");

    const startPoint = {
        x: startIndex % w,
        y: Math.floor(startIndex / w),
    };

    function signAt(p: Point): string {
        return map[p.y][p.x];
    }

    const initialDirection = directions.find((direction) => {
        const sign = signAt(move(startPoint, Steps[direction]));
        return sign && sign !== '.';
    });

    if (!isDirection(initialDirection)) {
        throw Error('Should not happen. There must be at one pipe connected to start.');
    }

    for (let distance = 0,
             point = move(startPoint, Steps[initialDirection]),
             from = opposite[initialDirection];
         distance < max;
         distance++
    ) {
        if (samePoint(startPoint, point)) {
            return Math.ceil(distance / 2);
        }

        const sign = signAt(point);
        const to = transitions[from][sign];

        if (!isDirection(to)) {
            throw Error(`Direction must be defined.`);
        }

        point = move(point, Steps[to]);
        from = opposite[to];
    }

    throw Error(`Answer not found in given steps; max=${max}.`);
}


export function getPath(input: string, max = 1_000_000): Point[] {
    const map = input.split("\n");
    const w = map[0].length;

    const startIndex = input.replaceAll("\n", "").indexOf("S");

    const startPoint = {
        x: startIndex % w,
        y: Math.floor(startIndex / w),
    };

    function signAt(p: Point): string {
        return map[p.y][p.x];
    }

    const initialDirection = directions.find((direction) => {
        try {
            const sign = signAt(move(startPoint, Steps[direction]));
            return Boolean(sign && sign !== '.');
        } catch (e) {
            return false;
        }
    });

    if (!isDirection(initialDirection)) {
        throw Error('Should not happen. There must be at one pipe connected to start.');
    }

    const path: Point[] = [startPoint];

    for (let distance = 0,
             point = move(startPoint, Steps[initialDirection]),
             from = opposite[initialDirection];
         distance < max;
         distance++
    ) {
        path.push(point);
        if (samePoint(startPoint, point)) {
            return path;
        }

        const sign = signAt(point);
        const to = transitions[from][sign];

        if (!isDirection(to)) {
            throw Error(`Direction must be defined.`);
        }

        point = move(point, Steps[to]);
        from = opposite[to];
    }

    throw Error(`Answer not found in given steps; max=${max}.`);
}

function print(p: Point, m: string[], zoom=1) {
    for(let i = p.y - zoom, end = p.y + zoom; i <= end; i += 1) {
        console.log(m[i].slice(p.x - zoom, p.x + 1 + 2 * zoom));
    }
}

export function countEnclosed(input: string, max = 1_000_000) {
    const map = input.split("\n");
    const w = map[0].length;
    const h = map.length;

    let enclosed = 0;

    const path = getPath(input);
    for (let y = 0; y < h; y += 1) {
        for (let x = 0, insideLoop = false, entrySign = null; x < w; x += 1) {
            const sign = map[y][x];
            let onPath = path.some(p => p.x === x && p.y === y);

            if (insideLoop && sign === ".") {
                enclosed += 1;
                console.log('foobar', JSON.stringify({x, y}))
                print({x, y}, map);
            } else if (onPath && sign === "|") {
                insideLoop = !insideLoop;
            } else if (onPath && ['L', "F"].includes(sign)) {
                entrySign = sign;
                insideLoop = !insideLoop;
            } else if (onPath && ['J', "7"].includes(sign)) {
                if (entrySign === "L" && sign === "7" || entrySign === "F" && sign === "J") {
                    insideLoop = !insideLoop;
                    entrySign = null;
                } else {
                    entrySign = null;
                }
            }
        }
    }


    return enclosed;
}
