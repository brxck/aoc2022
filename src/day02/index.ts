import run from "aocrunner";

type ShapeName = "rock" | "paper" | "scissors";

type Shape = {
  name: ShapeName;
  beats: ShapeName;
  score: number;
  encodings: string[];
};

const shapeMap: { [s in ShapeName]: Shape } = {
  rock: { name: "rock", beats: "scissors", score: 1, encodings: ["A", "X"] },
  paper: { name: "paper", beats: "rock", score: 2, encodings: ["B", "Y"] },
  scissors: {
    name: "scissors",
    beats: "paper",
    score: 3,
    encodings: ["C", "Z"],
  },
};
const shapes = Object.values(shapeMap);

const parseInput = (rawInput: string) => {
  const result = rawInput.split("\n").map((row) => row.trim().split(" "));
  return result;
};

const getScore = (theirs: Shape, yours: Shape) => {
  if (theirs.name == yours.name) {
    return yours.score + 3;
  } else if (theirs.beats == yours.name) {
    return yours.score + 0;
  } else {
    return yours.score + 6;
  }
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const matches = input.map((row) => {
    const [a, b, ..._] = row;
    const res = [
      shapes.find((s) => s.encodings.includes(a)),
      shapes.find((s) => s.encodings.includes(b)),
    ];
    return res as [Shape, Shape];
  });
  const scores = matches.map((choices) => getScore(...choices));

  return scores.reduce((a, b) => a + b);
};

type Outcome = "win" | "lose" | "draw";

const getShape = (theirs: Shape, outcome: Outcome): Shape => {
  if (outcome === "draw") {
    return theirs;
  } else if (outcome === "lose") {
    return shapeMap[theirs.beats];
  } else if (outcome === "win") {
    const s = shapes.find((s) => s.beats === theirs.name);
    if (!s) throw new Error("Impossible");
    return s;
  } else {
    throw new Error("Impossible");
  }
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const strategies = input.map((row) => {
    const shape = shapes.find((s) => s.encodings.includes(row[0])) as Shape;
    const outcome = row[1] === "X" ? "lose" : row[1] === "Y" ? "draw" : "win";
    const strategy: [Shape, Outcome] = [shape, outcome];
    return strategy;
  });
  const matches = strategies.map((strategy) => [
    strategy[0],
    getShape(...strategy),
  ]);
  const scores = matches.map((choices) => getScore(choices[0], choices[1]));

  return scores.reduce((a, b) => a + b);
};

run({
  part1: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        A Y
        B X
        C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
