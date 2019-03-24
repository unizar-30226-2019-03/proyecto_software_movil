import React from "react";
import { Text, View } from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";

import SearchMenu from "../../components/SearchMenu";
import SearchScreen from "../Searching";

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
	Inicio: Inicio,
	SearchScreen: SearchScreen
});

export default createAppContainer(InicioStackNav);
