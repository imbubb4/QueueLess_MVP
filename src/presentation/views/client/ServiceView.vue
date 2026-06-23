<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTicketStore } from '@/presentation/stores/ticketStore'

const router = useRouter()
const store = useTicketStore()

if (!store.hasTicket) {
  router.replace('/')
}

onMounted(() => {
  store.subscribeToTicket()
})

// Watch for admin finalization
watch(
  () => store.currentTicket?.listoParaCalificar,
  (ready) => {
    if (ready) router.push('/rating')
  }
)
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="card text-center">
        <div class="service-icon">🏪</div>
        <h1>Servicio en curso</h1>
        <p>Estás siendo atendido</p>

        <div class="info-row mt-4">
          <span class="label">Ticket</span>
          <span class="value">{{ store.currentTicket?.ticketId ?? '---' }}</span>
        </div>

        <div class="info-row">
          <span class="label">Estado</span>
          <span class="badge">{{ store.currentTicket?.estado ?? '---' }}</span>
        </div>

        <p class="hint mt-4">Cuando tu atención finalice, te redirigiremos automáticamente a calificar.</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/presentation/styles/variables' as *;

.service-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.hint {
  font-size: 0.85rem;
  color: $gray-400;
  font-style: italic;
}
</style>
