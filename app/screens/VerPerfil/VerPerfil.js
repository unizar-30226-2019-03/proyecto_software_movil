import React from "react";

import { View, ActivityIndicator, Alert } from "react-native";

import { Input, Button } from "react-native-elements";

import { ImagePicker } from "expo";

import { Azul } from "../../constants";

import { UserApi, ApiClient } from "swagger_unicast";

import styles from "./styles";

import InputFixer from "../../components/InputFixer";
import ImagenDePerfilConIcono from "../../components/ImagenDePerfilConIcono";
import HaOcurridoUnError from "../../components/HaOcurridoUnError";
import LoadingModal from "../../components/LoadingModal";

import { getUserId, getUserToken } from "../../config/Auth";

export default class VerPerfil extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title:
      navigation.getParam("userId") == getUserId()
        ? "Mi perfil"
        : "Perfil de " + navigation.getParam("name")
  });

  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      apellidos: "",
      descripcion: "",
      imagen: "",
      loading: true,
      actualizandoDatos: false
    };

    let defaultClient = ApiClient.instance;
    let bearerAuth = defaultClient.authentications["bearerAuth"];
    bearerAuth.accessToken = getUserToken();

    this.apiInstance = new UserApi();

    this.userId = this.props.navigation.getParam("userId");
    this.isPerfilPropio = this.userId == getUserId();

    this.getData();
  }

  getData = () => {
    let id = this.userId;
    let opts = {
      cacheControl: "no-cache, no-store, must-revalidate",
      pragma: "no-cache",
      expires: 0
    };
    this.apiInstance.getUser(id, opts, (error, data, response) => {
      if (error) {
        HaOcurridoUnError(this.getData);
      } else {
        this.setState({
          imagen: data.photo,
          nombre: data.name,
          descripcion: data.description,
          apellidos: data.surnames,
          loading: false
        });
        if (this.isPerfilPropio) {
          this.oldNombre = this.state.nombre;
          this.oldApellidos = this.state.apellidos;
          this.oldDescripcion = this.state.descripcion;
          this.oldImagen = this.state.imagen;
        }
      }
    });
  };

  pickImage = async () => {
    if (!this.state.actualizandoDatos) {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: "Images",
        aspect: [4, 4]
      });

      if (!result.cancelled) {
        this.setState({ imagen: result.uri });
      }
    }
  };

  cancelar = () => {
    if (!this.state.actualizandoDatos) {
      this.setState({
        nombre: this.oldNombre,
        apellidos: this.oldApellidos,
        descripcion: this.oldDescripcion,
        imagen: this.oldImagen
      });
    }
  };

  actualizar = () => {
    if (!this.state.actualizandoDatos) {
      this.setState({
        actualizandoDatos: true
      });

      let opts = {
        description: this.state.descripcion,
        photo: {
          uri: this.state.imagen,
          name: this.state.imagen.substring(
            this.state.imagen.lastIndexOf("/") + 1,
            this.state.imagen.length
          ),
          type: "imagen/png"
        },
        name: this.state.nombre,
        surnames: this.state.apellidos
      };
      this.apiInstance.updateUser(opts, (error, data, response) => {
        if (error) {
          Alert.alert(
            "Error!",
            "Error al intentar actualizar tu información, vuelve a intentarlo",
            [{ text: "Vale" }],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            "Bien!",
            "Tu información ha sido actualizada con éxito",
            [{ text: "Vale" }],
            { cancelable: false }
          );
        }
        this.setState({
          actualizandoDatos: false
        });
      });
    }
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
        <LoadingModal visible={this.state.actualizandoDatos} />
      </View>
    );
  }
}
