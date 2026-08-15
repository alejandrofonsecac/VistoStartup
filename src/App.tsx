import { useState } from 'react'
import type { User, ViewName, Registro, Tarefa, Conversa, Aviso, Mensagem } from './types'
import { USUARIOS, ALUNOS, TURMAS, REGISTROS_INICIAIS, TAREFAS_INICIAIS, CONVERSAS_INICIAIS, AVISOS_INICIAIS, CREDENCIAIS } from './data'
import Login from './components/Login'
import Layout from './components/Layout'
import ResponsavelView from './view/ResponsavelView'
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

  const handleLogin = (user: User) => {
    setCurrentUser(user)
    setCurrentView(defaultView(user.role))
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setCurrentView('inicio')
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

  return (
    <Layout
      user={currentUser}
      currentView={currentView}
      onViewChange={handleViewChange}
      onLogout={handleLogout}
      unreadCount={unreadAvisos}
    >
      {currentUser.role === 'responsavel' && (
        <ResponsavelView
          user={currentUser}
          filhos={filhos}
          registros={registros}
          tarefas={tarefas}
          conversas={conversas}
          avisos={avisos}
          avisosVistos={avisosVistos}
          onMarcarAvisoVisto={handleMarcarAvisoVisto}
          onEnviarMensagem={handleEnviarMensagem}
          currentView={currentView}
        />
      )}

      {currentUser.role === 'aluno' && (
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
  )
}
