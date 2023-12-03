const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");
const inputArray = input.split("\n");

function isDigit(str) {
  return /[0-9]+/g.test(str);
}

function getEngineSchemaValue(input) {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const char = input[i][j];
      if (isDigit(char)) {
        const numberLen = getNumberlength(input[i], j);
        const isGood = checkIfNumberIsInScope(input, i, j, numberLen);
        if (isGood) {
          console.log(
            "special char for number ",
            input[i].substring(j, j + numberLen),
            " was ",
            isGood
          );
          sum += Number(input[i].substring(j, j + numberLen));
          j += numberLen;
        }
      }
    }
  }
  return sum;
}

function checkIfNumberIsInScope(input, i, j, numberLen) {
  for (let index = 0; index < numberLen; index++) {
    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        const char = input[i + x]?.[index + j + y];
        if (char && !isDigit(char) && char !== ".") {
          return char;
        }
      }
    }
  }
  return false;
}

function getNumberlength(line, j) {
  let index = 1;
  while (isDigit(line[j + index])) {
    index++;
  }
  return index;
}

console.log(
  "🚀 ~ file: game1.js:6 ~ getEngineSchemaValue ~ getEngineSchemaValue:",
  getEngineSchemaValue(inputArray)
);
