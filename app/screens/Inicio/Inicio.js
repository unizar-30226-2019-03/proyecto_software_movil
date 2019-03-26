import React from "react";
import { Text, View, Button, ScrollView } from "react-native";

import Thumbnail from "../../components/Thumbnail";

import styles from "./styles";

export default class Inicio extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<Thumbnail navigation={this.props.navigation} />
					<Thumbnail navigation={this.props.navigation} />
					<Thumbnail navigation={this.props.navigation} />
					<Thumbnail navigation={this.props.navigation} />
					<Thumbnail navigation={this.props.navigation} />
					<Thumbnail navigation={this.props.navigation} />
					<Thumbnail navigation={this.props.navigation} />
				</ScrollView>
			</View>
		);
	}
}
