import React, {Component} from 'react';
import * as R from 'ramda';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {CheckBox} from 'react-native-elements';

import {getRandomTimeSig, getFigure} from './utils';
import {fillInTuplets} from './tupletBracketChecker';
import getTimeSig from './render';
import {barlines, singleStaff, timeSignatureCodes} from '../UnicodeAssignment';
// import Instructions from "./Instructions.jsx";
import {reducer} from './reducer';
import {blip01, blip02, clap, countdownSound} from '../Audio';

import RhythmPracticeControls from './RhythmPracticeControls';

import {rhythmPracticeStyles} from './RhythmPracticeStyles';

// import "./RhythmPractice.css";

interface IRhythmPracticeState {
  tempoInput: string;
  repInput: string;
  size: number[][];
  timeSignatures: number[];
  binaryFigures: number[][];
  displayedTimeSignatures: string[] | undefined[];
  displayedFigures: JSX.Element[][];
  displayedTuplets: (JSX.Element[] | null)[];
  started: boolean;
  countDownCheck: boolean;
  allowEmptyBars: boolean;
  playAnswer: boolean;
  phase: string;
  lastBeat: number;
  repCount: number;
  subdivisionCount: number;
  mode: string;
  playEveryEighth: boolean;
  showInstructions: boolean;
}

const getInitialState = () => {
  return {
    tempoInput: '60',
    repInput: '4',
    size: [[3]],
    timeSignatures: [0, 0],
    binaryFigures: [],
    displayedTimeSignatures: [],
    displayedFigures: [],
    displayedTuplets: [],
    started: false,
    countDownCheck: false,
    allowEmptyBars: false,
    playAnswer: false,
    phase: 'countdown',
    // @ts-ignore
    lastBeat: new Date() / 1,
    repCount: 1,
    subdivisionCount: 1,
    mode: 'tuplet',
    playEveryEighth: false,
    showInstructions: false,
  };
};

class RhythmPractice extends Component {
  state: IRhythmPracticeState = getInitialState();

  //reference variables for the requestAnimationFrames
  // @ts-ignore
  countDownFrame;
  // @ts-ignore
  playAndCountFrame;

  componentWillUnmount = () => {
    this.stopExercise();
  };

  tempoInputHandler = (event: any) => {
    this.setState({tempoInput: event.target.value});
  };

  repInputHandler = (event: any) => {
    this.setState({repInput: event.target.value});
  };

  modeChangeHandler = (mode: string) => {
    this.setState({mode});
  };

  checkBoxChecker = (value: number[]) => {
    let newSize = [...this.state.size];
    if (R.includes(value, newSize)) {
      newSize = newSize.filter((size) => !R.equals(size, value));
    } else {
      newSize.push(value);
    }
    this.setState({size: newSize});
  };

  clickFrequencyChecker = () => {
    this.setState({playEveryEighth: !this.state.playEveryEighth});
  };

  allowEmptyBarChecker = () => {
    this.setState({allowEmptyBars: !this.state.allowEmptyBars});
  };

  playAnswerChecker = () => {
    this.setState({playAnswer: !this.state.playAnswer});
  };

  loadNewImage = () => {
    // copy values from state
    const binaryFigures = [...this.state.binaryFigures];
    const displayedFigures = [...this.state.displayedFigures];
    const displayedTimeSignatures = [...this.state.displayedTimeSignatures];
    const displayedTuplets = [...this.state.displayedTuplets];
    const timeSignatures = [...this.state.timeSignatures];

    // get a random time signature/tuplet size from the size array,
    const e = getRandomTimeSig(this.state.size, this.state.mode);
    const newFigure = getFigure(
      e,
      binaryFigures,
      this.state.mode,
      this.state.allowEmptyBars,
    );

    // remove the first binary figure
    binaryFigures.shift();

    //remove the first unicode figure
    displayedFigures.shift();

    //generate a new unicode figure based on the time signature/tuplet size obtained above
    displayedFigures.push(newFigure);

    //add the new time signature to the state
    timeSignatures.shift();

    if (this.state.mode === 'bar') {
      //if in bar mode, remove the first unicode time signature
      displayedTimeSignatures.shift();
      //get the new unicode time signature
      const newDisplayedTimeSig = getTimeSig(e, this.state.mode);

      displayedTimeSignatures.push(newDisplayedTimeSig);
      //store the time signature as the sum of the subdivisions
      const newTimeSignature = e.reduce(reducer, 0);
      timeSignatures.push(newTimeSignature);
    }

    if (this.state.mode === 'tuplet') {
      //if in tuplet mode, remove the first unicode tuplet
      displayedTuplets.shift();
      //push new unicode tuplet
      displayedTuplets.push(fillInTuplets(e));
      console.log(displayedTuplets);
      //if tuplet is 4, don't show tuplet brackets
      if (e[0] === 4) {
        displayedTuplets[1] = null;
      }
    }
    this.setState({
      binaryFigures,
      displayedFigures,
      displayedTimeSignatures,
      displayedTuplets,
      timeSignatures,
    });
  };

  playAndCount = () => {
    // @ts-ignore
    const now = new Date() / 1;
    let clickInterval;
    let repCount = this.state.repCount;
    let subdivisionCount = this.state.subdivisionCount;
    let divider = 1;
    let unevenBeat = false;
    if (this.state.mode === 'bar') {
      // set an event every subdivision of the pulse
      divider = 2;
      unevenBeat = subdivisionCount % 2 === 1;
    } else if (this.state.mode === 'tuplet') {
      //divide whole bar by the time signature
      divider = this.state.timeSignatures[0];
    }
    // set the frequency of each potential click
    clickInterval = 60000 / parseInt(this.state.tempoInput) / divider;
    if (now - this.state.lastBeat > clickInterval) {
      if (this.state.repCount === 1 && this.state.phase === 'play') {
        //load new image and ensure a new one isn't loaded right after
        this.loadNewImage();
        this.setState({phase: 'firstFigure'});
      }

      if (!this.state.playEveryEighth && this.state.timeSignatures[0] === 6) {
        if (subdivisionCount === 1) {
          blip02.play();
        } else if (subdivisionCount === 4) {
          blip01.play();
        }
      } else if (!this.state.playEveryEighth && unevenBeat) {
        // play only a click on uneven beats (strong beats)
        if (subdivisionCount === 1) {
          blip02.play();
        } else {
          blip01.play();
        }
      } else if (!this.state.playEveryEighth && this.state.mode === 'tuplet') {
        // play only a click on the first beat of the bar
        if (subdivisionCount === 1) {
          blip02.play();
        }
      } else if (this.state.playEveryEighth) {
        // play a click on every subdivision
        if (subdivisionCount === 1) {
          blip02.play();
        } else {
          blip01.play();
        }
      }

      if (this.state.playAnswer) {
        if (this.state.binaryFigures[0][subdivisionCount - 1] === 1) {
          clap.play();
        }
      }

      subdivisionCount++;
      if (subdivisionCount > this.state.timeSignatures[0]) {
        // increase the repcount and reset subdivision counter
        repCount++;
        subdivisionCount = 1;
      }
      if (repCount > parseInt(this.state.repInput)) {
        //reset repcount and prepare to load new image at next loop
        repCount = 1;
        if (this.state.phase === 'firstFigure') {
          this.setState({phase: 'play'});
        }
      }
      // @ts-ignore
      this.playAndCountFrame = requestAnimationFrame(this.playAndCount);
      // @ts-ignore
      const lastBeat = new Date() / 1;
      this.setState({repCount, lastBeat, subdivisionCount});
      return;
    }
    // @ts-ignore
    this.playAndCountFrame = requestAnimationFrame(this.playAndCount);
  };

  countDown = () => {
    //if countdown is already done, return
    if (this.state.countDownCheck) return;
    //set the current date to check if enough time has passed
    // @ts-ignore
    const now = new Date() / 1;
    //number of clicks per minute
    const clickInterval = 60000 / parseInt(this.state.tempoInput);
    if (now - this.state.lastBeat > clickInterval) {
      let repCount = this.state.repCount;
      if (repCount > 4) {
        //if the 4 beat countdown is over, reset repcount and start the exercise
        repCount = 1;
        const countDownCheck = true;
        this.setState({
          repCount,
          countDownCheck,
          phase: 'firstFigure',
        });
        this.playAndCount();
        return;
      }
      countdownSound.play();

      repCount++;
      // if the coundown isn't over, set the time of the last beat and call the function again
      // @ts-ignore
      const lastBeat = new Date() / 1;
      // @ts-ignore
      this.countDownFrame = requestAnimationFrame(this.countDown);
      this.setState({repCount, lastBeat});
      return;
    }
    // @ts-ignore
    this.countDownFrame = requestAnimationFrame(this.countDown);
  };

  startExercise = () => {
    if (this.state.size.length > 0 && !this.state.started) {
      // copy values from state
      let timeSignatures = [...this.state.timeSignatures];
      let binaryFigures = [...this.state.binaryFigures];
      let displayedFigures = [...this.state.displayedFigures];
      let displayedTuplets = [...this.state.displayedTuplets];
      // going through possible time signatures for each of the two displayed bars
      const displayedTimeSignatures = timeSignatures.map(
        (timeSignature: number, i: number) => {
          //select a random value in the possible sizes (time signatures) and push both the time signature symbol and its corresponding rhythmic figure
          //generate a random number based on the user's selected possible values which will become the time signature
          const newTimeSignature = getRandomTimeSig(
            this.state.size,
            this.state.mode,
          );
          //generate the rhythmic figures to be dispalyed. first arg is an array containing each subdivision of the bar,
          //second is the array in which these values will be stored in the state
          displayedFigures.push(
            getFigure(
              newTimeSignature,
              binaryFigures,
              this.state.mode,
              this.state.allowEmptyBars,
            ),
          );
          timeSignatures[i] = newTimeSignature.reduce(reducer, 0);
          if (this.state.mode === 'bar') {
            return getTimeSig(newTimeSignature, this.state.mode);
          }

          if (this.state.mode === 'tuplet') {
            displayedTuplets.push(fillInTuplets(timeSignatures));

            if (timeSignatures[0] === 4) {
              displayedTuplets[i] = null;
            }

            return getTimeSig([1], this.state.mode);
          }
        },
      );

      //start countdown, update state
      this.countDown();
      let started = true;
      this.setState({
        started,
        timeSignatures,
        binaryFigures,
        displayedFigures,
        displayedTimeSignatures,
        displayedTuplets,
      });
    }
  };

  stopExercise = () => {
    // @ts-ignore
    cancelAnimationFrame(this.countDownFrame);
    // @ts-ignore
    cancelAnimationFrame(this.playAndCountFrame);

    this.setState({
      timeSignatures: [0, 0],
      binaryFigures: [] as number[][],
      displayedTimeSignatures: [] as string[],
      displayedFigures: [] as JSX.Element[][],
      displayedTuplets: [] as (JSX.Element[] | null)[],
      started: false,
      repCount: 1,
      subdivisionCount: 1,
      countDownCheck: false,
      phase: 'countdown',
    });
  };

  closeModal = () => {
    this.setState({showInstructions: false});
  };

  render = () => {
    return (
      <View style={rhythmPracticeStyles.rhythmContainer}>
        <RhythmPracticeControls
          allowEmptyBars={this.state.allowEmptyBars}
          allowEmptyBarChecker={this.allowEmptyBarChecker}
          checkBoxChecker={this.checkBoxChecker}
          clickFrequencyChecker={this.clickFrequencyChecker}
          closeModal={this.closeModal}
          mode={this.state.mode}
          modeChangeHandler={this.modeChangeHandler}
          playAnswer={this.state.playAnswer}
          playAnswerChecker={this.playAnswerChecker}
          playEveryEighth={this.state.playEveryEighth}
          repInput={this.state.repInput}
          repInputHandler={this.repInputHandler}
          size={this.state.size}
          showInstructions={this.state.showInstructions}
          tempoInput={this.state.tempoInput}
          tempoInputHandler={this.tempoInputHandler}
        />
        <View>
          <View style={rhythmPracticeStyles.practiceMain}>
            {this.state.started && (
              <View style={rhythmPracticeStyles.rpSingleStaff}>
                <Text style={rhythmPracticeStyles.rpBravura}>
                  {singleStaff}
                </Text>
              </View>
            )}
            <View style={{flexDirection: 'row'}}>
              {this.state.displayedFigures.map((bar, i) => {
                return (
                  <View key={i + 'bar'} style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        flexDirection: 'column',
                        height: 10,
                        marginTop: 80,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Bravura',
                          fontSize: 60,
                          marginTop: -80,
                          marginLeft: 10,
                          marginRight: 10,
                        }}>
                        {this.state.displayedTimeSignatures[i]}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Bravura',
                          fontSize: 60,
                          marginTop: -200,
                          marginLeft: 10,
                          marginRight: 10,
                        }}>
                        {this.state.mode === 'bar' &&
                          this.state.timeSignatures[i] === 8 &&
                          timeSignatureCodes.four}
                        {this.state.mode === 'bar' &&
                          this.state.timeSignatures[i] !== 8 &&
                          timeSignatureCodes.eight}
                        {this.state.mode === 'tuplet' &&
                          timeSignatureCodes.four}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View style={rhythmPracticeStyles.rpTupletBrackets}>
                        {this.state.displayedTuplets[i]}
                      </View>
                      {bar}
                    </View>
                    {i === 0 && (
                      <Text style={rhythmPracticeStyles.rpBarline}>
                        {barlines.singleBarline}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 5,
          }}>
          <TouchableOpacity
            style={rhythmPracticeStyles.startButton}
            onPress={this.startExercise}>
            <Text style={{fontFamily: 'Bravura', fontSize: 40, marginTop: -50}}>
              Start!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={rhythmPracticeStyles.stopButton}
            onPress={this.stopExercise}>
            <Text style={{fontFamily: 'Bravura', fontSize: 40, marginTop: -50}}>
              Stop!
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{backgroundColor: '#0345ad', height: 40, borderRadius: 10}}
          onPress={() =>
            this.setState({
              showInstructions: true,
            })
          }>
          <Text
            style={{
              fontFamily: 'Bravura',
              fontSize: 30,
              marginTop: -30,
              paddingLeft: 5,
              paddingRight: 5,
            }}>
            {this.state.showInstructions ? 'Hide Controls' : 'Show Controls'}
          </Text>
        </TouchableOpacity>
        {/* <Instructions /> */}
      </View>
    );
  };
}

export default RhythmPractice;
