# Prompt para o Lovable — Sistema de Acompanhamento Escolar

Copie o conteúdo abaixo (a partir de "PROMPT PRINCIPAL") diretamente na conversa do Lovable.

---

## PROMPT PRINCIPAL

Quero construir um **sistema web responsivo** de acompanhamento escolar que conecta **pais/responsáveis, professores e a escola** em um único lugar, resolvendo um problema real: hoje a informação sobre o aluno (dificuldades, comportamento, evolução, avisos) circula de forma fragmentada — WhatsApp, bilhete, reunião de bimestre — e por isso se perde ou chega tarde demais.

O sistema deve funcionar como um **registro vivo e centralizado** do aluno: cada observação relevante (feita por um professor, coordenador ou pela escola) entra numa linha do tempo organizada, visível de forma simples para o responsável.

**Prioridade número um: acessibilidade para pais/responsáveis com baixa familiaridade digital.** Isso deve guiar toda decisão de interface — navegação simples, linguagem direta, sem jargão técnico, sem telas com excesso de informação.

---

### Perfis de usuário (4 tipos de login/visão)

**1. Responsável (pai/mãe)**
- Visão somente do(s) próprio(s) filho(s)
- Foco: entender rapidamente "como meu filho está" sem precisar interpretar dados complexos

**2. Aluno**
- Login próprio, visão da sua própria vida escolar
- Foco: ver recados, tarefas/trabalhos com data e material necessário, e seu próprio progresso — sem acesso a conversas entre pais e professores

**3. Professor**
- Visão dos alunos das turmas que leciona
- Foco: registrar observações, enviar recados, planejar tarefas e conversar com responsáveis, tudo rapidamente e sem burocracia

**4. Coordenação/Escola (admin)**
- Visão geral de turmas, professores e alunos
- Foco: gerenciar usuários, turmas e ter visão consolidada de alertas

---

### Funcionalidades principais

**Para o Responsável:**
- Tela inicial ("Início") com resumo do filho: como ele está indo, últimos registros, avisos pendentes — linguagem simples, sem gráficos complexos
- Linha do tempo (timeline) cronológica com todos os registros feitos sobre o filho (comportamento, participação, dificuldades, elogios, recados)
- Cada registro mostra: quem registrou, quando, categoria (ex: "Comportamento", "Desempenho", "Aviso"), e uma descrição curta em linguagem natural
- Aba "Tarefas" com os trabalhos/atividades passados pelos professores para o filho: título, descrição, data de entrega e material necessário — mesma informação que o aluno vê, para o pai poder acompanhar/ajudar
- Sistema de notificação simples (sem jargão — "Você tem um aviso novo", não "Nova notificação do sistema")
- **Chat direto com o professor**, por aluno/matéria — canal privado entre aquele responsável e aquele professor, para relatar problemas ou tirar dúvidas
- Se houver mais de um filho, alternância simples entre eles (sem menu escondido)

**Para o Aluno:**
- Tela inicial com recados e avisos da turma/professores
- Aba "Tarefas" — lista de trabalhos e atividades com título, descrição, data de entrega e material necessário, ordenados por prazo (mais próximo primeiro)
- Marcação simples de "tarefa concluída" (opcional, ajuda o aluno a se organizar — não é obrigatório para o professor avaliar)
- Sem acesso ao chat entre pais e professores nem aos registros internos de comportamento — visão focada em recados e tarefas

**Para o Professor:**
- Lista de turmas e alunos
- Botão de "Novo registro" rápido — categoria + descrição curta + aluno. Deve levar menos de 30 segundos para preencher
- **Recados**: envio de avisos para uma turma inteira ou aluno específico (ex: "Reunião de pais dia 20", "Trazer material de arte amanhã")
- **Planejamento de tarefas/trabalhos**: criar tarefa com título, descrição, data de entrega e material necessário, atribuída a uma turma ou aluno específico — aparece automaticamente na visão do aluno e do responsável
- **Chat com responsáveis**: conversa individual por aluno, para alinhar problemas, dúvidas ou combinados — separado por aluno, não é um chat geral
- Histórico dos próprios registros por aluno
- Marcação simples de urgência/prioridade no registro (ex: "Normal" vs "Importante — avisar responsável")

**Para a Coordenação (admin):**
- Gestão de usuários (cadastrar professores, responsáveis, alunos, vincular responsável↔aluno)
- Gestão de turmas
- Painel consolidado com alertas marcados como "Importante" que ainda não foram vistos pelos responsáveis
- Visão geral de recados e tarefas publicadas, para garantir que a escola tenha controle do que está sendo comunicado
- Métricas simples de uso (quantos registros por semana, engajamento dos responsáveis) — não precisa ser sofisticado na v1

**Autenticação:**
- Login simples por e-mail e senha
- Recuperação de senha
- Onboarding curto e guiado, principalmente para o responsável (2-3 passos no máximo, explicando o que é o sistema antes de jogar a pessoa na tela principal)

---

### Diretrizes de estilo visual (seguir rigorosamente)

O tom deve ser **institucional, sóbrio e profissional** — como um sistema de gestão escolar confiável, não um app de consumo colorido. Evitar qualquer elemento que pareça "produto de startup" ou "app infantil". **Uso mínimo de imagens/ilustrações** — priorizar tipografia, espaçamento e ícones de linha simples (ex: Lucide icons) em vez de imagens decorativas.

**Paleta de cores — restrita e neutra:**
- Fundo principal: `#F7F6F3` (branco levemente acinzentado/marfim, não branco puro nem creme chamativo)
- Superfícies/cards: `#FFFFFF` com borda sutil `#E4E2DD`
- Cor primária (navegação, cabeçalhos, botões principais): `#1B3A4B` (azul-ardósia escuro, institucional)
- Texto principal: `#23292E` (quase preto)
- Texto secundário: `#5C6469`
- **Um único** tom de destaque, usado com moderação apenas em ações principais (botão "Novo registro", links ativos): `#3F6C7A` (azul-petróleo, mais discreto que um azul vibrante)
- Status "atenção/importante": `#A44A2E` (terracota escurecido, usado só em ícone + texto, nunca como bloco de cor grande)
- Status "positivo": `#3D6E52` (verde escurecido, mesma regra)

Não usar gradientes, não usar mais de 2 cores de destaque na mesma tela, não usar cores vibrantes/saturadas em nenhum elemento.

**Tipografia:**
- Corpo de texto: **Atkinson Hyperlegible** (via Google Fonts) — fonte desenvolvida para legibilidade e acessibilidade, tamanho base 16px, nunca menor que 14px em nenhum texto
- Títulos/cabeçalhos: **Lexend**, peso SemiBold/Bold, tamanhos generosos (títulos de página 28-32px, títulos de seção 20-22px)
- Datas e identificadores: **IBM Plex Mono**, uso pontual apenas

**Layout:**
- Espaçamento generoso entre elementos — nunca informação amontoada
- Cards com cantos levemente arredondados (raio ~8px, nem quadrado nem excessivamente arredondado)
- Sombras muito sutis, quase imperceptíveis — evitar efeito "flutuante" exagerado
- Navegação lateral fixa e simples no desktop; menu inferior fixo (bottom nav) no mobile, com no máximo 5 itens e ícone + label sempre juntos (ex. para o Responsável: Início, Tarefas, Timeline, Chat, Avisos)
- No chat, manter o mesmo padrão sóbrio: bolhas de mensagem discretas, sem cores vibrantes, indicação clara de quem enviou (nome, não só avatar) e data/hora sempre visível
- Cada registro na timeline é um elemento visual claro: ícone de categoria + texto + data + autor, sem depender só de cor para indicar tipo/urgência

**Elemento de assinatura:**
- Um pequeno selo/marcador circular discreto (não decorativo, funcional) ao lado de cada registro, indicando "Registrado por [nome]" — reforça rastreabilidade e credibilidade do sistema.

**Padrões obrigatórios de acessibilidade:**
- Contraste mínimo AA (WCAG 2.1) em todo texto sobre fundo
- Foco de teclado sempre visível
- Todo ícone acompanhado de texto (nunca ícone sozinho como única informação)
- Linguagem simples e direta em toda a interface: "Avisos" em vez de "Notificações", "Como está indo" em vez de "Performance/Analytics", frases curtas, sem jargão técnico ou termos em inglês
- Sem dependência de hover — todo elemento interativo deve funcionar por toque
- Fluxos principais (ex: "ver como o filho está indo") devem levar no máximo 2 toques/cliques a partir da tela inicial

---

### Escopo da primeira versão (MVP)

Construir primeiro:
1. Autenticação (login simples, 4 perfis: responsável, aluno, professor, admin)
2. Tela inicial do Responsável com resumo + timeline do filho
3. Tela inicial do Aluno com recados e tarefas
4. Tela do Professor para "Novo registro", "Novo recado" e "Nova tarefa" (descrição, data, material necessário)
5. Chat 1:1 entre professor e responsável, separado por aluno
6. Painel básico do Admin (cadastro de usuários e turmas)

Deixar para depois (não incluir na v1, mas deixar a arquitetura preparada): relatórios avançados/exportação, app mobile nativo, notificações push, chat em grupo/turma inteira.