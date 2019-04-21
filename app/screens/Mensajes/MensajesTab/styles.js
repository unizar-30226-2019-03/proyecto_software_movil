import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1
	},
	chatContainer: {
		marginHorizontal: 8,
		borderBottomWidth: 1,
		borderColor: "lightgrey",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	profilePic: {
		width: 50,
		height: 50,
		borderRadius: 50,
		margin: 8,
	},
	nameAndMsgContainer: {
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "space-between",
		width: 250,
		height: 47,
	},
	nameText: {
		maxWidth: 240,
		fontWeight: "bold",
		fontSize: 17
	},
	msgText: {
		maxWidth: 240,
		color: "darkgrey",
		fontSize: 15,
	},
	hourText: {
		alignSelf: "flex-start",
		marginTop: 13,
		color: "darkgrey",
		fontSize: 13,
	},
});
