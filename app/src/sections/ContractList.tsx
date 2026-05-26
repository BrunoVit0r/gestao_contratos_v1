import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, FileText, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import type { Contract, ContractStatus, UserType } from '@/types';

interface ContractListProps {
  contracts: Contract[];
  onContractClick: (contract: Contract) => void;
  userType: UserType;
}

export function ContractList({ contracts, onContractClick, userType }: ContractListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ContractStatus | 'all'>('all');

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = 
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (userType === 'cliente' ? contract.provider.companyName : contract.client.companyName)?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const getStatusColor = (status: ContractStatus) => {
    const colors: Record<string, string> = {
      'ativo': 'bg-green-100 text-green-800 border-green-200',
      'pendente': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'concluido': 'bg-blue-100 text-blue-800 border-blue-200',
      'cancelado': 'bg-red-100 text-red-800 border-red-200',
      'rascunho': 'bg-gray-100 text-gray-800 border-gray-200',
      'pausado': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: ContractStatus) => {
    const labels: Record<string, string> = {
      'ativo': 'Ativo',
      'pendente': 'Pendente',
      'concluido': 'Concluído',
      'cancelado': 'Cancelado',
      'rascunho': 'Rascunho',
      'pausado': 'Pausado'
    };
    return labels[status] || status;
  };

  const getProgressPercentage = (contract: Contract) => {
    if (contract.status === 'concluido') return 100;
    if (contract.status === 'cancelado') return 0;
    if (contract.status === 'rascunho') return 0;
    
    const start = new Date(contract.startDate).getTime();
    const end = new Date(contract.endDate).getTime();
    const now = new Date().getTime();
    
    if (now >= end) return 100;
    if (now <= start) return 0;
    
    return Math.round(((now - start) / (end - start)) * 100);
  };

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Buscar contratos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ContractStatus | 'all')}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="concluido">Concluído</SelectItem>
            <SelectItem value="cancelado">Cancelado</SelectItem>
            <SelectItem value="pausado">Pausado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Contratos */}
      <div className="grid gap-4">
        {filteredContracts.map(contract => (
          <Card 
            key={contract.id} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onContractClick(contract)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Informações Principais */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <span className="text-sm text-slate-500">{contract.number}</span>
                    <Badge variant="outline" className={getStatusColor(contract.status)}>
                      {getStatusLabel(contract.status)}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{contract.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-1">{contract.description}</p>
                  
                  {/* Progresso */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Progresso</span>
                      <span>{getProgressPercentage(contract)}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${getProgressPercentage(contract)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Detalhes */}
                <div className="flex flex-wrap lg:flex-col gap-4 lg:gap-2 lg:text-right">
                  <div className="flex items-center gap-2 lg:justify-end">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold">{formatCurrency(contract.value)}</span>
                  </div>
                  <div className="flex items-center gap-2 lg:justify-end">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-500">
                      {formatDate(contract.startDate)} - {formatDate(contract.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 lg:justify-end">
                    <span className="text-sm text-slate-500">
                      {userType === 'cliente' ? 'Prestador: ' : 'Cliente: '}
                    </span>
                    <span className="text-sm font-medium">
                      {userType === 'cliente' ? contract.provider.companyName : contract.client.companyName}
                    </span>
                  </div>
                </div>

                {/* Ação */}
                <div className="hidden lg:block">
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContracts.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600">Nenhum contrato encontrado</h3>
          <p className="text-slate-500">Tente ajustar os filtros de busca</p>
        </div>
      )}
    </div>
  );
}
