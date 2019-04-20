import React from "react";
import {
  TextInput,
  Animated,
  Dimensions,
  Keyboard,
  UIManager
} from "react-native";
import { Input } from "react-native-elements";

import styles from "./styles";

const { State: TextInputState } = TextInput;

export default class ModificarCampo extends React.Component {
  state = {
    shift: new Animated.Value(0),
    modificando: this.props.navigation.getParam("modificando"),
    texto: this.props.navigation.getParam("texto")
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
    title: navigation.getParam("title")
  });

  render() {
    const { shift } = this.state;
    return (
      <Animated.ScrollView
        style={[styles.container, { transform: [{ translateY: shift }] }]}
      >
        {this.state.modificando == "nombre" ? (
          <Input
            containerStyle={styles.textContainer}
            label="Nombre"
            defaultValue={this.state.texto}
            leftIcon={{
              type: "font-awesome",
              name: "user",
              color: "dodgerblue"
            }}
            rightIcon={{
              type: "font-awesome",
              name: "edit",
              color: "grey"
            }}
            leftIconContainerStyle={styles.leftIconName}
            rightIconContainerStyle={styles.rightIcon}
          />
        ) : (
          <Input
            containerStyle={styles.textContainer}
            label="Descripción"
            defaultValue={this.state.texto}
            leftIcon={{
              type: "font-awesome",
              name: "info",
              color: "dodgerblue"
            }}
            rightIcon={{
              type: "font-awesome",
              name: "edit",
              color: "grey"
            }}
            leftIconContainerStyle={styles.leftIconName}
            rightIconContainerStyle={styles.rightIcon}
            multiline={true}
          />
        )}
      </Animated.ScrollView>
    );
  }

  handleKeyboardDidShow = event => {
    const { height: windowHeight } = Dimensions.get("window");
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(
      currentlyFocusedField,
      (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
        if (gap >= 0) {
          return;
        }
        Animated.timing(this.state.shift, {
          toValue: gap,
          duration: 200,
          useNativeDriver: true
        }).start();
      }
    );
  };

  handleKeyboardDidHide = () => {
    Animated.timing(this.state.shift, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  };
}
