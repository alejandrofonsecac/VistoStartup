import { useEffect } from 'react'
import { ArrowLeft, CalendarDays, Clock3, UserRound, X } from 'lucide-react'
import type { CalendarEvent } from '../../types'
import { CALENDAR_EVENT_META } from '../../data/calendarEvents'
import CalendarMonth, { parseDateKey } from './CalendarMonth'

interface Props {
  studentName: string
  isOpen: boolean
  month: Date
  events: CalendarEvent[]
  selectedDate: string
  selectedEvent: CalendarEvent | null
  onClose: () => void
  onMonthChange: (month: Date) => void
  onSelectDate: (date: string) => void
  onSelectEvent: (event: CalendarEvent) => void
  onBackToAgenda: () => void
}

function formatAgendaDate(key: string): string {
  return parseDateKey(key).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
}

function EventDetails({ event, onBack }: { event: CalendarEvent; onBack: () => void }) {
  const meta = CALENDAR_EVENT_META[event.type]
  const date = parseDateKey(event.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="h-full flex flex-col">
      <button type="button" onClick={onBack} className="flex items-center gap-2 self-start text-sm font-semibold mb-7 hover:underline" style={{ color: '#3F6C7A' }}>
        <ArrowLeft size={16} /> Voltar para agenda
      </button>
      <span className="self-start text-xs font-semibold px-2.5 py-1 rounded" style={{ backgroundColor: meta.background, color: meta.color }}>{meta.label.toUpperCase()}</span>
      <h3 className="mt-4 text-xl font-semibold leading-snug" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{event.title}</h3>
      <div className="mt-6 space-y-3 text-sm" style={{ color: '#5C6469' }}>
        <p className="flex items-center gap-2"><CalendarDays size={16} style={{ color: '#3F6C7A' }} />{date}</p>
        {event.time && <p className="flex items-center gap-2"><Clock3 size={16} style={{ color: '#3F6C7A' }} />{event.time}</p>}
        <p className="flex items-center gap-2"><UserRound size={16} style={{ color: '#3F6C7A' }} />{event.teacher}</p>
      </div>
      <div className="mt-7 pt-5" style={{ borderTop: '1px solid #E4E2DD' }}>
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#7B8286', fontFamily: 'IBM Plex Mono, monospace' }}>Descrição</p>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: '#5C6469' }}>{event.description}</p>
      </div>
    </div>
  )
}

function DayAgenda({ date, events, onSelectEvent }: { date: string; events: CalendarEvent[]; onSelectEvent: (event: CalendarEvent) => void }) {
  const orderedEvents = [...events].sort((a, b) => (a.time ?? '99:99').localeCompare(b.time ?? '99:99'))
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#7B8286', fontFamily: 'IBM Plex Mono, monospace' }}>Agenda do dia</p>
      <h3 className="mt-2 text-lg font-semibold capitalize" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{formatAgendaDate(date)}</h3>
      {orderedEvents.length === 0 ? (
        <div className="mt-12 text-center px-5">
          <div className="w-10 h-10 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: '#EEF4F6' }}><CalendarDays size={18} style={{ color: '#3F6C7A' }} /></div>
          <p className="mt-3 text-sm font-semibold" style={{ color: '#23292E' }}>Sem compromissos</p>
          <p className="mt-1 text-xs leading-relaxed" style={{ color: '#5C6469' }}>Nenhum compromisso neste dia.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-2">
          {orderedEvents.map(event => {
            const meta = CALENDAR_EVENT_META[event.type]
            return (
              <button key={event.id} type="button" onClick={() => onSelectEvent(event)} className="w-full text-left p-3 rounded-lg transition-colors hover:bg-[#F7F6F3]" style={{ border: '1px solid #E4E2DD' }}>
                <div className="flex items-start gap-3">
                  <span className="w-1.5 h-8 rounded-full mt-0.5 shrink-0" style={{ backgroundColor: meta.color }} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2"><p className="text-sm font-semibold truncate" style={{ color: '#23292E' }}>{event.title}</p>{event.time && <span className="text-xs shrink-0 font-mono" style={{ color: '#5C6469' }}>{event.time}</span>}</div>
                    <p className="mt-1 text-xs" style={{ color: '#5C6469' }}>{event.subject} · {meta.label}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function CalendarModal({ studentName, isOpen, month, events, selectedDate, selectedEvent, onClose, onMonthChange, onSelectDate, onSelectEvent, onBackToAgenda }: Props) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null
  const dayEvents = events.filter(event => event.date === selectedDate)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" role="presentation" onMouseDown={onClose}>
      <div className="absolute inset-0 bg-[#1B3A4B]/35" />
      <section role="dialog" aria-modal="true" aria-labelledby="calendar-modal-title" className="relative z-10 w-full max-w-6xl max-h-[92vh] overflow-y-auto bg-white rounded-xl" style={{ border: '1px solid #E4E2DD', boxShadow: '0 18px 48px rgba(27,58,75,0.18)' }} onMouseDown={event => event.stopPropagation()}>
        <header className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-white" style={{ borderBottom: '1px solid #E4E2DD' }}>
          <div><h2 id="calendar-modal-title" className="text-lg font-semibold" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>Calendário</h2><p className="text-xs mt-0.5" style={{ color: '#5C6469' }}>Agenda de {studentName}</p></div>
          <button type="button" onClick={onClose} aria-label="Fechar calendário" className="p-2 rounded-md transition-colors hover:bg-[#F7F6F3]" style={{ color: '#5C6469' }}><X size={20} /></button>
        </header>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="p-5 sm:p-7"><CalendarMonth month={month} events={events} selectedDate={selectedDate} onMonthChange={onMonthChange} onSelectDate={onSelectDate} /></div>
          <aside className="p-5 sm:p-6 min-h-80 border-t lg:border-t-0 lg:border-l" style={{ backgroundColor: '#FCFCFB', borderColor: '#E4E2DD' }}>
            {selectedEvent ? <EventDetails event={selectedEvent} onBack={onBackToAgenda} /> : <DayAgenda date={selectedDate} events={dayEvents} onSelectEvent={onSelectEvent} />}
          </aside>
        </div>
      </section>
    </div>
  )
}
