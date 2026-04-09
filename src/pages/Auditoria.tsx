import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { Shield, FileText, Search, Settings, Lock } from "lucide-react";

  export default function Auditoria() {
    return (
      <PageContainer
        title="Auditoria e Políticas de Segurança"
        subtitle="Configure auditoria de eventos com AUDITPOL, aplique políticas de segurança com SECEDIT e analise logs de segurança pelo CMD."
        difficulty="avancado"
        timeToRead="40 min"
      >
        <h2><Shield className="inline-block mr-2 mb-1 w-5 h-5" /> AUDITPOL — Política de Auditoria</h2>
        <p>O <code>AUDITPOL</code> configura quais eventos de segurança o Windows deve registrar no Log de Eventos de Segurança. É a ferramenta essencial para conformidade (LGPD, ISO 27001, PCI-DSS) e investigação forense.</p>

        <AlertBox type="info" title="Requisitos">
          Requer privilégios de Administrador. As políticas de auditoria são aplicadas localmente ou via GPO em domínios Active Directory.
        </AlertBox>

        <CodeBlock language="batch" title="Ver e configurar políticas de auditoria" code={`:: Ver todas as categorias de auditoria e seu estado
  auditpol /get /category:*
  :: Saída:
  :: Logon/Logoff               Success and Failure
  :: Account Logon              Success and Failure
  :: Object Access              No Auditing
  :: Privilege Use              No Auditing
  :: ...

  :: Ver categoria específica
  auditpol /get /category:"Logon/Logoff"
  auditpol /get /category:"Object Access"
  auditpol /get /subcategory:"Logon"

  :: Configurar auditoria de logon (sucesso E falha)
  auditpol /set /subcategory:"Logon" /success:enable /failure:enable

  :: Auditar tentativas de logon falhas (detectar ataques brute force)
  auditpol /set /subcategory:"Logon" /failure:enable

  :: Auditar acesso a arquivos (Object Access)
  auditpol /set /category:"Object Access" /success:enable /failure:enable

  :: Auditar alterações de conta de usuário
  auditpol /set /category:"Account Management" /success:enable /failure:enable

  :: Auditar uso de privilégios (escalada de privilégio)
  auditpol /set /category:"Privilege Use" /success:enable /failure:enable

  :: Auditar alterações de política
  auditpol /set /category:"Policy Change" /success:enable

  :: Desabilitar auditoria de uma categoria
  auditpol /set /category:"Object Access" /success:disable /failure:disable`} />

        <CodeBlock language="batch" title="Backup e restauração de políticas de auditoria" code={`:: Exportar política de auditoria para arquivo CSV
  auditpol /backup /file:C:\Backup\auditpol-backup.csv

  :: Restaurar política de auditoria
  auditpol /restore /file:C:\Backup\auditpol-backup.csv

  :: Exportar política de um domínio (requer permissões)
  auditpol /get /category:* /r > C:\Relatorios\auditpol-relatorio.csv

  :: Ver política de auditoria de recurso (arquivo/pasta)
  auditpol /get /subcategory:"File System"
  auditpol /get /subcategory:"Registry"`} />

        <h2><FileText className="inline-block mr-2 mb-1 w-5 h-5" /> Analisar Logs de Segurança</h2>
        <CodeBlock language="batch" title="Analisar eventos do log de segurança" code={`:: Ver últimos 20 eventos de segurança
  wevtutil qe Security /c:20 /f:text

  :: Buscar tentativas de login falhadas (Event ID 4625)
  wevtutil qe Security /q:"*[System[EventID=4625]]" /c:10 /f:text

  :: Buscar logins bem-sucedidos (Event ID 4624)
  wevtutil qe Security /q:"*[System[EventID=4624]]" /c:10 /f:text

  :: Buscar criação de conta de usuário (Event ID 4720)
  wevtutil qe Security /q:"*[System[EventID=4720]]" /c:10 /f:text

  :: Buscar alterações de grupo (Event ID 4728 = adicionado ao grupo)
  wevtutil qe Security /q:"*[System[EventID=4728]]" /c:10 /f:text

  :: Buscar uso de privilégio especial (Event ID 4672)
  wevtutil qe Security /q:"*[System[EventID=4672]]" /c:10 /f:text

  :: Eventos de auditoria importantes:
  :: 4624 = Login bem-sucedido
  :: 4625 = Login falhado
  :: 4634 = Logoff
  :: 4648 = Login com credenciais explícitas (runas)
  :: 4720 = Conta de usuário criada
  :: 4722 = Conta de usuário habilitada
  :: 4723 = Tentativa de trocar senha
  :: 4726 = Conta de usuário deletada
  :: 4740 = Conta bloqueada (brute force!)
  :: 4776 = Validação de credencial NTLM`} />

        <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> SECEDIT — Políticas de Segurança</h2>
        <p>O <code>SECEDIT</code> permite analisar, configurar e exportar políticas de segurança do sistema local, incluindo políticas de senha, bloqueio de conta e privilégios de usuário.</p>

        <CodeBlock language="batch" title="Exportar e importar políticas de segurança" code={`:: Exportar configuração de segurança atual
  secedit /export /cfg C:\Backup\seguranca.cfg /areas SECURITYPOLICY

  :: Áreas disponíveis:
  :: SECURITYPOLICY = Política de contas e auditoria
  :: USER_RIGHTS    = Direitos de usuário (logon local, acesso remoto, etc.)
  :: REGKEYS        = Permissões do registro
  :: FILESTORE      = Permissões de sistema de arquivos
  :: SERVICES       = Configurações de serviço

  :: Importar/aplicar política de segurança
  secedit /configure /db C:\Windows\Temp\secedit.sdb /cfg C:\Backup\seguranca.cfg /areas SECURITYPOLICY

  :: Analisar sistema contra uma baseline de segurança
  secedit /analyze /db C:\Logs\secedit-analise.sdb /cfg C:\seguranca-baseline.cfg /log C:\Logs\secedit.log

  :: Ver resultado da análise
  secedit /export /db C:\Logs\secedit-analise.sdb /cfg C:\Logs\resultado-analise.cfg

  :: Restaurar política padrão do Windows
  secedit /configure /db C:\Windows\Temp\secedit.sdb /cfg %windir%\inf\defltbase.inf /log C:\Logs\secedit-reset.log`} />

        <h2><Lock className="inline-block mr-2 mb-1 w-5 h-5" /> Políticas de Senha e Bloqueio</h2>
        <CodeBlock language="batch" title="Configurar política de senhas" code={`:: Ver política de senhas atual
  net accounts
  :: Saída:
  :: Force user logoff how long after time expires?: Never
  :: Minimum password age (days): 1
  :: Maximum password age (days): 42
  :: Minimum password length: 7
  :: Length of password history maintained: 24
  :: Lockout threshold: Never
  :: Lockout duration (minutes): 30

  :: Configurar política de senhas
  net accounts /MINPWLEN:12      :: Mínimo 12 caracteres
  net accounts /MAXPWAGE:60      :: Expirar após 60 dias
  net accounts /MINPWAGE:1       :: Mínimo 1 dia entre trocas
  net accounts /UNIQUEPW:10      :: Não repetir as últimas 10 senhas

  :: Configurar bloqueio de conta (proteção contra brute force)
  net accounts /lockoutthreshold:5    :: Bloquear após 5 tentativas
  net accounts /lockoutduration:30    :: Bloquear por 30 minutos
  net accounts /lockoutwindow:30      :: Janela de observação: 30 min

  :: Para políticas mais detalhadas (complexidade, histórico), use:
  :: gpedit.msc → Configurações de Segurança → Políticas de Conta`} />

        <h3>Script: Relatório de Segurança</h3>
        <CodeBlock language="batch" title="relatorio-seguranca.bat — Auditoria rápida" code={`@echo off
  set LOG=C:\Relatorios\seguranca-%date:~6,4%%date:~3,2%%date:~0,2%.txt

  echo ===== RELATÓRIO DE SEGURANÇA ===== > "%LOG%"
  echo Gerado em: %DATE% %TIME% >> "%LOG%"
  echo. >> "%LOG%"

  echo [POLÍTICA DE SENHAS] >> "%LOG%"
  net accounts >> "%LOG%"

  echo. >> "%LOG%"
  echo [CONTAS DE ADMINISTRADOR LOCAL] >> "%LOG%"
  net localgroup Administrators >> "%LOG%"

  echo. >> "%LOG%"
  echo [CONTAS DESABILITADAS] >> "%LOG%"
  net user | findstr /v "command" >> "%LOG%"

  echo. >> "%LOG%"
  echo [SERVIÇOS CRÍTICOS] >> "%LOG%"
  sc query Spooler >> "%LOG%"
  sc query WinDefend >> "%LOG%"

  echo. >> "%LOG%"
  echo [ÚLTIMA VERIFICAÇÃO DE AUDITORIA] >> "%LOG%"
  auditpol /get /category:"Logon/Logoff" >> "%LOG%"

  echo Relatório salvo em: %LOG%
  start "%LOG%"
  pause`} />

        <AlertBox type="warning" title="Conformidade e Compliance">
          Para conformidade com a LGPD, configure no mínimo: auditoria de logon (sucesso e falha), auditoria de gerenciamento de contas, auditoria de alterações de política. Mantenha os logs por pelo menos 6 meses e defina uma política de rotação.
        </AlertBox>
      </PageContainer>
    );
  }