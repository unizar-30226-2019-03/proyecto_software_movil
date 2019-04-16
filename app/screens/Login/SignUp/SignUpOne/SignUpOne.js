import React from "react";
import { View, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { Input, Image, Button } from "react-native-elements";
import Dialog from "react-native-dialog";

import { ImagePicker } from "expo";

import styles from "./styles";
import { TextInput } from "react-native-gesture-handler";

export default class SignUpOne extends React.Component {
  state = {
    image: "../../../../assets/icon.png",
    _isDialogVisible: false,
    _description: ""
  };

  static navigationOptions = ({ navigation }) => ({
    title: "Registrarse"
  });

  pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4]
    });

    console.log(result);

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
    var auxDescription = "ph";

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.logoView}>
          <Image
            source={require("../../../../assets/icon.png")}
            style={styles.appLogo}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={styles.container07}>
          <View style={styles.inputBoxSeparation}>
            <Input
              placeholder="Nombre de usuario*"
              leftIcon={{ type: "font-awesome", name: "user" }}
              leftIconContainerStyle={styles.inputSeparation}
            />
          </View>
          <View style={styles.inputBoxSeparation}>
            <Input
              placeholder="Contraseña*"
              secureTextEntry={true}
              leftIcon={{ type: "font-awesome", name: "lock" }}
              leftIconContainerStyle={styles.inputSeparation}
            />
          </View>
          <View style={styles.inputBoxSeparation}>
            <Input
              placeholder="Vuelva a introducir la contraseña*"
              secureTextEntry={true}
              leftIcon={{ type: "font-awesome", name: "lock" }}
              leftIconContainerStyle={styles.inputSeparation}
            />
          </View>

          <View style={styles.viewImageContainer}>
            {image && <Image source={{ uri: image }} style={styles.profPic} />}
            <Button title="Seleccionar foto" onPress={this.pickProfileImage} />
          </View>
        </View>

        <Dialog.Container visible={this.state._isDialogVisible}>
          <Dialog.Title>Descripción</Dialog.Title>
          <Dialog.Input
            placeholder="Escriba su descripción..."
            autoFocus={true}
            defaultValue={this.state._description}
            onChangeText={(textInput) => auxDescription = textInput}
            multiline={true}
            />
          <Dialog.Button
            label="Cancelar"
            onPress={() => this.setState({ _isDialogVisible: false })}
          />
          <Dialog.Button
            label="Aceptar"
            onPress={() => this.updateDescriptionAndClose(auxDescription)}
          />
        </Dialog.Container>

        <View style={styles.containerDescr}>
          <View style={styles.description}>
            <Input
              placeholder="Escriba una descripción suya"
              value={this.state._description}
              multiline={true}
              onFocus={() => this.setState({ _isDialogVisible: true })}
            />
          </View>
        </View>

        <View style={styles.nextButton}>
          <Button
            onPress={() => this.props.navigation.navigate("SignUpTwo")}
            title="Siguiente"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
