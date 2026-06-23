<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTicketStore } from '@/presentation/stores/ticketStore'

const router = useRouter()
const store = useTicketStore()

if (!store.hasTicket) {
  router.replace('/')
}

// Countdown
const timeLeft = ref(15 * 60)
const toast = ref('')
let interval: ReturnType<typeof setInterval> | null = null

const formattedTime = () => {
  const min = Math.floor(timeLeft.value / 60)
  const sec = timeLeft.value % 60
  return `${min}:${sec < 10 ? '0' : ''}${sec}`
}

function showToast(text: string) {
  toast.value = text
  setTimeout(() => (toast.value = ''), 4000)
}

onMounted(() => {
  store.subscribeToTicket()

  interval = setInterval(() => {
    if (timeLeft.value <= 0) return
    timeLeft.value--

    if (timeLeft.value === 600) showToast('⏰ Faltan 10 minutos para tu turno')
    if (timeLeft.value === 300) showToast('⏰ Faltan 5 minutos para tu turno')
    if (timeLeft.value === 0) showToast('🎉 ¡Ya es tu turno!')
  }, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})

// Watch for admin finalization → redirect to rating
watch(
  () => store.currentTicket?.listoParaCalificar,
  (ready) => {
    if (ready) router.push('/rating')
  }
)

async function iArrived() {
  await store.updateStatus('cliente_llego')
  router.push('/service')
}

async function cancelQueue() {
  await store.updateStatus('cancelado')
  store.clearTicket()
  router.push('/cancelled')
}
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="card">
        <h1>Tu Ticket</h1>

        <div class="info-row">
          <span class="label">Código</span>
          <span class="value">{{ store.currentTicket?.ticketId ?? '---' }}</span>
        </div>

        <div class="info-row">
          <span class="label">Estado</span>
          <span class="badge">{{ store.currentTicket?.estado ?? '---' }}</span>
        </div>

        <div class="info-row">
          <span class="label">Tiempo estimado</span>
          <span class="value">{{ store.currentTicket?.tiempoEstimado ?? 15 }} min</span>
        </div>

        <div class="countdown">
          <span class="countdown__label">Tiempo restante</span>
          <span class="countdown__time">{{ formattedTime() }}</span>
        </div>

        <div class="actions">
          <button class="btn btn--primary" @click="iArrived">Llegué</button>
          <button class="btn btn--danger" @click="cancelQueue">Cancelar</button>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="toast" class="toast">{{ toast }}</div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
@use '@/presentation/styles/variables' as *;

.countdown {
  text-align: center;
  margin: 20px 0;
  padding: 20px;
  background: $gray-50;
  border-radius: $radius-md;
  border: 1px solid $border;

  &__label {
    display: block;
    font-size: 0.85rem;
    color: $text-secondary;
    margin-bottom: 8px;
  }

  &__time {
    font-size: 2.5rem;
    font-weight: 700;
    color: $accent;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
