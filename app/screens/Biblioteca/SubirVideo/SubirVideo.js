import React from "react";
import {
  Text,
  View,
  Animated,
  Dimensions,
  Keyboard,
  UIManager,
  Picker,
  TextInput
} from "react-native";

import { ImagePicker } from "expo";
//import VideoPlayer from "expo-video-player";
import { Button, Input, Image } from "react-native-elements";

import VideoConSinFlechaAtras from "../../../components/VideoConSinFlechaAtras";
import styles from "./styles";

const { State: TextInputState } = TextInput;
const sintel = require("../../../../test/videos/nyancat.mp4");

export default class SubirVideo extends React.Component {
  state = {
    shift: new Animated.Value(0),
    videoIsChosen: 0,
    asignatura: "undefined",
    video: "undefined",
    thumbnail: "undefined"
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

  pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: "Videos",
      aspect: [16, 9]
    });

    if (!result.cancelled) {
      this.setState({ video: result.uri, videoIsChosen: 1 });
      console.log("HELLO");
      console.log(result.uri);
    }
  };

  pickThumbnail = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: "Images",
      aspect: [16, 9]
    });

    if (!result.cancelled) {
      this.setState({ thumbnail: result.uri });
    }
  };

  static navigationOptions = ({ navigation }) => ({
    title: "Subir vídeo"
  });

  render() {
    const { shift } = this.state;
    const { thumbnail } = this.state;
    const { video } = this.state;

    return (
      <Animated.ScrollView
        style={[styles.container, { transform: [{ translateY: shift }] }]}
      >
        <View
          style={styles.viewSelectVideo}
          borderWidth={2}
          borderColor="grey"
          borderStyle="dashed"
          borderRadius={4}
        >
          {this.state.videoIsChosen == 0 ? (
            <Button
              buttonStyle={styles.selectVideoButton}
              title="ELEGIR VÍDEO"
              onPress={this.pickVideo}
            />
          ) : (
            <VideoConSinFlechaAtras
              flechaSi={false}      
              navigation={this.props.navigation}
              source={video}
              thumbnail={thumbnail}
              autoplay={false}
              style={styles.videoPlayer}
            />
          )}
        </View>

        <View style={styles.viewSelectAsign}>
          <Text style={styles.textAsignatura}>Asignatura:</Text>
          <Picker
            mode="dropdown"
            selectedValue={this.state.asignatura}
            style={styles.pickerAsign}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ asignatura: itemValue })
            }
          >
            <Picker.Item label="Unizar - Bioinformática" value="1" />
            <Picker.Item
              label="UC3 - Laboratorio de sistemas de información"
              value="2"
            />
          </Picker>
        </View>

        <View style={styles.viewInput}>
          <Input placeholder="Escriba un título..." label="Título" />
        </View>

        <View style={styles.viewInput}>
          <Input
            placeholder="Escriba una descripción..."
            multiline={true}
            label="Descripción"
          />
        </View>

        <View style={styles.viewSelectThumbnail}>
          <Button title="Elegir miniatura" onPress={this.pickThumbnail} />
          {thumbnail && (
            <Image source={{ uri: thumbnail }} style={styles.imageThumbnail} />
          )}
        </View>

        <View style={styles.uploadButtonView}>
          <Button buttonStyle={styles.uploadButton} title="Subir vídeo" />
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
        const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
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
