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

  // Mostrar skeleton overlay mientras se procesa el registro
  const skeleton = document.getElementById('skeletonOverlay');
  try {
    skeleton.classList.remove('hidden');
    btnEntrar.disabled = true;
    nombreInput.disabled = true;
  } catch (e) {}

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

  // nota: redirección sucederá inmediatamente después de crear el ticket
  // no es necesario ocultar el skeleton aquí porque la página navegará.

  // GUARDAR LOCAL

  localStorage.setItem("ticketKey", nuevoTicket.key);

  // REDIRECCIÓN

  window.location.href = "confirm.html";

});