import type { User, Aluno, Turma, Registro, Tarefa, Conversa, Aviso } from './types'

export const USUARIOS: User[] = [
  { id: 'u1', nome: 'Carlos Oliveira', email: 'responsavel@escola.edu.br', role: 'responsavel', filhosIds: ['a1', 'a2'] },
  { id: 'u2', nome: 'Lucas Oliveira', email: 'aluno@escola.edu.br', role: 'aluno', turmaId: 't1' },
  { id: 'u3', nome: 'Ana Costa', email: 'professor@escola.edu.br', role: 'professor', materia: 'Matemática' },
  { id: 'u4', nome: 'Fernanda Lima', email: 'admin@escola.edu.br', role: 'admin' },
  { id: 'u5', nome: 'Roberto Ferreira', email: 'roberto@escola.edu.br', role: 'professor', materia: 'Português' },
  { id: 'u6', nome: 'Beatriz Santos', email: 'beatriz@escola.edu.br', role: 'responsavel', filhosIds: ['a3'] },
]

export const ALUNOS: Aluno[] = [
  { id: 'a1', nome: 'Lucas Oliveira', turmaId: 't1', turmaLabel: '8º Ano A', responsavelIds: ['u1'] },
  { id: 'a2', nome: 'Sofia Oliveira', turmaId: 't2', turmaLabel: '6º Ano B', responsavelIds: ['u1'] },
  { id: 'a3', nome: 'Marina Santos', turmaId: 't1', turmaLabel: '8º Ano A', responsavelIds: ['u6'] },
  { id: 'a4', nome: 'Pedro Ferreira', turmaId: 't1', turmaLabel: '8º Ano A', responsavelIds: [] },
  { id: 'a5', nome: 'Juliana Mendes', turmaId: 't2', turmaLabel: '6º Ano B', responsavelIds: [] },
  { id: 'a6', nome: 'Rafael Costa', turmaId: 't1', turmaLabel: '8º Ano A', responsavelIds: [] },
]

export const TURMAS: Turma[] = [
  { id: 't1', label: '8º Ano A', anoSerie: '8º Ano', professorIds: ['u3', 'u5'], alunoIds: ['a1', 'a3', 'a4', 'a6'] },
  { id: 't2', label: '6º Ano B', anoSerie: '6º Ano', professorIds: ['u3', 'u5'], alunoIds: ['a2', 'a5'] },
  { id: 't3', label: '9º Ano A', anoSerie: '9º Ano', professorIds: ['u3'], alunoIds: [] },
]

export const REGISTROS_INICIAIS: Registro[] = [
  {
    id: 'r1', alunoId: 'a1', professorId: 'u3', professorNome: 'Profa. Ana Costa',
    categoria: 'Desempenho',
    descricao: 'Lucas demonstrou boa compreensão nos exercícios de equações do 2º grau. Participou ativamente da aula e ajudou colegas.',
    urgencia: 'Normal', dataHora: '2026-08-14T10:30:00', vistoResponsavel: false,
  },
  {
    id: 'r2', alunoId: 'a1', professorId: 'u3', professorNome: 'Profa. Ana Costa',
    categoria: 'Comportamento',
    descricao: 'Chegou atrasado pela terceira vez nesta semana. Foi orientado sobre a importância da pontualidade.',
    urgencia: 'Importante', dataHora: '2026-08-13T08:15:00', vistoResponsavel: false,
  },
  {
    id: 'r3', alunoId: 'a1', professorId: 'u3', professorNome: 'Profa. Ana Costa',
    categoria: 'Elogio',
    descricao: 'Excelente trabalho entregue sobre Geometria. Criatividade e capricho acima do esperado pela turma.',
    urgencia: 'Normal', dataHora: '2026-08-10T14:00:00', vistoResponsavel: true,
  },
  {
    id: 'r4', alunoId: 'a1', professorId: 'u3', professorNome: 'Profa. Ana Costa',
    categoria: 'Aviso',
    descricao: 'Prova de recuperação marcada para o dia 20/08. Tema: frações e proporções. Material de estudo já enviado.',
    urgencia: 'Importante', dataHora: '2026-08-08T09:00:00', vistoResponsavel: true,
  },
  {
    id: 'r5', alunoId: 'a1', professorId: 'u3', professorNome: 'Profa. Ana Costa',
    categoria: 'Participação',
    descricao: 'Participou do projeto interdisciplinar com a turma. Boa integração com os colegas durante toda a atividade.',
    urgencia: 'Normal', dataHora: '2026-08-05T11:00:00', vistoResponsavel: true,
  },
  {
    id: 'r6', alunoId: 'a2', professorId: 'u5', professorNome: 'Prof. Roberto Ferreira',
    categoria: 'Desempenho',
    descricao: 'Sofia tem se destacado nas atividades de leitura e interpretação de texto. Entrega os trabalhos com antecedência.',
    urgencia: 'Normal', dataHora: '2026-08-12T10:00:00', vistoResponsavel: false,
  },
  {
    id: 'r7', alunoId: 'a3', professorId: 'u3', professorNome: 'Profa. Ana Costa',
    categoria: 'Comportamento',
    descricao: 'Marina apresentou dificuldades para se concentrar durante a explicação. Sugiro atenção especial dos responsáveis.',
    urgencia: 'Importante', dataHora: '2026-08-13T11:00:00', vistoResponsavel: false,
  },
  {
    id: 'r8', alunoId: 'a4', professorId: 'u3', professorNome: 'Profa. Ana Costa',
    categoria: 'Elogio',
    descricao: 'Pedro tirou nota máxima na prova de Geometria. Parabéns pelo esforço e dedicação.',
    urgencia: 'Normal', dataHora: '2026-08-11T09:30:00', vistoResponsavel: true,
  },
]

export const TAREFAS_INICIAIS: Tarefa[] = [
  {
    id: 'ta1', titulo: 'Lista de Exercícios — Equações', descricao: 'Resolver os exercícios 1 ao 20 da lista distribuída em sala. Mostrar todos os cálculos detalhadamente.',
    materia: 'Matemática', professorNome: 'Profa. Ana Costa', dataEntrega: '2026-08-18',
    materialNecessario: 'Lista impressa, lápis e borracha', turmaId: 't1',
  },
  {
    id: 'ta2', titulo: 'Redação: Meio Ambiente', descricao: 'Escrever uma redação de 25 a 30 linhas sobre a importância da preservação ambiental na cidade. Dissertativo-argumentativo.',
    materia: 'Português', professorNome: 'Prof. Roberto Ferreira', dataEntrega: '2026-08-20',
    materialNecessario: 'Folha pautada ou arquivo digital (Word/PDF)', turmaId: 't1',
  },
  {
    id: 'ta3', titulo: 'Pesquisa: Independência do Brasil', descricao: 'Pesquisar e apresentar os principais eventos que levaram à Independência do Brasil em 1822. Mínimo de 3 fontes.',
    materia: 'História', professorNome: 'Prof. Marcos Andrade', dataEntrega: '2026-08-22',
    materialNecessario: 'Cartolina e canetas coloridas para apresentação oral', turmaId: 't1',
  },
  {
    id: 'ta4', titulo: 'Mapa Conceitual: Ecossistemas', descricao: 'Criar um mapa conceitual relacionando os principais ecossistemas brasileiros e suas características.',
    materia: 'Ciências', professorNome: 'Profa. Lúcia Pires', dataEntrega: '2026-08-25',
    materialNecessario: 'Folha A3, lápis de cor e régua', turmaId: 't1',
  },
  {
    id: 'ta5', titulo: 'Produção Textual: Conto', descricao: 'Produzir um conto de no mínimo 2 páginas com início, meio e fim bem definidos. Tema livre.',
    materia: 'Português', professorNome: 'Prof. Roberto Ferreira', dataEntrega: '2026-08-28',
    materialNecessario: 'Caderno de Português', turmaId: 't2',
  },
  {
    id: 'th1', alunoId: 'a1', titulo: 'Produção textual: Crônica', descricao: 'Escrever uma crônica sobre uma situação do cotidiano, com título e revisão ortográfica.',
    materia: 'Português', professorNome: 'Prof. Roberto Ferreira', dataEntrega: '2026-08-10', materialNecessario: 'Caderno de Português', turmaId: 't1', concluida: true, concluidaEm: '2026-08-09',
  },
  {
    id: 'th2', alunoId: 'a1', titulo: 'Lista de exercícios: Frações', descricao: 'Resolver a lista de frações e proporções entregue pela professora.',
    materia: 'Matemática', professorNome: 'Profa. Ana Costa', dataEntrega: '2026-08-12', materialNecessario: 'Lista impressa', turmaId: 't1', concluida: false, concluidaEm: null,
  },
  {
    id: 'th3', alunoId: 'a1', titulo: 'Pesquisa sobre Brasil Colônia', descricao: 'Preparar um resumo com os principais acontecimentos do período colonial.',
    materia: 'História', professorNome: 'Prof. Marcos Andrade', dataEntrega: '2026-08-07', materialNecessario: 'Caderno de História', turmaId: 't1', concluida: true, concluidaEm: '2026-08-07',
  },
  {
    id: 'th4', alunoId: 'a1', titulo: 'Experimento: Ciclo da água', descricao: 'Registrar as observações do experimento realizado em sala.',
    materia: 'Ciências', professorNome: 'Profa. Lúcia Pires', dataEntrega: '2026-08-04', materialNecessario: 'Folha de atividades', turmaId: 't1', concluida: true, concluidaEm: '2026-08-03',
  },
  {
    id: 'th5', alunoId: 'a2', titulo: 'Produção textual: Carta', descricao: 'Produzir uma carta pessoal respeitando a estrutura estudada em sala.',
    materia: 'Português', professorNome: 'Prof. Roberto Ferreira', dataEntrega: '2026-08-11', materialNecessario: 'Caderno de Português', turmaId: 't2', concluida: true, concluidaEm: '2026-08-10',
  },
  {
    id: 'th6', alunoId: 'a2', titulo: 'Lista de exercícios: Multiplicação', descricao: 'Resolver os exercícios de multiplicação e divisão indicados no livro.',
    materia: 'Matemática', professorNome: 'Profa. Ana Costa', dataEntrega: '2026-08-08', materialNecessario: 'Livro didático', turmaId: 't2', concluida: false, concluidaEm: null,
  },
  {
    id: 'th7', alunoId: 'a2', titulo: 'Trabalho: Ecossistemas brasileiros', descricao: 'Criar um cartaz com informações sobre um ecossistema brasileiro.',
    materia: 'Ciências', professorNome: 'Profa. Lúcia Pires', dataEntrega: '2026-08-06', materialNecessario: 'Cartolina e canetas', turmaId: 't2', concluida: true, concluidaEm: '2026-08-05',
  },
  {
    id: 'th8', alunoId: 'a2', titulo: 'Leitura: Contos populares', descricao: 'Ler os contos indicados e responder às perguntas de interpretação.',
    materia: 'Português', professorNome: 'Prof. Roberto Ferreira', dataEntrega: '2026-08-02', materialNecessario: 'Livro de leitura', turmaId: 't2', concluida: true, concluidaEm: '2026-08-02',
  },
]

export const CONVERSAS_INICIAIS: Conversa[] = [
  {
    id: 'c1',
    professorId: 'u3', professorNome: 'Profa. Ana Costa',
    responsavelId: 'u1', responsavelNome: 'Carlos Oliveira',
    alunoId: 'a1', alunoNome: 'Lucas Oliveira',
    mensagens: [
      { id: 'm1', remetenteId: 'u3', remetenteNome: 'Profa. Ana Costa', texto: 'Bom dia, Sr. Carlos! Gostaria de conversar sobre o desempenho do Lucas nas últimas provas.', dataHora: '2026-08-13T08:30:00' },
      { id: 'm2', remetenteId: 'u1', remetenteNome: 'Carlos Oliveira', texto: 'Bom dia, professora! Claro, fique à vontade. Fiquei preocupado também ao ver as notas.', dataHora: '2026-08-13T09:15:00' },
      { id: 'm3', remetenteId: 'u3', remetenteNome: 'Profa. Ana Costa', texto: 'Ele tirou 5,5 na última prova. Percebo que ele tem dificuldade com frações. Sugiro que faça as atividades extras que enviei pelo sistema. Há uma recuperação marcada para o dia 20.', dataHora: '2026-08-13T09:20:00' },
      { id: 'm4', remetenteId: 'u1', remetenteNome: 'Carlos Oliveira', texto: 'Entendido. Vou ajudá-lo em casa. Obrigado por me avisar, professora. Pode contar com o nosso apoio.', dataHora: '2026-08-13T09:45:00' },
    ],
  },
  {
    id: 'c2',
    professorId: 'u3', professorNome: 'Profa. Ana Costa',
    responsavelId: 'u6', responsavelNome: 'Beatriz Santos',
    alunoId: 'a3', alunoNome: 'Marina Santos',
    mensagens: [
      { id: 'm5', remetenteId: 'u3', remetenteNome: 'Profa. Ana Costa', texto: 'Boa tarde, Sra. Beatriz. Gostaria de conversar sobre a concentração da Marina em sala.', dataHora: '2026-08-13T14:00:00' },
    ],
  },
]

export const AVISOS_INICIAIS: Aviso[] = [
  {
    id: 'av1', titulo: 'Reunião de Pais e Mestres — 28 de agosto',
    texto: 'Convidamos todos os responsáveis para a reunião bimestral. Data: 28/08/2026, às 19h, no auditório da escola. Presença fundamental para acompanhar a situação escolar dos alunos. Haverá entrega de boletins.',
    autor: 'Coordenação Pedagógica', dataHora: '2026-08-14T07:00:00', turmaId: 'todos', urgente: true,
  },
  {
    id: 'av2', titulo: 'Não haverá aula na sexta-feira, 22/08',
    texto: 'Informamos que na próxima sexta-feira, dia 22 de agosto, não haverá aula em razão do feriado municipal. As atividades serão retomadas normalmente na segunda-feira, dia 25.',
    autor: 'Secretaria', dataHora: '2026-08-13T15:00:00', turmaId: 'todos', urgente: false,
  },
  {
    id: 'av3', titulo: 'Trazer material de Arte — aula de quinta',
    texto: 'Para a aula de quinta-feira, dia 21/08, os alunos devem trazer: tinta guache, pincel e folha A4. Quem não trouxer o material não poderá participar da atividade prática.',
    autor: 'Profa. Carla Vieira', dataHora: '2026-08-12T10:00:00', turmaId: 't1', urgente: false,
  },
  {
    id: 'av4', titulo: 'Passeio ao Museu de Arte — inscrições abertas',
    texto: 'Estão abertas as inscrições para o passeio ao Museu de Arte do Estado, previsto para o dia 05/09. Custo: R$ 20,00 (transporte + entrada). Inscrever-se com a coordenação até 25/08.',
    autor: 'Coordenação', dataHora: '2026-08-11T09:00:00', turmaId: 'todos', urgente: false,
  },
]

export const CREDENCIAIS = [
  { email: 'responsavel@escola.edu.br', senha: '123456', userId: 'u1' },
  { email: 'aluno@escola.edu.br', senha: '123456', userId: 'u2' },
  { email: 'professor@escola.edu.br', senha: '123456', userId: 'u3' },
  { email: 'admin@escola.edu.br', senha: '123456', userId: 'u4' },
]
