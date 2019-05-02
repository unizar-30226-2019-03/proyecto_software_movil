import React from "react";

import { View, ActivityIndicator, Alert } from "react-native";

import { Input, Button } from "react-native-elements";

import { ImagePicker } from "expo";

import { Azul } from "../../constants";

import styles from "./styles";

import InputFixer from "../../components/InputFixer";
import ImagenDePerfilConIcono from "../../components/ImagenDePerfilConIcono";

export default class VerPerfil extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title")
  });

  state = {
    nombre: "Turismundo",
    apellidos: "Scott Williams",
    descripcion:
      "Profe tajo guay co\nen plan asi pim pam explicando sistemas empotrados\n\ny otras cosas youknow\njugador profesionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaal de cricket",
    imagen:
      "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    loading: true
  };

  perfilPropioSi = this.props.navigation.getParam("perfilPropioSi");

  componentWillMount = () => {
    // api get datos
    if (this.perfilPropioSi) {
      this.oldNombre = this.state.nombre;
      this.oldApellidos = this.state.apellidos;
      this.oldDescripcion = this.state.descripcion;
      this.oldImagen = this.state.imagen;
    }
    this.setState({ loading: false });
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

  cancelar = () => {
    this.setState({ 
      nombre: this.oldNombre,
      apellidos: this.oldApellidos,
      descripcion: this.oldDescripcion,
      imagen: this.oldImagen
    })

  }

  actualizar = () => {
    // api
    this.props.navigation.goBack()
  }

  render() {
    let rightIcon = this.perfilPropioSi
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
                cambiarSi={!this.perfilPropioSi}
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
                onChangeText={text =>
                  this.setState({ nombre: text })
                }
                onFocus={() => this.InputFixer.onFocus()}
                rightIcon={rightIcon}
                leftIconContainerStyle={styles.leftIconName}
                rightIconContainerStyle={styles.rightIcon}
                editable={this.perfilPropioSi}
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
                onChangeText={text =>
                  this.setState({ apellidos: text })
                }
                onFocus={() => this.InputFixer.onFocus()}
                rightIcon={rightIcon}
                leftIconContainerStyle={styles.leftIconName}
                rightIconContainerStyle={styles.rightIcon}
                editable={this.perfilPropioSi}
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
                editable={this.perfilPropioSi}
                multiline={true}
              />
            </View>
            {this.perfilPropioSi ? (
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
