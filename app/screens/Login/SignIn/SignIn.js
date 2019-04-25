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

import { UserApi } from 'swagger_unicast';

import styles from "./styles";

const { State: TextInputState } = TextInput;

export default class SignIn extends React.Component {
  state = {
    username: "",
    password: "",
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

  tryLogin() {
    // let apiInstance = new UserApi();
    // apiInstance.authUser(this.state.username, this.state.password, (error, data, response) => {
    //   if (error) {
    //     console.error(error);
    //   } 
    //   else {
    //     console.log(data);
    //     this.props.navigation.navigate("TopBarScreens")
    //   }
    // });
    this.props.navigation.navigate("TopBarScreens");
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
            onChangeText={text => this.setState({ username: text })}
          />
        </View>
        <View style={styles.inputBoxSeparation}>
          <Input
            placeholder="Contraseña"
            secureTextEntry={true}
            leftIcon={{ type: "font-awesome", name: "lock" }}
            leftIconContainerStyle={styles.inputSeparation}
            onChangeText={text => this.setState({ password: text })}
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
          onPress={() => this.tryLogin()}   
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
        const gap = keyboardHeight - (fieldTop + fieldHeight + 100);
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
