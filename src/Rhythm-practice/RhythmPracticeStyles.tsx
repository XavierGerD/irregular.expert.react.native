// @font-face {
//   font-family: "Bravura";
//   src: url("/fonts/woff/Bravura.woff") format("woff"),
//     url("/fonts/svg/Bravura.svg") format("svg"),
//     url("/fonts/otf/Bravura.otf") format("otf");
// }

import {StyleSheet} from 'react-native';

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

  // .controlContainer {
  //   font-family: "Raleway", sans-serif;
  //   padding-top: 10px;
  // }

  practiceMain: {
    height: 260,
    backgroundColor: 'blue',
  },

  rpControlpanel: {
    flexDirection: 'row',
    // height: 150,
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
    fontSize: 60,
  },

  // .rp-bars {
  //   display: flex;
  //   justify-content: space-between;
  //   /* position: absolute; */
  // }

  rpSingleStaff: {
    position: 'absolute',
    fontFamily: 'Bravura',
    paddingTop: 30,
    transform: [{scaleX: 20}],
    marginLeft: 100,
  },

  // .rp-bar {
  //   font-family: "Bravura";
  //   font-size: 60px;
  //   display: flex;
  //   position: relative;
  // }

  // .rp-barcontainer {
  //   display: flex;
  //   position: relative;
  //   justify-content: center;
  // }

  // .rp-barline {
  //   margin: 30px 15px 0px 15px;
  // }

  // rpTimesig: {
  //   flexDirection: 'column',
  //   fontSize: 60,
  //   fontFamily: 'Bravura',
  // },

  // .rp-tupletbrackets {
  //   display: flex;
  //   width: 100%;
  //   justify-content: space-between;
  //   position: absolute;
  // }

  // .rp-bracketcontainer {
  //   display: flex;
  //   width: 100%;
  //   justify-content: space-between;
  // }

  // .rp-tupletspacer {
  //   width: 20px;
  // }

  // .rp-tupletvalue {
  //   margin-top: -60px;
  // }

  // .rp-spacer {
  //   width: 15px;
  // }

  // .rp-quicktip {
  //   background-color: white;
  //   font-family: "Raleway", sans-serif;
  //   font-size: 18px;
  //   max-width: 300px;
  // }

  // @media (max-width: 850px) {
  //   #start {
  //     width: 120px;
  //     height: 60px;
  //   }
  //   #stop {
  //     width: 120px;
  //     height: 60px;
  //   }

  instructions: {
    alignSelf: 'stretch',
    padding: 30,
    fontFamily: 'Raleway-Medium',
  },

  //   .rp-controlpanel {
  //     font-size: 14px;
  //     height: 100px;
  //   }
  //   .title {
  //     font-size: 30px;
  //   }
  // }
});
