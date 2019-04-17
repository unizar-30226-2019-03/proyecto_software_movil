import React from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Animated,
  Dimensions,
  Keyboard,
  UIManager,
  Picker,
} from "react-native";

import { Button, Input } from "react-native-elements";

import styles from "./styles";

const { State: TextInputState } = Input;

export default class SubirVideo extends React.Component {
  state = {
    shift: new Animated.Value(0),
    asignatura: ""
  };

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener(
      "keyboardDidShow",
      this.handleKeyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      "keyboardDidHide",
      this.handleKeyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Subir vídeo"
  });

  render() {
    const { shift } = this.state;
    return (
		<Animated.View style={[styles.container, { transform: [{translateY: shift}] }]}>
        <View
          style={styles.viewSelectVideo}
          borderWidth={2}
          borderColor="grey"
          borderStyle="dashed"
          borderRadius={4}
        >
          <Button buttonStyle={styles.selectVideoButton} title="ELEGIR VÍDEO" />
        </View>

        <View style={styles.viewSelectAsign}>
          <Text style={styles.textAsignatura}>Asignatura:</Text>
          <Picker
            mode="dropdown"
            selectedValue={this.state.language}
            style={styles.pickerAsign}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ asignatura: itemValue })
            }
          >
            <Picker.Item label="Unizar - Bioinformática" value="1" />
            <Picker.Item
              label="UC3 - Laboratorio de sistemas de información"
              value="2"
            />
          </Picker>
        </View>

        <View style={styles.viewEnterTitle}>
          <Input placeholder="Escriba un título..." />
        </View>
      </Animated.View>
    );
  }

  handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
      if (gap >= 0) {
        return;
      }
      Animated.timing(
        this.state.shift,
        {
          toValue: gap,
          duration: 200,
          useNativeDriver: true,
        }
      ).start();
    });
  }

  handleKeyboardDidHide = () => {
    Animated.timing(
      this.state.shift,
      {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }
    ).start();
  }
}

