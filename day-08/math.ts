function greatestCommonDivider(a: number, b: number): number {
    if (b === 0) {
        return a;
    } else {
        return greatestCommonDivider(b, a % b);
    }
}

function leastCommonMultiple(a: number, b: number): number {
    const gcd = greatestCommonDivider(a, b);
    return Math.abs(a * b) / gcd;
}

export function leastCommonMultipleForArray(arr: number[]) {
    if (arr.length < 2) {
        throw Error("You need at least two numbers to calculate LCM.");
    }

    let lcm = leastCommonMultiple(arr[0], arr[1]);
    for (let i = 2; i < arr.length; i++) {
        lcm = leastCommonMultiple(lcm, arr[i]);
    }

    return lcm;
}
