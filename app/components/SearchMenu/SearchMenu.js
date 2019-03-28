import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

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
      <TouchableOpacity
        onPress={() => navigation.navigate("Inicio")}
        style={styles.flexContainer}
        activeOpacity={1}
      >
        <View style={styles.container}>
          <Ionicons name="ios-apps" style={styles.appIcon} />
          <Text style={styles.searchBarTitle}>UniCast</Text>
        </View>
      </TouchableOpacity>
    ),
    headerRight: (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => navigation.navigate("Searching")}
          activeOpacity={0.6}
        >
          <Ionicons name="ios-search" style={styles.searchIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.userButton}
          onPress={() => navigation.navigate("Cuenta")}
          activeOpacity={0.6}
        >
          <Image
            source={require("../../../test/imagenes/perfil.jpg")}
            style={styles.userIcon}
          />
        </TouchableOpacity>
      </View>
    ),
    headerStyle: {
      elevation: elevation
    }
  };
};

export default SearchMenuBar;
