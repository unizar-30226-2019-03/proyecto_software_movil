/**
 * @fileoverview Pantalla de registro
 * @requires swagger_unicast:UniversityApi
 * @requires swagger_unicast:DegreeApi
 * @requires swagger_unicast:UserApi
 * @requires ../../../components/RippleTouchable:RippleTouchable
 * @requires ../../../components/InputFixer:InputFixer
 * @requires ../../../components/HaOcurridoUnError:HaOcurridoUnError
 * @requires ../../../components/LoadingFooter:LoadingFooter
 * @requires ../../../components/LoadingModal:LoadingModal
 */
import React from "react";

import {
  View,
  Text,
  Animated,
  Picker,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from "react-native";

import { Input, Image, Button, Overlay } from "react-native-elements";

import { ImagePicker } from "expo";

import { UniversityApi, DegreeApi, UserApi } from "swagger_unicast";

import RippleTouchable from "../../../components/RippleTouchable";

import InputFixer from "../../../components/InputFixer";

import HaOcurridoUnError from "../../../components/HaOcurridoUnError";
import LoadingFooter from "../../../components/LoadingFooter";
import LoadingModal from "../../../components/LoadingModal";

import styles from "./styles";

const imageErrText = "Falta una\nimagen de perfil";
/**
 * Pantalla de registro
 * @module SignUp
 */
export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openUniModal: false,
      openDegModal: false,
      onUniEndReachedManaged: false,
      onDegEndReachedManaged: false,
      uniData: [],
      degData: [],
      loadingUni: true,
      loadingDeg: true,
      fetchingNewUniData: false,
      fetchingNewDegData: false,

      username: "",
      email: "",
      password: "",
      passwordCheck: "",
      image: "uri_nula",
      name: "",
      surname: "",
      universityName: "Seleccione una...",
      universityId: undefined,
      degreeName: "Seleccione uno...",
      degreeId: undefined,
      description: "",
      passwordsMatch: true,
      usernameLengthErr: false,
      emailErr: false,
      passwordLengthErr: false,
      imageErr: false,
      universityErr: false,
      degreeErr: false,
      nameLengthErr: false,
      surnameLengthErr: false,
      descriptionLengthErr: false,
      registering: false
    };

    this.universityApiInstance = new UniversityApi();
    this.degreeApiInstance = new DegreeApi();

    this.uniOffset = 0;
    this.degOffset = 0;
    this.totalUniPages = undefined;
    this.totalDegPages = undefined;
  }

  componentDidMount = () => {
    this.getUniData();
    this.getDegData();
  };
  /**
   * Obtiene todas las universidades del sistema
   */
  getUniData = () => {
    if (
      (this.totalUniPages == undefined ||
        this.uniOffset < this.totalUniPages) &&
      !this.state.onUniEndReachedManaged
    ) {
      let opts = {
        page: this.uniOffset
      };
      this.universityApiInstance.getUniversities(
        opts,
        (error, data, response) => {
          if (error) {
            HaOcurridoUnError(null);
          } else {
            this.uniOffset = this.uniOffset + 1;
            this.totalUniPages = data.page.totalPages;
            this.setState({
              uniData: [...this.state.uniData, ...data._embedded.universities],
              loadingUni: false,
              fetchingNewUniData: false,
              onUniEndReachedManaged: false
            });
          }
        }
      );
    } else {
      this.setState({ loadingUni: false, fetchingNewUniData: false });
    }
  };
  /**
   * Obtiene las carreras almacenadas en el sistema
   */
  getDegData = () => {
    if (
      (this.totalDegPages == undefined ||
        this.degOffset < this.totalDegPages) &&
      !this.state.onDegEndReachedManaged
    ) {
      let opts = {
        page: this.degOffset
      };
      this.degreeApiInstance.getDegrees(opts, (error, data, response) => {
        if (error) {
          HaOcurridoUnError(null);
        } else {
          this.degOffset = this.degOffset + 1;
          this.totalDegPages = data.page.totalPages;
          this.setState({
            degData: [...this.state.degData, ...data._embedded.degrees],
            loadingDeg: false,
            fetchingNewDegData: false,
            onDegEndReachedManaged: false
          });
        }
      });
    } else {
      this.setState({ loadingDeg: false, fetchingNewDegData: false });
    }
  };
  /**
   * callback llamado al llegar al final de la lista de carreras o universidades
   * llama a la función getData indicada
   * @param {String} universitiesOrDegrees si == "uni" trata de obtener mas universidades, sino carreras
   */
  onEndReached = universitiesOrDegrees => {
    if (universitiesOrDegrees == "uni") {
      this.setState({ fetchingNewUniData: true, onUniEndReachedManaged: true });
      this.getUniData();
    } else {
      this.setState({ fetchingNewDegData: true, onDegEndReachedManaged: true });
      this.getDegData();
    }
  };

  static navigationOptions = ({ navigation }) => ({
    title: "Registrarse"
  });
  /**
   * Rutina para obtener la foto de perfil de la galeria del usuario
   */
  pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: "Images",
      aspect: [4, 4]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri, imageErr: false });
    }
  };
  /**
   * Actualiza la descripción introducida por el usuario
   * @param {String} description Descripcion del usuario
   */
  updateDescriptionAndFocus = description => {
    this.setState({ description: description });
    this.InputFixer.onFocus();
  };
  /**
   * Comprueba que las dos contraseñas introducidas sean iguales
   * @param {String} pw contraseña a comprobar
   * @param {Number} firstOrSecond si == 1 indica que se tiene que comprobar la primera contraseña introducida
   */
  comparePasswords = (pw, firstOrSecond) => {
    var pw1, pw2;

    if (firstOrSecond == 1) {
      this.setState({ password: pw });
      pw1 = pw;
      pw2 = this.state.passwordCheck;
    } else {
      this.setState({ passwordCheck: pw });
      pw2 = pw;
      pw1 = this.state.password;
    }

    if (pw1.length > 0 && pw2.length > 0) {
      this.setState({ passwordsMatch: pw1 == pw2 });
    }
  };
  /**
   * Callback invocado al hacer click en siguiente,
   * si hay algun error en los campos introducidos los mostrará por pantalla
   */
  handleNext = () => {
    var ok = true;
    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!this.state.passwordsMatch) {
      ok = false;
    }

    if (this.state.username == "") {
      this.setState({ usernameLengthErr: true });
      ok = false;
    } else {
      this.setState({ usernameLengthErr: false });
    }

    if (emailPattern.test(this.state.email) === false) {
      this.setState({ emailErr: true });
      ok = false;
    } else {
      this.setState({ emailErr: false });
    }

    if (this.state.password == "") {
      this.setState({ passwordLengthErr: true });
      ok = false;
    } else {
      this.setState({ passwordLengthErr: false });

      if (this.state.passwordCheck == "") {
        this.setState({ passwordsMatch: false });
        ok = false;
      }
    }

    if (this.state.image == "uri_nula") {
      this.setState({ imageErr: true });
      ok = false;
    } else {
      this.setState({ imageErr: false });
    }

    if (this.state.name == "") {
      this.setState({ nameLengthErr: true });
      ok = false;
    } else {
      this.setState({ nameLengthErr: false });
    }

    if (this.state.surname == "") {
      this.setState({ surnameLengthErr: true });
      ok = false;
    } else {
      this.setState({ surnameLengthErr: false });
    }

    if (this.state.universityId == undefined) {
      this.setState({ universityErr: true });
      ok = false;
    } else {
      this.setState({ universityErr: false });
    }

    if (this.state.degreeId == undefined) {
      this.setState({ degreeErr: true });
      ok = false;
    } else {
      this.setState({ degreeErr: false });
    }

    if (this.state.description == "") {
      this.setState({ descriptionLengthErr: true });
      ok = false;
    } else {
      this.setState({ descriptionLengthErr: false });
    }

    if (ok) {
      this.tryRegister();
    }
  };
  /**
   * Muestra pop-up indicando que el registro ha sido correcto
   */
  showSuccessfulRegister = () => {
    Alert.alert(
      "¡Registro completado!",
      "Ya puede usar la aplicación introduciendo sus datos",
      [
        {
          text: "OK"
        }
      ]
    );
  };
  /**
   * Trata de registrar al usuario, si ha habido un error con la api será mostrado por pantalla
   */
  tryRegister = () => {
    if (!this.state.registering) {
      this.setState({ registering: true });
      const photo = {
        uri: this.state.image,
        name: this.state.image.substring(
          this.state.image.lastIndexOf("/") + 1,
          this.state.image.length
        ),
        type: "image/png"
      };
      let apiInstance = new UserApi();
      console.log("username ", this.state.username);
      console.log("pw ", this.state.password);
      console.log("name ", this.state.name);
      console.log("surname ", this.state.surname);
      console.log("email ", this.state.email);
      console.log("descr ", this.state.description);
      console.log("univer ", this.state.universityId);
      console.log("degre ", this.state.degreeId);
      console.log("image ", this.state.image);
      apiInstance.addUser(
        this.state.username,
        this.state.password,
        this.state.name,
        this.state.surname,
        this.state.email,
        this.state.description,
        this.state.universityId,
        this.state.degreeId,
        photo,
        (error, data, response) => {
          if (error) {
            HaOcurridoUnError(null);
          } else {
            this.showSuccessfulRegister();
            this.props.navigation.navigate("SignIn");
          }
          this.setState({ registering: false });
        }
      );
    }
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent:
              this.state.loadingUni || this.state.loadingDeg
                ? "center"
                : "flex-start"
          }
        ]}
      >
        {this.state.loadingUni || this.state.loadingDeg ? (
          <ActivityIndicator size="large" />
        ) : (
          <InputFixer
            View
            navigation={this.props.navigation}
            ref={InputFixer => (this.InputFixer = InputFixer)}
          >
            <View style={styles.logoView}>
              <Image
                source={require("../../../assets/icon.png")}
                style={styles.appLogo}
              />
            </View>

            <View style={styles.inputBoxSeparation}>
              <Input
                onFocus={() => this.InputFixer.onFocus()}
                placeholder="Nombre de usuario*"
                errorMessage={
                  this.state.usernameLengthErr
                    ? "El nombre de usuario no puede ser vacío"
                    : null
                }
                onChangeText={username => this.setState({ username: username })}
                leftIcon={{ type: "font-awesome", name: "user" }}
                leftIconContainerStyle={styles.inputSeparation}
              />
            </View>

            <View style={styles.inputBoxSeparation}>
              <Input
                onFocus={() => this.InputFixer.onFocus()}
                placeholder="Correo electrónico*"
                errorMessage={
                  this.state.emailErr ? "Correo electrónico no válido" : null
                }
                onChangeText={email => this.setState({ email: email })}
                leftIcon={{ type: "font-awesome", name: "at" }}
                leftIconContainerStyle={styles.inputSeparation}
              />
            </View>

            <View style={styles.inputBoxSeparation}>
              <Input
                onFocus={() => this.InputFixer.onFocus()}
                placeholder="Contraseña*"
                secureTextEntry={true}
                errorMessage={
                  this.state.passwordLengthErr
                    ? "La contraseña no puede ser vacía"
                    : null
                }
                leftIcon={{ type: "font-awesome", name: "lock" }}
                onChangeText={password => this.comparePasswords(password, 1)}
                leftIconContainerStyle={styles.inputSeparation}
              />
            </View>
            <View style={styles.inputBoxSeparation}>
              <Input
                onFocus={() => this.InputFixer.onFocus()}
                placeholder="Repita la contraseña*"
                secureTextEntry={true}
                errorMessage={
                  this.state.passwordsMatch
                    ? null
                    : "Las contraseñas no coinciden"
                }
                leftIcon={{ type: "font-awesome", name: "lock" }}
                onChangeText={checkpw => this.comparePasswords(checkpw, 2)}
                leftIconContainerStyle={styles.inputSeparation}
              />
            </View>

            <View style={styles.viewImageContainer}>
              {this.state.imageErr ? (
                <Text style={styles.imageErrText}>{imageErrText}</Text>
              ) : (
                <Image
                  source={{ uri: this.state.image }}
                  style={styles.profPic}
                />
              )}

              <Button
                title="Seleccionar foto"
                containerStyle={styles.profPicButton}
                onPress={this.pickProfileImage}
                buttonStyle={styles.buttonColor}
              />
            </View>
            <View style={styles.inputBoxSeparation}>
              <Input
                onFocus={() => this.InputFixer.onFocus()}
                onChangeText={name => this.setState({ name: name })}
                placeholder="Nombre*"
                errorMessage={
                  this.state.nameLengthErr
                    ? "El nombre no puede ser vacío"
                    : null
                }
                leftIcon={{ type: "font-awesome", name: "id-card" }}
                leftIconContainerStyle={styles.inputSeparation}
              />
            </View>
            <View style={styles.inputBoxSeparation}>
              <Input
                onFocus={() => this.InputFixer.onFocus()}
                onChangeText={surname => this.setState({ surname: surname })}
                placeholder="Apellidos*"
                errorMessage={
                  this.state.surnameLengthErr
                    ? "Los apellidos no pueden ser vacíos"
                    : null
                }
                leftIcon={{ type: "font-awesome", name: "id-card" }}
                leftIconContainerStyle={styles.inputSeparation}
              />
            </View>

            <View style={styles.viewSelectAsign}>
              <Text
                style={
                  this.state.universityErr
                    ? styles.textAsignaturaErr
                    : styles.textAsignatura
                }
              >
                Universidad:
              </Text>

              <Text
                style={styles.collegeName}
                onPress={() => this.setState({ openUniModal: true })}
              >
                {this.state.universityName}
              </Text>

              <Overlay
                isVisible={this.state.openUniModal}
                animationType="fade"
                onBackdropPress={() => this.setState({ openUniModal: false })}
              >
                <View>
                  <FlatList
                    data={
                      this.state.uniData.length < 1 ? [{}] : this.state.uniData
                    }
                    onEndReached={() => this.onEndReached("uni")}
                    renderItem={({ item }) => (
                      <RippleTouchable
                        style={styles.listRow}
                        onPress={() =>
                          this.setState({
                            universityName: item.name,
                            universityId: item.id,
                            openUniModal: false
                          })
                        }
                      >
                        <Text style={styles.rowText}>{item.name}</Text>
                      </RippleTouchable>
                    )}
                    ListFooterComponent={LoadingFooter({
                      show: this.state.fetchingNewUniData
                    })}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </Overlay>
            </View>

            <View style={styles.viewSelectAsign}>
              <Text
                style={
                  this.state.degreeErr
                    ? styles.textAsignaturaErr
                    : styles.textAsignatura
                }
              >
                Estudios:
              </Text>

              <Text
                style={styles.collegeName}
                onPress={() => this.setState({ openDegModal: true })}
              >
                {this.state.degreeName}
              </Text>

              <Overlay
                isVisible={this.state.openDegModal}
                overlayStyle={styles.overlayStyle}
                animationType="fade"
                onBackdropPress={() => this.setState({ openDegModal: false })}
              >
                <View>
                  <FlatList
                    data={
                      this.state.degData.length < 1 ? [{}] : this.state.degData
                    }
                    onEndReached={() => this.onEndReached("deg")}
                    renderItem={({ item }) => (
                      <RippleTouchable
                        style={styles.listRow}
                        onPress={() =>
                          this.setState({
                            degreeName: item.name,
                            degreeId: item.id,
                            openDegModal: false
                          })
                        }
                      >
                        <Text style={styles.rowText}>{item.name}</Text>
                      </RippleTouchable>
                    )}
                    ListFooterComponent={LoadingFooter({
                      show: this.state.fetchingNewDegData
                    })}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </Overlay>
            </View>

            <View style={styles.descriptionContainer}>
              <Input
                onCharge
                onFocus={() => this.InputFixer.onFocus()}
                onChangeText={description =>
                  this.updateDescriptionAndFocus(description)
                }
                placeholder="Escriba su descripción..."
                errorMessage={
                  this.state.descriptionLengthErr
                    ? "La descripción no puede ser vacía"
                    : null
                }
                leftIcon={{ type: "font-awesome", name: "info" }}
                leftIconContainerStyle={styles.inputSeparationInfo}
                multiline={true}
              />
            </View>

            <View style={styles.viewNextButton}>
              <Button
                onPress={() => this.handleNext()}
                title="Registrarse"
                icon={{
                  type: "font-awesome",
                  name: "check-circle",
                  color: "white"
                }}
                titleStyle={styles.nextText}
                containerStyle={styles.nextButton}
                buttonStyle={styles.buttonColor}
              />
            </View>
            <View style={{ height: 60 }} />
            <LoadingModal visible={this.state.registering} />
          </InputFixer>
        )}
      </View>
    );
  }
}
