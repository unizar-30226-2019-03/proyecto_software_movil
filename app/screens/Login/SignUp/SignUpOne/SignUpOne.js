import React from "react";
import { View, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { Input, Image, Button } from "react-native-elements";

import { ImagePicker } from "expo";

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

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    let { image } = this.state;

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

          <View style={styles.description}>
            <Input
              placeholder="Escriba una descripción suya"
              multiline={true}
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
