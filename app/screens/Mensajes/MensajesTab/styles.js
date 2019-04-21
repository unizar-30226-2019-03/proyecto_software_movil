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
		justifyContent: "space-between"
	},
	profilePic: {
		width: 50,
		height: 50,
		borderRadius: 50,
		margin: 8,
	},
	nameAndMsgContainer: {
		flex: 1,
		paddingLeft: 10,
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "space-between",
	},
	nameText: {
		fontWeight: "bold",
		fontSize: 17
	},
	msgText: {
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
