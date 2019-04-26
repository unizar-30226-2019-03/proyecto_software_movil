import React from "react";
import {
  View,
  ActivityIndicator,
  TextInput,
  Animated,
  Dimensions,
  Keyboard,
  UIManager
} from "react-native";
import { Input, Image, Button } from "react-native-elements";

import { ImagePicker } from "expo";

import styles from "./styles";

const { State: TextInputState } = TextInput;

export default class SignUpOne extends React.Component {
  state = {
    shift: new Animated.Value(0),
    image: "../../../../assets/icon.png"
  };

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener(
      "keyboardDidShow",
      this.handleKeyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      "keyboardDidHide",
      this.handleKeyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
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
    var auxDescription = "ph";

    return (
      <Animated.ScrollView
        style={[styles.container, { transform: [{ translateY: shift }] }]}
      >
        <View style={styles.logoView}>
          <Image
            source={require("../../../../assets/icon.png")}
            style={styles.appLogo}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>

        <View style={styles.inputBoxSeparation}>
          <Input
            placeholder="Nombre de usuario*"
            leftIcon={{ type: "font-awesome", name: "user" }}
            leftIconContainerStyle={styles.inputSeparation}
          />
        </View>

        <View style={styles.inputBoxSeparation}>
          <Input
            placeholder="Correo electrónico*"
            leftIcon={{ type: "font-awesome", name: "at" }}
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
            placeholder="Nombre*"
            leftIcon={{ type: "font-awesome", name: "id-card" }}
            leftIconContainerStyle={styles.inputSeparation}
          />
        </View>
        <View style={styles.inputBoxSeparation}>
          <Input
            placeholder="Apellidos*"
            leftIcon={{ type: "font-awesome", name: "id-card" }}
            leftIconContainerStyle={styles.inputSeparation}
          />
        </View>

        <View style={styles.descriptionContainer}>
          <Input
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

  handleKeyboardDidShow = event => {
    const { height: windowHeight } = Dimensions.get("window");
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(
      currentlyFocusedField,
      (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        const gap = keyboardHeight - (fieldTop + fieldHeight + 100);
        if (gap >= 0) {
          return;
        }
        Animated.timing(this.state.shift, {
          toValue: gap,
          duration: 200,
          useNativeDriver: true
        }).start();
      }
    );
  };

  handleKeyboardDidHide = () => {
    Animated.timing(this.state.shift, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start();
  };
}
