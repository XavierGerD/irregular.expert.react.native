import {StyleSheet} from 'react-native';

import {FONT_SIZE} from '../constants';

export const BeamCheckerStyle = StyleSheet.create({
  rpBravura: {
    fontFamily: 'Bravura',
    fontSize: FONT_SIZE,
    lineHeight: FONT_SIZE * 3,
  },

  rpNote: {
    fontFamily: 'Bravura',
    fontSize: FONT_SIZE,
    flexDirection: 'row',
    lineHeight: FONT_SIZE * 3,
  },

  rpNoteWithBeam: {
    fontFamily: 'Bravura',
    fontSize: FONT_SIZE,
    flexDirection: 'row',
    marginLeft: 5,
    lineHeight: FONT_SIZE * 3,
  },

  rpEighthbeam: {
    fontFamily: 'Bravura',
    fontSize: FONT_SIZE,
    flexDirection: 'row',
    marginLeft: -2,
    marginRight: -2,
    lineHeight: FONT_SIZE * 3,
  },

  rpEighthflag: {
    fontFamily: 'Bravura',
    fontSize: FONT_SIZE,
    flexDirection: 'row',
    marginTop: -60,
    marginLeft: -2,
    lineHeight: FONT_SIZE * 3,
  },

  rpRest: {
    fontFamily: 'Bravura',
    fontSize: FONT_SIZE,
    flexDirection: 'row',
    marginLeft: 7,
    marginRight: 7,
    lineHeight: FONT_SIZE * 3,
  },
});
