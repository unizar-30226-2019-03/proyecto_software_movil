import { StyleSheet } from "react-native";

import { ScreenWidth, GrisFondoBarraBusqueda } from "../../constants";

export default StyleSheet.create({
	container: {
		flex: 1
	},
	headerContainer: {
		width: ScreenWidth - 56
	},
	searchBarIn: {
		backgroundColor: 0x00f
	},
	searchBarOut: {
		backgroundColor: "white",
		borderTopWidth: 0,
		borderBottomWidth: 0
	},
	barraBusqueda: {
		backgroundColor: GrisFondoBarraBusqueda,
		borderRadius: 2,
		marginRight: 10,
		flexDirection: "row"
	},
	inputSearch: {
		flex: 1,
		padding: 3,
		marginLeft: 5
	},
	crossIcon: {
		marginLeft: "auto"
	}
});
