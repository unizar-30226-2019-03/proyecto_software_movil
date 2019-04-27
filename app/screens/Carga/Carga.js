import React from "react";

import { View, Text } from "react-native";

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
        <Text>TODO: PANTALLA CARGA</Text>
      </View>
    );
  }
}
