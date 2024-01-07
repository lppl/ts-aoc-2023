
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