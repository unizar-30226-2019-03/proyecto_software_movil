import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1
	},
	viewProfPic: {
		paddingVertical: 25,
		alignItems: "center",
		justifyContent: "center",
	},
	profPic: {
		height: 200,
		aspectRatio: 4/4,
		borderRadius: 200,
	},
	viewNombre: {
		paddingBottom: 25,
		alignItems: "flex-start",
		justifyContent: "center"
	},
	viewDescripcion: {
		alignItems: "flex-start",
		justifyContent: "center",
		paddingBottom: 25,
	},
	leftIconName: {
		paddingRight: 15,
		alignSelf: "flex-start",
	},
	leftIconDescr: {
		paddingRight: 20,
		alignSelf: "flex-start",
	},
	rightIcon: {
		paddingRight: 17,
		alignSelf: "flex-end",
	}
});
