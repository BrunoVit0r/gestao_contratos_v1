import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  CheckCircle,
  Target
} from 'lucide-react';
import { mockScores, mockContracts } from '@/data/mockData';
import type { UserType } from '@/types';

interface ScoreViewProps {
  userId: string;
  userType: UserType;
}

export function ScoreView({ userId }: ScoreViewProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const scoreData = mockScores.find(s => s.userId === userId) || {
    userId,
    overallScore: 5.0,
    totalEvaluations: 0,
    breakdown: [],
    history: []
  };

  const userContracts = mockContracts.filter(c => 
    c.clientId === userId || c.providerId === userId
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 4.0) return 'text-blue-600';
    if (score >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 4.5) return 'bg-green-100';
    if (score >= 4.0) return 'bg-blue-100';
    if (score >= 3.0) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 4.5) return 'Excelente';
    if (score >= 4.0) return 'Muito Bom';
    if (score >= 3.0) return 'Bom';
    if (score >= 2.0) return 'Regular';
    return 'Precisa Melhorar';
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="breakdown">Detalhamento</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        {/* Visão Geral */}
        <TabsContent value="overview" className="space-y-6">
          {/* Score Principal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 mb-2">Sua Pontuação Geral</p>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-6xl font-bold ${getScoreColor(scoreData.overallScore)}`}>
                        {scoreData.overallScore.toFixed(1)}
                      </span>
                      <span className="text-2xl text-slate-400">/5.0</span>
                    </div>
                    <Badge className={`mt-4 ${getScoreBgColor(scoreData.overallScore)} ${getScoreColor(scoreData.overallScore)}`}>
                      {getScoreLabel(scoreData.overallScore)}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full border-8 border-slate-100 flex items-center justify-center relative">
                      <svg className="w-full h-full transform -rotate-90 absolute">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-primary"
                          strokeDasharray={`${(scoreData.overallScore / 5) * 351.86} 351.86`}
                        />
                      </svg>
                      <div className="text-center">
                        <Award className="w-8 h-8 text-primary mx-auto mb-1" />
                        <span className="text-xs text-slate-500">Top 10%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{scoreData.totalEvaluations}</p>
                    <p className="text-sm text-slate-500">Avaliações</p>
                  </div>
                  <div className="text-center border-x">
                    <p className="text-2xl font-bold">{userContracts.length}</p>
                    <p className="text-sm text-slate-500">Contratos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">
                      {userContracts.filter(c => c.status === 'concluido').length}
                    </p>
                    <p className="text-sm text-slate-500">Concluídos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Últimas Avaliações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scoreData.history.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{item.score}</span>
                        </div>
                        <p className="text-xs text-slate-500">{item.reason}</p>
                      </div>
                      <span className="text-xs text-slate-400">{formatDate(item.date)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparativo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Comparativo com a Plataforma</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Sua pontuação</span>
                    <span className="font-medium">{scoreData.overallScore.toFixed(1)}</span>
                  </div>
                  <Progress value={scoreData.overallScore * 20} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Média da plataforma</span>
                    <span className="font-medium">4.2</span>
                  </div>
                  <Progress value={84} className="h-3 bg-slate-100" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Top performers</span>
                    <span className="font-medium">4.8</span>
                  </div>
                  <Progress value={96} className="h-3 bg-slate-100" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Detalhamento */}
        <TabsContent value="breakdown" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scoreData.breakdown.map((category, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">{category.category}</h3>
                    <Badge variant="outline">Peso: {category.weight * 100}%</Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getScoreBgColor(category.score / category.maxScore * 5)}`}>
                      <span className={`text-xl font-bold ${getScoreColor(category.score / category.maxScore * 5)}`}>
                        {category.score.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso</span>
                        <span>{(category.score / category.maxScore * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={(category.score / category.maxScore) * 100} className="h-2" />
                    </div>
                  </div>

                  <p className="text-sm text-slate-500">
                    {category.score >= 4.5 
                      ? 'Desempenho excelente nesta categoria!' 
                      : category.score >= 4.0 
                        ? 'Bom desempenho, há espaço para melhorias.' 
                        : 'Atenção necessária nesta categoria.'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dicas de Melhoria */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="w-5 h-5" />
                Dicas para Melhorar seu Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">Mantenha a pontualidade</p>
                    <p className="text-sm text-green-600">Cumprimento de prazos é um dos fatores mais importantes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800">Comunique-se bem</p>
                    <p className="text-sm text-blue-600">Mantenha o cliente informado sobre o andamento</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-purple-800">Qualidade acima de tudo</p>
                    <p className="text-sm text-purple-600">Entregue serviços com alta qualidade</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Responda checklists</p>
                    <p className="text-sm text-yellow-600">Participe ativamente das avaliações</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Histórico */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Histórico de Avaliações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scoreData.history.map((item, idx) => {
                  const contract = mockContracts.find(c => c.id === item.contractId);
                  return (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getScoreBgColor(item.score)}`}>
                          <Star className={`w-5 h-5 ${getScoreColor(item.score)}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.score.toFixed(1)}</span>
                            <span className="text-slate-400">/5.0</span>
                          </div>
                          <p className="text-sm text-slate-500">{item.reason}</p>
                          {contract && (
                            <p className="text-xs text-slate-400 mt-1">
                              {contract.number} - {contract.title}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500">{formatDate(item.date)}</p>
                        {item.score >= scoreData.overallScore ? (
                          <div className="flex items-center gap-1 text-green-600 text-xs">
                            <TrendingUp className="w-3 h-3" />
                            <span>Acima da média</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-yellow-600 text-xs">
                            <TrendingDown className="w-3 h-3" />
                            <span>Abaixo da média</span>
                          </div>
                        )}
                      </div>
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
