import React from "react";

import { Button } from "react-native-elements";

import { TouchableOpacity, Text } from "react-native";

import { Azul } from "../../constants";

import styles from "./styles";

const BotonSeguirAsignatura = props => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      activeOpacity={1}
      style={[styles.buttonSeguirAsignatura, { backgroundColor: props.asignaturaSeguida ? "darkgrey" : Azul }]}
      onPress={() => props.callback()}
    >
      <Text style={styles.text}>{props.asignaturaSeguida ? "Siguiendo" : "Seguir asignatura"}</Text>
    </TouchableOpacity>
  );
};

export default BotonSeguirAsignatura;
