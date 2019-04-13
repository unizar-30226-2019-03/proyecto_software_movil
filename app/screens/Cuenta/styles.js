import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		
	},
	userView: {
		paddingTop: 20,
		paddingLeft: 20,
		paddingBottom: 20,
		borderBottomWidth: 1,
		borderColor: 'grey',
		
	},
	userIcon: {
		width: 80,
		height: 80,
		alignSelf: "flex-start",
		borderRadius: 50,
	},
	boton: {
		backgroundColor: 'white',
		height: 60,
		width: '100%',
		borderBottomWidth: 1,
		borderColor: 'grey',
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start"
	},
	titulo:{
		color: 'black',
		fontSize: 15,
		fontWeight: "bold",
		marginLeft: 10
	},
	userName: {
		color: 'black',
		
		
	}
});
