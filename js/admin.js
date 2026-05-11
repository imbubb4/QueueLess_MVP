import {
  database,
  ref,
  onValue
} from "./firebase-config.js";

const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");

const adminUser = document.getElementById("adminUser");
const adminPass = document.getElementById("adminPass");

const btnLogin = document.getElementById("btnLogin");

const errorLogin = document.getElementById("errorLogin");

const listaTickets = document.getElementById("listaTickets");


// LOGIN SIMPLE

btnLogin.addEventListener("click", () => {

  const user = adminUser.value.trim();
  const pass = adminPass.value.trim();

if (user === "admin" && pass === "1234") {

  sessionStorage.setItem("adminAuth", "true");

  loginSection.classList.add("hidden");

  dashboardSection.classList.remove("hidden");

  cargarTickets();

  } else {

    errorLogin.textContent = "Usuario o contraseña incorrectos";

  }

});


// CARGAR TICKETS

function cargarTickets() {

  const ticketsRef = ref(database, "tickets");

  onValue(ticketsRef, (snapshot) => {


    // Collect tickets first to compute counts and render cleanly
    const tickets = [];
    snapshot.forEach((childSnapshot) => {
      tickets.push({ key: childSnapshot.key, ...childSnapshot.val() });
    });

    const active = tickets.filter(t => t.estado !== "finalizado" && t.estado !== "cancelado");

    const countEl = document.getElementById('ticketsCount');
    if (countEl) countEl.textContent = active.length;

    listaTickets.innerHTML = "";

    if (active.length === 0) {
      listaTickets.innerHTML = `<p class="label">No hay clientes en cola</p>`;
      return;
    }

    active.forEach((ticket) => {
      listaTickets.innerHTML += `
        <div class="ticket clickable">
          <div class="info-row">
            <div>
              <div class="label">${ticket.nombre}</div>
              <div class="value">${ticket.ticketId}</div>
            </div>
            <div class="badge">${ticket.estado}</div>
          </div>

          <div class="info-row" style="margin-top:8px;">
            <div class="label">Tiempo</div>
            <div class="value">${ticket.tiempoEstimado} min</div>
          </div>

          <div style="margin-top:10px;">
            <button onclick="verDetalle('${ticket.key}')">Ver detalle</button>
          </div>
        </div>
      `;
    });

  });

}


// REDIRECCIÓN

window.verDetalle = (id) => {

  window.location.href = `admin-detail.html?id=${id}`;

};

// MANTENER SESIÓN

const auth = sessionStorage.getItem("adminAuth");

if (auth === "true") {

  loginSection.classList.add("hidden");

  dashboardSection.classList.remove("hidden");

  cargarTickets();

};