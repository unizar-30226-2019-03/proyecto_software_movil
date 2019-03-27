import { StyleSheet } from "react-native";

export default StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
	},
	userIcon: {
		width: 35,
		height: 35,
		alignSelf: "center",
		borderRadius: 50
	},
	userName: {
		fontSize: 20,
		fontWeight: "bold",
		marginLeft: 15
	},
	container: {
		flex: 1
	}
});
