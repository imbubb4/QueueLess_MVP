import {
  database,
  ref,
  update
} from "./firebase-config.js";


const btnEnviarRating =
  document.getElementById("btnEnviarRating");


const ticketKey =
  localStorage.getItem("ticketKey");


const ticketRef =
  ref(database, `tickets/${ticketKey}`);


// ENVIAR
// Stars selection (1-5)
const stars = document.querySelectorAll('.star');
let selectedRating = 5;

function updateStars(rating) {
  stars.forEach((s, i) => {
    s.textContent = i < rating ? '★' : '☆';
    s.setAttribute('aria-checked', i < rating ? 'true' : 'false');
    s.classList.toggle('filled', i < rating);
  });
}

stars.forEach((star, idx) => {
  const val = idx + 1;
  star.addEventListener('click', () => {
    selectedRating = val;
    updateStars(selectedRating);
  });
  star.addEventListener('mouseover', () => updateStars(val));
  star.addEventListener('mouseout', () => updateStars(selectedRating));
});

updateStars(selectedRating);

btnEnviarRating.addEventListener("click", async () => {

  // Mostrar overlay de envío mientras actualizamos (UI-only)
  try { document.body.classList.add('sending'); } catch (e) {}

  await update(ticketRef, {
    estado: "finalizado",
    calificacion: selectedRating
  });

  localStorage.removeItem("ticketKey");

  window.location.href = "thanks.html";

});