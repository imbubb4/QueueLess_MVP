import type { TicketRepository } from '../domain/repositories/TicketRepository'
import type { CreateTicketData } from '../domain/entities/Ticket'

export class CreateTicket {
  constructor(private readonly repo: TicketRepository) {}

  async execute(nombre: string): Promise<string> {
    const ticketId = this.generateTicketId()
    const data: CreateTicketData = {
      nombre,
      ticketId,
      estado: 'espera',
      tiempoEstimado: 15,
      listoParaCalificar: false,
      creado: Date.now(),
    }
    return this.repo.create(data)
  }

  private generateTicketId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }
}
