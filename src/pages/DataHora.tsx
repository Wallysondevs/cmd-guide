import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { Clock, Calendar, Globe, RefreshCcw, Settings } from "lucide-react";

  export default function DataHora() {
    return (
      <PageContainer
        title="Data, Hora e Fuso Horário"
        subtitle="Manipule datas e horas no CMD, sincronize NTP com W32TM, calcule diferenças, configure fuso horário e use datas em nomes de arquivos."
        difficulty="intermediario"
        timeToRead="30 min"
      >
        <h2><Calendar className="inline-block mr-2 mb-1 w-5 h-5" /> Comandos DATE e TIME</h2>
        <p>Os comandos <code>DATE</code> e <code>TIME</code> permitem ler e definir a data e hora do sistema. São a base para usar timestamps em nomes de arquivos e logs de scripts.</p>

        <CodeBlock language="batch" title="Ler e definir data e hora" code={`:: Exibir data atual (sem prompt interativo)
  date /t
  :: Saída: qua 09/04/2026

  :: Exibir hora atual
  time /t
  :: Saída: 14:35

  :: Definir data (formato depende do idioma do sistema)
  date 09/04/2026

  :: Definir hora
  time 14:30:00

  :: Via PowerShell (formato padronizado)
  powershell -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss'"
  :: Saída: 2026-04-09 14:35:22`} />

        <h2><Clock className="inline-block mr-2 mb-1 w-5 h-5" /> Timestamps em Nomes de Arquivos</h2>
        <CodeBlock language="batch" title="Usar data e hora em nomes de arquivos e logs" code={`:: Parsear data do CMD (formato DD/MM/AAAA)
  :: %DATE% retorna: qua 09/04/2026
  for /f "tokens=2 delims= " %%a in ("%DATE%") do set DATABRUTA=%%a
  :: DATABRUTA = 09/04/2026

  :: Extrair partes da data
  set DIA=%DATABRUTA:~0,2%
  set MES=%DATABRUTA:~3,2%
  set ANO=%DATABRUTA:~6,4%
  :: Resultado: DIA=09 MES=04 ANO=2026

  :: Extrair hora atual
  for /f "tokens=1 delims=:" %%h in ("%TIME%") do set HORA=%%h
  for /f "tokens=2 delims=:" %%m in ("%TIME%") do set MIN=%%m

  :: Criar timestamp formatado AAAAMMDD_HHMM
  set STAMP=%ANO%%MES%%DIA%_%HORA%%MIN%

  :: Usar em nome de arquivo
  copy dados.csv "D:\Backup\dados_%STAMP%.csv"
  :: Resultado: dados_20260409_1435.csv

  :: Criar pasta com data
  mkdir "D:\Logs\%ANO%-%MES%-%DIA%"

  :: Redirecionar log com timestamp
  echo [%DATE% %TIME%] Inicio do processo >> C:\Logs\processo.log`} />

        <h3>Método Robusto via PowerShell</h3>
        <CodeBlock language="batch" title="Timestamp confiável (independente do locale)" code={`:: Obter timestamp formatado via PowerShell (recomendado)
  for /f %%t in ('powershell -Command "Get-Date -Format yyyyMMdd_HHmm"') do set STAMP=%%t

  :: Usar o timestamp
  echo Arquivo criado em: %STAMP%
  copy backup.zip "D:\Arquivos\backup_%STAMP%.zip"

  :: Data só (sem hora)
  for /f %%d in ('powershell -Command "Get-Date -Format yyyy-MM-dd"') do set HOJE=%%d

  :: Calcular data de amanhã
  for /f %%d in ('powershell -Command "(Get-Date).AddDays(1).ToString('yyyy-MM-dd')"') do set AMANHA=%%d

  :: Calcular 30 dias atrás
  for /f %%d in ('powershell -Command "(Get-Date).AddDays(-30).ToString('yyyy-MM-dd')"') do set MES_PASSADO=%%d

  echo Hoje: %HOJE%
  echo Amanhã: %AMANHA%
  echo 30 dias atrás: %MES_PASSADO%`} />

        <h2><Globe className="inline-block mr-2 mb-1 w-5 h-5" /> Fuso Horário (Timezone)</h2>
        <CodeBlock language="batch" title="Ver e configurar fuso horário" code={`:: Ver fuso horário atual
  tzutil /g
  :: Saída: E. South America Standard Time

  :: Listar todos os fusos disponíveis
  tzutil /l
  :: Saída (resumida):
  :: ...
  :: E. South America Standard Time
  :: (UTC-03:00) Brasília
  :: ...

  :: Definir fuso horário
  tzutil /s "E. South America Standard Time"

  :: Outros fusos do Brasil:
  :: Acre:     "SA Pacific Standard Time"        (UTC-05:00)
  :: Manaus:   "SA Western Standard Time"        (UTC-04:00)
  :: Brasília: "E. South America Standard Time"  (UTC-03:00)
  :: Fernando de Noronha: "Mid-Atlantic Standard Time" (UTC-02:00)

  :: Sincronizar com servidor de horário imediatamente
  w32tm /resync /force

  :: Ver configuração de timezone via registro
  reg query HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation`} />

        <h2><RefreshCcw className="inline-block mr-2 mb-1 w-5 h-5" /> W32TM — Sincronização de Horário NTP</h2>
        <p>O <code>W32TM</code> é o serviço de tempo do Windows. Gerencia a sincronização NTP com servidores de horário, essencial em domínios Active Directory e ambientes que precisam de logs precisos.</p>

        <CodeBlock language="batch" title="Configurar e diagnosticar sincronização NTP" code={`:: Verificar status atual de sincronização
  w32tm /query /status
  :: Saída:
  :: Leap Indicator: 0 (no warning)
  :: Stratum: 4 (secondary reference - syncd by (S)NTP)
  :: Precision: -23 (119.209ns per tick)
  :: Root Delay: 0.0313988s
  :: Root Dispersion: 7.8125000s
  :: ReferenceId: 0xC27B0504 (source IP)
  :: Last Successful Sync Time: 09/04/2026 14:30:45

  :: Ver fonte atual de sincronização
  w32tm /query /source
  :: Saída: time.windows.com

  :: Ver configuração de peers NTP
  w32tm /query /peers

  :: Forçar sincronização imediata
  w32tm /resync
  w32tm /resync /force    :: Forçar mesmo que o relógio esteja correto

  :: Ver diferença de tempo em relação ao servidor
  w32tm /monitor

  :: Diagnóstico completo
  w32tm /query /configuration`} />

        <CodeBlock language="batch" title="Configurar servidor NTP personalizado" code={`:: Definir servidor NTP externo (para computadores standalone)
  w32tm /config /manualpeerlist:"a.ntp.br,0x1 b.ntp.br,0x1" /syncfromflags:manual /update
  :: Servidores NTP brasileiros: a.ntp.br, b.ntp.br, c.ntp.br, d.ntp.br

  :: Servidores NTP globais
  :: pool.ntp.org, time.google.com, time.cloudflare.com
  :: time.windows.com (padrão do Windows)

  :: Reiniciar serviço de tempo
  net stop w32time
  net start w32time

  :: Sincronizar após configurar
  w32tm /resync /force

  :: Registrar serviço de tempo (se necessário)
  w32tm /register
  w32tm /unregister

  :: Ver todos os detalhes de configuração
  w32tm /query /configuration /verbose`} />

        <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> Cálculos com Datas em Scripts</h2>
        <CodeBlock language="batch" title="Calcular diferença entre datas e lógica temporal" code={`:: Verificar se hoje é segunda-feira (0=domingo, 1=segunda, ..., 6=sábado)
  for /f %%d in ('powershell -Command "[int](Get-Date).DayOfWeek"') do set DIA_SEMANA=%%d
  if "%DIA_SEMANA%"=="1" echo Hoje é segunda-feira!

  :: Verificar se é fim de semana
  if %DIA_SEMANA% GEQ 6 echo É fim de semana - não executa backup!

  :: Calcular diferença em dias entre duas datas
  powershell -Command "((Get-Date '2026-12-31') - (Get-Date)).Days"
  :: Saída: 265 (dias até o final do ano)

  :: Verificar se arquivo foi modificado nos últimos 7 dias
  powershell -Command "
      \$arquivo = 'C:\dados.csv'
      \$limite = (Get-Date).AddDays(-7)
      if ((Get-Item \$arquivo).LastWriteTime -gt \$limite) {
          Write-Host 'Arquivo recente'
      } else {
          Write-Host 'Arquivo desatualizado!'
      }
  "

  :: Script de backup semanal (só na sexta-feira)
  for /f %%d in ('powershell -Command "(Get-Date).DayOfWeek"') do set DIA=%%d
  if "%DIA%"=="Friday" (
      echo Realizando backup semanal...
      robocopy C:\Dados D:\Backup\Semanal /e /mir
  )`} />

        <AlertBox type="info" title="NTP em Domínio Active Directory">
          Em domínios AD, apenas o Controlador de Domínio Primário (PDC Emulator) sincroniza com servidores NTP externos. Os demais computadores sincronizam com o DC. Nunca configure <code>w32tm</code> manualmente em membros do domínio — isso pode causar problemas de autenticação Kerberos.
        </AlertBox>

        <AlertBox type="warning" title="Diferença de Horário e Kerberos">
          O Kerberos (usado na autenticação do Windows/AD) tolera no máximo 5 minutos de diferença de horário entre o cliente e o servidor. Se o relógio estiver errado, o login no domínio falha. Use sempre <code>w32tm /resync /force</code> para corrigir.
        </AlertBox>
      </PageContainer>
    );
  }