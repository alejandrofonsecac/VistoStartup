import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, AlertCircle, Accessibility } from 'lucide-react';
import { CREDENCIAIS, USUARIOS } from '../data';
import type { User } from '../types';
import logoSemSlogan from '../images/LogoSemSlogan.png';

interface Props {
  onLogin: (user: User) => void
  onBack?: () => void
}

const DEMO_CARDS = [
  { label: 'Responsável', email: 'responsavel@escola.edu.br', color: '#1B3A4B' },
  { label: 'Aluno', email: 'aluno@escola.edu.br', color: '#3F6C7A' },
  { label: 'Professor', email: 'professor@escola.edu.br', color: '#3D6E52' },
  { label: 'Coordenação', email: 'admin@escola.edu.br', color: '#5C6469' },
]

export default function Login({ onLogin, onBack }: Props) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showSenha, setShowSenha] = useState(false)
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const cred = CREDENCIAIS.find(c => c.email === email.trim() && c.senha === senha)
    if (!cred) {
      setErro('E-mail ou senha incorretos. Tente novamente.')
      setLoading(false)
      return
    }
    const user = USUARIOS.find(u => u.id === cred.userId)!
    onLogin(user)
  }

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail)
    setSenha('123456')
    setErro('')
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: '#F7F6F3' }}>
      {/* Left panel */}
      <aside className="hidden md:flex flex-col justify-between w-80 lg:w-[28rem] p-10 shrink-0" style={{ backgroundColor: '#1B3A4B' }}>
        <div>
          <div className="flex justify-center mb-10">
            <img src={logoSemSlogan} alt="Visto" className="h-40 w-88 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Lexend, sans-serif' }}>
            <span className="block text-center" style={{ color: '#4E7AF7' }}>Todo esforço merece</span>
            <span className="block text-center">
              <span style={{ color: '#4E7AF7' }}>ser </span>
              <span
                style={{
                  color: '#F8D238',
                  backgroundImage: 'linear-gradient(90deg, #FFFFFF 0%, #F8D238 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                visto
              </span>
            </span>
          </h1>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest" style={{ color: '#5C8A9B', fontFamily: 'IBM Plex Mono, monospace' }}>
            Contas de demonstração
          </p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {DEMO_CARDS.map(card => (
            <button
              key={card.email}
              onClick={() => handleDemoLogin(card.email)}
              className="px-3 py-3 rounded-lg text-center transition-all"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)')}
            >
              <span className="text-xs font-semibold" style={{ color: '#C5D8E0', fontFamily: 'IBM Plex Mono, monospace' }}>
                {card.label}
              </span>
            </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Right panel — form */}
      <div className="relative flex-1 flex items-center justify-center p-6">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: '#3F6C7A' }}
          >
            <ArrowLeft size={17} />
            <span className="hidden sm:inline">Voltar para a apresentação</span>
          </button>
        )}
        <button
          type="button"
          className="absolute top-6 right-6 w-9 h-9 shrink-0 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: '#EEF2FF', color: '#4E7AF7', border: '1px solid #D9E2FF' }}
          aria-label="Recursos de acessibilidade"
          title="Acessibilidade"
        >
          <Accessibility size={18} />
        </button>
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-8 md:hidden">
            <img src={logoSemSlogan} alt="Visto" className="h-28 w-52 object-contain" />
          </div>

          <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #E4E2DD', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-1" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>Entrar na sua conta</h2>
              <p className="text-sm leading-snug" style={{ color: '#5C6469' }}>Use o e-mail e senha fornecidos pela escola.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#23292E' }}>
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com.br"
                  required
                  className="w-full px-4 py-2.5 rounded-lg text-sm transition-colors"
                  style={{
                    border: '1px solid #E4E2DD',
                    backgroundColor: '#FAFAFA',
                    color: '#23292E',
                    outline: 'none',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#3F6C7A')}
                  onBlur={e => (e.target.style.borderColor = '#E4E2DD')}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#23292E' }}>
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showSenha ? 'text' : 'password'}
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-2.5 rounded-lg text-sm pr-12 transition-colors"
                    style={{
                      border: '1px solid #E4E2DD',
                      backgroundColor: '#FAFAFA',
                      color: '#23292E',
                      outline: 'none',
                    }}
                    onFocus={e => (e.target.style.borderColor = '#3F6C7A')}
                    onBlur={e => (e.target.style.borderColor = '#E4E2DD')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSenha(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                    style={{ color: '#5C6469' }}
                    aria-label={showSenha ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {erro && (
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm" style={{ backgroundColor: '#FDF2EE', border: '1px solid #F5C6B8', color: '#A44A2E' }}>
                  <AlertCircle size={15} />
                  <span>{erro}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg text-white font-semibold text-sm transition-all"
                style={{ backgroundColor: loading ? '#3F6C7A' : '#1B3A4B', opacity: loading ? 0.8 : 1 }}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <p className="mt-5 text-center text-sm" style={{ color: '#5C6469' }}>
              Esqueceu a senha?{' '}
              <button className="font-semibold underline" style={{ color: '#3F6C7A' }}>
                Fale com a secretaria
              </button>
            </p>
          </div>

          {/* Mobile demo cards */}
          <div className="mt-6 md:hidden">
            <p className="text-xs font-medium mb-2" style={{ color: '#5C6469', fontFamily: 'IBM Plex Mono, monospace' }}>
              CONTAS DE DEMONSTRAÇÃO
            </p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_CARDS.map(card => (
              <button
                key={card.email}
                onClick={() => handleDemoLogin(card.email)}
                className="px-3 py-3 rounded-lg bg-white text-center"
                style={{ border: '1px solid #E4E2DD', color: card.color }}
              >
                <span className="text-sm font-semibold">
                  {card.label}
                </span>
              </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
