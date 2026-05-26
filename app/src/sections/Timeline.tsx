import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  FileText, 
  CheckCircle, 
  DollarSign, 
  ClipboardCheck, 
  Star,
  Calendar,
  MessageSquare,
  AlertTriangle,
  Clock,
  Filter
} from 'lucide-react';
import { mockTimeline } from '@/data/mockData';
import type { Contract, TimelineEventType } from '@/types';

interface TimelineProps {
  contracts: Contract[];
  userType: 'cliente' | 'prestador';
}

export function Timeline({ contracts }: TimelineProps) {
  const [selectedContract, setSelectedContract] = useState<string>('all');
  const [eventFilter, setEventFilter] = useState<TimelineEventType | 'all'>('all');

  const allEvents = contracts.flatMap(contract => 
    mockTimeline
      .filter(event => event.contractId === contract.id)
      .map(event => ({ ...event, contract }))
  ).sort((a, b) => b.date.getTime() - a.date.getTime());

  const filteredEvents = allEvents.filter(event => {
    const matchesContract = selectedContract === 'all' || event.contractId === selectedContract;
    const matchesType = eventFilter === 'all' || event.type === eventFilter;
    return matchesContract && matchesType;
  });

  const getEventIcon = (type: TimelineEventType) => {
    const icons: Record<TimelineEventType, React.ReactNode> = {
      'contrato_criado': <FileText className="w-4 h-4" />,
      'contrato_assinado': <CheckCircle className="w-4 h-4" />,
      'servico_iniciado': <Clock className="w-4 h-4" />,
      'servico_concluido': <CheckCircle className="w-4 h-4" />,
      'pagamento_efetuado': <DollarSign className="w-4 h-4" />,
      'checklist_enviado': <ClipboardCheck className="w-4 h-4" />,
      'checklist_respondido': <ClipboardCheck className="w-4 h-4" />,
      'avaliacao_realizada': <Star className="w-4 h-4" />,
      'prorrogacao': <Calendar className="w-4 h-4" />,
      'cancelamento': <AlertTriangle className="w-4 h-4" />,
      'reclamacao': <AlertTriangle className="w-4 h-4" />,
      'resolucao': <CheckCircle className="w-4 h-4" />,
      'comunicacao': <MessageSquare className="w-4 h-4" />
    };
    return icons[type] || <FileText className="w-4 h-4" />;
  };

  const getEventColor = (type: TimelineEventType) => {
    const colors: Record<TimelineEventType, string> = {
      'contrato_criado': 'bg-blue-100 text-blue-800',
      'contrato_assinado': 'bg-green-100 text-green-800',
      'servico_iniciado': 'bg-yellow-100 text-yellow-800',
      'servico_concluido': 'bg-green-100 text-green-800',
      'pagamento_efetuado': 'bg-purple-100 text-purple-800',
      'checklist_enviado': 'bg-blue-100 text-blue-800',
      'checklist_respondido': 'bg-green-100 text-green-800',
      'avaliacao_realizada': 'bg-yellow-100 text-yellow-800',
      'prorrogacao': 'bg-blue-100 text-blue-800',
      'cancelamento': 'bg-red-100 text-red-800',
      'reclamacao': 'bg-orange-100 text-orange-800',
      'resolucao': 'bg-green-100 text-green-800',
      'comunicacao': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getEventLabel = (type: TimelineEventType) => {
    const labels: Record<TimelineEventType, string> = {
      'contrato_criado': 'Contrato Criado',
      'contrato_assinado': 'Contrato Assinado',
      'servico_iniciado': 'Serviço Iniciado',
      'servico_concluido': 'Serviço Concluído',
      'pagamento_efetuado': 'Pagamento Efetuado',
      'checklist_enviado': 'Checklist Enviado',
      'checklist_respondido': 'Checklist Respondido',
      'avaliacao_realizada': 'Avaliação Realizada',
      'prorrogacao': 'Prorrogação',
      'cancelamento': 'Cancelamento',
      'reclamacao': 'Reclamação',
      'resolucao': 'Resolução',
      'comunicacao': 'Comunicação'
    };
    return labels[type] || type;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Agrupar eventos por mês
  const groupedEvents = filteredEvents.reduce((groups, event) => {
    const month = event.date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
    if (!groups[month]) groups[month] = [];
    groups[month].push(event);
    return groups;
  }, {} as Record<string, typeof filteredEvents>);

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={selectedContract} onValueChange={setSelectedContract}>
          <SelectTrigger className="w-full sm:w-[280px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filtrar por contrato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os contratos</SelectItem>
            {contracts.map(contract => (
              <SelectItem key={contract.id} value={contract.id}>
                {contract.number} - {contract.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={eventFilter} onValueChange={(value) => setEventFilter(value as TimelineEventType | 'all')}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Tipo de evento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os eventos</SelectItem>
            <SelectItem value="contrato_criado">Contrato Criado</SelectItem>
            <SelectItem value="contrato_assinado">Contrato Assinado</SelectItem>
            <SelectItem value="servico_iniciado">Serviço Iniciado</SelectItem>
            <SelectItem value="servico_concluido">Serviço Concluído</SelectItem>
            <SelectItem value="pagamento_efetuado">Pagamento</SelectItem>
            <SelectItem value="checklist_respondido">Checklist</SelectItem>
            <SelectItem value="avaliacao_realizada">Avaliação</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {Object.entries(groupedEvents).map(([month, events]) => (
          <div key={month}>
            <h3 className="text-lg font-semibold text-slate-700 mb-4 capitalize">
              {month}
            </h3>
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id} className="relative overflow-hidden">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${getEventColor(event.type).split(' ')[0].replace('bg-', 'bg-').replace('100', '500')}`} />
                  <CardContent className="p-4 pl-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getEventColor(event.type)}`}>
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getEventColor(event.type)}>
                            {getEventLabel(event.type)}
                          </Badge>
                          <span className="text-sm text-slate-400">
                            {formatDate(event.date)}
                          </span>
                        </div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-slate-600 mt-1">{event.description}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                          <FileText className="w-3 h-3" />
                          <span>{event.contract.number}</span>
                          <span className="text-slate-300">•</span>
                          <span>{event.contract.title}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600">Nenhum evento encontrado</h3>
          <p className="text-slate-500">Ajuste os filtros para ver mais resultados</p>
        </div>
      )}
    </div>
  );
}
