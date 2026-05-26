import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  ClipboardCheck, 
  CheckCircle, 
  Clock, 
  Star,
  Filter,
  Send,
  MessageSquare
} from 'lucide-react';
import { mockChecklists } from '@/data/mockData';
import type { Contract, Checklist, UserType } from '@/types';

interface ChecklistViewProps {
  contracts: Contract[];
  userType: UserType;
}

export function ChecklistView({ contracts, userType }: ChecklistViewProps) {
  const [selectedContract, setSelectedContract] = useState<string>('all');
  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(null);
  const [responses, setResponses] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState('');

  const allChecklists = contracts.flatMap(contract => 
    mockChecklists
      .filter(checklist => checklist.contractId === contract.id)
      .map(checklist => ({ ...checklist, contract }))
  );

  const filteredChecklists = allChecklists.filter(checklist => {
    const matchesContract = selectedContract === 'all' || checklist.contractId === selectedContract;
    return matchesContract;
  });

  const pendingChecklists = filteredChecklists.filter(c => 
    userType === 'cliente' ? !c.isCompleted && c.createdFor === '1' : !c.isCompleted && c.createdBy === '1'
  );
  const completedChecklists = filteredChecklists.filter(c => c.isCompleted);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const handleResponseChange = (itemId: string, checked: boolean) => {
    setResponses(prev => ({ ...prev, [itemId]: checked }));
  };

  const handleSubmitChecklist = () => {
    setSelectedChecklist(null);
    setResponses({});
    setFeedback('');
  };

  const calculateScore = () => {
    if (!selectedChecklist) return 0;
    const totalItems = selectedChecklist.items.length;
    const completedItems = Object.values(responses).filter(Boolean).length;
    return (completedItems / totalItems) * 5;
  };

  return (
    <div className="space-y-6">
      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total</CardTitle>
            <ClipboardCheck className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredChecklists.length}</div>
            <p className="text-xs text-slate-500 mt-1">checklists</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Pendentes</CardTitle>
            <Clock className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingChecklists.length}</div>
            <p className="text-xs text-slate-500 mt-1">para responder</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Respondidos</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedChecklists.length}</div>
            <p className="text-xs text-slate-500 mt-1">completos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Média</CardTitle>
            <Star className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedChecklists.length > 0 
                ? (completedChecklists.reduce((sum, c) => sum + (c.score || 0), 0) / completedChecklists.length).toFixed(1)
                : '0.0'}
            </div>
            <p className="text-xs text-slate-500 mt-1">avaliação média</p>
          </CardContent>
        </Card>
      </div>

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

        {userType === 'prestador' && (
          <Button className="gap-2">
            <Send className="w-4 h-4" />
            Enviar Novo Checklist
          </Button>
        )}
      </div>

      {/* Checklists Pendentes */}
      {pendingChecklists.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Checklists Pendentes</h3>
          <div className="grid gap-4">
            {pendingChecklists.map(checklist => (
              <Card key={checklist.id} className="border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium">{checklist.title}</p>
                        <p className="text-sm text-slate-500">
                          {checklist.contract.number} - {checklist.contract.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Enviado em: {formatDate(checklist.createdAt)}
                        </p>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => setSelectedChecklist(checklist)}>
                          Responder
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{checklist.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <p className="text-sm text-slate-500">
                            Contrato: {checklist.contract.number} - {checklist.contract.title}
                          </p>
                          
                          <div className="space-y-3">
                            {checklist.items.map(item => (
                              <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg">
                                <Checkbox
                                  checked={responses[item.id] || false}
                                  onCheckedChange={(checked) => 
                                    handleResponseChange(item.id, checked as boolean)
                                  }
                                />
                                <label className="text-sm flex-1 cursor-pointer">
                                  {item.description}
                                </label>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Feedback (opcional)</label>
                            <Textarea
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                              placeholder="Deixe seu comentário sobre o serviço..."
                              rows={3}
                            />
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t">
                            <div>
                              <p className="text-sm text-slate-500">Pontuação estimada</p>
                              <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                <span className="text-xl font-bold">{calculateScore().toFixed(1)}</span>
                                <span className="text-slate-400">/5.0</span>
                              </div>
                            </div>
                            <Button onClick={handleSubmitChecklist} className="gap-2">
                              <Send className="w-4 h-4" />
                              Enviar Avaliação
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Checklists Respondidos */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Checklists Respondidos</h3>
        <div className="grid gap-4">
          {completedChecklists.map(checklist => (
            <Card key={checklist.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{checklist.title}</p>
                      <p className="text-sm text-slate-500">
                        {checklist.contract.number} - {checklist.contract.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Respondido em: {formatDate(checklist.completedAt!)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {checklist.score && (
                      <div className="flex items-center gap-1 justify-end">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="text-xl font-bold">{checklist.score}</span>
                        <span className="text-slate-400">/5.0</span>
                      </div>
                    )}
                    <Badge variant="outline" className="mt-1">
                      Concluído
                    </Badge>
                  </div>
                </div>

                {checklist.feedback && (
                  <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-medium">Feedback</span>
                    </div>
                    <p className="text-sm text-slate-600">{checklist.feedback}</p>
                  </div>
                )}

                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Itens verificados:</p>
                  <div className="space-y-1">
                    {checklist.items.map(item => (
                      <div key={item.id} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className={item.isCompleted ? 'text-slate-700' : 'text-slate-400 line-through'}>
                          {item.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {completedChecklists.length === 0 && pendingChecklists.length === 0 && (
          <div className="text-center py-12">
            <ClipboardCheck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600">Nenhum checklist encontrado</h3>
            <p className="text-slate-500">Ajuste os filtros para ver mais resultados</p>
          </div>
        )}
      </div>
    </div>
  );
}
