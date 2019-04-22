import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5FCFF"
	},
	logoView: {
		paddingHorizontal: 80,
		paddingVertical: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	appLogo: { 
		width: 75, 
		height: 75 
	},
	inputBoxSeparation: {
		paddingHorizontal: 40,
		paddingBottom: 30,
	},
	placeholderText: {
		fontSize: 16
	},
	viewNextButton: {
		paddingTop: 20,
		paddingRight: 20,
		alignItems: "flex-end",
		paddingBottom: 20,
	},
	nextText: {
		fontSize: 17,
	},
	nextButton: {
		width: 140
	}
});
