import React from "react";
import { Text, Image, View, ScrollView, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";

import { createAppContainer, createStackNavigator } from "react-navigation";
import FullScreenThumbnail from "../../../components/FullScreenThumbnail";
import styles from "./styles";

export default class Asignatura extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title")
  });

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.viewSeguirAsignatura}>
            <Button
              buttonStyle={styles.buttonSeguirAsignatura}
              title="Seguir asignatura"
            />
          </View>

          <View style={styles.viewTextProfes}>
            <Text style={styles.textProfesores}>Profesores</Text>
          </View>

          <View style={styles.userView}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  title: "Juancho Provisional"
                })
              }
            >
              <View style={styles.iconAndNameView}>
                <Image
                  source={require("./../../../../test/imagenes/perfil.jpg")}
                  style={styles.userIcon}
                  margin={20}
                />
                <Text style={styles.userName}>Pedro E.</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  title: "Juancho Provisional"
                })
              }
            >
              <View style={styles.iconAndNameView}>
                <Image
                  source={require("./../../../../test/imagenes/perfil.jpg")}
                  style={styles.userIcon}
                  margin={20}
                />
                <Text style={styles.userName}>Recesvinto W.</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  title: "Juancho Provisional"
                })
              }
            >
              <View style={styles.iconAndNameView}>
                <Image
                  source={require("./../../../../test/imagenes/perfil.jpg")}
                  style={styles.userIcon}
                  margin={20}
                />
                <Text style={styles.userName}>Almudena S.</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  title: "Juancho Provisional"
                })
              }
            >
              <View style={styles.iconAndNameView}>
                <Image
                  source={require("./../../../../test/imagenes/perfil.jpg")}
                  style={styles.userIcon}
                  margin={20}
                />
                <Text style={styles.userName}>Juan P.</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  title: "Juancho Provisional"
                })
              }
            >
              <View style={styles.iconAndNameView}>
                <Image
                  source={require("./../../../../test/imagenes/perfil.jpg")}
                  style={styles.userIcon}
                  margin={20}
                />
                <Text style={styles.userName}>Turismundo R.</Text>
              </View>
            </TouchableOpacity>
          </View>

          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("./../../../../test/imagenes/imagen.jpg")}
            likes="70%"
            duracion="1:10"
            title="Nombre bastante largo para ser un nombre de un video de prueba"
            info="Hece 3 meses"
            asignaturaIcon={require("./../../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("./../../../../test/imagenes/imagen.jpg")}
            likes="10%"
            duracion="1:10:60"
            title="Nombre corto"
            info="Hece 1 día"
            asignaturaIcon={require("./../../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("./../../../../test/imagenes/imagen.jpg")}
            likes="70%"
            duracion="0:50"
            title="Nombre largooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"
            info="Hece 3 años"
            asignaturaIcon={require("./../../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("./../../../../test/imagenes/imagen.jpg")}
            likes="55%"
            duracion="5:10:60"
            title="Nombre normal"
            info="Hece 2 horas"
            asignaturaIcon={require("./../../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("./../../../../test/imagenes/imagen.jpg")}
            likes="55%"
            duracion="5:10:60"
            title="Nombre normal"
            info="Hece 2 horas"
            asignaturaIcon={require("./../../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("./../../../../test/imagenes/imagen.jpg")}
            likes="55%"
            duracion="5:10:60"
            title="Nombre normal"
            info="Hece 2 horas"
            asignaturaIcon={require("./../../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("./../../../../test/imagenes/imagen.jpg")}
            likes="55%"
            duracion="5:10:60"
            title="Nombre normal"
            info="Hece 2 horas"
            asignaturaIcon={require("./../../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("./../../../../test/imagenes/imagen.jpg")}
            likes="55%"
            duracion="5:10:60"
            title="Nombre normal"
            info="Hece 2 horas"
            asignaturaIcon={require("./../../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("./../../../../test/imagenes/imagen.jpg")}
            likes="55%"
            duracion="5:10:60"
            title="Nombre normal"
            info="Hece 2 horas"
            asignaturaIcon={require("./../../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("./../../../../test/imagenes/imagen.jpg")}
            likes="55%"
            duracion="5:10:60"
            title="Nombre normal"
            info="Hece 2 horas"
            asignaturaIcon={require("./../../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("./../../../../test/imagenes/imagen.jpg")}
            likes="55%"
            duracion="5:10:60"
            title="Nombre normal"
            info="Hece 2 horas"
            asignaturaIcon={require("./../../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
          <FullScreenThumbnail
            navigation={this.props.navigation}
            image={require("./../../../../test/imagenes/imagen.jpg")}
            likes="55%"
            duracion="5:10:60"
            title="Nombre normal"
            info="Hece 2 horas"
            asignaturaIcon={require("./../../../../test/imagenes/perfil_uni.jpg")}
            asignaturaName="Multiprocesadores"
          />
        </ScrollView>
      </View>
    );
  }
}
