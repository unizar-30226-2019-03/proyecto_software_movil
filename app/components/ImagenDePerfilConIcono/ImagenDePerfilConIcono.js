import React from "react";
import { View, TouchableOpacity } from "react-native";

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
        <TouchableOpacity
          style={styles.viewIcon}
          onPress={props.onPressIcono}
          activeOpacity={0.75}
        >
          <Icon
            type="font-awesome"
            name="camera"
            color="white"
            iconStyle={styles.changeIcon}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ImagenDePerfilConIcono;