import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  ChevronDown,
  Eye,
  MessageCircleMore,
  PenLine,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react"
import "./landing.css"

interface LandingProps {
  onAccess: () => void
}

const journey = [
  {
    side: "left",
    type: "Registro",
    title: "Uma participação que merece continuidade",
    copy: "Lucas apresentou uma solução própria e explicou seu raciocínio para a turma.",
    author: "Profa. Ana Costa",
    time: "Hoje, 10:24",
    tone: "positive",
  },
  {
    side: "right",
    type: "Tarefa",
    title: "O próximo passo ficou claro",
    copy: "Revisar o capítulo 4 e levar o caderno de atividades na próxima aula.",
    author: "Matemática · 8º Ano A",
    time: "Entrega sexta-feira",
    tone: "neutral",
  },
  {
    side: "left",
    type: "Alinhamento",
    title: "Escola e família na mesma conversa",
    copy: "O registro chegou ao responsável com contexto, autoria e espaço para diálogo.",
    author: "Acompanhamento de Lucas",
    time: "Visto pela família",
    tone: "positive",
  },
]

const roles = [
  [
    "Responsáveis",
    "Entendem como o aluno está sem precisar reunir mensagens, bilhetes e lembranças.",
  ],
  [
    "Alunos",
    "Enxergam tarefas, avisos e próximos passos com linguagem simples.",
  ],
  [
    "Professores",
    "Registram observações e comunicam o que importa sem burocracia.",
  ],
  ["Coordenação", "Acompanha turmas, pessoas e alertas com rastreabilidade."],
]

export default function Landing({ onAccess }: LandingProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reduced) return

    root.classList.add("motion-ready")
    const revealNodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    )
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) =>
            entry.isIntersecting && entry.target.classList.add("is-visible"),
        ),
      { threshold: 0.16, rootMargin: "0px 0px -8%" },
    )
    revealNodes.forEach((node) => observer.observe(node))

    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      root.style.setProperty(
        "--page-progress",
        String(max > 0 ? window.scrollY / max : 0),
      )
      setScrolled(window.scrollY > 24)
      root.querySelectorAll<HTMLElement>("[data-drift]").forEach((node) => {
        const rect = node.getBoundingClientRect()
        const local = Math.max(
          -1,
          Math.min(
            1,
            (window.innerHeight / 2 - (rect.top + rect.height / 2)) /
              window.innerHeight,
          ),
        )
        node.style.setProperty("--drift", String(local))
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const access = () => {
    window.scrollTo({ top: 0, behavior: "auto" })
    onAccess()
  }

  return (
    <div className="visto-landing" ref={rootRef}>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header
        className={`landing-nav ${scrolled ? "is-scrolled" : ""}`}
        aria-label="Navegação principal"
      >
        <a
          className="visto-wordmark"
          href="#inicio"
          aria-label="Visto — início"
        >
          <span className="visto-mark" aria-hidden="true">
            <span />
          </span>
          <strong>Visto</strong>
        </a>
        <nav aria-label="Seções da página">
          <a href="#proposito">Por que a Visto</a>
          <a href="#como-funciona">Como funciona</a>
        </nav>
        <button className="nav-access" type="button" onClick={access}>
          Acessar sistema <ArrowRight size={17} />
        </button>
      </header>

      <main id="conteudo">
        <section
          className="landing-hero"
          id="inicio"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="hero-kicker">
              <span /> Acompanhamento escolar que aproxima
            </p>
            <h1 id="hero-title" aria-label="Todo esforço merece ser visto.">
              <span>Todo esforço</span>
              <span>
                merece ser <em>visto.</em>
              </span>
            </h1>
            <p className="hero-lead">
              A Visto transforma observações, tarefas, conquistas e conversas da
              rotina escolar em uma trajetória clara para quem ensina, aprende e
              cuida.
            </p>
            <div className="hero-actions">
              <button className="primary-cta" type="button" onClick={access}>
                Acessar a plataforma <ArrowRight size={19} />
              </button>
              <a className="text-link" href="#proposito">
                Conhecer a Visto <ChevronDown size={17} />
              </a>
            </div>
            <p className="hero-note">
              <ShieldCheck size={16} /> Informação simples, contextualizada e
              rastreável.
            </p>
          </div>

          <div
            className="hero-proof"
            aria-label="Demonstração de um registro da plataforma"
            data-drift
          >
            <div className="proof-orbit orbit-one" aria-hidden="true" />
            <div className="proof-orbit orbit-two" aria-hidden="true" />
            <div className="proof-window">
              <div className="proof-topbar">
                <div className="proof-brand">
                  <span className="visto-mark mini">
                    <span />
                  </span>{" "}
                  Visto
                </div>
                <span className="proof-context">8º Ano A</span>
              </div>
              <div className="proof-body">
                <p className="proof-label">Registro mais recente</p>
                <div className="proof-author">
                  <span>AC</span>
                  <div>
                    <strong>Profa. Ana Costa</strong>
                    <small>Matemática · há 12 minutos</small>
                  </div>
                </div>
                <h2>Uma nova forma de resolver apareceu hoje.</h2>
                <p>
                  Lucas apresentou seu raciocínio para a turma e ajudou dois
                  colegas a compreender a atividade.
                </p>
                <div className="proof-status">
                  <Sparkles size={16} />
                  <span>
                    <strong>Participação reconhecida</strong>
                    <small>O responsável já pode acompanhar.</small>
                  </span>
                </div>
              </div>
              <div className="proof-footer">
                <span>
                  <Eye size={15} /> Registro visível para a família
                </span>
                <span className="signature-dot" /> Registrado por Ana
              </div>
            </div>
            <div className="floating-note note-one">
              <Check size={14} /> Visto pela família
            </div>
            <div className="floating-note note-two">
              <MessageCircleMore size={14} /> Conversa aberta
            </div>
          </div>

          <div className="scroll-cue" aria-hidden="true">
            <span>Role para acompanhar</span>
            <i />
          </div>
        </section>

        <section className="fragment-section" id="proposito">
          <div className="section-intro" data-reveal="left">
            <p className="section-index">O problema que nos move</p>
            <h2>
              Quando a informação chega tarde, parte do esforço desaparece.
            </h2>
          </div>
          <div className="fragment-stage" data-drift>
            <div className="fragment fragment-a" data-reveal="left">
              <PenLine size={18} />
              <span>
                <strong>“Participou mais hoje.”</strong>
                <small>anotação do professor</small>
              </span>
            </div>
            <div className="fragment fragment-b" data-reveal="right">
              <BookOpenCheck size={18} />
              <span>
                <strong>Trabalho para sexta</strong>
                <small>informação da turma</small>
              </span>
            </div>
            <div className="fragment fragment-c" data-reveal="left">
              <MessageCircleMore size={18} />
              <span>
                <strong>Como podemos ajudar?</strong>
                <small>mensagem da família</small>
              </span>
            </div>
            <div className="fragment-core" data-reveal="center">
              <span className="visto-mark">
                <span />
              </span>
              <strong>A Visto reúne o que importa.</strong>
              <p>Cada informação ganha contexto, autoria e continuidade.</p>
            </div>
          </div>
        </section>

        <section className="journey-section" id="como-funciona">
          <div className="journey-heading" data-reveal="left">
            <p className="section-index">Um registro vivo</p>
            <h2>
              O cotidiano deixa de ser fragmento e passa a contar uma
              trajetória.
            </h2>
            <p>
              Conforme a escola registra, a Visto organiza. O que aconteceu,
              quem acompanhou e qual é o próximo passo permanecem no mesmo
              lugar.
            </p>
          </div>
          <div className="journey-track">
            <div className="track-line" aria-hidden="true">
              <span />
            </div>
            {journey.map((item, index) => (
              <article
                className={`journey-entry entry-${item.side}`}
                data-reveal={item.side}
                key={item.title}
              >
                <span className="journey-number">0{index + 1}</span>
                <div className="journey-content">
                  <div className="journey-meta">
                    <span>{item.type}</span>
                    <time>{item.time}</time>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <footer>
                    <span className={`status-dot ${item.tone}`} />
                    {item.author}
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="roles-section">
          <div className="roles-title" data-reveal="left">
            <p className="section-index">Uma comunidade, a mesma verdade</p>
            <h2>
              Cada pessoa vê o que precisa. Todos acompanham o que importa.
            </h2>
          </div>
          <div className="roles-list">
            {roles.map(([title, copy], index) => (
              <article data-reveal={index % 2 ? "right" : "left"} key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <ArrowRight size={20} aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="final-invite" data-reveal="center">
          <div className="invite-mark" aria-hidden="true">
            <Eye size={52} />
          </div>
          <p>Entre, conheça, acompanhe.</p>
          <h2>Todo esforço merece ser visto.</h2>
          <button className="final-cta" type="button" onClick={access}>
            Acessar a plataforma <ArrowRight size={20} />
          </button>
          <div className="invite-audience">
            <UsersRound size={17} /> Para responsáveis, alunos, professores e
            coordenação.
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <a className="visto-wordmark" href="#inicio">
          <span className="visto-mark mini">
            <span />
          </span>
          <strong>Visto</strong>
        </a>
        <p>Clareza para acompanhar. Presença para reconhecer.</p>
        <button type="button" onClick={access}>
          Entrar no sistema <ArrowRight size={16} />
        </button>
      </footer>
    </div>
  )
}
