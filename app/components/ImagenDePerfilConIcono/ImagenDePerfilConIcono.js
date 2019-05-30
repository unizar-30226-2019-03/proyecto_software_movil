/**
 * @fileoverview Imagen de perfil con icono de cámara de fotos
 */
import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text
} from "react-native";

import RippleTouchable from "../../components/RippleTouchable";

import { Icon, Image } from "react-native-elements";

import styles from "./styles";

/**
 * @module ImagenDePerfilConIcono
 * @param {Object} props props para renderizar el componente
 *    props.source URL de la imagen
 *    props.style Estilo de la imagen
 *    props.onPressIcono callback a ejecutar al pulsar en el icono
 *
 */
const ImagenDePerfilConIcono = props => {
  return (
    <View>
      <Image source={{ uri: props.source }} style={props.style} />
      {props.cambiarSi == 0 ? (
        <View style={styles.viewIcon}>
          <RippleTouchable
            style={styles.touchable}
            onPress={props.onPressIcono}
            round={true}
          >
            <Icon type="font-awesome" name="camera" color="white" />
          </RippleTouchable>
        </View>
      ) : null}
    </View>
  );
};

export default ImagenDePerfilConIcono;
