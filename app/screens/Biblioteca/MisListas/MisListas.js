import React from "react";
import { Text, View, Button, ScrollView } from "react-native";

import ListaThumbnail from "../../../components/ListaThumbnail";

import styles from "./styles";

export default class MisListas extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Mis listas"
	});

	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<ListaThumbnail navigation={this.props.navigation} />
					<ListaThumbnail navigation={this.props.navigation} />
					<ListaThumbnail navigation={this.props.navigation} />
					<ListaThumbnail navigation={this.props.navigation} />
					<ListaThumbnail navigation={this.props.navigation} />
					<ListaThumbnail navigation={this.props.navigation} />
					<ListaThumbnail navigation={this.props.navigation} />
					<ListaThumbnail navigation={this.props.navigation} />
					<ListaThumbnail navigation={this.props.navigation} />
					<ListaThumbnail navigation={this.props.navigation} />
					<ListaThumbnail navigation={this.props.navigation} />
					<ListaThumbnail navigation={this.props.navigation} />
					<ListaThumbnail navigation={this.props.navigation} />
				</ScrollView>
			</View>
		);
	}
}
