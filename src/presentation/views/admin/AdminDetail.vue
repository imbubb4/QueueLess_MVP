<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/presentation/stores/adminStore'

const props = defineProps<{ id: string }>()
const router = useRouter()
const store = useAdminStore()

if (!store.isAuthenticated) {
  router.replace('/admin')
}

onMounted(() => {
  store.subscribeToTickets()
})

const currentTicket = computed(() => store.getTicketByKey(props.id))

const nextTicket = computed(() => {
  const active = store.activeTickets
  const idx = active.findIndex((t) => t.key === props.id)
  return idx >= 0 && idx < active.length - 1 ? active[idx + 1] : undefined
})

function statusLabel(estado: string): string {
  if (estado === 'cliente_llego') return '✅ Cliente llegó'
  return estado
}

async function finalize() {
  await store.finalizeAndCallNext(props.id, nextTicket.value?.key)
  router.push('/admin')
}
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="card">
        <h1>Detalle del cliente</h1>

        <template v-if="currentTicket">
          <div class="info-row">
            <span class="label">Nombre</span>
            <span class="value">{{ currentTicket.nombre }}</span>
          </div>
          <div class="info-row">
            <span class="label">Ticket</span>
            <span class="value">{{ currentTicket.ticketId }}</span>
          </div>
          <div class="info-row">
            <span class="label">Estado</span>
            <span class="badge">{{ statusLabel(currentTicket.estado) }}</span>
          </div>
          <div class="info-row">
            <span class="label">Tiempo</span>
            <span class="value">{{ currentTicket.tiempoEstimado }} min</span>
          </div>
        </template>

        <div v-if="nextTicket" class="next-section">
          <h2>Siguiente en cola</h2>
          <div class="info-row">
            <span class="label">{{ nextTicket.nombre }}</span>
            <span class="value">{{ nextTicket.ticketId }}</span>
          </div>
        </div>
        <div v-else class="next-section">
          <p class="text-muted">No hay más clientes en cola</p>
        </div>

        <div class="actions">
          <button class="btn btn--secondary" @click="router.push('/admin')">Volver</button>
          <button class="btn btn--primary" @click="finalize">Finalizar y llamar siguiente</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/presentation/styles/variables' as *;

.next-section {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid $border;

  h2 {
    margin-bottom: 10px;
  }
}

.text-muted {
  color: $gray-400;
  font-size: 0.9rem;
}
</style>
