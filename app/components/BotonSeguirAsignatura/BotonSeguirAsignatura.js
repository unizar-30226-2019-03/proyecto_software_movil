/**
 * @fileoverview Botón de seguir asignatura
 * @author Unicast
 * @requires ../../constants:Azul
 * @requires ../../components/RippleTouchable:RippleTouchable
 */
import React from "react";

import { Button } from "react-native-elements";

import { Text, View } from "react-native";

import { Azul } from "../../constants";

import RippleTouchable from "../../components/RippleTouchable";

import styles from "./styles";

/**
 *
 * Renderiza el boton en funcion de si se sigue a la asignatura o no
 * @module BotonSeguirAsignatura
 * @param {Object} props  props.asignaturaSeguida Indica si se esta siguiendo la asignatura
 */
const BotonSeguirAsignatura = props => {
  return (
    <RippleTouchable
      disabled={props.disabled}
      onPress={() => props.callback()}
      style={[
        styles.buttonSeguirAsignatura,
        { backgroundColor: props.asignaturaSeguida ? "darkgrey" : Azul }
      ]}
    >
      <Text style={styles.text}>
        {props.asignaturaSeguida ? "Siguiendo" : "Seguir asignatura"}
      </Text>
    </RippleTouchable>
  );
};

export default BotonSeguirAsignatura;
