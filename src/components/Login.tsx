import { useState } from 'react';
import { GraduationCap, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { CREDENCIAIS, USUARIOS } from '../data';
import type { User } from '../types';
import logoSemSlogan from '../images/LogoSemSlogan.png';

interface Props {
  onLogin: (user: User) => void
}

const DEMO_CARDS = [
  { label: 'Responsável', email: 'responsavel@escola.edu.br', desc: 'Carlos Oliveira (pai de Lucas e Sofia)', color: '#1B3A4B' },
  { label: 'Aluno', email: 'aluno@escola.edu.br', desc: 'Lucas Oliveira — 8º Ano A', color: '#3F6C7A' },
  { label: 'Professor', email: 'professor@escola.edu.br', desc: 'Profa. Ana Costa — Matemática', color: '#3D6E52' },
  { label: 'Coordenação', email: 'admin@escola.edu.br', desc: 'Fernanda Lima — Diretora', color: '#5C6469' },
]

export default function Login({ onLogin }: Props) {
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
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EAF3F7' }}>
              <GraduationCap size={23} color="#1B3A4B" fill="#F8D238" />
            </div>
            <span className="text-white text-lg font-semibold" style={{ fontFamily: 'Lexend, sans-serif' }}>Visto</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Lexend, sans-serif' }}>
            <span style={{ color: '#4E7AF7' }}>Todo esforço merece ser </span>
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
          </h1>
          <p className="text-base leading-relaxed" style={{ color: '#9DB8C5' }}>
            Pais, alunos, professores e coordenação conectados. Informações claras, comunicação direta, sem complicação.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-widest" style={{ color: '#5C8A9B', fontFamily: 'IBM Plex Mono, monospace' }}>
            Contas de demonstração
          </p>
          {DEMO_CARDS.map(card => (
            <button
              key={card.email}
              onClick={() => handleDemoLogin(card.email)}
              className="w-full text-left px-4 py-3 rounded-lg transition-all"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)')}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: card.color, color: '#fff', fontFamily: 'IBM Plex Mono, monospace' }}>
                  {card.label}
                </span>
              </div>
              <p className="text-sm" style={{ color: '#C5D8E0' }}>{card.desc}</p>
            </button>
          ))}
        </div>
      </aside>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8 md:hidden">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EAF3F7' }}>
              <GraduationCap size={19} color="#1B3A4B" fill="#F8D238" />
            </div>
            <span className="text-lg font-semibold" style={{ color: '#1B3A4B', fontFamily: 'Lexend, sans-serif' }}>Visto</span>
          </div>

          <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #E4E2DD', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div className="flex items-center gap-4 mb-6">
              <img src={logoSemSlogan} alt="Visto" className="h-16 w-24 object-contain shrink-0" />
              <div>
                <h2 className="text-xl font-bold mb-1" style={{ color: '#23292E', fontFamily: 'Lexend, sans-serif' }}>Entrar na sua conta</h2>
                <p className="text-sm leading-snug" style={{ color: '#5C6469' }}>Use o e-mail e senha fornecidos pela escola.</p>
              </div>
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
          <div className="mt-6 md:hidden space-y-2">
            <p className="text-xs font-medium mb-2" style={{ color: '#5C6469', fontFamily: 'IBM Plex Mono, monospace' }}>
              CONTAS DE DEMONSTRAÇÃO
            </p>
            {DEMO_CARDS.map(card => (
              <button
                key={card.email}
                onClick={() => handleDemoLogin(card.email)}
                className="w-full text-left px-4 py-3 rounded-lg bg-white flex items-center gap-3"
                style={{ border: '1px solid #E4E2DD' }}
              >
                <span className="text-xs font-semibold px-2 py-0.5 rounded shrink-0" style={{ backgroundColor: card.color, color: '#fff' }}>
                  {card.label}
                </span>
                <span className="text-sm" style={{ color: '#5C6469' }}>{card.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
