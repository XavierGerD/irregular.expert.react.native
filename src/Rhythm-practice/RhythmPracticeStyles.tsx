import {StyleSheet} from 'react-native';

import {FONT_SIZE} from '../constants';

export const rhythmPracticeStyles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  rpButton: {
    borderRadius: 7,
    borderStyle: 'solid',
    width: 200,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rpTextBox: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 2,
    height: 50,
    width: 50,
    marginRight: 5,
    textAlign: 'center',
    fontFamily: 'Raleway-Medium',
  },

  rhythmContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },

  ralewayFont: {
    fontFamily: 'Raleway-Medium',
  },

  practiceMain: {
    height: 260,
    position: 'relative',
  },

  rpControlpanel: {
    flexDirection: 'row',
  },

  rpPanelsection: {
    flexDirection: 'row',
  },

  rpControlitem: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  rpBravura: {
    fontFamily: 'Bravura',
    fontSize: FONT_SIZE,
  },

  rpSingleStaff: {
    position: 'absolute',
    alignSelf: 'center',
    left: 0,
    top: 0,
    paddingTop: FONT_SIZE / 2 + 3,
    transform: [{scaleX: 60}],
  },

  rpBarline: {
    fontFamily: 'Bravura',
    fontSize: FONT_SIZE,
    paddingTop: FONT_SIZE / 2,
    paddingLeft: 20,
    paddingRight: 10,
  },
  instructions: {
    alignSelf: 'stretch',
    padding: 30,
    fontFamily: 'Raleway-Medium',
  },

  startButton: {
    width: 120,
    height: 50,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 10,
  },

  stopButton: {
    width: 120,
    height: 50,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 10,
  },

  rpTimeSignatureNumerator: {
    fontFamily: 'Bravura',
    fontSize: 60,
    marginTop: -76,
    marginLeft: 10,
    marginRight: 10,
  },

  rpTimeSignatureDenominator: {
    fontFamily: 'Bravura',
    fontSize: 60,
    marginTop: -200,
    marginLeft: 10,
    marginRight: 10,
  },

  rpBar: {
    flexDirection: 'row',
  },

  rpEmptyTupletBox: {
    height: FONT_SIZE,
  },
});
