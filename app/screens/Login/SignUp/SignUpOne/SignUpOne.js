import React from "react";
import { Text, View, Button } from "react-native";

import styles from "./styles";

export default class SingUpOne extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Registrarse"
	});
	render() {
		return (
			<View style={styles.container}>
				<Button
					onPress={() => this.props.navigation.navigate("SignUpTwo")}
					title="REGISTRARSE 2"
				/>
			</View>
		);
	}
}
