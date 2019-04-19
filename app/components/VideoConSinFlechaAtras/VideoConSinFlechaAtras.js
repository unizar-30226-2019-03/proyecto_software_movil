import React from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity
} from "react-native";

import { Icon } from "react-native-elements";

import styles from "./styles";

import Video from "react-native-video";

// Guía completa de props: https://github.com/abbasfreestyle/react-native-af-video-player

const VideoConSinFlechaAtras = props => {
  return (
    <View>
      <Video
        url={props.url}
        autoPlay={props.autoPlay}
        title={props.title}
        placeholder={props.placeholder} //IMAGEN PLACEHOLDER MIENTRAS CARGA
        logo={props.logo} //LOGO PARA LA ESQUINA SUPERIOR IZQUIERDA
        style={props.style}
        rotateToFullScreen={true}
        volume={props.volume}
        onMorePress={props.onMorePress} //CALLBACK PARA UN BOTÓN DE LA ESQUINA SUP. DERECHA
        onFullScreen={props.onFullScreen} //CALLBACK CUANDO SE CAMBIA FULLSCREEN<->NORMAL
        scrollBounce={props.scrollBounce} //BOUNCE AL HACER SCROLL
        onLoad={props.onLoad} //CALLBACK CUANDO EL VÍDEO HA CARGADO
        onEnd={props.onEnd} //CALLBACK CUANDO EL VÍDEO HA LLEGADO AL FINAL
      />
      <View
        style={[
          {
            opacity: props.flechaSiNo == 1 ? 100 : 0
          }
        ]}
      >
        <Icon style={styles.iconoFlechaAtras} type="entypo" name="left-open" />
      </View>
    </View>
  );
};

export default VideoConSinFlechaAtras;
