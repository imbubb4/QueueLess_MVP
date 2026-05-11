import {
  database,
  ref,
  push,
  set
} from "./firebase-config.js";

const nombreInput = document.getElementById("nombre");

const btnEntrar = document.getElementById("btnEntrar");


btnEntrar.addEventListener("click", async () => {

  const nombre = nombreInput.value.trim();

  if (!nombre) {

    alert("Ingresa tu nombre");

    return;

  }

  const ticketsRef = ref(database, "tickets");

  const nuevoTicket = push(ticketsRef);

  const ticketId = nuevoTicket.key.slice(0,5).toUpperCase();

  const tiempoEstimado = 15;

  await set(nuevoTicket, {

    nombre,
    ticketId,
    estado: "espera",
    tiempoEstimado,
    listoParaCalificar: false,
    creado: Date.now()

  });

  // GUARDAR LOCAL

  localStorage.setItem("ticketKey", nuevoTicket.key);

  // REDIRECCIÓN

  window.location.href = "confirm.html";

});