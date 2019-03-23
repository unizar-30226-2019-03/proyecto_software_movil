import React from "react";

import { createBottomTabNavigator } from "react-navigation";

import EntypoIcon from "react-native-vector-icons/Entypo";
import MCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SLIcons from "react-native-vector-icons/SimpleLineIcons";

import Inicio from "../../screens/Inicio";
import Ranking from "../../screens/Ranking";
import Asignaturas from "../../screens/Asignaturas";
import Mensajes from "../../screens/Mensajes";
import Biblioteca from "../../screens/Biblioteca";

import styles from "./styles";

export default createBottomTabNavigator(
  {
    Inicio: {
      screen: Inicio,
      navegationOptions: {
        tabBarLabel: "Inicio",
        tabBarIcon: ({ tintColor }) => (
          <MCIcons name="home" style={styles.Icon} />
        )
      }
    },
    Ranking: {
      screen: Ranking,
      navegationOptions: {
        tabBarLabel: "Ranking",
        tabBarIcon: ({ tintColor }) => (
          <MCIcons name="trophy" style={styles.Icon} />
        )
      }
    },
    Asignaturas: {
      screen: Asignaturas,
      navegationOptions: {
        tabBarLabel: "Asignaturas",
        tabBarIcon: ({ tintColor }) => (
          <EntypoIcon name="graduation-cap" style={styles.Icon} />
        )
      }
    },
    Mensajes: {
      screen: Mensajes,
      navegationOptions: {
        tabBarLabel: "Mensajes",
        tabBarIcon: ({ tintColor }) => (
          <SLIcons name="envelope-letter" style={styles.Icon} />
        )
      }
    },
    Biblioteca: {
      screen: Biblioteca,
      navegationOptions: {
        tabBarLabel: "Biblioteca",
        tabBarIcon: ({ tintColor }) => (
          <MCIcons name="folder" style={styles.Icon} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showIcon: true
    }
  }
);
