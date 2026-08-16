import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, ArrowLeft, Users, School, CheckCircle2, TrendingUp, Eye, Send } from 'lucide-react'
import type { User, Aluno, Turma, Registro, Aviso, Conversa, ViewName } from '../types'
import { PageHeader, Card, CategoriaBadge, formatDate, formatTime } from '../components/Layout'

interface Props {
  user: User
  todos_usuarios: User[]
  alunos: Aluno[]
  turmas: Turma[]
  registros: Registro[]
  avisos: Aviso[]
  conversas: Conversa[]
  onEnviarMensagem: (conversaId: string, texto: string) => void
  onAbrirConversa: (contato: User, alunoId?: string) => string
  currentView: ViewName
}

const roleLabels: Record<string, string> = {
  responsavel: 'Responsável',
  aluno: 'Aluno',
  professor: 'Professor',
  admin: 'Coordenação',
}

const roleColors: Record<string, { bg: string; text: string }> = {
  responsavel: { bg: '#EEF4F6', text: '#3F6C7A' },
  aluno: { bg: '#EEF4F1', text: '#3D6E52' },
  professor: { bg: '#F0EEF6', text: '#5A4A7A' },
  admin: { bg: '#F5F0E8', text: '#7A5C2E' },
}

export default function AdminView({ user, todos_usuarios, alunos, turmas, registros, avisos, conversas, onEnviarMensagem, onAbrirConversa, currentView }: Props) {
  const alertasImportantes = registros.filter(r => r.urgencia === 'Importante' && !r.vistoResponsavel)
  const totalRegistrosSemana = registros.filter(r => {
    const d = new Date(r.dataHora)
    const agora = new Date()
    const diff = (agora.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
    return diff <= 7
  }).length

  if (currentView === 'painel') {
    return (
      <div>
        <PageHeader title="Painel Geral" subtitle="Visão consolidada da escola" />
        <div className="px-6 py-5 space-y-6 max-w-4xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Alunos', value: alunos.length, icon: <Users size={18} />, color: '#3F6C7A', bg: '#EEF4F6' },
              { label: 'Turmas', value: turmas.length, icon: <School size={18} />, color: '#3D6E52', bg: '#EEF4F1' },
              { label: 'Registros esta semana', value: totalRegistrosSemana, icon: <TrendingUp size={18} />, color: '#5A4A7A', bg: '#F0EEF6' },
              { label: 'Alertas pendentes', value: alertasImportantes.length, icon: <AlertTriangle size={18} />, color: '#A44A2E', bg: '#FDF2EE' },
            ].map(stat => (
              <Card key={stat.label} className="p-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: stat.bg, color: stat.color }}>
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{stat.value}</p>
                <p className="text-xs mt-0.5" style={{ color: '#5C6469' }}>{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Alertas importantes não vistos */}
          <div>
            <h2 className="text-base font-semibold mb-3 flex items-center gap-2" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>
              <AlertTriangle size={16} style={{ color: '#A44A2E' }} />
              Alertas não lidos pelos responsáveis
              {alertasImportantes.length > 0 && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#A44A2E', color: '#fff' }}>
                  {alertasImportantes.length}
                </span>
              )}
            </h2>
            {alertasImportantes.length === 0 ? (
              <Card className="p-5 flex items-center gap-3">
                <CheckCircle2 size={20} style={{ color: '#3D6E52' }} />
                <p className="text-sm" style={{ color: '#3D6E52' }}>Nenhum alerta pendente. Todos os responsáveis foram informados.</p>
              </Card>
            ) : (
              <div className="space-y-2">
                {alertasImportantes.map(r => {
                  const aluno = alunos.find(a => a.id === r.alunoId)
                  return (
                    <Card key={r.id} className="p-4" style={{ borderColor: '#F5C6B8' }}>
                      <div className="flex items-start gap-3">
                        <AlertTriangle size={16} style={{ color: '#A44A2E', flexShrink: 0, marginTop: 2 }} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-semibold text-sm" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{aluno?.nome}</span>
                            <span className="text-xs" style={{ color: '#5C6469', fontFamily: 'IBM Plex Mono, monospace' }}>{aluno?.turmaLabel}</span>
                            <CategoriaBadge categoria={r.categoria} urgencia={r.urgencia} />
                          </div>
                          <p className="text-sm leading-relaxed" style={{ color: '#5C6469' }}>{r.descricao}</p>
                          <p className="text-xs mt-1" style={{ color: '#5C6469', fontFamily: 'IBM Plex Mono, monospace' }}>
                            {r.professorNome} · {formatDate(r.dataHora)} · <span style={{ color: '#A44A2E' }}>Responsável ainda não viu</span>
                          </p>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>

          {/* Avisos recentes */}
          <div>
            <h2 className="text-base font-semibold mb-3" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>Recados publicados recentemente</h2>
            <div className="space-y-2">
              {avisos.slice(0, 3).map(av => (
                <Card key={av.id} className="p-4 flex items-start gap-3">
                  {av.urgente && <AlertTriangle size={15} style={{ color: '#A44A2E', flexShrink: 0, marginTop: 2 }} />}
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#23292E' }}>{av.titulo}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#5C6469', fontFamily: 'IBM Plex Mono, monospace' }}>{av.autor} · {formatDate(av.dataHora)}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'usuarios') {
    return <GestaoUsuarios usuarios={todos_usuarios} alunos={alunos} />
  }

  if (currentView === 'turmas') {
    return <GestaoTurmas turmas={turmas} alunos={alunos} todos_usuarios={todos_usuarios} />
  }

  if (currentView === 'chat') {
    return <ChatDiretoria conversas={conversas} user={user} usuarios={todos_usuarios} alunos={alunos} turmas={turmas} onEnviarMensagem={onEnviarMensagem} onAbrirConversa={onAbrirConversa} />
  }

  if (currentView === 'avisos') {
    return (
      <div>
        <PageHeader title="Alertas Importantes" subtitle="Registros urgentes de toda a escola" />
        <div className="px-6 py-5 max-w-2xl mx-auto space-y-3">
          {alertasImportantes.length === 0 ? (
            <Card className="p-8 text-center">
              <CheckCircle2 size={28} className="mx-auto mb-2" style={{ color: '#3D6E52' }} />
              <p className="font-semibold" style={{ color: '#3D6E52', fontFamily: 'Lexend, sans-serif' }}>Sem alertas pendentes</p>
              <p className="text-sm mt-1" style={{ color: '#5C6469' }}>Todos os responsáveis foram informados dos registros importantes.</p>
            </Card>
          ) : (
            alertasImportantes.map(r => {
              const aluno = alunos.find(a => a.id === r.alunoId)
              return (
                <Card key={r.id} className="p-5" style={{ borderColor: '#F5C6B8' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-sm" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{aluno?.nome}</span>
                    <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#F7F6F3', color: '#5C6469', fontFamily: 'IBM Plex Mono, monospace' }}>{aluno?.turmaLabel}</span>
                    <CategoriaBadge categoria={r.categoria} urgencia={r.urgencia} />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#5C6469' }}>{r.descricao}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs" style={{ color: '#A44A2E' }}>
                    <Eye size={12} />
                    <span>Responsável ainda não visualizou</span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: '#5C6469', fontFamily: 'IBM Plex Mono, monospace' }}>{r.professorNome} · {formatDate(r.dataHora)}</p>
                </Card>
              )
            })
          )}
        </div>
      </div>
    )
  }

  return null
}

type ContactFilter = 'responsavel' | 'professor'

function ChatDiretoria({ conversas, user, usuarios, alunos, turmas, onEnviarMensagem, onAbrirConversa }: {
  conversas: Conversa[]
  user: User
  usuarios: User[]
  alunos: Aluno[]
  turmas: Turma[]
  onEnviarMensagem: (conversaId: string, texto: string) => void
  onAbrirConversa: (contato: User, alunoId?: string) => string
}) {
  const [filter, setFilter] = useState<ContactFilter>('responsavel')
  const [turmaSelecionada, setTurmaSelecionada] = useState('')
  const [conversaSelecionada, setConversaSelecionada] = useState('')
  const [texto, setTexto] = useState('')
  const [mobileChatOpen, setMobileChatOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const responsaveisDaTurma = (turmaId: string) => usuarios.filter(usuario =>
    usuario.role === 'responsavel' && alunos.some(aluno => aluno.turmaId === turmaId && aluno.responsavelIds.includes(usuario.id))
  )
  const turmasComResponsaveis = turmas.filter(turma => responsaveisDaTurma(turma.id).length > 0)
  const responsaveis = turmaSelecionada ? responsaveisDaTurma(turmaSelecionada) : []
  const professores = usuarios.filter(usuario => usuario.role === 'professor')
  const turma = turmas.find(item => item.id === turmaSelecionada)
  const conversa = conversas.find(item => item.id === conversaSelecionada)
  const contatoDaConversa = usuarios.find(usuario => usuario.id === conversa?.contatoId)
  const alunoDaConversa = alunos.find(aluno => aluno.id === conversa?.alunoId)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversa?.id, conversa?.mensagens.length])

  const enviar = () => {
    if (!texto.trim() || !conversaSelecionada) return
    onEnviarMensagem(conversaSelecionada, texto.trim())
    setTexto('')
  }

  const selecionarFiltro = (novoFiltro: ContactFilter) => {
    setFilter(novoFiltro)
    setTurmaSelecionada('')
    setConversaSelecionada('')
    setTexto('')
    setMobileChatOpen(false)
  }

  const selecionarTurma = (turmaId: string) => {
    setTurmaSelecionada(turmaId)
    setConversaSelecionada('')
    setTexto('')
    setMobileChatOpen(false)
  }

  const selecionarContato = (contato: User, alunoId?: string) => {
    const conversaId = onAbrirConversa(contato, alunoId)
    setConversaSelecionada(conversaId)
    setTexto('')
    setMobileChatOpen(true)
  }

  const voltarParaLista = () => {
    setMobileChatOpen(false)
    setTexto('')
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-8.5rem)] md:h-screen min-h-0 overflow-hidden">
      <div className={mobileChatOpen ? 'hidden md:block' : ''}>
        <PageHeader title="Chat da Diretoria" subtitle="Conversas com responsáveis e professores" />
      </div>
      <div className={`${mobileChatOpen ? 'hidden md:block' : ''} sticky top-0 z-10 shrink-0 bg-[#F7F6F3]`}>
        <div className="flex gap-2 px-4 sm:px-6 pt-4">
          {(['responsavel', 'professor'] as ContactFilter[]).map(option => (
            <button
              key={option}
              type="button"
              onClick={() => selecionarFiltro(option)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              style={{ backgroundColor: filter === option ? '#1B3A4B' : '#fff', color: filter === option ? '#fff' : '#5C6469', border: '1px solid #E4E2DD' }}
            >
              {option === 'responsavel' ? 'Responsáveis' : 'Professores'}
            </button>
          ))}
        </div>
        {filter === 'responsavel' && (
          <div className="px-4 sm:px-6 pt-3">
            <p className="mb-2 text-xs font-semibold" style={{ color: '#5C6469' }}>Selecione uma turma</p>
            <div className="flex flex-wrap gap-2">
              {turmasComResponsaveis.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selecionarTurma(item.id)}
                  aria-pressed={turmaSelecionada === item.id}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                  style={{ backgroundColor: turmaSelecionada === item.id ? '#EEF4F6' : '#fff', color: turmaSelecionada === item.id ? '#1B3A4B' : '#5C6469', border: '1px solid #E4E2DD' }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={`flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden ${mobileChatOpen ? 'mx-0 my-0 rounded-none md:mx-6 md:my-4 md:rounded-lg' : 'mx-4 md:mx-6 my-4 rounded-lg'}`} style={{ border: '1px solid #E4E2DD' }}>
        <div className={`${mobileChatOpen ? 'hidden' : 'flex-1'} min-h-0 shrink-0 overflow-x-hidden overflow-y-auto border-b md:block md:flex-none md:max-h-none md:w-64 md:border-b-0 md:border-r`} style={{ borderColor: '#E4E2DD', backgroundColor: '#FAFAFA' }}>
          {filter === 'responsavel' && !turmaSelecionada && (
            <p className="p-4 text-xs text-center" style={{ color: '#5C6469' }}>Escolha uma turma acima para ver os responsáveis.</p>
          )}

          {filter === 'responsavel' && turmaSelecionada && (
            <>
              <p className="px-4 pt-4 pb-2 text-xs font-semibold" style={{ color: '#5C6469' }}>Responsáveis — {turma?.label}</p>
              {responsaveis.map(responsavel => {
                const alunoDaTurma = alunos.find(aluno => aluno.turmaId === turmaSelecionada && aluno.responsavelIds.includes(responsavel.id))
                const conversaDaTurma = conversas.find(item => item.contatoRole === 'responsavel' && item.contatoId === responsavel.id && item.alunoId === alunoDaTurma?.id)
                return (
                  <button
                    key={responsavel.id}
                    type="button"
                    onClick={() => selecionarContato(responsavel, alunoDaTurma?.id)}
                    className="w-full min-w-0 text-left px-4 py-3 border-b transition-colors"
                    style={{ borderColor: '#E4E2DD', backgroundColor: conversaSelecionada === conversaDaTurma?.id ? '#EEF4F6' : 'transparent' }}
                  >
                    <p className="text-sm font-semibold truncate" style={{ color: '#23292E' }}>{responsavel.nome}</p>
                  </button>
                )
              })}
            </>
          )}

          {filter === 'professor' && (
            <>
              <p className="px-4 pt-4 pb-2 text-xs font-semibold" style={{ color: '#5C6469' }}>Professores da escola</p>
              {professores.map(professor => {
                const conversaDoProfessor = conversas.find(item => item.contatoRole === 'professor' && item.contatoId === professor.id)
                return (
                  <button
                    key={professor.id}
                    type="button"
                    onClick={() => selecionarContato(professor)}
                    className="w-full min-w-0 text-left px-4 py-3 border-b transition-colors"
                    style={{ borderColor: '#E4E2DD', backgroundColor: conversaSelecionada === conversaDoProfessor?.id ? '#F0EEF6' : 'transparent' }}
                  >
                    <p className="text-sm font-semibold truncate" style={{ color: '#23292E' }}>{professor.nome}</p>
                    <p className="mt-0.5 text-xs truncate" style={{ color: '#5C6469' }}>{professor.materia ?? 'Matéria não informada'}</p>
                  </button>
                )
              })}
              {professores.length === 0 && <p className="p-4 text-xs text-center" style={{ color: '#5C6469' }}>Nenhum professor cadastrado.</p>}
            </>
          )}
        </div>
        {conversa ? (
          <div className={`${mobileChatOpen ? 'flex' : 'hidden'} flex-1 flex-col min-w-0 min-h-0 md:flex`}>
            <div className="flex items-center gap-3 min-w-0 px-4 py-3" style={{ borderBottom: '1px solid #E4E2DD' }}>
              <button
                type="button"
                onClick={voltarParaLista}
                className="md:hidden shrink-0 p-1 -ml-1"
                style={{ color: '#1B3A4B' }}
                aria-label="Voltar para contatos"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{conversa.contatoNome}</p>
                {conversa.contatoRole === 'responsavel' ? (
                  <>
                    {alunoDaConversa && <span className="text-xs" style={{ color: '#5C6469' }}>Responsável de: {alunoDaConversa.nome}</span>}
                    {alunoDaConversa && <span className="text-xs" style={{ color: '#5C6469' }}>• {alunoDaConversa.turmaLabel}</span>}
                  </>
                ) : (
                  <span className="text-xs" style={{ color: '#5C6469' }}>{contatoDaConversa?.materia ?? 'Matéria não informada'}</span>
                )}
              </div>
            </div>
            <div className="flex-1 min-h-0 min-w-0 overflow-y-auto px-3 sm:px-4 py-4 space-y-3 chat-scroll scrollbar-hide" style={{ backgroundColor: '#F7F6F3' }}>
              {conversa.mensagens.map(mensagem => {
                const mine = mensagem.remetenteId === user.id
                return (
                  <div key={mensagem.id} className={`flex flex-col ${mine ? 'items-end' : 'items-start'}`}>
                    <p className="text-xs mb-1" style={{ color: '#5C6469' }}>{mensagem.remetenteNome}</p>
                    <div className="max-w-[85%] sm:max-w-xs lg:max-w-sm break-words px-4 py-2.5 rounded-xl text-sm leading-relaxed" style={{ backgroundColor: mine ? '#1B3A4B' : '#fff', color: mine ? '#fff' : '#23292E', border: mine ? 'none' : '1px solid #E4E2DD' }}>
                      {mensagem.texto}
                    </div>
                    <p className="text-xs mt-1 font-mono" style={{ color: '#5C6469' }}>{formatTime(mensagem.dataHora)}</p>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
            <div className="px-3 sm:px-4 py-3 bg-white flex gap-2" style={{ borderTop: '1px solid #E4E2DD' }}>
              <input
                value={texto}
                onChange={event => setTexto(event.target.value)}
                onKeyDown={event => event.key === 'Enter' && !event.shiftKey && enviar()}
                placeholder="Escreva uma mensagem..."
                className="flex-1 min-w-0 px-4 py-2 rounded-lg text-sm"
                style={{ border: '1px solid #E4E2DD', backgroundColor: '#F7F6F3', color: '#23292E', outline: 'none' }}
              />
              <button type="button" onClick={enviar} disabled={!texto.trim()} className="shrink-0 px-3 py-2 rounded-lg flex items-center gap-2" style={{ backgroundColor: texto.trim() ? '#1B3A4B' : '#E4E2DD', color: '#fff' }}>
                <Send size={15} />
                <span className="text-sm hidden sm:inline">Enviar</span>
              </button>
            </div>
          </div>
        ) : (
          <div className={`${mobileChatOpen ? 'flex' : 'hidden'} flex-1 items-center justify-center px-4 text-center md:flex`}>
            <p className="text-sm" style={{ color: '#5C6469' }}>
              {filter === 'responsavel' && !turmaSelecionada ? 'Selecione uma turma para ver os responsáveis.' : 'Selecione um contato para iniciar a conversa.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function GestaoUsuarios({ usuarios, alunos }: { usuarios: User[]; alunos: Aluno[] }) {
  const [filtro, setFiltro] = useState<string>('todos')

  const filtrados = filtro === 'todos' ? usuarios : usuarios.filter(u => u.role === filtro)

  return (
    <div>
      <PageHeader title="Usuários" subtitle={`${usuarios.length} usuários cadastrados`} />
      <div className="px-6 py-5 max-w-3xl mx-auto">
        <div className="flex gap-2 mb-5 flex-wrap">
          {['todos', 'responsavel', 'aluno', 'professor', 'admin'].map(r => (
            <button key={r} onClick={() => setFiltro(r)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{ backgroundColor: filtro === r ? '#1B3A4B' : '#fff', color: filtro === r ? '#fff' : '#5C6469', border: '1px solid #E4E2DD' }}>
              {r === 'todos' ? 'Todos' : roleLabels[r]}
            </button>
          ))}
        </div>

        <Card>
          <div className="divide-y" style={{ borderColor: '#E4E2DD' }}>
            {filtrados.map(u => {
              const cor = roleColors[u.role] ?? { bg: '#F7F6F3', text: '#5C6469' }
              const filho = u.role === 'aluno' ? alunos.find(a => a.nome === u.nome) : undefined
              return (
                <div key={u.id} className="flex items-center gap-4 px-5 py-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ backgroundColor: cor.bg, color: cor.text }}>
                    {u.nome.split(' ').slice(0, 2).map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: '#23292E' }}>{u.nome}</p>
                    <p className="text-xs" style={{ color: '#5C6469', fontFamily: 'IBM Plex Mono, monospace' }}>{u.email}</p>
                    {filho && <p className="text-xs" style={{ color: '#5C6469' }}>{filho.turmaLabel}</p>}
                    {u.materia && <p className="text-xs" style={{ color: '#5C6469' }}>{u.materia}</p>}
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded shrink-0" style={{ backgroundColor: cor.bg, color: cor.text }}>
                    {roleLabels[u.role]}
                  </span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}

function GestaoTurmas({ turmas, alunos, todos_usuarios }: { turmas: Turma[]; alunos: Aluno[]; todos_usuarios: User[] }) {
  return (
    <div>
      <PageHeader title="Turmas" subtitle={`${turmas.length} turmas cadastradas`} />
      <div className="px-6 py-5 max-w-3xl mx-auto space-y-4">
        {turmas.map(turma => {
          const alunosDaTurma = alunos.filter(a => a.turmaId === turma.id)
          const professoresDaTurma = todos_usuarios.filter(u => turma.professorIds.includes(u.id))
          return (
            <Card key={turma.id} className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-bold text-base" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{turma.label}</h2>
                  <div className="flex gap-3 mt-0.5">
                    <span className="text-xs" style={{ color: '#5C6469', fontFamily: 'IBM Plex Mono, monospace' }}>{alunosDaTurma.length} alunos</span>
                    <span className="text-xs" style={{ color: '#5C6469', fontFamily: 'IBM Plex Mono, monospace' }}>{professoresDaTurma.length} professor(es)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {alunosDaTurma.map(a => (
                  <div key={a.id} className="flex items-center gap-3 px-3 py-2 rounded-lg" style={{ backgroundColor: '#F7F6F3' }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ backgroundColor: '#EEF4F1', color: '#3D6E52' }}>
                      {a.nome.split(' ').slice(0, 2).map(n => n[0]).join('')}
                    </div>
                    <p className="text-sm flex-1" style={{ color: '#23292E' }}>{a.nome}</p>
                  </div>
                ))}
                {alunosDaTurma.length === 0 && (
                  <p className="text-sm text-center py-3" style={{ color: '#5C6469' }}>Nenhum aluno nesta turma.</p>
                )}
              </div>
              {professoresDaTurma.length > 0 && (
                <div className="mt-3 pt-3" style={{ borderTop: '1px solid #E4E2DD' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: '#5C6469' }}>Professores</p>
                  <div className="flex gap-2 flex-wrap">
                    {professoresDaTurma.map(p => (
                      <span key={p.id} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#F0EEF6', color: '#5A4A7A' }}>
                        {p.nome} {p.materia ? `(${p.materia})` : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
