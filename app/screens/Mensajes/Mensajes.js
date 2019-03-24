import React from "react";
import { Text, View } from "react-native";

import {
	createAppContainer,
	createMaterialTopTabNavigator,
	createStackNavigator
} from "react-navigation";

import SearchMenu from "../../components/SearchMenu";
import { TopTabBarOptions } from "../../components/TopTabBarOptions";
import SearchScreen from "../Searching";

import MensajesTab from "./MensajesTab";
import ProfesoresTab from "./ProfesoresTab";

const MensajesTopNav = createMaterialTopTabNavigator(
	{
		MensajesTab: {
			screen: MensajesTab,
			navigationOptions: {
				tabBarLabel: "MENSAJES"
			}
		},
		ProfesoresTab: {
			screen: ProfesoresTab,
			navigationOptions: {
				tabBarLabel: "PROFESORES"
			}
		}
	},
	TopTabBarOptions
);

MensajesTopNav.navigationOptions = SearchMenu;

// TODO: ANYADIR ESTO A NAVIGATIONOPTIONS PARA QUITAR EL BORDE INFERIOR DEL HEADER
// 	headerStyle: {
// 		elevation: ,
// 		shadowOpacity: 0
// 	}

const MensajesStackNav = createStackNavigator({
	Mensajes: MensajesTopNav,
	SearchScreen: SearchScreen
});

const Mensajes = createAppContainer(MensajesStackNav);

export default Mensajes;
