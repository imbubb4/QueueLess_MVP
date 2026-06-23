import { ref, push, set, update, onValue } from 'firebase/database'
import { database } from './config'
import type { Ticket, CreateTicketData } from '@/domain/entities/Ticket'
import type { TicketRepository } from '@/domain/repositories/TicketRepository'

export class FirebaseTicketRepository implements TicketRepository {
  private readonly basePath = 'tickets'

  async create(data: CreateTicketData): Promise<string> {
    const ticketsRef = ref(database, this.basePath)
    const newRef = push(ticketsRef)
    await set(newRef, data)
    return newRef.key!
  }

  async update(key: string, data: Partial<Ticket>): Promise<void> {
    const ticketRef = ref(database, `${this.basePath}/${key}`)
    await update(ticketRef, data)
  }

  onTicketChange(key: string, callback: (ticket: Ticket | null) => void): () => void {
    const ticketRef = ref(database, `${this.basePath}/${key}`)
    const unsubscribe = onValue(ticketRef, (snapshot) => {
      if (!snapshot.exists()) {
        callback(null)
        return
      }
      callback({ key, ...snapshot.val() } as Ticket)
    })
    return unsubscribe
  }

  onAllTicketsChange(callback: (tickets: Ticket[]) => void): () => void {
    const ticketsRef = ref(database, this.basePath)
    const unsubscribe = onValue(ticketsRef, (snapshot) => {
      const tickets: Ticket[] = []
      snapshot.forEach((child) => {
        tickets.push({ key: child.key!, ...child.val() } as Ticket)
      })
      callback(tickets)
    })
    return unsubscribe
  }
}
