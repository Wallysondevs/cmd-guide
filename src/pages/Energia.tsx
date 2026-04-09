import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { Zap, Battery, Settings, BarChart2, Clock } from "lucide-react";

  export default function Energia() {
    return (
      <PageContainer
        title="Gerenciamento de Energia"
        subtitle="Configure planos de energia, analise consumo de bateria, gerencie estados de hibernação e monitore energia com POWERCFG pelo CMD."
        difficulty="intermediario"
        timeToRead="30 min"
      >
        <h2><Zap className="inline-block mr-2 mb-1 w-5 h-5" /> POWERCFG — Ferramenta de Energia</h2>
        <p>O <code>POWERCFG</code> é a ferramenta de linha de comando para gerenciar configurações de energia no Windows. Permite criar e modificar planos de energia, gerar relatórios de diagnóstico e configurar o comportamento do sistema quando ocioso ou com bateria.</p>

        <CodeBlock language="batch" title="Gerenciar planos de energia" code={`:: Listar planos de energia disponíveis
  powercfg /list
  :: Saída:
  :: Existing Power Schemes (* Active)
  :: Power Scheme GUID: 381b4222-... (Balanced) *
  :: Power Scheme GUID: 8c5e7fda-... (High Performance)
  :: Power Scheme GUID: a1841308-... (Power Saver)

  :: Ativar plano de alta performance
  powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c

  :: Ativar plano balanceado (padrão)
  powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e

  :: Ativar plano econômico
  powercfg /setactive a1841308-3541-4fab-bc81-f71556f20b4a

  :: Criar plano personalizado baseado em um existente
  powercfg /duplicatescheme 381b4222-f694-41f0-9685-ff5bb260df2e
  :: Retorna o GUID do novo plano

  :: Renomear plano
  powercfg /changename [GUID] "Meu Plano Personalizado" "Descrição opcional"`} />

        <CodeBlock language="batch" title="Configurar timeouts e comportamentos" code={`:: Ver configuração do plano ativo
  powercfg /query
  powercfg /query SCHEME_CURRENT

  :: Configurar tempo para desligar monitor (em segundos)
  :: Parâmetros: /change [configuração] [valor-em-minutos]
  powercfg /change monitor-timeout-ac 10   :: Na tomada: 10 min
  powercfg /change monitor-timeout-dc 3    :: Na bateria: 3 min

  :: Configurar tempo para sleep/suspensão
  powercfg /change standby-timeout-ac 30   :: Na tomada: 30 min
  powercfg /change standby-timeout-dc 15   :: Na bateria: 15 min

  :: Configurar tempo para hibernação
  powercfg /change hibernate-timeout-ac 60   :: Na tomada: 60 min
  powercfg /change hibernate-timeout-dc 30   :: Na bateria: 30 min

  :: Desativar sleep (0 = nunca)
  powercfg /change standby-timeout-ac 0

  :: Configurar comportamento ao fechar tampa do notebook
  :: 0=Nada, 1=Sleep, 2=Hibernar, 3=Desligar
  powercfg /setdcvalueindex SCHEME_CURRENT SUB_BUTTONS LIDACTION 1`} />

        <h2><Battery className="inline-block mr-2 mb-1 w-5 h-5" /> Relatório de Bateria</h2>
        <CodeBlock language="batch" title="Gerar relatório detalhado de bateria" code={`:: Gerar relatório de bateria em HTML (válido apenas em notebooks)
  powercfg /batteryreport /output C:\Relatorios\bateria.html
  :: O relatório inclui:
  :: - Histórico de cargas dos últimos 3 dias
  :: - Capacidade atual vs capacidade original (design capacity)
  :: - Estimativas de vida da bateria
  :: - Eventos de energia (conectado/desconectado)

  :: Abrir o relatório automaticamente
  start C:\Relatorios\bateria.html

  :: Ver status da bateria diretamente
  powercfg /systembatteryreport

  :: Gerar relatório de energia (diagnóstico completo, 60s)
  powercfg /energy /output C:\Relatorios\energia.html
  :: Analisa: erros de eficiência energética, dispositivos que impedem sleep, timeouts configurados`} />

        <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> Hibernação e Estados de Energia</h2>
        <CodeBlock language="batch" title="Controlar hibernação e suspensão" code={`:: Habilitar hibernação (cria hiberfil.sys no C:)
  powercfg /hibernate on

  :: Desabilitar hibernação (libera espaço no disco)
  powercfg /hibernate off
  :: Remove o hiberfil.sys (pode liberar vários GB)

  :: Colocar computador em suspensão (sleep) via CMD
  :: Método 1: rundll32
  rundll32.exe powrprof.dll,SetSuspendState Sleep

  :: Método 2: PsShutdown (Sysinternals)
  :: psshutdown -d -t 0

  :: Hibernar imediatamente
  rundll32.exe powrprof.dll,SetSuspendState Hibernate

  :: Desligar o monitor sem suspender o PC
  powershell -Command "(Add-Type -MemberDefinition '[DllImport("user32.dll")] public static extern int SendMessage(int hWnd, int hMsg, int wParam, int lParam);' -Name 'Win32Functions' -Namespace 'Win32' -PassThru)::SendMessage(-1, 0x0112, 0xF170, 2)"

  :: Ligar monitor novamente (mover o mouse)`} />

        <h2><BarChart2 className="inline-block mr-2 mb-1 w-5 h-5" /> Diagnóstico de Energia</h2>
        <CodeBlock language="batch" title="Encontrar o que impede o sleep" code={`:: Ver o que está impedindo o computador de dormir
  powercfg /requests
  :: Mostra requisições de energia ativas (vídeo, áudio, aplicativos, etc.)
  :: Exemplo: Sistema de atualização impedindo suspensão

  :: Ver drivers que podem causar problemas de energia
  powercfg /devicequery wake_armed
  :: Lista dispositivos que podem acordar o PC

  :: Desabilitar um dispositivo de acordar o PC
  powercfg /devicedisablewake "Realtek PCIe GbE Family Controller"

  :: Habilitar dispositivo para acordar (Wake-on-LAN)
  powercfg /deviceenablewake "Realtek PCIe GbE Family Controller"

  :: Ver último motivo que acordou o PC
  powercfg /lastwake
  :: Exemplo: Wake History Count - 1
  ::   Wake History [0]: Wake Source Type: Device
  ::   Wake Source Name: HID-compliant mouse

  :: Ver histórico de suspensões/ativações
  powercfg /sleepstudy /output C:\Relatorios\sleepstudy.html`} />

        <h2><Clock className="inline-block mr-2 mb-1 w-5 h-5" /> Fast Startup e Wake-on-LAN</h2>
        <CodeBlock language="batch" title="Configurar inicialização rápida e WoL" code={`:: Verificar se Fast Startup (inicialização rápida) está ativo
  powercfg /availablesleepstates
  :: S4 listado = Fast Startup / Hibernação disponível

  :: Desativar Fast Startup via registro (para permitir dual boot correto)
  reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Power" /v HiberbootEnabled /t REG_DWORD /d 0 /f

  :: Reativar Fast Startup
  reg add "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Power" /v HiberbootEnabled /t REG_DWORD /d 1 /f

  :: Configurar Wake-on-LAN via WMIC
  wmic nic where "name like '%Realtek%'" get PowerManagementCapabilities

  :: Listar configurações de energia de adaptadores de rede
  powershell -Command "Get-NetAdapter | Select-Object Name, @{N='WakeOnLan';E={(Get-NetAdapterPowerManagement \$_).WakeOnMagicPacket}}"`} />

        <AlertBox type="info" title="Dica: Relatório de Energia">
          O <code>powercfg /energy</code> é a ferramenta mais poderosa para diagnosticar problemas de bateria, computador que não dorme, ou consumo excessivo de energia. O relatório HTML gerado classifica os problemas por severidade (Erros, Avisos, Informações).
        </AlertBox>

        <AlertBox type="success" title="Economia de Energia em Servidores">
          Em servidores Windows, use o plano "High Performance" para máxima performance consistente. O plano "Balanced" pode reduzir a velocidade da CPU durante baixa carga, causando latência inesperada em momentos de pico.
        </AlertBox>
      </PageContainer>
    );
  }