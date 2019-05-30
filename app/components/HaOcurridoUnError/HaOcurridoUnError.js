/**
 * @fileoverview Mensaje de alerta mostrado si ocurre algún error
 * @author Unicast
 */
import { Alert } from "react-native";

/**
 *
 * @param {Function} callback Función a invocar al presionar "Vale"
 */
const HaOcurridoUnError = callback => {
  return Alert.alert(
    "¡Error!",
    "Ha ocurrido un error, vuelva a intentarlo",
    [{ text: "Vale", onPress: callback != null ? () => callback() : null }],
    { cancelable: false }
  );
};

export default HaOcurridoUnError;
