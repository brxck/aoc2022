import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((x) => x.split("").map((x) => parseInt(x)));

type Visibility = {
  x: number;
  n: number;
  e: number;
  s: number;
  w: number;
  v?: boolean;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const vis: Visibility[][] = new Array(input.length).fill(null).map(() => []);

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      vis[i][j] = {
        x: input[i][j],
        n: Math.max(vis[i - 1]?.[j]?.n ?? -1, input[i - 1]?.[j] ?? -1),
        w: Math.max(vis[i]?.[j - 1]?.w ?? -1, input[i]?.[j - 1] ?? -1),
        e: 0,
        s: 0,
      };
    }
  }

  for (let i = input.length - 1; i >= 0; i--) {
    for (let j = input[i].length - 1; j >= 0; j--) {
      vis[i][j] = {
        ...vis[i][j],
        e: Math.max(vis[i]?.[j + 1]?.e ?? -1, input[i]?.[j + 1] ?? -1),
        s: Math.max(vis[i + 1]?.[j]?.s ?? -1, input[i + 1]?.[j] ?? -1),
      };
    }
  }

  for (let i = 0; i < vis.length; i++) {
    for (let j = 0; j < vis[i].length; j++) {
      const v = vis[i][j];
      v.v = v.x > v.n || v.x > v.e || v.x > v.s || v.x > v.w;
    }
  }

  return vis.flat().filter((v) => v.v).length;
};

const getDistance = (a: number, arr: number[]) => {
  let d = 0;
  for (let i = 0; i < arr.length; i++) {
    d += 1;
    if (arr[i] >= a) return d;
  }
  return d;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const vis = input.map((row, i) =>
    row.map((curr, j) => {
      return {
        x: curr,
        n: getDistance(
          curr,
          input
            .slice(0, i)
            .map((x) => x.filter((_, index) => index === j))
            .flat()
            .reverse(),
        ),
        w: getDistance(curr, row.slice(0, j).reverse()),
        e: getDistance(curr, row.slice(j + 1)),
        s: getDistance(
          curr,
          input
            .slice(i + 1)
            .map((x) => x.filter((_, index) => index === j))
            .flat(),
        ),
      };
    }),
  );
  const scores = vis.flat().map((v) => v.e * v.n * v.s * v.w);
  return Math.max(...scores);
};

run({
  part1: {
    tests: [
      {
        input: `
        30373
        25512
        65332
        33549
        35390
        `,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        30373
        25512
        65332
        33549
        35390
        `,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
