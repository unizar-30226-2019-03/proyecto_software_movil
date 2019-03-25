import React from "react";
import { Text, View, TouchableHighlight } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import styles from "./styles";

const SearchMenuBar = ({ navigation }) => {
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
          <EvilIcons name="user" style={styles.userIcon} />
        </TouchableHighlight>
      </View>
    )
  };
};

export default SearchMenuBar;
