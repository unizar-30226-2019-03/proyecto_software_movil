import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 30,
		paddingTop: 20,
		justifyContent: "flex-start",
		backgroundColor: "#F5FCFF"
	},
	logoView: {
		paddingTop: 15,
		paddingBottom: 25,
		alignItems: "center",
		justifyContent: "center",
	},
	container07: {
		flex: 0.7,
		justifyContent: "space-around",
		backgroundColor: "#F5FCFF"
	},
	inputBoxSeparation: {
		paddingBottom: 25,
	},
	description: {
		paddingTop: 10,
		maxHeight: 20,
	},
	inputSeparation: {
		paddingRight: 10,
	},
	nextButton: {
		position: "absolute",
		bottom: 10,
		right: 10,
		justifyContent: "flex-end",
		alignItems: "flex-end"
	},
});
