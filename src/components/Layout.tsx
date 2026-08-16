import { GraduationCap, Home, Clock, BookOpen, MessageCircle, Bell, PenLine, Megaphone, LayoutDashboard, Users, School, AlertTriangle, LogOut, CalendarDays, ClipboardCheck, Accessibility } from 'lucide-react'
import type { User, ViewName } from '../types'

interface NavItem {
  view: ViewName
  label: string
  icon: React.ReactNode
  calendarAction?: boolean
}

function getNavItems(role: string): NavItem[] {
  switch (role) {
    case 'responsavel':
      return [
        { view: 'inicio', label: 'Início', icon: <Home size={18} /> },
        { view: 'timeline', label: 'Histórico', icon: <Clock size={18} /> },
        { view: 'tarefas', label: 'Tarefas', icon: <BookOpen size={18} /> },
        { view: 'notas', label: 'Notas', icon: <ClipboardCheck size={18} /> },
        { view: 'inicio', label: 'Calendário', icon: <CalendarDays size={18} />, calendarAction: true },
        { view: 'chat', label: 'Chat', icon: <MessageCircle size={18} /> },
        { view: 'avisos', label: 'Avisos', icon: <Bell size={18} /> },
      ]
    case 'aluno':
      return [
        { view: 'inicio', label: 'Início', icon: <Home size={18} /> },
        { view: 'timeline', label: 'Histórico', icon: <Clock size={18} /> },
        { view: 'tarefas', label: 'Tarefas', icon: <BookOpen size={18} /> },
        { view: 'avisos', label: 'Avisos', icon: <Bell size={18} /> },
      ]
    case 'professor':
      return [
        { view: 'inicio', label: 'Turmas', icon: <Home size={18} /> },
        { view: 'registros', label: 'Novo Registro', icon: <PenLine size={18} /> },
        { view: 'nova-tarefa', label: 'Nova Tarefa', icon: <BookOpen size={18} /> },
        { view: 'recados', label: 'Recados', icon: <Megaphone size={18} /> },
        { view: 'chat', label: 'Chat', icon: <MessageCircle size={18} /> },
      ]
    case 'admin':
      return [
        { view: 'painel', label: 'Painel Geral', icon: <LayoutDashboard size={18} /> },
        { view: 'usuarios', label: 'Usuários', icon: <Users size={18} /> },
        { view: 'turmas', label: 'Turmas', icon: <School size={18} /> },
        { view: 'avisos', label: 'Alertas', icon: <AlertTriangle size={18} /> },
      ]
    default:
      return []
  }
}

interface Props {
  user: User
  currentView: ViewName
  onViewChange: (v: ViewName) => void
  onLogout: () => void
  unreadCount: number
  onOpenCalendar?: () => void
  children: React.ReactNode
}

export default function Layout({ user, currentView, onViewChange, onLogout, unreadCount, onOpenCalendar, children }: Props) {
  const navItems = getNavItems(user.role)

  const roleLabels: Record<string, string> = {
    responsavel: 'Responsável',
    aluno: 'Aluno',
    professor: 'Professor',
    admin: 'Coordenação',
  }

  const initials = user.nome.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      {/* Sidebar — desktop */}
      <aside
        className="hidden md:flex flex-col fixed left-0 top-0 h-full w-60 z-30"
        style={{ backgroundColor: '#1B3A4B' }}
      >
        {/* Logo */}
        <div className="px-5 py-5 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: '#EAF3F7' }}>
            <GraduationCap size={17} color="#1B3A4B" fill="#F8D238" />
          </div>
          <span
            className="font-semibold text-sm"
            style={{
              fontFamily: 'Lexend, sans-serif',
              backgroundImage: 'linear-gradient(90deg, #FFFFFF 0%, #F8D238 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Visto
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-hide">
          {navItems.map(item => {
            const active = !item.calendarAction && currentView === item.view
            return (
              <button
                key={item.label}
                onClick={() => item.calendarAction ? onOpenCalendar?.() : onViewChange(item.view)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left"
                style={{
                  backgroundColor: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                  color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                }}
                onMouseEnter={e => !active && (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)')}
                onMouseLeave={e => !active && (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span className="shrink-0">{item.icon}</span>
                <span>{item.label}</span>
                {item.view === 'avisos' && unreadCount > 0 && (
                  <span className="ml-auto text-xs font-semibold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: '#A44A2E', color: '#fff', fontFamily: 'IBM Plex Mono, monospace' }}>
                    {unreadCount}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* User */}
        <div className="px-4 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ backgroundColor: '#3F6C7A', color: '#fff' }}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user.nome}</p>
              <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>{roleLabels[user.role]}</p>
            </div>
            <button onClick={onLogout} className="shrink-0 p-1 rounded transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }} title="Sair" aria-label="Sair da conta"
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-60 min-h-screen">
        {/* Mobile header */}
        <header className="md:hidden sticky top-0 z-20 flex items-center justify-between px-4 h-14 bg-white" style={{ borderBottom: '1px solid #E4E2DD' }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: '#EAF3F7' }}>
              <GraduationCap size={15} color="#1B3A4B" fill="#F8D238" />
            </div>
            <span
              className="font-semibold text-sm px-1.5 py-0.5 rounded"
              style={{
                fontFamily: 'Lexend, sans-serif',
                backgroundColor: '#1B3A4B',
                backgroundImage: 'linear-gradient(90deg, #FFFFFF 0%, #F8D238 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Visto
            </span>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button onClick={() => onViewChange('avisos')} className="relative p-2" aria-label={`${unreadCount} aviso(s) não lido(s)`}>
                <Bell size={18} style={{ color: '#5C6469' }} />
                <span className="absolute top-1 right-1 w-4 h-4 text-xs flex items-center justify-center rounded-full font-bold" style={{ backgroundColor: '#A44A2E', color: '#fff' }}>
                  {unreadCount}
                </span>
              </button>
            )}
            <button onClick={onLogout} className="p-2" aria-label="Sair" style={{ color: '#5C6469' }}>
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 pb-20 md:pb-0">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 flex bg-white" style={{ borderTop: '1px solid #E4E2DD' }}>
          {navItems.map(item => {
            const active = !item.calendarAction && currentView === item.view
            return (
              <button
                key={item.label}
                onClick={() => item.calendarAction ? onOpenCalendar?.() : onViewChange(item.view)}
                className="flex-1 flex flex-col items-center justify-center py-2 gap-1 relative"
                style={{ color: active ? '#1B3A4B' : '#5C6469' }}
                aria-label={item.label}
              >
                {item.icon}
                <span className="text-xs font-medium">{item.label}</span>
                {item.view === 'avisos' && unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1/4 w-4 h-4 text-xs flex items-center justify-center rounded-full font-bold" style={{ backgroundColor: '#A44A2E', color: '#fff' }}>
                    {unreadCount}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

// Reusable page header
export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 px-6 pt-8 pb-6" style={{ borderBottom: '1px solid #E4E2DD' }}>
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>{title}</h1>
        {subtitle && <p className="mt-1 text-sm" style={{ color: '#5C6469' }}>{subtitle}</p>}
      </div>
      <AccessibilityButton />
    </div>
  )
}

export function AccessibilityButton() {
  return (
    <button
      type="button"
      className="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center transition-colors"
      style={{ backgroundColor: '#EEF2FF', color: '#4E7AF7', border: '1px solid #D9E2FF' }}
      aria-label="Recursos de acessibilidade"
      title="Acessibilidade"
    >
      <Accessibility size={18} />
    </button>
  )
}

// Reusable card
export function Card({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`bg-white rounded-lg ${className}`} style={{ border: '1px solid #E4E2DD', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', ...style }}>
      {children}
    </div>
  )
}

// Category badge for registros
export function CategoriaBadge({ categoria, urgencia }: { categoria: string; urgencia?: string }) {
  const cores: Record<string, { bg: string; text: string }> = {
    'Comportamento': { bg: '#FDF2EE', text: '#A44A2E' },
    'Desempenho': { bg: '#EEF4F6', text: '#3F6C7A' },
    'Aviso': { bg: '#F5F0E8', text: '#7A5C2E' },
    'Elogio': { bg: '#EEF4F1', text: '#3D6E52' },
    'Participação': { bg: '#F0EEF6', text: '#5A4A7A' },
  }
  const cor = cores[categoria] || { bg: '#F3F4F6', text: '#5C6469' }
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: cor.bg, color: cor.text }}>
        {categoria}
      </span>
      {urgencia === 'Importante' && (
        <span className="text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1" style={{ backgroundColor: '#FDF2EE', color: '#A44A2E', border: '1px solid #F5C6B8' }}>
          <AlertTriangle size={11} /> Importante
        </span>
      )}
    </div>
  )
}

// Format date in Brazilian Portuguese
export function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function formatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}
