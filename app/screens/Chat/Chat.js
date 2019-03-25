import React from "react";
import { Text, View, TouchableHighlight } from "react-native";

import styles from "./styles";

import EvilIcons from "react-native-vector-icons/EvilIcons";

export default class Chat extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		headerTitle: (
			<TouchableHighlight
				style={styles.searchButton}
				onPress={() =>
					navigation.navigate("VerPerfil", { title: "Perfil de Pedro" })
				}
			>
				<View style={styles.headerContainer}>
					<EvilIcons name="user" style={styles.userIcon} />
					<Text>{navigation.getParam("title")}</Text>
				</View>
			</TouchableHighlight>
		)
	});

	render() {
		return (
			<View style={styles.container}>
				<Text>TODO CHAT</Text>
			</View>
		);
	}
}
