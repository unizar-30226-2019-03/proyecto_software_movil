import { Dimensions,StyleSheet } from "react-native";
const {width, height} = Dimensions.get('window');

const alturaCelda = height*0.15;

export default StyleSheet.create({
	container: {
		height:alturaCelda,
		borderColor:'black',
		borderWidth:alturaCelda*0.02
		
		
	},
	texto:{
		textAlign:'left',
		color:'black',
		fontSize: width*0.05,
		marginLeft: width * 0.05

	},
	asignaturaIcon:{
		width:'30%',
		height:'50%',
		marginTop: alturaCelda*0.05,
		marginLeft: width*0.05
		
	},


});