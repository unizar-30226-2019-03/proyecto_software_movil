import { StyleSheet } from "react-native";

import { ScreenWidth, FullScreen16_9_Height, GrisClaro } from "../../constants";

export default StyleSheet.create({
	container: {
		flex: 1
	},
	headerContainer: {
		width: ScreenWidth - 56
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
