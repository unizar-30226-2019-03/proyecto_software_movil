import React from "react";
import { Text, View, Image } from "react-native";

import RippleTouchable from "../../components/RippleTouchable";

import styles from "./styles";

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
