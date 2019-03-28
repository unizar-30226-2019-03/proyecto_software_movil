import React from "react";
import { Text, View, Button, ScrollView } from "react-native";

import HalfScreenThumbnail from "../../../components/HalfScreenThumbnail";

import styles from "./styles";

export default class ListaVideos extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam("title")
	});

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<HalfScreenThumbnail navigation={this.props.navigation} />
					<HalfScreenThumbnail navigation={this.props.navigation} />
					<HalfScreenThumbnail navigation={this.props.navigation} />
					<HalfScreenThumbnail navigation={this.props.navigation} />
					<HalfScreenThumbnail navigation={this.props.navigation} />
					<HalfScreenThumbnail navigation={this.props.navigation} />
					<HalfScreenThumbnail navigation={this.props.navigation} />
					<HalfScreenThumbnail navigation={this.props.navigation} />
					<HalfScreenThumbnail navigation={this.props.navigation} />
					<HalfScreenThumbnail navigation={this.props.navigation} />
					<HalfScreenThumbnail navigation={this.props.navigation} />
				</ScrollView>
			</View>
		);
	}
}
