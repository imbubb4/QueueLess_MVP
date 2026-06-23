import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ticket } from '@/domain/entities/Ticket'
import { FirebaseTicketRepository } from '@/infrastructure/firebase/FirebaseTicketRepository'
import { CreateTicket } from '@/application/CreateTicket'
import { UpdateTicketStatus } from '@/application/UpdateTicketStatus'
import { RateService } from '@/application/RateService'

const repo = new FirebaseTicketRepository()

export const useTicketStore = defineStore('ticket', () => {
  const currentTicket = ref<Ticket | null>(null)
  const ticketKey = ref<string | null>(localStorage.getItem('ticketKey'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  let unsubscribe: (() => void) | null = null

  const hasTicket = computed(() => !!ticketKey.value)

  async function createTicket(nombre: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const useCase = new CreateTicket(repo)
      const key = await useCase.execute(nombre)
      ticketKey.value = key
      localStorage.setItem('ticketKey', key)
    } catch (e: any) {
      error.value = e.message || 'Error al crear ticket'
      throw e
    } finally {
      loading.value = false
    }
  }

  function subscribeToTicket(): void {
    if (!ticketKey.value) return
    unsubscribe?.()
    unsubscribe = repo.onTicketChange(ticketKey.value, (ticket) => {
      currentTicket.value = ticket
    })
  }

  async function updateStatus(estado: Ticket['estado']): Promise<void> {
    if (!ticketKey.value) return
    const useCase = new UpdateTicketStatus(repo)
    await useCase.execute(ticketKey.value, estado)
  }

  async function rateAndFinish(calificacion: number): Promise<void> {
    if (!ticketKey.value) return
    const useCase = new RateService(repo)
    await useCase.execute(ticketKey.value, calificacion)
    clearTicket()
  }

  function clearTicket(): void {
    unsubscribe?.()
    unsubscribe = null
    currentTicket.value = null
    ticketKey.value = null
    localStorage.removeItem('ticketKey')
  }

  return {
    currentTicket,
    ticketKey,
    loading,
    error,
    hasTicket,
    createTicket,
    subscribeToTicket,
    updateStatus,
    rateAndFinish,
    clearTicket,
  }
})
