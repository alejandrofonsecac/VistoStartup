export type Role = 'responsavel' | 'aluno' | 'professor' | 'admin'
export type CategoriaRegistro = 'Comportamento' | 'Desempenho' | 'Aviso' | 'Elogio' | 'Participação'
export type ViewName =
  | 'inicio'
  | 'timeline'
  | 'tarefas'
  | 'notas'
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
  alunoId?: string
  titulo: string
  descricao: string
  materia: string
  professorNome: string
  dataEntrega: string
  materialNecessario: string
  turmaId: string
  concluida?: boolean
  concluidaEm?: string | null
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
  diretoriaId: string
  diretoriaNome: string
  contatoId: string
  contatoNome: string
  contatoRole: 'responsavel' | 'professor'
  alunoId?: string
  alunoNome?: string
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
  turmaId: string
  studentId?: string
  title: string
  type: CalendarEventType
  date: string
  time: string | null
  subject: string
  teacher: string
  description: string
}

export type Trimester = 1 | 2 | 3

export interface GradeAssessment {
  id: string
  name: string
  grade: number | null
  date: string | null
  type: 'regular' | 'recovery'
}

export interface SubjectGrade {
  id: string
  name: string
  teacher: string
  assessments: GradeAssessment[]
}
