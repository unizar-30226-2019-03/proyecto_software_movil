import { StyleSheet } from "react-native";

import { Dimensions } from 'react-native'

export default StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "flex-start"
	},
	boton: {
		backgroundColor: "white",
		height: 60,
		width: (Dimensions.get('window').width),
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
	}
});
