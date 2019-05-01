import React from "react";

import { View } from "react-native";

import { Input, Image, Button } from "react-native-elements";

import { ImagePicker } from "expo";

import InputFixer from "../../../../components/InputFixer";

import styles from "./styles";

export default class SignUpOne extends React.Component {
  state = {
    image: "../../../../assets/icon.png"
  };

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
    let { image } = this.state;

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
            leftIcon={{ type: "font-awesome", name: "user" }}
            leftIconContainerStyle={styles.inputSeparation}
          />
        </View>

        <View style={styles.inputBoxSeparation}>
          <Input
            onFocus={() => this.InputFixer.onFocus()}
            placeholder="Correo electrónico*"
            leftIcon={{ type: "font-awesome", name: "at" }}
            leftIconContainerStyle={styles.inputSeparation}
          />
        </View>

        <View style={styles.inputBoxSeparation}>
          <Input
            onFocus={() => this.InputFixer.onFocus()}
            placeholder="Contraseña*"
            secureTextEntry={true}
            leftIcon={{ type: "font-awesome", name: "lock" }}
            leftIconContainerStyle={styles.inputSeparation}
          />
        </View>
        <View style={styles.inputBoxSeparation}>
          <Input
            onFocus={() => this.InputFixer.onFocus()}
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
            onFocus={() => this.InputFixer.onFocus()}
            placeholder="Nombre*"
            leftIcon={{ type: "font-awesome", name: "id-card" }}
            leftIconContainerStyle={styles.inputSeparation}
          />
        </View>
        <View style={styles.inputBoxSeparation}>
          <Input
            onFocus={() => this.InputFixer.onFocus()}
            placeholder="Apellidos*"
            leftIcon={{ type: "font-awesome", name: "id-card" }}
            leftIconContainerStyle={styles.inputSeparation}
          />
        </View>

        <View style={styles.descriptionContainer}>
          <Input
            onCharge
            onFocus={() => this.InputFixer.onFocus()}
            onChangeText={() => this.InputFixer.onFocus()}
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
        <View style={{ height: 60 }} />
      </InputFixer>
    );
  }
}
