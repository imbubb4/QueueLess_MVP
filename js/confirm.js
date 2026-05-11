import {
  database,
  ref,
  update
} from "./firebase-config.js";

const ticketInfo = document.getElementById("ticketInfo");

const tiempoInfo = document.getElementById("tiempoInfo");

const btnAceptar = document.getElementById("btnAceptar");

const btnCancelar = document.getElementById("btnCancelar");


const ticketKey = localStorage.getItem("ticketKey");

const ticketRef = ref(database, `tickets/${ticketKey}`);


ticketInfo.textContent = `Ticket generado correctamente`;

tiempoInfo.textContent = `Tiempo estimado: 15 min`;


// CANCELAR

btnCancelar.addEventListener("click", async () => {

  await update(ticketRef, {

    estado: "cancelado"

  });

  window.location.href = "cancel.html";

});


// ACEPTAR

btnAceptar.addEventListener("click", () => {

  window.location.href = "ticket.html";

});