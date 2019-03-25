import React from "react";
import { Text, View, Button } from "react-native";

import styles from "./styles";

export default class MensajesTab extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>TODO MENSAJES TAB</Text>
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
