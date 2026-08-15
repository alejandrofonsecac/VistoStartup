import type { CalendarEvent, CalendarEventType } from '../types'

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'ce1', studentId: 'a1', title: 'Lista de exercícios — Equações', type: 'assignment',
    date: '2026-08-18', time: null, subject: 'Matemática', teacher: 'Profa. Ana Costa',
    description: 'Resolver os exercícios 1 a 20 da lista distribuída em sala e registrar todos os cálculos.',
  },
  {
    id: 'ce2', studentId: 'a1', title: 'Prova de Matemática', type: 'exam',
    date: '2026-08-21', time: '08:00', subject: 'Matemática', teacher: 'Profa. Ana Costa',
    description: 'A avaliação abordará equações do 2º grau, frações e proporções. Revise os capítulos 4 e 5.',
  },
  {
    id: 'ce3', studentId: 'a1', title: 'Pesquisa: Independência do Brasil', type: 'project',
    date: '2026-08-22', time: '10:30', subject: 'História', teacher: 'Prof. Marcos Andrade',
    description: 'Preparar a pesquisa com ao menos três fontes e levar o material para a apresentação em grupo.',
  },
  {
    id: 'ce4', studentId: 'a1', title: 'Reunião de pais e mestres', type: 'school-event',
    date: '2026-08-28', time: '19:00', subject: 'Escola', teacher: 'Coordenação Pedagógica',
    description: 'Encontro bimestral no auditório para acompanhamento da turma e entrega de boletins.',
  },
  {
    id: 'ce5', studentId: 'a1', title: 'Mapa conceitual: Ecossistemas', type: 'project',
    date: '2026-09-03', time: null, subject: 'Ciências', teacher: 'Profa. Lúcia Pires',
    description: 'Criar um mapa conceitual relacionando os principais ecossistemas brasileiros e suas características.',
  },
  {
    id: 'ce6', studentId: 'a1', title: 'Passeio ao Museu de Arte', type: 'school-event',
    date: '2026-09-05', time: '08:30', subject: 'Escola', teacher: 'Coordenação',
    description: 'Passeio cultural ao Museu de Arte do Estado. Chegar à escola com 15 minutos de antecedência.',
  },
  {
    id: 'ce7', studentId: 'a2', title: 'Produção textual: Conto', type: 'assignment',
    date: '2026-08-17', time: null, subject: 'Português', teacher: 'Prof. Roberto Ferreira',
    description: 'Produzir um conto de pelo menos duas páginas, com início, meio e fim bem definidos.',
  },
  {
    id: 'ce8', studentId: 'a2', title: 'Feira de Ciências', type: 'school-event',
    date: '2026-08-20', time: '14:00', subject: 'Ciências', teacher: 'Profa. Lúcia Pires',
    description: 'Apresentação dos experimentos desenvolvidos pela turma no pátio central da escola.',
  },
  {
    id: 'ce9', studentId: 'a2', title: 'Trabalho: Minha cidade sustentável', type: 'project',
    date: '2026-08-24', time: '09:30', subject: 'Geografia', teacher: 'Prof. Eduardo Nunes',
    description: 'Entregar o cartaz e apresentar as propostas da dupla para tornar a cidade mais sustentável.',
  },
  {
    id: 'ce10', studentId: 'a2', title: 'Avaliação de leitura', type: 'exam',
    date: '2026-08-27', time: '08:00', subject: 'Português', teacher: 'Prof. Roberto Ferreira',
    description: 'Leitura e interpretação do livro trabalhado em sala durante o bimestre.',
  },
  {
    id: 'ce11', studentId: 'a2', title: 'Entrega do diário de leitura', type: 'assignment',
    date: '2026-09-02', time: null, subject: 'Português', teacher: 'Prof. Roberto Ferreira',
    description: 'Entregar o diário com os registros de leitura realizados ao longo do mês.',
  },
  {
    id: 'ce12', studentId: 'a3', title: 'Recuperação de Matemática', type: 'exam',
    date: '2026-08-26', time: '08:00', subject: 'Matemática', teacher: 'Profa. Ana Costa',
    description: 'Avaliação de recuperação sobre frações e porcentagens.',
  },
]

export const CALENDAR_EVENT_META: Record<CalendarEventType, { label: string; color: string; background: string }> = {
  assignment: { label: 'Tarefa', color: '#3F6C7A', background: '#EEF4F6' },
  project: { label: 'Trabalho', color: '#5A4A7A', background: '#F0EEF6' },
  exam: { label: 'Prova', color: '#A44A2E', background: '#FDF2EE' },
  'school-event': { label: 'Evento escolar', color: '#8A7200', background: '#FFF9CF' },
}
