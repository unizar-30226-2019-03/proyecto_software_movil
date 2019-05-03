import React from "react";
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  Alert,
  ListView,
  KeyboardAvoidingView,
  TextInput
} from "react-native";

import styles from "./styles";
import VideoConSinFlechaAtras from "../../components/VideoConSinFlechaAtras";
import CuadroValorar from "../../components/CuadroValorar";
import { ScrollView } from "react-native-gesture-handler";
import { SearchBar } from "react-native-elements";
import Descripcion from "../../components/Descripcion";
import IconoAsignaturaUniversidad from "../../components/IconoAsignaturaUniversidad";
import Comentario from "../../components/Comentario";
import { headerHeight } from "../../constants";

export default class ViendoVideo extends React.Component {
  constructor() {
    super();
    var comentarios = [
      {
        nombreUsuario: "JasenAsen",
        tiempo: 1,
        cuerpoComentario: "Saludos"
      },
      {
        nombreUsuario: "Dobby",
        tiempo: 3,
        cuerpoComentario: "Salutres"
      },
      {
        nombreUsuario: "Martititi",
        tiempo: 5,
        cuerpoComentario: "Salucuatro"
      },
      {
        nombreUsuario: "Lorien",
        tiempo: 5,
        cuerpoComentario: "Salucinco"
      },
      {
        nombreUsuario: "Aisac",
        tiempo: 7,
        cuerpoComentario: "Saluseis"
      },
      {
        nombreUsuario: "Reichel",
        tiempo: 8,
        cuerpoComentario: "Salusiete"
      },
      {
        nombreUsuario: "Paula",
        tiempo: 10,
        cuerpoComentario: "Saluocho"
      },
      {
        nombreUsuario: "Rubén",
        tiempo: 11,
        cuerpoComentario: "Salunueve"
      },
      {
        nombreUsuario: "José",
        tiempo: 14,
        cuerpoComentario: "Saludiez"
      },
      {
        nombreUsuario: "CabezaHuevo",
        tiempo: 16,
        cuerpoComentario: "He de comunicaros a todos que estais suspendidos"
      }
    ];
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    var vacio = [];
    this.state = {
      comentarios: comentarios,
      comentariosMostrar: vacio,
      seguida: false,
      texto: "Seguir asignatura",
      segundo: 0,
      dataSource: ds,
      largo: false,
      ultimoAñadido: -1,
      text: ""
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.pasaSegundo(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  cambiarSeguir() {
    if (this.state.seguida == true) {
      this.setState({
        seguida: false,
        texto: "Seguir asignatura"
      });
    } else {
      this.setState({
        seguida: true,
        texto: "Dejar de seguir"
      });
    }
  }
  pasaSegundo() {
    this.setState({
      largo: Math.floor(this.VideoFlechaRef.devuelveDuracion() / 3600) > 0
    });
    var nuevo = this.VideoFlechaRef.devuelveEstado();
    nuevo = Math.floor(nuevo / 1000 + 0.5);
    this.setState({ segundo: nuevo });
    var añadir = this.state.comentariosMostrar;
    var i = this.state.ultimoAñadido + 1;

    if (i < this.state.comentarios.length) {
      while (
        i < this.state.comentarios.length &&
        this.state.comentarios[i].tiempo <= nuevo
      ) {
        añadir = [...añadir, this.state.comentarios[i]];

        i = i + 1;
      }
    }

    var ds = this.state.dataSource;
    this.setState({
      comentariosMostrar: añadir,
      ultimoAñadido: i - 1,
      dataSource: ds.cloneWithRows(añadir)
    });
  }
  boton = () => {
    if (this.state.text.length > 0) {
      return (
        <Text style={styles.enviar} onPress={() => this.comentar()}>
          Comentar
        </Text>
      );
    }
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
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={headerHeight}
      >
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
        <ScrollView
          ref={ref => {
            this.ListView_Ref = ref;
          }}
        >
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
                style={{
                  alignSelf: "flex-start"
                }}
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

          <ListView
            onContentSizeChange={() =>
              this.ListView_Ref.scrollToEnd({ animated: true })
            }
            dataSource={this.state.dataSource}
            renderRow={rowData => (
              <Comentario
                nombreUsuario={rowData.nombreUsuario}
                cuerpoComentario={rowData.cuerpoComentario}
                tiempo={rowData.tiempo}
                largo={this.state.largo}
              />
            )}
          />
        </ScrollView>
        <TextInput
          placeholder="Escribe un mensaje"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          multiline={true}
          style={[styles.textInput, { maxHeight: 80 }]}
        />
        {this.boton()}
      </KeyboardAvoidingView>
    );
  }
}
