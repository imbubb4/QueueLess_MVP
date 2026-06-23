<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTicketStore } from '@/presentation/stores/ticketStore'

const router = useRouter()
const store = useTicketStore()

const nombre = ref('')
const isSubmitting = ref(false)

// Si ya tiene un ticket activo, redirigir
if (store.hasTicket) {
  router.replace('/ticket')
}

async function enterQueue() {
  const trimmed = nombre.value.trim()
  if (!trimmed) return

  isSubmitting.value = true
  try {
    await store.createTicket(trimmed)
    router.push('/confirm')
  } catch {
    // error is handled in store
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="page">
    <div class="container">
      <header class="brand">
        <div class="brand__logo">Q</div>
        <div>
          <h1 class="brand__title">QueueLess</h1>
          <p class="brand__subtitle">Colas virtuales, rápidas y sencillas</p>
        </div>
      </header>

      <div class="card">
        <h2>Ingresa a la cola virtual</h2>
        <p class="mb-4">Escribe tu nombre para generar un ticket</p>

        <input
          v-model="nombre"
          type="text"
          placeholder="Tu nombre"
          @keyup.enter="enterQueue"
          :disabled="isSubmitting"
        />

        <p v-if="store.error" class="error-text">{{ store.error }}</p>

        <div class="actions">
          <button
            class="btn btn--primary"
            :disabled="!nombre.trim() || isSubmitting"
            @click="enterQueue"
          >
            {{ isSubmitting ? 'Generando...' : 'Entrar a la cola' }}
          </button>
        </div>
      </div>

      <p class="footer-text">Pequeño MVP — presentado con cariño.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/presentation/styles/variables' as *;

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;

  &__logo {
    width: 48px;
    height: 48px;
    border-radius: $radius-md;
    background: $accent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $white;
    font-weight: 700;
    font-size: 1.2rem;
    box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
  }

  &__title {
    font-size: 1.2rem;
    margin-bottom: 0;
  }

  &__subtitle {
    font-size: 0.85rem;
    color: $text-secondary;
  }
}

.error-text {
  color: #dc2626;
  font-size: 0.85rem;
  margin-top: 8px;
}

.footer-text {
  text-align: center;
  font-size: 0.85rem;
  color: $gray-400;
  margin-top: 20px;
}
</style>
