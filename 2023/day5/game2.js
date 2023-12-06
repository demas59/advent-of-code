const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\r\n");

function parseInput(input) {
  let lines = input.filter(Boolean);

  let seeds = lines[0]
    .split(":")[1]
    .split(" ")
    .filter(Boolean)
    .map((seed) => Number(seed));

  let seedRanges = [];
  for (let i = 0; i < seeds.length; i += 2) {
    const start = seeds[i];
    const end = seeds[i + 1] + start;
    seedRanges.push({ start, end });
  }

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

  return { seedRanges, soils };
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
  let lastPositions = parsedInput.seedRanges;
  console.log("from", lastPositions);
  return parsedInput.soils.map((soil, index) => {
    lastPositions = getSoilValue(lastPositions, soil, index);
    console.log("to", getSoilName(index), lastPositions);
    return lastPositions;
  });
}

function getSoilValue(seedRanges, soils) {
  console.log(
    "🚀 ~ file: game2.js:70 ~ getSoilValue ~ seedRanges:",
    seedRanges
  );
  return seedRanges.map((seedRange) => {
    let start, end;
    soils.map((soil) => {
      let soilStart = Number(soil[1]);
      let soilEnd = soilStart + Number(soil[2]) - 1;
      if (soilStart <= seedRange.start && seedRange.start <= soilEnd) {
        let diff = Number(soil[0]) - soilStart;
        start = seedRange.start + diff;
        return;
      } else if (soilStart <= seedRange.end && seedRange.end <= soilEnd) {
        let diff = Number(soil[0]) - soilStart;
        end = seedRange.end + diff;
        return;
      }
    });
    return start && end ? { start, end } : seedRange;
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
console.log("🚀 ~ file: game2.js:99 ~ localisations:", localisations);
// console.log(Math.min(...localisations[6]));
