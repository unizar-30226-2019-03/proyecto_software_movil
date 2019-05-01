import React from "react";

import { View, Text, Image } from "react-native";

import { isSignedIn } from "../../config/Auth"

export default class Carga extends React.Component {
  constructor() {
    super();
  }

  cargarAuth = async () => {
    await isSignedIn(this.props.navigation);
  };

  render() {
    this.cargarAuth();
    return (
      <View>
        <Image source={require("../../assets/splash.png")} />
      </View>
    );
  }
}
