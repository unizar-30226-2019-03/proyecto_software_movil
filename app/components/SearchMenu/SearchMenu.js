import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

import ImagenPerfil from "../ImagenPerfil";

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
      <TouchableOpacity onPress={() => navigation.navigate("Inicio")} style={styles.flexContainer} activeOpacity={1}>
        <View style={styles.container}>
          <Image source={require("../../assets/icon.png")} style={styles.appLogo} />
          <Image source={require("../../assets/unicast.png")} style={styles.appText} />
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
        <TouchableOpacity style={styles.userButton} onPress={() => navigation.navigate("Cuenta")} activeOpacity={0.6}>
          <ImagenPerfil style={styles.userIcon} />
        </TouchableOpacity>
      </View>
    ),
    headerStyle: {
      elevation: elevation
    }
  };
};

export default SearchMenuBar;
