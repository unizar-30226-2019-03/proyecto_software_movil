import React from "react";
import { View, 
		Button,
		TextInput,
	} from "react-native";
import MyImagePicker from '../../../../components/MyImagePicker';

import styles from "./styles";

export default class SingUpOne extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: "Registrarse"
	});
	render() {
		return (
		  <View style={styles.container}>
			<View style={styles.container07}>
			  <TextInput 
				style={{borderWidth: 1, paddingHorizontal: 7}}
				onChangeText={(text) => this.setState({text})}
				placeholder={"Usuario*"}
			  />
			  <TextInput 
				style={{borderWidth: 1, paddingHorizontal: 7}}
				secureTextEntry={true}
				onChangeText={(text) => this.setState({text})}
				placeholder={"Contraseña*"}
			  />
			  <TextInput 
				style={{borderWidth: 1, paddingHorizontal: 7}}
				secureTextEntry={true}
				onChangeText={(text) => this.setState({text})}
				placeholder={"Vuelva a introducir la contraseña*"}
			  />
			  <MyImagePicker/>
			  <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
				<Button
				  title='Siguiente'
				/>
			  </View>
			</View>
		  </View>
		);
	  };
}
