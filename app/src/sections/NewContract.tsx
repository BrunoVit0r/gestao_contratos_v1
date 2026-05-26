import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  FileText, 
  Wand2,
  Copy,
  Sparkles
} from 'lucide-react';
import { mockTemplates } from '@/data/mockData';
import type { ContractTemplate, AutoFillData } from '@/types';

interface NewContractProps {
  onCancel: () => void;
}

export function NewContract({ onCancel }: NewContractProps) {
  const [step, setStep] = useState<'template' | 'form' | 'review'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    clientEmail: '',
    value: '',
    startDate: '',
    endDate: '',
    ...mockTemplates[0].autoFillData
  });

  const [autoFillData, setAutoFillData] = useState<AutoFillData>({
    serviceType: '',
    serviceDetails: '',
    deliveryDeadline: 30,
    paymentTerms: '',
    warrantyPeriod: 90,
    penaltiesDescription: '',
    specialClauses: ''
  });

  const handleTemplateSelect = (template: ContractTemplate) => {
    setSelectedTemplate(template);
    setAutoFillData(prev => ({
      ...prev,
      serviceType: template.serviceType,
      ...template.autoFillData
    }));
    setFormData(prev => ({
      ...prev,
      title: template.name,
      ...template.autoFillData
    }));
    setStep('form');
  };

  const handleAutoFill = () => {
    if (!selectedTemplate) return;
    
    setAutoFillData({
      serviceType: selectedTemplate.serviceType,
      serviceDetails: `Serviço de ${selectedTemplate.serviceType.toLowerCase()} conforme especificações técnicas acordadas entre as partes.`,
      deliveryDeadline: selectedTemplate.autoFillData.deliveryDeadline || 30,
      paymentTerms: selectedTemplate.autoFillData.paymentTerms || '30 dias após a entrega',
      warrantyPeriod: selectedTemplate.autoFillData.warrantyPeriod || 90,
      penaltiesDescription: 'Multa de 2% ao mês em caso de atraso no cumprimento das obrigações.',
      specialClauses: 'As partes comprometem-se a manter sigilo sobre informações confidenciais.'
    });
  };

  const formatCurrency = (value: string) => {
    const numeric = value.replace(/\D/g, '');
    const number = parseInt(numeric) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(number || 0);
  };

  const handleSubmit = () => {
    setStep('review');
  };

  const handleFinalize = () => {
    onCancel();
  };

  if (step === 'template') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Novo Contrato</h1>
            <p className="text-slate-500">Escolha um template para começar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockTemplates.map(template => (
            <Card 
              key={template.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleTemplateSelect(template)}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 mb-4">{template.description}</p>
                <div className="space-y-2">
                  <p className="text-xs text-slate-400">Cláusulas incluídas:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.defaultClauses.slice(0, 2).map((clause, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {clause.substring(0, 30)}...
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'form') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setStep('template')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Preencher Contrato</h1>
            <p className="text-slate-500">Template: {selectedTemplate?.name}</p>
          </div>
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
            <TabsTrigger value="autofill">Preenchimento Automático</TabsTrigger>
            <TabsTrigger value="clauses">Cláusulas</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Dados do Contrato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Contrato</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Ex: Serviços de Consultoria"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client">Email do Cliente</Label>
                    <Input
                      id="client"
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      placeholder="cliente@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva o objetivo do contrato..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="value">Valor Total</Label>
                    <Input
                      id="value"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: formatCurrency(e.target.value) })}
                      placeholder="R$ 0,00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data de Início</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Data de Término</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="autofill" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Dados Automáticos</CardTitle>
                <Button variant="outline" size="sm" onClick={handleAutoFill} className="gap-2">
                  <Wand2 className="w-4 h-4" />
                  Preencher Automaticamente
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Tipo de Serviço</Label>
                    <Input
                      id="serviceType"
                      value={autoFillData.serviceType}
                      onChange={(e) => setAutoFillData({ ...autoFillData, serviceType: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliveryDeadline">Prazo de Entrega (dias)</Label>
                    <Input
                      id="deliveryDeadline"
                      type="number"
                      value={autoFillData.deliveryDeadline}
                      onChange={(e) => setAutoFillData({ ...autoFillData, deliveryDeadline: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceDetails">Detalhes do Serviço</Label>
                  <Textarea
                    id="serviceDetails"
                    value={autoFillData.serviceDetails}
                    onChange={(e) => setAutoFillData({ ...autoFillData, serviceDetails: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentTerms">Condições de Pagamento</Label>
                    <Input
                      id="paymentTerms"
                      value={autoFillData.paymentTerms}
                      onChange={(e) => setAutoFillData({ ...autoFillData, paymentTerms: e.target.value })}
                      placeholder="Ex: 30 dias após entrega"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="warrantyPeriod">Período de Garantia (dias)</Label>
                    <Input
                      id="warrantyPeriod"
                      type="number"
                      value={autoFillData.warrantyPeriod}
                      onChange={(e) => setAutoFillData({ ...autoFillData, warrantyPeriod: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="penalties">Penalidades</Label>
                  <Textarea
                    id="penalties"
                    value={autoFillData.penaltiesDescription}
                    onChange={(e) => setAutoFillData({ ...autoFillData, penaltiesDescription: e.target.value })}
                    placeholder="Descreva as penalidades em caso de descumprimento..."
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialClauses">Cláusulas Especiais</Label>
                  <Textarea
                    id="specialClauses"
                    value={autoFillData.specialClauses}
                    onChange={(e) => setAutoFillData({ ...autoFillData, specialClauses: e.target.value })}
                    placeholder="Quaisquer cláusulas adicionais..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clauses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cláusulas do Contrato</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedTemplate?.defaultClauses.map((clause, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm flex-shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-sm">{clause}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setStep('template')}>
            Voltar
          </Button>
          <Button onClick={handleSubmit}>
            Revisar Contrato
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'review') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setStep('form')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Revisar Contrato</h1>
            <p className="text-slate-500">Verifique todos os detalhes antes de enviar</p>
          </div>
        </div>

        <Card className="border-2">
          <CardHeader className="border-b bg-slate-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">CONTRATO DE PRESTAÇÃO DE SERVIÇOS</p>
                <h2 className="text-xl font-bold">{formData.title}</h2>
              </div>
              <Badge variant="outline">Rascunho</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-slate-500 mb-1">CONTRATANTE (Cliente)</p>
                <p className="font-medium">{formData.clientEmail || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">CONTRATADO (Prestador)</p>
                <p className="font-medium">Sua Empresa</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-slate-500 mb-2">OBJETO DO CONTRATO</p>
              <p className="text-sm leading-relaxed">{formData.description || 'Não informado'}</p>
            </div>

            <div className="border-t pt-4 grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">VALOR TOTAL</p>
                <p className="font-semibold text-lg">{formData.value || 'R$ 0,00'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">PERÍODO</p>
                <p className="font-medium">
                  {formData.startDate ? new Date(formData.startDate).toLocaleDateString('pt-BR') : '-'} 
                  {' '}a{' '}
                  {formData.endDate ? new Date(formData.endDate).toLocaleDateString('pt-BR') : '-'}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">PRAZO DE ENTREGA</p>
                <p className="font-medium">{autoFillData.deliveryDeadline} dias</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-slate-500 mb-2">ESPECIFICAÇÕES</p>
              <div className="space-y-2 text-sm">
                <p><strong>Tipo:</strong> {autoFillData.serviceType}</p>
                <p><strong>Detalhes:</strong> {autoFillData.serviceDetails}</p>
                <p><strong>Pagamento:</strong> {autoFillData.paymentTerms}</p>
                <p><strong>Garantia:</strong> {autoFillData.warrantyPeriod} dias</p>
              </div>
            </div>

            {autoFillData.penaltiesDescription && (
              <div className="border-t pt-4">
                <p className="text-sm text-slate-500 mb-2">PENALIDADES</p>
                <p className="text-sm">{autoFillData.penaltiesDescription}</p>
              </div>
            )}

            {autoFillData.specialClauses && (
              <div className="border-t pt-4">
                <p className="text-sm text-slate-500 mb-2">CLÁUSULAS ESPECIAIS</p>
                <p className="text-sm">{autoFillData.specialClauses}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setStep('form')}>
            Editar
          </Button>
          <Button variant="outline" className="gap-2">
            <Copy className="w-4 h-4" />
            Salvar Rascunho
          </Button>
          <Button onClick={handleFinalize} className="gap-2">
            <Sparkles className="w-4 h-4" />
            Enviar para Assinatura
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
