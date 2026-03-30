import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Clock, Calendar, Globe, RefreshCcw } from "lucide-react";

export default function DataHora() {
  return (
    <PageContainer
      title="Data, Hora e Fuso Horário"
      subtitle="Manipule datas e horas no CMD, calcule diferenças, configure fuso horário, sincronize com NTP e use datas em nomes de arquivos."
      difficulty="iniciante"
      timeToRead="22 min"
    >
      <h2><Calendar className="inline-block mr-2 mb-1 w-5 h-5" /> DATE e TIME — Consultar e Definir</h2>
      <CodeBlock language="batch" title="Obter e definir data e hora" code={`:: Ver data atual
date /t

:: Ver hora atual
time /t

:: Definir data (formato depende da localização!)
:: pt-BR: DD/MM/AAAA
date 25/12/2024

:: Definir hora
time 14:30:00

:: Exibir ambos
echo Data: %date%
echo Hora: %time%`} />

      <h3>Extrair Partes da Data (pt-BR)</h3>
      <CodeBlock language="batch" title="Parsear data no formato DD/MM/AAAA" code={`@echo off
:: Formato padrão pt-BR: DIA/MES/ANO HH:MM:SS
set DIA=%date:~0,2%
set MES=%date:~3,2%
set ANO=%date:~6,4%
set HORA=%time:~0,2%
set MIN=%time:~3,2%
set SEG=%time:~6,2%

echo Dia:  %DIA%
echo Mes:  %MES%
echo Ano:  %ANO%
echo Hora: %HORA%:%MIN%:%SEG%

:: Criar timestamp para nomes de arquivo (evita caracteres inválidos)
set TIMESTAMP=%ANO%%MES%%DIA%_%HORA%%MIN%%SEG%
set TIMESTAMP=%TIMESTAMP: =0%  :: substitui espaços por zero (hora < 10)
echo Timestamp: %TIMESTAMP%

:: Usar em nome de arquivo
set ARQUIVO=relatorio_%ANO%-%MES%-%DIA%.txt
echo Salvando em: %ARQUIVO%`} />

      <AlertBox type="warning" title="Formato de Data varia por Localização">
        O formato de %date% depende das configurações regionais do Windows. Use PowerShell para obter datas de forma padronizada independente do idioma.
      </AlertBox>

      <h3>Método Seguro: PowerShell para Datas</h3>
      <CodeBlock language="batch" title="Usar PowerShell para datas confiáveis" code={`:: Data no formato ISO 8601 (sempre funciona)
for /f %%a in ('powershell -Command "Get-Date -Format yyyy-MM-dd\"') do set DATA=%%a
echo Data: %DATA%

:: Hora no formato HH-mm-ss
for /f %%a in ('powershell -Command "Get-Date -Format HH-mm-ss\"') do set HORA=%%a
echo Hora: %HORA%

:: Timestamp completo
for /f %%a in ('powershell -Command "Get-Date -Format yyyyMMdd_HHmmss\"') do set TS=%%a
echo Timestamp: %TS%

:: Ontem
for /f %%a in ('powershell -Command "(Get-Date).AddDays(-1).ToString('yyyy-MM-dd')\"') do set ONTEM=%%a
echo Ontem: %ONTEM%

:: Próxima segunda-feira
for /f %%a in ('powershell -Command "$d=(Get-Date); while ($d.DayOfWeek -ne 'Monday'){$d=$d.AddDays(1)}; $d.ToString('yyyy-MM-dd')\"') do set PROX_SEG=%%a
echo Proxima segunda: %PROX_SEG%`} />

      <h2><Globe className="inline-block mr-2 mb-1 w-5 h-5" /> Fuso Horário</h2>
      <CodeBlock language="batch" title="Ver e configurar fuso horário" code={`:: Ver fuso horário atual
tzutil /g

:: Listar todos os fusos disponíveis
tzutil /l

:: Definir fuso horário (ex: Brasília)
tzutil /s "E. South America Standard Time\"

:: Outros fusos comuns:
:: "UTC\" — Coordenado Universal
:: "Pacific Standard Time\" — Los Angeles
:: "Eastern Standard Time\" — Nova York
:: "GMT Standard Time\" — Londres
:: "W. Europe Standard Time\" — Paris/Berlin`} />

      <h2><RefreshCcw className="inline-block mr-2 mb-1 w-5 h-5" /> Sincronizar Horário com NTP</h2>
      <CodeBlock language="batch" title="Sincronizar relógio com servidor NTP" code={`:: Forçar sincronização NTP
w32tm /resync

:: Ver status de sincronização
w32tm /query /status

:: Ver configuração NTP atual
w32tm /query /configuration

:: Definir servidor NTP manualmente
w32tm /config /manualpeerlist:"time.nist.gov\" /syncfromflags:MANUAL /reliable:YES /update

:: Reiniciar serviço de tempo do Windows
net stop w32time
net start w32time
w32tm /resync`} />

      <h2><Clock className="inline-block mr-2 mb-1 w-5 h-5" /> Calcular Diferenças de Tempo</h2>
      <CodeBlock language="batch" title="Medir tempo de execução de script" code={`@echo off
:: Capturar hora de início
set INICIO=%time%

:: ... seu código aqui ...
timeout /t 3 /nobreak >nul  :: Simula processamento

:: Calcular duração via PowerShell
set FIM=%time%

powershell -Command "^
    $ini = [DateTime]::ParseExact('%INICIO%'.Trim(), 'H:mm:ss.ff', $null); ^
    $fim = [DateTime]::ParseExact('%FIM%'.Trim(), 'H:mm:ss.ff', $null); ^
    $dur = ($fim - $ini).TotalSeconds; ^
    Write-Host ('Duracao: ' + [math]::Round($dur,2) + ' segundos')"

echo Script concluido!`} />

      <AlertBox type="info" title="Dica: TIMEOUT e PING como sleep">
        <CodeBlock language="batch" title="Pausar execução por N segundos" code={`:: Aguardar 5 segundos (interrompível com qualquer tecla)
timeout /t 5

:: Aguardar sem possibilidade de interrupção
timeout /t 5 /nobreak

:: Alternativa com ping (funciona em versões antigas)
ping -n 6 127.0.0.1 >nul :: N-1 segundos de espera`} />
      </AlertBox>
    </PageContainer>
  );
}