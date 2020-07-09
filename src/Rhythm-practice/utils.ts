import {checkFirst, checkLast, checkMid} from './beamchecker';
import {reducer} from './reducer';

export const getRandomTimeSig = (size: number[][], mode: string) => {
  //obtain a random time signature or tuplet value from all possible user-entered values
  let randomSig: number[] = size[Math.floor(Math.random() * size.length)];
  //if in tuplet mode, return the sum of all subdivisions
  if (mode === 'tuplet') {
    randomSig = [randomSig.reduce(reducer, 0)];
  }
  return randomSig;
};

export const getRandomInt = () => {
  //generate a random int between 0 and 1
  const min = Math.ceil(0);
  const max = Math.floor(2);
  return Math.floor(Math.random() * (max - min)) + min;
};

//Adds values to an array
export const getBinaryFigure = (
  max: number,
  allowEmptyBars: boolean,
): number[] => {
  //create returned array
  let binaryFigure: number[] = [];
  for (let i = 0; i < max; i++) {
    binaryFigure.push(getRandomInt());
  }
  if (!allowEmptyBars) {
    const isEmpty = binaryFigure.filter((beat) => (beat = 1)).length === 0;
    if (isEmpty) return getBinaryFigure(max, allowEmptyBars);
  }
  return binaryFigure;
};

//Assembles all components
export const getFigure = (
  size: number[],
  currentFigures: number[][],
  mode: string,
  allowEmptyBars: boolean,
): JSX.Element[] => {
  let value: string;
  if (
    mode === 'bar' ||
    (mode === 'tuplet' && (size[0] === 3 || size[0] === 2))
  ) {
    value = 'eighth';
  } else if (mode === 'tuplet') {
    value = 'sixteenth';
  }
  // create temporary array where the rhythmic figure for each subdivision is stored as binary (1 = note, 0 = rest)
  let binaryFigures: number[][] = size.map((subdivision: number) => {
    return getBinaryFigure(subdivision, allowEmptyBars);
  });

  //concatenate all subdivisions to store the values of the bar/tuplet in the state.
  currentFigures.push(binaryFigures.flat());

  // translate the binary figure into a series of divs containing unicode characters
  let unicodeFigures: JSX.Element[] = binaryFigures
    .map((figure) => {
      return figure.map((beat: number, i: number) => {
        if (i === 0) return checkFirst(figure, value, mode);
        if (i > 0 && i < figure.length - 1)
          return checkMid(figure, i, value, mode);
        return checkLast(figure, value, mode);
      });
    })
    .flat();

  return unicodeFigures;
};
