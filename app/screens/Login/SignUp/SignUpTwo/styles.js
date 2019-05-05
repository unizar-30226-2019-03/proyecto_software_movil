import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	logoView: {
		paddingHorizontal: 60,
		paddingVertical: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	appLogo: { 
		width: 110, 
		height: 110 
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
