import { useState } from 'react'
import type { User, ViewName, Registro, Tarefa, Conversa, Aviso, Mensagem, CalendarEvent } from './types'
import { USUARIOS, ALUNOS, TURMAS, REGISTROS_INICIAIS, TAREFAS_INICIAIS, CONVERSAS_INICIAIS, AVISOS_INICIAIS } from './data'
import { CALENDAR_EVENTS, getCalendarEventsForStudent } from './data/calendarEvents'
import Login from './components/Login'
import Layout from './components/Layout'
import CalendarModal from './components/calendar/CalendarModal'
import { dateKey, monthStart, parseDateKey } from './components/calendar/CalendarMonth'
import ResponsavelView from './view/ResponsavelView'
import HistoricoView from './view/HistoricoView'
import AlunoView from './view/AlunoView'
import ProfessorView from './view/ProfessorView'
import AdminView from './view/AdminView'

function defaultView(role: string): ViewName {
  if (role === 'admin') return 'painel'
  return 'inicio'
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [currentView, setCurrentView] = useState<ViewName>('inicio')

  // App state
  const [registros, setRegistros] = useState<Registro[]>(REGISTROS_INICIAIS)
  const [tarefas, setTarefas] = useState<Tarefa[]>(TAREFAS_INICIAIS)
  const [conversas, setConversas] = useState<Conversa[]>(CONVERSAS_INICIAIS)
  const [avisos, setAvisos] = useState<Aviso[]>(AVISOS_INICIAIS)
  const [avisosVistos, setAvisosVistos] = useState<Set<string>>(new Set(['av3', 'av4']))
  const [tarefasConcluidas, setTarefasConcluidas] = useState<Set<string>>(new Set())
  const [filhoSelecionado, setFilhoSelecionado] = useState('')
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState(() => monthStart(new Date()))
  const [calendarSelectedDate, setCalendarSelectedDate] = useState(() => dateKey(new Date()))
  const [calendarSelectedEventId, setCalendarSelectedEventId] = useState<string | null>(null)

  const handleLogin = (user: User) => {
    setCurrentUser(user)
    setCurrentView(defaultView(user.role))
    setFilhoSelecionado(user.filhosIds?.[0] ?? '')
    setIsCalendarOpen(false)
    setCalendarSelectedEventId(null)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentView('inicio')
    setFilhoSelecionado('')
    setIsCalendarOpen(false)
  }

  const handleViewChange = (view: ViewName) => {
    setCurrentView(view)
    if (view === 'avisos') {
      // Mark all currently visible avisos as seen on open
    }
  }

  const handleMarcarAvisoVisto = (id: string) => {
    setAvisosVistos(prev => new Set([...prev, id]))
  }

  const handleToggleTarefa = (id: string) => {
    setTarefasConcluidas(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleEnviarMensagem = (conversaId: string, texto: string) => {
    if (!currentUser) return
    const msg: Mensagem = {
      id: `m_${Date.now()}`,
      remetenteId: currentUser.id,
      remetenteNome: currentUser.nome,
      texto,
      dataHora: new Date().toISOString(),
    }
    setConversas(prev => prev.map(c =>
      c.id === conversaId ? { ...c, mensagens: [...c.mensagens, msg] } : c
    ))
  }

  const handleNovoRegistro = (r: Omit<Registro, 'id' | 'vistoResponsavel'>) => {
    const novo: Registro = { ...r, id: `r_${Date.now()}`, vistoResponsavel: false }
    setRegistros(prev => [novo, ...prev])
  }

  const handleNovaTarefa = (t: Omit<Tarefa, 'id'>) => {
    const nova: Tarefa = { ...t, id: `ta_${Date.now()}` }
    setTarefas(prev => [nova, ...prev])
  }

  const handleNovoAviso = (titulo: string, texto: string, turmaId: string, urgente: boolean) => {
    const novo: Aviso = {
      id: `av_${Date.now()}`,
      titulo,
      texto,
      autor: currentUser?.nome ?? 'Professor',
      dataHora: new Date().toISOString(),
      turmaId,
      urgente,
    }
    setAvisos(prev => [novo, ...prev])
  }

  // Count unread avisos for current user's context
  const unreadAvisos = avisos.filter(a => !avisosVistos.has(a.id)).length

  if (!currentUser) {
    return <Login onLogin={handleLogin} />
  }

  const filhos = ALUNOS.filter(a => currentUser.filhosIds?.includes(a.id) ?? false)
  const alunoLogado = ALUNOS.find(a => a.turmaId === currentUser.turmaId && a.nome === currentUser.nome)
  const selectedStudent = filhos.find(filho => filho.id === filhoSelecionado) ?? filhos[0]
  const calendarStudent = currentUser.role === 'aluno' ? alunoLogado : selectedStudent
  const calendarEvents = getCalendarEventsForStudent(CALENDAR_EVENTS, calendarStudent)
  const selectedCalendarEvent = calendarEvents.find(event => event.id === calendarSelectedEventId) ?? null

  const handleStudentChange = (studentId: string) => {
    setFilhoSelecionado(studentId)
    setCalendarSelectedEventId(null)
  }

  const handleCalendarDateChange = (date: string) => {
    setCalendarSelectedDate(date)
    setCalendarSelectedEventId(null)
  }

  const handleOpenCalendarEvent = (event: CalendarEvent) => {
    setCalendarMonth(monthStart(parseDateKey(event.date)))
    setCalendarSelectedDate(event.date)
    setCalendarSelectedEventId(event.id)
    setIsCalendarOpen(true)
  }

  return (
    <>
    <Layout
      user={currentUser}
      currentView={currentView}
      onViewChange={handleViewChange}
      onLogout={handleLogout}
      unreadCount={unreadAvisos}
      onOpenCalendar={currentUser.role === 'responsavel' ? () => setIsCalendarOpen(true) : undefined}
    >
      {currentUser.role === 'responsavel' && currentView === 'timeline' ? (
        <HistoricoView
          filhos={filhos}
          filhoSelecionado={selectedStudent?.id ?? ''}
          onFilhoSelecionado={handleStudentChange}
          tarefas={tarefas}
        />
      ) : currentUser.role === 'responsavel' && (
        <ResponsavelView
          user={currentUser}
          filhos={filhos}
          filhoSelecionado={selectedStudent?.id ?? ''}
          onFilhoSelecionado={handleStudentChange}
          registros={registros}
          tarefas={tarefas}
          conversas={conversas}
          avisos={avisos}
          avisosVistos={avisosVistos}
          onMarcarAvisoVisto={handleMarcarAvisoVisto}
          onEnviarMensagem={handleEnviarMensagem}
          currentView={currentView}
          calendarEvents={calendarEvents}
          calendarMonth={calendarMonth}
          calendarSelectedDate={calendarSelectedDate}
          onCalendarMonthChange={setCalendarMonth}
          onCalendarDateChange={handleCalendarDateChange}
          onOpenCalendar={() => setIsCalendarOpen(true)}
          onOpenCalendarEvent={handleOpenCalendarEvent}
        />
      )}

      {currentUser.role === 'aluno' && currentView === 'timeline' ? (
        <HistoricoView
          filhos={alunoLogado ? [alunoLogado] : []}
          filhoSelecionado={alunoLogado?.id ?? ''}
          onFilhoSelecionado={() => undefined}
          tarefas={tarefas}
        />
      ) : currentUser.role === 'aluno' && (
        <AlunoView
          user={currentUser}
          aluno={alunoLogado}
          tarefas={tarefas}
          avisos={avisos}
          avisosVistos={avisosVistos}
          tarefasConcluidas={tarefasConcluidas}
          onToggleTarefa={handleToggleTarefa}
          onMarcarAvisoVisto={handleMarcarAvisoVisto}
          currentView={currentView}
        />
      )}

      {currentUser.role === 'professor' && (
        <ProfessorView
          user={currentUser}
          alunos={ALUNOS}
          turmas={TURMAS}
          registros={registros}
          tarefas={tarefas}
          conversas={conversas}
          onNovoRegistro={handleNovoRegistro}
          onNovaTarefa={handleNovaTarefa}
          onEnviarMensagem={handleEnviarMensagem}
          onNovoAviso={handleNovoAviso}
          currentView={currentView}
        />
      )}

      {currentUser.role === 'admin' && (
        <AdminView
          user={currentUser}
          todos_usuarios={USUARIOS}
          alunos={ALUNOS}
          turmas={TURMAS}
          registros={registros}
          avisos={avisos}
          currentView={currentView}
        />
      )}
    </Layout>
    {currentUser.role === 'responsavel' && selectedStudent && (
      <CalendarModal
        studentName={selectedStudent.nome}
        isOpen={isCalendarOpen}
        month={calendarMonth}
        events={calendarEvents}
        selectedDate={calendarSelectedDate}
        selectedEvent={selectedCalendarEvent}
        onClose={() => { setIsCalendarOpen(false); setCalendarSelectedEventId(null) }}
        onMonthChange={setCalendarMonth}
        onSelectDate={handleCalendarDateChange}
        onSelectEvent={event => setCalendarSelectedEventId(event.id)}
        onBackToAgenda={() => setCalendarSelectedEventId(null)}
      />
    )}
    </>
  )
}
