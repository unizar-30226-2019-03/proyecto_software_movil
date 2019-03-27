import React from "react";
import { Text, View, TouchableHighlight, Image } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import styles from "./styles";

const SearchMenuBar = ({ navigation }) => {
  const { routeName } = navigation.state;
  let elevation = 5;
  if (routeName === "Mensajes" || routeName === "Asignaturas") {
    elevation = 0;
  }

  return {
    headerTitle: (
      <View style={styles.container}>
        <Ionicons name="ios-apps" style={styles.appIcon} />
        <Text style={styles.searchBarTitle}>UniCast</Text>
      </View>
    ),
    headerRight: (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.searchButton}
          onPress={() => navigation.navigate("Searching")}
        >
          <Ionicons name="ios-search" style={styles.searchIcon} />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.userButton}
          onPress={() => navigation.navigate("Cuenta")}
        >
          <Image
            source={require("../../../test/imagenes/perfil.jpg")}
            style={styles.userIcon}
          />
        </TouchableHighlight>
      </View>
    ),
    headerStyle: {
      elevation: elevation
    }
  };
};

export default SearchMenuBar;
