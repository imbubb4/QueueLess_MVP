import {
  database,
  ref,
  onValue
} from "./firebase-config.js";

const serviceTicket =
  document.getElementById("serviceTicket");

const serviceEstado =
  document.getElementById("serviceEstado");


const btnCalificar =
  document.getElementById("btnCalificar");


const ticketKey =
  localStorage.getItem("ticketKey");


if (!ticketKey) {

  window.location.href = "index.html";

}


const ticketRef =
  ref(database, `tickets/${ticketKey}`);


// REALTIME

onValue(ticketRef, (snapshot) => {

  const data = snapshot.val();

  if (!data) return;

  serviceTicket.textContent =
    `Ticket: ${data.ticketId}`;

  serviceEstado.textContent =
    `Estado: ${data.estado}`;

});


// IR A CALIFICAR

btnCalificar.addEventListener("click", () => {

  window.location.href = "rating.html";

});