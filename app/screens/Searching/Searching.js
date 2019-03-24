import React from "react";
import { Text, View } from "react-native";

import { SearchBar } from "react-native-elements";

import { HeaderBackButton } from "react-navigation";

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
			</View>
		);
	}
}
