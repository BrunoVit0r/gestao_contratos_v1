import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Filter,
  Download
} from 'lucide-react';
import { mockPayments } from '@/data/mockData';
import type { Contract, PaymentStatus } from '@/types';

interface PaymentViewProps {
  contracts: Contract[];
  userType: 'cliente' | 'prestador';
}

export function PaymentView({ contracts }: PaymentViewProps) {
  const [selectedContract, setSelectedContract] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'all'>('all');

  const allPayments = contracts.flatMap(contract => 
    mockPayments
      .filter(payment => payment.contractId === contract.id)
      .map(payment => ({ ...payment, contract }))
  );

  const filteredPayments = allPayments.filter(payment => {
    const matchesContract = selectedContract === 'all' || payment.contractId === selectedContract;
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesContract && matchesStatus;
  });

  const totalPaid = allPayments.filter(p => p.status === 'pago').reduce((sum, p) => sum + p.value, 0);
  const totalPending = allPayments.filter(p => p.status === 'pendente').reduce((sum, p) => sum + p.value, 0);
  const totalOverdue = allPayments.filter(p => p.status === 'atrasado').reduce((sum, p) => sum + p.value, 0);
  const totalValue = allPayments.reduce((sum, p) => sum + p.value, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const getStatusColor = (status: PaymentStatus) => {
    const colors: Record<string, string> = {
      'pendente': 'bg-yellow-100 text-yellow-800',
      'agendado': 'bg-blue-100 text-blue-800',
      'pago': 'bg-green-100 text-green-800',
      'atrasado': 'bg-red-100 text-red-800',
      'cancelado': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: PaymentStatus) => {
    const icons: Record<string, React.ReactNode> = {
      'pendente': <Clock className="w-4 h-4" />,
      'agendado': <Calendar className="w-4 h-4" />,
      'pago': <CheckCircle className="w-4 h-4" />,
      'atrasado': <AlertCircle className="w-4 h-4" />,
      'cancelado': <DollarSign className="w-4 h-4" />
    };
    return icons[status] || <DollarSign className="w-4 h-4" />;
  };

  const isOverdue = (dueDate: Date) => {
    return new Date() > dueDate;
  };

  return (
    <div className="space-y-6">
      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total em Contratos</CardTitle>
            <DollarSign className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
            <p className="text-xs text-slate-500 mt-1">
              {allPayments.length} pagamentos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Pago</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</div>
            <p className="text-xs text-slate-500 mt-1">
              {((totalPaid / totalValue) * 100).toFixed(0)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Pendente</CardTitle>
            <Clock className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{formatCurrency(totalPending)}</div>
            <p className="text-xs text-slate-500 mt-1">
              {allPayments.filter(p => p.status === 'pendente').length} pagamentos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Em Atraso</CardTitle>
            <AlertCircle className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalOverdue)}</div>
            <p className="text-xs text-slate-500 mt-1">
              {allPayments.filter(p => p.status === 'atrasado').length} pagamentos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progresso de Pagamento */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Progresso de Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Pago</span>
                <span className="font-medium">{formatCurrency(totalPaid)}</span>
              </div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${(totalPaid / totalValue) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Pendente</span>
                <span className="font-medium">{formatCurrency(totalPending)}</span>
              </div>
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 transition-all"
                  style={{ width: `${(totalPending / totalValue) * 100}%` }}
                />
              </div>
            </div>
            {totalOverdue > 0 && (
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Atrasado</span>
                  <span className="font-medium">{formatCurrency(totalOverdue)}</span>
                </div>
                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500 transition-all"
                    style={{ width: `${(totalOverdue / totalValue) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

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

        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as PaymentStatus | 'all')}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pago">Pago</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="atrasado">Atrasado</SelectItem>
            <SelectItem value="agendado">Agendado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Pagamentos */}
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Lista</TabsTrigger>
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Pagamentos ({filteredPayments.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredPayments.map(payment => {
                  const overdue = payment.status === 'pendente' && isOverdue(payment.dueDate);
                  
                  return (
                    <div 
                      key={payment.id} 
                      className={`flex items-center justify-between p-4 border rounded-lg ${
                        overdue ? 'border-red-300 bg-red-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(payment.status)}`}>
                          {getStatusIcon(payment.status)}
                        </div>
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-sm text-slate-500">
                            {payment.contract.number} - {payment.contract.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span className="text-xs text-slate-500">
                              Vencimento: {formatDate(payment.dueDate)}
                            </span>
                            {overdue && (
                              <Badge variant="destructive" className="text-xs">
                                Atrasado
                              </Badge>
                            )}
                          </div>
                          {payment.paymentDate && (
                            <p className="text-xs text-green-600 mt-1">
                              Pago em: {formatDate(payment.paymentDate)}
                              {payment.method && ` via ${payment.method}`}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{formatCurrency(payment.value)}</p>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                        {payment.proofOfPayment && (
                          <Button variant="ghost" size="sm" className="mt-2 gap-1">
                            <Download className="w-3 h-3" />
                            Comprovante
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Próximos Vencimentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-slate-500 py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const date = new Date();
                  date.setDate(1);
                  date.setDate(date.getDate() - date.getDay() + i);
                  
                  const dayPayments = filteredPayments.filter(p => {
                    const dueDate = new Date(p.dueDate);
                    return dueDate.toDateString() === date.toDateString();
                  });
                  
                  const hasOverdue = dayPayments.some(p => p.status === 'atrasado');
                  const hasPending = dayPayments.some(p => p.status === 'pendente');
                  const hasPaid = dayPayments.some(p => p.status === 'pago');
                  
                  return (
                    <div 
                      key={i} 
                      className={`min-h-[80px] p-2 border rounded-lg ${
                        date.getMonth() !== new Date().getMonth() ? 'bg-slate-50' : ''
                      } ${dayPayments.length > 0 ? 'border-primary' : ''}`}
                    >
                      <span className={`text-sm ${
                        date.toDateString() === new Date().toDateString() ? 'font-bold text-primary' : ''
                      }`}>
                        {date.getDate()}
                      </span>
                      {dayPayments.length > 0 && (
                        <div className="mt-1 space-y-1">
                          {hasPaid && <div className="w-full h-1 bg-green-500 rounded" />}
                          {hasPending && <div className="w-full h-1 bg-yellow-500 rounded" />}
                          {hasOverdue && <div className="w-full h-1 bg-red-500 rounded" />}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
