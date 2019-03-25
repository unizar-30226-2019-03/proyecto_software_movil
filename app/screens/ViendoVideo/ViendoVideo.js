import React from "react";
import { Text, View, Button } from "react-native";

import styles from "./styles";

export default class ViendoVideo extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam("title")
	});

	render() {
		return (
			<View style={styles.container}>
				<Text>TODO VIENDO VIDEO</Text>
				<Button
					title="ATRAS"
					onPress={() => {
						this.props.navigation.goBack(null);
					}}
				/>
				<Button
					onPress={() =>
						this.props.navigation.navigate("Asignatura", {
							title: "Una asignatura"
						})
					}
					title="IR ASIGNATURA"
				/>
			</View>
		);
	}
}
