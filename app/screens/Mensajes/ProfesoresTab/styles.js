import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1
	},
	chatContainer: {
		flex: 1,
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
		margin: 8
	},
	nameAndMsgContainer: {
		flex: 1,
		paddingLeft: 10,
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "space-between"
	},
	nameText: {
		fontSize: 18
	}
});
