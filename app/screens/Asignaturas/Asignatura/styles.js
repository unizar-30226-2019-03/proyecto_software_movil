import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	viewSeguirAsignatura: {
		flexDirection: "row",
		justifyContent: "flex-end",
		paddingTop: 10,
		paddingRight: 5,
	},
	buttonSeguirAsignatura: {
		width: 200,
	},
	viewTextProfes: {
		paddingTop: 20,
		//borderWidth: 7,
		//borderColor: "red",
	},
	textProfesores: {
		paddingLeft: 15,
		fontWeight: "bold",
		fontSize: 20,
	},
	userView: {
		borderBottomWidth: 1,
		borderColor: 'grey',
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-around",
		flexWrap: "wrap",
		paddingBottom: 10,
	},
	iconAndNameView: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start"
	},
	userIcon: {
		width: 80,
		height: 80,
		//alignSelf: "flex-start",
		borderRadius: 50,
	},
	userName: {
		color: 'black',
		//fontWeight: "bold",
		fontSize: 15,
	},
});
