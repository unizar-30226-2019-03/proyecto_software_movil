import React from "react";

import {
  View,
  TextInput,
  Animated,
  Dimensions,
  Keyboard,
  UIManager
} from "react-native";

import { Input, Image, Button } from "react-native-elements";

import { ImagePicker } from "expo";

import MoverInputEncimaTeclado from "../../../../components/MoverInputEncimaTeclado";

import styles from "./styles";

const { State: TextInputState } = TextInput;

export default class SignUpOne extends React.Component {
  state = {
    shift: new Animated.Value(0),
    image: "../../../../assets/icon.png"
  };

  componentWillMount() {
    this.moverInputEncimaTeclado = new MoverInputEncimaTeclado()
  }

  componentWillUnmount() {
    this.moverInputEncimaTeclado.delete()
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Registrarse"
  });

  pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4]
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  openDialogBox = () => {
    this.setState({ _isDialogVisible: true });
  };

  closeDialogBox = () => {
    this.setState({ _isDialogVisible: false });
  };

  updateDescription = textToUpdate => {
    this.setState({ _description: textToUpdate });
  };

  updateDescriptionAndClose = textToUpdate => {
    this.setState({ _isDialogVisible: false, _description: textToUpdate });
  };

  render() {
    const { shift } = this.state;
    let { image } = this.state;

    return (
      <Animated.ScrollView
        style={[styles.container, { transform: [{ translateY: this.moverInputEncimaTeclado.getShift() }] }]}
      >
        <View style={styles.logoView}>
          <Image
            source={require("../../../../assets/icon.png")}
            style={styles.appLogo}
          />
        </View>

        <View style={styles.inputBoxSeparation}>
          <Input
            onFocus={() => this.moverInputEncimaTeclado.onFocus() }
            placeholder="Nombre de usuario*"
            leftIcon={{ type: "font-awesome", name: "user" }}
            leftIconContainerStyle={styles.inputSeparation}
          />
        </View>

        <View style={styles.inputBoxSeparation}>
          <Input
            onFocus={() => this.moverInputEncimaTeclado.onFocus() }
            placeholder="Correo electrónico*"
            leftIcon={{ type: "font-awesome", name: "at" }}
            leftIconContainerStyle={styles.inputSeparation}
          />
        </View>

        <View style={styles.inputBoxSeparation}>
          <Input
            onFocus={() => this.moverInputEncimaTeclado.onFocus() }
            placeholder="Contraseña*"
            secureTextEntry={true}
            leftIcon={{ type: "font-awesome", name: "lock" }}
            leftIconContainerStyle={styles.inputSeparation}
          />
        </View>
        <View style={styles.inputBoxSeparation}>
          <Input
            onFocus={() => this.moverInputEncimaTeclado.onFocus() }
            placeholder="Repita la contraseña*"
            secureTextEntry={true}
            leftIcon={{ type: "font-awesome", name: "lock" }}
            leftIconContainerStyle={styles.inputSeparation}
          />
        </View>

        <View style={styles.viewImageContainer}>
          {image && <Image source={{ uri: image }} style={styles.profPic} />}
          <Button
            title="Seleccionar foto"
            containerStyle={styles.profPicButton}
            onPress={this.pickProfileImage}
          />
        </View>
        <View style={styles.inputBoxSeparation}>
          <Input
            onFocus={() => this.moverInputEncimaTeclado.onFocus() }
            placeholder="Nombre*"
            leftIcon={{ type: "font-awesome", name: "id-card" }}
            leftIconContainerStyle={styles.inputSeparation}
          />
        </View>
        <View style={styles.inputBoxSeparation}>
          <Input
            onFocus={() => this.moverInputEncimaTeclado.onFocus() }
            placeholder="Apellidos*"
            leftIcon={{ type: "font-awesome", name: "id-card" }}
            leftIconContainerStyle={styles.inputSeparation}
          />
        </View>

        <View style={styles.descriptionContainer}>
          <Input
            onFocus={() => this.moverInputEncimaTeclado.onFocus() }
            placeholder="Escriba su descripción..."
            leftIcon={{ type: "font-awesome", name: "info" }}
            leftIconContainerStyle={styles.inputSeparationInfo}
            multiline={true}
          />
        </View>

        <View style={styles.viewNextButton}>
          <Button
            onPress={() => this.props.navigation.navigate("SignUpTwo")}
            title="Siguiente"
            containerStyle={styles.nextButton}
          />
        </View>
      </Animated.ScrollView>
    );
  }
}
