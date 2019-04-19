import React from "react";
import { View, TouchableOpacity } from "react-native";

import { Icon } from "react-native-elements";

import styles from "./styles";

import { Video } from "expo";
import VideoPlayer from "expo-video-player";
/*
 * PROPS:
 * source={uri} uri del video
 * thumbnail={uri} uri de la thumbnail
 * autoplay={true / false}
 * style={styles.____}
 * flechaSi={true / false} si el video tiene flecha para volver atrás o no
 * goBackDestination="destino" destino de navigation, en caso de que flechaSi == {true}
 */
const VideoConSinFlechaAtras = props => {
  return (
    <View>
      <VideoPlayer
        videoProps={{
          source: { uri: props.source },
          posterSource: { uri: props.thumbnail },
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          shouldPlay: props.autoplay,
          volume: 0.75,
          style: props.style,
        }}
        showControlsOnLoad={true}
        sliderColor="#009485"
      />
      {props.flechaSi ? (
        <TouchableOpacity
          onPress={() => props.navigation.navigate(props.goBackDestination)}
          style={styles.zonaFlechaAtras}>
          <Icon
            type="octicon"
            size={35}
            name="chevron-left"
            color="lightgrey"
            iconStyle={styles.flechaAtras}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default VideoConSinFlechaAtras;
