import React from "react";
import { Text, View, Button } from "react-native";

import styles from "./styles";

export default class ListaVideos extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam("title")
	});

	render() {
		return (
			<View style={styles.container}>
				<Text>TODO VIDEOS TAB</Text>
				<Button
					onPress={() => this.props.navigation.navigate("ViendoVideo")}
					title="IR VIDEO"
				/>
			</View>
		);
	}
}