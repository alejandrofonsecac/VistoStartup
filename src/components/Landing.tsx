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

const profiles = [
  {
    role: "Professores",
    stage: "Quem registra e comunica",
    title: "Da observação em sala ao acompanhamento contínuo.",
    copy: "A experiência atual reúne a rotina das turmas, a produção de registros pedagógicos, a publicação de atividades e a comunicação com as famílias.",
    modules: [
      {
        name: "Turmas",
        description:
          "Visualizar as turmas vinculadas, os alunos de cada grupo, a quantidade de registros e situações marcadas como importantes.",
      },
      {
        name: "Novo Registro",
        description:
          "Selecionar um aluno, registrar uma observação e classificá-la como comportamento, desempenho, aviso, elogio ou participação, com prioridade normal ou importante.",
      },
      {
        name: "Nova Tarefa",
        description:
          "Publicar atividades por turma com título, descrição, disciplina, data de entrega e materiais necessários.",
      },
      {
        name: "Recados",
        description:
          "Enviar comunicados para uma turma ou para todas, incluindo a possibilidade de destacar mensagens urgentes.",
      },
      {
        name: "Chat",
        description:
          "Manter conversas individuais com responsáveis, organizadas pelo aluno acompanhado.",
      },
    ],
    outcome:
      "O professor consegue transformar acontecimentos cotidianos em informação útil para alunos, famílias e escola.",
    Icon: PenLine,
    side: "left",
  },
  {
    role: "Pais e responsáveis",
    stage: "Quem acompanha e conversa",
    title: "O cotidiano escolar chega com contexto, autoria e próximos passos.",
    copy: "Pais e responsáveis encontram uma visão organizada para cada filho, acompanhando registros, atividades, comunicados e conversas sem reunir informações dispersas.",
    modules: [
      {
        name: "Início",
        description:
          "Alternar entre filhos, verificar registros importantes ainda não vistos, consultar acontecimentos recentes e próximas tarefas.",
      },
      {
        name: "Histórico",
        description:
          "Consultar todos os registros do aluno e filtrar por comportamento, desempenho, aviso, elogio ou participação, preservando professor, data, hora e prioridade.",
      },
      {
        name: "Tarefas",
        description:
          "Acompanhar título, disciplina, descrição, professor, prazo e materiais necessários, com destaque para entregas próximas.",
      },
      {
        name: "Chat",
        description:
          "Conversar de forma privada com professores, mantendo cada diálogo relacionado ao filho e à disciplina correspondente.",
      },
      {
        name: "Avisos",
        description:
          "Receber comunicados da escola ou da turma, identificar mensagens novas e urgentes e marcá-las como lidas.",
      },
    ],
    outcome:
      "A família participa com informação verificável e consegue conversar com a escola a partir do mesmo contexto.",
    Icon: UsersRound,
    side: "right",
  },
  {
    role: "Coordenação e agentes escolares",
    stage: "Quem acompanha o conjunto",
    title: "Uma visão ampliada para reconhecer padrões e prioridades.",
    copy: "No código atual, essa experiência aparece como Coordenação. Ela apoia agentes responsáveis pelo acompanhamento geral da escola, sem definir ainda uma política final de permissões.",
    modules: [
      {
        name: "Painel Geral",
        description:
          "Acompanhar totais de alunos e turmas, registros da semana, alertas pendentes e recados publicados recentemente.",
      },
      {
        name: "Usuários",
        description:
          "Consultar pessoas cadastradas, filtrar por perfil e visualizar informações como e-mail, turma do aluno ou disciplina do professor.",
      },
      {
        name: "Turmas",
        description:
          "Visualizar a composição de cada turma, seus alunos, professores vinculados, disciplinas e quantidades.",
      },
      {
        name: "Alertas",
        description:
          "Centralizar registros importantes ainda não visualizados pelos responsáveis, com aluno, turma, categoria, autoria e data.",
      },
    ],
    outcome:
      "A coordenação encontra sinais que merecem atenção e pode apoiar professores e famílias com mais rastreabilidade.",
    Icon: ShieldCheck,
    side: "left",
  },
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

  const accessDemo = () => {
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
          <img
            className="brand-logo brand-logo-header"
            src="/visto-logo.png"
            alt="Visto"
            width="445"
            height="312"
          />
        </a>
        <nav aria-label="Seções da página">
          <a href="#proposito">Por que a Visto</a>
          <a href="#perfis">Perfis e rotina</a>
        </nav>
        <button className="nav-access" type="button" onClick={accessDemo}>
          Ver demonstração <ArrowRight size={17} />
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
              <button
                className="primary-cta"
                type="button"
                onClick={accessDemo}
              >
                Explorar demonstração <ArrowRight size={19} />
              </button>
              <a className="text-link" href="#como-funciona">
                Acompanhar a jornada <ChevronDown size={17} />
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
              <img
                className="brand-symbol brand-symbol-core"
                src="/visto-symbol.png"
                alt=""
                width="229"
                height="220"
                aria-hidden="true"
              />
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

        <section
          className="profiles-section"
          id="perfis"
          aria-labelledby="profiles-title"
        >
          <div className="profiles-title" data-reveal="left">
            <p className="section-index">Possibilidades por perfil</p>
            <h2 id="profiles-title">
              Três perspectivas diferentes dentro da mesma plataforma.
            </h2>
            <p className="profiles-lead">
              O fluxo continua conectado: professores registram e comunicam,
              famílias acompanham e conversam, enquanto a coordenação observa o
              conjunto. Cada área abaixo traduz os módulos que já existem na
              experiência atual.
            </p>
            <div className="profile-scope-note" role="note">
              <ShieldCheck size={20} aria-hidden="true" />
              <p>
                <strong>Escopo em construção.</strong> Estas são possibilidades
                observadas no sistema atual — não regras definitivas de
                permissionamento.
              </p>
            </div>
          </div>
          <div className="profiles-flow">
            {profiles.map(({ Icon, ...profile }, index) => (
              <article
                className="profile-story"
                data-reveal={profile.side}
                key={profile.role}
              >
                <div className="profile-visual">
                  <span className="profile-number">0{index + 1}</span>
                  <Icon size={38} strokeWidth={1.6} aria-hidden="true" />
                  <p>{profile.stage}</p>
                </div>
                <div className="profile-copy">
                  <p className="profile-role">
                    Possibilidades para {profile.role.toLowerCase()}
                  </p>
                  <h3>{profile.title}</h3>
                  <p className="profile-intro">{profile.copy}</p>
                  <div className="profile-modules">
                    <p className="profile-modules-label">
                      O que os módulos permitem hoje
                    </p>
                    <ul>
                      {profile.modules.map((module) => (
                        <li key={module.name}>
                          <strong>{module.name}</strong>
                          <span>{module.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="profile-outcome">
                    <ArrowRight size={18} aria-hidden="true" />
                    {profile.outcome}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="final-invite" data-reveal="center">
          <div className="invite-mark" aria-hidden="true">
            <img
              className="brand-symbol brand-symbol-invite"
              src="/visto-symbol.png"
              alt=""
              width="229"
              height="220"
            />
          </div>
          <p>Três perspectivas. Um mesmo contexto.</p>
          <h2>
            Quando todos enxergam o caminho, cada esforço ganha continuidade.
          </h2>
          <button className="final-cta" type="button" onClick={accessDemo}>
            Explorar a demonstração <ArrowRight size={20} />
          </button>
          <div className="invite-audience">
            <UsersRound size={17} /> Para professores, pais e responsáveis,
            coordenação e agentes escolares.
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <a
          className="visto-wordmark"
          href="#inicio"
          aria-label="Visto — voltar ao início"
        >
          <img
            className="brand-logo brand-logo-footer"
            src="/visto-logo.png"
            alt="Visto"
            width="445"
            height="312"
          />
        </a>
        <p>Clareza para acompanhar. Presença para reconhecer.</p>
        <button className="footer-action" type="button" onClick={accessDemo}>
          Abrir demonstração <ArrowRight size={16} />
        </button>
      </footer>
    </div>
  )
}
