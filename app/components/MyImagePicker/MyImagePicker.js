import ImagePicker from "expo";

export const pickImage = async () => {
  console.log("HOLA");
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3]
  });
  console.log(result);
  if (!result.cancelled) {
    return result.uri;
  }
};
