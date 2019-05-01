import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5FCFF",
	},
	viewGeneral: {
		paddingTop: 40,
		paddingHorizontal: 20,
		justifyContent: "center",

	},
	alertContainer: {
		justifyContent: "center",
		alignItems: "center"
	},
	alertHeader: {
		textAlign: "center",
		fontSize: 21,
		paddingBottom: 15,
	},
	alertText: {
		textAlign: "center",
		fontSize: 16,
	},
	overlayStyle: {
		justifyContent: "center",
		alignItems: "center"
	},
	buttonOk: {
		paddingTop: 30,
		width: 270,
	},
	viewInput: {
		alignItems: "center",
	},
	viewButton: {
		paddingHorizontal: 10,
		paddingTop: 20,
		alignSelf: "flex-end",
		width: 200,
	}
});
