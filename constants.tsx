import { PhaseData, SectionData } from './types';

export const GENERAL_GUIDELINES: SectionData = {
  title: "ORIENTAÇÕES GERAIS",
  isList: true,
  content: [
    "Este cronograma tem como objetivo organizar a aplicação prática do Protocolo H.E.C., respeitando o tempo emocional de cada cão.",
    "Os prazos são referências, não regras fixas.",
    "O avanço deve ocorrer de acordo com o estado emocional do cão, e não apenas pelo número de dias.",
    "Em caso de dúvidas ou dificuldades, consulte sempre o adestrador ou profissional responsável."
  ]
};

export const FINAL_OBSERVATION: SectionData = {
  title: "OBSERVAÇÃO FINAL",
  isList: false,
  content: [
    "Este cronograma é um guia estrutural. Cada cão é único.",
    "Sempre que houver dúvidas, dificuldades ou regressões, procure orientação do adestrador ou profissional responsável antes de realizar ajustes."
  ]
};

export const PHASES: PhaseData[] = [
  {
    id: 1,
    title: "FASE 1 — ESTABILIZAÇÃO EMOCIONAL",
    duration: "3 a 7 dias",
    emotionalObjectives: [
      "Reduzir excitação excessiva",
      "Criar previsibilidade e segurança",
      "Iniciar organização do sistema emocional"
    ],
    practicalObjectives: [
      "Organizar horários de alimentação",
      "Iniciar o ritual de respeito no referencial (place)",
      "Controlar o fluxo do cão pela casa",
      "Apresentar a guia de forma neutra",
      "Direcionar energia para exercícios de caça"
    ],
    indicatedTraining: [
      "Ritual da alimentação no referencial",
      "Controle de fluxo em portas e passagens",
      "Introdução ao espaço limitador",
      "Exercícios de caça estruturados",
      "Contato inicial com a guia"
    ],
    advancementCriteria: [
      "O cão consegue esperar curtos períodos",
      "Redução visível de ansiedade e impulsividade"
    ]
  },
  {
    id: 2,
    title: "FASE 2 — ORGANIZAÇÃO EMOCIONAL INICIAL",
    duration: "3 a 10 dias",
    emotionalObjectives: [
      "Ensinar o cão a desacelerar conscientemente",
      "Aumentar tolerância à frustração leve"
    ],
    practicalObjectives: [
      "Apresentar o referencial na alimentação de forma consistente",
      "Iniciar respeito à porta aberta do espaço limitador",
      "Definir horários fixos de exercícios",
      "Introduzir o caminhar junto com guia"
    ],
    indicatedTraining: [
      "Caminhar junto com guia (curtos períodos)",
      "Exercícios de caça simples",
      "Espera breve no referencial"
    ],
    advancementCriteria: [
      "O cão aceita interrupções sem explosão emocional"
    ]
  },
  {
    id: 3,
    title: "FASE 3 — ORGANIZAÇÃO EMOCIONAL E COMPORTAMENTAL",
    duration: "3 a 10 dias",
    emotionalObjectives: [
      "Desenvolver autocontrole",
      "Aumentar clareza de regras"
    ],
    practicalObjectives: [
      "Introduzir a espera no referencial durante a alimentação",
      "Intensificar respeito ao espaço limitador",
      "Iniciar comandos limitadores básicos"
    ],
    indicatedTraining: [
      "Caminhar junto e senta automático (nível inicial)",
      "Comandos limitadores simples",
      "Exercício de caça com introdução do “deixa”"
    ],
    advancementCriteria: [
      "O cão erra e se reorganiza rapidamente"
    ]
  },
  {
    id: 4,
    title: "FASE 4 — CONSOLIDAÇÃO EMOCIONAL",
    duration: "3 a 10 dias",
    emotionalObjectives: [
      "Manter equilíbrio mesmo com distrações",
      "Ensinar correções neutras e previsíveis"
    ],
    practicalObjectives: [
      "Aumentar tempo de espera no referencial",
      "Trabalhar limites com distrações controladas",
      "Realizar exercícios fora de casa em ambientes tranquilos"
    ],
    indicatedTraining: [
      "Espera no referencial com distrações leves",
      "Caminhar junto e comandos básicos",
      "Exercícios de caça com indução ao referencial"
    ],
    advancementCriteria: [
      "O cão mantém comportamento funcional mesmo estimulado"
    ]
  },
  {
    id: 5,
    title: "FASE 5 — DISTÂNCIA E AUTONOMIA PROGRESSIVA",
    duration: "3 a 10 dias",
    emotionalObjectives: [
      "Desenvolver autorregulação à distância"
    ],
    practicalObjectives: [
      "Aumentar tempo, distrações e distância na espera",
      "Executar comandos sem presença constante do tutor",
      "Realizar passeios curtos com mudanças de direção"
    ],
    indicatedTraining: [
      "Espera no referencial com distância",
      "Caminhar junto e comandos em níveis intermediários",
      "Exercícios de caça com indução ao referencial"
    ],
    advancementCriteria: [
      "O cão mantém equilíbrio sem supervisão direta"
    ]
  },
  {
    id: 6,
    title: "FASE 6 — AUTONOMIA EMOCIONAL FUNCIONAL",
    duration: "3 a 7 dias",
    emotionalObjectives: [
      "Transferir controle da guia para os comandos"
    ],
    practicalObjectives: [
      "Espera no referencial sem uso da guia",
      "Comandos limitadores pela casa sem presença",
      "Passeios exigindo o que foi treinado em casa"
    ],
    indicatedTraining: [
      "Espera no referencial sem guia",
      "Caminhar junto e comandos avançados",
      "Exercícios de caça com recompensa imediata"
    ],
    advancementCriteria: [
      "O cão responde aos comandos mesmo sem guia"
    ]
  },
  {
    id: 7,
    title: "FASE 7 — ESTABILIDADE EMOCIONAL AVANÇADA",
    duration: "3 a 7 dias",
    emotionalObjectives: [
      "Manter homeostase em contextos variados"
    ],
    practicalObjectives: [
      "Executar comandos com distrações reais",
      "Trabalhar sequências alternadas de recompensa"
    ],
    indicatedTraining: [
      "Espera no referencial em diferentes contextos",
      "Caminhar junto e comandos em nível avançado",
      "Exercícios de caça com reforço variável"
    ],
    advancementCriteria: [
      "O cão se autorregula em ambientes diversos"
    ]
  },
  {
    id: 8,
    title: "FASE 8 — MANUTENÇÃO DA HOMEOSTASE EMOCIONAL",
    duration: "Contínua",
    emotionalObjectives: [
      "Manter equilíbrio emocional ao longo da vida"
    ],
    practicalObjectives: [
      "Rotina consistente",
      "Exercícios regulares de caça",
      "Limites claros no dia a dia",
      "Treinos curtos e frequentes"
    ],
    indicatedTraining: [], // Phase 8 "Práticas recomendadas" maps to practicalObjectives for simpler UI, or we can leave this empty.
    description: "A homeostase emocional não é um ponto final. É um estado construído e mantido diariamente."
  }
];