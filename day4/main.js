const { readFileSync, promises: fsPromises } = require("fs");
const contents = readFileSync("input.txt", "utf-8");
const arr = contents.split(/\r?\n/);

const cutPairs = arr.map((pair) => pair.split(","));
const convertedElfToInt = cutPairs.map((pair) => {
  return pair.map((elf) => getCountainedInt(elf));
});

const total = convertedElfToInt.reduce((acc, pair) => {
  if (
    checkIfFullyCountain(pair[0], pair[1]) ||
    checkIfFullyCountain(pair[1], pair[0])
  ) {
    return acc + 1;
  }
  return acc;
}, 0);

console.log(total);

function checkIfFullyCountain(elf1, elf2) {
  return (
    (elf1[0] >= elf2[0] && elf1[0] <= elf2[1]) ||
    (elf1[1] >= elf2[0] && elf1[1] <= elf2[1])
  );
}

function getCountainedInt(elf) {
  elf = elf.split("-");
  return [parseInt(elf[0]), parseInt(elf[1])];
}
