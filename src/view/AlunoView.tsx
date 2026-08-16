import { useState } from 'react'
import { CheckCircle2, Circle, BookOpen, AlertTriangle, Bell, Calendar } from 'lucide-react'
import type { User, Aluno, Tarefa, Aviso, ViewName, CalendarEvent } from '../types'
import { PageHeader, Card, formatDate, formatDateShort } from '../components/Layout'
import { dateKey } from '../components/calendar/CalendarMonth'
import CalendarMini from '../components/calendar/CalendarMini'
import NextActivityCard from '../components/calendar/NextActivityCard'
import NotasView from './NotasView'

interface Props {
  user: User
  aluno: Aluno | undefined
  tarefas: Tarefa[]
  avisos: Aviso[]
  avisosVistos: Set<string>
  tarefasConcluidas: Set<string>
  onToggleTarefa: (id: string) => void
  onMarcarAvisoVisto: (id: string) => void
  currentView: ViewName
  calendarEvents: CalendarEvent[]
  calendarMonth: Date
  calendarSelectedDate: string
  onCalendarMonthChange: (month: Date) => void
  onCalendarDateChange: (date: string) => void
  onOpenCalendar: () => void
  onOpenCalendarEvent: (event: CalendarEvent) => void
}

export default function AlunoView({
  user, aluno, tarefas, avisos, avisosVistos,
  tarefasConcluidas, onToggleTarefa, onMarcarAvisoVisto, currentView,
  calendarEvents, calendarMonth, calendarSelectedDate, onCalendarMonthChange, onCalendarDateChange, onOpenCalendar, onOpenCalendarEvent,
}: Props) {
  const [mostrarConcluidas, setMostrarConcluidas] = useState(false)
  const hoje = dateKey(new Date())
  const tarefasAluno = tarefas
    .filter(t => t.turmaId === aluno?.turmaId && (!t.alunoId || t.alunoId === aluno?.id))
    .sort((a, b) => a.dataEntrega.localeCompare(b.dataEntrega))
  const tarefasFuturas = tarefasAluno.filter(t => t.dataEntrega >= hoje)

  const avisosAluno = avisos
    .filter(a => a.turmaId === 'todos' || a.turmaId === aluno?.turmaId)
    .sort((a, b) => b.dataHora.localeCompare(a.dataHora))

  const avisosPendentes = avisosAluno.filter(a => !avisosVistos.has(a.id))

  if (currentView === 'inicio') {
    const proximas = tarefasFuturas.filter(t => !tarefasConcluidas.has(t.id)).slice(0, 3)
    const recentes = avisosAluno.slice(0, 2)

    return (
      <div>
        <PageHeader
          title={`Olá, ${user.nome.split(' ')[0]}`}
          subtitle={aluno ? `${aluno.turmaLabel} — Bem-vindo ao sistema escolar` : 'Bem-vindo ao sistema escolar'}
        />
        <div className="px-6 py-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem] items-start">
          <div className="space-y-5 max-w-2xl">
          {/* Avisos recentes */}
          {recentes.length > 0 && (
            <div>
              <h2 className="text-base font-semibold mb-3 flex items-center gap-2" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>
                <Bell size={16} style={{ color: '#3F6C7A' }} />
                Avisos recentes
                {avisosPendentes.length > 0 && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#A44A2E', color: '#fff' }}>
                    {avisosPendentes.length} novo{avisosPendentes.length > 1 ? 's' : ''}
                  </span>
                )}
              </h2>
              <div className="space-y-2">
                {recentes.map(av => {
                  const novo = !avisosVistos.has(av.id)
                  return (
                    <Card key={av.id} className="p-4">
                      <div className="flex items-start gap-3">
                        {novo && <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#3F6C7A' }} />}
                        <div className="flex-1">
                          {av.urgente && (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded mb-1 inline-flex items-center gap-1" style={{ backgroundColor: '#FDF2EE', color: '#A44A2E' }}>
                              <AlertTriangle size={10} /> Urgente
                            </span>
                          )}
                          <p className="text-sm font-semibold" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{av.titulo}</p>
                          <p className="text-sm mt-0.5 leading-relaxed" style={{ color: '#5C6469' }}>{av.texto}</p>
                          <p className="text-xs mt-2" style={{ color: '#5C6469', fontFamily: 'IBM Plex Mono, monospace' }}>{av.autor} · {formatDate(av.dataHora)}</p>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Próximas tarefas */}
          <div>
            <h2 className="text-base font-semibold mb-3 flex items-center gap-2" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>
              <BookOpen size={16} style={{ color: '#3F6C7A' }} />
              Próximas entregas
            </h2>
            {proximas.length === 0 ? (
              <Card className="p-5 text-center">
                <CheckCircle2 size={24} className="mx-auto mb-2" style={{ color: '#3D6E52' }} />
                <p className="text-sm font-semibold" style={{ color: '#3D6E52' }}>Tudo em dia!</p>
                <p className="text-xs mt-1" style={{ color: '#5C6469' }}>Nenhuma tarefa pendente.</p>
              </Card>
            ) : (
              <div className="space-y-2">
                {proximas.map(t => {
                  const dias = Math.ceil((new Date(t.dataEntrega).getTime() - Date.now()) / 86400000)
                  const urgente = dias <= 2
                  return (
                    <Card key={t.id} className="p-4 flex items-center gap-4">
                      <button onClick={() => onToggleTarefa(t.id)} aria-label={`Marcar "${t.titulo}" como concluída`}>
                        <Circle size={20} style={{ color: '#CBD5D8' }} />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold" style={{ color: '#23292E' }}>{t.titulo}</p>
                        <p className="text-xs" style={{ color: '#5C6469' }}>{t.materia} · {t.professorNome}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-semibold" style={{ color: urgente ? '#A44A2E' : '#23292E', fontFamily: 'IBM Plex Mono, monospace' }}>
                          {formatDateShort(t.dataEntrega)}
                        </p>
                        {urgente && <p className="text-xs" style={{ color: '#A44A2E' }}>em breve</p>}
                      </div>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
          </div>
          <div className="space-y-3 xl:sticky xl:top-6">
            <CalendarMini
              studentName={aluno?.nome ?? 'aluno'}
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

  if (currentView === 'tarefas') {
    const pendentes = tarefasFuturas.filter(t => !tarefasConcluidas.has(t.id))
    const concluidas = tarefasFuturas.filter(t => tarefasConcluidas.has(t.id))

    return (
      <div>
        <PageHeader title="Tarefas" subtitle="Trabalhos e atividades ordenados por prazo" />
        <div className="px-6 py-5 max-w-2xl mx-auto">
          {/* Pendentes */}
          <div className="space-y-3 mb-6">
            {pendentes.length === 0 && (
              <Card className="p-8 text-center">
                <CheckCircle2 size={28} className="mx-auto mb-2" style={{ color: '#3D6E52' }} />
                <p className="font-semibold" style={{ color: '#3D6E52', fontFamily: 'Lexend, sans-serif' }}>Todas as tarefas concluídas!</p>
              </Card>
            )}
            {pendentes.map(t => {
              const dias = Math.ceil((new Date(t.dataEntrega).getTime() - Date.now()) / 86400000)
              const urgente = dias <= 2
              const vencida = dias < 0
              return (
                <Card key={t.id} className="p-5">
                  <div className="flex items-start gap-4">
                    <button onClick={() => onToggleTarefa(t.id)} className="mt-0.5 shrink-0" aria-label="Marcar como concluída">
                      <Circle size={20} style={{ color: '#CBD5D8' }} />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: '#EEF4F6', color: '#3F6C7A' }}>
                          {t.materia}
                        </span>
                        {vencida && <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: '#FDF2EE', color: '#A44A2E' }}>Vencida</span>}
                        {urgente && !vencida && <span className="text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1" style={{ backgroundColor: '#FDF2EE', color: '#A44A2E' }}>
                          <AlertTriangle size={10} /> Em breve
                        </span>}
                      </div>
                      <h3 className="font-semibold text-sm" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{t.titulo}</h3>
                      <p className="text-sm mt-1 leading-relaxed" style={{ color: '#5C6469' }}>{t.descricao}</p>
                      {t.materialNecessario && (
                        <div className="mt-2 p-2 rounded-lg" style={{ backgroundColor: '#F7F6F3', border: '1px solid #E4E2DD' }}>
                          <p className="text-xs"><span className="font-semibold" style={{ color: '#23292E' }}>Material necessário: </span>
                            <span style={{ color: '#5C6469' }}>{t.materialNecessario}</span>
                          </p>
                        </div>
                      )}
                      <div className="mt-2 flex items-center gap-3 text-xs" style={{ color: '#5C6469' }}>
                        <span>{t.professorNome}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          Entrega: <strong className="font-mono" style={{ color: urgente || vencida ? '#A44A2E' : '#23292E' }}>{formatDateShort(t.dataEntrega)}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Concluídas */}
          {concluidas.length > 0 && (
            <div>
              <button onClick={() => setMostrarConcluidas(v => !v)}
                className="text-sm font-semibold mb-3 flex items-center gap-2"
                style={{ color: '#5C6469' }}>
                <CheckCircle2 size={15} />
                {concluidas.length} tarefa{concluidas.length > 1 ? 's' : ''} concluída{concluidas.length > 1 ? 's' : ''}
                <span className="text-xs">{mostrarConcluidas ? '▲' : '▼'}</span>
              </button>
              {mostrarConcluidas && (
                <div className="space-y-2">
                  {concluidas.map(t => (
                    <Card key={t.id} className="p-4 flex items-center gap-4 opacity-60">
                      <button onClick={() => onToggleTarefa(t.id)} aria-label="Desmarcar como concluída">
                        <CheckCircle2 size={20} style={{ color: '#3D6E52' }} />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-through" style={{ color: '#5C6469' }}>{t.titulo}</p>
                        <p className="text-xs" style={{ color: '#5C6469' }}>{t.materia}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (currentView === 'notas') {
    return <NotasView filhos={aluno ? [aluno] : []} filhoSelecionado={aluno?.id ?? ''} onFilhoSelecionado={() => undefined} />
  }

  if (currentView === 'avisos') {
    return (
      <div>
        <PageHeader title="Avisos" subtitle="Recados dos professores e da escola" />
        <div className="px-6 py-5 space-y-3 max-w-2xl mx-auto">
          {avisosAluno.length === 0 && <p className="text-sm py-8 text-center" style={{ color: '#5C6469' }}>Nenhum aviso no momento.</p>}
          {avisosAluno.map(av => {
            const novo = !avisosVistos.has(av.id)
            return (
              <Card key={av.id} className="p-5">
                <div className="flex items-start gap-3">
                  {novo && <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#3F6C7A' }} />}
                  {!novo && <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#E4E2DD' }} />}
                  <div className="flex-1">
                    <div className="flex gap-2 flex-wrap mb-1">
                      {av.urgente && <span className="text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1" style={{ backgroundColor: '#FDF2EE', color: '#A44A2E' }}>
                        <AlertTriangle size={10} /> Urgente
                      </span>}
                      {novo && <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: '#EEF4F6', color: '#3F6C7A' }}>Novo</span>}
                    </div>
                    <h3 className="font-semibold text-sm" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{av.titulo}</h3>
                    <p className="text-sm mt-1 leading-relaxed" style={{ color: '#5C6469' }}>{av.texto}</p>
                    <p className="text-xs mt-2" style={{ color: '#5C6469', fontFamily: 'IBM Plex Mono, monospace' }}>{av.autor} · {formatDate(av.dataHora)}</p>
                    {novo && (
                      <button onClick={() => onMarcarAvisoVisto(av.id)} className="mt-2 text-xs font-semibold underline" style={{ color: '#3F6C7A' }}>
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
