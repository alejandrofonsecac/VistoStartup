import { ChevronDown, ChevronUp } from 'lucide-react'
import type { SubjectGrade } from '../../types'
import { calculateTrimesterAverage } from '../../data/grades'
import { Card } from '../Layout'

function formatGrade(grade: number | null): string {
  return grade === null ? '—' : grade.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}

interface Props {
  subject: SubjectGrade
  expanded: boolean
  onToggle: () => void
}

export default function SubjectGradeCard({ subject, expanded, onToggle }: Props) {
  const average = calculateTrimesterAverage(subject.assessments)
  return (
    <Card className="overflow-hidden">
      <button type="button" onClick={onToggle} aria-expanded={expanded} className="w-full text-left p-5 transition-colors hover:bg-[#FCFCFB]">
        <div className="flex items-start justify-between gap-3">
          <div><h3 className="text-base font-semibold" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{subject.name}</h3><p className="mt-1 text-xs" style={{ color: '#5C6469' }}>{subject.teacher}</p></div>
          <span className="p-1" style={{ color: '#5C6469' }}>{expanded ? <ChevronUp size={17} /> : <ChevronDown size={17} />}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-5">
          {subject.assessments.map(assessment => (
            <div key={assessment.id} className="min-w-0"><p className="text-[11px] truncate" style={{ color: '#7B8286' }}>{assessment.name}</p><p className="mt-1 text-lg font-semibold" style={{ color: assessment.grade === null ? '#7B8286' : '#23292E', fontFamily: 'IBM Plex Mono, monospace' }}>{formatGrade(assessment.grade)}</p></div>
          ))}
        </div>
        <div className="mt-5 pt-3 flex items-end justify-between" style={{ borderTop: '1px solid #E4E2DD' }}><span className="text-xs font-semibold" style={{ color: '#5C6469' }}>Média</span><span className="text-xl font-semibold" style={{ color: '#3F6C7A', fontFamily: 'IBM Plex Mono, monospace' }}>{formatGrade(average)}</span></div>
      </button>
      {expanded && <div className="px-5 pb-5 space-y-3" style={{ borderTop: '1px solid #E4E2DD' }}>
        {subject.assessments.length === 0 ? <p className="pt-4 text-sm" style={{ color: '#5C6469' }}>Nenhuma avaliação registrada.</p> : subject.assessments.map(assessment => <div key={assessment.id} className="pt-3 flex items-center justify-between gap-3"><div><p className="text-sm font-semibold" style={{ color: '#23292E' }}>{assessment.name}</p><p className="mt-0.5 text-xs" style={{ color: '#5C6469' }}>{assessment.date ? new Date(`${assessment.date}T12:00:00`).toLocaleDateString('pt-BR') : 'Não realizada'}</p></div><p className="text-sm font-semibold font-mono" style={{ color: assessment.grade === null ? '#7B8286' : '#23292E' }}>{formatGrade(assessment.grade)}</p></div>)}
      </div>}
    </Card>
  )
}
