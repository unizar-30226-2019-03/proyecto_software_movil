import React from "react";
import { Text, View } from "react-native";

import { SearchBar, Button } from "react-native-elements";

import styles from "./styles";

export default class Searching extends React.Component {
	state = {
		search: ""
	};

	updateSearch = search => {
		this.setState({ search });
	};

	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: (
				<View style={styles.headerContainer}>
					<SearchBar
						placeholder="Buscar..."
						inputContainerStyle={styles.searchBarIn}
						searchIcon={false}
						containerStyle={styles.searchBarOut}
					/>
				</View>
			)
		};
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>TODO SEARCHING SCREEN</Text>
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
			</View>
		);
	}
}
