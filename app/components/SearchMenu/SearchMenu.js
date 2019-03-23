import React from "react";
import { Text, View, TouchableHighlight } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import styles from "./styles";

const SearchMenuBar = ({ navigation }) => {
  return {
    headerTitle: (
      <View style={styles.container}>
        <Ionicons name="ios-apps" style={styles.AppIcon} />
        <Text style={styles.SearchBarTitle}>Nombre</Text>
      </View>
    ),
    headerRight: (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.SearchButton}
          onPress={() => navigation.navigate("SearchScreen")}
        >
          <Ionicons name="ios-search" style={styles.SearchIcon} />
        </TouchableHighlight>
        <EvilIcons name="user" style={styles.UserIcon} />
      </View>
    )
  };
};

export default SearchMenuBar;
