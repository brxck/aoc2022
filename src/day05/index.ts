import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const rows = rawInput.slice(0, rawInput.indexOf("1") - 1).split("\n");

  const stacks: string[][] = [];
  for (const row of rows) {
    for (let i = 0; i < row.length; i++) {
      const crate = row.slice(i * 4, i * 4 + 3);
      const letter = crate.trim().split("")[1];
      if (letter) stacks[i] = (stacks[i] ?? []).concat(letter);
    }
  }

  const moves = rawInput
    .slice(rawInput.indexOf("move"))
    .split("\n")
    .map((line) => {
      const matches = line
        .match(/move (\d+) from (\d+) to (\d+)/)
        ?.map((x) => parseInt(x));
      if (!matches) throw new Error(`couldn't match move '${line}'`);
      return [matches[1], matches[2] - 1, matches[3] - 1];
    });

  return { stacks, moves };
};

const part1 = (rawInput: string) => {
  const { moves, stacks } = parseInput(rawInput);
  for (const move of moves.values()) {
    const [count, from, to] = move;
    const crates = stacks[from].splice(0, count).reverse();
    stacks[to].unshift(...crates);
  }

  return stacks.reduce((message, stack) => message + stack[0], "");
};

const part2 = (rawInput: string) => {
  const { moves, stacks } = parseInput(rawInput);
  for (const move of moves.values()) {
    const [count, from, to] = move;
    const crates = stacks[from].splice(0, count);
    stacks[to].unshift(...crates);
  }

  return stacks.reduce((message, stack) => message + stack[0], "");
};

run({
  part1: {
    tests: [
      {
        input: `
    [D]    
[N] [C]    
[Z] [M] [P]
1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
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
  trimTestInputs: false,
  onlyTests: false,
});
