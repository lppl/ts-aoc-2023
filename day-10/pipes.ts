const Dir = {
    Top: {x: 0, y: -1},
    Bottom: {x: 0, y: 1},
    Left: {x: -1, y: 0},
    Right: {x: 1, y: 0},
}
type Point = { x: number, y: number };

function isBetween(n: number, min: number, max: number) {
    return n >= min && n < max;
}

const s = (s: unknown) => JSON.stringify(s);

class Foobar {
    readonly h: number;
    readonly w: number;
    readonly sanitized: string;
    readonly done = new Map<number, number>();

    static cell = new Map<string, { x: number, y: number }[]>([
        ["|", [Dir.Top, Dir.Bottom]], // is a vertical pipe connecting north and south.
        ["-", [Dir.Left, Dir.Right]], // is a horizontal pipe connecting east and west.
        ["L", [Dir.Top, Dir.Right]], // is a 90-degree bend connecting north and east.
        ["J", [Dir.Top, Dir.Left]], // is a 90-degree bend connecting north and west.
        ["7", [Dir.Bottom, Dir.Left]], // is a 90-degree bend connecting south and west.
        ["F", [Dir.Bottom, Dir.Right]], // is a 90-degree bend connecting south and east.
        ["S", [Dir.Top, Dir.Right, Dir.Bottom, Dir.Left]], // is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
    ]);

    constructor(readonly input: string) {
        this.sanitized = input.replaceAll("\n", "");

        const l = input.split('\n')
        this.w = l[0].length;
        this.h = l.length;
    }

    toPoint(index: number): { x: number, y: number } {
        return {
            x: index % this.w,
            y: Math.floor(index / this.w)
        };
    }

    toIndex(p: Point): number {
        return p.y * this.w + p.x;
    }


    at(p: Point | number): string {
        if (typeof p === "number") {
            return this.sanitized.at(p) || '';
        } else {
            return this.sanitized.at(this.toIndex(p)) || '';
        }
    }

    move(from: Point, by: Point): Point {
        const x = from.x + by.x;
        const y = from.y + by.y;
        return {x, y};
    }

    isOnBoard(p: Point): boolean {
        return isBetween(p.x, 0, this.w) && isBetween(p.y, 0, this.h);
    }

    isPipe(p: Point): boolean {
        const s = this.sanitized.at(this.toIndex(p));
        return Boolean(s && s !== '.');
    }

    connected(index: number): number[] {
        const sign = this.at(index);
        const moves = Foobar.cell.get(sign)
        const p = this.toPoint(index);
        let ret: number[];
        if (moves) {
            ret = moves
                .map(move => this.move(move, p))
                .filter(move => this.isOnBoard(move))
                .filter(move => this.isPipe(move))
                .map(move => this.toIndex(move));
        } else {
            ret = [];
        }
        return ret;
    }

    walk(index: number) {
        const nodes = [[index, 0]];
        while (nodes.length) {
            const [node, howFar] = nodes.shift()!;
            this.done.set(node, howFar);
            this.connected(node)
                .filter(i => !this.done.has(i))
                .forEach(i => {
                    nodes.push([i, howFar + 1])
                })
        }
    }

    resolve(): number {
        console.log(this.input);
        this.walk(this.sanitized.indexOf('S'));
        const foo = Array.from(this.done.values()).reduce((a, b) => Math.max(a, b), 0)
        this.print()
        return foo;
    }

    print(pad = 5) {
        console.log("")
        for (let y = 0; y < this.h; y++) {
            const line = [];
            for (let x = 0; x < this.w; x++) {
                const p = this.toIndex({x, y});
                if (this.done.has(p)) {
                    line.push(String(this.done.get(p)).padStart(pad, "_"));
                } else {
                    line.push('.'.padStart(pad, '_'))
                }
            }
            console.log(line.join(''));
        }
        console.log("");
    }
}

export function findFurthest(input: string) {
    const foobar = new Foobar(input);
    return foobar.resolve();
}