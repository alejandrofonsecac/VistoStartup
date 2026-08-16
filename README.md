# Visto

> Todo esforço merece ser visto.

**Visto** é um protótipo de plataforma para aproximar alunos, famílias, professores e coordenação em torno do acompanhamento escolar. O projeto foi desenvolvido para o **Startup Weekend Timbó 2026** como uma forma de construir, apresentar e validar a ideia com rapidez.

## Por que Visto?

O nome nasce da ideia de que o esforço de cada aluno precisa ser percebido, registrado e acompanhado. A Visto transforma acontecimentos do cotidiano escolar em informações claras: uma participação, uma atividade, um aviso, uma nota ou uma conversa deixam de se perder e passam a ter contexto e continuidade.

## Objetivo do projeto

Este projeto foi principalmente **vibe coded**: uma construção rápida e iterativa, guiada pela experiência que queríamos validar. O foco não foi criar um produto final completo, mas testar se uma interface simples e organizada ajudaria a escola a tornar a comunicação e o acompanhamento mais próximos.

## O que a demonstração inclui

- Landing page institucional com apresentação, planos e contato via WhatsApp.
- Login de demonstração para responsável, aluno, professor e coordenação.
- Tarefas, avisos, histórico e notas para alunos e responsáveis.
- Agenda com calendário e próximas atividades.
- Registros, criação de tarefas e recados para professores.
- Painel, turmas, usuários e conversas para a coordenação.
- Chat com a coordenação adaptado para desktop e celular.

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide React

## Executar localmente

```bash
npm install
npm run dev
```

O projeto também possui uma compilação de produção:

```bash
npm run build
```

## Dados de demonstração

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Responsável | `responsavel@escola.edu.br` | `123456` |
| Aluno | `aluno@escola.edu.br` | `123456` |
| Professor | `professor@escola.edu.br` | `123456` |
| Coordenação | `admin@escola.edu.br` | `123456` |

## Próximos passos

Como protótipo de validação, a Visto ainda usa dados de demonstração no navegador. Os próximos passos naturais são conectar autenticação, banco de dados, notificações e as regras reais de cada escola.
