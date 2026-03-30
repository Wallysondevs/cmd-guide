import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Bug, Search, AlertTriangle, Activity } from "lucide-react";

export default function Depuracao() {
  return (
    <PageContainer
      title="Depuração de Scripts Batch"
      subtitle="Técnicas profissionais para encontrar e corrigir erros em scripts CMD: tracing, logging, testes e tratamento de erros."
      difficulty="avancado"
      timeToRead="30 min"
    >
      <h2><Bug className="inline-block mr-2 mb-1 w-5 h-5" /> Modo de Depuração com ECHO ON</h2>
      <p>Ativar o <code>ECHO ON</code> faz o CMD exibir cada linha antes de executá-la — o equivalente ao <code>set -x</code> no Bash.</p>

      <CodeBlock language="batch" title="Habilitar trace de execução" code={`@echo on
:: A partir daqui cada linha é impressa antes de executar

set /a resultado = 10 + 5
echo Resultado: %resultado%

@echo off
:: A partir daqui volta ao silêncio

:: Ativar trace para apenas uma seção
echo off
echo --- Inicio da secao critica ---
@echo on
copy arquivo1.txt destino\
xcopy pasta1 pasta_destino /E
@echo off
echo --- Fim da secao critica ---`} />

      <h2><Search className="inline-block mr-2 mb-1 w-5 h-5" /> Logging Profissional</h2>
      <CodeBlock language="batch" title="Sistema de log com níveis" code={`@echo off
setlocal

:: Configuração de log
set LOG=%~dp0log-%date:~6,4%%date:~3,2%%date:~0,2%.txt
set DEBUG_MODE=1

:: Funções de log
call :Log "INFO\" \"Script iniciado: %~nx0"
call :Log "INFO\" \"Parâmetros: %*\"

:: Lógica principal
set RESULTADO=0
call :ProcessarArquivo "dados.txt"
call :Log "INFO\" \"Processamento retornou: %RESULTADO%"

goto :fim

:Log
:: Uso: call :Log "NÍVEL\" \"Mensagem"
set NIVEL=%~1
set MSG=%~2
set LINHA=[%date% %time%] [%NIVEL%] %MSG%
echo %LINHA%
echo %LINHA% >> "%LOG%"

if "%NIVEL%\"=="DEBUG" if \"%DEBUG_MODE%\"=="0" exit /b
exit /b

:ProcessarArquivo
call :Log "DEBUG\" \"Processando: %~1"
if not exist "%~1\" (
    call :Log "ERROR\" \"Arquivo nao encontrado: %~1"
    set RESULTADO=1
    exit /b 1
)
:: processamento...
call :Log "INFO\" \"Arquivo processado com sucesso"
exit /b 0

:fim
call :Log "INFO\" \"Script finalizado"
endlocal`} />

      <h2><AlertTriangle className="inline-block mr-2 mb-1 w-5 h-5" /> Tratar e Inspecionar Erros</h2>

      <h3>ERRORLEVEL — Capturar Erros</h3>
      <CodeBlock language="batch" title="Verificar e tratar erros" code={`@echo off

:: Método 1: Verificar imediatamente após comando
copy arquivo.txt destino\
if errorlevel 1 (
    echo ERRO ao copiar arquivo! Código: %errorlevel%
    goto :erro
)

:: Método 2: Usar && e || (como try/catch)
copy arquivo.txt destino\\ && echo Copiado com sucesso || echo FALHA ao copiar

:: Método 3: Salvar errorlevel em variável
robocopy C:\\Dados D:\\Backup /E
set /a CODIGO=%errorlevel%
if %CODIGO% GEQ 8 (
    echo ERRO GRAVE: codigo %CODIGO%
    exit /b %CODIGO%
)

:: Método 4: Tratar múltiplos códigos
if errorlevel 16 goto :erro_fatal
if errorlevel 8  goto :erro_grave
if errorlevel 4  goto :aviso
if errorlevel 1  goto :ok
goto :nada_feito`} />

      <h3>Armadilhas Comuns em Batch</h3>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-border">
          <thead><tr className="bg-muted">
            <th className="border border-border p-2 text-left">Problema</th>
            <th className="border border-border p-2 text-left">Causa</th>
            <th className="border border-border p-2 text-left">Solução</th>
          </tr></thead>
          <tbody>
            {[
              ["%var% não expande dentro de FOR","Expansão atrasada desativada","Usar !var! com setlocal enabledelayedexpansion"],
              ["ECHO. imprime ponto","Sintaxe errada","Usar ECHO. (com ponto) ou ECHO("],
              ["IF com espaços falha","Espaços na variável","Usar aspas: IF com aspas ao redor"],
              ["Variável some após ENDLOCAL","Escopo local","Usar ENDLOCAL & SET var=%var% antes"],
              ["GOTO pula endlocal","Controle de fluxo","Garantir que ENDLOCAL é chamado antes do GOTO"],
              ["Pipes perdem errorlevel","Pipes criam subshell","Salvar errorlevel antes do pipe"],
            ].map(([prob, causa, sol]) => (
              <tr key={prob}>
                <td className="border border-border p-2 text-red-400 text-sm font-mono">{prob}</td>
                <td className="border border-border p-2 text-sm">{causa}</td>
                <td className="border border-border p-2 text-green-400 text-sm">{sol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2><Activity className="inline-block mr-2 mb-1 w-5 h-5" /> Testes Unitários em Batch</h2>
      <CodeBlock language="batch" title="Framework simples de testes" code={`@echo off
setlocal enabledelayedexpansion

set TESTES_OK=0
set TESTES_FALHOU=0

:: ===== TESTES =====
call :Teste "Soma basica\" \"15\" \"0\" \"10\" \"5\"

:: Funcao de soma a testar
:Soma
set /a resultado=%~3 + %~4
set %~1=%resultado%
exit /b 0

:: Framework de teste
:Teste
set NOME=%~1
set ESPERADO=%~2
set A=%~3
set B=%~4

call :Soma RESULTADO %NOME% %A% %B%

if "!RESULTADO!\"=="%ESPERADO%\" (
    echo [PASS] %NOME%: %A% + %B% = !RESULTADO!
    set /a TESTES_OK+=1
) else (
    echo [FAIL] %NOME%: esperado %ESPERADO%, obtido !RESULTADO!
    set /a TESTES_FALHOU+=1
)
exit /b 0

:: ===== RELATÓRIO =====
echo.
echo === Resultado: %TESTES_OK% passaram, %TESTES_FALHOU% falharam ===`} />

      <AlertBox type="info" title="Usar CMDTrace para Depuração Visual">
        Para scripts complexos, considere o <strong>CMDTrace</strong> (parte do SCCM Toolkit da Microsoft) — ele coloriza logs e facilita a leitura de rastreamentos de batch. Alternativamente, o VS Code com extensão Batch Scripts Debug oferece breakpoints!
      </AlertBox>
    </PageContainer>
  );
}