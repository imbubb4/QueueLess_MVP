<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/presentation/stores/adminStore'

const router = useRouter()
const store = useAdminStore()

// Login form
const user = ref('')
const pass = ref('')
const loginError = ref('')

function handleLogin() {
  const success = store.login(user.value.trim(), pass.value.trim())
  if (!success) {
    loginError.value = 'Usuario o contraseña incorrectos'
  } else {
    loginError.value = ''
    store.subscribeToTickets()
  }
}

function goToDetail(key: string) {
  router.push(`/admin/detail/${key}`)
}

onMounted(() => {
  if (store.isAuthenticated) {
    store.subscribeToTickets()
  }
})
</script>

<template>
  <div class="page">
    <div class="container">
      <!-- LOGIN -->
      <div v-if="!store.isAuthenticated" class="card">
        <h1>QueueLess Admin</h1>
        <p class="mb-4">Ingresa tus credenciales</p>

        <input
          v-model="user"
          type="text"
          placeholder="Usuario"
          @keyup.enter="handleLogin"
        />
        <input
          v-model="pass"
          type="password"
          placeholder="Contraseña"
          @keyup.enter="handleLogin"
        />

        <p v-if="loginError" class="error-text">{{ loginError }}</p>

        <div class="actions">
          <button class="btn btn--primary" @click="handleLogin">Ingresar</button>
        </div>
      </div>

      <!-- DASHBOARD -->
      <template v-else>
        <div class="dashboard-header">
          <h1>Dashboard</h1>
          <div class="badge">{{ store.activeTickets.length }} en cola</div>
        </div>

        <div v-if="store.activeTickets.length === 0" class="card text-center">
          <p>No hay clientes en cola</p>
        </div>

        <div
          v-for="ticket in store.activeTickets"
          :key="ticket.key"
          class="card ticket-item"
          @click="goToDetail(ticket.key)"
        >
          <div class="info-row">
            <div>
              <div class="label">{{ ticket.nombre }}</div>
              <div class="value">{{ ticket.ticketId }}</div>
            </div>
            <span class="badge">{{ ticket.estado }}</span>
          </div>
          <div class="info-row">
            <span class="label">Tiempo</span>
            <span class="value">{{ ticket.tiempoEstimado }} min</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/presentation/styles/variables' as *;

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.ticket-item {
  cursor: pointer;
  margin-bottom: 12px;
  transition: transform $transition-fast, box-shadow $transition-fast;

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-md;
  }
}

.error-text {
  color: #dc2626;
  font-size: 0.85rem;
  margin-top: 4px;
  margin-bottom: 8px;
}
</style>
