const staffSegment = "\uE014";
const singleStaff = "\uE010";
const ledgerLine = "\uE022";

const stem = "\uE210";
// const missing;
// const empty;

interface IFlag {
  up: string;
  down: string;
}

interface IFlagCodes {
  eighth: IFlag;
  sixteenth: IFlag;
  [key: string]: IFlag;
}

const flagCodes: IFlagCodes = {
  eighth: { up: "\uE240", down: "\uE241" },
  sixteenth: { up: "\uE242", down: "\uE243" },
};

const barlines = {
  startingBarline: "\uE034",
  finalBarline: "\uE032",
  singleBarline: "\uE030",
};

interface IBeamCodes {
  eighth: string;
  sixteenth: string;
  [key: string]: string;
}

const beamCodes: IBeamCodes = {
  eighth: "\uE1F8",
  sixteenth: "\uE1FA",
};

const timeSignatureCodes = {
  one: "\uE081",
  two: "\uE082",
  three: "\uE083",
  four: "\uE084",
  five: "\uE085",
  six: "\uE086",
  seven: "\uE087",
  eight: "\uE088",
};

const accidentalCodes = {
  flat: "\uE260",
  natural: "\uE261",
  sharp: "\uE262",
};

const clefCodes = {
  treble: { code: "\uE050", position: -0.25, noteOffset: 0 },
  bass: { code: "\uE062", position: -0.75, noteOffset: 0.25 },
  alto: { code: "\uE05C", position: -0.5, noteOffset: 0.125 },
};

const noteheadCodes = {
  sixteenth: "\uE0A4",
  eighth: "\uE0A4",
  quarter: "\uE0A4",
  half: "\uE0A3",
  whole: "\uE0A2",
};

interface IRestCodes {
  whole: string;
  half: string;
  quarter: string;
  eighth: string;
  sixteenth: string;
  [key: string]: string;
}

const restCodes: IRestCodes = {
  whole: "\uE4E3",
  half: "\uE4E4",
  quarter: "\uE4E5",
  eighth: "\uE4E6",
  sixteenth: "\uE4E7",
};

interface ICompleteNotes {
  beamless: string;
  eighth: string;
  sixteenth: string;
  [key: string]: string;
}

const completeNotes: ICompleteNotes = {
  beamless: "\uE1F1",
  eighth: "\uE1F3",
  sixteenth: "\uE1F5",
};

const tupletBracketCodes = {
  left: "\uE201",
  right: "\uE203",
};

const tupletCodes = {
  three: "\uE883",
  four: "\uE884",
  five: "\uE885",
  six: "\uE886",
  seven: "\uE887",
};

export {
  staffSegment,
  ledgerLine,
  stem,
  barlines,
  clefCodes,
  //   missing,
  //   empty,
  noteheadCodes,
  accidentalCodes,
  timeSignatureCodes,
  restCodes,
  flagCodes,
  beamCodes,
  completeNotes,
  singleStaff,
  tupletBracketCodes,
  tupletCodes,
};
