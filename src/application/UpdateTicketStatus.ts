import type { TicketRepository } from '../domain/repositories/TicketRepository'
import type { TicketStatus } from '../domain/entities/Ticket'

export class UpdateTicketStatus {
  constructor(private readonly repo: TicketRepository) {}

  async execute(key: string, estado: TicketStatus): Promise<void> {
    await this.repo.update(key, { estado })
  }
}
