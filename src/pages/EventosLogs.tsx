import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { FileText, Search, Bell, Activity } from "lucide-react";

export default function EventosLogs() {
  return (
    <PageContainer
      title="Eventos e Logs do Sistema"
      subtitle="Consulte, filtre e exporte eventos do Windows com WEVTUTIL, analise logs de sistema e crie alertas automatizados."
      difficulty="intermediario"
      timeToRead="28 min"
    >
      <h2><FileText className="inline-block mr-2 mb-1 w-5 h-5" /> WEVTUTIL — Gerenciador de Eventos</h2>
      <p>O <code>WEVTUTIL</code> permite consultar, exportar e gerenciar todos os logs de eventos do Windows sem precisar abrir o Visualizador de Eventos.</p>

      <h3>Listar e Ver Logs</h3>
      <CodeBlock language="batch" title="Listar e consultar logs de eventos" code={`:: Listar todos os logs disponíveis
wevtutil el

:: Ver informações de um log específico
wevtutil gl System

:: Ver últimos 20 eventos do Sistema
wevtutil qe System /c:20 /rd:true /f:text

:: Ver eventos de Aplicação
wevtutil qe Application /c:10 /rd:true /f:text

:: Ver eventos de Segurança (requer admin)
wevtutil qe Security /c:10 /rd:true /f:text`} />

      <h3>Filtrar Eventos por Critérios</h3>
      <CodeBlock language="batch" title="Filtrar com queries XPath" code={`:: Filtrar por ID de evento (ex: 4625 = falha de login)
wevtutil qe Security /q:"*[System[EventID=4625]]\" /f:text /c:20

:: Filtrar por nível (2=Error, 3=Warning, 4=Information)
wevtutil qe System /q:"*[System[Level=2]]\" /f:text /c:20

:: Filtrar por intervalo de tempo (últimas 24h)
wevtutil qe System /q:"*[System[TimeCreated[timediff(@SystemTime) <= 86400000]]]\" /f:text /c:50

:: Filtrar por fonte específica
wevtutil qe Application /q:"*[System[Provider[@Name='MSSQLSERVER']]]\" /f:text`} />

      <h3>Exportar e Limpar Logs</h3>
      <CodeBlock language="batch" title="Exportar e arquivar logs" code={`:: Exportar log para arquivo .evtx
wevtutil epl System C:\\Logs\\system-$(date /t).evtx

:: Exportar em formato XML
wevtutil qe System /f:xml > C:\\Logs\\system-events.xml

:: Limpar um log (CUIDADO! Deleta todos os eventos)
wevtutil cl Application

:: Limpar com backup
wevtutil epl Application C:\\Logs\\app-backup.evtx
wevtutil cl Application`} />

      <h2><Search className="inline-block mr-2 mb-1 w-5 h-5" /> IDs de Eventos Importantes</h2>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-border">
          <thead><tr className="bg-muted">
            <th className="border border-border p-2 text-left">ID</th>
            <th className="border border-border p-2 text-left">Log</th>
            <th className="border border-border p-2 text-left">Descrição</th>
          </tr></thead>
          <tbody>
            {[
              ["4624","Security","Login bem-sucedido"],
              ["4625","Security","Falha de login"],
              ["4634","Security","Logoff"],
              ["4720","Security","Conta de usuário criada"],
              ["4726","Security","Conta de usuário excluída"],
              ["4740","Security","Conta bloqueada"],
              ["1074","System","PC desligado/reiniciado"],
              ["6005","System","Log de eventos iniciado (boot)"],
              ["6006","System","Log de eventos encerrado (shutdown)"],
              ["7034","System","Serviço travou inesperadamente"],
              ["41","System","Kernel-Power: desligamento não esperado"],
            ].map(([id, log, desc]) => (
              <tr key={id}>
                <td className="border border-border p-2 font-mono text-primary">{id}</td>
                <td className="border border-border p-2">{log}</td>
                <td className="border border-border p-2">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2><Bell className="inline-block mr-2 mb-1 w-5 h-5" /> Criar Alertas com SCHTASKS + WEVTUTIL</h2>
      <CodeBlock language="batch" title="Script: monitorar falhas de login" code={`@echo off
:: Verificar falhas de login nas últimas 5 minutos
wevtutil qe Security /q:"*[System[EventID=4625 and TimeCreated[timediff(@SystemTime) <= 300000]]]\" /c:1 /f:text > %TEMP%\falhas.tmp 2>&1

:: Contar falhas
for /f "tokens=*\" %%a in ('type %TEMP%\falhas.tmp ^| find /c \"EventID\"') do set COUNT=%%a

if %COUNT% GTR 0 (
    echo ALERTA: %COUNT% tentativas falhas de login detectadas!
    :: Enviar email ou escrever log
    echo %date% %time% - ALERTA: %COUNT% falhas >> C:\\Logs\\alertas.txt
)
del %TEMP%\falhas.tmp`} />

      <h2><Activity className="inline-block mr-2 mb-1 w-5 h-5" /> EVENTVWR — Abrir Interface Gráfica</h2>
      <CodeBlock language="batch" title="Abrir Visualizador de Eventos" code={`:: Abrir Visualizador de Eventos
eventvwr

:: Abrir diretamente em um log específico
eventvwr /l:System

:: Abrir um arquivo .evtx exportado
eventvwr C:\\Logs\\system-backup.evtx`} />

      <AlertBox type="info" title="Dica: Criar Log Personalizado">
        Você pode escrever no Log de Eventos do Windows a partir de um script usando <code>eventcreate</code>:
        <CodeBlock language="batch" title="Escrever no Event Log" code={`:: Criar entrada de informação
eventcreate /T INFORMATION /ID 100 /L Application /SO "MeuScript\" /D \"Backup concluido com sucesso\"

:: Criar entrada de erro
eventcreate /T ERROR /ID 999 /L Application /SO "MeuScript\" /D \"Falha ao conectar banco de dados\"`} />
      </AlertBox>
    </PageContainer>
  );
}