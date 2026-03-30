import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { RefreshCcw, Download, Shield, Settings } from "lucide-react";

export default function WindowsUpdate() {
  return (
    <PageContainer
      title="Windows Update pelo CMD"
      subtitle="Verifique, instale e gerencie atualizações do Windows diretamente pelo Prompt de Comando e PowerShell."
      difficulty="intermediario"
      timeToRead="22 min"
    >
      <h2><RefreshCcw className="inline-block mr-2 mb-1 w-5 h-5" /> Gerenciar Windows Update pelo CMD</h2>
      <AlertBox type="info" title="Windows Update via PowerShell">
        O módulo PSWindowsUpdate facilita muito o gerenciamento de atualizações pelo terminal. É a forma mais robusta e recomendada.
      </AlertBox>

      <h3>Usando WUAUCLT (Windows 7/8/10 antigos)</h3>
      <CodeBlock language="batch" title="Forçar verificação de atualizações" code={`:: Forçar verificação de updates (Windows 7-10 antigo)
wuauclt /detectnow

:: Baixar e instalar atualizações disponíveis
wuauclt /updatenow

:: Reportar ao WSUS (servidores corporativos)
wuauclt /reportnow`} />

      <h3>USOCLIENT — Windows 10/11 Moderno</h3>
      <CodeBlock language="batch" title="Gerenciar atualizações com USOCLIENT (requer admin)" code={`:: Iniciar scan de atualizações
UsoClient StartScan

:: Baixar atualizações encontradas
UsoClient StartDownload

:: Instalar atualizações baixadas
UsoClient StartInstall

:: Checar e instalar tudo
UsoClient ScanInstallWait

:: Reiniciar para aplicar atualizações
UsoClient RestartDevice`} />

      <h2><Download className="inline-block mr-2 mb-1 w-5 h-5" /> PSWindowsUpdate — Módulo PowerShell</h2>
      <CodeBlock language="batch" title="Instalar e usar PSWindowsUpdate" code={`:: Instalar módulo (requer internet)
powershell -Command "Install-Module -Name PSWindowsUpdate -Force -Confirm:$false\"

:: Verificar atualizações disponíveis
powershell -Command "Get-WindowsUpdate\"

:: Instalar todas as atualizações
powershell -Command "Install-WindowsUpdate -AcceptAll -AutoReboot\"

:: Instalar sem reiniciar
powershell -Command "Install-WindowsUpdate -AcceptAll -IgnoreReboot\"

:: Instalar somente updates de segurança
powershell -Command "Install-WindowsUpdate -AcceptAll -Category 'Security Updates'\"

:: Ver histórico de atualizações
powershell -Command "Get-WUHistory | Select-Object -First 20 | Format-Table Date, Title, Result\"

:: Baixar sem instalar
powershell -Command "Get-WindowsUpdate -Download\"`} />

      <h2><Shield className="inline-block mr-2 mb-1 w-5 h-5" /> Gerenciar Atualizações Instaladas</h2>
      <CodeBlock language="batch" title="Ver e desinstalar atualizações" code={`:: Listar hotfixes instalados (WMIC)
wmic qfe list brief

:: Listar com data e KB
wmic qfe get HotFixID, InstalledOn, Description | sort

:: Buscar hotfix específico
wmic qfe | findstr "KB5018506\"

:: Listar via PowerShell (mais detalhado)
powershell -Command "Get-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 20\"

:: Desinstalar update específico
wusa /uninstall /kb:5018506 /quiet /norestart

:: Desinstalar sem confirmação
wusa /uninstall /kb:5018506 /quiet /norestart /forcerestart`} />

      <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> Configurar Windows Update</h2>
      <CodeBlock language="batch" title="Configurar comportamento do Windows Update" code={`:: Desativar atualizações automáticas (temporário)
net stop wuauserv
sc config wuauserv start= disabled

:: Reativar
sc config wuauserv start= delayed-auto
net start wuauserv

:: Pausar atualizações por 7 dias via Registro
reg add "HKLM\\SOFTWARE\\Microsoft\\WindowsUpdate\\UX\\Settings\" /v PauseUpdatesExpiryTime /t REG_SZ /d \"2025-12-31T00:00:00Z\" /f

:: Ver configuração atual de updates
powershell -Command "Get-ItemProperty 'HKLM:\\SOFTWARE\\Microsoft\\WindowsUpdate\\UX\\Settings'\"`} />

      <h3>Script: Instalar Updates e Reiniciar Automaticamente</h3>
      <CodeBlock language="batch" title="auto-update.bat" code={`@echo off
echo Iniciando atualizacao automatica do Windows...
echo.

:: Verificar se PSWindowsUpdate está instalado
powershell -Command "Get-Module -ListAvailable PSWindowsUpdate\" | findstr \"PSWindowsUpdate" >nul
if errorlevel 1 (
    echo Instalando modulo PSWindowsUpdate...
    powershell -Command "Install-Module -Name PSWindowsUpdate -Force -Confirm:$false"
)

echo Verificando e instalando atualizacoes...
powershell -Command "Import-Module PSWindowsUpdate; Install-WindowsUpdate -AcceptAll -AutoReboot -Verbose"

echo Processo concluido!`} />

      <AlertBox type="success" title="WSUS — Windows Server Update Services">
        Em ambientes corporativos, o WSUS centraliza o gerenciamento de atualizações. Configure os clientes para apontar para o WSUS:
        <CodeBlock language="batch" title="Apontar para servidor WSUS" code={`reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\" /v WUServer /t REG_SZ /d \"http://wsus-server:8530\" /f
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\" /v WUStatusServer /t REG_SZ /d \"http://wsus-server:8530\" /f
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU\" /v UseWUServer /t REG_DWORD /d 1 /f`} />
      </AlertBox>
    </PageContainer>
  );
}