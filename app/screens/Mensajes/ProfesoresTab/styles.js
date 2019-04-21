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
		justifyContent: "flex-start"
	},
	profilePic: {
		width: 50,
		height: 50,
		borderRadius: 50,
		margin: 8,
	},
	nameAndMsgContainer: {
		paddingLeft: 10,
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "space-between",
		width: 300,
		height: 47,
	},
	nameText: {
		maxWidth: 300,
		fontWeight: "bold",
		fontSize: 17
	},
	msgText: {
		maxWidth: 300,
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
