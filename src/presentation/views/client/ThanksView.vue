<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="card text-center">
        <div class="thanks-icon">🎉</div>
        <h1>¡Gracias!</h1>
        <p>Tu calificación ha sido enviada. Esperamos verte pronto.</p>

        <div class="actions mt-4">
          <button class="btn btn--secondary" @click="router.push('/')">
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.thanks-icon {
  font-size: 3rem;
  margin-bottom: 12px;
}
</style>
