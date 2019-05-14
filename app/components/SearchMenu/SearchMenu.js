import React from "react";
import { Text, View, TouchableOpacity, Image, TouchableNativeFeedback } from "react-native";

import { GrisClaro } from "../../constants";

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
        <TouchableNativeFeedback
          onPress={() => navigation.navigate("Searching")}
          background={TouchableNativeFeedback.Ripple(GrisClaro, true)}
        >
          <View style={styles.searchButton}>
            <Ionicons name="ios-search" style={styles.searchIcon} />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => navigation.navigate("Cuenta")}
          background={TouchableNativeFeedback.Ripple(GrisClaro, true)}
        >
          <View style={styles.userButton}>
            <ImagenPerfil style={styles.userIcon} />
          </View>
        </TouchableNativeFeedback>
      </View>
    ),
    headerStyle: {
      elevation: elevation
    }
  };
};

export default SearchMenuBar;
