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
import { Image, SearchBar, Button } from "react-native-elements";

import styles from "./styles";

const { State: TextInputState } = TextInput;

export default class SignUpOne extends React.Component {
  state = {
    shift: new Animated.Value(0),
    username: this.navigation.getParam("username"),
    email: this.navigation.getParam("email"),
    password: this.navigation.getParam("password"),
    image: this.navigation.getParam("image"),
    name: this.navigation.getParam("name"),
    surname: this.navigation.getParam("surname"),
    description: this.navigation.getParam("description"),
  };

  static navigationOptions = ({ navigation }) => ({
    title: "Registrarse"
  });

  updateSearchUni = searchUni => {
    this.setState({ searchUni });
  };

  updateSearchCarrera = searchCarrera => {
    this.setState({ searchCarrera });
  };

  updateSearchAsign = searchAsign => {
    this.setState({ searchAsign });
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

  tryRegister = async () => {
    let apiInstance = new UserApi();
    apiInstance.addUser(
      this.state.username,
      this.state.password,
      this.state.email,
      async (error, data, response) => {
        if (error) {
          this.setState({
            showInputError: true
          });
        } else {
          await signIn(data.token, this.props.navigation);
        }
      }
    );
  };

  render() {
    const { shift } = this.state;
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
          <SearchBar
            placeholder="¿En qué universidad estudias?"
            onChangeText={this.updateSearchUni}
            value={searchUni}
            platform="android"
            inputStyle={styles.placeholderText}
          />
        </View>

        <View style={styles.viewNextButton}>
          <Button
            onPress={() => this.props.navigation.navigate("Logged")}
            title="Registrarse"
            icon={{
              type: "font-awesome",
              name: "check-circle",
              color: "white"
            }}
            titleStyle={styles.nextText}
            containertyle={styles.nextButton}
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
        const gap =
         keyboardHeight - (fieldTop + fieldHeight + 140);
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
