import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { GitBranch, ListChecks, MousePointer2, CornerDownRight, Terminal } from "lucide-react";
import { Link } from "wouter";

export default function FluxoControle() {
  return (
    <PageContainer
      title="Controle de Fluxo: IF, GOTO e Labels"
      subtitle="Tomando decisões inteligentes e controlando o fluxo de execução em scripts CMD"
      difficulty="intermediario"
      timeToRead="30 min"
    >
      <p>
        Sem controle de fluxo, um script é apenas uma lista estática de tarefas. Com <code>IF</code>, <code>GOTO</code> e <code>LABELS</code>, você transforma seus scripts em programas reais capazes de tomar decisões baseadas em condições, reagir a erros e criar menus interativos.
      </p>

      <h2><GitBranch className="inline-block mr-2 mb-1 w-5 h-5" /> O Comando IF — Decisões Condicionais</h2>
      <p>O <code>IF</code> no CMD é versátil, com quatro formas principais de uso:</p>

      <table>
        <thead>
          <tr>
            <th>Sintaxe</th>
            <th>Uso</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>IF "A"=="B"</code></td><td>Comparação de strings</td></tr>
          <tr><td><code>IF EXIST caminho</code></td><td>Verificar existência de arquivo ou pasta</td></tr>
          <tr><td><code>IF DEFINED variavel</code></td><td>Verificar se uma variável existe</td></tr>
          <tr><td><code>IF ERRORLEVEL n</code></td><td>Checar código de retorno do último comando</td></tr>
        </tbody>
      </table>

      <h3>Comparação de Strings</h3>
      <CodeBlock
        code={`@ECHO OFF
SET /P NOME=Qual seu nome? 

REM Comparação simples (case-sensitive)
IF "%NOME%"=="Admin" (
    ECHO Ola, Administrador!
) ELSE (
    ECHO Ola, %NOME%!
)

REM Comparação sem diferenciar maiúsculas (/I = case-insensitive)
IF /I "%NOME%"=="admin" (
    ECHO Voce e o administrador.
)

REM Negação com NOT
IF NOT "%NOME%"=="" (
    ECHO Voce digitou um nome.
) ELSE (
    ECHO Voce nao digitou nada!
)`}
        language="batch"
        title="Comparações de strings com IF"
      />

      <h3>Verificando Existência de Arquivos e Pastas</h3>
      <CodeBlock
        code={`@ECHO OFF
REM Verificar se um arquivo existe
IF EXIST "C:\Windows\System32\cmd.exe" (
    ECHO CMD encontrado!
) ELSE (
    ECHO CMD nao encontrado - sistema danificado?
)

REM Verificar se uma PASTA existe (use \* para distinguir de arquivo)
IF EXIST "C:\MinhaPasta\*" (
    ECHO Pasta existe e tem conteudo.
) ELSE (
    ECHO Pasta nao existe ou esta vazia.
)

REM Criar pasta somente se não existir
IF NOT EXIST "C:\Logs" MD "C:\Logs"

REM Verificar múltiplas condições
SET ARQ=C:\config.ini
IF EXIST "%ARQ%" (
    ECHO Arquivo de configuracao encontrado.
    TYPE "%ARQ%"
) ELSE (
    ECHO Arquivo nao encontrado. Criando padrao...
    ECHO [config] > "%ARQ%"
    ECHO versao=1.0 >> "%ARQ%"
)`}
        language="batch"
        title="Verificando existência de arquivos e pastas"
      />

      <h3>IF ERRORLEVEL — Reagindo a Erros</h3>
      <AlertBox type="danger" title="Armadilha clássica do ERRORLEVEL">
        O comando <code>IF ERRORLEVEL n</code> significa <em>"se o errorlevel for maior OU IGUAL a n"</em>. Por isso, verificações com vários níveis devem ser feitas do maior para o menor, ou use a sintaxe moderna com <code>%ERRORLEVEL%</code>.
      </AlertBox>
      <CodeBlock
        code={`@ECHO OFF
REM Forma antiga (confusa — evitar)
xcopy origem destino
IF ERRORLEVEL 2 ECHO Erro critico!
IF ERRORLEVEL 1 ECHO Arquivos nao encontrados.
IF ERRORLEVEL 0 ECHO Sucesso.

REM ----------------------------------------
REM Forma moderna (recomendada)
xcopy "C:\Origem" "D:\Destino" /s /e
IF %ERRORLEVEL% EQU 0 ECHO Copia bem-sucedida!
IF %ERRORLEVEL% EQU 1 ECHO Nenhum arquivo copiado (pasta vazia?).
IF %ERRORLEVEL% EQU 4 ECHO Erro de inicializacao.
IF %ERRORLEVEL% NEQ 0 ECHO Ocorreu um erro com codigo %ERRORLEVEL%.

REM ----------------------------------------
REM Padrão profissional: checar só sucesso/falha
ping google.com -n 1 > NUL
IF %ERRORLEVEL% EQU 0 (
    ECHO Internet disponivel.
) ELSE (
    ECHO SEM INTERNET!
    GOTO :FIM_ERRO
)`}
        language="batch"
        title="Tratando ERRORLEVEL corretamente"
      />

      <h3>IF DEFINED — Verificando Variáveis</h3>
      <CodeBlock
        code={`@ECHO OFF
REM Verificar se variável tem valor
IF DEFINED TEMP (
    ECHO Pasta temp: %TEMP%
) ELSE (
    ECHO Variavel TEMP nao definida!
)

REM Verificar parâmetros passados ao script
IF NOT DEFINED 1 (
    ECHO Uso: %~nx0 [arquivo]
    ECHO Exemplo: %~nx0 config.txt
    GOTO :EOF
)

REM Definir valor padrão se variável não estiver definida
IF NOT DEFINED MODO SET MODO=producao
ECHO Rodando em modo: %MODO%`}
        language="batch"
        title="Verificando se variáveis estão definidas"
      />

      <h3>Operadores Numéricos</h3>
      <p>Ao comparar números (não strings), use estas abreviações de três letras:</p>
      <table>
        <thead>
          <tr>
            <th>Operador</th>
            <th>Significado</th>
            <th>Exemplo</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>EQU</code></td><td>Igual (Equal)</td><td><code>IF %X% EQU 0</code></td></tr>
          <tr><td><code>NEQ</code></td><td>Diferente (Not Equal)</td><td><code>IF %X% NEQ 0</code></td></tr>
          <tr><td><code>LSS</code></td><td>Menor que (Less than)</td><td><code>IF %X% LSS 10</code></td></tr>
          <tr><td><code>LEQ</code></td><td>Menor ou igual (Less or Equal)</td><td><code>IF %X% LEQ 100</code></td></tr>
          <tr><td><code>GTR</code></td><td>Maior que (Greater than)</td><td><code>IF %X% GTR 0</code></td></tr>
          <tr><td><code>GEQ</code></td><td>Maior ou igual (Greater or Equal)</td><td><code>IF %X% GEQ 18</code></td></tr>
        </tbody>
      </table>

      <CodeBlock
        code={`@ECHO OFF
SET /P IDADE=Digite sua idade: 

IF NOT "%IDADE%"=="" (
    IF %IDADE% GEQ 18 (
        ECHO Voce e maior de idade.
    ) ELSE IF %IDADE% GEQ 13 (
        ECHO Voce e adolescente.
    ) ELSE (
        ECHO Voce e crianca.
    )
)`}
        language="batch"
        title="Comparações numéricas encadeadas"
      />

      <h2><CornerDownRight className="inline-block mr-2 mb-1 w-5 h-5" /> GOTO e Labels</h2>
      <p>
        Labels são pontos de referência no seu script definidos por dois-pontos seguidos de um nome (ex: <code>:INICIO</code>). O comando <code>GOTO</code> faz a execução saltar diretamente para esse ponto.
      </p>
      <CodeBlock
        code={`@ECHO OFF

:MENU_PRINCIPAL
CLS
ECHO =====================================
ECHO  MENU PRINCIPAL
ECHO =====================================
ECHO  1. Listar arquivos
ECHO  2. Ver data e hora
ECHO  3. Sobre o sistema
ECHO  4. Sair
ECHO =====================================
SET /P OPC=Escolha uma opcao: 

IF "%OPC%"=="1" GOTO LISTAR
IF "%OPC%"=="2" GOTO HORARIO
IF "%OPC%"=="3" GOTO SISTEMA
IF "%OPC%"=="4" GOTO SAIR

ECHO Opcao invalida! Tente novamente.
TIMEOUT /T 2 > NUL
GOTO MENU_PRINCIPAL

:LISTAR
ECHO.
DIR /w
PAUSE
GOTO MENU_PRINCIPAL

:HORARIO
ECHO.
ECHO Data: %DATE%
ECHO Hora: %TIME%
PAUSE
GOTO MENU_PRINCIPAL

:SISTEMA
ECHO.
SYSTEMINFO | findstr /C:"Nome do Host" /C:"Versao do Sistema"
PAUSE
GOTO MENU_PRINCIPAL

:SAIR
ECHO Encerrando... Ate logo!
TIMEOUT /T 2 > NUL
EXIT /B 0`}
        language="batch"
        title="Menu interativo completo com GOTO"
      />

      <AlertBox type="info" title="GOTO :EOF — label especial">
        O label <code>:EOF</code> (End Of File) é reservado pelo CMD e não precisa ser declarado no script. Usar <code>GOTO :EOF</code> encerra a execução do script atual (ou da sub-rotina atual se usado com <code>CALL</code>).
      </AlertBox>

      <h2><ListChecks className="inline-block mr-2 mb-1 w-5 h-5" /> Capturando Input do Usuário</h2>

      <h3>SET /P — Input de texto livre</h3>
      <CodeBlock
        code={`@ECHO OFF
SET /P ARQUIVO=Digite o nome do arquivo para processar: 

IF "%ARQUIVO%"=="" (
    ECHO Nenhum arquivo informado.
    GOTO :EOF
)

IF NOT EXIST "%ARQUIVO%" (
    ECHO Arquivo "%ARQUIVO%" nao encontrado!
    GOTO :EOF
)

ECHO Processando: %ARQUIVO%
REM ... resto do script`}
        language="batch"
        title="Capturando e validando input de texto"
      />

      <h3>CHOICE — Menus com teclas restritas</h3>
      <p>O <code>CHOICE</code> cria menus mais robustos que <code>SET /P</code>, pois aceita apenas as teclas permitidas e retorna um ERRORLEVEL correspondente à posição da tecla escolhida.</p>
      <CodeBlock
        code={`@ECHO OFF
ECHO Deseja fazer backup antes de continuar?
CHOICE /C SNC /M "[S]im, [N]ao ou [C]ancelar"

REM ERRORLEVEL: S=1, N=2, C=3 (ordem das opções em /C)
REM SEMPRE verificar do maior para o menor!
IF ERRORLEVEL 3 GOTO CANCELAR
IF ERRORLEVEL 2 GOTO NAO
IF ERRORLEVEL 1 GOTO SIM

:SIM
ECHO Fazendo backup...
REM ... logica de backup
GOTO CONTINUAR

:NAO
ECHO Continuando sem backup...
GOTO CONTINUAR

:CANCELAR
ECHO Operacao cancelada pelo usuario.
GOTO :EOF

:CONTINUAR
ECHO Operacao concluida!`}
        language="batch"
        title="CHOICE — menu de confirmação"
      />

      <CodeBlock
        code={`@ECHO OFF
REM CHOICE com timeout (padrão se não responder em 10s)
ECHO Deseja reiniciar? (S para sim, N para nao)
CHOICE /C SN /T 10 /D N /M "Responda em 10 segundos"

IF ERRORLEVEL 2 (
    ECHO Usuario escolheu NAO ou nao respondeu.
) ELSE (
    ECHO Reiniciando...
    shutdown /r /t 60 /c "Reinicio agendado pelo script"
)`}
        language="batch"
        title="CHOICE com timeout e valor padrão"
      />

      <h2><Terminal className="inline-block mr-2 mb-1 w-5 h-5" /> Exemplo Completo: Script Robusto</h2>
      <CodeBlock
        code={`@ECHO OFF
SETLOCAL ENABLEDELAYEDEXPANSION
TITLE Ferramenta de Manutencao

REM Verificar se rodando como Admin
NET SESSION >NUL 2>&1
IF %ERRORLEVEL% NEQ 0 (
    ECHO Este script requer privilegios de Administrador!
    ECHO Clique com o botao direito e "Executar como administrador".
    PAUSE
    EXIT /B 1
)

:MENU
CLS
ECHO =========================================
ECHO  FERRAMENTA DE MANUTENCAO DO SISTEMA
ECHO =========================================
ECHO.
ECHO  1. Limpar arquivos temporarios
ECHO  2. Verificar integridade do sistema (SFC)
ECHO  3. Liberar e renovar IP
ECHO  4. Ver uso de disco
ECHO  0. Sair
ECHO.
SET /P OPC=Opcao: 

IF "%OPC%"=="1" GOTO LIMPAR_TEMP
IF "%OPC%"=="2" GOTO SFC
IF "%OPC%"=="3" GOTO RESET_IP
IF "%OPC%"=="4" GOTO DISCO
IF "%OPC%"=="0" GOTO SAIR

ECHO Opcao invalida!
TIMEOUT /T 2 /NOBREAK > NUL
GOTO MENU

:LIMPAR_TEMP
ECHO Limpando temporarios...
DEL /Q /F /S "%TEMP%\*" 2>NUL
DEL /Q /F /S "C:\Windows\Temp\*" 2>NUL
ECHO Concluido!
PAUSE
GOTO MENU

:SFC
ECHO Verificando integridade do sistema (pode demorar)...
SFC /SCANNOW
PAUSE
GOTO MENU

:RESET_IP
ECHO Liberando e renovando IP...
IPCONFIG /RELEASE
IPCONFIG /FLUSHDNS
IPCONFIG /RENEW
ECHO Concluido!
PAUSE
GOTO MENU

:DISCO
WMIC LOGICALDISK GET CAPTION,FREESPACE,SIZE /FORMAT:TABLE
PAUSE
GOTO MENU

:SAIR
ECHO Encerrando...
ENDLOCAL
EXIT /B 0`}
        language="batch"
        title="Script de manutenção completo com menu e verificações"
      />

      <div className="mt-12 flex justify-between">
        <Link href="/scripts">
          <a className="flex items-center gap-2 text-primary hover:underline">
            ← Voltar para Scripts
          </a>
        </Link>
        <Link href="/loops">
          <a className="flex items-center gap-2 text-primary hover:underline">
            Ir para Loops (FOR) →
          </a>
        </Link>
      </div>
    </PageContainer>
  );
}
