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
	appLogo: { 
		width: 50, 
		height: 50 
	},
	container07: {
		flex: 0.7,
		justifyContent: "space-around",
		backgroundColor: "#F5FCFF"
	},
	inputBoxSeparation: {
		paddingBottom: 25,
	},
	containerDescr: {
		marginTop: 15,
		maxHeight: 50,
		justifyContent: "space-around",
		backgroundColor: "#F5FCFF"
	},
	description: {
		//position: "absolute",
		//bottom: 90,
		//left: 30,
		//maxHeight: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",

	},
	inputSeparation: {
		paddingRight: 10,
	},
	viewImageContainer: {
		paddingTop: 15,
		flexDirection: "row",
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between"
	},
	profPic: {
		width: 70, 
		height: 70 
	},
	nextButton: {
		position: "absolute",
		bottom: 10,
		right: 10,
		justifyContent: "flex-end",
		alignItems: "flex-end"
	},
});
