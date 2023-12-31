type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

type ParsedHand = Prettify<{ rawHand: string, score: number, bid: number }>;

const cardScores = new Map([
    ["A", 13],
    ["K", 12],
    ["Q", 11],
    ["J", 10],
    ["T", 9],
    ["9", 8],
    ["8", 7],
    ["7", 6],
    ["6", 5],
    ["5", 4],
    ["4", 3],
    ["3", 2],
    ["2", 1]
]);

const cardToStr = new Map([
    ["A", "14"],
    ["K", "13"],
    ["Q", "12"],
    ["J", "11"],
    ["T", "10"],
    ["9", "09"],
    ["8", "08"],
    ["7", "07"],
    ["6", "06"],
    ["5", "05"],
    ["4", "04"],
    ["3", "03"],
    ["2", "02"]
]);

const ranks = {
    fiveOfAKind: 7,
    fourOfAKind: 6,
    fullHouse: 5,
    threeOfAKind: 4,
    twoPairs: 3,
    pair: 2,
    highCard: 1,
}

function getScore(hand: string) {
    const counts = new Map<string, number>;
    const foo: string[] = [];
    for (const c of hand) {
        counts.set(c, (counts.get(c) || 0) + 1);
        foo.push(c);
    }
    const foobar = Array.from(counts.entries()).sort(([leftCard, leftCount], [rightCard, rightCount]) => leftCount === rightCount ? compareCard(leftCard, rightCard) : rightCount - leftCount);
    const rank = getRank(foobar.map(x => x[1]));
    return Number(String(rank) + foo.map((card) => cardToStr.get(card)).join(''))
}

function compareCard(a: string, b: string) {
    return (cardScores.get(b) || 0) - (cardScores.get(a) || 0)
}


const getRank = (values: Iterable<number>) => {
    const m = Array.from(values).sort().reverse()
    const largestCount = m[0];
    const kindsCount = m.length;

    if (kindsCount === 1) {
        return ranks.fiveOfAKind
    } else if (kindsCount === 2 && largestCount === 4) {
        return ranks.fourOfAKind
    } else if (kindsCount === 2 && largestCount === 3) {
        return ranks.fullHouse
    } else if (kindsCount === 3 && largestCount === 3) {
        return ranks.threeOfAKind
    } else if (kindsCount === 3 && largestCount === 2) {
        return ranks.twoPairs
    } else if (kindsCount === 4) {
        return ranks.pair
    } else if (kindsCount === 5) {
        return ranks.highCard
    } else {
        throw Error(`Unrecognized rank, ${JSON.stringify(m)}`)
    }
}

export class Engine
{
    result: ParsedHand[] = [];

    addLine(line:string) {
        const [rawHand, rawScore] = line.split(' ');
        const bid = parseInt(rawScore);
        this.result.push({rawHand, score: getScore(rawHand), bid})
    }

    resolve() {
        const ranked = this.result.sort((left, right) => right.score - left.score).reverse();
        return ranked.map(({bid}, i) => bid * (i + 1)).reduce((acc, i) => acc + i, 0);
    }
}
