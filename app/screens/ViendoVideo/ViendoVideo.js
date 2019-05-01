import React from "react";
import { Text, View, Animated, Button } from "react-native";

import styles from "./styles";
import VideoConSinFlechaAtras from "../../components/VideoConSinFlechaAtras";
import CuadroValorar from "../../components/CuadroValorar";
import { ScrollView } from "react-native-gesture-handler";
export default class ViendoVideo extends React.Component {
  constructor() {
    super();
    this.state = {
      descripcion: true
    };
  }

  _animatedHeight = new Animated.Value(0);

  mostrarDescripcion = () => {
    Animated.timing(this._animatedHeight, { toValue: 80 }).start();
  };
  render() {
    return (
      /*
      
        <Text>TODO VIENDO VIDEO</Text>
        <Button
          title="ATRAS"
          onPress={() => {
            this.props.navigation.goBack(null);
          }}
        />
        <Button
          onPress={() =>
            this.props.navigation.navigate("Asignatura", {
              title: "Una asignatura"
            })
          }
          title="IR ASIGNATURA"
        /> */
      //QUITO TODO LO ANTERIOR?????????
      <View style={styles.container}>
        <View style={styles.videoContainer}>
          <VideoConSinFlechaAtras
            flechaSi={false}
            navigation={this.props.navigation}
            source={
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            }
            thumbnail={
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            }
            autoplay={true}
          />
        </View>
        <CuadroValorar />
      </View>
    );
  }
}
