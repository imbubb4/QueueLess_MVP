import {
  database,
  ref,
  onValue,
  update
} from "./firebase-config.js";

const ticketCodigo = document.getElementById("ticketCodigo");

const ticketEstado = document.getElementById("ticketEstado");

const ticketTiempo = document.getElementById("ticketTiempo");

const contador = document.getElementById("contador");

const btnLlegue = document.getElementById("btnLlegue");

const btnCancelarCola = document.getElementById("btnCancelarCola");

const alertBox = document.getElementById("alertBox");

const alertText = document.getElementById("alertText");


// OBTENER TICKET

const ticketKey = localStorage.getItem("ticketKey");


// VALIDACIÓN

if (!ticketKey) {

  window.location.href = "index.html";

}


// REFERENCIA FIREBASE

const ticketRef = ref(database, `tickets/${ticketKey}`);


// TIEMPO INICIAL

let tiempo = 15 * 60;


// ALERTA

function mostrarAlerta(texto) {

  alertText.textContent = texto;

  alertBox.classList.remove("hidden");

  setTimeout(() => {

    alertBox.classList.add("hidden");

  }, 4000);

}


// CARGAR DATOS REALTIME

onValue(ticketRef, (snapshot) => {

  const data = snapshot.val();

  if (!data) return;

  // DATOS TICKET

  ticketCodigo.textContent =
    `Ticket: ${data.ticketId}`;

  ticketEstado.textContent =
    `Estado: ${data.estado}`;

  ticketTiempo.textContent =
    `Tiempo estimado: ${data.tiempoEstimado} min`;

  // ADMIN FINALIZÓ

  if (data.listoParaCalificar) {

    // Si el admin (o quien sea) marcó listoParaCalificar,
    // enviar al usuario a la página de calificación unificada.
    window.location.href = "rating.html";

  }

});


// CONTADOR

setInterval(() => {

  if (tiempo <= 0) return;

  tiempo--;

  const min = Math.floor(tiempo / 60);

  const seg = tiempo % 60;

  contador.textContent =
    `${min}:${seg < 10 ? "0" : ""}${seg}`;

  // ALERTAS

  if (tiempo === 600) {

    mostrarAlerta(
      "Faltan 10 minutos para tu turno"
    );

  }

  if (tiempo === 300) {

    mostrarAlerta(
      "Faltan 5 minutos para tu turno"
    );

  }

  if (tiempo === 0) {

    mostrarAlerta(
      "Ya es tu turno"
    );

  }

}, 1000);


// LLEGUÉ

btnLlegue.addEventListener("click", async () => {

  await update(ticketRef, {

    estado: "cliente_llego"

  });

  // REDIRECCIÓN

  window.location.href = "service.html";

});


// CANCELAR

btnCancelarCola.addEventListener("click", async () => {

  await update(ticketRef, {

    estado: "cancelado"

  });

  window.location.href = "cancel.html";

});


// Nota: la calificación se maneja en rating.html/js/rating.js