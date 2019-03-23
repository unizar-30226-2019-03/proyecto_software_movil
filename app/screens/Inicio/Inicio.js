import React from "react";
import {
	Text,
	View,
	StyleSheet,
	Button,
	TouchableHighlight
} from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";

import SearchMenu from "../../components/SearchMenu";
import SearchScreen from "../Searching";

import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import styles from "./styles";

class Inicio extends React.Component {
	static navigationOptions = SearchMenu;

	render() {
		return (
			<View style={styles.container}>
				<Text>TODO INICIO</Text>
			</View>
		);
	}
}

const InicioStackNav = createStackNavigator({
	Inicio: {
		screen: Inicio
	},
	SearchScreen: {
		screen: SearchScreen
	}
});

export default createAppContainer(InicioStackNav);
