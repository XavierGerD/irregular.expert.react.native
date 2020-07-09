import React from 'react';

import {Text, View} from 'react-native';
import {
  completeNotes,
  beamCodes,
  flagCodes,
  restCodes,
} from '../UnicodeAssignment';

import {BeamCheckerStyle} from './BeamCheckerStyles';

let checkFirst = (figure: number[], value: string, mode: string) => {
  //f the first beat and the second beat are both active, add a beam to the right
  if (figure[0] === 1 && figure[1] === 1) {
    return (
      <View style={BeamCheckerStyle.rpNote}>
        <Text style={BeamCheckerStyle.rpBravura}>{completeNotes.beamless}</Text>
        <Text style={BeamCheckerStyle.rpEighthbeam}>{beamCodes[value]}</Text>
      </View>
    );
    //if the first beat is active but the second beat is a rest, add a flag
  } else if (figure[0] === 1 && figure[1] === 0) {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={BeamCheckerStyle.rpBravura}>{completeNotes.beamless}</Text>
        {mode === 'bar' && (
          <Text style={BeamCheckerStyle.rpEighthflag}>
            {flagCodes[value].up}
          </Text>
        )}
      </View>
    );
    //if the current beat is a rest, push a rest
  } else if (figure[0] === 0) {
    return <Text style={BeamCheckerStyle.rpRest}>{restCodes[value]}</Text>;
  }
  return <View />;
};

//Checks to see which beam to push for any middle note
let checkMid = (figure: number[], i: number, value: string, mode: string) => {
  //if the current beat, the one before and the one after are active, add a through beam
  if (figure[i] === 1 && figure[i - 1] === 1 && figure[i + 1] === 1) {
    return (
      <View style={BeamCheckerStyle.rpNote}>
        <Text style={BeamCheckerStyle.rpBravura}>{completeNotes[value]}</Text>
        <Text style={BeamCheckerStyle.rpEighthbeam}>{beamCodes[value]}</Text>
      </View>
    );
    //if the current beam is active, but only the one after is active, add a beam to the right
  } else if (figure[i - 1] === 0 && figure[i] === 1 && figure[i + 1] === 1) {
    return (
      <View style={BeamCheckerStyle.rpNote}>
        <Text style={BeamCheckerStyle.rpBravura}>{completeNotes.beamless}</Text>
        <Text style={BeamCheckerStyle.rpEighthbeam}>{beamCodes[value]}</Text>
      </View>
    );
    //if the current beam is active, but only the one before is active, add a beam to the left
  } else if (figure[i - 1] === 1 && figure[i] === 1 && figure[i + 1] === 0) {
    return <Text style={BeamCheckerStyle.rpNote}>{completeNotes[value]}</Text>;
    //if only the current beat is active, add a flag
  } else if (figure[i - 1] === 0 && figure[i] === 1 && figure[i + 1] === 0) {
    return (
      <View style={BeamCheckerStyle.rpNote}>
        <Text style={BeamCheckerStyle.rpBravura}>{completeNotes.beamless}</Text>
        <Text style={BeamCheckerStyle.rpEighthflag}>{flagCodes[value].up}</Text>
      </View>
    );
    // } else if (
    //   figure[0 + i] === 1 &&
    //   figure[1 + i] === 0 &&
    //   figure.length === 3 &&
    //   mode === 'bar'
    // ) {
    //   return <View />;
    //if the current beat is a rest, push a rest
  } else if (figure[i] === 0) {
    return <Text style={BeamCheckerStyle.rpRest}>{restCodes[value]}</Text>;
  }
  return <View />;
};

//Checks to see which beam for last note
let checkLast = (figure: number[], value: string, mode: string) => {
  if (figure[figure.length - 1] === 1 && figure[figure.length - 2] === 1) {
    //if last beat and the one before are active, add a beam to the left
    return <Text style={BeamCheckerStyle.rpNote}>{completeNotes[value]}</Text>;
    //if only last beat is active, add a flag
  } else if (
    figure[figure.length - 1] === 1 &&
    figure[figure.length - 2] === 0
  ) {
    return (
      <View style={BeamCheckerStyle.rpNote}>
        <Text style={BeamCheckerStyle.rpBravura}>{completeNotes.beamless}</Text>
        <Text style={BeamCheckerStyle.rpEighthflag}>{flagCodes[value].up}</Text>
      </View>
    );
    //if the current beat is a rest
  } else if (
    figure[figure.length - 2] === 1 &&
    figure[figure.length - 1] === 0 &&
    figure.length === 2 &&
    mode === 'bar'
  ) {
    return <View />;
    //if the current beat is a rest, push a rest
  } else if (figure[figure.length - 1] === 0) {
    return <Text style={BeamCheckerStyle.rpRest}>{restCodes[value]}</Text>;
  }
  return <View />;
};

// render beamless black notes
let renderBeamless = (notes: number[], elements: JSX.Element[]) => {
  notes.forEach((note) => {
    if (note === 1) {
      elements.push(
        <Text style={BeamCheckerStyle.rpNote}>
          <Text style={BeamCheckerStyle.rpBravura}>
            {completeNotes.beamless}
          </Text>
          <Text className="rp-spacer" />
        </Text>,
      );
    }
    if (note === 0) {
      elements.push(<Text className="rp-rest">{restCodes.quarter}</Text>);
    }
  });
};

export {checkFirst, checkLast, checkMid, renderBeamless};
