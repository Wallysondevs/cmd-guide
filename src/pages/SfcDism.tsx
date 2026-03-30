import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Shield, Wrench, RefreshCcw } from "lucide-react";

export default function SfcDism() {
  return (
    <PageContainer
      title="SFC e DISM — Reparar o Windows"
      subtitle="Use o Verificador de Arquivos do Sistema e o DISM para diagnosticar e corrigir corrupções do Windows sem reinstalar."
      difficulty="intermediario"
      timeToRead="25 min"
    >
      <h2><Shield className="inline-block mr-2 mb-1 w-5 h-5" /> SFC — System File Checker</h2>
      <p>O <code>SFC</code> (Verificador de Arquivos do Sistema) examina todos os arquivos protegidos do Windows e restaura versões corretas a partir do cache.</p>

      <AlertBox type="warning" title="Execute como Administrador">
        O SFC e o DISM exigem prompt de comando com privilégios de administrador. Clique com o botão direito no CMD e escolha "Executar como administrador\".
      </AlertBox>

      <CodeBlock language="batch" title="Comandos SFC fundamentais" code={`:: Verificar e reparar todos os arquivos protegidos
sfc /scannow

:: Verificar sem reparar (somente relatório)
sfc /verifyonly

:: Verificar um arquivo específico
sfc /verifyfile=C:\\Windows\\System32\\cmd.exe

:: Reparar um arquivo específico
sfc /scanfile=C:\\Windows\\System32\\cmd.exe

:: Ver log completo do SFC
findstr /c:"[SR]\" %windir%\\Logs\\CBS\\CBS.log | more`} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="p-4 border border-green-500/30 rounded-lg bg-green-500/5">
          <h4 className="font-bold text-green-400 mb-2">Windows Resource Protection não encontrou problemas</h4>
          <p className="text-sm">Sistema saudável. Nenhuma ação necessária.</p>
        </div>
        <div className="p-4 border border-yellow-500/30 rounded-lg bg-yellow-500/5">
          <h4 className="font-bold text-yellow-400 mb-2">Encontrou arquivos corrompidos e reparou</h4>
          <p className="text-sm">Problemas resolvidos. Reinicie o computador.</p>
        </div>
        <div className="p-4 border border-red-500/30 rounded-lg bg-red-500/5">
          <h4 className="font-bold text-red-400 mb-2">Encontrou mas não pôde reparar</h4>
          <p className="text-sm">Use o DISM para restaurar a imagem do Windows.</p>
        </div>
      </div>

      <h2><Wrench className="inline-block mr-2 mb-1 w-5 h-5" /> DISM — Deployment Image Service</h2>
      <p>O <code>DISM</code> gerencia e repara a imagem do Windows. É mais poderoso que o SFC e pode corrigir problemas que o SFC não consegue resolver.</p>

      <h3>Sequência Recomendada de Reparo</h3>
      <CodeBlock language="batch" title="Processo completo de reparo do Windows" code={`:: PASSO 1: Verificar saúde da imagem
DISM /Online /Cleanup-Image /CheckHealth

:: PASSO 2: Diagnóstico completo (demora 5-10 min)
DISM /Online /Cleanup-Image /ScanHealth

:: PASSO 3: Restaurar a imagem (precisa de internet)
DISM /Online /Cleanup-Image /RestoreHealth

:: PASSO 4: Rodar SFC novamente após DISM
sfc /scannow`} />

      <h3>DISM com Fonte Local (Offline)</h3>
      <CodeBlock language="batch" title="Usar ISO ou WIM como fonte de reparo" code={`:: Montar ISO do Windows (cria letra de unidade)
:: Depois use a pasta /sources/install.wim

:: Reparar usando WIM local
DISM /Online /Cleanup-Image /RestoreHealth /Source:D:\\Sources\\install.wim /LimitAccess

:: Ou usando ESD
DISM /Online /Cleanup-Image /RestoreHealth /Source:D:\\Sources\\install.esd:1 /LimitAccess`} />

      <h3>Gerenciar Componentes e Features</h3>
      <CodeBlock language="batch" title="Ativar/desativar recursos do Windows" code={`:: Listar recursos instalados
DISM /Online /Get-Features /Format:Table

:: Ativar um recurso (ex: Telnet)
DISM /Online /Enable-Feature /FeatureName:TelnetClient

:: Desativar um recurso
DISM /Online /Disable-Feature /FeatureName:TelnetClient

:: Ativar recurso que requer reinicialização
DISM /Online /Enable-Feature /FeatureName:Microsoft-Hyper-V-All /All`} />

      <h3>Limpar Componentes Obsoletos</h3>
      <CodeBlock language="batch" title="Liberar espaço em disco após atualizações" code={`:: Ver tamanho dos componentes desnecessários
DISM /Online /Cleanup-Image /AnalyzeComponentStore

:: Limpar componentes de updates antigos
DISM /Online /Cleanup-Image /StartComponentCleanup

:: Limpeza mais agressiva (remove backups de updates)
DISM /Online /Cleanup-Image /StartComponentCleanup /ResetBase`} />

      <h2><RefreshCcw className="inline-block mr-2 mb-1 w-5 h-5" /> Script de Reparo Completo</h2>
      <CodeBlock language="batch" title="repair-windows.bat" code={`@echo off
echo ================================
echo  Reparo Completo do Windows
echo ================================
echo.

echo [1/4] Verificando saude da imagem DISM...
DISM /Online /Cleanup-Image /CheckHealth
echo.

echo [2/4] Restaurando imagem do Windows...
DISM /Online /Cleanup-Image /RestoreHealth
if %errorlevel% neq 0 (
    echo ERRO: Falha no DISM. Verifique a conexao com a internet.
    pause & exit /b 1
)
echo.

echo [3/4] Verificando arquivos do sistema...
sfc /scannow
echo.

echo [4/4] Limpando componentes...
DISM /Online /Cleanup-Image /StartComponentCleanup
echo.

echo Reparo concluido! Reinicie o computador.
pause`} />

      <AlertBox type="success" title="Dica: Usando o Windows RE">
        Se o Windows não iniciar, você pode rodar <code>sfc</code> e <code>DISM</code> a partir do Ambiente de Recuperação do Windows (WinRE), especificando o disco de destino com o parâmetro <code>/OfflineWinDir</code>.
      </AlertBox>
    </PageContainer>
  );
}