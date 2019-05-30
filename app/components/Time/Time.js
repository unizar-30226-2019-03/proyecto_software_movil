import React from "react";

/**
 *
 * @param {Number} antes Tiempo anterior
 * @param {Number} ahora Tiempo actual
 * @param {String} singular Medida de tiempo en singular
 * @param {String} plural Medida de tiempo en plural
 */
const timeToHace = (antes, ahora, singular, plural) => {
  if (antes < ahora) {
    if (ahora - antes == 1) {
      return "Hace 1 " + singular;
    } else {
      return "Hace " + (ahora - antes) + " " + plural;
    }
  }
  return null;
};

/**
 *
 * @param {String} timestamp
 * @param {Number} currentTime
 * @return {String} Devuelve de hace cuanto tiempo es el timeStamp p.e "Hace dos años"
 */
export const timeStampToFormat = (timestamp, currentTime) => {
  let resultado = timeToHace(
    timestamp.getFullYear(),
    currentTime.getFullYear(),
    "año",
    "años"
  );
  if (resultado) {
    return resultado;
  }
  resultado = timeToHace(
    timestamp.getMonth(),
    currentTime.getMonth(),
    "mes",
    "meses"
  );
  if (resultado) {
    return resultado;
  }
  resultado = timeToHace(
    timestamp.getDate(),
    currentTime.getDate(),
    "día",
    "días"
  );
  if (resultado) {
    return resultado;
  }
  resultado = timeToHace(
    timestamp.getHours(),
    currentTime.getHours(),
    "hora",
    "horas"
  );
  if (resultado) {
    return resultado;
  }
  resultado = timeToHace(
    timestamp.getMinutes(),
    currentTime.getMinutes(),
    "minuto",
    "minutos"
  );
  if (resultado) {
    return resultado;
  }

  return "Ahora mismo";
};

export const secToDuration = secs => {
  let hours = Math.floor(secs / 3600);
  secs = secs - hours * 3600;
  let minutes = Math.floor(secs / 60);
  let seconds = secs - minutes * 60;

  let cero = "00";
  let hoursStr =
    hours > 0
      ? cero.substring(0, cero.length - hours.toString().length) +
        hours.toString() +
        ":"
      : "";
  let minutesStr =
    cero.substring(0, cero.length - minutes.toString().length) +
    minutes.toString() +
    ":";
  let secondsStr =
    cero.substring(0, cero.length - seconds.toString().length) +
    seconds.toString();

  return hoursStr + minutesStr + secondsStr;
};

export const timeStampToChatDate = (timestamp, currentTime) => {
  if (timestamp.getDate() < currentTime.getDate()) {
    if (currentTime.getDate() - timestamp.getDate() == 1) {
      return "Ayer";
    } else {
      return (
        timestamp.getDate() +
        "/" +
        (timestamp.getMonth() + 1) +
        "/" +
        timestamp
          .getFullYear()
          .toString()
          .slice(-2)
      );
    }
  } else {
    console.log("AQUI");
    let cero = "00";

    let hours = timestamp.getHours().toString();
    console.log(hours);
    let hoursStr = cero.substring(0, cero.length - hours.length) + hours;
    console.log(hoursStr);

    let minutes = timestamp.getMinutes().toString();
    let minutesStr = cero.substring(0, cero.length - minutes.length) + minutes;

    return hoursStr + ":" + minutesStr;
  }
};
