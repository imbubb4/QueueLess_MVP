<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTicketStore } from '@/presentation/stores/ticketStore'

const router = useRouter()
const store = useTicketStore()

if (!store.hasTicket) {
  router.replace('/')
}

const selectedRating = ref(5)
const hoveredRating = ref(0)
const isSubmitting = ref(false)

function displayRating(index: number): boolean {
  const active = hoveredRating.value || selectedRating.value
  return index <= active
}

async function submitRating() {
  isSubmitting.value = true
  await store.rateAndFinish(selectedRating.value)
  router.push('/thanks')
}
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="card text-center">
        <h1>Califica tu experiencia</h1>
        <p class="mb-4">¿Cómo fue tu atención?</p>

        <div class="stars">
          <button
            v-for="i in 5"
            :key="i"
            class="star"
            :class="{ filled: displayRating(i) }"
            @click="selectedRating = i"
            @mouseenter="hoveredRating = i"
            @mouseleave="hoveredRating = 0"
            :aria-label="`${i} estrella${i > 1 ? 's' : ''}`"
          >
            ★
          </button>
        </div>

        <div class="actions">
          <button
            class="btn btn--primary"
            :disabled="isSubmitting"
            @click="submitRating"
          >
            {{ isSubmitting ? 'Enviando...' : 'Enviar calificación' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/presentation/styles/variables' as *;

.stars {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 20px 0;
}

.star {
  all: unset;
  cursor: pointer;
  font-size: 2.4rem;
  color: $gray-300;
  padding: 6px;
  border-radius: $radius-sm;
  transition: color 120ms ease, transform 120ms ease;
  user-select: none;

  &:hover {
    transform: scale(1.1);
  }

  &.filled {
    color: $accent;
  }
}
</style>
