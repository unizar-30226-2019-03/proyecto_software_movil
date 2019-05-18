import { StyleSheet } from "react-native";

import { ScreenhHeight, Azul, HeaderHeight } from "../../constants";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)"
	},
	anyadirAListaContainer: {
		flex: 1,
		marginTop: ScreenhHeight * 0.45,
		backgroundColor: "#fff"
	},
	texto: {
		fontSize: 18,
		fontWeight: "normal",
		color: "black"
	},
	nuevaListaContainer: {
		marginLeft: "auto"
	},
	nuevaListaTexto: {
		fontSize: 16,
		color: Azul
	},
	guardarYNuevaListaContainer: {
		flexDirection: "row",
		padding: 10
	},
	listoContainer: {
		padding: 10,
		flexDirection: "row",
		alignItems: "center"
	},
	listoTexto: {
		fontSize: 18,
		marginLeft: 7
	},
	divider: {
		backgroundColor: "gray"
	},
	activityIndicatorContainer: {
		flex: 1,
		justifyContent: "center"
	},
	checkBoxContainer: {
		backgroundColor: "rgba(0, 0, 0, 0)",
		borderWidth: 0,
		margin: 0,
		padding: 0
	},
	checkBoxView: {
		paddingVertical: 10
	}
});
