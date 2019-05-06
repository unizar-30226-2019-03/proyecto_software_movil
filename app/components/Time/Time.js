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

export const secToDuration = (secs) => {
	let hours = Math.floor(secs / 3600);
	secs = secs - hours * 3600; 
	let minutes = Math.floor(secs / 60);
	let seconds = secs - minutes * 60;

	let cero = "00"
	let hoursStr = hoursStr = hours > 0 ? cero.substring(0, cero.length - hours.toString().length) + hours.toString() + ":" : ""
	let minutesStr = cero.substring(0, cero.length - minutes.toString().length) + minutes.toString() + ":"
	let secondsStr = cero.substring(0, cero.length - seconds.toString().length) + seconds.toString()

	return hoursStr + minutesStr + secondsStr
}

