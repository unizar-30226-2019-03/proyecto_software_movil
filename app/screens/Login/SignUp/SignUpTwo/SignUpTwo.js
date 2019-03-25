import React from "react";
import { Text, View, Button } from "react-native";

import styles from "./styles";

export default class SignUpTwo extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Registrarse"
	});
	render() {
		return (
			<View style={styles.container}>
				<Button
					onPress={() => this.props.navigation.navigate("Logged")}
					title="IR A HOME"
				/>
			</View>
		);
	}
}
