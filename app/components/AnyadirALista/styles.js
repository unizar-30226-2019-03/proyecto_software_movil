import { StyleSheet } from "react-native";

import { ScreenhHeight, AzulNuevaLista, headerHeight } from "../../constants";

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
		fontSize: 18
	},
	nuevaListaContainer: {
		marginLeft: "auto"
	},
	nuevaListaTexto: {
		fontSize: 16,
		color: AzulNuevaLista
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
	listaContainer: {
		flexDirection: "row",
		alignItems: "center"
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
	}
});
