import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import type { Tarefa } from '../../types'
import { Card } from '../Layout'

interface Props {
  task: Tarefa
  status: 'completed' | 'overdue'
  expanded: boolean
  onToggle: () => void
}

function formatDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function HistoryItem({ task, status, expanded, onToggle }: Props) {
  const completed = status === 'completed'
  const statusColor = completed ? '#3D6E52' : '#A44A2E'
  const statusBackground = completed ? '#EEF4F1' : '#FDF2EE'

  return (
    <Card className="overflow-hidden">
      <button type="button" onClick={onToggle} aria-expanded={expanded} className="w-full text-left p-4 sm:p-5 transition-colors hover:bg-[#FCFCFB]">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 shrink-0" style={{ color: statusColor }}>{completed ? <CheckCircle2 size={19} /> : <AlertCircle size={19} />}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3"><div><h3 className="text-sm font-semibold" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{task.titulo}</h3><p className="mt-1 text-xs" style={{ color: '#5C6469' }}>{task.materia}</p></div><span className="p-0.5 shrink-0" style={{ color: '#5C6469' }}>{expanded ? <ChevronUp size={17} /> : <ChevronDown size={17} />}</span></div>
            <p className="mt-3 text-xs" style={{ color: '#5C6469' }}>{completed ? `Entrega: ${formatDate(task.dataEntrega)}` : `Prazo: ${formatDate(task.dataEntrega)}`}</p>
            <span className="inline-flex mt-2 px-2 py-0.5 rounded text-xs font-semibold" style={{ backgroundColor: statusBackground, color: statusColor }}>{completed ? 'Concluída' : 'Não entregue'}</span>
          </div>
        </div>
      </button>
      {expanded && <div className="px-5 pb-5 ml-8" style={{ borderTop: '1px solid #E4E2DD' }}>
        <p className="pt-4 text-sm leading-relaxed" style={{ color: '#5C6469' }}>{task.descricao}</p>
        <div className="mt-4 grid gap-2 text-xs" style={{ color: '#5C6469' }}><p><span className="font-semibold" style={{ color: '#23292E' }}>Professor: </span>{task.professorNome}</p><p><span className="font-semibold" style={{ color: '#23292E' }}>Prazo: </span>{formatDate(task.dataEntrega)}</p>{completed && task.concluidaEm && <p><span className="font-semibold" style={{ color: '#23292E' }}>Concluída em: </span>{formatDate(task.concluidaEm)}</p>}{task.materialNecessario && <p><span className="font-semibold" style={{ color: '#23292E' }}>Material: </span>{task.materialNecessario}</p>}</div>
      </div>}
    </Card>
  )
}
