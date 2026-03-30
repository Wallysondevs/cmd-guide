import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Code, Layers, Zap, Shield } from "lucide-react";

export default function ScriptingAvancado() {
  return (
    <PageContainer
      title="Scripting Batch Avançado"
      subtitle="Técnicas profissionais: arrays, estruturas de dados, módulos, logging, validação de parâmetros e scripts robustos."
      difficulty="avancado"
      timeToRead="40 min"
    >
      <h2><Code className="inline-block mr-2 mb-1 w-5 h-5" /> Arrays e Estruturas de Dados no Batch</h2>
      <p>O CMD não tem suporte nativo a arrays, mas simulamos com variáveis indexadas:</p>

      <CodeBlock language="batch" title="Simular arrays com variáveis indexadas" code={`@echo off
setlocal enabledelayedexpansion

:: Definir array
set frutas[0]=maca
set frutas[1]=banana
set frutas[2]=laranja
set frutas[3]=uva
set frutas[4]=manga

:: Percorrer array
for /l %%i in (0,1,4) do (
    echo Fruta %%i: !frutas[%%i]!
)

:: Tamanho do array (manual)
set /a total=5

:: Adicionar elemento
set frutas[5]=melao
set /a total+=1

:: Buscar elemento
set /a encontrado=-1
for /l %%i in (0,1,%total%) do (
    if "!frutas[%%i]!\"=="laranja" set /a encontrado=%%i
)
if %encontrado% geq 0 echo Laranja encontrada no indice: %encontrado%`} />

      <h3>Estruturas como HashMap</h3>
      <CodeBlock language="batch" title="Simular dicionário (chave=valor)" code={`@echo off
setlocal enabledelayedexpansion

:: Definir dicionário de configurações
set cfg.servidor=192.168.1.100
set cfg.porta=8080
set cfg.usuario=admin
set cfg.timeout=30

:: Acessar por chave
set chave=servidor
echo Servidor: !cfg.%chave%!

:: Percorrer todas as chaves
for /f "tokens=1* delims=.\" %%a in ('set cfg. 2^>nul') do (
    echo  %%b
)`} />

      <h2><Layers className="inline-block mr-2 mb-1 w-5 h-5" /> Módulos e Includes em Batch</h2>
      <CodeBlock language="batch" title="Criar biblioteca reutilizável" code={`:: ===== lib-utils.bat (biblioteca compartilhada) =====
:: Usar com: call lib-utils.bat :FuncaoDesejada parametro

:LogInfo
echo [%time%] [INFO] %~1
echo [%date% %time%] [INFO] %~1 >> "%LOG_FILE%"
exit /b 0

:LogError
echo [%time%] [ERROR] %~1
echo [%date% %time%] [ERROR] %~1 >> "%LOG_FILE%"
exit /b 0

:VerificarAdmin
net session >nul 2>&1
if %errorlevel% neq 0 (
    call :LogError "Este script requer privilegios de administrador"
    exit /b 1
)
exit /b 0`} />

      <CodeBlock language="batch" title="Usar a biblioteca em outro script" code={`@echo off
setlocal
set LOG_FILE=C:\\Logs\\meu-script.log

:: Incluir biblioteca
call lib-utils.bat :VerificarAdmin
if errorlevel 1 exit /b 1

call lib-utils.bat :LogInfo "Script iniciado\"

:: Lógica principal aqui...

call lib-utils.bat :LogInfo "Script concluido"
endlocal`} />

      <h2><Shield className="inline-block mr-2 mb-1 w-5 h-5" /> Validação Robusta de Parâmetros</h2>
      <CodeBlock language="batch" title="Script com validação completa de parâmetros" code={`@echo off
setlocal enabledelayedexpansion

:: =============================================
:: backup.bat - Script com validação completa
:: Uso: backup.bat ORIGEM DESTINO [dias]
:: =============================================

:: Verificar número de parâmetros
if "%~2\"=="\" (
    call :Ajuda
    exit /b 1
)

set ORIGEM=%~1
set DESTINO=%~2
set DIAS=%~3
if "%DIAS%\"=="" set DIAS=30

:: Validar se origem existe
if not exist "%ORIGEM%\" (
    echo ERRO: Origem nao encontrada: "%ORIGEM%"
    exit /b 2
)

:: Validar se DIAS é número
echo %DIAS%| findstr /r "^[0-9][0-9]*$" >nul
if errorlevel 1 (
    echo ERRO: Parametro dias deve ser um numero. Recebido: "%DIAS%"
    exit /b 3
)

:: Criar destino se não existir
if not exist "%DESTINO%\" (
    mkdir "%DESTINO%\" 2>nul
    if errorlevel 1 (
        echo ERRO: Nao foi possivel criar destino: "%DESTINO%"
        exit /b 4
    )
)

echo Backup configurado:
echo   Origem:  %ORIGEM%
echo   Destino: %DESTINO%
echo   Retencao: %DIAS% dias

robocopy "%ORIGEM%\" \"%DESTINO%\" /E /XO /MT:8 /R:3 /W:5
goto :eof

:Ajuda
echo.
echo Uso: %~nx0 ORIGEM DESTINO [dias-retencao]
echo.
echo Exemplos:
echo   %~nx0 C:\\Dados D:\\Backup
echo   %~nx0 C:\\Dados D:\\Backup 60
echo.
exit /b 0`} />

      <h2><Zap className="inline-block mr-2 mb-1 w-5 h-5" /> Técnicas de Performance</h2>
      <CodeBlock language="batch" title="Otimizar scripts lentos" code={`@echo off

:: TÉCNICA 1: Desativar eco para speed
@echo off

:: TÉCNICA 2: Usar SETLOCAL para não poluir o ambiente
setlocal enabledelayedexpansion

:: TÉCNICA 3: Redirecionar NUL para suprimir saída
dir /s /b >nul 2>&1

:: TÉCNICA 4: Usar FINDSTR em vez de loops para buscas
:: Ruim (lento):
for /f %%a in ('type arquivo.txt') do (
    if "%%a\"=="valor" set ACHOU=1
)
:: Melhor (rápido):
findstr /c:"valor" arquivo.txt >nul && set ACHOU=1

:: TÉCNICA 5: Usar CMD /C para subprocessos isolados
cmd /c "operacao-pesada.bat" > resultado.txt

:: TÉCNICA 6: Processar em paralelo (start /b)
start /b operacao1.bat
start /b operacao2.bat
start /b operacao3.bat

:: Aguardar todos terminarem
:aguardar
tasklist | findstr "cmd.exe" >nul && timeout /t 2 >nul && goto aguardar`} />

      <AlertBox type="success" title="Dica: CALL vs GOTO para Sub-rotinas">
        Use <code>CALL :SubRotina</code> para chamar funções que retornam ao chamador. Use <code>GOTO :SubRotina</code> apenas para saltar sem retorno. CALL preserva o contexto e o errorlevel corretamente.
      </AlertBox>
    </PageContainer>
  );
}