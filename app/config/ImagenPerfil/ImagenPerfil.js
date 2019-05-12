import { observable, action } from "mobx";

import Auth from "../../config/Auth";

import { UserApi, ApiClient } from "swagger_unicast";

class ImagenPerfil {
	@observable imagenPerfil = "";

	@action setImagenPerfil(new_imagen) {
		this.imagenPerfil = new_imagen;
	}

	@action reload() {
		let defaultClient = ApiClient.instance;
		let bearerAuth = defaultClient.authentications["bearerAuth"];
		bearerAuth.accessToken = Auth.getUserToken();

		this.apiInstance = new UserApi();
		let id = Auth.getUserId();
		let opts = {
			cacheControl: "no-cache, no-store, must-revalidate",
			pragma: "no-cache",
			expires: 0
		};
		this.apiInstance.getUser(id, opts, (error, data, response) => {
			if (!error) {
				this.imagenPerfil = data.photo;
			}
		});
	}
}

const ImagenPerfilStore = new ImagenPerfil();
export default ImagenPerfilStore;
