import { observable, action } from "mobx";

import Auth from "../../config/Auth";

import { UserApi, ApiClient } from "swagger_unicast";

class ImagenPerfil {
	@observable imagenPerfil = "";

	@action setImagenPerfil(new_imagen) {
		this.imagenPerfil = new_imagen;
	}
}

const ImagenPerfilStore = new ImagenPerfil();
export default ImagenPerfilStore;
