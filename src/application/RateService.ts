import type { TicketRepository } from '../domain/repositories/TicketRepository'

export class RateService {
  constructor(private readonly repo: TicketRepository) {}

  async execute(key: string, calificacion: number): Promise<void> {
    await this.repo.update(key, {
      estado: 'finalizado',
      calificacion,
    })
  }
}
