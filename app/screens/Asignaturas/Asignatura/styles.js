import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1
	},
	viewSeguirAsignatura: {
		flexDirection: "row",
		justifyContent: "flex-end",
		paddingTop: 10,
		paddingRight: 5
	},
	iconAndNameView: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start"
	},
	userIcon: {
		width: 80,
		height: 80,
		borderRadius: 50
	},
	userName: {
		color: "black",
		fontSize: 15
	},
	videosView: {
		marginTop: 30
	},
	profesoresView: {
		marginTop: 15
	}
});
