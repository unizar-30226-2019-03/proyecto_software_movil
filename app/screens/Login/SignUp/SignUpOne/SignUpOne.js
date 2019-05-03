import React from "react";

import { View, Text, Animated } from "react-native";

import { Input, Image, Button } from "react-native-elements";

import { ImagePicker } from "expo";

import InputFixer from "../../../../components/InputFixer";

import styles from "./styles";

const imageErrText = "Falta una\nimagen de perfil";

export default class SignUpOne extends React.Component {
  state = {
    shift: new Animated.Value(0),
    username: "",
    email: "",
    password: "",
    passwordCheck: "",
    image: undefined,
    name: "",
    surname: "",
    description: "",
    passwordsMatch: true,
    usernameLengthErr: false,
    emailErr: false,
    passwordLengthErr: false,
    imageErr: false,
    nameLengthErr: false,
    surnameLengthErr: false,
    descriptionLengthErr: false
  };

  static navigationOptions = ({ navigation }) => ({
    title: "Registrarse"
  });

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

  updateDescriptionAndFocus = (description) => {
    this.setState({ description: description });
    this.InputFixer.onFocus();
  }

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

    if (this.state.image == undefined) {
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

    if (this.state.description == "") {
      this.setState({ descriptionLengthErr: true });
      ok = false;
    } else {
      this.setState({ descriptionLengthErr: false });
    }

    if (ok) {
      this.props.navigation.navigate("SignUpTwo", {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        image: this.state.image,
        name: this.state.name,
        surname: this.state.surname,
        description: this.state.description
      });
    }
  };

  render() {
    return (
      <InputFixer
        navigation={this.props.navigation}
        ref={InputFixer =>
          (this.InputFixer = InputFixer)
        }
      >
        <View style={styles.logoView}>
          <Image
            source={require("../../../../assets/icon.png")}
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
              this.state.passwordsMatch ? null : "Las contraseñas no coinciden"
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
            <Image source={{ uri: this.state.image }} style={styles.profPic} />
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
              this.state.nameLengthErr ? "El nombre no puede ser vacío" : null
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

        <View style={styles.descriptionContainer}>
          <Input
            onCharge
            onFocus={() => this.InputFixer.onFocus()}
            onChangeText={description => this.updateDescriptionAndFocus(description)}
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
            title="Siguiente"
            containerStyle={styles.nextButton}
            buttonStyle={styles.buttonColor}
          />
        </View>
        <View style={{ height: 60 }} />
      </InputFixer>
    );
  }
}
