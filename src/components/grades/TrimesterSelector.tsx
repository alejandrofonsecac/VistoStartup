import type { Trimester } from '../../types'

interface Props {
  selected: Trimester
  onSelect: (trimester: Trimester) => void
}

export default function TrimesterSelector({ selected, onSelect }: Props) {
  const trimesters: Trimester[] = [1, 2, 3]
  return (
    <div className="inline-flex max-w-full overflow-x-auto rounded-lg p-1 bg-white" style={{ border: '1px solid #E4E2DD' }} aria-label="Selecionar trimestre">
      {trimesters.map(trimester => {
        const active = trimester === selected
        return (
          <button key={trimester} type="button" onClick={() => onSelect(trimester)} className="shrink-0 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors" style={{ backgroundColor: active ? '#1B3A4B' : 'transparent', color: active ? '#fff' : '#5C6469' }}>
            {trimester}º Trimestre
          </button>
        )
      })}
    </div>
  )
}
