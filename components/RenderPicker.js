/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {View, Picker, Text, Platform, StyleSheet} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    width: 60,
    ...Platform.select({
      android: {
        color: '#fff',
        backgroundColor: Colors.dark,
        marginLeft: 10,
      },
    }),
  },
  pickerItem: {
    color: '#fff',
    fontSize: 20,
  },
});

const createArray = length => {
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }
  return arr;
};
const AVAILABLE_MINUTES = createArray(10);
const AVAILABLE_SECONDS = createArray(60);

const RenderPicker = ({
  selectedMinutes,
  setSelectedMinutes,
  selectedSeconds,
  setSelectedSeconds,
}) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={selectedMinutes}
        onValueChange={itemValue => {
          setSelectedMinutes(itemValue);
        }}
        mode="dropdown">
        {AVAILABLE_MINUTES.map(value => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.picker}>minutes</Text>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={selectedSeconds}
        onValueChange={itemValue => {
          setSelectedSeconds(itemValue);
        }}
        mode="dropdown">
        {AVAILABLE_SECONDS.map(value => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.picker}>seconds</Text>
    </View>
  );
};

export default RenderPicker;
