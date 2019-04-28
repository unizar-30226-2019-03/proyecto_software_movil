import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Input } from "react-native-elements";
import { ImagePicker } from "expo";

import styles from "./styles";
import ImagenDePerfilConIcono from "../../components/ImagenDePerfilConIcono";

export default class VerPerfil extends React.Component {
  state = {
    perfilPropioSi: this.props.navigation.getParam("perfilPropioSi"),
    nombre: "Turismundo",
    apellidos: "Scott Williams",
    descripcion:
      "Profe tajo guay co\nen plan asi pim pam explicando sistemas empotrados\n\ny otras cosas youknow\njugador profesionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaal de cricket",
    imagen:
      "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
  };

  getPerfil = () => {
    // IMPLEMENTACIÓN API COMPROBAR SI ERES TÚ O ES PERFIL AJENO: this.setState(perfilPropioSi: ...)
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: "Images",
      aspect: [4, 4]
    });

    if (!result.cancelled) {
      this.setState({ imagen: result.uri });
    }
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title")
  });

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.viewProfPic}>
          <ImagenDePerfilConIcono
            source={this.state.imagen}
            style={styles.profPic}
            cambiarSi={!this.state.perfilPropioSi}
            onPressIcono={this.pickImage}
          />
        </View>

        {this.state.perfilPropioSi ? (
          <View>
            <TouchableOpacity
              style={styles.viewNombre}
              onPress={() =>
                this.props.navigation.navigate("ModificarCampo", {
                  title: "Escribe tu nombre", modificando: "nombre", texto: this.state.nombre, 
                })
              }
            >
              <Input
                label="Nombre"
                defaultValue={this.state.nombre}
                leftIcon={{
                  type: "font-awesome",
                  name: "id-card",
                  color: "dodgerblue"
                }}
                rightIcon={{
                  type: "font-awesome",
                  name: "edit",
                  color: "grey"
                }}
                leftIconContainerStyle={styles.leftIconName}
                rightIconContainerStyle={styles.rightIcon}
                editable={false}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.viewNombre}
              onPress={() =>
                this.props.navigation.navigate("ModificarCampo", {
                  title: "Escribe tus apellidos", modificando: "apellidos", texto: this.state.apellidos, 
                })
              }
            >
              <Input
                label="Apellidos"
                defaultValue={this.state.apellidos}
                leftIcon={{
                  type: "font-awesome",
                  name: "id-card",
                  color: "dodgerblue"
                }}
                rightIcon={{
                  type: "font-awesome",
                  name: "edit",
                  color: "grey"
                }}
                leftIconContainerStyle={styles.leftIconName}
                rightIconContainerStyle={styles.rightIcon}
                editable={false}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.viewDescripcion}
              onPress={() =>
                this.props.navigation.navigate("ModificarCampo", {
                  title: "Escribe tu descripción", modificando: "descripcion", texto: this.state.descripcion, 
                })
              }
            >
              <Input
                label="Descripción"
                defaultValue={this.state.descripcion}
                leftIcon={{
                  type: "font-awesome",
                  name: "info",
                  color: "dodgerblue"
                }}
                rightIcon={{
                  type: "font-awesome",
                  name: "edit",
                  color: "grey"
                }}
                leftIconContainerStyle={styles.leftIconDescr}
                rightIconContainerStyle={styles.rightIcon}
                editable={false}
                multiline={true}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View
              style={styles.viewNombre}
            >
              <Input
                label="Nombre"
                defaultValue={this.state.nombre}
                leftIcon={{
                  type: "font-awesome",
                  name: "id-card",
                  color: "dodgerblue"
                }}
                leftIconContainerStyle={styles.leftIconName}
                editable={false}
              />
            </View>

            <View
              style={styles.viewNombre}
            >
              <Input
                label="Apellidos"
                defaultValue={this.state.apellidos}
                leftIcon={{
                  type: "font-awesome",
                  name: "id-card",
                  color: "dodgerblue"
                }}
                leftIconContainerStyle={styles.leftIconName}
                editable={false}
              />
            </View>

            <View
              style={styles.viewDescripcion}
            >
              <Input
                label="Descripción"
                defaultValue={this.state.descripcion}
                leftIcon={{
                  type: "font-awesome",
                  name: "info",
                  color: "dodgerblue"
                }}
                leftIconContainerStyle={styles.leftIconDescr}
                editable={false}
                multiline={true}
              />
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}
