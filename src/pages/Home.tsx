import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Terminal, 
  BookOpen, 
  Files, 
  ArrowRightLeft, 
  FileCode, 
  ShieldCheck, 
  Globe, 
  ChevronRight,
  Cpu,
  Zap
} from "lucide-react";

export default function Home() {
  const categories = [
    {
      title: "Fundamentos",
      icon: <Terminal className="w-6 h-6 text-blue-400" />,
      description: "A base indispensável para dominar o Prompt de Comando.",
      links: [
        { name: "História e Evolução", href: "/historia" },
        { name: "Primeiros Passos", href: "/primeiros-passos" },
        { name: "Sistema de Ajuda", href: "/ajuda" },
        { name: "Variáveis de Ambiente", href: "/variaveis" },
      ],
    },
    {
      title: "Sistema de Arquivos",
      icon: <Files className="w-6 h-6 text-green-400" />,
      description: "Navegação, manipulação e atributos de arquivos e pastas.",
      links: [
        { name: "Navegação (CD, DIR)", href: "/navegacao" },
        { name: "Gerenciar Arquivos", href: "/arquivos" },
        { name: "Conteúdo de Arquivos", href: "/conteudo" },
        { name: "Atributos (ATTRIB)", href: "/atributos" },
      ],
    },
    {
      title: "Entrada e Saída",
      icon: <ArrowRightLeft className="w-6 h-6 text-yellow-400" />,
      description: "Redirecionamento de fluxos e filtros de texto avançados.",
      links: [
        { name: "Redirecionamento", href: "/redirecionamento" },
        { name: "Filtros e Pipes", href: "/filtros" },
      ],
    },
    {
      title: "Scripting Batch",
      icon: <FileCode className="w-6 h-6 text-purple-400" />,
      description: "Automatização de tarefas complexas com scripts .bat e .cmd.",
      links: [
        { name: "Introdução a Scripts", href: "/scripts" },
        { name: "Fluxo de Controle", href: "/fluxo-controle" },
        { name: "Loops (FOR)", href: "/loops" },
        { name: "Manipulação de Strings", href: "/strings" },
        { name: "Funções e Rótulos", href: "/funcoes" },
        { name: "Tratamento de Erros", href: "/erros" },
      ],
    },
    {
      title: "Administração",
      icon: <ShieldCheck className="w-6 h-6 text-red-400" />,
      description: "Gerenciamento de processos, usuários e segurança do Windows.",
      links: [
        { name: "Processos", href: "/processos" },
        { name: "Serviços", href: "/servicos" },
        { name: "Usuários e Grupos", href: "/usuarios" },
        { name: "Agendamento", href: "/agendamento" },
        { name: "Permissões (ICACLS)", href: "/permissoes" },
      ],
    },
    {
      title: "Rede e Avançado",
      icon: <Globe className="w-6 h-6 text-cyan-400" />,
      description: "Configuração de rede, Registro e ferramentas administrativas.",
      links: [
        { name: "Comandos de Rede", href: "/rede" },
        { name: "Registro do Windows", href: "/registro" },
        { name: "WMI (WMIC)", href: "/wmic" },
      ],
    },
  ];

  return (
    <PageContainer 
      title="Guia Definitivo do CMD" 
      subtitle="Domine o Prompt de Comando do Windows, do básico ao avançado."
      difficulty="iniciante"
      timeToRead="5 min"
    >
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-primary" />
          Por que aprender o CMD em 2024?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground">
          <div className="bg-secondary/20 p-6 rounded-xl border border-border/50">
            <h3 className="text-foreground font-semibold mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" /> Rapidez e Eficiência
            </h3>
            <p>
              Muitas tarefas administrativas que levam dezenas de cliques na interface gráfica 
              podem ser resolvidas com uma única linha de comando. Automatizar essas tarefas 
              economiza horas de trabalho manual.
            </p>
          </div>
          <div className="bg-secondary/20 p-6 rounded-xl border border-border/50">
            <h3 className="text-foreground font-semibold mb-2 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-500" /> Compatibilidade Legada
            </h3>
            <p>
              O CMD está presente em praticamente todas as instalações do Windows desde o NT. 
              Scripts escritos há 20 anos muitas vezes ainda funcionam perfeitamente hoje, 
              garantindo portabilidade em ambientes corporativos.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Explore por Categoria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                {category.icon}
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {category.description}
              </p>
              <ul className="space-y-2">
                {category.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link href={link.href}>
                      <a className="text-sm text-primary hover:underline flex items-center justify-between group">
                        {link.name}
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Como usar este guia</h2>
        <p className="text-muted-foreground mb-4">
          Este guia foi estruturado para ser tanto um curso sequencial quanto uma referência rápida. 
          Se você é novo no terminal, comece pelos <strong>Fundamentos</strong>. Se já possui experiência, 
          mergulhe diretamente nas seções de <strong>Scripting Batch</strong> ou <strong>Administração</strong>.
        </p>
        <AlertBox type="info" title="Dica de Navegação">
          Você pode usar a barra lateral para navegar entre as seções ou clicar nos cards acima para explorar temas específicos.
        </AlertBox>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 uppercase tracking-wider">Experimente Agora</h2>
        <p className="text-muted-foreground mb-6">
          Abra o seu CMD (Win + R, digite `cmd` e Enter) e tente executar o comando abaixo para ver informações rápidas sobre seu sistema:
        </p>
        <CodeBlock 
          code={`@echo off
echo ========================================
echo INFORMAÇÕES DO SISTEMA
echo ========================================
echo Usuario Atual: %USERNAME%
echo Data: %DATE% - Hora: %TIME%
echo Versao do Windows:
ver
echo ========================================
pause`} 
          language="batch" 
          title="Meu primeiro script informativo" 
        />
        <p className="text-sm text-muted-foreground italic text-center mt-4">
          "O terminal não morde. Ele apenas obedece."
        </p>
      </section>
    </PageContainer>
  );
}
