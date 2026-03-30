import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Zap, Shield, Settings, Code } from "lucide-react";

export default function ProducaoScript() {
  return (
    <PageContainer
      title="Scripts Prontos para Produção"
      subtitle="Templates e scripts profissionais completos e reutilizáveis para automação de tarefas comuns do Windows."
      difficulty="avancado"
      timeToRead="45 min"
    >
      <h2><Shield className="inline-block mr-2 mb-1 w-5 h-5" /> Template Base de Script Profissional</h2>
      <p>Todo script profissional deve incluir: verificação de admin, logging, tratamento de erros, e documentação de uso.</p>

      <CodeBlock language="batch" title="template-script.bat — Base para todo script profissional" code={`@echo off
setlocal EnableDelayedExpansion EnableExtensions

:: ================================================================
:: Script: template-script.bat
:: Versao: 1.0.0
:: Autor:  Seu Nome
:: Data:   %date%
:: Descricao: Template profissional com boas práticas
:: Uso: template-script.bat [param1] [param2]
:: ================================================================

:: --- CONFIGURAÇÃO ---
set NOME_SCRIPT=%~nx0
set DIR_SCRIPT=%~dp0
set LOG_DIR=%DIR_SCRIPT%logs
set LOG_FILE=%LOG_DIR%\\%NOME_SCRIPT:~0,-4%_%date:~6,4%%date:~3,2%%date:~0,2%.log
set VERSAO=1.0.0

:: --- INICIALIZAÇÃO ---
call :CriarDirLog
call :Log "INFO\" \"=== INICIO: %NOME_SCRIPT% v%VERSAO% ==="
call :Log "INFO\" \"Parametros: %*"
call :Log "INFO\" \"Usuario: %USERNAME% | Computador: %COMPUTERNAME%\"

:: --- VERIFICAR ADMIN (se necessário) ---
:: call :VerificarAdmin

:: --- VALIDAR PARÂMETROS ---
if "%~1\"=="\" (
    call :Uso
    exit /b 1
)

:: ================================================================
:: LÓGICA PRINCIPAL AQUI
:: ================================================================

call :Log "INFO\" \"Processando parametro: %~1\"

:: Exemplo: verificar se arquivo existe
if not exist "%~1\" (
    call :Log "ERROR\" \"Arquivo nao encontrado: %~1"
    exit /b 2
)

call :Log "INFO\" \"Arquivo encontrado, processando...\"

:: Seu código aqui...

call :Log "INFO\" \"=== CONCLUIDO COM SUCESSO ==="
exit /b 0

:: ================================================================
:: FUNÇÕES
:: ================================================================

:CriarDirLog
    if not exist "%LOG_DIR%" mkdir \"%LOG_DIR%\" 2>nul
    exit /b 0

:Log
    set _NIVEL=%~1
    set _MSG=%~2
    set _LINHA=[%date% %time:~0,8%] [%_NIVEL%] %_MSG%
    echo %_LINHA%
    echo %_LINHA% >> "%LOG_FILE%"
    exit /b 0

:VerificarAdmin
    net session >nul 2>&1
    if errorlevel 1 (
        call :Log "ERROR\" \"Este script requer privilegios de Administrador"
        echo.
        echo Execute o CMD como Administrador e tente novamente.
        pause
        exit /b 1
    )
    exit /b 0

:Uso
    echo.
    echo Uso: %NOME_SCRIPT% [arquivo]
    echo.
    echo Exemplos:
    echo   %NOME_SCRIPT% C:\\dados.txt
    echo   %NOME_SCRIPT% "C:\\pasta com espacos\\arquivo.txt"
    echo.
    exit /b 0`} />

      <h2><Zap className="inline-block mr-2 mb-1 w-5 h-5" /> Script: Backup Completo Empresarial</h2>
      <CodeBlock language="batch" title="backup-empresarial.bat" code={`@echo off
setlocal EnableDelayedExpansion

:: Configurações
set DADOS=D:\\DadosEmpresa
set BACKUP=\\fileserver\\Backups
set RETENCAO_DIAS=30
set LOG=C:\\Logs\backup-%date:~6,4%%date:~3,2%%date:~0,2%.log
set DATA=%date:~6,4%-%date:~3,2%-%date:~0,2%

echo Backup Empresarial - %DATE% %TIME% > %LOG%

:: Verificar servidor disponível
ping -n 1 fileserver >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Servidor de backup nao acessivel >> %LOG%
    exit /b 1
)

:: Fazer backup por departamento
for %%D in (TI RH Financeiro Comercial) do (
    set ORIGEM=%DADOS%\\%%D
    set DESTINO=%BACKUP%%DATA%\\%%D
    
    if exist "!ORIGEM!\" (
        echo [%%D] Iniciando backup... >> %LOG%
        robocopy "!ORIGEM!\" \"!DESTINO!\" /E /MT:8 /R:3 /W:5 /LOG+:%LOG% /NP
        echo [%%D] Concluido. ErrorLevel: !errorlevel! >> %LOG%
    ) else (
        echo [%%D] Pasta nao encontrada, pulando. >> %LOG%
    )
)

:: Limpar backups antigos
forfiles /p %BACKUP% /d -%RETENCAO_DIAS% /c "cmd /c if @isdir==TRUE rmdir /s /q @path\" 2>nul
echo Backups com mais de %RETENCAO_DIAS% dias removidos. >> %LOG%

echo === Backup concluido: %DATE% %TIME% === >> %LOG%
echo Backup concluido! Log: %LOG%`} />

      <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> Script: Monitoramento de Saúde do Sistema</h2>
      <CodeBlock language="batch" title="health-check.bat — Relatório de saúde" code={`@echo off
setlocal EnableDelayedExpansion
set LOG=C:\\Logs\\health-%date:~6,4%%date:~3,2%%date:~0,2%.txt

echo ====================================== > %LOG%
echo   RELATORIO DE SAUDE DO SISTEMA       >> %LOG%
echo   Data: %date% %time%                  >> %LOG%
echo ====================================== >> %LOG%
echo. >> %LOG%

:: CPU
echo [CPU] >> %LOG%
wmic cpu get Name, LoadPercentage /format:list >> %LOG%
echo. >> %LOG%

:: Memória
echo [MEMORIA] >> %LOG%
for /f "skip=1\" %%a in ('wmic os get FreePhysicalMemory') do (
    set /a FREE_MB=%%a/1024
    echo Memoria Livre: !FREE_MB! MB >> %LOG%
    goto :done_mem
)
:done_mem
echo. >> %LOG%

:: Disco
echo [DISCO] >> %LOG%
for %%D in (C D E) do (
    if exist %%D:\\ (
        for /f "skip=1 tokens=1,2\" %%a in ('wmic logicaldisk where \"DeviceID='%%D:'" get FreeSpace^, Size') do (
            if "%%a" neq \"\" (
                set /a LIVRE_GB=%%a/1073741824
                set /a TOTAL_GB=%%b/1073741824
                echo %%D: !LIVRE_GB!GB livres de !TOTAL_GB!GB >> %LOG%
            )
        )
    )
)
echo. >> %LOG%

:: Serviços críticos
echo [SERVICOS CRITICOS] >> %LOG%
for %%S in (wuauserv Spooler W32Time Winmgmt) do (
    sc query %%S | findstr "STATE" >> %LOG%
)
echo. >> %LOG%

:: Últimos erros do sistema
echo [ULTIMOS ERROS DO SISTEMA] >> %LOG%
wevtutil qe System /q:"*[System[Level=2]]\" /c:5 /f:text | findstr \"Description" >> %LOG%
echo. >> %LOG%

echo Relatorio gerado: %LOG%
type %LOG%
pause`} />

      <h2><Code className="inline-block mr-2 mb-1 w-5 h-5" /> Script: Deploy Automatizado</h2>
      <CodeBlock language="batch" title="deploy-app.bat — Deploy de aplicação" code={`@echo off
setlocal
set APP_DIR=D:\\App\\MeuSistema
set BACKUP_DIR=D:\\Backup\\App
set NOVO_BINARIO=C:\\Deploy\\meu-sistema.exe
set SERVICO=MeuSistema

echo Iniciando deploy do %SERVICO%...

:: Backup da versão atual
echo [1/5] Backup da versao atual...
set DATA=%date:~6,4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%
set DATA=%DATA: =0%
robocopy "%APP_DIR%\" \"%BACKUP_DIR%\\%DATA%\" /E /NP /LOG:NUL

:: Parar serviço
echo [2/5] Parando servico...
net stop %SERVICO%
timeout /t 5 /nobreak >nul

:: Substituir binário
echo [3/5] Implantando nova versao...
copy /Y "%NOVO_BINARIO%\" \"%APP_DIR%\\meu-sistema.exe"
if errorlevel 1 (
    echo ERRO ao copiar! Restaurando backup...
    robocopy "%BACKUP_DIR%\\%DATA%\" \"%APP_DIR%\" /E /NP /LOG:NUL
    net start %SERVICO%
    exit /b 1
)

:: Iniciar serviço
echo [4/5] Iniciando servico...
net start %SERVICO%
if errorlevel 1 (
    echo ERRO ao iniciar servico!
    exit /b 1
)

:: Verificar saúde
echo [5/5] Verificando servico...
timeout /t 10 /nobreak >nul
sc query %SERVICO% | findstr "RUNNING" >nul
if errorlevel 1 (
    echo SERVICO NAO INICIOU! Ativando rollback...
    net stop %SERVICO% 2>nul
    robocopy "%BACKUP_DIR%\\%DATA%\" \"%APP_DIR%\" /E /NP /LOG:NUL
    net start %SERVICO%
    exit /b 1
)

echo Deploy concluido com sucesso!
echo Backup disponivel em: %BACKUP_DIR%\\%DATA%`} />
    </PageContainer>
  );
}