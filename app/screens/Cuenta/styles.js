import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1
	},
	userView: {
		borderBottomWidth: 1,
		borderColor: "lightgrey",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start"
	},
	userIcon: {
		width: 80,
		height: 80,
		borderRadius: 50,
		margin: 20
	},
	boton: {
		backgroundColor: "white",
		height: 60,
		width: "100%",
		borderBottomWidth: 1,
		borderColor: "lightgrey",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start"
	},
	titulo: {
		color: "black",
		fontSize: 15,
		fontWeight: "bold",
		marginLeft: 10
	},
	userName: {
		color: "black",
		fontWeight: "bold",
		fontSize: 15
	}
});
