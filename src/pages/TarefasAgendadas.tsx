import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Clock, Calendar, Settings, Play } from "lucide-react";

export default function TarefasAgendadas() {
  return (
    <PageContainer
      title="Tarefas Agendadas Avançado"
      subtitle="Agende scripts, configure gatilhos complexos, gerencie tarefas por linha de comando e monitore execuções com SCHTASKS."
      difficulty="intermediario"
      timeToRead="30 min"
    >
      <h2><Clock className="inline-block mr-2 mb-1 w-5 h-5" /> SCHTASKS — Criar Tarefas Agendadas</h2>
      <p>O <code>SCHTASKS</code> é a interface de linha de comando para o Agendador de Tarefas do Windows. Permite criar, modificar, executar e excluir tarefas agendadas.</p>

      <h3>Criar Tarefas com Diferentes Gatilhos</h3>
      <CodeBlock language="batch" title="Criar tarefas com vários tipos de agendamento" code={`:: Executar diariamente às 14:30
schtasks /create /tn "Backup Diario\" /tr \"C:\\Scripts\backup.bat\" /sc daily /st 14:30 /f

:: Executar a cada hora
schtasks /create /tn "Limpeza Hourly\" /tr \"C:\\Scripts\\limpar.bat\" /sc hourly /mo 1 /f

:: Executar a cada 15 minutos
schtasks /create /tn "Monitor15min\" /tr \"C:\\Scripts\\monitor.bat\" /sc minute /mo 15 /f

:: Executar na inicialização do Windows (requer admin)
schtasks /create /tn "StartupTask\" /tr \"C:\\Scripts\\startup.bat\" /sc onstart /ru SYSTEM /f

:: Executar no login do usuário
schtasks /create /tn "LoginScript\" /tr \"C:\\Scripts\\login.bat\" /sc onlogon /ru %USERNAME% /f

:: Executar uma vez em data/hora específica
schtasks /create /tn "EventoUnico\" /tr \"C:\\Scripts\\evento.bat\" /sc once /sd 31/12/2024 /st 23:00 /f

:: Executar semanalmente (segunda, quarta e sexta)
schtasks /create /tn "TarefaSemanal\" /tr \"C:\\Scripts\\semanal.bat\" /sc weekly /d MON,WED,FRI /st 08:00 /f

:: Executar mensalmente (dia 1 de cada mês)
schtasks /create /tn "RelatorioMensal\" /tr \"C:\\Scripts\relatorio.bat\" /sc monthly /d 1 /st 06:00 /f`} />

      <h3>Opções Avançadas de Criação</h3>
      <CodeBlock language="batch" title="Configurações extras de tarefas" code={`:: Executar como SYSTEM (sem janela visível)
schtasks /create /tn "ServicoBG\" /tr \"C:\\Scripts\bg.bat\" /sc daily /st 03:00 /ru SYSTEM /f

:: Executar com outro usuário e senha
schtasks /create /tn "TarefaAdmin\" /tr \"C:\\Scripts\\admin.bat\" /sc daily /st 01:00 /ru \"DOMINIO\\admin\" /rp \"Senha@123\" /f

:: Executar sem armazenar senha (conta gerenciada)
schtasks /create /tn "TarefaGSA\" /tr \"C:\\Scripts\tarefa.bat\" /sc daily /st 02:00 /ru \"DOMINIO\\gsaMinhaConta$\" /np /f

:: Definir nível de execução (6 = mais alto privilégio)
schtasks /create /tn "TarefaAdmin\" /tr \"C:\\Scripts\\admin.bat\" /sc daily /st 00:00 /rl HIGHEST /f`} />

      <h2><Calendar className="inline-block mr-2 mb-1 w-5 h-5" /> Gerenciar Tarefas Existentes</h2>
      <CodeBlock language="batch" title="Listar, modificar e excluir tarefas" code={`:: Listar todas as tarefas
schtasks /query

:: Listar com detalhes
schtasks /query /fo list /v

:: Listar em formato CSV (para análise)
schtasks /query /fo csv > C:\tarefas.csv

:: Filtrar por nome
schtasks /query /tn "Backup*\" /fo list

:: Executar imediatamente (para testes)
schtasks /run /tn "Backup Diario\"

:: Pausar tarefa
schtasks /change /tn "Backup Diario\" /disable

:: Reativar tarefa
schtasks /change /tn "Backup Diario\" /enable

:: Modificar horário
schtasks /change /tn "Backup Diario\" /st 03:00

:: Excluir tarefa
schtasks /delete /tn "Backup Diario\" /f`} />

      <h2><Play className="inline-block mr-2 mb-1 w-5 h-5" /> Verificar Histórico de Execuções</h2>
      <CodeBlock language="batch" title="Monitorar execuções de tarefas" code={`:: Ver última execução e resultado
schtasks /query /tn "Backup Diario\" /fo list | findstr \"Last Run|Status|Result\"

:: Ver histórico completo no Event Log
wevtutil qe "Microsoft-Windows-TaskScheduler/Operational\" /c:20 /rd:true /f:text

:: Ver apenas falhas de tarefas agendadas
wevtutil qe "Microsoft-Windows-TaskScheduler/Operational\" /q:\"*[EventData[Data[@Name='ResultCode']!='0']]\" /f:text /c:10

:: Listar tarefas que falharam
schtasks /query /fo csv | findstr ",1,\"`} />

      <h3>Script: Criar Múltiplas Tarefas</h3>
      <CodeBlock language="batch" title="setup-tarefas.bat — Configurar tarefas de uma vez" code={`@echo off
echo Configurando tarefas agendadas...

:: Backup diário às 3h
schtasks /create /tn "\\Empresa\\Backup Diario\" /tr \"C:\\Scripts\backup.bat\" /sc daily /st 03:00 /ru SYSTEM /f
echo [OK] Backup Diario configurado

:: Monitor a cada 5 minutos
schtasks /create /tn "\\Empresa\\Monitor Sistema\" /tr \"C:\\Scripts\\monitor.bat\" /sc minute /mo 5 /ru SYSTEM /f
echo [OK] Monitor Sistema configurado

:: Relatório semanal (segunda às 8h)
schtasks /create /tn "\\Empresa\\Relatorio Semanal\" /tr \"C:\\Scripts\relatorio.bat\" /sc weekly /d MON /st 08:00 /f
echo [OK] Relatorio Semanal configurado

:: Limpeza mensal (dia 1 às 2h)
schtasks /create /tn "\\Empresa\\Limpeza Mensal\" /tr \"C:\\Scripts\\limpeza.bat\" /sc monthly /d 1 /st 02:00 /ru SYSTEM /f
echo [OK] Limpeza Mensal configurada

echo.
echo Tarefas configuradas:
schtasks /query /fo table | findstr "\\Empresa"
pause`} />

      <AlertBox type="info" title="Organizar Tarefas em Pastas">
        Use barras invertidas duplas no nome da tarefa para criar hierarquias: <code>/tn "\MinhaEmpresa\TI\Backup"</code>. Isso organiza as tarefas em pastas no Agendador de Tarefas.
      </AlertBox>

      <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> Abrir Interface Gráfica</h2>
      <CodeBlock language="batch" title="Abrir Agendador de Tarefas" code={`:: Abrir Agendador de Tarefas (GUI)
taskschd.msc

:: Ou pelo painel de controle
control schedtasks`} />
    </PageContainer>
  );
}