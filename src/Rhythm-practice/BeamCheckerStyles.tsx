import {StyleSheet} from 'react-native';

import {FONT_SIZE} from '../constants';

export const BeamCheckerStyle = StyleSheet.create({
  rpBravura: {
    fontFamily: 'Bravura',
    fontSize: FONT_SIZE,
  },

  rpNote: {
    fontFamily: 'Bravura',
    fontSize: FONT_SIZE,
    flexDirection: 'row',
  },

  rpNoteWithBeam: {
    fontFamily: 'Bravura',
    fontSize: FONT_SIZE,
    flexDirection: 'row',
    marginLeft: 5,
  },

  rpEighthbeam: {
    fontFamily: 'Bravura',
    fontSize: FONT_SIZE,
    flexDirection: 'row',
    marginLeft: -2,
    marginRight: -2,
  },

  rpEighthflag: {
    fontFamily: 'Bravura',
    fontSize: FONT_SIZE,
    flexDirection: 'row',
    marginTop: -52.5,
    marginLeft: -2,
  },

  rpRest: {
    fontFamily: 'Bravura',
    fontSize: FONT_SIZE,
    flexDirection: 'row',
    marginLeft: 7,
    marginRight: 7,
  },
});
