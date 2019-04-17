import { StyleSheet } from "react-native";

import { ScreenhHeight, headerHeight, AzulNuevaLista } from "../../constants";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)"
	},
	anyadirAListaContainer: {
		marginTop: ScreenhHeight * 0.45,
		height: ScreenhHeight * 0.55,
		backgroundColor: "#fff"
	},
	texto: {
		fontSize: 18
	},
	nuevaListaTexto: {
		fontSize: 16,
		color: AzulNuevaLista,
		marginLeft: "auto"
	},
	guardarYNuevaListaContainer: {
		flexDirection: "row",
		padding: 10
	}
});
