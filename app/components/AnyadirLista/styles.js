import { StyleSheet } from "react-native";

import { ScreenhHeight, Azul, HeaderHeight } from "../../constants";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)"
	},
	anyadirListaContainer: {
		marginTop: ScreenhHeight * 0.1,
		marginHorizontal: 20,
		backgroundColor: "#fff",
		borderRadius: 3
	},
	nuevaListaTexto: {
		fontSize: 16,
		color: Azul,
		padding: 5
	},
	guardarYNuevaListaContainer: {
		flexDirection: "row",
		padding: 10
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
		marginRight: 5
	},
	crearCancelarContainer: {
		padding: 10,
		marginTop: 15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end"
	}
});
