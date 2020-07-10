import React from 'react';

import {Button, Modal, View, Text, TextInput} from 'react-native';
import {CheckBox} from 'react-native-elements';

import ValueSelector from './ValueSelectors';

import {rhythmPracticeStyles} from './RhythmPracticeStyles';

interface IRhythmPracticeControl {
  allowEmptyBars: boolean;
  allowEmptyBarChecker: () => void;
  checkBoxChecker: (value: number[]) => void;
  clickFrequencyChecker: () => void;
  closeModal: () => void;
  mode: string;
  modeChangeHandler: (mode: string) => void;
  playAnswer: boolean;
  playAnswerChecker: () => void;
  playEveryEighth: boolean;
  size: number[][];
  repInput: string;
  repInputHandler: (event: any) => void;
  showInstructions: boolean;
  tempoInput: string;
  tempoInputHandler: (event: any) => void;
}

const RhythmPracticeControls = (props: IRhythmPracticeControl) => {
  const {
    allowEmptyBars,
    allowEmptyBarChecker,
    checkBoxChecker,
    clickFrequencyChecker,
    closeModal,
    mode,
    modeChangeHandler,
    playAnswer,
    playAnswerChecker,
    playEveryEighth,
    repInput,
    repInputHandler,
    size,
    showInstructions,
    tempoInput,
    tempoInputHandler,
  } = props;

  return (
    <Modal visible={showInstructions} animationType="slide">
      <View style={rhythmPracticeStyles.main}>
        <Text style={rhythmPracticeStyles.instructions}>
          This app allows you to practice all types of regular and irregular
          rhythmic groups, as well as alternating between different values. It
          works by randomly generating an endless number of rhythmic figures.
          Simply start the app and clap your hands or follow along with your
          instrument. The value in the first bar is to be played as many times
          as the rep number. The second bar is provided for ease of reading.
        </Text>
        <View style={rhythmPracticeStyles.rpPanelsection}>
          <View style={rhythmPracticeStyles.rpControlitem}>
            <View style={rhythmPracticeStyles.rpControlitem}>
              <Text style={rhythmPracticeStyles.ralewayFont}>Tempo: </Text>
              <TextInput
                onChangeText={tempoInputHandler}
                value={tempoInput}
                style={rhythmPracticeStyles.rpTextBox}
              />
            </View>
            <View style={rhythmPracticeStyles.rpControlitem}>
              <Text style={rhythmPracticeStyles.ralewayFont}>Reps: </Text>
              <TextInput
                onChangeText={repInputHandler}
                value={repInput}
                style={rhythmPracticeStyles.rpTextBox}
              />
            </View>
          </View>

          <View style={rhythmPracticeStyles.rpControlitem}>
            <Text style={rhythmPracticeStyles.ralewayFont}>Mode: </Text>
            <View style={rhythmPracticeStyles.rpControlitem}>
              <Text style={rhythmPracticeStyles.ralewayFont}>Bar</Text>
              <CheckBox
                checked={mode === 'bar'}
                onIconPress={() => modeChangeHandler('bar')}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
              />
            </View>
            <View style={rhythmPracticeStyles.rpControlitem}>
              <Text style={rhythmPracticeStyles.ralewayFont}>Tuplet</Text>
              <CheckBox
                checked={mode === 'tuplet'}
                onIconPress={() => modeChangeHandler('tuplet')}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
              />
            </View>
          </View>
        </View>
        <ValueSelector
          checkBoxChecker={checkBoxChecker}
          currentSelectedSizes={size}
        />
        <View style={rhythmPracticeStyles.rpControlpanel}>
          <View style={rhythmPracticeStyles.rpControlitem}>
            <Text style={rhythmPracticeStyles.ralewayFont}>
              Click every subdivision:{' '}
            </Text>
            <CheckBox
              onIconPress={clickFrequencyChecker}
              checked={playEveryEighth}
            />
          </View>

          <View style={rhythmPracticeStyles.rpControlitem}>
            <Text style={rhythmPracticeStyles.ralewayFont}>
              Allow empty bars
            </Text>
            <CheckBox
              onIconPress={allowEmptyBarChecker}
              checked={allowEmptyBars}
            />
          </View>

          <View style={rhythmPracticeStyles.rpControlitem}>
            <Text style={rhythmPracticeStyles.ralewayFont}>
              Play back answer
            </Text>
            <CheckBox onIconPress={playAnswerChecker} checked={playAnswer} />
          </View>
        </View>
      </View>
      <Button title="Hide Instructions" onPress={() => closeModal()} />
    </Modal>
  );
};

export default RhythmPracticeControls;
