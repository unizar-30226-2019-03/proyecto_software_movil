import React from "react";

const timeToString = (antes, ahora, singular, plural) => {
	if (antes < ahora) {
		if (ahora - antes == 1) {
			return "Hace 1 " + singular
		}
		else {
			return "Hace " + (ahora - antes) + " " + plural
		}
	}
	return null;
}

export const timeStampToFormat = (timestamp, currentTime) => {
	let resultado = timeToString(timestamp.getFullYear(), currentTime.getFullYear(), "año", "años")
	if (resultado) {
		return resultado;
	}
	resultado = timeToString(timestamp.getMonth(), currentTime.getMonth(), "mes", "meses")
	if (resultado) {
		return resultado;
	}
	resultado = timeToString(timestamp.getDate(), currentTime.getDate(), "día", "días")
	if (resultado) {
		return resultado;
	}
	resultado = timeToString(timestamp.getHours(), currentTime.getHours(), "hora", "horas")
	if (resultado) {
		return resultado;
	}
	resultado = timeToString(timestamp.getMinutes(), currentTime.getMinutes(), "minuto", "minutos")
	if (resultado) {
		return resultado;
	}

	return "Ahora mismo"
}

export const secFromBegToDuration = (secFromBeg) => {
	// const time = secFromBeg

	// let hours = time / 3600
	// let minutes = time / 60
	// let seconds = 0


}

