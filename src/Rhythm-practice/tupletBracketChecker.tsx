import React from 'react';
import {View, Text} from 'react-native';

import {tupletBracketCodes, tupletCodes} from '../UnicodeAssignment';
import {tupletBracketCheckerStyle} from './TupletBracketCheckerStyle';

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

const fillInTuplets = (size: number[]): JSX.Element => (
  <View style={tupletBracketCheckerStyle.rpTupletBracketsContainer}>
    <Text style={tupletBracketCheckerStyle.tupletBracket}>
      {tupletBracketCodes.left}
    </Text>
    <Text style={tupletBracketCheckerStyle.tupletValue}>
      {tupletChecker(size)}
    </Text>
    <Text style={tupletBracketCheckerStyle.tupletBracket}>
      {tupletBracketCodes.right}
    </Text>
  </View>
);

export {fillInTuplets};
