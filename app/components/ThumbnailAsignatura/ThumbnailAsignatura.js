import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

import styles from "./styles";

const ThumbnailAsignatura = ({
  navigation,
  icon,
  name
}) => {
  return (
    <TouchableOpacity
      style={styles.asignaturaContainer}
      onPress={() =>
        navigation.navigate("Asignatura", {
          title: name
        })
      }
      activeOpacity={1}
    >
      <Image
        source={icon}
        style={styles.asignaturaIcon}
        margin={20}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ThumbnailAsignatura;
