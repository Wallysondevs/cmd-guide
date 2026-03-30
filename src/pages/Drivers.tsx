import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Cpu, Download, RefreshCcw, Search } from "lucide-react";

export default function Drivers() {
  return (
    <PageContainer
      title="Gerenciamento de Drivers"
      subtitle="Instale, atualize, remova e diagnostique drivers de dispositivo com PNPUTIL, DRIVERQUERY e ferramentas nativas do Windows."
      difficulty="avancado"
      timeToRead="25 min"
    >
      <h2><Cpu className="inline-block mr-2 mb-1 w-5 h-5" /> DRIVERQUERY — Listar Drivers</h2>
      <p>O <code>DRIVERQUERY</code> exibe todos os drivers de dispositivo instalados no sistema, com informações sobre status, tipo e versão.</p>

      <CodeBlock language="batch" title="Consultar drivers instalados" code={`:: Listar todos os drivers
driverquery

:: Listar em formato CSV
driverquery /fo csv > C:\\Logs\\drivers.csv

:: Incluir informações detalhadas (assinatura, data)
driverquery /v

:: Filtrar apenas drivers em execução
driverquery | findstr "Running\"

:: Ver drivers de uma máquina remota
driverquery /s nome-do-servidor /u admin /p senha

:: Ver somente drivers de kernel
driverquery /si`} />

      <h2><Download className="inline-block mr-2 mb-1 w-5 h-5" /> PNPUTIL — Gerenciar Drivers INF</h2>
      <p>O <code>PNPUTIL</code> gerencia o repositório de drivers do Windows, permitindo adicionar, remover e listar pacotes de driver.</p>

      <CodeBlock language="batch" title="Adicionar e instalar drivers" code={`:: Adicionar driver ao repositório
pnputil /add-driver C:\\Drivers\\meu-driver.inf

:: Adicionar E instalar (para todos os dispositivos compatíveis)
pnputil /add-driver C:\\Drivers\\meu-driver.inf /install

:: Adicionar todos os drivers de uma pasta
pnputil /add-driver C:\\Drivers\\*.inf /subdirs

:: Listar drivers no repositório
pnputil /enum-drivers

:: Ver detalhes de um driver específico
pnputil /enum-drivers | findstr "oem10.inf\"`} />

      <CodeBlock language="batch" title="Remover drivers do repositório" code={`:: Remover driver pelo nome oem (ex: oem10.inf)
pnputil /delete-driver oem10.inf

:: Remover forçando (mesmo se em uso)
pnputil /delete-driver oem10.inf /force

:: Remover E desinstalar do sistema
pnputil /delete-driver oem10.inf /uninstall`} />

      <h2><RefreshCcw className="inline-block mr-2 mb-1 w-5 h-5" /> Atualizar e Reinstalar Drivers</h2>
      <CodeBlock language="batch" title="Forçar atualização de driver" code={`:: Verificar atualizações de driver (Windows Update)
wuauclt /detectnow

:: Reinstalar driver de um dispositivo (via ID)
:: Primeiro descubra o ID do dispositivo
devmgmt.msc :: Abrir gerenciador de dispositivos

:: Ou via PowerShell:
:: Get-PnpDevice | Select-Object Status, Class, FriendlyName, InstanceId`} />

      <h2><Search className="inline-block mr-2 mb-1 w-5 h-5" /> Diagnosticar Problemas de Driver</h2>
      <CodeBlock language="batch" title="Encontrar dispositivos com problema" code={`:: Abrir Gerenciador de Dispositivos
devmgmt.msc

:: Listar dispositivos com erro via PowerShell
powershell -Command "Get-PnpDevice | Where-Object {$_.Status -ne 'OK'}\"

:: Ver log de instalação de drivers
powershell -Command "Get-WinEvent -LogName 'Microsoft-Windows-Kernel-PnP/Configuration' | Select-Object -First 20 | Format-List\"

:: Ver INF dos drivers problemáticos
pnputil /enum-drivers | findstr /i "error\"`} />

      <h3>Script: Backup de Drivers</h3>
      <CodeBlock language="batch" title="Fazer backup de todos os drivers" code={`@echo off
echo Fazendo backup dos drivers...
set DESTINO=C:\\Backup\\Drivers

mkdir "%DESTINO%\" 2>nul

:: Exportar todos os drivers de terceiros (não Microsoft)
pnputil /export-driver * "%DESTINO%"

echo.
echo Backup concluido em: %DESTINO%
echo Total de drivers:
dir "%DESTINO%\" /b /s | find \".inf\" | find /c \".inf"
pause`} />

      <h3>Script: Restaurar Drivers do Backup</h3>
      <CodeBlock language="batch" title="Reinstalar drivers a partir do backup" code={`@echo off
set ORIGEM=C:\\Backup\\Drivers

echo Restaurando drivers de %ORIGEM%...

:: Adicionar todos os drivers do backup
pnputil /add-driver "%ORIGEM%\\*.inf\" /subdirs /install

echo.
echo Restauracao concluida! Reinicie o computador.
pause`} />

      <AlertBox type="info" title="Driver Verifier — Diagnosticar Crashes">
        O <code>verifier.exe</code> ativa o verificador de drivers para diagnosticar a causa de BSODs (tela azul). Execute com cuidado:
        <CodeBlock language="batch" title="Ativar e desativar Driver Verifier" code={`:: Ver status
verifier /querysettings

:: Ativar para drivers de terceiros (causa reinicialização)
verifier /standard /driver driver1.sys driver2.sys

:: Desativar (após diagnóstico)
verifier /reset`} />
      </AlertBox>
    </PageContainer>
  );
}