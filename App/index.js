/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Picker,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import RenderPicker from '../components/RenderPicker';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSection: {
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    height: screen.width / 4,
    width: screen.width / 4,
  },
  buttonStart: {
    borderRadius: 100,
    borderColor: '#68D391',
    backgroundColor: '#68D391',
  },
  buttonPause: {
    borderRadius: 100,
    borderColor: '#ECC94B',
    backgroundColor: '#ECC94B',
    color: Colors.white,
    marginHorizontal: 12,
  },
  buttonReset: {
    backgroundColor: '#E53E3E',
    borderColor: '#E53E3E',
    borderRadius: 100,
    borderWidth: 10,
  },
  buttonText: {
    fontSize: 30,
    color: Colors.white,
  },
  timerText: {
    color: Colors.white,
    fontSize: 90,
  },
});

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = time => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return {minutes: formatNumber(minutes), seconds: formatNumber(seconds)};
};

const App = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState('0');
  const [selectedSeconds, setSelectedSeconds] = useState('0');

  const {minutes, seconds} = getRemaining(remainingSeconds);

  function handleStart() {
    setRemainingSeconds(
      parseInt(selectedMinutes, 10) * 60 + parseInt(selectedSeconds, 10),
    );
    setIsActive(true);
  }

  function handlePause() {
    setIsActive(false);
  }

  function handleReset() {
    setRemainingSeconds(5);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setRemainingSeconds(remainingSeconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    if (remainingSeconds === 0) {
      handleReset();
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, remainingSeconds, selectedMinutes, selectedSeconds]);

  return (
    <View style={styles.body}>
      <StatusBar barStyle="light-content" />
      {isActive ? (
        <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
      ) : (
        <RenderPicker
          selectedMinutes={selectedMinutes}
          setSelectedMinutes={setSelectedMinutes}
          selectedSeconds={selectedSeconds}
          setSelectedSeconds={setSelectedSeconds}
        />
      )}

      <View style={styles.buttonSection}>
        <TouchableOpacity
          onPress={handleStart}
          style={[styles.button, styles.buttonStart]}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePause}
          style={[styles.button, styles.buttonPause]}>
          <Text style={styles.buttonText}>Pause</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleReset}
          style={[styles.button, styles.buttonReset]}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
