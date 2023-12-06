const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\r\n");

function parseInput(input) {
  let lines = input.filter(Boolean);

  let seeds = lines[0]
    .split(":")[1]
    .split(" ")
    .filter(Boolean)
    .map((seed) => Number(seed));

  const soils = [];
  let lastSoil = null;

  lines.splice(1, lines.length).map((line) => {
    if (!line.match(/[0-9]+/g)) {
      if (!!lastSoil) {
        soils.push(lastSoil);
      }
      lastSoil = [];
    } else {
      line = line.split(" ");
      lastSoil.push(line);
    }
  });

  soils.push(lastSoil);

  return { seeds, soils };
}

function getSoilName(index) {
  switch (index) {
    case 0:
      return "SOIL";
    case 1:
      return "FERTILIZER";
    case 2:
      return "WATER";
    case 3:
      return "LIGHT";
    case 4:
      return "TEMPERATURE";
    case 5:
      return "HUMIDITY";
    case 6:
      return "LOCATION";
  }
}

function getSoilsValues(parsedInput) {
  let lastPositions = parsedInput.seeds;
  console.log("from", lastPositions);
  return parsedInput.soils.map((soil, index) => {
    lastPositions = getSoilValue(lastPositions, soil);
    console.log("to", getSoilName(index), lastPositions);
    return lastPositions;
  });
}

function getSoilValue(seeds, soils) {
  return seeds.map((seed) => {
    let numFound = null;
    soils.map((soil) => {
      let begin = Number(soil[1]);
      let end = begin + Number(soil[2]) - 1;
      if (begin <= seed && seed <= end) {
        let diff = Number(soil[0]) - begin;
        numFound = seed + diff;
        return;
      }
    });
    return numFound ? numFound : seed;
  });
}

const SOIL = 0;
const FERTILIZER = 1;
const WATER = 2;
const LIGHT = 3;
const TEMPERATURE = 4;
const HUMIDITY = 5;
const LOCATION = 6;

let parsedInput = parseInput(input);
let localisations = getSoilsValues(parsedInput);
console.log(Math.min(...localisations[6]));
