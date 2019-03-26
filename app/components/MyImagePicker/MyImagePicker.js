/*import React, { Component } from "react";
import { AppRegistry, Button, View } from "react-native";
import ImagePicker from "react-native-image-picker";

export default class MyImagePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null
    };
  }
  handleChoosePhoto = () => {
    const options = {
      title: "Selecciona una foto",
      takePhotoButtonTitle: "Cámara",
      chooseFromLibraryButtonTitle: "Galería",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };*/

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */
/*    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  };
  render() {
    return (
      <View>
        <Button title="Seleccionar foto" onPress={this.handleChoosePhoto} />
      </View>
    );
  }
}

AppRegistry.registerComponent("MyImagePicker", () => MyImagePicker);*/
