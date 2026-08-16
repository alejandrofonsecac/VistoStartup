export type HistoryFilter = 'all' | 'completed' | 'overdue'

interface Props {
  selected: HistoryFilter
  counts: Record<HistoryFilter, number>
  onSelect: (filter: HistoryFilter) => void
}

export default function HistoryFilters({ selected, counts, onSelect }: Props) {
  const filters: { id: HistoryFilter; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'completed', label: 'Concluídas' },
    { id: 'overdue', label: 'Não entregues' },
  ]

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map(filter => {
        const active = filter.id === selected
        return <button key={filter.id} type="button" onClick={() => onSelect(filter.id)} className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors" style={{ backgroundColor: active ? '#1B3A4B' : '#fff', color: active ? '#fff' : '#5C6469', border: '1px solid #E4E2DD' }}>{filter.label} <span className="ml-1 opacity-75">{counts[filter.id]}</span></button>
      })}
    </div>
  )
}
