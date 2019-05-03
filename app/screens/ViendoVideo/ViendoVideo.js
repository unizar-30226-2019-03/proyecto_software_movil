import React from "react";
import { Text, View, Animated, TouchableOpacity } from "react-native";

import styles from "./styles";
import VideoConSinFlechaAtras from "../../components/VideoConSinFlechaAtras";
import CuadroValorar from "../../components/CuadroValorar";
import { ScrollView } from "react-native-gesture-handler";
import { SearchBar } from "react-native-elements";
import Descripcion from "../../components/Descripcion";
import IconoAsignaturaUniversidad from "../../components/IconoAsignaturaUniversidad";
export default class ViendoVideo extends React.Component {
  constructor() {
    super();
    this.state = {
      seguida: false,
      texto: "Seguir asignatura"
    };
  }
  cambiarSeguir() {
    if (this.state.seguida == true) {
      this.setState({ seguida: false, texto: "Seguir asignatura" });
    } else {
      this.setState({ seguida: true, texto: "Dejar de seguir" });
    }
  }
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
        <ScrollView>
          <CuadroValorar navigation={this.props.navigation} />
          <View style={styles.dejarDeSeguir}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Asignatura", {
                  title: "UPM - Proyecto software"
                })
              }
              activeOpacity={1}
              style={styles.asignaturaContainer}
            >
              <IconoAsignaturaUniversidad
                style={{ alignSelf: "flex-start" }}
                navigation={this.props.navigation}
                name="Proyecto Software"
                image={require("../../../test/imagenes/perfil_uni.jpg")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.cambiarSeguir()}>
              <View
                style={[
                  this.state.seguida == true
                    ? styles.botonDejarSeguir
                    : styles.botonSeguir
                ]}
              >
                <Text
                  style={[
                    this.state.seguida == true
                      ? styles.textoDejarSeguir
                      : styles.textoSeguir
                  ]}
                >
                  {this.state.texto}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Descripcion navigation={this.props.navigation} />
          <View style={{ borderWidth: 1 }}>
            <Text>Prueba</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
