import React from 'react';
import {View, Text} from 'react-native';
import {CheckBox} from 'react-native-elements';
import * as R from 'ramda';

import {reducer} from './reducer';

import {CommonStyles} from '../CommonStyles';
import {rhythmPracticeStyles} from './RhythmPracticeStyles';

interface IValueSelectorsProps {
  checkBoxChecker: (value: number[]) => void;
  currentSelectedSizes: number[][];
}

const ValueSelectors = (props: IValueSelectorsProps) => {
  const {checkBoxChecker, currentSelectedSizes} = props;
  //list of possible subdivisions for rhythmic values. their sum represents the total number of 8th notes in the bar or the size of the tuplet
  const values = [[3], [2, 2], [3, 2], [3, 3], [3, 2, 2], [2, 2, 2, 2]];
  //automatically generate checkboxes
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={rhythmPracticeStyles.ralewayFont}>Values: {'   '}</Text>
      {values.map((value: number[]) => {
        //sum of all the subdivisions in the bar this is displayed next to the radio button
        const sumValue = value.reduce(reducer, 0);
        const checked = R.includes(value, currentSelectedSizes);
        return (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={rhythmPracticeStyles.ralewayFont}>{sumValue}</Text>
            <Text style={rhythmPracticeStyles.ralewayFont}>
              {sumValue === 8 ? ' (4/4)' : null}
            </Text>
            <CheckBox
              onIconPress={() => checkBoxChecker(value)}
              checked={checked}
              containerStyle={CommonStyles.checkbox}
            />
          </View>
        );
      })}
    </View>
  );
};

export default ValueSelectors;
