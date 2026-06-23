export type TicketStatus =
  | 'espera'
  | 'cliente_llego'
  | 'atencion'
  | 'finalizado'
  | 'cancelado'

export interface Ticket {
  key: string
  nombre: string
  ticketId: string
  estado: TicketStatus
  tiempoEstimado: number
  listoParaCalificar: boolean
  calificacion?: number
  creado: number
}

export interface CreateTicketData {
  nombre: string
  ticketId: string
  estado: TicketStatus
  tiempoEstimado: number
  listoParaCalificar: boolean
  creado: number
}
