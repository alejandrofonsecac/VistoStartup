import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CalendarEvent } from '../../types'
import { CALENDAR_EVENT_META } from '../../data/calendarEvents'

const WEEK_DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

export function dateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseDateKey(key: string): Date {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function monthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

interface Props {
  month: Date
  events: CalendarEvent[]
  selectedDate: string
  onMonthChange: (month: Date) => void
  onSelectDate: (date: string) => void
  compact?: boolean
}

export default function CalendarMonth({ month, events, selectedDate, onMonthChange, onSelectDate, compact = false }: Props) {
  const firstDay = monthStart(month)
  const offset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const eventsByDate = events.reduce<Record<string, CalendarEvent[]>>((acc, event) => {
    acc[event.date] = [...(acc[event.date] ?? []), event]
    return acc
  }, {})
  const today = dateKey(new Date())
  const monthLabel = firstDay.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  const cells = Array.from({ length: offset + daysInMonth }, (_, index) => index < offset ? null : index - offset + 1)

  const changeMonth = (amount: number) => {
    onMonthChange(new Date(firstDay.getFullYear(), firstDay.getMonth() + amount, 1))
  }

  return (
    <div>
      <div className={`flex items-center justify-between ${compact ? 'mb-3' : 'mb-5'}`}>
        <h3 className={compact ? 'text-sm font-semibold capitalize' : 'text-lg font-semibold capitalize'} style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>
          {monthLabel}
        </h3>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => changeMonth(-1)} aria-label="Mês anterior" className="p-1.5 rounded-md transition-colors hover:bg-[#F7F6F3]" style={{ color: '#5C6469' }}>
            <ChevronLeft size={compact ? 16 : 18} />
          </button>
          <button type="button" onClick={() => changeMonth(1)} aria-label="Próximo mês" className="p-1.5 rounded-md transition-colors hover:bg-[#F7F6F3]" style={{ color: '#5C6469' }}>
            <ChevronRight size={compact ? 16 : 18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {WEEK_DAYS.map(day => (
          <span key={day} className={`text-center font-medium ${compact ? 'text-[10px]' : 'text-xs'}`} style={{ color: '#7B8286', fontFamily: 'IBM Plex Mono, monospace' }}>
            <span className={compact ? 'sm:hidden' : 'hidden'}>{day.charAt(0)}</span>
            <span className={compact ? 'hidden sm:inline' : ''}>{day}</span>
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, index) => {
          if (!day) return <div key={`empty-${index}`} aria-hidden="true" />
          const key = dateKey(new Date(firstDay.getFullYear(), firstDay.getMonth(), day))
          const dayEvents = eventsByDate[key] ?? []
          const categories = [...new Set(dayEvents.map(event => event.type))]
          const isSelected = key === selectedDate
          const isToday = key === today

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectDate(key)}
              aria-label={`${day} de ${monthLabel}${dayEvents.length ? `, ${dayEvents.length} evento${dayEvents.length > 1 ? 's' : ''}` : ''}`}
              aria-pressed={isSelected}
              className={`group relative flex flex-col items-center justify-start rounded-md transition-colors hover:bg-[#F7F6F3] ${compact ? 'min-h-9 py-0.5' : 'min-h-20 p-1.5 text-left items-start'}`}
              style={{
                backgroundColor: isSelected ? '#1B3A4B' : 'transparent',
                color: isSelected ? '#fff' : '#23292E',
                outline: isToday && !isSelected ? '1px solid #3F6C7A' : 'none',
                outlineOffset: '-1px',
              }}
            >
              <span className={`${compact ? 'text-xs leading-4' : 'text-sm leading-5'} ${isToday || isSelected ? 'font-semibold' : ''}`}>{day}</span>
              {categories.length > 0 && (
                <span className={`flex gap-0.5 ${compact ? 'mt-0.5 h-1.5' : 'mt-1 h-1.5'}`} aria-hidden="true">
                  {categories.slice(0, 3).map(type => (
                    <span key={type} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isSelected ? '#fff' : CALENDAR_EVENT_META[type].color }} />
                  ))}
                </span>
              )}
              {!compact && dayEvents[0] && (
                <span className="mt-1 text-[10px] leading-3 line-clamp-2 w-full" style={{ color: isSelected ? 'rgba(255,255,255,0.82)' : '#5C6469' }}>
                  {dayEvents[0].title}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
