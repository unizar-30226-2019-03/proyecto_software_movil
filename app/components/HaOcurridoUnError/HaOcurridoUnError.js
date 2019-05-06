import { Alert } from "react-native";

const HaOcurridoUnError = callback => {
	return Alert.alert(
		"Error!",
		"Ha ocurrido un error, vuelva a intentarlo",
		[{ text: "Vale", onPress: () => callback() }],
		{ cancelable: false }
	);
};

export default HaOcurridoUnError;
