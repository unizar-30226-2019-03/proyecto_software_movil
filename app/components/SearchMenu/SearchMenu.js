import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

import { GrisClaro } from "../../constants";

import ImagenPerfil from "../ImagenPerfil";

import RippleTouchable from "../../components/RippleTouchable";

import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import styles from "./styles";

const SearchMenuBar = ({ navigation }) => {
  const { routeName } = navigation.state;
  let elevation = 5;
  if (routeName === "Mensajes" || routeName === "Asignaturas" || routeName === "Ranking") {
    elevation = 0;
  }

  return {
    headerTitle: (
      <TouchableOpacity onPress={() => navigation.navigate("Inicio")} activeOpacity={1}>
        <View style={styles.container}>
          <Image source={require("../../assets/icon.png")} style={styles.appLogo} />
          <Image source={require("../../assets/unicast.png")} style={styles.appText} />
        </View>
      </TouchableOpacity>
    ),
    headerRight: (
      <View style={styles.container}>
        <RippleTouchable onPress={() => navigation.navigate("Searching")} style={styles.searchButton} round={true}>
          <Ionicons name="ios-search" style={styles.searchIcon} />
        </RippleTouchable>
        <RippleTouchable onPress={() => navigation.navigate("Cuenta")} style={styles.userButton} round={true}>
          <ImagenPerfil style={styles.userIcon} />
        </RippleTouchable>
      </View>
    ),
    headerStyle: {
      elevation: elevation
    }
  };
};

export default SearchMenuBar;
