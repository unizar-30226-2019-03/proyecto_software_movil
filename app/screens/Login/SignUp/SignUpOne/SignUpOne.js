import React from "react";
import { View, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { Input, Image, Button } from "react-native-elements";
import { ImagePicker } from "expo";

import styles from "./styles";

export default class SignUpOne extends React.Component {
  state = {
    image: "../../../../assets/splash.png"
  };
  static navigationOptions = ({ navigation }) => ({
    title: "Registrarse"
  });
  render() {
    let { image } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.logoView}>
          <Image
            source={require("../../../../assets/icon.png")}
            style={{ width: 50, height: 50 }}
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

          <View
            style={{
              paddingTop: 15,
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 70, height: 70 }}
              />
            )}
            <Button title="Seleccionar foto" onPress={this._pickImage} />
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
      </View>
    );
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}
