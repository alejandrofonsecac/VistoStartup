import { useState, useRef, useEffect } from 'react'
import { CheckCircle2, BookOpen, AlertTriangle, Send, User } from 'lucide-react'
import type { User as UserType, Aluno, Registro, Tarefa, Conversa, Aviso, ViewName, CalendarEvent } from '../types'
import { PageHeader, Card, CategoriaBadge, formatDate, formatTime, formatDateShort } from '../components/Layout'
import CalendarMini from '../components/calendar/CalendarMini'
import NextActivityCard from '../components/calendar/NextActivityCard'
import NotasView from './NotasView'

interface Props {
  user: UserType
  filhos: Aluno[]
  filhoSelecionado: string
  onFilhoSelecionado: (id: string) => void
  registros: Registro[]
  tarefas: Tarefa[]
  conversas: Conversa[]
  avisos: Aviso[]
  avisosVistos: Set<string>
  onMarcarAvisoVisto: (id: string) => void
  onEnviarMensagem: (conversaId: string, texto: string) => void
  currentView: ViewName
  calendarEvents: CalendarEvent[]
  calendarMonth: Date
  calendarSelectedDate: string
  onCalendarMonthChange: (month: Date) => void
  onCalendarDateChange: (date: string) => void
  onOpenCalendar: () => void
  onOpenCalendarEvent: (event: CalendarEvent) => void
}

export default function ResponsavelView({
  user, filhos, filhoSelecionado, onFilhoSelecionado, registros, tarefas, conversas, avisos,
  avisosVistos, onMarcarAvisoVisto, onEnviarMensagem, currentView,
  calendarEvents, calendarMonth, calendarSelectedDate, onCalendarMonthChange, onCalendarDateChange, onOpenCalendar, onOpenCalendarEvent,
}: Props) {
  const [filtro, setFiltro] = useState<string>('Todos')
  const filho = filhos.find(f => f.id === filhoSelecionado) ?? filhos[0]

  const registrosFilho = registros.filter(r => r.alunoId === filhoSelecionado).sort((a, b) => b.dataHora.localeCompare(a.dataHora))
  const tarefasFilho = tarefas.filter(t => t.turmaId === filho?.turmaId).sort((a, b) => a.dataEntrega.localeCompare(b.dataEntrega))
  const conversasFilho = conversas.filter(c => c.alunoId === filhoSelecionado && c.responsavelId === user.id)

  const naoVistos = registrosFilho.filter(r => !r.vistoResponsavel)

  const SeletorFilhos = () => {
    if (filhos.length <= 1) return null
    return (
      <div className="flex gap-2 px-6 pt-5">
        {filhos.map(f => (
          <button
            key={f.id}
            onClick={() => onFilhoSelecionado(f.id)}
            className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
            style={{
              backgroundColor: filhoSelecionado === f.id ? '#1B3A4B' : '#fff',
              color: filhoSelecionado === f.id ? '#fff' : '#5C6469',
              border: '1px solid #E4E2DD',
            }}
          >
            {f.nome.split(' ')[0]}
          </button>
        ))}
      </div>
    )
  }

  if (currentView === 'inicio') {
    const ultimos = registrosFilho.slice(0, 3)
    const proximasTarefas = tarefasFilho.slice(0, 3)
    const temImportante = registrosFilho.some(r => r.urgencia === 'Importante' && !r.vistoResponsavel)

    return (
      <div>
        <PageHeader
          title={`Olá, ${user.nome.split(' ')[0]}`}
          subtitle="Veja como está indo na escola."
        />
        <SeletorFilhos />
        <div className="px-6 py-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem] items-start">
          <div className="space-y-5 max-w-2xl">
          {/* Status card */}
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: '#EEF4F6', color: '#3F6C7A' }}>
                {filho?.nome.split(' ').slice(0, 2).map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{filho?.nome}</p>
                <p className="text-xs" style={{ color: '#5C6469', fontFamily: 'IBM Plex Mono, monospace' }}>{filho?.turmaLabel}</p>
              </div>
            </div>
            {temImportante ? (
              <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#FDF2EE', border: '1px solid #F5C6B8' }}>
                <AlertTriangle size={18} style={{ color: '#A44A2E', flexShrink: 0, marginTop: 1 }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#A44A2E' }}>Há registros importantes não lidos</p>
                  <p className="text-xs mt-0.5" style={{ color: '#7A3A20' }}>Veja o histórico completo para mais detalhes.</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#EEF4F1', border: '1px solid #C5DDD0' }}>
                <CheckCircle2 size={18} style={{ color: '#3D6E52', flexShrink: 0, marginTop: 1 }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#3D6E52' }}>Tudo em dia</p>
                  <p className="text-xs mt-0.5" style={{ color: '#2D5A3E' }}>Sem registros importantes pendentes de atenção.</p>
                </div>
              </div>
            )}
            {naoVistos.length > 0 && (
              <p className="mt-3 text-xs" style={{ color: '#5C6469' }}>
                {naoVistos.length} novo{naoVistos.length > 1 ? 's' : ''} registro{naoVistos.length > 1 ? 's' : ''} desde a última vez
              </p>
            )}
          </Card>

          {/* Últimos registros */}
          {ultimos.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>Últimos registros</h2>
              </div>
              <div className="space-y-2">
                {ultimos.map(r => (
                  <Card key={r.id} className="p-4">
                    <CategoriaBadge categoria={r.categoria} urgencia={r.urgencia} />
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: '#23292E' }}>{r.descricao}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs" style={{ color: '#5C6469', fontFamily: 'IBM Plex Mono, monospace' }}>
                      <span>{r.professorNome}</span>
                      <span>·</span>
                      <span>{formatDate(r.dataHora)}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Próximas tarefas */}
          {proximasTarefas.length > 0 && (
            <div>
              <h2 className="text-base font-semibold mb-3" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>Próximas tarefas</h2>
              <div className="space-y-2">
                {proximasTarefas.map(t => (
                  <Card key={t.id} className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#EEF4F6' }}>
                      <BookOpen size={16} style={{ color: '#3F6C7A' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: '#23292E' }}>{t.titulo}</p>
                      <p className="text-xs" style={{ color: '#5C6469' }}>{t.materia}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-semibold" style={{ color: '#23292E', fontFamily: 'IBM Plex Mono, monospace' }}>
                        {formatDateShort(t.dataEntrega)}
                      </p>
                      <p className="text-xs" style={{ color: '#5C6469' }}>entrega</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          </div>
          <div className="space-y-3 xl:sticky xl:top-6">
            <CalendarMini
              studentName={filho?.nome ?? 'aluno'}
              month={calendarMonth}
              events={calendarEvents}
              selectedDate={calendarSelectedDate}
              onMonthChange={onCalendarMonthChange}
              onSelectDate={onCalendarDateChange}
              onOpen={onOpenCalendar}
            />
            <NextActivityCard events={calendarEvents} onOpenEvent={onOpenCalendarEvent} />
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'notas') {
    return <NotasView filhos={filhos} filhoSelecionado={filhoSelecionado} onFilhoSelecionado={onFilhoSelecionado} />
  }

  if (currentView === 'timeline') {
    const categorias = ['Todos', 'Comportamento', 'Desempenho', 'Aviso', 'Elogio', 'Participação']
    const filtrados = filtro === 'Todos' ? registrosFilho : registrosFilho.filter(r => r.categoria === filtro)

    return (
      <div>
        <PageHeader title="Histórico do aluno" subtitle={`Todos os registros de ${filho?.nome}`} />
        <SeletorFilhos />
        <div className="px-6 py-5">
          <div className="flex gap-2 flex-wrap mb-5">
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => setFiltro(cat)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  backgroundColor: filtro === cat ? '#1B3A4B' : '#fff',
                  color: filtro === cat ? '#fff' : '#5C6469',
                  border: '1px solid #E4E2DD',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            {filtrados.length === 0 && (
              <p className="text-sm py-8 text-center" style={{ color: '#5C6469' }}>Nenhum registro encontrado.</p>
            )}
            {filtrados.map(r => (
              <Card key={r.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: r.urgencia === 'Importante' ? '#A44A2E' : '#CBD5D8' }} />
                  <div className="flex-1">
                    <CategoriaBadge categoria={r.categoria} urgencia={r.urgencia} />
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: '#23292E' }}>{r.descricao}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs flex-wrap" style={{ color: '#5C6469' }}>
                      <span className="flex items-center gap-1">
                        <User size={11} />
                        {r.professorNome}
                      </span>
                      <span className="font-mono">{formatDate(r.dataHora)} · {formatTime(r.dataHora)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'tarefas') {
    return (
      <div>
        <PageHeader title="Tarefas" subtitle={`Atividades de ${filho?.nome}`} />
        <SeletorFilhos />
        <div className="px-6 py-5 space-y-3 max-w-2xl mx-auto">
          {tarefasFilho.length === 0 && <p className="text-sm py-8 text-center" style={{ color: '#5C6469' }}>Nenhuma tarefa no momento.</p>}
          {tarefasFilho.map(t => {
            const dias = Math.ceil((new Date(t.dataEntrega).getTime() - Date.now()) / 86400000)
            const urgente = dias <= 2
            return (
              <Card key={t.id} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: '#EEF4F6', color: '#3F6C7A' }}>
                        {t.materia}
                      </span>
                      {urgente && <span className="text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1" style={{ backgroundColor: '#FDF2EE', color: '#A44A2E' }}>
                        <AlertTriangle size={10} /> Em breve
                      </span>}
                    </div>
                    <h3 className="font-semibold text-sm" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{t.titulo}</h3>
                    <p className="text-sm mt-1 leading-relaxed" style={{ color: '#5C6469' }}>{t.descricao}</p>
                    {t.materialNecessario && (
                      <p className="mt-2 text-xs" style={{ color: '#5C6469' }}>
                        <span className="font-semibold" style={{ color: '#23292E' }}>Material: </span>
                        {t.materialNecessario}
                      </p>
                    )}
                    <p className="mt-2 text-xs" style={{ color: '#5C6469' }}>{t.professorNome}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="px-3 py-2 rounded-lg" style={{ backgroundColor: urgente ? '#FDF2EE' : '#F7F6F3' }}>
                      <p className="text-xs font-semibold" style={{ color: '#5C6469' }}>Entrega</p>
                      <p className="text-sm font-bold" style={{ color: urgente ? '#A44A2E' : '#23292E', fontFamily: 'IBM Plex Mono, monospace' }}>
                        {formatDateShort(t.dataEntrega)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  if (currentView === 'chat') {
    return <ChatResponsavel conversas={conversasFilho} user={user} filho={filho} onEnviarMensagem={onEnviarMensagem} filhos={filhos} filhoSelecionado={filhoSelecionado} setFilhoSelecionado={onFilhoSelecionado} />
  }

  if (currentView === 'avisos') {
    const avisosVisiveis = avisos.filter(a => a.turmaId === 'todos' || a.turmaId === filho?.turmaId)
    return (
      <div>
        <PageHeader title="Avisos" subtitle="Comunicados da escola e dos professores" />
        <SeletorFilhos />
        <div className="px-6 py-5 space-y-3 max-w-2xl mx-auto">
          {avisosVisiveis.length === 0 && <p className="text-sm py-8 text-center" style={{ color: '#5C6469' }}>Nenhum aviso no momento.</p>}
          {avisosVisiveis.map(av => {
            const visto = avisosVistos.has(av.id)
            return (
              <Card key={av.id} className="p-5" style={{ borderColor: !visto ? '#CBD5D8' : '#E4E2DD' }}>
                <div className="flex items-start gap-3">
                  {!visto && <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#3F6C7A' }} />}
                  {visto && <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#E4E2DD' }} />}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {av.urgente && <span className="text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1" style={{ backgroundColor: '#FDF2EE', color: '#A44A2E' }}>
                        <AlertTriangle size={10} /> Urgente
                      </span>}
                      {!visto && <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: '#EEF4F6', color: '#3F6C7A' }}>Novo</span>}
                    </div>
                    <h3 className="font-semibold text-sm" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{av.titulo}</h3>
                    <p className="mt-1 text-sm leading-relaxed" style={{ color: '#5C6469' }}>{av.texto}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs" style={{ color: '#5C6469', fontFamily: 'IBM Plex Mono, monospace' }}>
                      <span>{av.autor}</span>
                      <span>·</span>
                      <span>{formatDate(av.dataHora)}</span>
                    </div>
                    {!visto && (
                      <button onClick={() => onMarcarAvisoVisto(av.id)} className="mt-3 text-xs font-semibold underline" style={{ color: '#3F6C7A' }}>
                        Marcar como lido
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  return null
}

function ChatResponsavel({ conversas, user, filho, onEnviarMensagem, filhos, filhoSelecionado, setFilhoSelecionado }: {
  conversas: Conversa[]; user: UserType; filho: Aluno | undefined; onEnviarMensagem: (id: string, texto: string) => void;
  filhos: Aluno[]; filhoSelecionado: string; setFilhoSelecionado: (id: string) => void;
}) {
  const [conversaSelecionada, setConversaSelecionada] = useState(conversas[0]?.id ?? '')
  const [texto, setTexto] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const conversa = conversas.find(c => c.id === conversaSelecionada)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversa?.mensagens.length])

  const enviar = () => {
    if (!texto.trim() || !conversaSelecionada) return
    onEnviarMensagem(conversaSelecionada, texto.trim())
    setTexto('')
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] md:h-screen">
      <PageHeader title="Chat com professores" subtitle="Conversa privada por aluno e disciplina" />
      {filhos.length > 1 && (
        <div className="flex gap-2 px-6 pt-4">
          {filhos.map(f => (
            <button key={f.id} onClick={() => setFilhoSelecionado(f.id)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{ backgroundColor: filhoSelecionado === f.id ? '#1B3A4B' : '#fff', color: filhoSelecionado === f.id ? '#fff' : '#5C6469', border: '1px solid #E4E2DD' }}>
              {f.nome.split(' ')[0]}
            </button>
          ))}
        </div>
      )}
      <div className="flex flex-1 overflow-hidden mx-6 my-4 rounded-lg" style={{ border: '1px solid #E4E2DD' }}>
        {/* Conversation list */}
        <div className="w-48 shrink-0 overflow-y-auto" style={{ borderRight: '1px solid #E4E2DD', backgroundColor: '#FAFAFA' }}>
          {conversas.length === 0 && (
            <div className="p-4 text-xs text-center" style={{ color: '#5C6469' }}>Nenhuma conversa ainda.</div>
          )}
          {conversas.map(c => (
            <button key={c.id} onClick={() => setConversaSelecionada(c.id)}
              className="w-full text-left px-4 py-3 border-b transition-colors"
              style={{ borderBottomColor: '#E4E2DD', backgroundColor: conversaSelecionada === c.id ? '#EEF4F6' : 'transparent' }}>
              <p className="text-xs font-semibold truncate" style={{ color: '#23292E' }}>{c.professorNome.replace('Prof', 'Prof.')}</p>
              <p className="text-xs truncate" style={{ color: '#5C6469' }}>{c.alunoNome.split(' ')[0]}</p>
            </button>
          ))}
        </div>

        {/* Messages */}
        {conversa ? (
          <div className="flex-1 flex flex-col min-w-0">
            <div className="px-4 py-3" style={{ borderBottom: '1px solid #E4E2DD' }}>
              <p className="text-sm font-semibold" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{conversa.professorNome}</p>
              <p className="text-xs" style={{ color: '#5C6469' }}>sobre {conversa.alunoNome}</p>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 chat-scroll scrollbar-hide" style={{ backgroundColor: '#F7F6F3' }}>
              {conversa.mensagens.map(m => {
                const mine = m.remetenteId === user.id
                return (
                  <div key={m.id} className={`flex flex-col ${mine ? 'items-end' : 'items-start'}`}>
                    <p className="text-xs mb-1" style={{ color: '#5C6469' }}>{m.remetenteNome}</p>
                    <div className="max-w-xs lg:max-w-sm px-4 py-2.5 rounded-xl text-sm leading-relaxed"
                      style={{ backgroundColor: mine ? '#1B3A4B' : '#fff', color: mine ? '#fff' : '#23292E', border: mine ? 'none' : '1px solid #E4E2DD' }}>
                      {m.texto}
                    </div>
                    <p className="text-xs mt-1 font-mono" style={{ color: '#5C6469' }}>{formatTime(m.dataHora)}</p>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
            <div className="px-4 py-3 bg-white flex gap-2" style={{ borderTop: '1px solid #E4E2DD' }}>
              <input
                value={texto}
                onChange={e => setTexto(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && enviar()}
                placeholder="Escreva uma mensagem..."
                className="flex-1 px-4 py-2 rounded-lg text-sm"
                style={{ border: '1px solid #E4E2DD', backgroundColor: '#F7F6F3', color: '#23292E', outline: 'none' }}
              />
              <button onClick={enviar} disabled={!texto.trim()} className="px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                style={{ backgroundColor: texto.trim() ? '#1B3A4B' : '#E4E2DD', color: '#fff' }}>
                <Send size={15} />
                <span className="text-sm hidden sm:inline">Enviar</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm" style={{ color: '#5C6469' }}>Selecione uma conversa</p>
          </div>
        )}
      </div>
    </div>
  )
}
