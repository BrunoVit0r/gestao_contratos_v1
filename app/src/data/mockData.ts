import type { 
  Contract, 
  Service, 
  Payment, 
  Checklist, 
  TimelineEvent, 
  UserScore,
  ContractTemplate,
  Notification,
  DashboardStats 
} from '@/types';

// Contratos mockados
export const mockContracts: Contract[] = [
  {
    id: 'c1',
    number: 'CTR-2024-001',
    title: 'Serviços de Manutenção Predial',
    description: 'Contrato para prestação de serviços de manutenção preventiva e corretiva do prédio comercial localizado na Av. Paulista.',
    clientId: '1',
    providerId: '2',
    client: {
      id: '1',
      name: 'João Silva',
      email: 'cliente@email.com',
      type: 'cliente',
      companyName: 'Silva Empreendimentos LTDA',
      document: '12.345.678/0001-90',
      phone: '(11) 98765-4321',
      score: 4.7,
      totalContracts: 12,
      completedContracts: 10,
      createdAt: new Date('2023-01-15')
    },
    provider: {
      id: '2',
      name: 'Maria Santos',
      email: 'prestador@email.com',
      type: 'prestador',
      companyName: 'Santos Serviços Especializados',
      document: '98.765.432/0001-10',
      phone: '(11) 91234-5678',
      score: 4.9,
      totalContracts: 25,
      completedContracts: 23,
      createdAt: new Date('2022-06-20')
    },
    value: 45000,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    status: 'ativo',
    services: [],
    payments: [],
    checklists: [],
    timeline: [],
    documents: [],
    scoreClient: 4.8,
    scoreProvider: 4.9,
    autoFillData: {
      serviceType: 'Manutenção Predial',
      serviceDetails: 'Manutenção preventiva e corretiva de sistemas elétricos, hidráulicos e estruturais',
      deliveryDeadline: 365,
      paymentTerms: 'Mensal, até o 5º dia útil',
      warrantyPeriod: 90,
      penaltiesDescription: 'Multa de 2% ao mês em caso de atraso no pagamento',
      specialClauses: 'Atendimento emergencial em até 4 horas'
    },
    createdAt: new Date('2023-12-15'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'c2',
    number: 'CTR-2024-002',
    title: 'Consultoria em Gestão Empresarial',
    description: 'Serviços de consultoria para otimização de processos internos e gestão de equipes.',
    clientId: '1',
    providerId: '2',
    client: {
      id: '1',
      name: 'João Silva',
      email: 'cliente@email.com',
      type: 'cliente',
      companyName: 'Silva Empreendimentos LTDA',
      document: '12.345.678/0001-90',
      phone: '(11) 98765-4321',
      score: 4.7,
      totalContracts: 12,
      completedContracts: 10,
      createdAt: new Date('2023-01-15')
    },
    provider: {
      id: '2',
      name: 'Maria Santos',
      email: 'prestador@email.com',
      type: 'prestador',
      companyName: 'Santos Serviços Especializados',
      document: '98.765.432/0001-10',
      phone: '(11) 91234-5678',
      score: 4.9,
      totalContracts: 25,
      completedContracts: 23,
      createdAt: new Date('2022-06-20')
    },
    value: 28000,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-07-31'),
    status: 'ativo',
    services: [],
    payments: [],
    checklists: [],
    timeline: [],
    documents: [],
    autoFillData: {
      serviceType: 'Consultoria',
      serviceDetails: 'Consultoria em gestão de processos e equipes',
      deliveryDeadline: 180,
      paymentTerms: 'Parcelado em 6x',
      warrantyPeriod: 30,
      specialClauses: 'Relatórios mensais de progresso'
    },
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: 'c3',
    number: 'CTR-2023-015',
    title: 'Reforma de Escritório',
    description: 'Reforma completa do escritório principal, incluindo pintura, piso e iluminação.',
    clientId: '1',
    providerId: '2',
    client: {
      id: '1',
      name: 'João Silva',
      email: 'cliente@email.com',
      type: 'cliente',
      companyName: 'Silva Empreendimentos LTDA',
      document: '12.345.678/0001-90',
      phone: '(11) 98765-4321',
      score: 4.7,
      totalContracts: 12,
      completedContracts: 10,
      createdAt: new Date('2023-01-15')
    },
    provider: {
      id: '2',
      name: 'Maria Santos',
      email: 'prestador@email.com',
      type: 'prestador',
      companyName: 'Santos Serviços Especializados',
      document: '98.765.432/0001-10',
      phone: '(11) 91234-5678',
      score: 4.9,
      totalContracts: 25,
      completedContracts: 23,
      createdAt: new Date('2022-06-20')
    },
    value: 35000,
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-09-30'),
    status: 'concluido',
    services: [],
    payments: [],
    checklists: [],
    timeline: [],
    documents: [],
    scoreClient: 4.5,
    scoreProvider: 5.0,
    autoFillData: {
      serviceType: 'Reforma',
      serviceDetails: 'Reforma completa de escritório',
      deliveryDeadline: 120,
      paymentTerms: '50% entrada, 50% na conclusão',
      warrantyPeriod: 180,
      specialClauses: 'Material de primeira linha'
    },
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date('2023-09-30')
  },
  {
    id: 'c4',
    number: 'CTR-2024-003',
    title: 'Desenvolvimento de Sistema Web',
    description: 'Desenvolvimento de plataforma web personalizada para gestão interna.',
    clientId: '1',
    providerId: '2',
    client: {
      id: '1',
      name: 'João Silva',
      email: 'cliente@email.com',
      type: 'cliente',
      companyName: 'Silva Empreendimentos LTDA',
      document: '12.345.678/0001-90',
      phone: '(11) 98765-4321',
      score: 4.7,
      totalContracts: 12,
      completedContracts: 10,
      createdAt: new Date('2023-01-15')
    },
    provider: {
      id: '2',
      name: 'Maria Santos',
      email: 'prestador@email.com',
      type: 'prestador',
      companyName: 'Santos Serviços Especializados',
      document: '98.765.432/0001-10',
      phone: '(11) 91234-5678',
      score: 4.9,
      totalContracts: 25,
      completedContracts: 23,
      createdAt: new Date('2022-06-20')
    },
    value: 65000,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-08-31'),
    status: 'pendente',
    services: [],
    payments: [],
    checklists: [],
    timeline: [],
    documents: [],
    autoFillData: {
      serviceType: 'Desenvolvimento de Software',
      serviceDetails: 'Desenvolvimento de sistema web personalizado',
      deliveryDeadline: 180,
      paymentTerms: '30% entrada, 40% no meio, 30% na entrega',
      warrantyPeriod: 365,
      specialClauses: 'Código fonte entregue ao final'
    },
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15')
  }
];

// Serviços mockados
export const mockServices: Service[] = [
  {
    id: 's1',
    contractId: 'c1',
    name: 'Manutenção Elétrica - Janeiro',
    description: 'Verificação e manutenção do sistema elétrico do prédio',
    status: 'concluido',
    startDate: new Date('2024-01-05'),
    completionDate: new Date('2024-01-08'),
    expectedDate: new Date('2024-01-10'),
    value: 3750,
    observations: 'Substituição de 3 lâmpadas queimadas e ajuste no quadro principal'
  },
  {
    id: 's2',
    contractId: 'c1',
    name: 'Manutenção Hidráulica - Janeiro',
    description: 'Verificação de encanamentos e torneiras',
    status: 'concluido',
    startDate: new Date('2024-01-12'),
    completionDate: new Date('2024-01-12'),
    expectedDate: new Date('2024-01-15'),
    value: 2500,
    observations: 'Tudo em ordem, apenas limpeza nos ralos'
  },
  {
    id: 's3',
    contractId: 'c1',
    name: 'Manutenção Elétrica - Fevereiro',
    description: 'Verificação e manutenção do sistema elétrico',
    status: 'em_andamento',
    startDate: new Date('2024-02-05'),
    expectedDate: new Date('2024-02-10'),
    value: 3750
  },
  {
    id: 's4',
    contractId: 'c2',
    name: 'Diagnóstico Inicial',
    description: 'Análise completa dos processos atuais',
    status: 'concluido',
    startDate: new Date('2024-02-01'),
    completionDate: new Date('2024-02-15'),
    expectedDate: new Date('2024-02-15'),
    value: 5000,
    observations: 'Documentação completa entregue'
  },
  {
    id: 's5',
    contractId: 'c2',
    name: 'Implementação de Melhorias',
    description: 'Aplicação das recomendações do diagnóstico',
    status: 'pendente',
    expectedDate: new Date('2024-03-01'),
    value: 15000
  }
];

// Pagamentos mockados
export const mockPayments: Payment[] = [
  {
    id: 'p1',
    contractId: 'c1',
    description: 'Mensalidade Janeiro/2024',
    value: 3750,
    dueDate: new Date('2024-01-05'),
    paymentDate: new Date('2024-01-04'),
    status: 'pago',
    method: 'Transferência Bancária',
    isProviderPayment: true
  },
  {
    id: 'p2',
    contractId: 'c1',
    description: 'Mensalidade Fevereiro/2024',
    value: 3750,
    dueDate: new Date('2024-02-05'),
    paymentDate: new Date('2024-02-06'),
    status: 'pago',
    method: 'PIX',
    isProviderPayment: true
  },
  {
    id: 'p3',
    contractId: 'c1',
    description: 'Mensalidade Março/2024',
    value: 3750,
    dueDate: new Date('2024-03-05'),
    status: 'pendente',
    isProviderPayment: true
  },
  {
    id: 'p4',
    contractId: 'c2',
    description: 'Parcela 1/6',
    value: 4666.67,
    dueDate: new Date('2024-02-01'),
    paymentDate: new Date('2024-02-01'),
    status: 'pago',
    method: 'Boleto',
    isProviderPayment: true
  },
  {
    id: 'p5',
    contractId: 'c2',
    description: 'Parcela 2/6',
    value: 4666.67,
    dueDate: new Date('2024-03-01'),
    status: 'pendente',
    isProviderPayment: true
  },
  {
    id: 'p6',
    contractId: 'c3',
    description: 'Entrada - Reforma',
    value: 17500,
    dueDate: new Date('2023-06-01'),
    paymentDate: new Date('2023-06-01'),
    status: 'pago',
    method: 'Transferência',
    isProviderPayment: true
  },
  {
    id: 'p7',
    contractId: 'c3',
    description: 'Final - Reforma',
    value: 17500,
    dueDate: new Date('2023-09-30'),
    paymentDate: new Date('2023-10-05'),
    status: 'pago',
    method: 'PIX',
    isProviderPayment: true
  }
];

// Checklists mockados
export const mockChecklists: Checklist[] = [
  {
    id: 'ch1',
    contractId: 'c1',
    title: 'Avaliação Mensal - Janeiro',
    items: [
      { id: 'i1', description: 'Atendimento no prazo', isCompleted: true, completedAt: new Date('2024-01-10') },
      { id: 'i2', description: 'Qualidade do serviço', isCompleted: true, completedAt: new Date('2024-01-10') },
      { id: 'i3', description: 'Limpeza após serviço', isCompleted: true, completedAt: new Date('2024-01-10') },
      { id: 'i4', description: 'Comunicação clara', isCompleted: true, completedAt: new Date('2024-01-10') }
    ],
    isCompleted: true,
    completedAt: new Date('2024-01-10'),
    score: 4.8,
    feedback: 'Excelente trabalho, muito satisfeito!',
    createdBy: '1',
    createdFor: '2',
    createdAt: new Date('2024-01-08')
  },
  {
    id: 'ch2',
    contractId: 'c2',
    title: 'Avaliação Diagnóstico',
    items: [
      { id: 'i5', description: 'Pontualidade nas reuniões', isCompleted: true, completedAt: new Date('2024-02-16') },
      { id: 'i6', description: 'Qualidade do relatório', isCompleted: true, completedAt: new Date('2024-02-16') },
      { id: 'i7', description: 'Propostas viáveis', isCompleted: true, completedAt: new Date('2024-02-16') },
      { id: 'i8', description: 'Conhecimento técnico', isCompleted: true, completedAt: new Date('2024-02-16') }
    ],
    isCompleted: true,
    completedAt: new Date('2024-02-16'),
    score: 5.0,
    feedback: 'Profissional excepcional, relatório muito completo.',
    createdBy: '1',
    createdFor: '2',
    createdAt: new Date('2024-02-15')
  },
  {
    id: 'ch3',
    contractId: 'c1',
    title: 'Avaliação Mensal - Fevereiro',
    items: [
      { id: 'i9', description: 'Atendimento no prazo', isCompleted: false },
      { id: 'i10', description: 'Qualidade do serviço', isCompleted: false },
      { id: 'i11', description: 'Limpeza após serviço', isCompleted: false },
      { id: 'i12', description: 'Comunicação clara', isCompleted: false }
    ],
    isCompleted: false,
    createdBy: '1',
    createdFor: '2',
    createdAt: new Date('2024-02-08')
  }
];

// Timeline mockada
export const mockTimeline: TimelineEvent[] = [
  {
    id: 't1',
    contractId: 'c1',
    type: 'contrato_criado',
    title: 'Contrato Criado',
    description: 'Contrato de manutenção predial foi criado e enviado para assinatura.',
    date: new Date('2023-12-15'),
    createdBy: '2',
    isVisibleToClient: true,
    isVisibleToProvider: true
  },
  {
    id: 't2',
    contractId: 'c1',
    type: 'contrato_assinado',
    title: 'Contrato Assinado',
    description: 'Ambas as partes assinaram o contrato. Início dos serviços em 01/01/2024.',
    date: new Date('2024-01-01'),
    createdBy: '1',
    isVisibleToClient: true,
    isVisibleToProvider: true
  },
  {
    id: 't3',
    contractId: 'c1',
    type: 'servico_iniciado',
    title: 'Serviço Iniciado',
    description: 'Iniciada a manutenção elétrica de janeiro.',
    date: new Date('2024-01-05'),
    createdBy: '2',
    isVisibleToClient: true,
    isVisibleToProvider: true
  },
  {
    id: 't4',
    contractId: 'c1',
    type: 'servico_concluido',
    title: 'Serviço Concluído',
    description: 'Manutenção elétrica finalizada com sucesso.',
    date: new Date('2024-01-08'),
    createdBy: '2',
    isVisibleToClient: true,
    isVisibleToProvider: true
  },
  {
    id: 't5',
    contractId: 'c1',
    type: 'pagamento_efetuado',
    title: 'Pagamento Confirmado',
    description: 'Pagamento de R$ 3.750,00 referente à mensalidade de janeiro.',
    date: new Date('2024-01-04'),
    createdBy: '1',
    isVisibleToClient: true,
    isVisibleToProvider: true
  },
  {
    id: 't6',
    contractId: 'c1',
    type: 'checklist_respondido',
    title: 'Avaliação Recebida',
    description: 'Cliente avaliou o serviço com nota 4.8/5.0',
    date: new Date('2024-01-10'),
    createdBy: '1',
    isVisibleToClient: true,
    isVisibleToProvider: true
  }
];

// Scores mockados
export const mockScores: UserScore[] = [
  {
    userId: '1',
    overallScore: 4.7,
    totalEvaluations: 12,
    breakdown: [
      { category: 'Pontualidade no Pagamento', weight: 0.3, score: 4.8, maxScore: 5 },
      { category: 'Comunicação', weight: 0.2, score: 4.6, maxScore: 5 },
      { category: 'Cumprimento de Cláusulas', weight: 0.3, score: 4.7, maxScore: 5 },
      { category: 'Facilidade de Trabalho', weight: 0.2, score: 4.7, maxScore: 5 }
    ],
    history: [
      { date: new Date('2024-01-10'), score: 4.8, contractId: 'c1', reason: 'Avaliação mensal' },
      { date: new Date('2023-09-30'), score: 4.5, contractId: 'c3', reason: 'Avaliação final' }
    ]
  },
  {
    userId: '2',
    overallScore: 4.9,
    totalEvaluations: 25,
    breakdown: [
      { category: 'Qualidade do Serviço', weight: 0.35, score: 4.9, maxScore: 5 },
      { category: 'Pontualidade', weight: 0.25, score: 4.8, maxScore: 5 },
      { category: 'Comunicação', weight: 0.2, score: 5.0, maxScore: 5 },
      { category: 'Custo-Benefício', weight: 0.2, score: 4.8, maxScore: 5 }
    ],
    history: [
      { date: new Date('2024-02-16'), score: 5.0, contractId: 'c2', reason: 'Avaliação diagnóstico' },
      { date: new Date('2024-01-10'), score: 4.8, contractId: 'c1', reason: 'Avaliação mensal' },
      { date: new Date('2023-09-30'), score: 5.0, contractId: 'c3', reason: 'Avaliação final' }
    ]
  }
];

// Templates de contrato
export const mockTemplates: ContractTemplate[] = [
  {
    id: 'temp1',
    name: 'Prestação de Serviços Gerais',
    description: 'Template para serviços de manutenção, consultoria e outros serviços recorrentes.',
    serviceType: 'Serviços Gerais',
    defaultClauses: [
      'O PRESTADOR se obriga a executar os serviços com zelo e diligência.',
      'O CONTRATANTE se obriga a fornecer as condições necessárias para execução dos serviços.',
      'O pagamento será efetuado conforme condições estipuladas neste contrato.'
    ],
    autoFillData: {
      paymentTerms: 'Mensal',
      warrantyPeriod: 90
    }
  },
  {
    id: 'temp2',
    name: 'Desenvolvimento de Software',
    description: 'Template para projetos de desenvolvimento de sistemas e aplicativos.',
    serviceType: 'Tecnologia',
    defaultClauses: [
      'O código fonte será entregue ao final do projeto.',
      'Período de garantia para correção de bugs.',
      'Proteção de dados e confidencialidade.'
    ],
    autoFillData: {
      paymentTerms: 'Parcelado',
      warrantyPeriod: 365
    }
  },
  {
    id: 'temp3',
    name: 'Reforma e Construção',
    description: 'Template para serviços de reforma, construção e obras.',
    serviceType: 'Construção Civil',
    defaultClauses: [
      'Uso de materiais de qualidade conforme especificações.',
      'Responsabilidade por acidentes durante a obra.',
      'Cronograma de execução a ser cumprido.'
    ],
    autoFillData: {
      paymentTerms: 'Por etapas',
      warrantyPeriod: 180
    }
  }
];

// Notificações mockadas
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: '1',
    title: 'Novo contrato disponível',
    message: 'O contrato CTR-2024-003 está pendente de sua assinatura.',
    type: 'contrato',
    isRead: false,
    relatedId: 'c4',
    createdAt: new Date('2024-02-15')
  },
  {
    id: 'n2',
    userId: '1',
    title: 'Pagamento próximo do vencimento',
    message: 'O pagamento de R$ 3.750,00 vence em 3 dias.',
    type: 'pagamento',
    isRead: false,
    relatedId: 'p3',
    createdAt: new Date('2024-03-02')
  },
  {
    id: 'n3',
    userId: '1',
    title: 'Checklist pendente',
    message: 'Você tem uma avaliação pendente para o contrato CTR-2024-001.',
    type: 'checklist',
    isRead: true,
    relatedId: 'ch3',
    createdAt: new Date('2024-02-08')
  },
  {
    id: 'n4',
    userId: '2',
    title: 'Novo serviço atribuído',
    message: 'O serviço "Implementação de Melhorias" foi iniciado.',
    type: 'servico',
    isRead: false,
    relatedId: 's5',
    createdAt: new Date('2024-02-20')
  }
];

// Estatísticas do dashboard
export const getDashboardStats = (userType: 'cliente' | 'prestador'): DashboardStats => {
  if (userType === 'cliente') {
    return {
      totalContracts: 4,
      activeContracts: 2,
      pendingContracts: 1,
      completedContracts: 1,
      totalValue: 173000,
      pendingPayments: 2,
      overduePayments: 0,
      averageScore: 4.7,
      pendingChecklists: 1
    };
  }
  return {
    totalContracts: 4,
    activeContracts: 2,
    pendingContracts: 1,
    completedContracts: 1,
    totalValue: 173000,
    pendingPayments: 2,
    overduePayments: 0,
    averageScore: 4.9,
    pendingChecklists: 0
  };
};
