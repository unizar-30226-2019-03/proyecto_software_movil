/**
 * @fileoverview Pantalla no hay contenido que mostrar
 * @author Unicast
 */
import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";
/**
 *
 * @param {String} what Indica que tipo de contenido no hay para mostrar
 * @example
 * var what = "videos"
 * //Se mostrará "No hay videos que mostrar"
 */
const NoHayContenidoQueMostrar = ({ what }) => {
  console.log(what);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{"No hay " + what + " que mostrar"}</Text>
    </View>
  );
};

export default NoHayContenidoQueMostrar;
