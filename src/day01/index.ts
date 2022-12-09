import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput
    .split("\n\n")
    .map((block) => block.split("\n").map((cal) => parseInt(cal)));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const elfTotals = input.map((inventory) =>
    inventory.reduce((a, b) => a + b, 0),
  );

  return Math.max(...elfTotals);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const elfTotals = input.map((inventory) =>
    inventory.reduce((a, b) => a + b, 0),
  );

  const maxCals = elfTotals.sort().slice(-4, -1);

  return maxCals.reduce((a, b) => a + b, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        1000
        2000
        3000

        4000

        5000
        6000

        7000
        8000
        9000

        10000
        `,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
