import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Cpu, HardDrive, Activity, Info } from "lucide-react";

export default function SistemaInfo() {
  return (
    <PageContainer
      title="Informações do Sistema"
      subtitle="Extraia detalhes completos de hardware, software, BIOS e configurações do sistema com SYSTEMINFO, WMIC e MSInfo32."
      difficulty="iniciante"
      timeToRead="22 min"
    >
      <h2><Info className="inline-block mr-2 mb-1 w-5 h-5" /> SYSTEMINFO — Visão Geral do Sistema</h2>
      <p>O comando <code>SYSTEMINFO</code> exibe informações detalhadas sobre hardware e sistema operacional.</p>

      <CodeBlock language="batch" title="Usar o SYSTEMINFO" code={`:: Todas as informações
systeminfo

:: Formatos de saída alternativos
systeminfo /fo table     :: Tabela formatada
systeminfo /fo csv       :: CSV (para análise)
systeminfo /fo list      :: Lista (padrão)

:: Salvar para arquivo
systeminfo > C:\\Logs\\sysinfo.txt

:: Consultar máquina remota
systeminfo /s ComputadorRemoto /u dominio\\admin

:: Filtrar informações específicas
systeminfo | findstr /i "os name"
systeminfo | findstr /i "total physical memory"
systeminfo | findstr /i "boot time"
systeminfo | findstr /i "domain"
systeminfo | findstr /i "hotfix\"`} />

      <h2><Cpu className="inline-block mr-2 mb-1 w-5 h-5" /> WMIC para Hardware Detalhado</h2>

      <h3>CPU</h3>
      <CodeBlock language="batch" title="Informações da CPU" code={`:: Nome e modelo da CPU
wmic cpu get Name

:: Número de núcleos e threads
wmic cpu get NumberOfCores, NumberOfLogicalProcessors

:: Velocidade do processador
wmic cpu get MaxClockSpeed, CurrentClockSpeed

:: Informações completas da CPU
wmic cpu get Name, NumberOfCores, NumberOfLogicalProcessors, MaxClockSpeed, L2CacheSize, L3CacheSize /format:list

:: Via PowerShell (mais limpo)
powershell -Command "Get-CimInstance Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors, MaxClockSpeed\"`} />

      <h3>Memória RAM</h3>
      <CodeBlock language="batch" title="Informações de memória" code={`:: RAM total
wmic computersystem get TotalPhysicalMemory

:: Memória disponível (KB)
wmic os get FreePhysicalMemory

:: Detalhes de cada pente de RAM
wmic memorychip get Capacity, Speed, Manufacturer, PartNumber, BankLabel

:: Em GB mais legível
powershell -Command "Get-CimInstance Win32_PhysicalMemory | Select-Object BankLabel, @{N='GB';E={[math]::Round($_.Capacity/1GB,1)}}, Speed, Manufacturer\"`} />

      <h3>Disco e Armazenamento</h3>
      <CodeBlock language="batch" title="Informações de disco" code={`:: Listar discos físicos
wmic diskdrive get Model, Size, MediaType, SerialNumber

:: Volumes lógicos
wmic logicaldisk get DeviceID, Size, FreeSpace, FileSystem, VolumeName

:: Em GB mais legível
powershell -Command "Get-CimInstance Win32_LogicalDisk | Select-Object DeviceID, @{N='Total(GB)';E={[math]::Round($_.Size/1GB,1)}}, @{N='Free(GB)';E={[math]::Round($_.FreeSpace/1GB,1)}}, FileSystem\"

:: Velocidade de disco
winsat disk -drive c`} />

      <h3>Placa-Mãe e BIOS</h3>
      <CodeBlock language="batch" title="Informações de motherboard e BIOS" code={`:: Versão do BIOS/UEFI
wmic bios get Manufacturer, Name, Version, ReleaseDate

:: Placa-mãe
wmic baseboard get Manufacturer, Model, Product, SerialNumber

:: Número de série do computador
wmic bios get SerialNumber

:: Modelo do computador (notebook/desktop)
wmic computersystem get Manufacturer, Model, SystemType

:: Verificar se é VM
wmic computersystem get Model | findstr /i "virtual vmware hyper\"`} />

      <h2><Activity className="inline-block mr-2 mb-1 w-5 h-5" /> MSInfo32 — Interface Gráfica</h2>
      <CodeBlock language="batch" title="Abrir e exportar MSInfo32" code={`:: Abrir Informações do Sistema (GUI)
msinfo32

:: Exportar para arquivo de texto
msinfo32 /report C:\\Logs\\msinfo.txt

:: Exportar em formato NFO (nativo)
msinfo32 /nfo C:\\Logs\\msinfo.nfo

:: Abrir categoria específica
msinfo32 /categories "Hardware Resources"
msinfo32 /categories "Components,Network\"`} />

      <h3>Script: Relatório Completo do Sistema</h3>
      <CodeBlock language="batch" title="relatorio-sistema.bat" code={`@echo off
set DATA=%date:~6,4%%date:~3,2%%date:~0,2%
set SAIDA=C:\\Relatorios\\sistema-%DATA%.txt

echo Gerando relatorio do sistema...
echo.

echo ===== INFORMACOES DO SISTEMA ===== > %SAIDA%
echo Data: %date% Hora: %time% >> %SAIDA%
echo. >> %SAIDA%

echo [SISTEMA OPERACIONAL] >> %SAIDA%
wmic os get Caption, Version, OSArchitecture /format:list >> %SAIDA%

echo [COMPUTADOR] >> %SAIDA%
wmic computersystem get Manufacturer, Model /format:list >> %SAIDA%

echo [CPU] >> %SAIDA%
wmic cpu get Name, NumberOfCores, MaxClockSpeed /format:list >> %SAIDA%

echo [MEMORIA] >> %SAIDA%
wmic computersystem get TotalPhysicalMemory /format:list >> %SAIDA%

echo [DISCOS] >> %SAIDA%
wmic logicaldisk get DeviceID, Size, FreeSpace, FileSystem /format:list >> %SAIDA%

echo [HOTFIXES RECENTES] >> %SAIDA%
wmic qfe get HotFixID, InstalledOn /format:list >> %SAIDA%

echo Relatorio salvo em: %SAIDA%
start notepad %SAIDA%`} />

      <AlertBox type="info" title="Dica: Comparar Sistemas">
        Gere o relatório em múltiplos computadores e compare os arquivos com <code>fc relatorio-pc1.txt relatorio-pc2.txt</code> para identificar diferenças de hardware ou software.
      </AlertBox>
    </PageContainer>
  );
}