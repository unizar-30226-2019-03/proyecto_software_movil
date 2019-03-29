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
		justifyContent: "center",
		backgroundColor: "#F5FCFF",
		paddingBottom: 120,
		paddingTop: 60,
	},
	inputBoxSeparation: {
		paddingBottom: 20,
	},
	description: {
		paddingTop: 10,
		maxHeight: 20,
	},
	inputSeparation: {
		paddingRight: 10,
	},
	forgotPassword: {
		color: "skyblue",
		textDecorationLine: "underline",
		textAlign: "center"
	},
	loginContainer: {
		paddingTop: 25,
		paddingHorizontal: 0,
		
	},
	googleButton: {
		backgroundColor: "#dd4e41"
	},
	googleContainer: {
		paddingBottom: 10
	},
	viewImageContainer: {
		paddingTop: 15,
		flexDirection: "row",
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between"
	},
	nextButton: {
		position: "absolute",
		bottom: 10,
		right: 10,
		justifyContent: "flex-end",
		alignItems: "flex-end"
	},
});
