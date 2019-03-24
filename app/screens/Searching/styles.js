import { StyleSheet } from "react-native";

import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
	container: {
		flex: 1
	},
	headerContainer: {
		width: width - 56
	},
	searchBarIn: {
		backgroundColor: 0x00f
	},
	searchBarOut: {
		backgroundColor: "white",
		borderTopWidth: 0,
		borderBottomWidth: 0
	}
});
