import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, User, Shield, FileText, CheckCircle, TrendingUp, Clock } from 'lucide-react';

export function Login() {
  const { login, switchUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const success = await login(email, password);
    if (!success) {
      setError('Email ou senha incorretos');
    }
    
    setIsLoading(false);
  };

  const handleQuickLogin = (type: 'cliente' | 'prestador' | 'admin') => {
    switchUser(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* Lado Esquerdo - Login */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4">
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">ContractFlow</h1>
            <p className="text-slate-500 mt-2">Gestão inteligente de contratos</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="demo">Demonstração</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Acessar Plataforma</CardTitle>
                  <CardDescription>
                    Entre com suas credenciais para continuar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    {error && (
                      <p className="text-sm text-red-500">{error}</p>
                    )}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Entrando...' : 'Entrar'}
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-slate-500 text-center mb-4">
                      Credenciais de demonstração:
                    </p>
                    <div className="space-y-2 text-sm text-slate-600">
                      <p><strong>Cliente:</strong> cliente@email.com</p>
                      <p><strong>Prestador:</strong> prestador@email.com</p>
                      <p><strong>Admin:</strong> admin@email.com</p>
                      <p className="text-center text-slate-400">(qualquer senha funciona)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="demo">
              <Card>
                <CardHeader>
                  <CardTitle>Acesso Rápido</CardTitle>
                  <CardDescription>
                    Clique para acessar como diferentes tipos de usuário
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3 h-auto py-4"
                    onClick={() => handleQuickLogin('cliente')}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Acessar como Cliente</p>
                      <p className="text-sm text-slate-500">Visualize contratos e acompanhe serviços</p>
                    </div>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3 h-auto py-4"
                    onClick={() => handleQuickLogin('prestador')}
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Acessar como Prestador</p>
                      <p className="text-sm text-slate-500">Gerencie serviços e receba avaliações</p>
                    </div>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-3 h-auto py-4"
                    onClick={() => handleQuickLogin('admin')}
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Acessar como Administrador</p>
                      <p className="text-sm text-slate-500">Visão geral da plataforma</p>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Lado Direito - Features */}
      <div className="hidden lg:flex flex-1 bg-slate-900 text-white p-12 flex-col justify-center">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold mb-6">
            Gerencie seus contratos de forma inteligente
          </h2>
          <p className="text-slate-400 text-lg mb-12">
            Uma plataforma completa para conectar empresas e clientes, 
            com monitoramento em tempo real, avaliações e muito mais.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Contratos Digitais</h3>
                <p className="text-sm text-slate-400">Gere e gerencie contratos automaticamente</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Checklists</h3>
                <p className="text-sm text-slate-400">Avalie serviços com checklists detalhados</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Score</h3>
                <p className="text-sm text-slate-400">Sistema de pontuação para ambas as partes</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Timeline</h3>
                <p className="text-sm text-slate-400">Acompanhe todo o histórico do contrato</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
