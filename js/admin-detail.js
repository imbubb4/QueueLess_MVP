import {
    database,
    ref,
    onValue,
    update
} from "./firebase-config.js";

const detalleCliente = document.getElementById("detalleCliente");

const btnFinalizar = document.getElementById("btnFinalizar");


// OBTENER ID URL

const params = new URLSearchParams(window.location.search);

const ticketId = params.get("id");


// REFERENCIAS

const ticketsRef = ref(database, "tickets");

const ticketRef = ref(database, `tickets/${ticketId}`);


// VARIABLES

let siguienteClienteKey = null;


// CARGAR INFORMACIÓN

onValue(ticketsRef, (snapshot) => {

    const tickets = [];

    snapshot.forEach((childSnapshot) => {

        const data = childSnapshot.val();

        // IGNORAR FINALIZADOS

        if (
            data.estado !== "finalizado" &&
            data.estado !== "cancelado"
        ) {

            tickets.push({
                key: childSnapshot.key,
                ...data
            });

        }

    });

    // CLIENTE ACTUAL

    const actual = tickets.find(t => t.key === ticketId);

    // SIGUIENTE CLIENTE

    const actualIndex = tickets.findIndex(t => t.key === ticketId);

    const siguiente = tickets[actualIndex + 1];

    siguienteClienteKey = siguiente?.key || null;

    // RENDER

    detalleCliente.innerHTML = `

    <div class="ticket">

      <h2>Cliente actual</h2>

      <p><strong>Nombre:</strong> ${actual?.nombre || "-"}</p>

      <p><strong>Ticket:</strong> ${actual?.ticketId || "-"}</p>

      <p>
  <strong>Estado:</strong>
  ${actual?.estado === "cliente_llego"
            ? "✅ Cliente llegó"
            : actual?.estado
        }
</p>

      <p><strong>Tiempo:</strong> ${actual?.tiempoEstimado || "-"} min</p>

    </div>

    <div class="ticket" style="margin-top:20px;">

      <h2>Siguiente en cola</h2>

      ${siguiente
            ? `
            <p><strong>Nombre:</strong> ${siguiente.nombre}</p>

            <p><strong>Ticket:</strong> ${siguiente.ticketId}</p>

            <p><strong>Tiempo:</strong> ${siguiente.tiempoEstimado} min</p>
          `
            : `
            <p>No hay más clientes en cola</p>
          `
        }

    </div>

  `;

});


// FINALIZAR Y LLAMAR SIGUIENTE

btnFinalizar.addEventListener("click", async () => {

    // FINALIZAR ACTUAL

    await update(ticketRef, {

        estado: "finalizado",
        listoParaCalificar: true

    });

    // ACTIVAR SIGUIENTE

    if (siguienteClienteKey) {

        const siguienteRef = ref(
            database,
            `tickets/${siguienteClienteKey}`
        );

        await update(siguienteRef, {

            estado: "atencion"

        });

    }

    alert("Atención finalizada");

    window.history.back();

});