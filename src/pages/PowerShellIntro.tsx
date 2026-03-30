import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Terminal, Zap, ArrowRight, Code } from "lucide-react";

export default function PowerShellIntro() {
  return (
    <PageContainer
      title="Transição CMD para PowerShell"
      subtitle="Aprenda como comandos CMD equivalem ao PowerShell e quando e por que fazer a transição para scripts mais poderosos."
      difficulty="intermediario"
      timeToRead="30 min"
    >
      <h2><Terminal className="inline-block mr-2 mb-1 w-5 h-5" /> Por que Aprender PowerShell?</h2>
      <p>O PowerShell é o sucessor do CMD no Windows. Ele é orientado a objetos, tem acesso ao .NET Framework, integração nativa com Active Directory, Azure, Exchange e muito mais. Desde o Windows 7, o PowerShell vem instalado por padrão.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 border border-border rounded-lg">
          <h4 className="font-bold text-yellow-400 mb-2">CMD</h4>
          <ul className="text-sm space-y-1">
            <li>Trabalha com texto simples</li>
            <li>Sintaxe simples e direta</li>
            <li>Scripts .bat e .cmd</li>
            <li>Comandos limitados</li>
            <li>Ideal para tarefas básicas</li>
          </ul>
        </div>
        <div className="p-4 border border-border rounded-lg">
          <h4 className="font-bold text-blue-400 mb-2">PowerShell</h4>
          <ul className="text-sm space-y-1">
            <li>Trabalha com objetos .NET</li>
            <li>Sintaxe verbo-substantivo (Get-Process)</li>
            <li>Scripts .ps1</li>
            <li>Milhares de cmdlets</li>
            <li>Ideal para automação avançada</li>
          </ul>
        </div>
      </div>

      <h2><ArrowRight className="inline-block mr-2 mb-1 w-5 h-5" /> Equivalências CMD → PowerShell</h2>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-border">
          <thead><tr className="bg-muted">
            <th className="border border-border p-2 text-left">CMD</th>
            <th className="border border-border p-2 text-left">PowerShell</th>
            <th className="border border-border p-2 text-left">Função</th>
          </tr></thead>
          <tbody>
            {[
              ["dir","Get-ChildItem (ls, dir)","Listar arquivos"],
              ["cd","Set-Location (cd)","Mudar diretório"],
              ["copy","Copy-Item","Copiar arquivos"],
              ["move","Move-Item","Mover arquivos"],
              ["del","Remove-Item","Excluir arquivos"],
              ["mkdir","New-Item -ItemType Directory","Criar pasta"],
              ["type","Get-Content","Ver conteúdo de arquivo"],
              ["echo","Write-Output / Write-Host","Imprimir texto"],
              ["set","$variavel = valor","Definir variável"],
              ["findstr","Select-String","Buscar em texto"],
              ["tasklist","Get-Process","Listar processos"],
              ["taskkill","Stop-Process","Matar processo"],
              ["ipconfig","Get-NetIPConfiguration","Ver IP"],
              ["ping","Test-NetConnection","Testar conectividade"],
              ["netstat","Get-NetTCPConnection","Ver conexões TCP"],
              ["schtasks","Get-ScheduledTask","Tarefas agendadas"],
              ["net user","Get-LocalUser","Usuários locais"],
            ].map(([cmd, ps, fn]) => (
              <tr key={cmd}>
                <td className="border border-border p-2 font-mono text-yellow-400 text-sm">{cmd}</td>
                <td className="border border-border p-2 font-mono text-blue-400 text-sm">{ps}</td>
                <td className="border border-border p-2 text-sm">{fn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2><Zap className="inline-block mr-2 mb-1 w-5 h-5" /> PowerShell Básico para quem vem do CMD</h2>

      <h3>Variáveis e Pipeline</h3>
      <CodeBlock language="batch" title="Comparação: variáveis e pipes" code={`:: CMD: variavel
set nome=João
echo %nome%

:: PowerShell equivalente:
# $nome = "João\"
# Write-Host $nome

:: CMD: pipe de texto
dir | findstr ".txt\"

:: PowerShell: pipe de objetos (mais poderoso)
# Get-ChildItem | Where-Object { $_.Extension -eq ".txt" }`} />

      <h3>Executar PowerShell a partir do CMD</h3>
      <CodeBlock language="batch" title="Chamar PowerShell dentro de scripts .bat" code={`:: Executar comando PowerShell inline
powershell -Command "Get-Process | Where-Object {$_.CPU -gt 100}\"

:: Executar script .ps1
powershell -ExecutionPolicy Bypass -File C:\\Scripts\\meu-script.ps1

:: Passar variável do CMD para PowerShell
set PASTA=C:\\Dados
powershell -Command "Get-ChildItem '%PASTA%' | Measure-Object\"

:: Capturar saída do PowerShell no CMD
for /f %%a in ('powershell -Command "Get-Date -Format yyyy-MM-dd\"') do set DATA=%%a
echo Data atual: %DATA%`} />

      <h3>Scripts PowerShell Essenciais</h3>
      <CodeBlock language="batch" title="Exemplos práticos em PowerShell" code={`# Listar processos consumindo mais de 100MB de RAM
Get-Process | Where-Object {$_.WorkingSet -gt 100MB} | Sort-Object WorkingSet -Descending | Format-Table Name, @{N='RAM(MB)';E={[int]($_.WorkingSet/1MB)}}

# Verificar portas abertas
Get-NetTCPConnection -State Listen | Select-Object LocalPort, OwningProcess | Sort-Object LocalPort

# Criar usuário local
New-LocalUser -Name "joao\" -Password (ConvertTo-SecureString \"Senha@123\" -AsPlainText -Force) -FullName \"João Silva\"

# Listar serviços parados
Get-Service | Where-Object {$_.Status -eq "Stopped"} | Select-Object Name, DisplayName

# Buscar arquivos modificados hoje
Get-ChildItem C:\\Users -Recurse | Where-Object {$_.LastWriteTime.Date -eq (Get-Date).Date}`} />

      <h2><Code className="inline-block mr-2 mb-1 w-5 h-5" /> Abrir e Configurar o PowerShell</h2>
      <CodeBlock language="batch" title="Acessar PowerShell pelo CMD" code={`:: Abrir PowerShell normal
powershell

:: Abrir PowerShell como admin
:: (clique direito no CMD > Executar como admin, depois:)
powershell Start-Process powershell -Verb RunAs

:: Verificar versão
powershell -Command "$PSVersionTable.PSVersion\"

:: Verificar política de execução
powershell -Command "Get-ExecutionPolicy\"

:: Habilitar execução de scripts
powershell -Command "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser\"`} />

      <AlertBox type="success" title="Windows Terminal — A Evolução do CMD">
        O Windows Terminal (disponível pela Microsoft Store) combina CMD, PowerShell e WSL em abas, com suporte a cores, fontes e temas. É a interface recomendada para uso moderno. Instale via: winget install Microsoft.WindowsTerminal
      </AlertBox>
    </PageContainer>
  );
}