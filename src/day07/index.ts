import run from "aocrunner";

type FileOutput = { type: "file"; name: string; size: number };
type DirOutput = { type: "dir"; name: string };
type Output = FileOutput | DirOutput;

type Command =
  | { name: "cd"; argument: string }
  | { name: "ls"; output: Output[] };

type Node = { name: string; size: number; sub: Node[] };

const parseInput = (rawInput: string) => {
  return rawInput
    .split("$")
    .filter((x) => !!x)
    .map((block) => {
      const [input, ...out] = block.split("\n");
      const [_, name, argument] = input.split(" ");
      if (name !== "cd" && name !== "ls") {
        throw new Error(`Invalid command ${name}`);
      }
      const output: Output[] = out
        .filter((x) => x)
        .map((out) => {
          const [a, b] = out.split(" ");
          if (a === "dir") {
            return { type: "dir", name: b };
          } else {
            return { type: "file", name: b, size: parseInt(a) };
          }
        });
      return { name, argument, output } as Command;
    });
};

const getNode = (tree: Node, path: string[]) => {
  return path.reduce<Node | undefined>(
    (node, name) => node?.sub.find((x) => x.name === name),
    tree,
  );
};

const insertNode = (tree: Node, path: string[], size: number) => {
  const name = path.at(-1);
  const parent = getNode(tree, path.slice(0, -1));
  if (!name || !parent) throw new Error("Bad path");
  parent.sub.push({ name, size, sub: [] });
};

const getTree = (
  commands: Command[],
  path: string[] = [],
  tree: Node = { name: "root", size: 0, sub: [] },
): Node => {
  if (!commands.length) return tree;

  const [cmd, ...cmds] = commands;

  if (cmd.name === "cd") {
    if (cmd.argument === "..") {
      return getTree(cmds, path.slice(0, -1), tree);
    } else {
      return getTree(cmds, [...path, cmd.argument], tree);
    }
  } else {
    const size = cmd.output
      .filter((x): x is FileOutput => x.type === "file")
      .reduce((total, file) => file.size + total, 0);
    insertNode(tree, path, size);
    return getTree(cmds, path, tree);
  }
};

const isDirectChild = (a: string | string[], b: string | string[]) => {
  const aa = Array.isArray(a) ? a.join("/") : a;
  const bb = Array.isArray(b) ? b.join("/") : b;
  const relativePath = bb.replace(`${aa}/`, "");
  return !relativePath.includes("/");
};

const getDirSizes = (
  tree: Node | Node[],
  path: string[] = [],
): { [dir: string]: number } => {
  if (!Array.isArray(tree)) return getDirSizes(tree.sub);
  if (!tree.length) return {};
  const [node, ...nodes] = tree;
  const nodePath = [...path, node.name.replace("/", "")];
  const siblings = getDirSizes(nodes, path);
  const children = getDirSizes(node.sub, nodePath);
  const childrenSize = Object.entries(children)
    .filter(([childPath]) => isDirectChild(nodePath, childPath))
    .reduce((total, [_, size]) => total + size, 0);
  return {
    [nodePath.join("/") || "/"]: node.size + childrenSize,
    ...siblings,
    ...children,
  };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const tree = getTree(input);
  const sizes = getDirSizes(tree);
  const total = Object.values(sizes)
    .filter((size) => size <= 100000)
    .reduce((total, size) => total + size, 0);

  return total;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const tree = getTree(input);
  const sizes = getDirSizes(tree);
  const target = 30000000 - (70000000 - sizes["/"]);
  const toDelete = Object.values(sizes).filter((size) => size >= target);
  toDelete.sort((a, b) => a - b);
  return toDelete[0];
};

run({
  part1: {
    tests: [
      {
        input: `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
