import React from "react";

import { Button } from "react-native-elements";

import { TouchableNativeFeedback, Text, View } from "react-native";

import { Azul } from "../../constants";

import styles from "./styles";

const BotonSeguirAsignatura = props => {
  return (
    <TouchableNativeFeedback disabled={props.disabled} onPress={() => props.callback()}>
      <View style={[styles.buttonSeguirAsignatura, { backgroundColor: props.asignaturaSeguida ? "darkgrey" : Azul }]}>
        <Text style={styles.text}>{props.asignaturaSeguida ? "Siguiendo" : "Seguir asignatura"}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default BotonSeguirAsignatura;
