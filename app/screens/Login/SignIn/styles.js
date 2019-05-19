import { StyleSheet } from "react-native";

import { Azul } from "../../../constants";

export default StyleSheet.create({
	container: {
		flex: 1
	},
	logoView: {
		paddingHorizontal: 80,
		paddingTop: 70,
		paddingBottom: 10,
		alignItems: "center",
		justifyContent: "center"
	},
	appLogo: {
		width: 100,
		height: 100
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
	loginButtonContainer: {
		marginTop: 70,
		marginHorizontal: 50
	},
	loginButton: {
		backgroundColor: Azul
	},
	registerButtonContainer: {
		marginTop: 20,
		marginHorizontal: 50
	},
	registerButton: {
		borderColor: Azul
	}
});
