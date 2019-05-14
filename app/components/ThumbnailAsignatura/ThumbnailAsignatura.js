import React from "react";
import { Text, View, TouchableNativeFeedback, Image } from "react-native";

import styles from "./styles";

const ThumbnailAsignatura = props => {
  return (
    <TouchableNativeFeedback
      onPress={() =>
        props.navigation.navigate("Asignatura", {
          title: props.name,
          id: props.id
        })
      }
    >
      <View style={styles.asignaturaContainer}>
        <Image source={props.icon} style={styles.asignaturaIcon} margin={20} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.name}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default ThumbnailAsignatura;
