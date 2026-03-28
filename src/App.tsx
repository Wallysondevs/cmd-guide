import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

import Home from "@/pages/Home";
import Historia from "@/pages/Historia";
import PrimeirosPassos from "@/pages/PrimeirosPassos";
import Ajuda from "@/pages/Ajuda";
import Variaveis from "@/pages/Variaveis";
import Operadores from "@/pages/Operadores";
import Caracteres from "@/pages/Caracteres";
import Navegacao from "@/pages/Navegacao";
import Arquivos from "@/pages/Arquivos";
import Conteudo from "@/pages/Conteudo";
import Atributos from "@/pages/Atributos";
import Redirecionamento from "@/pages/Redirecionamento";
import Filtros from "@/pages/Filtros";
import Scripts from "@/pages/Scripts";
import FluxoControle from "@/pages/FluxoControle";
import Loops from "@/pages/Loops";
import Strings from "@/pages/Strings";
import Funcoes from "@/pages/Funcoes";
import Erros from "@/pages/Erros";
import Processos from "@/pages/Processos";
import Servicos from "@/pages/Servicos";
import Usuarios from "@/pages/Usuarios";
import Agendamento from "@/pages/Agendamento";
import Permissoes from "@/pages/Permissoes";
import Rede from "@/pages/Rede";
import Registro from "@/pages/Registro";
import Wmic from "@/pages/Wmic";
import Dicas from "@/pages/Dicas";
import Referencias from "@/pages/Referencias";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [location] = useHashLocation();
  useEffect(() => {
    setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 transition-all duration-300">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/historia" component={Historia} />
        <Route path="/primeiros-passos" component={PrimeirosPassos} />
        <Route path="/ajuda" component={Ajuda} />
        <Route path="/variaveis" component={Variaveis} />
        <Route path="/operadores" component={Operadores} />
        <Route path="/caracteres" component={Caracteres} />
        <Route path="/navegacao" component={Navegacao} />
        <Route path="/arquivos" component={Arquivos} />
        <Route path="/conteudo" component={Conteudo} />
        <Route path="/atributos" component={Atributos} />
        <Route path="/redirecionamento" component={Redirecionamento} />
        <Route path="/filtros" component={Filtros} />
        <Route path="/scripts" component={Scripts} />
        <Route path="/fluxo-controle" component={FluxoControle} />
        <Route path="/loops" component={Loops} />
        <Route path="/strings" component={Strings} />
        <Route path="/funcoes" component={Funcoes} />
        <Route path="/erros" component={Erros} />
        <Route path="/processos" component={Processos} />
        <Route path="/servicos" component={Servicos} />
        <Route path="/usuarios" component={Usuarios} />
        <Route path="/agendamento" component={Agendamento} />
        <Route path="/permissoes" component={Permissoes} />
        <Route path="/rede" component={Rede} />
        <Route path="/registro" component={Registro} />
        <Route path="/wmic" component={Wmic} />
        <Route path="/dicas" component={Dicas} />
        <Route path="/referencias" component={Referencias} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <WouterRouter hook={useHashLocation}>
          <Router />
        </WouterRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
