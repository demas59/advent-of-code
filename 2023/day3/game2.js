const { readFileSync, promises: fsPromises } = require("fs");
const contents = readFileSync("input.txt", "utf-8");
const arr = contents.trim().split(/\r?\n/);

let prepareLines = arr.map((line) => {
  return line
    .split(":")
    .slice(1)
    .join()
    .split(";")
    .map((subline) => subline.split(",").map((elem) => elem.trim().split(" ")));
});

const result = prepareLines.reduce(
  (previous, current) => previous + powerOfGame(current),
  0
);

function powerOfGame(line) {
  const fewestPossible = { red: 0, green: 0, blue: 0 };
  line.forEach((subline) => {
    subline.forEach((elem) => {
      fewestPossible[elem[1]] =
        fewestPossible[elem[1]] < Number(elem[0])
          ? Number(elem[0])
          : fewestPossible[elem[1]];
    });
  });
  return fewestPossible.red * fewestPossible.green * fewestPossible.blue;
}

console.log(result);
