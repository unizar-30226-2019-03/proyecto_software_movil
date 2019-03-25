import React from "react";
import { Text, View, Button } from "react-native";

import styles from "./styles";

export default class VideosTab extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>TODO VIDEOS TAB</Text>
				<Button
					onPress={() => this.props.navigation.navigate("ViendoVideo")}
					title="IR VIDEO"
				/>
			</View>
		);
	}
}
