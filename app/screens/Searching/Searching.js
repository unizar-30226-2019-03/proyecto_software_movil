import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import { SearchBar } from "react-native-elements";

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
			headerRight: (
				<SearchBar
					placeholder="Type Here..."
					onChangeText={this.updateSearch}
					value={this.state}
				/>
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
