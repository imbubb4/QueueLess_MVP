import type { TicketRepository } from '../domain/repositories/TicketRepository'

export class FinalizeService {
  constructor(private readonly repo: TicketRepository) {}

  async execute(currentKey: string, nextKey?: string): Promise<void> {
    await this.repo.update(currentKey, {
      estado: 'finalizado',
      listoParaCalificar: true,
    })

    if (nextKey) {
      await this.repo.update(nextKey, { estado: 'atencion' })
    }
  }
}
