export type Role = 'responsavel' | 'aluno' | 'professor' | 'admin'
export type CategoriaRegistro = 'Comportamento' | 'Desempenho' | 'Aviso' | 'Elogio' | 'Participação'
export type ViewName =
  | 'inicio'
  | 'timeline'
  | 'tarefas'
  | 'chat'
  | 'avisos'
  | 'registros'
  | 'nova-tarefa'
  | 'recados'
  | 'painel'
  | 'usuarios'
  | 'turmas'

export interface User {
  id: string
  nome: string
  email: string
  role: Role
  turmaId?: string
  filhosIds?: string[]
  materia?: string
}

export interface Aluno {
  id: string
  nome: string
  turmaId: string
  turmaLabel: string
  responsavelIds: string[]
}

export interface Turma {
  id: string
  label: string
  anoSerie: string
  professorIds: string[]
  alunoIds: string[]
}

export interface Registro {
  id: string
  alunoId: string
  professorId: string
  professorNome: string
  categoria: CategoriaRegistro
  descricao: string
  urgencia: 'Normal' | 'Importante'
  dataHora: string
  vistoResponsavel: boolean
}

export interface Tarefa {
  id: string
  titulo: string
  descricao: string
  materia: string
  professorNome: string
  dataEntrega: string
  materialNecessario: string
  turmaId: string
}

export interface Mensagem {
  id: string
  remetenteId: string
  remetenteNome: string
  texto: string
  dataHora: string
}

export interface Conversa {
  id: string
  professorId: string
  professorNome: string
  responsavelId: string
  responsavelNome: string
  alunoId: string
  alunoNome: string
  mensagens: Mensagem[]
}

export interface Aviso {
  id: string
  titulo: string
  texto: string
  autor: string
  dataHora: string
  turmaId: string
  urgente: boolean
}

export type CalendarEventType = 'assignment' | 'project' | 'exam' | 'school-event'

export interface CalendarEvent {
  id: string
  studentId: string
  title: string
  type: CalendarEventType
  date: string
  time: string | null
  subject: string
  teacher: string
  description: string
}
