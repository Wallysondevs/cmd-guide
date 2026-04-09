import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { HardDrive, Clock, RefreshCcw, Shield, Archive, Settings } from "lucide-react";

  export default function Backup() {
    return (
      <PageContainer
        title="Backup e Shadow Copies"
        subtitle="Proteja seus dados com WBADMIN para backup completo do Windows e VSSADMIN para gerenciar cópias de sombra (Shadow Copies) do Volume."
        difficulty="avancado"
        timeToRead="40 min"
      >
        <h2><Archive className="inline-block mr-2 mb-1 w-5 h-5" /> WBADMIN — Windows Server Backup</h2>
        <p>O <code>WBADMIN</code> é a ferramenta de linha de comando do Windows Backup, disponível no Windows 7/8/10/11 e no Windows Server. Permite fazer backups completos do sistema, do estado do sistema e de volumes específicos.</p>

        <AlertBox type="warning" title="Requisitos">
          O WBADMIN requer privilégios de Administrador. No Windows 10/11 Home, algumas funcionalidades são limitadas. Para backup completo, instale o recurso Windows Backup: <code>DISM /Online /Enable-Feature /FeatureName:WindowsServerBackup</code>
        </AlertBox>

        <CodeBlock language="batch" title="Backup de volumes e do sistema" code={`:: Ver versões de backup existentes
  wbadmin get versions

  :: Criar backup completo do volume C: para D:
  wbadmin start backup -backupTarget:D: -include:C: -allCritical -quiet

  :: Backup apenas de pastas específicas
  wbadmin start backup -backupTarget:D: -include:C:\\Dados,C:\\Projetos -quiet

  :: Backup do estado do sistema (System State)
  :: Inclui: registro, AD (se servidor), arquivos do boot, etc.
  wbadmin start systemstatebackup -backupTarget:D: -quiet

  :: Backup para compartilhamento de rede
  wbadmin start backup -backupTarget:\\SERVIDOR\\Backup -include:C: -allCritical -quiet -user:dominio\\admin -password:senha

  :: Listar backups existentes no destino
  wbadmin get versions -backupTarget:D:

  :: Ver detalhes de um backup específico
  wbadmin get items -version:09/04/2026-10:00`} />

        <CodeBlock language="batch" title="Restaurar arquivos e volumes" code={`:: Restaurar arquivo específico
  wbadmin start recovery -version:09/04/2026-10:00 -items:C:\\Dados\\relatorio.xlsx -itemtype:File -recoveryTarget:C:\\Recuperados\\ -quiet

  :: Restaurar pasta inteira
  wbadmin start recovery -version:09/04/2026-10:00 -items:C:\\Dados -itemtype:File -recoveryTarget:D:\\Recuperados -quiet

  :: Restaurar volume completo (cuidado!)
  wbadmin start recovery -version:09/04/2026-10:00 -items:C: -itemtype:Volume -recoveryTarget:E: -quiet

  :: Restaurar estado do sistema
  wbadmin start systemstaterecovery -version:09/04/2026-10:00 -quiet

  :: Excluir versão de backup antiga
  wbadmin delete backup -version:09/04/2026-10:00 -quiet`} />

        <h2><HardDrive className="inline-block mr-2 mb-1 w-5 h-5" /> VSSADMIN — Volume Shadow Copy Service</h2>
        <p>O <code>VSSADMIN</code> gerencia as Cópias de Sombra (Shadow Copies) — snapshots silenciosos do volume que permitem recuperar versões anteriores de arquivos sem precisar de backup completo.</p>

        <CodeBlock language="batch" title="Gerenciar Shadow Copies" code={`:: Listar todas as shadow copies existentes
  vssadmin list shadows
  vssadmin list shadows /for=C:

  :: Ver provedores VSS instalados
  vssadmin list providers

  :: Ver volumes com shadow copies configuradas
  vssadmin list volumes

  :: Criar shadow copy manualmente
  vssadmin create shadow /for=C:
  :: Saída:
  :: Successfully created shadow copy for 'C:\\'
  ::     Shadow Copy ID: {12345678-abcd-1234-abcd-123456789012}
  ::     Shadow Copy Volume Name: \\?\\GLOBALROOT\\Device\\HarddiskVolumeShadowCopy1

  :: Montar shadow copy para navegar nela
  :: Substitua o \\?\\ pelo nome retornado acima:
  mklink /d C:\\ShadowMount \\?\\GLOBALROOT\\Device\\HarddiskVolumeShadowCopy1\\
  :: Agora acesse C:\\ShadowMount como se fosse o snapshot do C:

  :: Deletar shadow copies antigas
  vssadmin delete shadows /for=C: /oldest   :: Delete a mais antiga
  vssadmin delete shadows /for=C: /all      :: Delete todas (CUIDADO!)
  vssadmin delete shadows /shadow={guid}    :: Delete por ID`} />

        <CodeBlock language="batch" title="Configurar limites de armazenamento VSS" code={`:: Ver espaço usado pelas shadow copies
  vssadmin list shadowstorage

  :: Definir espaço máximo para shadow copies (10% do volume)
  vssadmin resize shadowstorage /for=C: /on=C: /maxsize=10%

  :: Definir tamanho fixo (20GB)
  vssadmin resize shadowstorage /for=C: /on=D: /maxsize=20GB

  :: Ver configuração atual
  vssadmin list shadowstorage /for=C:`} />

        <h2><Clock className="inline-block mr-2 mb-1 w-5 h-5" /> Agendar Backups Automáticos</h2>
        <CodeBlock language="batch" title="Backup automático diário com Task Scheduler" code={`:: Criar tarefa de backup diário às 23:00
  schtasks /create ^
      /tn "Backup Diario" ^
      /tr "wbadmin start backup -backupTarget:D: -include:C: -allCritical -quiet" ^
      /sc daily ^
      /st 23:00 ^
      /ru "SYSTEM" ^
      /rl highest

  :: Criar tarefa de shadow copy diária (via POWERSHELL)
  schtasks /create ^
      /tn "Shadow Copy Diario" ^
      /tr "powershell -Command "(Get-WmiObject Win32_ShadowCopy).Create('C:\\', 'ClientAccessible')"" ^
      /sc daily ^
      /st 12:00 ^
      /ru "SYSTEM" ^
      /rl highest

  :: Verificar tarefas criadas
  schtasks /query /tn "Backup Diario"
  schtasks /query /tn "Shadow Copy Diario"`} />

        <h3>Script: Backup Completo com Log</h3>
        <CodeBlock language="batch" title="backup-diario.bat — Backup com log e verificação" code={`@echo off
  setlocal

  :: Configurações
  set DESTINO=D:\\Backups
  set LOG=D:\\Logs\\backup.log
  set MANTER_DIAS=30

  :: Timestamp
  for /f %%t in ('powershell -Command "Get-Date -Format yyyyMMdd_HHmm"') do set STAMP=%%t

  echo [%STAMP%] Iniciando backup... >> "%LOG%"

  :: Criar backup
  wbadmin start backup -backupTarget:%DESTINO% -include:C: -allCritical -quiet
  if %ERRORLEVEL% EQU 0 (
      echo [%STAMP%] SUCESSO no backup >> "%LOG%"
  ) else (
      echo [%STAMP%] ERRO no backup - código %ERRORLEVEL% >> "%LOG%"
      exit /b 1
  )

  :: Limpar backups mais antigos que 30 dias
  forfiles /p "%DESTINO%" /d -%MANTER_DIAS% /c "cmd /c if @isdir==TRUE rmdir /s /q @path" 2>nul

  echo [%STAMP%] Backup concluído >> "%LOG%"
  endlocal`} />

        <h2><Shield className="inline-block mr-2 mb-1 w-5 h-5" /> Recuperação de Arquivos via Versões Anteriores</h2>
        <CodeBlock language="batch" title="Acessar versões anteriores de arquivos" code={`:: Listar versões anteriores de uma pasta (via PowerShell)
  powershell -Command "
      (Get-Item 'C:\\Dados').PSPath | Get-Item | 
      % { (Get-ItemProperty \\$_.PSPath).PSChildName }
  "

  :: Via interface gráfica: clique direito na pasta → Restaurar versões anteriores

  :: Listar shadow copies como drives montáveis
  vssadmin list shadows /for=C: | findstr "Shadow Copy Volume"

  :: Script para listar todos os arquivos numa shadow copy
  set SC_PATH=\\?\\GLOBALROOT\\Device\\HarddiskVolumeShadowCopy1
  dir "%SC_PATH%\\Users\\Joao\\Documentos\\" /s /b 2>nul`} />

        <AlertBox type="warning" title="Ransomware e Shadow Copies">
          Ransomwares geralmente executam <code>vssadmin delete shadows /all</code> logo após a infecção para impedir a recuperação. Mantenha backups externos (offsite) e desconectados da rede. O backup externo é a única proteção garantida contra ransomware.
        </AlertBox>

        <AlertBox type="info" title="Volume Shadow Copy vs Windows Backup">
          As Shadow Copies são snapshots locais e rápidos — ótimos para recuperação acidental de arquivos. O WBADMIN faz backup completo em outro volume/rede — essencial para disaster recovery. Use ambos: shadow copies para recuperação rápida do dia a dia, backup completo para proteção total.
        </AlertBox>
      </PageContainer>
    );
  }