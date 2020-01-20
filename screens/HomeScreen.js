import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import ListComponent from './ListComponent'

class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      min: 0,
      sec: 0,
      ms: 0,
    };

    this.lapArr = [];

    this.interval = null;
  }

  handleLap = (min, sec, ms) => {
    this.lapArr = [
        ...this.lapArr,
      {min, sec, ms}
    ]
  };

  handleRest = () => {
    this.setState({
      min: 0,
      sec: 0,
      ms: 0,
      start: false
    });
    clearInterval(this.interval);
    this.lapArr = [];
  };

  handleToggle = () => {
    this.setState({
      start: !this.state.start
    }, ()=> this.handleStart())
  };

  handleStart = () => {
    if (this.state.start) {
      this.interval = setInterval(() => {
        if (this.state.ms !== 99) {
          this.setState({
            ms: this.state.ms + 1
          })
        } else if (this.state.sec !== 59) {
          this.setState({
            ms: 0,
            sec: ++this.state.sec
          })
        } else {
          this.setState({
            ms: 0,
            sec: 0,
            min: ++this.state.min
          })
        }
      }, 1);
    } else {
      clearInterval(this.interval)
    }
  };

  render() {
    const {
      container,
      welcomeContainer,
      welcomeImage,
      boxTimer,
      child,
      buttonParent,
      button,
      buttonText,
      scroll,
      itemStyle,
    } = styles;

    const {min, sec, ms, start} = this.state;

    let padToTwo = (number) => (number <= 9 ? `0${number}` : number);

    return (

        <View style={container}>
          <View style={welcomeContainer}>
            <Image
                source={
                  __DEV__
                      ? require('../assets/images/time.png')
                      : require('../assets/images/time.png')
                }
                style={welcomeImage}
            />
          </View>

          <View style={boxTimer}>
            <Text style={child}>
              {`${padToTwo(min)} : `}
            </Text>
            <Text style={child}>
              {`${padToTwo(sec)} : `}
            </Text>
            <Text style={child}>
              {`${padToTwo(ms)}`}
            </Text>
          </View>
          <View style={buttonParent}>
            <TouchableOpacity
                style={button}
                onPress={this.handleRest}
            >
              <Text style={buttonText}>
                Rest
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={button}
                onPress={this.handleToggle}
            >
              <Text style={buttonText}>
                {start ? "Stop" : "Start"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={button}
                onPress={() => this.handleLap(min, sec, ms)}
                disabled={!start}
            >
              <Text style={buttonText}>
                Lap
              </Text>
            </TouchableOpacity>
          </View>
          <ListComponent
              lapArr={this.lapArr}
          />
        </View>
    );
  };
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  boxTimer: {
  alignItems: 'center',
  marginHorizontal: 50,
  display: "flex",
  justifyContent: 'center',
  flexDirection: "row",
  borderWidth:1,
  borderRadius: 60,
  borderColor: '#ccc',
  backgroundColor: '#fff',
  },
  child: {
  fontSize: 40,
  color: "#353636",
  },
  buttonParent: {
    marginHorizontal: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "5%",
  },
  button: {
    backgroundColor: "#fff",
    paddingLeft: "5%",
    paddingRight: "5%",
    display: "flex",
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 60,
  },
  buttonText: {
    color: "#353636",
    fontSize: 20,
    alignSelf: "center"
  },
  scroll: {
    backgroundColor: "#fff",
  },
  itemStyle: {
    padding: 10,
    fontSize: 22,
    height: 44,
    color: "#5C415D",
    textAlign: "center",
    backgroundColor: "#fff",
    marginBottom: 1
  }
});

export default HomeScreen;
