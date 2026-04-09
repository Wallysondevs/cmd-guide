import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { Printer, Settings, Network, RefreshCcw, Wrench } from "lucide-react";

  export default function Impressao() {
    return (
      <PageContainer
        title="Impressão pelo CMD"
        subtitle="Gerencie impressoras locais e de rede, filas de impressão, spooler e servidores de impressão diretamente pelo Prompt de Comando."
        difficulty="intermediario"
        timeToRead="30 min"
      >
        <h2><Printer className="inline-block mr-2 mb-1 w-5 h-5" /> Imprimir Arquivos pelo CMD</h2>
        <p>O CMD oferece o comando <code>PRINT</code> para enviar arquivos texto para a impressora, além de diversas ferramentas para gerenciar impressoras e filas de impressão.</p>

        <CodeBlock language="batch" title="Imprimir arquivos de texto" code={`:: Imprimir arquivo de texto na impressora padrão
  print C:\Documentos\relatorio.txt

  :: Imprimir em impressora específica
  print /D:"Nome da Impressora" C:\Documentos\relatorio.txt

  :: Imprimir em porta LPT
  print /D:LPT1 C:\Documentos\relatorio.txt

  :: Imprimir em impressora de rede (porta UNC)
  print /D:\\SERVIDOR\Impressora C:\relatorio.txt

  :: Listar impressoras instaladas
  wmic printer get Name, Default, WorkOffline, PortName, Status

  :: Ver impressora padrão
  wmic printer where default=true get name`} />

        <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> Gerenciar Impressoras com CSCRIPT e WMI</h2>
        <CodeBlock language="batch" title="Adicionar, configurar e remover impressoras" code={`:: Listar impressoras detalhadamente via WMIC
  wmic printer list brief
  wmic printer get Name, Status, PrinterState, PortName, ShareName

  :: Definir impressora padrão
  wmic printer where name="HP LaserJet 1022" call SetDefaultPrinter

  :: Verificar status de uma impressora específica
  wmic printer where name="Epson L3150" get Status, WorkOffline, PrinterState

  :: Verificar trabalhos na fila de impressão
  wmic printjob get Document, JobStatus, Name, Owner, TotalPages

  :: Cancelar todos os trabalhos de uma impressora
  wmic printjob where "Name like 'HP%'" delete

  :: Pausar impressora
  wmic printer where name="HP LaserJet" call Pause

  :: Retomar impressora pausada
  wmic printer where name="HP LaserJet" call Resume`} />

        <h2><Network className="inline-block mr-2 mb-1 w-5 h-5" /> Impressoras de Rede</h2>
        <CodeBlock language="batch" title="Adicionar e gerenciar impressoras de rede" code={`:: Adicionar impressora de rede compartilhada
  rundll32 printui.dll,PrintUIEntry /in /n "\\SERVIDOR\Impressora"

  :: Adicionar e tornar padrão
  rundll32 printui.dll,PrintUIEntry /in /n "\\SERVIDOR\Impressora" /y

  :: Remover impressora de rede
  rundll32 printui.dll,PrintUIEntry /dn /n "\\SERVIDOR\Impressora"

  :: Instalar impressora com driver específico
  rundll32 printui.dll,PrintUIEntry /if /b "Minha Impressora" /f "C:\Drivers\impressora.inf" /r "LPT1:" /m "HP LaserJet 1022"

  :: Listar impressoras compartilhadas em um servidor
  net view \\SERVIDOR-PRINT

  :: Mapear impressora de rede via NET USE
  net use LPT2 \\SERVIDOR\Impressora /persistent:yes

  :: Listar mapeamentos
  net use | findstr LPT

  :: Remover mapeamento
  net use LPT2 /delete`} />

        <h2><RefreshCcw className="inline-block mr-2 mb-1 w-5 h-5" /> Gerenciar o Serviço Spooler</h2>
        <p>O <code>Spooler</code> é o serviço que gerencia a fila de impressão. Reiniciá-lo resolve a maioria dos problemas de fila travada.</p>

        <CodeBlock language="batch" title="Controlar o serviço de spooler" code={`:: Ver status do spooler
  sc query Spooler
  net start | findstr "Print Spooler"

  :: Parar o spooler
  net stop Spooler

  :: Iniciar o spooler
  net start Spooler

  :: Reiniciar o spooler (parar + iniciar)
  net stop Spooler && net start Spooler

  :: Limpar fila de impressão manualmente
  :: (Spooler precisa estar PARADO)
  net stop Spooler
  del /f /q C:\Windows\System32\spool\PRINTERS\*.*
  net start Spooler

  :: Ver arquivos na fila de spool
  dir /b C:\Windows\System32\spool\PRINTERS\

  :: Configurar spooler para iniciar automaticamente
  sc config Spooler start= auto`} />

        <h3>Script: Limpar Fila de Impressão Travada</h3>
        <CodeBlock language="batch" title="limpar-fila.bat — Resolver fila presa" code={`@echo off
  echo Limpando fila de impressão travada...

  :: Parar o spooler
  echo Parando spooler...
  net stop Spooler >nul 2>&1

  :: Aguardar 2 segundos
  timeout /t 2 /nobreak >nul

  :: Deletar todos os trabalhos da fila
  echo Removendo trabalhos na fila...
  del /f /q "%SystemRoot%\System32\spool\PRINTERS\*.*" >nul 2>&1

  :: Reiniciar o spooler
  echo Iniciando spooler...
  net start Spooler >nul 2>&1

  echo.
  echo Fila limpa! Tente imprimir novamente.
  pause`} />

        <h2><Wrench className="inline-block mr-2 mb-1 w-5 h-5" /> Diagnóstico de Problemas</h2>
        <CodeBlock language="batch" title="Diagnosticar problemas de impressão" code={`:: Ver eventos de erro do spooler nos últimos logs
  wevtutil qe System /q:"*[System[Provider[@Name='Microsoft-Windows-SpoolerWin32SPL'] and (Level=2)]]" /f:text /c:10

  :: Verificar se a porta TCP de impressão está respondendo
  powershell -Command "Test-NetConnection 192.168.1.200 -Port 9100"
  :: Porta 9100 = RAW printing (maioria das impressoras de rede)
  :: Porta 631  = IPP (Internet Printing Protocol)

  :: Listar portas de impressão configuradas
  reg query "HKLM\SYSTEM\CurrentControlSet\Control\Print\Monitors\Standard TCP/IP Port\Ports"

  :: Ver log de instalação de driver de impressora
  type C:\Windows\inf\setupapi.dev.log | findstr /i "printer"

  :: Verificar se driver está assinado
  powershell -Command "Get-PrinterDriver | Select-Object Name, DriverVersion, Manufacturer"

  :: Reinstalar driver problemático
  rundll32 printui.dll,PrintUIEntry /dd /n "Nome da Impressora" /q
  :: Depois reinstalar o driver limpo`} />

        <AlertBox type="info" title="PrintUI — Interface Completa de Gerenciamento">
          O <code>rundll32 printui.dll,PrintUIEntry</code> oferece dezenas de opções para instalar, configurar e remover impressoras em scripts. Execute <code>rundll32 printui.dll,PrintUIEntry /?</code> para ver todas as opções disponíveis — inclui configurações de paper size, qualidade de impressão, orientação e muito mais.
        </AlertBox>

        <AlertBox type="success" title="Windows Print Server">
          Em ambientes corporativos com servidor de impressão Windows, gerencie tudo via: <code>printmanagement.msc</code> (GUI) ou <code>Get-PrintJob</code>, <code>Remove-PrintJob</code>, <code>Add-Printer</code> via PowerShell — muito mais poderoso que os comandos CMD para esta finalidade.
        </AlertBox>
      </PageContainer>
    );
  }