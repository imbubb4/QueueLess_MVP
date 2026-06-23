import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ticket } from '@/domain/entities/Ticket'
import { FirebaseTicketRepository } from '@/infrastructure/firebase/FirebaseTicketRepository'
import { FinalizeService } from '@/application/FinalizeService'

const repo = new FirebaseTicketRepository()

export const useAdminStore = defineStore('admin', () => {
  const isAuthenticated = ref(sessionStorage.getItem('adminAuth') === 'true')
  const tickets = ref<Ticket[]>([])
  const loading = ref(false)

  let unsubscribe: (() => void) | null = null

  const activeTickets = computed(() =>
    tickets.value.filter((t) => t.estado !== 'finalizado' && t.estado !== 'cancelado')
  )

  function login(user: string, pass: string): boolean {
    if (user === 'admin' && pass === '1234') {
      isAuthenticated.value = true
      sessionStorage.setItem('adminAuth', 'true')
      return true
    }
    return false
  }

  function logout(): void {
    isAuthenticated.value = false
    sessionStorage.removeItem('adminAuth')
    unsubscribe?.()
    unsubscribe = null
  }

  function subscribeToTickets(): void {
    unsubscribe?.()
    unsubscribe = repo.onAllTicketsChange((allTickets) => {
      tickets.value = allTickets
    })
  }

  async function finalizeAndCallNext(currentKey: string, nextKey?: string): Promise<void> {
    const useCase = new FinalizeService(repo)
    await useCase.execute(currentKey, nextKey)
  }

  function getTicketByKey(key: string): Ticket | undefined {
    return tickets.value.find((t) => t.key === key)
  }

  return {
    isAuthenticated,
    tickets,
    loading,
    activeTickets,
    login,
    logout,
    subscribeToTickets,
    finalizeAndCallNext,
    getTicketByKey,
  }
})
