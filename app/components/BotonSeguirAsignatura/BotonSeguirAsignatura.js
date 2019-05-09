import React from "react";
import { Button } from "react-native-elements";

import { TouchableOpacity, Text } from "react-native";

import { Azul } from "../../constants";

import styles from "./styles";

export default class BotonSeguirAsignatura extends React.Component {
  state = {
    asignaturaSeguida: false
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.buttonSeguirAsignatura, { backgroundColor: this.state.asignaturaSeguida ? "white" : Azul }]}
        onPress={() => this.setState({ asignaturaSeguida: !this.state.asignaturaSeguida })}
      >
        <Text style={[styles.text, { color: this.state.asignaturaSeguida ? Azul : "white" }]}>
          {this.state.asignaturaSeguida ? "Siguiendo" : "Seguir asignatura"}
        </Text>
      </TouchableOpacity>
    );
  }
}
//  <Button
//    buttonStyle={[styles.buttonSeguirAsignatura, { backgroundColor: Azul, borderColor: Azul }]}
// title={this.state.asignaturaSeguida ? "Siguiendo" : "Seguir asignatura"}
// type={this.state.asignaturaSeguida ? "outline" : "solid"}
// onPress={() => this.setState({ asignaturaSeguida: !this.state.asignaturaSeguida })}

//  />
