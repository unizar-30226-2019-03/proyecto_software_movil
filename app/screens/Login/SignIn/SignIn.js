import React from "react";

import { View } from "react-native";

import { Image, Text, Input, Button } from "react-native-elements";

import { UserApi } from "swagger_unicast";

import { signIn } from "../../../config/Auth";

import InputFixer from "../../../components/InputFixer";

import styles from "./styles";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      showInputError: false
    };

    this.apiInstance = new UserApi();
  }

  tryLogin = async () => {
    this.apiInstance.authUser(
      this.state.username,
      this.state.password,
      async (error, data, response) => {
        if (error) {
          this.setState({
            showInputError: true
          });
        } else {
          await signIn(data.token, data.id, this.props.navigation);
        }
      }
    );
  };

  render() {
    return (
      <InputFixer
        navigation={this.props.navigation}
        ref={InputFixer => (this.InputFixer = InputFixer)}
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
            autoCapitalize="none"
            onFocus={() => this.InputFixer.onFocus()}
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
            onFocus={() => this.InputFixer.onFocus()}
            autoCorrect={false}
            onSubmitEditing={() => this.tryLogin()}
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
      </InputFixer>
    );
  }
}
