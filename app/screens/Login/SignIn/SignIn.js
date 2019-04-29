import React from "react";
import { View, TextInput, Animated, Keyboard } from "react-native";

import { Image, Text, Input, Button } from "react-native-elements";

import { UserApi } from "swagger_unicast";

import { signIn } from "../../../config/Auth";

import styles from "./styles";

const { State: TextInputState } = TextInput;

export default class SignIn extends React.Component {
  state = {
    username: "",
    password: "",
    showInputError: false,
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

  handleKeyboardDidShow = event => {
    const gap = event.endCoordinates.height - 280;
    if (gap >= 0) {
      return;
    }
    Animated.timing(this.state.shift, {
      toValue: gap,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  handleKeyboardDidHide = () => {
    Animated.timing(this.state.shift, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  };

  tryLogin = async () => {
    let apiInstance = new UserApi();
    apiInstance.authUser(
      this.state.username,
      this.state.password,
      async (error, data, response) => {
        if (error) {
          this.setState({
            showInputError: true
          });
        } else {
          await signIn(data.token, this.props.navigation);
        }
      }
    );
  };

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
          />
        </View>
        <View style={styles.inputBoxSeparation}>
          <Input
            placeholder="Usuario"
            leftIcon={{ type: "font-awesome", name: "user" }}
            leftIconContainerStyle={styles.inputSeparation}
            onChangeText={text =>
              this.setState({ username: text, showInputError: false })
            }
            errorStyle={{ color: "red" }}
            errorMessage={
              this.state.showInputError
                ? "Nombre de usuario o contraseña incorrectos"
                : null
            }
            autoCorrect={false}
          />
        </View>
        <View style={styles.inputBoxSeparation}>
          <Input
            placeholder="Contraseña"
            secureTextEntry={true}
            leftIcon={{ type: "font-awesome", name: "lock" }}
            leftIconContainerStyle={styles.inputSeparation}
            onChangeText={text =>
              this.setState({ password: text, showInputError: false })
            }
            autoCorrect={false}
          />
        </View>
        <View style={styles.viewForgotPassword}>
          <Text
            style={styles.forgotPassword}
            onPress={() =>
              this.props.navigation.navigate("HasOlvidadoContrasenya")
            }
          >
            ¿Has olvidado tu contraseña?
          </Text>
        </View>

        <Button
          buttonStyle={styles.loginButton}
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
}
