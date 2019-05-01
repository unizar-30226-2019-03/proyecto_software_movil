import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1
	},
	logoView: {
		paddingHorizontal: 60,
		paddingVertical: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	appLogo: { 
		width: 100, 
		height: 100 
	},
	inputBoxSeparation: {
		paddingHorizontal: 40,
		paddingBottom: 30,
	},
	inputSeparation: {
		paddingRight: 10,
	},
	inputSeparationInfo: {
		paddingRight: 15,
	},
	viewImageContainer: {
		paddingHorizontal: 50,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: 10
	},
	profPic: {
		width: 85, 
		height: 85,
		borderRadius: 85
	},
	profPicButton: {
		width: 150
	},
	descriptionContainer: {
		paddingHorizontal: 40,
		paddingBottom: 30,
	},
	viewNextButton: {
		paddingRight: 20,
		alignItems: "flex-end",
		paddingBottom: 20,
	},
	nextButton: {
		width: 120
	}
});
