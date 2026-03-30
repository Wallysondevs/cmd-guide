import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  BookOpen, Terminal, HardDrive, Shield, Settings,
  FileText, Users, Network, Cpu, Clock, History,
  X, Code, FolderOpen, Key, Wrench, ChevronRight,
  ArrowRight, Filter, ToggleLeft, AlertTriangle, Server,
  Download, Globe, Lock, Activity, Database, Search,
  Layers, Package, Bug, Palette, Monitor, RefreshCcw,
  Building, Copy, Printer, Clipboard, Upload, Power,
  BarChart2, Calendar
} from "lucide-react";

const NAVIGATION = [
  {
    title: "Introdução",
    items: [
      { path: "/", label: "Início", icon: BookOpen },
      { path: "/historia", label: "O que é o CMD", icon: History },
      { path: "/primeiros-passos", label: "Primeiros Passos", icon: Terminal },
      { path: "/ref-rapida", label: "Referência Rápida", icon: Search },
    ]
  },
  {
    title: "Fundamentos",
    items: [
      { path: "/ajuda", label: "Obtendo Ajuda", icon: BookOpen },
      { path: "/variaveis", label: "Variáveis de Ambiente", icon: Code },
      { path: "/operadores", label: "Operadores e Lógica", icon: ToggleLeft },
      { path: "/caracteres", label: "Caracteres Especiais", icon: Code },
      { path: "/ambiente-path", label: "PATH Avançado", icon: Settings },
      { path: "/data-hora", label: "Data e Hora", icon: Calendar },
      { path: "/codificacao", label: "Codificação e Unicode", icon: Globe },
      { path: "/cor-formatacao", label: "Cores e Formatação", icon: Palette },
    ]
  },
  {
    title: "Sistema de Arquivos",
    items: [
      { path: "/navegacao", label: "Navegação", icon: FolderOpen },
      { path: "/arquivos", label: "Manipulação de Arquivos", icon: FileText },
      { path: "/conteudo", label: "Conteúdo de Arquivos", icon: FileText },
      { path: "/atributos", label: "Atributos e Permissões", icon: Shield },
      { path: "/links-simbolicos", label: "Links Simbólicos", icon: Layers },
      { path: "/robocopy", label: "ROBOCOPY Avançado", icon: Copy },
    ]
  },
  {
    title: "Entrada e Saída",
    items: [
      { path: "/redirecionamento", label: "Redirecionamento", icon: ArrowRight },
      { path: "/filtros", label: "Filtros de Texto", icon: Filter },
      { path: "/clipboard", label: "Clipboard e GUI", icon: Clipboard },
    ]
  },
  {
    title: "Scripting Batch",
    items: [
      { path: "/scripts", label: "Scripts .bat/.cmd", icon: Terminal },
      { path: "/fluxo-controle", label: "Controle de Fluxo", icon: Code },
      { path: "/loops", label: "Loops (FOR)", icon: Code },
      { path: "/strings", label: "Strings e Matemática", icon: FileText },
      { path: "/funcoes", label: "Funções e Sub-rotinas", icon: Code },
      { path: "/erros", label: "Tratamento de Erros", icon: AlertTriangle },
      { path: "/scripting-avancado", label: "Scripting Avançado", icon: Code },
      { path: "/depuracao", label: "Depuração de Scripts", icon: Bug },
      { path: "/producao-scripts", label: "Scripts para Produção", icon: Shield },
    ]
  },
  {
    title: "Administração do Sistema",
    items: [
      { path: "/processos", label: "Processos", icon: Cpu },
      { path: "/servicos", label: "Serviços", icon: Server },
      { path: "/usuarios", label: "Usuários e Grupos", icon: Users },
      { path: "/agendamento", label: "Agendamento Básico", icon: Clock },
      { path: "/tarefas-agendadas", label: "Tarefas Agendadas Avançado", icon: Calendar },
      { path: "/permissoes", label: "Permissões (icacls)", icon: Shield },
      { path: "/active-directory", label: "Active Directory", icon: Building },
      { path: "/grupos-politicas", label: "Políticas de Grupo", icon: Settings },
      { path: "/windows-update", label: "Windows Update", icon: RefreshCcw },
      { path: "/sistema-info", label: "Informações do Sistema", icon: Monitor },
    ]
  },
  {
    title: "Rede",
    items: [
      { path: "/rede", label: "Rede e Diagnóstico", icon: Network },
      { path: "/rede-avancada", label: "Rede Avançada (NETSH)", icon: Network },
      { path: "/compartilhamento-rede", label: "Compartilhamento de Rede", icon: Globe },
      { path: "/network-diag", label: "Diagnóstico Completo", icon: Activity },
      { path: "/ftp-transferencia", label: "FTP, SSH e BITS", icon: Upload },
    ]
  },
  {
    title: "Disco e Armazenamento",
    items: [
      { path: "/disco", label: "DISKPART, CHKDSK, FORMAT", icon: HardDrive },
      { path: "/sfc-dism", label: "SFC e DISM", icon: Wrench },
      { path: "/boot-recuperacao", label: "Boot e Recuperação", icon: Power },
    ]
  },
  {
    title: "Segurança",
    items: [
      { path: "/firewall", label: "Firewall e Segurança", icon: Shield },
      { path: "/certificados", label: "Certificados (CERTUTIL)", icon: Lock },
      { path: "/registro", label: "Registro do Windows", icon: Key },
    ]
  },
  {
    title: "Windows Avançado",
    items: [
      { path: "/wmic", label: "WMIC Básico", icon: HardDrive },
      { path: "/wmic-avancado", label: "WMIC Avançado", icon: Database },
      { path: "/eventos-logs", label: "Eventos e Logs", icon: FileText },
      { path: "/desempenho", label: "Monitoramento de Desempenho", icon: BarChart2 },
      { path: "/drivers", label: "Drivers (PNPUTIL)", icon: Cpu },
      { path: "/impressao", label: "Impressão", icon: Printer },
    ]
  },
  {
    title: "Programas e Pacotes",
    items: [
      { path: "/winget", label: "WINGET e Instaladores", icon: Package },
    ]
  },
  {
    title: "Virtualização e Linux",
    items: [
      { path: "/wsl", label: "WSL — Linux no Windows", icon: Terminal },
      { path: "/hyper-v", label: "Hyper-V", icon: Server },
    ]
  },
  {
    title: "Transição para PowerShell",
    items: [
      { path: "/powershell-intro", label: "CMD → PowerShell", icon: Code },
    ]
  },
  {
    title: "Extras",
    items: [
      { path: "/dicas", label: "Dicas e Truques", icon: Wrench },
      { path: "/referencias", label: "Referências", icon: BookOpen },
    ]
  }
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [location] = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed top-0 bottom-0 left-0 z-50 w-72 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <div className="flex items-center justify-between lg:justify-center mb-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Terminal className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold mt-0 mb-0 pb-0 border-0 leading-tight">CMD</h2>
                <p className="text-xs text-muted-foreground">Guia Completo</p>
              </div>
            </Link>
            <button className="lg:hidden p-2 text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-8">
            {NAVIGATION.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3 mt-0 border-0 pb-0">
                  {section.title}
                </h4>
                <ul className="space-y-1">
                  {section.items.map((item, i) => {
                    const isActive = location === item.path;
                    const Icon = item.icon;
                    return (
                      <li key={i}>
                        <Link
                          href={item.path}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "opacity-70")} />
                          {item.label}
                          {isActive && <ChevronRight className="w-3 h-3 ml-auto text-primary" />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
