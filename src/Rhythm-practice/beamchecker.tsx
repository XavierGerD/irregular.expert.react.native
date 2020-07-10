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
  const firstNoteIsOn = figure[0] === 1;
  const firstNoteIsOff = figure[0] === 0;
  const secondNoteIsOn = figure[1] === 1;
  const secondNoteIsOff = figure[1] === 0;

  //f the first beat and the second beat are both active, add a beam to the right
  if (firstNoteIsOn && secondNoteIsOn) {
    return (
      <View style={BeamCheckerStyle.rpNoteWithBeam}>
        <Text style={BeamCheckerStyle.rpBravura}>{completeNotes.beamless}</Text>
        <Text style={BeamCheckerStyle.rpEighthbeam}>{beamCodes[value]}</Text>
      </View>
    );
    //if the first beat is active but the second beat is a rest, add a flag
  } else if (firstNoteIsOn && secondNoteIsOff) {
    return (
      <View style={{flexDirection: 'row', marginRight: 20}}>
        <Text style={BeamCheckerStyle.rpBravura}>{completeNotes.beamless}</Text>
      </View>
    );
    //if the current beat is a rest, push a rest
  } else if (firstNoteIsOff && secondNoteIsOff) {
    return <Text style={BeamCheckerStyle.rpRest}>{restCodes['quarter']}</Text>;
  } else if (firstNoteIsOff) {
    return <Text style={BeamCheckerStyle.rpRest}>{restCodes[value]}</Text>;
  }
  return <View />;
};

//Checks to see which beam to push for any middle note
let checkMid = (figure: number[], i: number, value: string, mode: string) => {
  const currentNoteIsOn = figure[i] === 1;
  const currentNoteIsOff = figure[i] === 0;
  const previousNoteIsOn = figure[i - 1] === 1;
  const previousNoteIsOff = figure[i - 1] === 0;
  const nextNoteIsOn = figure[i + 1] === 1;
  const nextNoteIsOff = figure[i + 1] === 0;

  //if the current beat, the one before and the one after are active, add a through beam
  if (currentNoteIsOn && previousNoteIsOn && nextNoteIsOn) {
    return (
      <View style={BeamCheckerStyle.rpNote}>
        <Text style={BeamCheckerStyle.rpBravura}>{completeNotes[value]}</Text>
        <Text style={BeamCheckerStyle.rpEighthbeam}>{beamCodes[value]}</Text>
      </View>
    );
    //if the current note is active, but only the one after is active, add a beam to the right
  } else if (previousNoteIsOff && currentNoteIsOn && nextNoteIsOn) {
    return (
      <View style={BeamCheckerStyle.rpNote}>
        <Text style={BeamCheckerStyle.rpBravura}>{completeNotes.beamless}</Text>
        <Text style={BeamCheckerStyle.rpEighthbeam}>{beamCodes[value]}</Text>
      </View>
    );
    //if the current note is active, but only the one before is active, add a beam to the left
  } else if (previousNoteIsOn && currentNoteIsOn && nextNoteIsOff) {
    return <Text style={BeamCheckerStyle.rpNote}>{completeNotes[value]}</Text>;
    //if only the current beat is active, add a flag
  } else if (previousNoteIsOff && currentNoteIsOn && nextNoteIsOff) {
    return (
      <View style={BeamCheckerStyle.rpNote}>
        <Text style={BeamCheckerStyle.rpBravura}>{completeNotes.beamless}</Text>
        <Text style={BeamCheckerStyle.rpEighthflag}>{flagCodes[value].up}</Text>
      </View>
    );
  } else if (previousNoteIsOn && currentNoteIsOff) {
    return <View />;
    //if the current beat is a rest, push a rest
  } else if (previousNoteIsOff && currentNoteIsOff) {
    return <View />;
    //if the current beat is a rest, push a rest
  } else if (currentNoteIsOff && mode === 'tuplet') {
    return <Text style={BeamCheckerStyle.rpRest}>{restCodes[value]}</Text>;
  }
  return <Text style={BeamCheckerStyle.rpRest}>{restCodes[value]}</Text>;
};

//Checks to see which beam for last note
let checkLast = (figure: number[], value: string, mode: string) => {
  const penultimateNote = figure.length - 1;
  const lastNote = figure.length - 2;

  const penultimateNoteIsOn = figure[penultimateNote] === 1;
  const penultimateNoteIsOff = figure[penultimateNote] === 0;
  const lastNoteIsOn = figure[lastNote] === 1;
  const lastNoteIsOff = figure[lastNote] === 0;

  if (penultimateNoteIsOn && lastNoteIsOn) {
    return <Text style={BeamCheckerStyle.rpNote}>{completeNotes[value]}</Text>;
  } else if (lastNoteIsOff && penultimateNoteIsOn) {
    return (
      <View style={BeamCheckerStyle.rpNote}>
        <Text style={BeamCheckerStyle.rpBravura}>{completeNotes.beamless}</Text>
        <Text style={BeamCheckerStyle.rpEighthflag}>{flagCodes[value].up}</Text>
      </View>
    );
  } else if (
    lastNoteIsOn &&
    penultimateNoteIsOff &&
    figure.length === 3 &&
    mode === 'bar'
  ) {
    return <Text style={BeamCheckerStyle.rpRest}>{restCodes[value]}</Text>;
  } else if (
    lastNoteIsOn &&
    penultimateNoteIsOff &&
    figure.length === 2 &&
    mode === 'bar'
  ) {
    return <View />;
  } else if (
    lastNoteIsOff &&
    penultimateNoteIsOff &&
    figure.length === 3 &&
    mode === 'bar'
  ) {
    return <Text style={BeamCheckerStyle.rpRest}>{restCodes[value]}</Text>;
  } else if (lastNoteIsOff && penultimateNoteIsOff && mode === 'bar') {
    return <View />;
  } else if (penultimateNoteIsOff) {
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
