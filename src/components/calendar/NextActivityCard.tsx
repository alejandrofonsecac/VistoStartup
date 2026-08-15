import { useEffect, useState } from 'react'
import { CalendarClock } from 'lucide-react'
import type { CalendarEvent } from '../../types'
import { Card } from '../Layout'
import { dateKey } from './CalendarMonth'

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export function getNextActivityToday(events: CalendarEvent[], now = new Date()): CalendarEvent | null {
  const todayEvents = events.filter(event => event.date === dateKey(now))
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const upcomingTimed = todayEvents
    .filter(event => event.time !== null && timeToMinutes(event.time) > currentMinutes)
    .sort((a, b) => timeToMinutes(a.time ?? '23:59') - timeToMinutes(b.time ?? '23:59'))

  return upcomingTimed[0] ?? todayEvents.find(event => event.time === null) ?? null
}

interface Props {
  events: CalendarEvent[]
  onOpenEvent: (event: CalendarEvent) => void
}

export default function NextActivityCard({ events, onOpenEvent }: Props) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 15000)
    return () => window.clearInterval(interval)
  }, [])

  const nextActivity = getNextActivityToday(events, now)

  if (!nextActivity) {
    return (
      <Card className="p-4">
        <div className="flex items-center gap-2">
          <CalendarClock size={16} style={{ color: '#3F6C7A' }} />
          <p className="text-sm font-semibold" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>Próxima atividade</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: '#5C6469' }}>Nenhuma próxima atividade para hoje.</p>
      </Card>
    )
  }

  return (
    <button type="button" onClick={() => onOpenEvent(nextActivity)} className="w-full text-left rounded-lg transition-transform hover:-translate-y-0.5 focus:outline-none">
      <Card className="p-4 transition-colors hover:bg-[#FCFCFB]">
        <div className="flex items-center gap-2">
          <CalendarClock size={16} style={{ color: '#3F6C7A' }} />
          <p className="text-sm font-semibold" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>Próxima atividade</p>
        </div>
        <p className="mt-3 text-sm font-semibold leading-snug" style={{ color: '#23292E' }}>{nextActivity.title}</p>
        <p className="mt-1 text-xs font-mono" style={{ color: '#3F6C7A' }}>{nextActivity.time ?? 'Durante o dia'}</p>
        <p className="mt-3 text-xs" style={{ color: '#5C6469' }}>Próxima atividade do dia</p>
      </Card>
    </button>
  )
}
