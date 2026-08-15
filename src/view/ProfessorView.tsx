import { useState, useRef, useEffect } from 'react'
import { Users, Plus, Send, CheckCircle2, AlertTriangle, Megaphone } from 'lucide-react'
import type { User, Aluno, Turma, Registro, Tarefa, Conversa, CategoriaRegistro, ViewName } from '../types'
import { PageHeader, Card, CategoriaBadge, formatDate, formatTime, formatDateShort } from '../components/Layout'

interface Props {
  user: User
  alunos: Aluno[]
  turmas: Turma[]
  registros: Registro[]
  tarefas: Tarefa[]
  conversas: Conversa[]
  onNovoRegistro: (r: Omit<Registro, 'id' | 'vistoResponsavel'>) => void
  onNovaTarefa: (t: Omit<Tarefa, 'id'>) => void
  onEnviarMensagem: (conversaId: string, texto: string) => void
  onNovoAviso: (titulo: string, texto: string, turmaId: string, urgente: boolean) => void
  currentView: ViewName
}

const CATEGORIAS: CategoriaRegistro[] = ['Comportamento', 'Desempenho', 'Aviso', 'Elogio', 'Participação']

export default function ProfessorView({
  user, alunos, turmas, registros, tarefas, conversas,
  onNovoRegistro, onNovaTarefa, onEnviarMensagem, onNovoAviso, currentView,
}: Props) {
  const minhasTurmas = turmas.filter(t => t.professorIds.includes(user.id))
  const meusAlunos = alunos.filter(a => minhasTurmas.some(t => t.alunoIds.includes(a.id)))
  const meusRegistros = registros.filter(r => r.professorId === user.id).sort((a, b) => b.dataHora.localeCompare(a.dataHora))
  const minhasConversas = conversas.filter(c => c.professorId === user.id)

  if (currentView === 'inicio') {
    return (
      <div>
        <PageHeader title="Minhas Turmas" subtitle={`${user.materia ? `${user.materia} · ` : ''}${meusAlunos.length} alunos em ${minhasTurmas.length} turma(s)`} />
        <div className="px-6 py-5 space-y-5 max-w-3xl">
          {minhasTurmas.map(turma => {
            const alunosDaTurma = meusAlunos.filter(a => a.turmaId === turma.id)
            return (
              <Card key={turma.id} className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-bold text-base" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{turma.label}</h2>
                    <p className="text-xs" style={{ color: '#5C6469', fontFamily: 'IBM Plex Mono, monospace' }}>{alunosDaTurma.length} alunos</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {alunosDaTurma.map(a => {
                    const registrosAluno = meusRegistros.filter(r => r.alunoId === a.id)
                    const temImportante = registrosAluno.some(r => r.urgencia === 'Importante')
                    return (
                      <div key={a.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ backgroundColor: '#F7F6F3', border: '1px solid #E4E2DD' }}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ backgroundColor: '#EEF4F6', color: '#3F6C7A' }}>
                          {a.nome.split(' ').slice(0, 2).map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate" style={{ color: '#23292E' }}>{a.nome}</p>
                          <p className="text-xs" style={{ color: '#5C6469' }}>{registrosAluno.length} registro(s)</p>
                        </div>
                        {temImportante && <AlertTriangle size={14} style={{ color: '#A44A2E', flexShrink: 0 }} />}
                      </div>
                    )
                  })}
                </div>
              </Card>
            )
          })}

          {/* Últimos registros meus */}
          {meusRegistros.length > 0 && (
            <div>
              <h2 className="text-base font-semibold mb-3" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>Meus últimos registros</h2>
              <div className="space-y-2">
                {meusRegistros.slice(0, 3).map(r => {
                  const aluno = alunos.find(a => a.id === r.alunoId)
                  return (
                    <Card key={r.id} className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <CategoriaBadge categoria={r.categoria} urgencia={r.urgencia} />
                        <span className="text-xs ml-auto" style={{ color: '#5C6469', fontFamily: 'IBM Plex Mono, monospace' }}>{aluno?.nome}</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: '#23292E' }}>{r.descricao}</p>
                      <p className="text-xs mt-1" style={{ color: '#5C6469', fontFamily: 'IBM Plex Mono, monospace' }}>{formatDate(r.dataHora)}</p>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (currentView === 'registros') {
    return <NovoRegistroForm user={user} alunos={meusAlunos} onSubmit={onNovoRegistro} />
  }

  if (currentView === 'nova-tarefa') {
    return <NovaTarefaForm user={user} turmas={minhasTurmas} alunos={meusAlunos} onSubmit={onNovaTarefa} />
  }

  if (currentView === 'recados') {
    return <RecadosForm user={user} turmas={minhasTurmas} onSubmit={onNovoAviso} />
  }

  if (currentView === 'chat') {
    return <ChatProfessor conversas={minhasConversas} user={user} alunos={alunos} onEnviarMensagem={onEnviarMensagem} />
  }

  return null
}

function NovoRegistroForm({ user, alunos, onSubmit }: {
  user: User; alunos: Aluno[]; onSubmit: (r: Omit<Registro, 'id' | 'vistoResponsavel'>) => void
}) {
  const [alunoId, setAlunoId] = useState('')
  const [categoria, setCategoria] = useState<CategoriaRegistro>('Comportamento')
  const [urgencia, setUrgencia] = useState<'Normal' | 'Importante'>('Normal')
  const [descricao, setDescricao] = useState('')
  const [sucesso, setSucesso] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!alunoId || !descricao.trim()) return
    onSubmit({
      alunoId,
      professorId: user.id,
      professorNome: user.nome,
      categoria,
      descricao: descricao.trim(),
      urgencia,
      dataHora: new Date().toISOString(),
    })
    setAlunoId('')
    setDescricao('')
    setUrgencia('Normal')
    setSucesso(true)
    setTimeout(() => setSucesso(false), 3000)
  }

  return (
    <div>
      <PageHeader title="Novo Registro" subtitle="Registre uma observação sobre um aluno" />
      <div className="px-6 py-5 max-w-xl">
        {sucesso && (
          <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-lg" style={{ backgroundColor: '#EEF4F1', border: '1px solid #C5DDD0', color: '#3D6E52' }}>
            <CheckCircle2 size={16} />
            <span className="text-sm font-semibold">Registro salvo com sucesso!</span>
          </div>
        )}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#23292E' }}>Aluno</label>
              <select value={alunoId} onChange={e => setAlunoId(e.target.value)} required
                className="w-full px-4 py-3 rounded-lg text-sm"
                style={{ border: '1px solid #E4E2DD', backgroundColor: '#FAFAFA', color: '#23292E', outline: 'none' }}>
                <option value="">Selecionar aluno…</option>
                {alunos.map(a => <option key={a.id} value={a.id}>{a.nome} — {a.turmaLabel}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#23292E' }}>Categoria</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIAS.map(cat => (
                  <button key={cat} type="button" onClick={() => setCategoria(cat)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                    style={{ backgroundColor: categoria === cat ? '#1B3A4B' : '#F7F6F3', color: categoria === cat ? '#fff' : '#5C6469', border: '1px solid #E4E2DD' }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#23292E' }}>Prioridade</label>
              <div className="flex gap-3">
                {(['Normal', 'Importante'] as const).map(u => (
                  <button key={u} type="button" onClick={() => setUrgencia(u)}
                    className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={{
                      backgroundColor: urgencia === u ? (u === 'Importante' ? '#A44A2E' : '#1B3A4B') : '#F7F6F3',
                      color: urgencia === u ? '#fff' : '#5C6469',
                      border: '1px solid #E4E2DD',
                    }}>
                    {u === 'Importante' ? '⚠ Importante — avisar responsável' : 'Normal'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#23292E' }}>Observação</label>
              <textarea
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                required
                rows={4}
                placeholder="Descreva a observação de forma clara e objetiva…"
                className="w-full px-4 py-3 rounded-lg text-sm resize-none leading-relaxed"
                style={{ border: '1px solid #E4E2DD', backgroundColor: '#FAFAFA', color: '#23292E', outline: 'none' }}
              />
              <p className="text-xs mt-1" style={{ color: '#5C6469' }}>{descricao.length} caracteres</p>
            </div>

            <button type="submit" disabled={!alunoId || !descricao.trim()}
              className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-all"
              style={{ backgroundColor: alunoId && descricao.trim() ? '#1B3A4B' : '#CBD5D8' }}>
              Salvar registro
            </button>
          </form>
        </Card>
      </div>
    </div>
  )
}

function NovaTarefaForm({ user, turmas, alunos, onSubmit }: {
  user: User; turmas: Turma[]; alunos: Aluno[]; onSubmit: (t: Omit<Tarefa, 'id'>) => void
}) {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [dataEntrega, setDataEntrega] = useState('')
  const [material, setMaterial] = useState('')
  const [turmaId, setTurmaId] = useState(turmas[0]?.id ?? '')
  const [sucesso, setSucesso] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo.trim() || !turmaId || !dataEntrega) return
    onSubmit({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      materia: user.materia ?? 'Geral',
      professorNome: user.nome,
      dataEntrega,
      materialNecessario: material.trim(),
      turmaId,
    })
    setTitulo('')
    setDescricao('')
    setDataEntrega('')
    setMaterial('')
    setSucesso(true)
    setTimeout(() => setSucesso(false), 3000)
  }

  return (
    <div>
      <PageHeader title="Nova Tarefa" subtitle="Crie uma atividade ou trabalho para a turma" />
      <div className="px-6 py-5 max-w-xl">
        {sucesso && (
          <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-lg" style={{ backgroundColor: '#EEF4F1', border: '1px solid #C5DDD0', color: '#3D6E52' }}>
            <CheckCircle2 size={16} />
            <span className="text-sm font-semibold">Tarefa criada e publicada para os alunos!</span>
          </div>
        )}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#23292E' }}>Título da tarefa</label>
              <input value={titulo} onChange={e => setTitulo(e.target.value)} required placeholder="Ex: Lista de Exercícios — Capítulo 5"
                className="w-full px-4 py-3 rounded-lg text-sm"
                style={{ border: '1px solid #E4E2DD', backgroundColor: '#FAFAFA', color: '#23292E', outline: 'none' }} />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#23292E' }}>Descrição</label>
              <textarea value={descricao} onChange={e => setDescricao(e.target.value)} rows={3}
                placeholder="Instrução detalhada da tarefa…"
                className="w-full px-4 py-3 rounded-lg text-sm resize-none"
                style={{ border: '1px solid #E4E2DD', backgroundColor: '#FAFAFA', color: '#23292E', outline: 'none' }} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#23292E' }}>Turma</label>
                <select value={turmaId} onChange={e => setTurmaId(e.target.value)} required
                  className="w-full px-4 py-3 rounded-lg text-sm"
                  style={{ border: '1px solid #E4E2DD', backgroundColor: '#FAFAFA', color: '#23292E', outline: 'none' }}>
                  {turmas.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#23292E' }}>Data de entrega</label>
                <input type="date" value={dataEntrega} onChange={e => setDataEntrega(e.target.value)} required
                  className="w-full px-4 py-3 rounded-lg text-sm"
                  style={{ border: '1px solid #E4E2DD', backgroundColor: '#FAFAFA', color: '#23292E', outline: 'none' }} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#23292E' }}>Material necessário</label>
              <input value={material} onChange={e => setMaterial(e.target.value)} placeholder="Ex: Caderno, régua, lápis de cor"
                className="w-full px-4 py-3 rounded-lg text-sm"
                style={{ border: '1px solid #E4E2DD', backgroundColor: '#FAFAFA', color: '#23292E', outline: 'none' }} />
            </div>

            <button type="submit" disabled={!titulo.trim() || !turmaId || !dataEntrega}
              className="w-full py-3 rounded-lg text-white font-semibold text-sm"
              style={{ backgroundColor: titulo.trim() && turmaId && dataEntrega ? '#1B3A4B' : '#CBD5D8' }}>
              Publicar tarefa
            </button>
          </form>
        </Card>
      </div>
    </div>
  )
}

function RecadosForm({ user, turmas, onSubmit }: {
  user: User; turmas: Turma[]; onSubmit: (titulo: string, texto: string, turmaId: string, urgente: boolean) => void
}) {
  const [titulo, setTitulo] = useState('')
  const [texto, setTexto] = useState('')
  const [turmaId, setTurmaId] = useState('todos')
  const [urgente, setUrgente] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo.trim() || !texto.trim()) return
    onSubmit(titulo.trim(), texto.trim(), turmaId, urgente)
    setTitulo('')
    setTexto('')
    setUrgente(false)
    setSucesso(true)
    setTimeout(() => setSucesso(false), 3000)
  }

  return (
    <div>
      <PageHeader title="Novo Recado" subtitle="Envie um aviso para a turma ou para toda a escola" />
      <div className="px-6 py-5 max-w-xl">
        {sucesso && (
          <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-lg" style={{ backgroundColor: '#EEF4F1', border: '1px solid #C5DDD0', color: '#3D6E52' }}>
            <CheckCircle2 size={16} />
            <span className="text-sm font-semibold">Recado enviado com sucesso!</span>
          </div>
        )}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#23292E' }}>Título do recado</label>
              <input value={titulo} onChange={e => setTitulo(e.target.value)} required placeholder="Ex: Trazer material de Arte amanhã"
                className="w-full px-4 py-3 rounded-lg text-sm"
                style={{ border: '1px solid #E4E2DD', backgroundColor: '#FAFAFA', color: '#23292E', outline: 'none' }} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#23292E' }}>Mensagem</label>
              <textarea value={texto} onChange={e => setTexto(e.target.value)} required rows={4}
                placeholder="Detalhes do recado…"
                className="w-full px-4 py-3 rounded-lg text-sm resize-none"
                style={{ border: '1px solid #E4E2DD', backgroundColor: '#FAFAFA', color: '#23292E', outline: 'none' }} />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#23292E' }}>Destinatário</label>
              <select value={turmaId} onChange={e => setTurmaId(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm"
                style={{ border: '1px solid #E4E2DD', backgroundColor: '#FAFAFA', color: '#23292E', outline: 'none' }}>
                <option value="todos">Todas as turmas</option>
                {turmas.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setUrgente(v => !v)}
                  className="w-10 h-5 rounded-full transition-all flex items-center px-0.5"
                  style={{ backgroundColor: urgente ? '#A44A2E' : '#CBD5D8' }}>
                  <div className="w-4 h-4 rounded-full bg-white transition-all" style={{ transform: urgente ? 'translateX(20px)' : 'translateX(0)' }} />
                </div>
                <span className="text-sm font-semibold" style={{ color: '#23292E' }}>Marcar como urgente</span>
              </label>
            </div>
            <button type="submit" disabled={!titulo.trim() || !texto.trim()}
              className="w-full py-3 rounded-lg text-white font-semibold text-sm"
              style={{ backgroundColor: titulo.trim() && texto.trim() ? '#1B3A4B' : '#CBD5D8' }}>
              Enviar recado
            </button>
          </form>
        </Card>
      </div>
    </div>
  )
}

function ChatProfessor({ conversas, user, alunos, onEnviarMensagem }: {
  conversas: Conversa[]; user: User; alunos: Aluno[]; onEnviarMensagem: (id: string, texto: string) => void
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
      <PageHeader title="Chat com responsáveis" subtitle="Conversas individuais por aluno" />
      <div className="flex flex-1 overflow-hidden mx-6 my-4 rounded-lg" style={{ border: '1px solid #E4E2DD' }}>
        <div className="w-56 shrink-0 overflow-y-auto" style={{ borderRight: '1px solid #E4E2DD', backgroundColor: '#FAFAFA' }}>
          {conversas.length === 0 && (
            <div className="p-4 text-xs text-center" style={{ color: '#5C6469' }}>Nenhuma conversa ainda.</div>
          )}
          {conversas.map(c => (
            <button key={c.id} onClick={() => setConversaSelecionada(c.id)}
              className="w-full text-left px-4 py-3 border-b transition-colors"
              style={{ borderBottomColor: '#E4E2DD', backgroundColor: conversaSelecionada === c.id ? '#EEF4F6' : 'transparent' }}>
              <p className="text-xs font-semibold truncate" style={{ color: '#23292E' }}>{c.alunoNome}</p>
              <p className="text-xs truncate" style={{ color: '#5C6469' }}>{c.responsavelNome}</p>
            </button>
          ))}
        </div>
        {conversa ? (
          <div className="flex-1 flex flex-col min-w-0">
            <div className="px-4 py-3" style={{ borderBottom: '1px solid #E4E2DD' }}>
              <p className="text-sm font-semibold" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{conversa.alunoNome}</p>
              <p className="text-xs" style={{ color: '#5C6469' }}>Responsável: {conversa.responsavelNome}</p>
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
              <input value={texto} onChange={e => setTexto(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && enviar()}
                placeholder="Escreva uma mensagem…"
                className="flex-1 px-4 py-2 rounded-lg text-sm"
                style={{ border: '1px solid #E4E2DD', backgroundColor: '#F7F6F3', color: '#23292E', outline: 'none' }} />
              <button onClick={enviar} disabled={!texto.trim()} className="px-3 py-2 rounded-lg flex items-center gap-2"
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
