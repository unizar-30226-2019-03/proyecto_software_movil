import React from "react";
import { Button } from "react-native-elements";

import { TouchableOpacity, Text } from "react-native";

import { Azul } from "../../constants";

import styles from "./styles";

export default class BotonSeguirAsignatura extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asignaturaSeguida: false
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  getData = () => {
    this.state = {
      asignaturaSeguida: false
    };
    this.props.onLoadCallback();

    //this.props.onErrorCallback();
  };

  render() {
    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        ref="botonSeguirAsignatura"
        activeOpacity={1}
        style={[styles.buttonSeguirAsignatura, { backgroundColor: this.state.asignaturaSeguida ? "darkgrey" : Azul }]}
        onPress={() => this.setState({ asignaturaSeguida: !this.state.asignaturaSeguida })}
      >
        <Text style={styles.text}>{this.state.asignaturaSeguida ? "Siguiendo" : "Seguir asignatura"}</Text>
      </TouchableOpacity>
    );
  }
}
