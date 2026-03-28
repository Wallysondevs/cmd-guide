import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { History, Cpu, Layers, Terminal, Info } from "lucide-react";

export default function Historia() {
  return (
    <PageContainer 
      title="O que é o CMD? A História Completa" 
      subtitle="Entenda a origem, evolução e o papel atual do Prompt de Comando do Windows."
      difficulty="iniciante"
      timeToRead="15 min"
    >
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <History className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold m-0">Origem: Do MS-DOS ao Windows</h2>
        </div>
        <p>
          O Prompt de Comando (comumente chamado de <strong>CMD</strong>) é o interpretador de linha de comando padrão para sistemas operacionais baseados em Windows NT (incluindo Windows XP, 7, 8, 10 e 11). Sua árvore genealógica, no entanto, remonta ao início da computação pessoal.
        </p>
        <p>
          Em 1981, a Microsoft lançou o <strong>MS-DOS 1.0</strong> para o IBM PC. O interpretador de comandos era o famoso <code>COMMAND.COM</code>. Naquela época, a interface de linha de comando não era uma alternativa; era o sistema operacional em si. Tudo, desde a cópia de arquivos até o carregamento de programas, era feito digitando comandos.
        </p>
        
        <AlertBox type="info" title="Curiosidade Histórica">
          O MS-DOS foi baseado no QDOS (Quick and Dirty Operating System), comprado pela Microsoft da Seattle Computer Products para atender à demanda da IBM.
        </AlertBox>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Layers className="w-6 h-6 text-blue-400" />
          A Evolução: cmd.exe vs COMMAND.COM
        </h2>
        <p>
          Com o lançamento do Windows NT 3.1 em 1993, a Microsoft introduziu o <code>cmd.exe</code>. Embora parecesse idêntico ao <code>COMMAND.COM</code> do MS-DOS, ele era uma aplicação de 32 bits totalmente nova, construída do zero para ser estável e segura.
        </p>
        
        <div className="overflow-x-auto my-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-secondary/50">
                <th className="border border-border p-3 text-left">Característica</th>
                <th className="border border-border p-3 text-left">COMMAND.COM</th>
                <th className="border border-border p-3 text-left">cmd.exe</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-3 font-semibold">Arquitetura</td>
                <td className="border border-border p-3">16 bits (Real Mode)</td>
                <td className="border border-border p-3">32/64 bits (Protected Mode)</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-semibold">Limite de Memória</td>
                <td className="border border-border p-3">640 KB (Convenzional)</td>
                <td className="border border-border p-3">Virtualmente ilimitado</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-semibold">Nomes de Arquivo</td>
                <td className="border border-border p-3">8.3 caracteres</td>
                <td className="border border-border p-3">Nomes longos (LFN)</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-semibold">Ambiente</td>
                <td className="border border-border p-3">MS-DOS, Win 9x/Me</td>
                <td className="border border-border p-3">Windows NT, XP, 7, 10, 11</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">A Era Moderna (Windows 10 e 11)</h2>
        <p>
          Muitos previram a morte do CMD com a chegada do <strong>PowerShell</strong> em 2006. O PowerShell é muito mais potente, baseado no .NET Framework e orientado a objetos. No entanto, o CMD permaneceu por ser leve, extremamente compatível e "bom o suficiente" para 90% das tarefas rápidas.
        </p>
        <p>
          Recentemente, a Microsoft deu uma nova vida ao terminal com o <strong>Windows Terminal</strong>, que permite rodar abas do CMD, PowerShell e WSL (Windows Subsystem for Linux) em uma interface moderna com aceleração por GPU.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-green-400" />
          CMD vs PowerShell vs WSL
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="border border-border p-4 rounded-lg">
            <h4 className="font-bold text-primary">CMD (Command Prompt)</h4>
            <p className="text-sm">Ideal para: Scripts batch simples, diagnósticos básicos de rede, compatibilidade total com sistemas antigos. Linguagem procedural simples.</p>
          </div>
          <div className="border border-border p-4 rounded-lg">
            <h4 className="font-bold text-blue-400">PowerShell</h4>
            <p className="text-sm">Ideal para: Automação complexa, administração de servidores, integração com a nuvem (Azure/AWS). Baseado em objetos e .NET.</p>
          </div>
          <div className="border border-border p-4 rounded-lg">
            <h4 className="font-bold text-orange-400">WSL (Windows Subsystem for Linux)</h4>
            <p className="text-sm">Ideal para: Desenvolvedores web, uso de ferramentas Linux nativas (bash, grep, sed) dentro do Windows. É um kernel Linux real.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Casos de Uso Modernos</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Manutenção de Disco:</strong> Comandos como <code>chkdsk</code> e <code>sfc /scannow</code> são fundamentais.</li>
          <li><strong>Diagnóstico de Rede:</strong> <code>ipconfig</code> e <code>ping</code> continuam sendo os primeiros passos para qualquer problema de conexão.</li>
          <li><strong>Automação de Build:</strong> Muitos ambientes de desenvolvimento ainda utilizam arquivos <code>.bat</code> para tarefas de compilação.</li>
          <li><strong>Ambientes Restritos:</strong> Em servidores antigos ou WinPE (Windows Preinstallation Environment), o CMD é frequentemente a única ferramenta disponível.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Explorando Versões</h2>
        <p>
          Você pode verificar detalhes da versão do interpretador usando comandos simples. O CMD mantém variáveis internas para controlar extensões de comando.
        </p>
        <CodeBlock 
          code={`REM Mostra a versão do sistema operacional
ver

REM Verifica se as extensões de comando estão habilitadas
echo %CMDEXTVERSION%

REM Mostra o caminho do executável do CMD atual
echo %COMSPEC%`} 
          language="batch" 
          title="Verificando o Ambiente" 
        />
      </section>

      <AlertBox type="warning" title="Limitações do CMD">
        O CMD não lida bem com Unicode em versões muito antigas, não possui suporte nativo a JSON/XML como o PowerShell e sua linguagem de script (Batch) pode ser extremamente frustrante para lógica complexa devido à falta de estruturas de dados modernas.
      </AlertBox>

      <section className="mt-16 pt-8 border-t border-border">
        <h3 className="text-xl font-bold mb-4">Próximo Passo</h3>
        <Link href="/primeiros-passos">
          <a className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition-opacity">
            Começar Agora <Terminal className="w-5 h-5" />
          </a>
        </Link>
      </section>
    </PageContainer>
  );
}
