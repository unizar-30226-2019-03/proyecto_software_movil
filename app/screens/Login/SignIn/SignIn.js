import React from "react";
import {
  View,
  ActivityIndicator,
  TextInput,
  Animated,
  Dimensions,
  Keyboard,
  UIManager
} from "react-native";
import { Image, Text, Input, Button } from "react-native-elements";

import styles from "./styles";

const { State: TextInputState } = TextInput;

export default class SignIn extends React.Component {
  state = {
    shift: new Animated.Value(0)
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

  render() {
    const { shift } = this.state;

    return (
      <Animated.ScrollView
        style={[styles.container, { transform: [{ translateY: shift }] }]}
      >
        <View style={styles.logoView}>
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.appLogo}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={styles.inputBoxSeparation}>
          <Input
            placeholder="Usuario"
            leftIcon={{ type: "font-awesome", name: "user" }}
            leftIconContainerStyle={styles.inputSeparation}
          />
        </View>
        <View style={styles.inputBoxSeparation}>
          <Input
            placeholder="Contraseña"
            secureTextEntry={true}
            leftIcon={{ type: "font-awesome", name: "lock" }}
            leftIconContainerStyle={styles.inputSeparation}
          />
        </View>
        <View style={styles.viewForgotPassword}>
          <Text
            style={styles.forgotPassword}
            onPress={() => this.handleForgottenPW}
          >
            ¿Has olvidado tu contraseña?
          </Text>
        </View>

        <Button
          containerStyle={styles.loginButtonContainer}
          onPress={() => this.props.navigation.navigate("TopBarScreens")}
          title="ENTRAR"
        />

        <Button
          containerStyle={styles.registerButtonContainer}
          buttonStyle={styles.registerButton}
          onPress={() => this.props.navigation.navigate("SignUpOne")}
          title="REGISTRARSE"
          type="outline"
        />
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
        const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight + 100);
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
