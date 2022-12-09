import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput
    .split("\n")
    .map((line) =>
      line.split(",").map((range) => range.split("-").map((x) => parseInt(x))),
    );
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const overlaps = input.flatMap(([a, b]) => {
    return (a[0] <= b[0] && a[1] >= b[1]) || (a[0] >= b[0] && a[1] <= b[1]);
  });

  return overlaps.filter((x) => x).length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const overlaps = input.flatMap(([a, b]) => {
    return (
      (a[0] >= b[0] && a[0] < b[1]) || // a starts in b
      (a[1] <= b[1] && a[1] >= b[0]) || // a ends in b
      (b[0] >= a[0] && b[0] < a[1]) || // b starts in a
      (b[1] <= a[1] && b[1] >= a[0]) // b ends in a
    );
  });

  return overlaps.filter((x) => x).length;
};

run({
  part1: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        2-4,6-8
        2-3,4-5
        5-7,7-9
        2-8,3-7
        6-6,4-6
        2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
