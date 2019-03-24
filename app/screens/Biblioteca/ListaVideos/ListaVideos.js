import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

export default class ListaVideos extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam("title")
	});

	render() {
		return <Text>TODO LISTA VIDEOS (Historia, mis videos etc, todo en 1)</Text>;
	}
}
