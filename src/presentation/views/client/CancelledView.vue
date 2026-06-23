<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="card text-center">
        <div class="cancel-icon">👋</div>
        <h1>Turno cancelado</h1>
        <p>Has salido de la cola. Si cambias de opinión, puedes volver a registrarte.</p>

        <div class="actions mt-4">
          <button class="btn btn--primary" @click="router.push('/')">
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cancel-icon {
  font-size: 3rem;
  margin-bottom: 12px;
}
</style>
