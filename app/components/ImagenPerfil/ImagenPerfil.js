import React from "react";
import { View, TouchableOpacity, ActivityIndicator, Image } from "react-native";

import ImagenPerfilStore from "../../config/ImagenPerfil";
import { observer } from "mobx-react/native";

@observer
export default class ImagenPerfil extends React.Component {
	render() {
		const imagenPerfil = ImagenPerfilStore.imagenPerfil;
		return (
			<View>
				{imagenPerfil == "" ? (
					<View style={[this.props.style, { justifyContent: "center" }]}>
						<ActivityIndicator size="large" />
					</View>
				) : (
					<Image key={imagenPerfil} source={{ uri: imagenPerfil }} style={this.props.style} />
				)}
			</View>
		);
	}
}
