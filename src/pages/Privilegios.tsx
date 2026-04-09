import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { Shield, User, Key, Lock, Settings } from "lucide-react";

  export default function Privilegios() {
    return (
      <PageContainer
        title="Privilégios, TAKEOWN e RUNAS"
        subtitle="Tome posse de arquivos bloqueados com TAKEOWN, execute processos como outro usuário com RUNAS e entenda como funciona o UAC."
        difficulty="avancado"
        timeToRead="30 min"
      >
        <h2><Key className="inline-block mr-2 mb-1 w-5 h-5" /> TAKEOWN — Tomar Posse de Arquivos</h2>
        <p>O <code>TAKEOWN</code> transfere a propriedade de arquivos e pastas para o usuário atual ou para Administradores. Essencial quando você precisa acessar arquivos de sistema, arquivos de outro usuário ou arquivos de uma instalação anterior do Windows.</p>

        <AlertBox type="warning" title="Atenção">
          Tomar posse de arquivos do sistema pode causar instabilidade. Sempre faça backup antes. Use apenas quando necessário.
        </AlertBox>

        <CodeBlock language="batch" title="Tomar posse de arquivos e pastas" code={`:: Tomar posse de um arquivo
  takeown /f C:\arquivo-bloqueado.txt

  :: Tomar posse de uma pasta inteira (recursivo)
  takeown /f C:\PastaProtegida\ /r /d y
  :: /r = recursivo, /d y = responde "sim" automaticamente

  :: Tomar posse e atribuir ao grupo Administradores
  takeown /f C:\PastaProtegida\ /r /a /d y
  :: /a = atribui ao grupo Administradores (não ao usuário atual)

  :: Tomar posse de arquivo de sistema do Windows
  takeown /f C:\Windows\System32\arquivo.dll

  :: Depois de tomar posse, conceder permissão total de acesso
  icacls C:\arquivo-bloqueado.txt /grant Administrators:F
  icacls C:\PastaProtegida\ /grant Administrators:F /t
  :: /t = recursivo em subpastas e arquivos

  :: Caso de uso: acessar arquivos da pasta Windows.old após upgrade
  takeown /f C:\Windows.old\ /r /d y
  icacls C:\Windows.old\ /grant Administrators:F /t`} />

        <CodeBlock language="batch" title="Restaurar permissões originais" code={`:: Restaurar proprietário original (SYSTEM)
  icacls C:\Windows\System32\arquivo.dll /setowner "NT AUTHORITY\SYSTEM"

  :: Restaurar permissões padrão de arquivo de sistema
  icacls C:\Windows\System32\arquivo.dll /reset

  :: Ver proprietário atual de arquivos
  icacls C:\PastaProtegida\ /c | findstr "owner:"

  :: Restaurar permissões de toda a pasta Windows (perigoso!)
  :: icacls C:\Windows /reset /t /c /q
  :: Só use isso se souber o que está fazendo`} />

        <h2><User className="inline-block mr-2 mb-1 w-5 h-5" /> RUNAS — Executar como Outro Usuário</h2>
        <p>O <code>RUNAS</code> executa programas com as credenciais de outro usuário, similar ao "sudo" do Linux. Útil para executar tarefas administrativas sem fazer logout, ou para testar permissões de outras contas.</p>

        <CodeBlock language="batch" title="Executar programas como administrador ou outro usuário" code={`:: Executar CMD como Administrador
  runas /user:Administrator cmd.exe

  :: Executar programa como usuário de domínio
  runas /user:empresa\admin "C:\Ferramentas\admin-tool.exe"

  :: Executar com usuário local
  runas /user:joao "notepad.exe C:\config.ini"

  :: Executar sem carregar perfil do usuário (mais rápido)
  runas /user:admin /noprofile cmd.exe

  :: Executar salvando credenciais (evitar digitar senha toda vez)
  runas /user:admin /savecred cmd.exe
  :: Na primeira execução, pede a senha. Depois usa credencial salva.

  :: Listar credenciais salvas
  cmdkey /list

  :: Salvar credenciais manualmente
  cmdkey /add:servidor /user:admin /pass:senha

  :: Remover credencial salva
  cmdkey /delete:servidor

  :: Executar script batch como administrador via PowerShell
  powershell -Command "Start-Process cmd.exe -ArgumentList '/c meu-script.bat' -Verb RunAs"`} />

        <h2><Shield className="inline-block mr-2 mb-1 w-5 h-5" /> UAC — Controle de Conta de Usuário</h2>
        <CodeBlock language="batch" title="Verificar nível de privilégio atual" code={`:: Verificar se o CMD atual tem privilégios de admin
  net session >nul 2>&1
  if %errorLevel% == 0 (
      echo Executando como ADMINISTRADOR
  ) else (
      echo Executando como USUARIO NORMAL
  )

  :: Alternativa com whoami
  whoami /groups | findstr /i "S-1-16-12288"
  :: S-1-16-12288 = Nível de integridade Alto (Administrador)

  :: Ver token de acesso do usuário atual
  whoami /all
  :: Mostra: grupos, privilégios habilitados, nível de integridade

  :: Privilégios importantes no whoami /priv:
  :: SeShutdownPrivilege      = Pode desligar o sistema
  :: SeRestorePrivilege       = Pode restaurar arquivos
  :: SeBackupPrivilege        = Pode fazer backup
  :: SeTakeOwnershipPrivilege = Pode tomar posse de objetos
  :: SeDebugPrivilege         = Pode depurar outros processos`} />

        <CodeBlock language="batch" title="Auto-elevar script para administrador" code={`@echo off
  :: Técnica para auto-elevar um script .bat para admin

  :: Verificar se já é admin
  net session >nul 2>&1
  if %errorLevel% == 0 goto :admin

  :: Não é admin - solicitar elevação
  echo Solicitando privilégios de administrador...
  powershell -Command "Start-Process '%~f0' -Verb RunAs"
  exit /b

  :admin
  echo Executando com privilégios de administrador!
  echo.

  :: Seu código aqui...
  echo Fazendo operação privilegiada...
  ipconfig /flushdns
  net stop Spooler
  net start Spooler

  pause`} />

        <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> Configurar UAC pelo CMD</h2>
        <CodeBlock language="batch" title="Gerenciar configurações do UAC" code={`:: Ver nível do UAC (0=desligado, 1=baixo, 2=médio, 3=alto)
  reg query HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System /v ConsentPromptBehaviorAdmin
  :: Valores:
  :: 0 = Elevar sem prompt (sem UAC)
  :: 1 = Pedir credenciais na área de trabalho segura
  :: 2 = Pedir confirmação na área de trabalho segura
  :: 5 = Pedir confirmação (padrão — somente para apps externos)

  :: Desativar UAC (NÃO RECOMENDADO - risco de segurança)
  reg add HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System /v EnableLUA /t REG_DWORD /d 0 /f

  :: Reativar UAC
  reg add HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System /v EnableLUA /t REG_DWORD /d 1 /f

  :: Configurar para nunca mostrar prompt de UAC (para admins)
  reg add HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System /v ConsentPromptBehaviorAdmin /t REG_DWORD /d 0 /f

  :: Resetar UAC para padrão
  reg add HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System /v ConsentPromptBehaviorAdmin /t REG_DWORD /d 5 /f

  :: Requer reinicialização para efetivar`} />

        <AlertBox type="warning" title="Nunca desative o UAC em produção">
          O UAC é uma das proteções mais importantes do Windows. Desativá-lo permite que malwares se instalem sem confirmação. Em ambiente corporativo, configure via GPO: <code>Configuração do Computador → Configurações do Windows → Configurações de Segurança → Políticas Locais → Opções de Segurança</code>.
        </AlertBox>
      </PageContainer>
    );
  }