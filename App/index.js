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
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 10,
    borderColor: Colors.white,
    color: Colors.white,
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 45,
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
  const [remainingSeconds, setRemainingSeconds] = useState(90);
  const [isActive, setIsActive] = useState(false);

  const {minutes, seconds} = getRemaining(remainingSeconds);

  function start() {
    setIsActive(!isActive);
  }

  function reset() {
    setRemainingSeconds(0);
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

    return () => {
      clearInterval(interval);
    };
  }, [isActive, remainingSeconds]);

  return (
    <View style={styles.body}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
      <TouchableOpacity onPress={start} style={styles.button}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
