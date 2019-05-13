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
	anyadirListaContainer: {
		marginTop: ScreenhHeight * 0.1,
		marginHorizontal: 20,
		backgroundColor: "#fff"
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
	nuevaListaModalTexto: {
		padding: 10,
		marginLeft: 5,
		fontSize: 18
	},
	nuevaListaInputContainer: {
		marginLeft: 5
	},
	cancelar: {
		marginRight: 10
	},
	crearCancelarContainer: {
		padding: 10,
		marginTop: 15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end"
	},
	activityIndicatorContainer: {
		flex: 1,
		justifyContent: "center"
	},
	checkBoxContainer: {
		backgroundColor: "white",
		borderWidth: 0,
		margin: 0,
		padding: 0,
		paddingVertical: 10
	}
});
