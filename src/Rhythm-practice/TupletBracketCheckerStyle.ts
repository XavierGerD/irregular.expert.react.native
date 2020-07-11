import {StyleSheet} from 'react-native';

import {FONT_SIZE} from '../constants';

export const tupletBracketCheckerStyle = StyleSheet.create({
  tupletValue: {
    fontFamily: 'Bravura',
    fontSize: FONT_SIZE,
    marginTop: FONT_SIZE * -1,
    height: FONT_SIZE * 2,
  },

  tupletBracket: {
    fontFamily: 'Bravura',
    fontSize: FONT_SIZE,
    height: FONT_SIZE,
  },

  rpTupletBracketsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
