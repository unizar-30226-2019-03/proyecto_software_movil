import React from "react";
import { Text, View } from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";

import SearchMenu from "../../components/SearchMenu";
import SearchScreen from "../Searching";

import styles from "./styles";

class Ranking extends React.Component {
	static navigationOptions = SearchMenu;

	render() {
		return (
			<View style={styles.container}>
				<Text>TODO RANKING</Text>
			</View>
		);
	}
}

const RankingStackNav = createStackNavigator({
	Ranking: Ranking,
	SearchScreen: SearchScreen
});

export default createAppContainer(RankingStackNav);
