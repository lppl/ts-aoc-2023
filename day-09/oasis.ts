function isN(n: number) {
    return function (x: number): boolean {
        return n === x;
    }
}


export function predict(seq: number[]): number {
    if (seq.length === 1) {
        return seq.at(0)!;
    }
    if (seq.length <= 1) {
        throw Error("Should never happen");
    }
    const nextGen: number[] = [];
    for (let i = 1, last = seq.at(0)!; i < seq.length; i++) {
        const next = seq.at(i)!;
        nextGen.push(next - last);
        last = next;
    }
    const lastNextGen = nextGen.at(-1)!;
    const lastOriginal = seq.at(-1)!;
    if (nextGen.every(isN(lastNextGen))) {
        return lastNextGen + lastOriginal;
    } else {
        return lastOriginal + predict(nextGen);
    }
}

export function predictPrev(seq: number[]): number {
    if (seq.length === 1) {
        return seq.at(0)!;
    }
    if (seq.length < 1) {
        throw Error("Should never happen");
    }
    const nextGen: number[] = [];
    for (let i = 1, last = seq.at(0)!; i < seq.length; i++) {
        const next = seq.at(i)!;
        nextGen.push(next - last);
        last = next;
    }
    const firstOriginal = seq.at(0)!;
    const firstNextGen = nextGen.at(0)!;

    if (nextGen.every(isN(firstNextGen))) {
        return firstOriginal - firstNextGen;
    } else {
        return firstOriginal - predictPrev(nextGen);
    }
}
