import type { Ticket, CreateTicketData } from '../entities/Ticket'

export interface TicketRepository {
  create(data: CreateTicketData): Promise<string>
  update(key: string, data: Partial<Ticket>): Promise<void>
  onTicketChange(key: string, callback: (ticket: Ticket | null) => void): () => void
  onAllTicketsChange(callback: (tickets: Ticket[]) => void): () => void
}
