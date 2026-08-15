import { CalendarDays, BookOpen } from 'lucide-react'

interface Props {
  variant: 'upcoming' | 'no-subjects'
}

export default function GradesEmptyState({ variant }: Props) {
  const upcoming = variant === 'upcoming'
  return (
    <div className="max-w-lg mx-auto py-14 px-6 text-center rounded-lg bg-white" style={{ border: '1px solid #E4E2DD' }}>
      <div className="w-11 h-11 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: '#EEF4F6' }}>
        {upcoming ? <CalendarDays size={20} style={{ color: '#3F6C7A' }} /> : <BookOpen size={20} style={{ color: '#3F6C7A' }} />}
      </div>
      <p className="mt-4 text-base font-semibold" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{upcoming ? 'O 3º trimestre ainda não começou.' : 'Nenhuma disciplina encontrada para este período.'}</p>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: '#5C6469' }}>{upcoming ? 'As notas aparecerão aqui quando esse período for iniciado.' : 'As avaliações aparecerão aqui assim que forem registradas.'}</p>
    </div>
  )
}
