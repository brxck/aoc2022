import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  for (let i = 0; i < input.length; i++) {
    const chars = new Set(input.slice(i, i + 4));
    if (chars.size == 4) {
      return i + 4;
    }
  }
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  for (let i = 0; i < input.length; i++) {
    const chars = new Set(input.slice(i, i + 14));
    if (chars.size == 14) {
      return i + 14;
    }
  }
};

run({
  part1: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 19,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
