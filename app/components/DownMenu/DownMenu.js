import React from "react";

import { createBottomTabNavigator } from "react-navigation";

import EntypoIcons from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import Inicio from "../../screens/Inicio";
import Ranking from "../../screens/Ranking";
import Asignaturas from "../../screens/Asignaturas";
import Mensajes from "../../screens/Mensajes";
import Biblioteca from "../../screens/Biblioteca";

import styles from "./styles";

export default createBottomTabNavigator(
  {
    Inicio: Inicio,
    Ranking: Ranking,
    Asignaturas: Asignaturas,
    Mensajes: Mensajes,
    Biblioteca: Biblioteca
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent;
        let iconName;
        if (routeName === "Inicio") {
          IconComponent = MaterialCommunityIcons;
          iconName = "home";
        } else if (routeName === "Ranking") {
          IconComponent = MaterialCommunityIcons;
          iconName = "trophy";
        } else if (routeName === "Asignaturas") {
          IconComponent = EntypoIcons;
          iconName = "graduation-cap";
        } else if (routeName === "Mensajes") {
          IconComponent = SimpleLineIcons;
          iconName = "envelope-letter";
        } else if (routeName === "Biblioteca") {
          IconComponent = MaterialCommunityIcons;
          iconName = "folder";
        }
        return (
          <IconComponent
            name={iconName}
            style={styles.icon}
            color={tintColor}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);
