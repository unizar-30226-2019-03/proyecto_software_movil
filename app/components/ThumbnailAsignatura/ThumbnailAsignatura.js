/**
 * @fileoverview Thumbnail de una signatura
 * @requires ../../components/RippleTouchable:RippleTouchable
 */
import React from "react";
import { Text, View, Image } from "react-native";

import RippleTouchable from "../../components/RippleTouchable";

import styles from "./styles";
/**
 * @module ThumbnailAsignatura
 * @param {Object} props props para renderizar el componente
 *    props.navigation  navegación
 *    props.name Nombre de la asignatura
 *    props.icon Icono de la Asignatura (El de la universidad)
 */
const ThumbnailAsignatura = props => {
  return (
    <RippleTouchable
      onPress={() =>
        props.navigation.navigate("Asignatura", {
          title: props.name,
          id: props.id
        })
      }
      style={styles.asignaturaContainer}
    >
      <Image source={props.icon} style={styles.asignaturaIcon} margin={20} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.name}</Text>
      </View>
    </RippleTouchable>
  );
};

export default ThumbnailAsignatura;
