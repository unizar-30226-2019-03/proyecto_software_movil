import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Image, Text, Input, Button } from "react-native-elements";

import styles from "./styles";

export default class SignIn extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoView}>
          <Image
            source={require("../../../assets/icon.png")}
            style={styles.appLogo}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={styles.container07}>
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
          <Text style={styles.forgotPassword} onPress={this.handleForgottenPW}>
            ¿Has olvidado tu contraseña?
          </Text>
          <Button
            containerStyle={styles.loginContainer}
            onPress={() => this.props.navigation.navigate("TopBarScreens")}
            title="ENTRAR"
          />
        </View>
        <Button
          buttonStyle={styles.googleButton}
          containerStyle={styles.googleContainer}
          onPress={() => this.props.navigation.navigate("SignUpOne")}
          title="CONTINUAR CON GOOGLE"
        />
        <Button
          onPress={() => this.props.navigation.navigate("SignUpOne")}
          title="REGISTRARSE"
        />
      </View>
    );
  }
}
