<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTicketStore } from '@/presentation/stores/ticketStore'

const router = useRouter()
const store = useTicketStore()

if (!store.hasTicket) {
  router.replace('/')
}

async function cancel() {
  await store.updateStatus('cancelado')
  store.clearTicket()
  router.push('/cancelled')
}

function accept() {
  router.push('/ticket')
}
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="card text-center">
        <div class="confirm-icon">✓</div>
        <h1>Ticket generado</h1>
        <p>Tu lugar en la cola ha sido reservado.</p>

        <div class="info-row mt-4">
          <span class="label">Tiempo estimado</span>
          <span class="value">15 min</span>
        </div>

        <div class="actions">
          <button class="btn btn--primary" @click="accept">Aceptar</button>
          <button class="btn btn--secondary" @click="cancel">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/presentation/styles/variables' as *;

.confirm-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: $accent-light;
  color: $accent;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
</style>
