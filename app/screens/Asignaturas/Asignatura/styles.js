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
	userView: {
		borderBottomWidth: 1,
		borderColor: 'grey',
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start"	
	},
	userIcon: {
		width: 80,
		height: 80,
		alignSelf: "flex-start",
		borderRadius: 50,
	},
	userName: {
		color: 'black',
		fontWeight: "bold",
		fontSize: 15,
	},
});
