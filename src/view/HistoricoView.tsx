import { useState } from 'react'
import type { Aluno, Tarefa } from '../types'
import { PageHeader } from '../components/Layout'
import { dateKey } from '../components/calendar/CalendarMonth'
import HistoryFilters, { type HistoryFilter } from '../components/history/HistoryFilters'
import HistoryItem from '../components/history/HistoryItem'

interface Props {
  filhos: Aluno[]
  filhoSelecionado: string
  onFilhoSelecionado: (id: string) => void
  tarefas: Tarefa[]
}

type HistoryTask = { task: Tarefa; status: 'completed' | 'overdue'; activityDate: string }

function getHistoryTasks(tarefas: Tarefa[], student: Aluno | undefined): HistoryTask[] {
  if (!student) return []

  const today = dateKey(new Date())
  return tarefas.flatMap(task => {
    const pertenceAoAluno = task.alunoId === student.id
    const pertenceATurma = !task.alunoId && task.turmaId === student.turmaId
    if (!pertenceAoAluno && !pertenceATurma) return []
    if (task.concluida === true) return [{ task, status: 'completed' as const, activityDate: task.concluidaEm ?? task.dataEntrega }]
    if (!task.concluida && task.dataEntrega < today) return [{ task, status: 'overdue' as const, activityDate: task.dataEntrega }]
    return []
  }).sort((a, b) => b.activityDate.localeCompare(a.activityDate))
}

function monthLabel(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
}

export default function HistoricoView({ filhos, filhoSelecionado, onFilhoSelecionado, tarefas }: Props) {
  const [filter, setFilter] = useState<HistoryFilter>('all')
  const [expandedTask, setExpandedTask] = useState<string | null>(null)
  const student = filhos.find(filho => filho.id === filhoSelecionado) ?? filhos[0]
  const history = getHistoryTasks(tarefas, student)
  const counts = { all: history.length, completed: history.filter(item => item.status === 'completed').length, overdue: history.filter(item => item.status === 'overdue').length }
  const filtered = filter === 'all' ? history : history.filter(item => item.status === filter)
  const groups = filtered.reduce<Record<string, HistoryTask[]>>((acc, item) => { const key = item.activityDate.slice(0, 7); acc[key] = [...(acc[key] ?? []), item]; return acc }, {})

  const selectStudent = (id: string) => { onFilhoSelecionado(id); setExpandedTask(null) }
  const emptyMessage = filter === 'overdue' ? 'Nenhuma atividade pendente passou do prazo.' : 'Nenhuma atividade encontrada no histórico.'

  return (
    <div>
      <PageHeader title="Histórico" subtitle="Acompanhe as atividades anteriores." />
      <div className="px-6 py-6 max-w-3xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {filhos.length > 1 && <div className="flex gap-2 flex-wrap">{filhos.map(filho => <button key={filho.id} type="button" onClick={() => selectStudent(filho.id)} className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all" style={{ backgroundColor: filho.id === student?.id ? '#1B3A4B' : '#fff', color: filho.id === student?.id ? '#fff' : '#5C6469', border: '1px solid #E4E2DD' }}>{filho.nome.split(' ')[0]}</button>)}</div>}
          <div className={filhos.length > 1 ? '' : 'sm:ml-auto'}>
            <HistoryFilters selected={filter} counts={counts} onSelect={selected => { setFilter(selected); setExpandedTask(null) }} />
          </div>
        </div>
        {filtered.length === 0 ? <div className="mt-8 py-12 px-5 text-center rounded-lg bg-white" style={{ border: '1px solid #E4E2DD' }}><p className="text-sm" style={{ color: '#5C6469' }}>{emptyMessage}</p></div> : <div className="mt-6 space-y-7">{Object.entries(groups).map(([month, items]) => <section key={month}><h2 className="mb-3 text-xs font-semibold uppercase tracking-wide capitalize" style={{ color: '#7B8286', fontFamily: 'IBM Plex Mono, monospace' }}>{monthLabel(`${month}-01`)}</h2><div className="space-y-3">{items.map(item => <HistoryItem key={item.task.id} task={item.task} status={item.status} expanded={expandedTask === item.task.id} onToggle={() => setExpandedTask(previous => previous === item.task.id ? null : item.task.id)} />)}</div></section>)}</div>}
      </div>
    </div>
  )
}
