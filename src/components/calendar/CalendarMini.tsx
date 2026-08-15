import type { CalendarEvent } from '../../types'
import { CalendarDays } from 'lucide-react'
import { Card } from '../Layout'
import CalendarMonth from './CalendarMonth'

interface Props {
  studentName: string
  month: Date
  events: CalendarEvent[]
  selectedDate: string
  onMonthChange: (month: Date) => void
  onOpen: () => void
  onSelectDate: (date: string) => void
}

export default function CalendarMini({ studentName, month, events, selectedDate, onMonthChange, onOpen, onSelectDate }: Props) {
  const handleSelect = (date: string) => {
    onSelectDate(date)
    onOpen()
  }

  return (
    <Card className="p-4 lg:p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays size={16} style={{ color: '#3F6C7A' }} />
            <p className="text-sm font-semibold" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>Calendário</p>
          </div>
          <p className="text-xs mt-1" style={{ color: '#5C6469' }}>Agenda de {studentName.split(' ')[0]}</p>
        </div>
        <button type="button" onClick={onOpen} className="text-xs font-semibold transition-colors hover:underline" style={{ color: '#3F6C7A' }} aria-label="Abrir calendário completo">
          Ver agenda
        </button>
      </div>
      <CalendarMonth
        compact
        month={month}
        events={events}
        selectedDate={selectedDate}
        onMonthChange={onMonthChange}
        onSelectDate={handleSelect}
      />
    </Card>
  )
}
