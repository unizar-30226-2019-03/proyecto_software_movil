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
		alignItems: "flex-start",
		justifyContent: "center"
	},
	titulo:{
		color: 'black'
	},
	userName: {
		color: 'black'
		
	}
});
