import {expect, test} from "bun:test";
import {readFileSync} from "fs";

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

const connectors = {
    [Direction.Top]: ['|', '7', 'F'],
    [Direction.Left]: ['-', 'L', 'F'],
    [Direction.Right]: ['-', '7', 'J'],
    [Direction.Bottom]: ['|', 'J', 'L'],
};

const foobar = [
    ["|", {Top: true, Right: false, Bottom: true, Left: false}],
    ["-", {Top: false, Right: true, Bottom: false, Left: true}],
    ["J", {Top: true, Right: false, Bottom: false, Left: true}],
    ["L", {Top: true, Right: true, Bottom: false, Left: false}],
    ["F", {Top: false, Right: true, Bottom: true, Left: false}],
    ["7", {Top: false, Right: false, Bottom: true, Left: true}],
] as const;

function detectPipe(p: Point, input: string) {
    const map = input.split('\n').map(l => l.split(''));

    const def = Object.fromEntries(directions.map(dir => {
        const pp = move(p, Steps[dir]);
        const sign = map[pp.y] ? map[pp.y][pp.x] : 'outside of map';
        return [dir, connectors[dir].includes(sign)]
    }));

    const ret = foobar.find(([, o]) =>
        def.Top === o.Top &&
        def.Right === o.Right &&
        def.Bottom === o.Bottom &&
        def.Left === o.Left
    )

    if (!ret) {
        throw Error("Should not happen");
    }

    return ret[0];
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

function getStartDirection(startPipe: string) {
    switch (startPipe) {
        case "-":
            return Direction.Left;
        case "|":
            return Direction.Bottom;
        case "F":
            return Direction.Right;
        case "L":
            return Direction.Right;
        case "J":
            return Direction.Left;
        case "7":
            return Direction.Left;
        default:
            throw Error('Should not happen');
    }
}

export function findFurthest(input: string, max = 1_000_000) {
    const map = input.split("\n");
    const w = map[0].length;

    const startIndex = input.replaceAll("\n", "").indexOf("S");

    const startPoint = {
        x: startIndex % w,
        y: Math.floor(startIndex / w),
    };
    const startPipe = detectPipe(startPoint, input);
    const initialDirection = getStartDirection(startPipe);

    function signAt(p: Point): string {
        return map[p.y][p.x];
    }


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


export function getPath(input: string, max = 1_000_000): { x: number, y: number, sign: string }[] {
    const map = input.split("\n");
    const w = map[0].length;

    const startIndex = input.replaceAll("\n", "").indexOf("S");

    const startPoint = {
        x: startIndex % w,
        y: Math.floor(startIndex / w),
    };
    const startPipe = detectPipe(startPoint, input);
    const initialDirection = getStartDirection(startPipe);

    function signAt(p: Point): string {
        return map[p.y][p.x];
    }


    if (!isDirection(initialDirection)) {
        throw Error('Should not happen. There must be at one pipe connected to start.');
    }

    const path: { x: number, y: number, sign: string }[] = [{...startPoint, sign: signAt(startPoint)}];

    for (let distance = 0,
             point = move(startPoint, Steps[initialDirection]),
             from = opposite[initialDirection];
         distance < max;
         distance++
    ) {
        path.push({...point, sign: signAt(point)});
        if (samePoint(startPoint, point)) {
            return path;
        }

        const sign = signAt(point);
        const to = transitions[from][sign];

        if (!isDirection(to)) {
            console.log({point, from, to, sign})
            throw Error(`Direction must be defined.`);
        }

        point = move(point, Steps[to]);
        from = opposite[to];
    }

    throw Error(`Answer not found in given steps; max=${max}.`);
}

function print(p: Point, input: string, zoom = 1) {
    const m = input.split('\n');
    console.log(JSON.stringify(p))
    for (let i = p.y - zoom, end = p.y + zoom; i <= end; i += 1) {
        console.log(m[i].slice(p.x - zoom, p.x + 2 * zoom));
    }
    console.log("")
}

export function countEnclosed(input: string, max = 1_000_000) {
    const map = input.split("\n").map(l => l.split(''));
    const w = map[0].length;
    const h = map.length;

    let enclosed = 0;

    const path = getPath(input);

    const startPoint = path[0]
    const startPipe = detectPipe(startPoint, input);
    map[startPoint.y][startPoint.x] = startPipe;
    path[0].sign = startPipe;

    for (let y = 0; y < h; y += 1) {
        let inside = false;
        let entrySign: string | null = null;
        for (let x = 0; x < w; x += 1) {
            const sign = map[y][x];
            const onPath = path.some(p => p.x === x && p.y === y);
            if (inside && sign === '.') {
                enclosed += 1;
                // console.log({entrySign, sign, enclosed, inside, onPath})
                // console.log({line: `${x},${y} ${map[y].join(``)}`})
            } else if (onPath && sign === '|') {
                inside = !inside;
            } else if (onPath && !entrySign && (['F', 'L'].includes(sign))) {
                entrySign = sign;
            } else if (onPath && entrySign === 'F' && sign === 'J') {
                inside = !inside;
                entrySign = null;
            } else if (onPath && entrySign === 'L' && sign === '7') {
                inside = !inside;
                entrySign = null;
            } else if (onPath && ['J', '7'].includes(sign)) {
                entrySign = null;
            }
        }
    }

    return enclosed;
}