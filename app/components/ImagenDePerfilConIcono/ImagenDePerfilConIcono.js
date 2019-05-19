import React from "react";
import { View, TouchableOpacity, TouchableNativeFeedback, Text } from "react-native";

import RippleTouchable from "../../components/RippleTouchable";

import { Icon, Image } from "react-native-elements";

import styles from "./styles";

/*
 * PROPS:
 *
 */
const ImagenDePerfilConIcono = props => {
  return (
    <View>
      <Image source={{ uri: props.source }} style={props.style} />
      {props.cambiarSi == 0 ? (
        <View style={styles.viewIcon}>
          <RippleTouchable style={styles.touchable} onPress={props.onPressIcono} round={true}>
            <Icon type="font-awesome" name="camera" color="white" />
          </RippleTouchable>
        </View>
      ) : null}
    </View>
  );
};

export default ImagenDePerfilConIcono;
