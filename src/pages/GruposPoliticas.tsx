import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Shield, Settings, Search, Users } from "lucide-react";

export default function GruposPoliticas() {
  return (
    <PageContainer
      title="Políticas de Grupo (Group Policy)"
      subtitle="Aplique, visualize e diagnostique Group Policies com GPUPDATE, GPRESULT e SECEDIT pelo Prompt de Comando."
      difficulty="avancado"
      timeToRead="28 min"
    >
      <h2><Shield className="inline-block mr-2 mb-1 w-5 h-5" /> GPUPDATE — Aplicar Políticas</h2>
      <p>O <code>GPUPDATE</code> força a aplicação imediata das Políticas de Grupo (Group Policy Objects) em um computador ou usuário.</p>

      <CodeBlock language="batch" title="Aplicar e forçar políticas de grupo" code={`:: Atualizar políticas de usuário e computador
gpupdate

:: Forçar reaplicação mesmo que não tenham mudado
gpupdate /force

:: Atualizar apenas políticas de computador
gpupdate /target:computer

:: Atualizar apenas políticas de usuário
gpupdate /target:user

:: Atualizar e reiniciar se necessário
gpupdate /force /boot

:: Atualizar em computador remoto (via PowerShell)
powershell -Command "Invoke-GPUpdate -Computer 'PC-JOAO' -Force\"

:: Aguardar aplicação com timeout
gpupdate /wait:60`} />

      <h2><Search className="inline-block mr-2 mb-1 w-5 h-5" /> GPRESULT — Ver Políticas Aplicadas</h2>
      <p>O <code>GPRESULT</code> exibe o Resultado da Política de Grupo (RSoP) — quais GPOs estão sendo aplicadas e com quais configurações.</p>

      <CodeBlock language="batch" title="Verificar políticas aplicadas" code={`:: Ver resumo das políticas aplicadas
gpresult /r

:: Ver políticas de computador
gpresult /scope computer /r

:: Ver políticas do usuário atual
gpresult /scope user /r

:: Gerar relatório HTML completo
gpresult /h C:\\Logs\\gpo-report.html /f

:: Gerar relatório XML
gpresult /x C:\\Logs\\gpo-report.xml /f

:: Ver políticas de outro usuário
gpresult /r /user dominio\\outro.usuario

:: Ver políticas de computador remoto
gpresult /r /s NomeComputador

:: Ver versão das GPOs
gpresult /r | findstr "Group Policy\"`} />

      <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> SECEDIT — Segurança e Configurações</h2>
      <CodeBlock language="batch" title="Analisar e configurar segurança" code={`:: Analisar configurações de segurança atuais
secedit /analyze /db C:\\Temp\\secedit.db /log C:\\Logs\\secedit.log

:: Exportar configurações de segurança atuais
secedit /export /cfg C:\\Logs\\seguranca-atual.inf

:: Configurar segurança a partir de template
secedit /configure /db C:\\Temp\\secedit.db /cfg C:\\Templates\\seguranca.inf

:: Ver templates de segurança disponíveis
dir C:\\Windows\\security\templates\\*.inf

:: Validar template de segurança
secedit /validate C:\\Templates\\meu-template.inf`} />

      <h3>Verificar e Resolver Problemas de GPO</h3>
      <CodeBlock language="batch" title="Diagnóstico de problemas de Group Policy" code={`:: Ver log de aplicação de GPO
wevtutil qe "Microsoft-Windows-GroupPolicy/Operational\" /c:20 /rd:true /f:text

:: Ver erros de GPO
wevtutil qe "Microsoft-Windows-GroupPolicy/Operational\" /q:\"*[System[Level=2 or Level=3]]\" /f:text /c:20

:: Verificar replicação de SYSVOL (domain controllers)
dcdiag /test:replications

:: Testar conectividade com domain controller
nltest /dsgetdc:DOMINIO

:: Ver detalhes do domínio
nltest /domain_trusts

:: Verificar registro de grupo
net accounts /domain`} />

      <h2><Users className="inline-block mr-2 mb-1 w-5 h-5" /> Configurações via Registro (Policy)</h2>
      <CodeBlock language="batch" title="Aplicar políticas via registro" code={`:: Caminho de políticas no registro:
:: HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows — Políticas de computador
:: HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows — Políticas de usuário

:: Desativar painel de controle para usuário
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer\" /v NoControlPanel /t REG_DWORD /d 1 /f

:: Desativar CMD (política de computador)
reg add "HKLM\\Software\\Policies\\Microsoft\\Windows\\System\" /v DisableCMD /t REG_DWORD /d 1 /f

:: Remover opção de desligar do menu iniciar
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer\" /v NoClose /t REG_DWORD /d 1 /f

:: Restaurar (deletar as entradas)
reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer\" /v NoControlPanel /f`} />

      <AlertBox type="info" title="GPEDIT.MSC — Editor de Política de Grupo Local">
        Para editar GPOs locais via interface gráfica (disponível no Windows Pro/Enterprise):
        <CodeBlock language="batch" title="Abrir editor de GPO" code={`:: Abrir editor de política de grupo local
gpedit.msc

:: Abrir para computador específico (remoto)
mmc.exe gpedit.msc /target:remote`} />
      </AlertBox>

      <h3>Script: Diagnóstico Completo de GPO</h3>
      <CodeBlock language="batch" title="diagnostico-gpo.bat" code={`@echo off
echo === DIAGNOSTICO DE GROUP POLICY ===
echo Data: %date% %time%
echo Computador: %COMPUTERNAME%
echo Usuario: %USERNAME%
echo.

echo [1] Gerando relatorio HTML...
gpresult /h C:\\Logs\\gpo-%COMPUTERNAME%.html /f 2>nul
if exist C:\\Logs\\gpo-%COMPUTERNAME%.html (
    echo Relatorio salvo em: C:\\Logs\\gpo-%COMPUTERNAME%.html
    start C:\\Logs\\gpo-%COMPUTERNAME%.html
) else (
    echo ERRO ao gerar relatorio. Verifique privilegios.
)
echo.

echo [2] GPOs aplicadas (resumo):
gpresult /r 2>nul | findstr "Applied Group Policy"
echo.

echo [3] Erros de GPO recentes:
wevtutil qe "Microsoft-Windows-GroupPolicy/Operational\" /q:\"*[System[Level=2]]\" /c:5 /f:text /rd:true 2>nul | findstr \"Description"
echo.

echo Diagnostico concluido!
pause`} />
    </PageContainer>
  );
}