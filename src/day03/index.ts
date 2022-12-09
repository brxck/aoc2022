import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

const getPriority = (item: string) => {
  const code = item.charCodeAt(0);
  if (code >= 97) {
    return code - 96;
  } else {
    return code - 38;
  }
};

const intersection = <T>(a: T[], b: T[]) => {
  return a.filter((x) => b.includes(x));
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).map((x) => [
    x.slice(0, x.length / 2),
    x.slice(x.length / 2),
  ]);
  const overlap = input.map(([a, b]) => intersection(a.split(""), b.split("")));
  const priorities = overlap.map(([x]) => getPriority(x));
  return priorities.reduce((a, b) => a + b);
};

const chunk = <T>(list: T[], size: number) => {
  const chunks: T[][] = [];
  for (let i = 0; i < list.length; i += size) {
    chunks.push(list.slice(i, i + size));
  }
  return chunks;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).map((x) => x.split(""));
  const groups = chunk(input, 3);
  const badges = groups.map(([a, b, c]) => intersection(a, intersection(b, c)));
  const priorities = badges.map(([x]) => getPriority(x));
  return priorities.reduce((a, b) => a + b);
};

run({
  part1: {
    tests: [
      {
        input: `
        vJrwpWtwJgWrhcsFMMfFFhFp
        jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
        PmmdzqPrVvPwwTWBwg
        wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
        ttgJtRGJQctTZtZT
        CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
      vJrwpWtwJgWrhcsFMMfFFhFp
      jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
      PmmdzqPrVvPwwTWBwg
      wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
      ttgJtRGJQctTZtZT
      CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
