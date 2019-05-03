import React from "react";
import { Text, View, Animated, TouchableOpacity, Alert } from "react-native";

import styles from "./styles";
import VideoConSinFlechaAtras from "../../components/VideoConSinFlechaAtras";
import CuadroValorar from "../../components/CuadroValorar";
import { ScrollView } from "react-native-gesture-handler";
import { SearchBar } from "react-native-elements";
import Descripcion from "../../components/Descripcion";
import IconoAsignaturaUniversidad from "../../components/IconoAsignaturaUniversidad";
import Comentario from "../../components/Comentario";

export default class ViendoVideo extends React.Component {
  constructor() {
    super();
    this.state = {
      seguida: false,
      texto: "Seguir asignatura",
      segundo: 0
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => this.pasaSegundo(), 1000);
  }
  cambiarSeguir() {
    if (this.state.seguida == true) {
      this.setState({ seguida: false, texto: "Seguir asignatura" });
    } else {
      this.setState({ seguida: true, texto: "Dejar de seguir" });
    }
  }
  pasaSegundo() {
    //var posicion = estado["positionMillis"];
    // Alert.alert(JSON.stringify(estado));
    var nuevo = this.VideoFlechaRef.devuelveEstado();
    this.setState({ segundo: nuevo });
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
            flechaSi={true}
            goBackDestination={""}
            navigation={this.props.navigation}
            source={
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            }
            thumbnail={
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            }
            autoplay={true}
            ref={ref => {
              this.VideoFlechaRef = ref;
            }}
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
          <Text style={{ fontSize: 30 }}>{this.state.segundo}</Text>
          <View style={{ borderWidth: 1 }}>
            <Comentario
              nombreUsuario="JasenAsen"
              cuerpoComentario="Saludos"
              tiempo={15}
              largo={false}
            />
            <Comentario
              nombreUsuario="David el sabueso"
              cuerpoComentario="Salutres"
              tiempo={16}
              largo={false}
            />
            <Comentario
              nombreUsuario="Martititititi"
              cuerpoComentario="Salucuatros"
              tiempo={17}
              largo={false}
            />
            <Comentario
              nombreUsuario="Unai Anorrategui"
              cuerpoComentario="Para cuatros los que vais a sacar todos, estais supensos"
              tiempo={69}
              largo={false}
            />
            <Comentario
              nombreUsuario="Javier Resano"
              cuerpoComentario="Como coordinador de la asignatura respeto la opinión de Unai"
              tiempo={3600}
              largo={false}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
