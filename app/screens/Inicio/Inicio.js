import React from "react";
import { Text, View, Button, ScrollView } from "react-native";

import FullScreenThumbnail from "../../components/FullScreenThumbnail";

import styles from "./styles";

export default class Inicio extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<FullScreenThumbnail navigation={this.props.navigation} />
					<FullScreenThumbnail navigation={this.props.navigation} />
					<FullScreenThumbnail navigation={this.props.navigation} />
					<FullScreenThumbnail navigation={this.props.navigation} />
					<FullScreenThumbnail navigation={this.props.navigation} />
					<FullScreenThumbnail navigation={this.props.navigation} />
					<FullScreenThumbnail navigation={this.props.navigation} />
				</ScrollView>
			</View>
		);
	}
}
