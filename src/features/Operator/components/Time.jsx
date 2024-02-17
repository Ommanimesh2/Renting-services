import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

const Time = ({navigation}) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handlePauseResume = () => {
    setIsRunning(prevState => !prevState);
  };

  const handleRestart = () => {
    setTime(0);
    setIsRunning(true);
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, color: 'black'}}>
        Service has been Started
      </Text>
      <Text style={styles.timerText}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePauseResume}>
          <Text style={styles.buttonText}>
            {isRunning ? 'Pause' : 'Resume'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRestart}>
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonnContainer}> 
      <TouchableHighlight
        style={styles.mainBtn}
        onPress={() => {
        }}>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 600,
            }}>
            Stop Order
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.mainBtnn}
        onPress={() => {
            navigation.navigate('serviceComplete')
        }}>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 600,
            }}>
            Complete Order
          </Text>
        </View>
      </TouchableHighlight>
      
      </View>
    </View>
  );
};

const formatTime = time => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
};

const padZero = number => {
  return number < 10 ? '0' + number : number;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
  },
  mainBtn: {
    width: '35%',
    height: 50,
    marginTop:10,
    display: 'flex',
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#981930',
  },
  mainBtnn: {
    width: '40%',
    height: 50,
    marginTop:10,
    display: 'flex',
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F623D',
  },
  timerText: {
    fontSize: 48,
    marginBottom: 10,
    marginTop: 10,
  },  buttonnContainer: {
    flexDirection: 'row',
    width:'90%',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#0F623D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Time;
