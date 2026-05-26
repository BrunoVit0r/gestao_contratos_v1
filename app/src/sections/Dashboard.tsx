import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  DollarSign,
  Building2,
  User,
  LogOut,
  Bell,
  Plus,
  Star,
  ChevronRight,
  BarChart3,
  ClipboardCheck,
  History
} from 'lucide-react';
import { getDashboardStats, mockContracts, mockNotifications, mockPayments } from '@/data/mockData';
import { ContractList } from './ContractList';
import { ContractDetail } from './ContractDetail';
import { NewContract } from './NewContract';
import { Timeline } from './Timeline';
import { ScoreView } from './ScoreView';
import { PaymentView } from './PaymentView';
import { ChecklistView } from './ChecklistView';
import type { Contract } from '@/types';

export function Dashboard() {
  const { user, logout } = useAuth();
  const [activeView, setActiveView] = useState<'overview' | 'contracts' | 'contract-detail' | 'new-contract' | 'timeline' | 'scores' | 'payments' | 'checklists'>('overview');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [notifications, setNotifications] = useState(mockNotifications.filter(n => n.userId === user?.id));

  const stats = getDashboardStats(user?.type === 'prestador' ? 'prestador' : 'cliente');
  const userContracts = mockContracts.filter(c => 
    user?.type === 'cliente' ? c.clientId === user?.id : c.providerId === user?.id
  );
  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  const handleContractClick = (contract: Contract) => {
    setSelectedContract(contract);
    setActiveView('contract-detail');
  };

  const handleBack = () => {
    setActiveView('contracts');
    setSelectedContract(null);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

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

  const getStatusLabel = (status: string) => {
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

  // Renderiza a sidebar de navegação
  const renderSidebar = () => (
    <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">ContractFlow</h1>
            <p className="text-xs text-slate-400">Gestão de Contratos</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
            {user?.type === 'cliente' ? <User className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{user?.name}</p>
            <p className="text-xs text-slate-400 capitalize">{user?.type}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 ${activeView === 'overview' ? 'bg-slate-800' : ''}`}
          onClick={() => setActiveView('overview')}
        >
          <BarChart3 className="w-4 h-4" />
          Visão Geral
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 ${activeView === 'contracts' || activeView === 'contract-detail' ? 'bg-slate-800' : ''}`}
          onClick={() => setActiveView('contracts')}
        >
          <FileText className="w-4 h-4" />
          Contratos
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 ${activeView === 'timeline' ? 'bg-slate-800' : ''}`}
          onClick={() => setActiveView('timeline')}
        >
          <History className="w-4 h-4" />
          Timeline
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 ${activeView === 'payments' ? 'bg-slate-800' : ''}`}
          onClick={() => setActiveView('payments')}
        >
          <DollarSign className="w-4 h-4" />
          Pagamentos
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 ${activeView === 'checklists' ? 'bg-slate-800' : ''}`}
          onClick={() => setActiveView('checklists')}
        >
          <ClipboardCheck className="w-4 h-4" />
          Checklists
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 ${activeView === 'scores' ? 'bg-slate-800' : ''}`}
          onClick={() => setActiveView('scores')}
        >
          <Star className="w-4 h-4" />
          Score
        </Button>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Button variant="ghost" className="w-full justify-start gap-3 text-red-400" onClick={logout}>
          <LogOut className="w-4 h-4" />
          Sair
        </Button>
      </div>
    </div>
  );

  // Renderiza a visão geral
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total de Contratos</CardTitle>
            <FileText className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContracts}</div>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {stats.activeContracts} ativos
              </Badge>
              <Badge variant="outline" className="text-xs">
                {stats.pendingContracts} pendentes
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Valor Total</CardTitle>
            <DollarSign className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</div>
            <p className="text-xs text-slate-500 mt-2">
              Em contratos ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Seu Score</CardTitle>
            <Star className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{stats.averageScore}</span>
              <span className="text-slate-400">/5.0</span>
            </div>
            <Progress value={stats.averageScore * 20} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Pagamentos</CardTitle>
            <Bell className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingPayments}</div>
            <p className="text-xs text-slate-500 mt-2">
              {stats.overduePayments > 0 ? `${stats.overduePayments} em atraso` : 'Nenhum em atraso'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contratos Recentes */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Contratos Recentes</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setActiveView('contracts')}>
              Ver todos
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userContracts.slice(0, 3).map(contract => (
                <div 
                  key={contract.id} 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => handleContractClick(contract)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      contract.status === 'ativo' ? 'bg-green-500' : 
                      contract.status === 'pendente' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{contract.title}</p>
                      <p className="text-xs text-slate-500">{contract.number}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{formatCurrency(contract.value)}</p>
                    <Badge className={`text-xs ${getStatusColor(contract.status)}`}>
                      {getStatusLabel(contract.status)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notificações e Ações */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Notificações</CardTitle>
              {unreadNotifications > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadNotifications} nova{unreadNotifications > 1 ? 's' : ''}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.slice(0, 3).map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg text-sm ${notification.isRead ? 'bg-slate-50' : 'bg-blue-50'}`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-slate-500 text-xs mt-1">{notification.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {user?.type === 'prestador' && (
            <Button 
              className="w-full gap-2" 
              onClick={() => setActiveView('new-contract')}
            >
              <Plus className="w-4 h-4" />
              Novo Contrato
            </Button>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Próximos Vencimentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockPayments
                  .filter(p => p.status === 'pendente')
                  .slice(0, 2)
                  .map(payment => (
                    <div key={payment.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium">{payment.description}</p>
                        <p className="text-xs text-slate-500">{formatDate(payment.dueDate)}</p>
                      </div>
                      <span className="font-medium">{formatCurrency(payment.value)}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {renderSidebar()}
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">
              {activeView === 'overview' && 'Visão Geral'}
              {activeView === 'contracts' && 'Meus Contratos'}
              {activeView === 'contract-detail' && 'Detalhes do Contrato'}
              {activeView === 'new-contract' && 'Novo Contrato'}
              {activeView === 'timeline' && 'Linha do Tempo'}
              {activeView === 'scores' && 'Score e Avaliações'}
              {activeView === 'payments' && 'Pagamentos'}
              {activeView === 'checklists' && 'Checklists'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeView === 'overview' && renderOverview()}
          {activeView === 'contracts' && (
            <ContractList 
              contracts={userContracts} 
              onContractClick={handleContractClick}
              userType={user?.type || 'cliente'}
            />
          )}
          {activeView === 'contract-detail' && selectedContract && (
            <ContractDetail 
              contract={selectedContract} 
              onBack={handleBack}
              userType={user?.type || 'cliente'}
            />
          )}
          {activeView === 'new-contract' && (
            <NewContract onCancel={() => setActiveView('contracts')} />
          )}
          {activeView === 'timeline' && (
            <Timeline contracts={userContracts} userType={(user?.type === 'prestador' ? 'prestador' : 'cliente')} />
          )}
          {activeView === 'scores' && (
            <ScoreView userId={user?.id || ''} userType={(user?.type === 'prestador' ? 'prestador' : 'cliente')} />
          )}
          {activeView === 'payments' && (
            <PaymentView contracts={userContracts} userType={(user?.type === 'prestador' ? 'prestador' : 'cliente')} />
          )}
          {activeView === 'checklists' && (
            <ChecklistView contracts={userContracts} userType={(user?.type === 'prestador' ? 'prestador' : 'cliente')} />
          )}
        </main>
      </div>
    </div>
  );
}
