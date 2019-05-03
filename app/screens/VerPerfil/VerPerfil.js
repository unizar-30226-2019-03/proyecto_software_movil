import React from "react";

import { View, ActivityIndicator, Alert } from "react-native";

import { Input, Button } from "react-native-elements";

import { ImagePicker } from "expo";

import { Azul } from "../../constants";

import { UserApi, ApiClient } from "swagger_unicast";

import styles from "./styles";

import InputFixer from "../../components/InputFixer";
import ImagenDePerfilConIcono from "../../components/ImagenDePerfilConIcono";

import { getUserId, getUserToken } from "../../config/Auth";

export default class VerPerfil extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("userId") == getUserId() ? "Mi perfil" : "Perfil de " + navigation.getParam("name")
  });

  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      apellidos: "",
      descripcion: "",
      imagen: "",
      loading: true
    };

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications['bearerAuth'];
    bearerAuth.accessToken = getUserToken()

    this.apiInstance = new UserApi();

    this.userId = this.props.navigation.getParam("userId");
    this.isPerfilPropio = this.userId == getUserId();

    // let id = this.userId;
    // this.apiInstance.getUser(id, (error, data, response) => {
    //   if (!error) {
    //     console.log('API called successfully.');
    //     console.log(data)
    //   }
    // });
    
    this.state.nombre = "Turismundo"
    this.state.apellidos = "Scott Williams"
    this.state.descripcion = "Profe tajo guay co\nen plan asi pim pam explicando sistemas empotrados\n\ny otras cosas youknow\njugador profesionaaaaa"
    this.state.imagen = "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"

    if (this.isPerfilPropio) {
      this.oldNombre = this.state.nombre;
      this.oldApellidos = this.state.apellidos;
      this.oldDescripcion = this.state.descripcion;
      this.oldImagen = this.state.imagen;
    }

    this.state.loading = false;
  }

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

  cancelar = () => {
    this.setState({
      nombre: this.oldNombre,
      apellidos: this.oldApellidos,
      descripcion: this.oldDescripcion,
      imagen: this.oldImagen
    });
  };

  actualizar = () => {
    // api
    this.props.navigation.goBack();
  };

  render() {
    let rightIcon = this.isPerfilPropio
      ? { type: "font-awesome", name: "edit", color: "grey" }
      : {};
    return (
      <View
        style={[
          styles.container,
          { justifyContent: this.state.loading ? "center" : "flex-start" }
        ]}
      >
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <InputFixer
            navigation={this.props.navigation}
            ref={InputFixer => (this.InputFixer = InputFixer)}
          >
            <View style={styles.viewProfPic}>
              <ImagenDePerfilConIcono
                source={this.state.imagen}
                style={styles.profPic}
                cambiarSi={!this.isPerfilPropio}
                onPressIcono={this.pickImage}
              />
            </View>

            <View style={styles.viewNombre}>
              <Input
                label="Nombre"
                value={this.state.nombre}
                leftIcon={{
                  type: "font-awesome",
                  name: "id-card",
                  color: Azul
                }}
                onChangeText={text => this.setState({ nombre: text })}
                onFocus={() => this.InputFixer.onFocus()}
                rightIcon={rightIcon}
                leftIconContainerStyle={styles.leftIconName}
                rightIconContainerStyle={styles.rightIcon}
                editable={this.isPerfilPropio}
              />
            </View>

            <View style={styles.viewNombre}>
              <Input
                label="Apellidos"
                defaultValue={this.state.apellidos}
                leftIcon={{
                  type: "font-awesome",
                  name: "id-card",
                  color: Azul
                }}
                onChangeText={text => this.setState({ apellidos: text })}
                onFocus={() => this.InputFixer.onFocus()}
                rightIcon={rightIcon}
                leftIconContainerStyle={styles.leftIconName}
                rightIconContainerStyle={styles.rightIcon}
                editable={this.isPerfilPropio}
              />
            </View>

            <View style={styles.viewDescripcion}>
              <Input
                label="Descripción"
                defaultValue={this.state.descripcion}
                leftIcon={{
                  type: "font-awesome",
                  name: "info",
                  color: Azul
                }}
                onFocus={() => this.InputFixer.onFocus()}
                onChangeText={text =>
                  this.setState({ descripcion: text }) ||
                  this.InputFixer.onFocus()
                }
                rightIcon={rightIcon}
                leftIconContainerStyle={styles.leftIconDescr}
                rightIconContainerStyle={styles.rightIcon}
                editable={this.isPerfilPropio}
                multiline={true}
              />
            </View>
            {this.isPerfilPropio ? (
              <View style={styles.cancelarYActualizarView}>
                <Button
                  title={"CANCELAR"}
                  onPress={() => this.cancelar()}
                  containerStyle={styles.botonCancelar}
                  titleStyle={styles.botonFont}
                  buttonStyle={styles.buttonColor}
                />
                <Button
                  title={"ACTUALIZAR"}
                  onPress={() => this.actualizar()}
                  containerStyle={styles.botonActualizar}
                  titleStyle={styles.botonFont}
                  buttonStyle={styles.buttonColor}
                  buttonStyle={styles.buttonColor}
                />
              </View>
            ) : null}
          </InputFixer>
        )}
      </View>
    );
  }
}
