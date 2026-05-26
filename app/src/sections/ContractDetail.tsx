import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  User, 
  Building2, 
  CheckCircle,
  DollarSign, 
  Download,
  Star,
  CheckSquare
} from 'lucide-react';
import { mockServices, mockPayments, mockChecklists, mockTimeline } from '@/data/mockData';
import type { Contract, UserType } from '@/types';

interface ContractDetailProps {
  contract: Contract;
  onBack: () => void;
  userType: UserType;
}

export function ContractDetail({ contract, onBack, userType }: ContractDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const services = mockServices.filter(s => s.contractId === contract.id);
  const payments = mockPayments.filter(p => p.contractId === contract.id);
  const checklists = mockChecklists.filter(c => c.contractId === contract.id);
  const timeline = mockTimeline.filter(t => t.contractId === contract.id);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'ativo': 'bg-green-100 text-green-800',
      'pendente': 'bg-yellow-100 text-yellow-800',
      'concluido': 'bg-blue-100 text-blue-800',
      'cancelado': 'bg-red-100 text-red-800',
      'rascunho': 'bg-gray-100 text-gray-800',
      'pausado': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getServiceStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pendente': 'bg-gray-100 text-gray-800',
      'em_andamento': 'bg-blue-100 text-blue-800',
      'concluido': 'bg-green-100 text-green-800',
      'aprovado': 'bg-purple-100 text-purple-800',
      'reprovado': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pendente': 'bg-yellow-100 text-yellow-800',
      'agendado': 'bg-blue-100 text-blue-800',
      'pago': 'bg-green-100 text-green-800',
      'atrasado': 'bg-red-100 text-red-800',
      'cancelado': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const completedServices = services.filter(s => s.status === 'concluido' || s.status === 'aprovado').length;
  const totalServices = services.length;
  const progressPercentage = totalServices > 0 ? (completedServices / totalServices) * 100 : 0;

  const totalPaid = payments.filter(p => p.status === 'pago').reduce((sum, p) => sum + p.value, 0);
  const totalPending = payments.filter(p => p.status === 'pendente').reduce((sum, p) => sum + p.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{contract.title}</h1>
            <Badge className={getStatusColor(contract.status)}>
              {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
            </Badge>
          </div>
          <p className="text-slate-500">{contract.number}</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="checklists">Checklists</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        {/* Visão Geral */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Informações do Contrato */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Informações do Contrato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Valor Total</p>
                    <p className="text-xl font-semibold">{formatCurrency(contract.value)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Período</p>
                    <p className="font-medium">{formatDate(contract.startDate)} - {formatDate(contract.endDate)}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500 mb-2">Descrição</p>
                  <p className="text-sm">{contract.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Cliente</p>
                      <p className="font-medium">{contract.client.companyName}</p>
                      <p className="text-xs text-slate-400">{contract.client.document}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Prestador</p>
                      <p className="font-medium">{contract.provider.companyName}</p>
                      <p className="text-xs text-slate-400">{contract.provider.document}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resumo */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Progresso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold">{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="mb-2" />
                  <p className="text-sm text-slate-500 text-center">
                    {completedServices} de {totalServices} serviços concluídos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Pagamentos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Pago</span>
                    <span className="font-medium text-green-600">{formatCurrency(totalPaid)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">Pendente</span>
                    <span className="font-medium text-yellow-600">{formatCurrency(totalPending)}</span>
                  </div>
                  <div className="pt-2 border-t flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">{formatCurrency(contract.value)}</span>
                  </div>
                </CardContent>
              </Card>

              {(contract.scoreClient || contract.scoreProvider) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Avaliações</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {contract.scoreClient && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Cliente</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{contract.scoreClient}</span>
                        </div>
                      </div>
                    )}
                    {contract.scoreProvider && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Prestador</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{contract.scoreProvider}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Dados do Preenchimento Automático */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Detalhes do Serviço</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-slate-500">Tipo de Serviço</p>
                <p className="font-medium">{contract.autoFillData.serviceType}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Prazo de Entrega</p>
                <p className="font-medium">{contract.autoFillData.deliveryDeadline} dias</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Condições de Pagamento</p>
                <p className="font-medium">{contract.autoFillData.paymentTerms}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Garantia</p>
                <p className="font-medium">{contract.autoFillData.warrantyPeriod} dias</p>
              </div>
              {contract.autoFillData.penaltiesDescription && (
                <div className="md:col-span-2">
                  <p className="text-sm text-slate-500">Penalidades</p>
                  <p className="font-medium">{contract.autoFillData.penaltiesDescription}</p>
                </div>
              )}
              {contract.autoFillData.specialClauses && (
                <div className="md:col-span-2">
                  <p className="text-sm text-slate-500">Cláusulas Especiais</p>
                  <p className="font-medium">{contract.autoFillData.specialClauses}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Serviços */}
        <TabsContent value="services">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Serviços ({services.length})</CardTitle>
              {userType === 'prestador' && contract.status === 'ativo' && (
                <Button size="sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Adicionar Serviço
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {services.map(service => (
                  <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        service.status === 'concluido' ? 'bg-green-500' :
                        service.status === 'em_andamento' ? 'bg-blue-500' :
                        service.status === 'aprovado' ? 'bg-purple-500' :
                        'bg-gray-300'
                      }`} />
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-slate-500">{service.description}</p>
                        {service.observations && (
                          <p className="text-xs text-slate-400 mt-1">{service.observations}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getServiceStatusColor(service.status)}>
                        {service.status.replace('_', ' ')}
                      </Badge>
                      <p className="text-sm font-medium mt-1">{formatCurrency(service.value)}</p>
                      {service.expectedDate && (
                        <p className="text-xs text-slate-500">
                          {service.completionDate ? 
                            `Concluído: ${formatDate(service.completionDate)}` :
                            `Previsto: ${formatDate(service.expectedDate)}`
                          }
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pagamentos */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Pagamentos ({payments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {payments.map(payment => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        payment.status === 'pago' ? 'bg-green-100' :
                        payment.status === 'atrasado' ? 'bg-red-100' :
                        'bg-yellow-100'
                      }`}>
                        <DollarSign className={`w-5 h-5 ${
                          payment.status === 'pago' ? 'text-green-600' :
                          payment.status === 'atrasado' ? 'text-red-600' :
                          'text-yellow-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium">{payment.description}</p>
                        <p className="text-sm text-slate-500">
                          Vencimento: {formatDate(payment.dueDate)}
                        </p>
                        {payment.paymentDate && (
                          <p className="text-xs text-green-600">
                            Pago em: {formatDate(payment.paymentDate)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(payment.value)}</p>
                      <Badge className={getPaymentStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Checklists */}
        <TabsContent value="checklists">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Checklists ({checklists.length})</CardTitle>
              {userType === 'prestador' && contract.status === 'ativo' && (
                <Button size="sm">
                  <CheckSquare className="w-4 h-4 mr-2" />
                  Enviar Checklist
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {checklists.map(checklist => (
                  <div key={checklist.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium">{checklist.title}</p>
                        <p className="text-sm text-slate-500">
                          Criado em: {formatDate(checklist.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        {checklist.score && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{checklist.score}</span>
                          </div>
                        )}
                        <Badge className={checklist.isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {checklist.isCompleted ? 'Respondido' : 'Pendente'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {checklist.items.map(item => (
                        <div key={item.id} className="flex items-center gap-2 text-sm">
                          {item.isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <div className="w-4 h-4 border-2 border-slate-300 rounded" />
                          )}
                          <span className={item.isCompleted ? 'text-slate-700' : 'text-slate-400'}>
                            {item.description}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {checklist.feedback && (
                      <div className="mt-3 p-3 bg-slate-50 rounded">
                        <p className="text-sm text-slate-600">
                          <strong>Feedback:</strong> {checklist.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline */}
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((event, index) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      {index < timeline.length - 1 && (
                        <div className="w-0.5 flex-1 bg-slate-200 my-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{event.title}</span>
                        <span className="text-xs text-slate-400">{formatDate(event.date)}</span>
                      </div>
                      <p className="text-sm text-slate-600">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
