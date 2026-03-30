import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Database, Search, Cpu, Settings } from "lucide-react";

export default function WMICAvancado() {
  return (
    <PageContainer
      title="WMIC Avançado — Windows Management Instrumentation"
      subtitle="Domine o WMIC para consultas avançadas, automação de sistema, gerenciamento remoto e integração com scripts."
      difficulty="avancado"
      timeToRead="35 min"
    >
      <h2><Database className="inline-block mr-2 mb-1 w-5 h-5" /> Estrutura do WMIC</h2>
      <p>O <code>WMIC</code> oferece acesso ao WMI (Windows Management Instrumentation), que expõe praticamente todos os aspectos do sistema através de classes e propriedades consultáveis.</p>

      <AlertBox type="info" title="WMIC Depreciado no Windows 11">
        O WMIC está marcado como depreciado no Windows 11. A Microsoft recomenda usar <code>Get-CimInstance</code> do PowerShell. Os comandos ainda funcionam, mas considere migrar.
      </AlertBox>

      <h3>Sintaxe WMIC</h3>
      <CodeBlock language="batch" title="Estrutura básica e formatos de saída" code={`:: Sintaxe: wmic [alias] [where condição] [get propriedades] [/format]

:: Formatos de saída
wmic process get Name, ProcessId /format:table   :: Tabela formatada
wmic process get Name, ProcessId /format:csv     :: CSV
wmic process get Name, ProcessId /format:list    :: Lista (chave=valor)
wmic process get Name, ProcessId /format:xml     :: XML

:: WMIC interativo
wmic
:: WMIC> process list brief
:: WMIC> exit`} />

      <h2><Cpu className="inline-block mr-2 mb-1 w-5 h-5" /> Consultas Avançadas</h2>

      <h3>Processos</h3>
      <CodeBlock language="batch" title="Gerenciar processos com WMIC" code={`:: Listar processos com detalhes
wmic process get Name, ProcessId, WorkingSetSize, CommandLine

:: Filtrar por nome (WHERE)
wmic process where "Name='chrome.exe'" get ProcessId, WorkingSetSize

:: Matar processo pelo nome
wmic process where "Name='chrome.exe'" call terminate

:: Matar por PID
wmic process where "ProcessId=1234" call terminate

:: Criar processo
wmic process call create "notepad.exe C:\\arquivo.txt\"

:: Listar processos com consumo de memória > 100MB
wmic process where "WorkingSetSize > 104857600" get Name, ProcessId, WorkingSetSize /format:list

:: Listar processos de um usuário
wmic process where "SessionId=1" get Name, ProcessId`} />

      <h3>Serviços</h3>
      <CodeBlock language="batch" title="Gerenciar serviços com WMIC" code={`:: Listar serviços parados
wmic service where "State='Stopped'" get Name, DisplayName, StartMode

:: Iniciar serviço
wmic service where "Name='wuauserv'" call startservice

:: Parar serviço
wmic service where "Name='wuauserv'" call stopservice

:: Ver tipo de inicialização
wmic service where "Name='Spooler'" get StartMode

:: Alterar tipo de inicialização
wmic service where "Name='Spooler'" call changeStartMode \"Automatic\"

:: Listar serviços de terceiros (excluir Microsoft)
wmic service where "PathName like '%Program Files%'" get Name, PathName, State`} />

      <h2><Search className="inline-block mr-2 mb-1 w-5 h-5" /> Classes WMI Essenciais</h2>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-border">
          <thead><tr className="bg-muted">
            <th className="border border-border p-2 text-left">Classe/Alias</th>
            <th className="border border-border p-2 text-left">Descrição</th>
          </tr></thead>
          <tbody>
            {[
              ["Win32_Process / process","Processos em execução"],
              ["Win32_Service / service","Serviços do Windows"],
              ["Win32_LogicalDisk / logicaldisk","Discos lógicos (C:, D:)"],
              ["Win32_PhysicalMemory / memorychip","Informações de RAM física"],
              ["Win32_Processor / cpu","Processadores"],
              ["Win32_NetworkAdapter / nic","Adaptadores de rede"],
              ["Win32_NetworkAdapterConfiguration","Configurações de rede (IP, DNS)"],
              ["Win32_Product / product","Programas instalados (lento)"],
              ["Win32_UserAccount / useraccount","Contas de usuário"],
              ["Win32_Group","Grupos de usuário"],
              ["Win32_BIOS / bios","Informações do BIOS"],
              ["Win32_ComputerSystem / computersystem","Informações do computador"],
              ["Win32_OperatingSystem / os","Sistema operacional"],
              ["Win32_StartupCommand / startup","Programas na inicialização"],
              ["Win32_QuickFixEngineering / qfe","Hotfixes/Patches instalados"],
              ["Win32_Printer / printer","Impressoras instaladas"],
              ["Win32_DiskDrive / diskdrive","Discos físicos"],
            ].map(([cls, desc]) => (
              <tr key={cls}>
                <td className="border border-border p-2 font-mono text-primary text-xs">{cls}</td>
                <td className="border border-border p-2 text-sm">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> WMIC Remoto</h2>
      <CodeBlock language="batch" title="Executar WMIC em máquinas remotas" code={`:: Consulta remota básica
wmic /node:servidor-01 process get Name, ProcessId

:: Com credenciais
wmic /node:servidor-01 /user:admin /password:Senha@123 process get Name

:: Múltiplos nós simultaneamente
wmic /node:@lista-servidores.txt process where "Name='apache.exe'" get Name, ProcessId

:: Matar processo remotamente
wmic /node:servidor-01 process where "Name='processo.exe'" call terminate

:: Ver uptime de servidor remoto
wmic /node:servidor-01 os get LastBootUpTime

:: Reiniciar máquina remota
wmic /node:servidor-01 os call reboot`} />

      <h3>WMIC com Condições Complexas</h3>
      <CodeBlock language="batch" title="Queries avançadas com WHERE" code={`:: Processos consumindo mais de 500MB
wmic process where "WorkingSetSize > 524288000" get Name, ProcessId /format:table

:: Discos com menos de 20% livre
wmic logicaldisk where "DriveType=3 AND FreeSpace/Size*100 < 20" get DeviceID, FreeSpace, Size

:: Usuários habilitados
wmic useraccount where "Disabled=False AND LocalAccount=True" get Name, FullName

:: Programas instalados de fabricante específico
wmic product where "Vendor like '%Adobe%'" get Name, Version, InstallDate

:: Adaptadores de rede ativos com IP
wmic nicconfig where "IPEnabled=True" get Description, IPAddress, DefaultIPGateway, MACAddress`} />
    </PageContainer>
  );
}