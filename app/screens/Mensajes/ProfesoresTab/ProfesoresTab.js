import React from "react";
import { Text, View, Button } from "react-native";

import styles from "./styles";

export default class ProfesorTab extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>TODO PROFESORES TAB</Text>
				<Button
					onPress={() =>
						this.props.navigation.navigate("Chat", {
							title: "Juancho Provisional"
						})
					}
					title="IR A CHAT"
				/>
			</View>
		);
	}
}
