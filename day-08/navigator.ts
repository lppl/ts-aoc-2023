import {leastCommonMultipleForArray} from "./math";

const enum Step {
    L = "L",
    R = "R",
}

const lineWithSteps = {
    is(line: string): boolean {
        return /^[L|R]+$/.test(line);
    },
    parse(line: string): Step[] {
        const result: Step[] = [];
        for (const char of line) {
            if (char === Step.L || char === Step.R) {
                result.push(char)
            } else {
                throw Error('Unrecognized step')
            }
        }

        return result;
    }
}

const lineWithStep = {
    is(line: string) {
        return /^\w{3} = \(\w{3}, \w{3}\)$/.test(line);
    },
    parse(line: string) {
        const foo = /^(\w{3}) = \((\w{3}), (\w{3})\)$/.exec(line);
        if (foo?.length === 4) {
            const [, field, L, R] = foo;
            return {field, L, R};
        } else {
            throw Error('Incorrect field declaration')
        }

    }
}

export class Navigator {

    constructor() {
    }

    steps: Step[] = [];
    map = new Map<string, Record<Step, string>>()
    initialField = "AAA";
    targetField = "ZZZ";

    addLine(line: string): void {
        if (line === '') {
            return;
        } else if (lineWithSteps.is(line)) {
            this.steps = lineWithSteps.parse(line);
        } else if (lineWithStep.is(line)) {
            const {field, L, R} = lineWithStep.parse(line);
            this.map.set(field, {L, R});
        } else {
            console.error({line})
            throw Error("Incorrect line")
        }
    }

    resolve(): number {
        let i = 0;
        const nextStep = (): Step => {
            const oldI = i;
            i += 1;
            if (i >= this.steps.length) {
                i = 0;
            }
            return this.steps[oldI];
        }
        if (!this.map.has(this.targetField)) {
            throw Error("Map does not contain target field");
        }
        for (let step = 0, field = this.initialField!; step < 1_000_000_000_000; step++) {
            if (field === this.targetField) {
                return step;
            }
            if (!this.map.has(field)) {
                throw Error(`Map does not contain field: ${JSON.stringify(field)}`)
            } else {
                field = this.map.get(field)![nextStep()];
            }
        }

        throw Error("Could not find target field in max steps limit");
    }
}

export class GhostNavigator {

    constructor() {
    }

    steps: Step[] = [];
    map = new Map<string, Record<Step, string>>()

    isInitialNode(node: string) {
        return node.endsWith("A")
    }

    isEndNode(node: string) {
        return node.endsWith("Z")
    }

    addLine(line: string): void {
        if (line === '') {
            return;
        } else if (lineWithSteps.is(line)) {
            this.steps = lineWithSteps.parse(line);
        } else if (lineWithStep.is(line)) {
            const {field, L, R} = lineWithStep.parse(line);
            this.map.set(field, {L, R});
        } else {
            console.error({line})
            throw Error("Incorrect line")
        }
    }

    resolve(): number {
        let i = 0;
        const nextStep = (): Step => {
            const oldI = i;
            i += 1;
            if (i >= this.steps.length) {
                i = 0;
            }
            return this.steps[oldI];
        }
        // console.log({initial: this.getNodes(this.isInitialNode), end: this.getNodes(this.isEndNode), map: this.map})

        // const winningNodes = Array.from(this.map.entries()).filter(([node, {L, R}]) => {
        //     return this.isEndNode(R);
        // }).map(([node]) => node);
        // console.log({winningNodes})
        // winningNodes: [ "BQT", "NLQ", "PNN", "KBP", "LXM", "QNR" ],

        const max = 1_000_000;
        const x = this.getNodes(this.isInitialNode).map((node: string) => {
            const foobar = [];
            let lastHit = 0;
            for (let step = 0, current = node; step < max; step++) {
                const direction = nextStep();
                current = this.map.get(current)![direction];
                if (this.isEndNode(current)) {
                    foobar.push({step, diff: step - lastHit});
                    lastHit = step;
                    if (foobar.length === 3) {
                        return {offset: foobar[0].diff, period: foobar[1].diff}
                    }
                }
            }
            throw Error('Should not be here');
        })

        return leastCommonMultipleForArray(x.map(({period}) => period));
    }

    getNodes(predicate: (n: string) => boolean) {
        return Array.from(this.map.keys()).filter(predicate);
    }
}
