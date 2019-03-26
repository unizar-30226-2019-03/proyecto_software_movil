import React from "react";
import { Text, View, Button, ScrollView } from "react-native";

import Thumbnail from "../../components/Thumbnail";

import styles from "./styles";

export default class Inicio extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<Button
						onPress={() => this.props.navigation.navigate("ViendoVideo")}
						title="IR A VIDEO"
					/>
					<Button
						onPress={() =>
							this.props.navigation.navigate("Asignatura", {
								title: "UPM - Proyecto software"
							})
						}
						title="IR A ASIGNATURA CONCRETA"
					/>
					<Thumbnail />
				</ScrollView>
			</View>
		);
	}
}
