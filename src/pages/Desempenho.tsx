import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Activity, Cpu, BarChart2, Clock } from "lucide-react";

export default function Desempenho() {
  return (
    <PageContainer
      title="Monitoramento de Desempenho"
      subtitle="Use TYPEPERF, PERFMON, RESMON e ferramentas nativas para medir CPU, memória, disco e rede em tempo real."
      difficulty="intermediario"
      timeToRead="25 min"
    >
      <h2><Activity className="inline-block mr-2 mb-1 w-5 h-5" /> TYPEPERF — Contadores de Desempenho</h2>
      <p>O <code>TYPEPERF</code> coleta dados de contadores de desempenho do Windows em tempo real ou em intervalos definidos — perfeito para logging e scripts de monitoramento.</p>

      <CodeBlock language="batch" title="Coletar métricas de desempenho" code={`:: Monitorar uso de CPU em tempo real (a cada 2s)
typeperf "\\Processor(_Total)\\% Processor Time\" -si 2

:: Monitorar uso de memória disponível (MB)
typeperf "\\Memory\\Available MBytes\" -si 5

:: Monitorar disco
typeperf "\\PhysicalDisk(_Total)\\% Disk Time\" -si 5

:: Monitorar rede (bytes/s enviados)
typeperf "\\Network Interface(*)\\Bytes Sent/sec\" -si 3

:: Gravar em CSV por 60 segundos (a cada 5s)
typeperf "\\Processor(_Total)\\% Processor Time\" \"\\Memory\\Available MBytes\" -si 5 -sc 12 -f CSV -o C:\\Logs\\performance.csv`} />

      <h3>Listar Contadores Disponíveis</h3>
      <CodeBlock language="batch" title="Descobrir contadores de desempenho" code={`:: Listar todos os contadores
typeperf -qx > C:\\contadores.txt

:: Listar contadores de CPU
typeperf -qx "\\Processor" > cpu-contadores.txt

:: Listar contadores de memória
typeperf -qx "\\Memory" > mem-contadores.txt

:: Ver contadores de uma instância específica
typeperf -qx "\\Process(*)\" | findstr \"chrome\"`} />

      <h2><Cpu className="inline-block mr-2 mb-1 w-5 h-5" /> SYSTEMINFO — Informações do Sistema</h2>
      <CodeBlock language="batch" title="Informações completas do sistema" code={`:: Ver todas as informações
systeminfo

:: Ver somente hotfixes instalados
systeminfo | findstr "Hotfix\"

:: Ver memória total e disponível
systeminfo | findstr /i "memory\"

:: Ver tempo de atividade (uptime)
systeminfo | findstr "Boot Time\"

:: Salvar para arquivo
systeminfo > C:\\Logs\\sysinfo.txt

:: Ver de máquina remota
systeminfo /s nome-do-servidor /u dominio\\admin /p senha`} />

      <h2><BarChart2 className="inline-block mr-2 mb-1 w-5 h-5" /> WMIC para Monitoramento</h2>
      <CodeBlock language="batch" title="Usar WMIC para coletar métricas" code={`:: Uso de CPU (% atual)
wmic cpu get loadpercentage

:: Memória física total
wmic computersystem get TotalPhysicalMemory

:: Memória disponível
wmic os get FreePhysicalMemory

:: Temperatura da CPU (se suportado)
wmic /namespace:\\root\\wmi PATH MSAcpi_ThermalZoneTemperature get CurrentTemperature

:: Velocidade de leitura do disco
wmic diskdrive get DeviceID,MediaType,Size,Status

:: Informações de rede
wmic nic where "NetEnabled=true" get Name,MACAddress,Speed`} />

      <h3>Script de Monitoramento Contínuo</h3>
      <CodeBlock language="batch" title="monitor.bat — Alerta quando CPU > 80%" code={`@echo off
:loop
:: Obter uso de CPU
for /f "skip=1 tokens=*\" %%a in ('wmic cpu get loadpercentage') do (
    set CPU=%%a
    goto :check
)
:check
if defined CPU (
    if %CPU% GTR 80 (
        echo [%time%] ALERTA: CPU em %CPU%%
        echo %date% %time% - CPU: %CPU%% >> C:\\Logs\\cpu-alertas.txt
    ) else (
        echo [%time%] CPU normal: %CPU%%
    )
)
timeout /t 10 /nobreak >nul
goto :loop`} />

      <h2><Clock className="inline-block mr-2 mb-1 w-5 h-5" /> Ferramentas de Interface Gráfica pelo CMD</h2>
      <CodeBlock language="batch" title="Abrir ferramentas de desempenho" code={`:: Monitor de Recursos (avançado)
resmon

:: Monitor de Desempenho com contadores
perfmon

:: Gerenciador de Tarefas
taskmgr

:: Diagnóstico de memória do Windows
mdsched

:: Informações do sistema (GUI)
msinfo32`} />

      <AlertBox type="info" title="Dica: LOGMAN para Coleta Avançada">
        O <code>LOGMAN</code> cria e gerencia sessões de coleta de dados de desempenho (Data Collector Sets):
        <CodeBlock language="batch" title="Criar coleta agendada com LOGMAN" code={`:: Criar coletor de dados
logman create counter "MonitoramentoTI\" -c \"\\Processor(*)\\% Processor Time\" \"\\Memory\\Available MBytes\" -si 30 -f csv -o C:\\Logs\\monitor.csv

:: Iniciar coleta
logman start "MonitoramentoTI\"

:: Parar coleta
logman stop "MonitoramentoTI\"

:: Excluir
logman delete "MonitoramentoTI\"`} />
      </AlertBox>
    </PageContainer>
  );
}