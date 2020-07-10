import React from 'react';
import {View, Text} from 'react-native';

import {rhythmPracticeStyles} from './RhythmPracticeStyles';
import {tupletBracketCodes, tupletCodes} from '../UnicodeAssignment';

const tupletChecker = (tupletValue: number[]) => {
  switch (tupletValue[0]) {
    case 3:
      return tupletCodes.three;
    case 4:
      return tupletCodes.four;
    case 5:
      return tupletCodes.five;
    case 6:
      return tupletCodes.six;
    case 7:
      return tupletCodes.seven;
    default:
      return;
  }
};

const fillInTuplets = (size: number[]): JSX.Element[] => [
  <Text style={rhythmPracticeStyles.rpBravura}>{tupletBracketCodes.left}</Text>,
  <Text style={rhythmPracticeStyles.rpBravura}>{tupletChecker(size)}</Text>,
  <Text style={rhythmPracticeStyles.rpBravura}>
    {tupletBracketCodes.right}
  </Text>,
];

export {fillInTuplets};
