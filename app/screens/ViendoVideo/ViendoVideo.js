import React from "react";
import { Text, View, Button } from "react-native";

import styles from "./styles";
import VideoConSinFlechaAtras from "../../components/VideoConSinFlechaAtras";
import CuadroValorar from "../../components/CuadroValorar";
export default class ViendoVideo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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
        />
        <View style={styles.videoContainer} />
        <CuadroValorar />
      </View>
    );
  }
}
