import React from "react";
import { Text, View, Button } from "react-native";

import styles from "./styles";

export default class SignIn extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>TODO LOGIN</Text>
				<Button
					onPress={() => this.props.navigation.navigate("TopBarScreens")}
					title="IR A HOME"
				/>
				<Button
					onPress={() => this.props.navigation.navigate("SignUpOne")}
					title="REGISTRARSE 1"
				/>
			</View>
		);
	}
}
