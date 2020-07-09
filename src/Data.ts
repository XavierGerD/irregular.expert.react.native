let justRatios = [
  [1, 1],
  [25, 24],
  [9, 8],
  [6, 5],
  [5, 4],
  [4, 3],
  [45, 32],
  [3, 2],
  [8, 5],
  [5, 3],
  [9, 5],
  [15, 8],
];

// let pythagoreanRatios = [
// 	[1, 1],
// 	[256, 243],
// 	[9, 8],
// 	[32, 27],
// 	[81, 64],
// 	[4, 3],
// 	[729, 512],
// 	[3, 2],
// 	[128, 81],
// 	[27, 16],
// 	[16, 9],
// 	[243, 128]
// ];

let pitchClasses = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

let pitchClassesFromA = [
  "A",
  "Bb",
  "B",
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
];

let circleOfFifths = [
  "C",
  "G",
  "D",
  "A",
  "E",
  "B",
  "Gb",
  "Db",
  "Ab",
  "Eb",
  "Bb",
  "F",
];

let meantoneRatios = {
  fifth: (3 / 2) * Math.pow(80 / 81, 1 / 4),
  fourth: (4 / 3) * Math.pow(80 / 81, 1 / 4),
};

let pythagoreanRatios = {
  fifth: 3 / 2,
  fourth: 4 / 3,
};

export {
  justRatios,
  pythagoreanRatios,
  pitchClasses,
  pitchClassesFromA,
  circleOfFifths,
  meantoneRatios,
};
