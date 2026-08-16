import { useState } from 'react'
import type { Aluno, Trimester } from '../types'
import { GRADES_BY_STUDENT } from '../data/grades'
import { PageHeader } from '../components/Layout'
import TrimesterSelector from '../components/grades/TrimesterSelector'
import SubjectGradeCard from '../components/grades/SubjectGradeCard'
import GradesEmptyState from '../components/grades/GradesEmptyState'

interface Props {
  filhos: Aluno[]
  filhoSelecionado: string
  onFilhoSelecionado: (id: string) => void
}

export default function NotasView({ filhos, filhoSelecionado, onFilhoSelecionado }: Props) {
  const [selectedTrimester, setSelectedTrimester] = useState<Trimester>(1)
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null)
  const student = filhos.find(filho => filho.id === filhoSelecionado) ?? filhos[0]
  const subjects = student ? GRADES_BY_STUDENT[student.id]?.[selectedTrimester] ?? [] : []

  const selectStudent = (id: string) => {
    onFilhoSelecionado(id)
    setExpandedSubject(null)
  }

  return (
    <div>
      <PageHeader title="Notas" subtitle="Acompanhe o desempenho escolar." />
      <div className="px-6 py-6 max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {filhos.length > 1 && <div className="flex gap-2 flex-wrap">{filhos.map(filho => <button key={filho.id} type="button" onClick={() => selectStudent(filho.id)} className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all" style={{ backgroundColor: filho.id === student?.id ? '#1B3A4B' : '#fff', color: filho.id === student?.id ? '#fff' : '#5C6469', border: '1px solid #E4E2DD' }}>{filho.nome.split(' ')[0]}</button>)}</div>}
          <div className={filhos.length > 1 ? '' : 'sm:ml-auto'}>
            <TrimesterSelector selected={selectedTrimester} onSelect={trimester => { setSelectedTrimester(trimester); setExpandedSubject(null) }} />
          </div>
        </div>
        <div className="mt-6">
          {selectedTrimester === 3 ? <GradesEmptyState variant="upcoming" /> : subjects.length === 0 ? <GradesEmptyState variant="no-subjects" /> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{subjects.map(subject => <SubjectGradeCard key={subject.id} subject={subject} expanded={expandedSubject === subject.id} onToggle={() => setExpandedSubject(previous => previous === subject.id ? null : subject.id)} />)}</div>}
        </div>
      </div>
    </div>
  )
}
