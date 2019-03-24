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

import AsignaturasTab from "./AsignaturasTab";
import VideosTab from "./VideosTab";

const AsignaturasTopNav = createMaterialTopTabNavigator(
	{
		AsignaturasTab: {
			screen: AsignaturasTab,
			navigationOptions: {
				tabBarLabel: "ASIGNATURAS"
			}
		},
		VideosTab: {
			screen: VideosTab,
			navigationOptions: {
				tabBarLabel: "VIDEOS"
			}
		}
	},
	TopTabBarOptions
);

AsignaturasTopNav.navigationOptions = SearchMenu;

// TODO: ANYADIR ESTO A NAVIGATIONOPTIONS PARA QUITAR EL BORDE INFERIOR DEL HEADER
// 	headerStyle: {
// 		elevation: ,
// 		shadowOpacity: 0
// 	}

const AsignaturasStackNav = createStackNavigator({
	Asignaturas: AsignaturasTopNav,
	SearchScreen: SearchScreen
});

const Mensajes = createAppContainer(AsignaturasStackNav);

export default Mensajes;
