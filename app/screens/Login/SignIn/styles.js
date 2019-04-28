import { StyleSheet } from "react-native";

import { Azul } from "../../../constants";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5FCFF"
	},
	logoView: {
		paddingHorizontal: 80,
		paddingTop: 85,
		paddingBottom: 40,
		alignItems: "center",
		justifyContent: "center"
	},
	appLogo: {
		width: 75,
		height: 75
	},
	inputBoxSeparation: {
		paddingHorizontal: 40,
		paddingTop: 30
	},
	description: {
		paddingTop: 10,
		maxHeight: 20
	},
	inputSeparation: {
		paddingRight: 10
	},
	viewForgotPassword: {
		paddingTop: 20,
		alignItems: "center"
	},
	forgotPassword: {
		color: "skyblue",
		textDecorationLine: "underline",
		fontSize: 17
	},
	loginButtonContainer: {
		paddingTop: 40,
		paddingHorizontal: 50
	},
	loginButton: {
		backgroundColor: Azul
	},
	registerButtonContainer: {
		paddingTop: 20,
		paddingHorizontal: 50
	},
	registerButton: {
		borderColor: Azul
	}
});
