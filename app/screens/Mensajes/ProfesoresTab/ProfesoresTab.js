import React from "react";
import { Text, View } from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";

import SearchMenu from "../../../components/SearchMenu";
import SearchScreen from "../../Searching";

import styles from "./styles";

export default class ProfesorTab extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>TODO PROFESORES TAB</Text>
			</View>
		);
	}
}

