import { observable, action } from "mobx";

import Auth from "../Auth";

import { UserApi, ApiClient } from "swagger_unicast";

class PerfilStore {
	@observable imagenPerfil = "";
	@observable userName = "";

	@action setImagenPerfil(newImagen) {
		this.imagenPerfil = newImagen;
	}

	@action setUserName(newUserName) {
		this.userName = newUserName;
	}
}

const PerfilStoreInstance = new PerfilStore();
export default PerfilStoreInstance;
