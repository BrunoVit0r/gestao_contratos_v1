// Tipos de usuários
export type UserType = 'cliente' | 'prestador' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  companyName?: string;
  document: string; // CPF ou CNPJ
  phone: string;
  address?: Address;
  score: number;
  totalContracts: number;
  completedContracts: number;
  avatar?: string;
  createdAt: Date;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

// Status do contrato
export type ContractStatus = 'rascunho' | 'pendente' | 'ativo' | 'pausado' | 'concluido' | 'cancelado';

export interface Contract {
  id: string;
  number: string;
  title: string;
  description: string;
  clientId: string;
  providerId: string;
  client: User;
  provider: User;
  value: number;
  startDate: Date;
  endDate: Date;
  status: ContractStatus;
  services: Service[];
  payments: Payment[];
  checklists: Checklist[];
  timeline: TimelineEvent[];
  documents: Document[];
  scoreClient?: number;
  scoreProvider?: number;
  autoFillData: AutoFillData;
  createdAt: Date;
  updatedAt: Date;
}

// Dados para preenchimento automático
export interface AutoFillData {
  serviceType: string;
  serviceDetails: string;
  deliveryDeadline: number; // em dias
  paymentTerms: string;
  warrantyPeriod: number; // em dias
  penaltiesDescription?: string;
  specialClauses?: string;
}

// Serviços dentro do contrato
export type ServiceStatus = 'pendente' | 'em_andamento' | 'concluido' | 'aprovado' | 'reprovado';

export interface Service {
  id: string;
  contractId: string;
  name: string;
  description: string;
  status: ServiceStatus;
  startDate?: Date;
  completionDate?: Date;
  expectedDate: Date;
  value: number;
  observations?: string;
  attachments?: Attachment[];
}

// Pagamentos
export type PaymentStatus = 'pendente' | 'agendado' | 'pago' | 'atrasado' | 'cancelado';

export interface Payment {
  id: string;
  contractId: string;
  description: string;
  value: number;
  dueDate: Date;
  paymentDate?: Date;
  status: PaymentStatus;
  method?: string;
  proofOfPayment?: string;
  isProviderPayment: boolean; // true = pagamento ao prestador, false = pagamento do cliente
}

// Checklist e Avaliações
export interface Checklist {
  id: string;
  contractId: string;
  title: string;
  items: ChecklistItem[];
  isCompleted: boolean;
  completedAt?: Date;
  score?: number;
  feedback?: string;
  createdBy: string; // ID do usuário que criou
  createdFor: string; // ID do usuário que deve responder
  createdAt: Date;
}

export interface ChecklistItem {
  id: string;
  description: string;
  isCompleted: boolean;
  completedAt?: Date;
  observation?: string;
}

// Timeline/Eventos
export interface TimelineEvent {
  id: string;
  contractId: string;
  type: TimelineEventType;
  title: string;
  description: string;
  date: Date;
  createdBy: string;
  isVisibleToClient: boolean;
  isVisibleToProvider: boolean;
  attachments?: Attachment[];
}

export type TimelineEventType = 
  | 'contrato_criado'
  | 'contrato_assinado'
  | 'servico_iniciado'
  | 'servico_concluido'
  | 'pagamento_efetuado'
  | 'checklist_enviado'
  | 'checklist_respondido'
  | 'avaliacao_realizada'
  | 'prorrogacao'
  | 'cancelamento'
  | 'reclamacao'
  | 'resolucao'
  | 'comunicacao';

// Documentos
export interface Document {
  id: string;
  contractId: string;
  name: string;
  type: string;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
}

// Score/Ranking
export interface ScoreBreakdown {
  category: string;
  weight: number;
  score: number;
  maxScore: number;
}

export interface UserScore {
  userId: string;
  overallScore: number;
  totalEvaluations: number;
  breakdown: ScoreBreakdown[];
  history: ScoreHistory[];
}

export interface ScoreHistory {
  date: Date;
  score: number;
  contractId: string;
  reason: string;
}

// Notificações
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  relatedId?: string; // ID do contrato, pagamento, etc.
  createdAt: Date;
}

export type NotificationType = 
  | 'contrato'
  | 'pagamento'
  | 'servico'
  | 'checklist'
  | 'avaliacao'
  | 'sistema';

// Filtros e busca
export interface ContractFilters {
  status?: ContractStatus;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  valueMin?: number;
  valueMax?: number;
}

// Estatísticas do dashboard
export interface DashboardStats {
  totalContracts: number;
  activeContracts: number;
  pendingContracts: number;
  completedContracts: number;
  totalValue: number;
  pendingPayments: number;
  overduePayments: number;
  averageScore: number;
  pendingChecklists: number;
}

// Templates de contrato
export interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  serviceType: string;
  defaultClauses: string[];
  autoFillData: Partial<AutoFillData>;
}
