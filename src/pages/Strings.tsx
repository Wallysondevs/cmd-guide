import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Type, Calculator, Scissors, Calendar, Hash, RefreshCw } from "lucide-react";

export default function StringsMatematica() {
  return (
    <PageContainer
      title="Manipulação de Strings e Matemática"
      subtitle="Dominando a aritmética e o processamento de texto no CMD com SET /A e expansão de variáveis"
      difficulty="avancado"
      timeToRead="30 min"
    >
      <p>
        Embora o Prompt de Comando não seja uma linguagem de programação moderna, ele oferece recursos surpreendentes para manipular textos e realizar cálculos matemáticos através dos comandos <code>SET</code> e <code>SET /A</code>. Dominar essas técnicas abre um mundo de possibilidades para automação.
      </p>

      <h2><Scissors className="inline-block mr-2 mb-1 w-5 h-5" /> Substrings: Extraindo Partes de Strings</h2>
      <p>
        A sintaxe <code>%VAR:~inicio,comprimento%</code> permite extrair qualquer trecho de uma variável. Os índices começam em 0 e números negativos contam a partir do final.
      </p>
      <table>
        <thead>
          <tr>
            <th>Sintaxe</th>
            <th>Ação</th>
            <th>Exemplo (VAR=123456789)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>%VAR:~0,3%</code></td><td>Primeiros 3 caracteres</td><td>123</td></tr>
          <tr><td><code>%VAR:~3,2%</code></td><td>Pula 3, pega 2</td><td>45</td></tr>
          <tr><td><code>%VAR:~-3%</code></td><td>Últimos 3 caracteres</td><td>789</td></tr>
          <tr><td><code>%VAR:~0,-2%</code></td><td>Tudo exceto os 2 últimos</td><td>1234567</td></tr>
          <tr><td><code>%VAR:~2%</code></td><td>Do índice 2 até o final</td><td>3456789</td></tr>
          <tr><td><code>%VAR:~-4,2%</code></td><td>2 caracteres, começando 4 antes do fim</td><td>67</td></tr>
        </tbody>
      </table>

      <CodeBlock
        code={`@ECHO OFF
SET NOME=MariaJoseSilva

REM Primeiros 5 caracteres
ECHO %NOME:~0,5%       :: Maria

REM Últimos 5 caracteres
ECHO %NOME:~-5%        :: Silva

REM Do índice 5 ao 8
ECHO %NOME:~5,4%       :: Jose

REM Útil com nomes de arquivo para tirar a extensão
SET ARQUIVO=documento.txt
ECHO %ARQUIVO:~0,-4%   :: documento`}
        language="batch"
        title="Substrings na prática"
      />

      <h2><RefreshCw className="inline-block mr-2 mb-1 w-5 h-5" /> Substituição e Remoção de Texto</h2>
      <p>A sintaxe <code>%VAR:antigo=novo%</code> substitui todas as ocorrências de um texto por outro. Deixar o "novo" vazio remove o texto.</p>
      <CodeBlock
        code={`@ECHO OFF
SET FRASE=O gato comeu o rato e o pato

REM Substituir "o" por "um"
ECHO %FRASE:o=um%
:: um gatum cumeu um ratum e um patum  (substitui TUDO)

REM Remover espaços (substituir por nada)
SET COMPACTO=%FRASE: =%
ECHO %COMPACTO%
:: Ogatocomeuoratoeopato

REM Substituir extensão de arquivo
SET ARQ=relatorio.xls
ECHO %ARQ:.xls=.xlsx%
:: relatorio.xlsx

REM Converter separadores de caminho (barras)
SET CAMINHO=C:/Users/Admin/Docs
ECHO %CAMINHO:/=\%
:: C:\Users\Admin\Docs`}
        language="batch"
        title="Substituições e remoções de texto"
      />

      <h2><Calculator className="inline-block mr-2 mb-1 w-5 h-5" /> Matemática com SET /A</h2>
      <p>
        A chave <code>/A</code> (Arithmetic) permite que o CMD trate o valor como um número inteiro de 32 bits com sinal (-2.147.483.648 a 2.147.483.647).
      </p>

      <h3>Operadores Aritméticos</h3>
      <table>
        <thead>
          <tr>
            <th>Operador</th>
            <th>Significado</th>
            <th>Exemplo</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>+</code></td><td>Adição</td><td><code>SET /A R=5+3</code> → 8</td></tr>
          <tr><td><code>-</code></td><td>Subtração</td><td><code>SET /A R=10-4</code> → 6</td></tr>
          <tr><td><code>*</code></td><td>Multiplicação</td><td><code>SET /A R=6*7</code> → 42</td></tr>
          <tr><td><code>/</code></td><td>Divisão inteira</td><td><code>SET /A R=7/2</code> → 3</td></tr>
          <tr><td><code>%%</code></td><td>Módulo (resto)</td><td><code>SET /A R=7%%3</code> → 1</td></tr>
          <tr><td><code>( )</code></td><td>Agrupamento</td><td><code>SET /A R=(2+3)*4</code> → 20</td></tr>
        </tbody>
      </table>

      <h3>Operadores de Atribuição Composta</h3>
      <table>
        <thead>
          <tr>
            <th>Operador</th>
            <th>Equivalente</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>SET /A X+=5</code></td><td>X = X + 5</td></tr>
          <tr><td><code>SET /A X-=3</code></td><td>X = X - 3</td></tr>
          <tr><td><code>SET /A X*=2</code></td><td>X = X × 2</td></tr>
          <tr><td><code>SET /A X/=4</code></td><td>X = X ÷ 4</td></tr>
          <tr><td><code>SET /A X%%=3</code></td><td>X = X mod 3</td></tr>
        </tbody>
      </table>

      <AlertBox type="warning" title="Limitação importante">
        O CMD suporta apenas <strong>números inteiros</strong>. <code>5 / 2</code> resulta em <code>2</code>, nunca <code>2.5</code>. Para cálculos com decimais, use PowerShell ou uma calculadora externa.
      </AlertBox>

      <CodeBlock
        code={`@ECHO OFF
SET /A SOMA=15+27
SET /A PRODUTO=8*9
SET /A RESTO=100%%7

ECHO Soma: %SOMA%       :: 42
ECHO Produto: %PRODUTO% :: 72
ECHO Resto: %RESTO%     :: 2

REM Incrementar uma variável em loop
SET /A CONTADOR=0
:LOOP
SET /A CONTADOR+=1
ECHO Iteracao %CONTADOR%
IF %CONTADOR% LSS 5 GOTO LOOP

REM Calcular porcentagem (arredondada)
SET /A PORCENTO=(75*100)/200
ECHO 75 de 200 e %PORCENTO%%%  :: 37%`}
        language="batch"
        title="Operações matemáticas no CMD"
      />

      <h2><Calendar className="inline-block mr-2 mb-1 w-5 h-5" /> Data e Hora: Parsing Avançado</h2>
      <p>As variáveis <code>%DATE%</code> e <code>%TIME%</code> variam por configuração regional. No Brasil (<code>dd/mm/aaaa HH:MM:SS,cc</code>):</p>
      <CodeBlock
        code={`@ECHO OFF
:: Extraindo componentes da data (DD/MM/AAAA)
SET DIA=%DATE:~0,2%
SET MES=%DATE:~3,2%
SET ANO=%DATE:~6,4%

:: Extraindo componentes da hora (HH:MM:SS,CC)
SET HORA=%TIME:~0,2%
SET MIN=%TIME:~3,2%
SET SEG=%TIME:~6,2%

:: Remover espaço à esquerda em hora < 10h
SET HORA=%HORA: =0%

:: Gerar nome de arquivo com timestamp seguro
SET TIMESTAMP=%ANO%%MES%%DIA%_%HORA%%MIN%%SEG%
SET LOGFILE=log_%TIMESTAMP%.txt

ECHO [%DIA%/%MES%/%ANO% %HORA%:%MIN%:%SEG%] Script iniciado > "%LOGFILE%"
ECHO Arquivo criado: %LOGFILE%`}
        language="batch"
        title="Parsing completo de data e hora"
      />

      <h2><Hash className="inline-block mr-2 mb-1 w-5 h-5" /> Técnicas Avançadas com Strings</h2>

      <h3>Verificar se uma string contém outra</h3>
      <CodeBlock
        code={`@ECHO OFF
SET HAYSTACK=Bem-vindo ao Windows Server 2022
SET NEEDLE=Server

ECHO %HAYSTACK% | findstr /C:"%NEEDLE%" > NUL
IF %ERRORLEVEL% EQU 0 (
    ECHO String encontrada!
) ELSE (
    ECHO String NAO encontrada.
)`}
        language="batch"
        title="Verificando se string contém substring"
      />

      <h3>Converter para maiúsculas/minúsculas (workaround)</h3>
      <CodeBlock
        code={`@ECHO OFF
REM O CMD nao tem funcao nativa de case conversion
REM Workaround: usar FOR /F com comandos externos

SET TEXTO=Texto Misto Com Maiusculas

REM Converter para MINUSCULAS usando PowerShell
FOR /F "delims=" %%I IN ('powershell -Command ""%TEXTO%".ToLower()"') DO SET LOWER=%%I
ECHO Minusculas: %LOWER%

REM Converter para MAIUSCULAS usando PowerShell
FOR /F "delims=" %%I IN ('powershell -Command ""%TEXTO%".ToUpper()"') DO SET UPPER=%%I
ECHO Maiusculas: %UPPER%`}
        language="batch"
        title="Conversão de case (maiúsculas/minúsculas)"
      />

      <h3>Medir o comprimento de uma string</h3>
      <p>O CMD não tem uma função <code>LEN()</code>, então usamos um loop recursivo:</p>
      <CodeBlock
        code={`@ECHO OFF
SET "STR=Comprimento desta frase"
SET "TMP=%STR%"
SET /A LEN=0

:LOOP_LEN
IF NOT "%TMP%"=="" (
    SET "TMP=%TMP:~1%"
    SET /A LEN+=1
    GOTO LOOP_LEN
)

ECHO A string tem %LEN% caracteres.`}
        language="batch"
        title="Contando caracteres de uma string"
      />

      <h3>Formatando números com zeros à esquerda</h3>
      <CodeBlock
        code={`@ECHO OFF
REM Formato de 3 dígitos (001, 002, ..., 099, 100)
FOR /L %%N IN (1,1,15) DO (
    SET NUM=00%%N
    SET NUM_FORMATADO=!NUM:~-3!
    ECHO Arquivo_!NUM_FORMATADO!.txt
)
REM Nota: requer SETLOCAL ENABLEDELAYEDEXPANSION no topo`}
        language="batch"
        title="Sequências numeradas com zeros"
      />

      <h3>Verificar se variável está vazia</h3>
      <CodeBlock
        code={`@ECHO OFF
SET VALOR=

REM Método 1: comparação com string vazia
IF "%VALOR%"=="" ECHO Variavel vazia!

REM Método 2: usando DEFINED
IF NOT DEFINED VALOR ECHO Variavel nao definida!

REM Método 3: verificar se tem conteúdo
IF DEFINED VALOR (
    ECHO Valor: %VALOR%
) ELSE (
    ECHO Variavel e vazia ou nao existe.
)`}
        language="batch"
        title="Verificando variáveis vazias"
      />

      <h2><Type className="inline-block mr-2 mb-1 w-5 h-5" /> Lendo Input do Usuário e Validando</h2>
      <CodeBlock
        code={`@ECHO OFF
:PEDIR_NUMERO
SET /P NUM=Digite um numero inteiro positivo: 

REM Verificar se e um numero (truque com SET /A)
SET /A TESTE=%NUM% 2>NUL
IF "%TESTE%"=="%NUM%" (
    IF %NUM% GTR 0 (
        ECHO Numero valido: %NUM%
    ) ELSE (
        ECHO Deve ser positivo!
        GOTO PEDIR_NUMERO
    )
) ELSE (
    ECHO Isso nao e um numero!
    GOTO PEDIR_NUMERO
)

SET /A DOBRO=%NUM%*2
SET /A QUADRADO=%NUM%*%NUM%
ECHO Dobro: %DOBRO%
ECHO Quadrado: %QUADRADO%`}
        language="batch"
        title="Lendo e validando números do usuário"
      />

      <AlertBox type="info" title="Dica: Expansão retardada">
        Quando você modifica variáveis dentro de blocos <code>IF</code> ou <code>FOR</code>, use <code>SETLOCAL ENABLEDELAYEDEXPANSION</code> no topo do script e troque <code>%VAR%</code> por <code>!VAR!</code>. Sem isso, o CMD usa o valor que a variável tinha antes de entrar no bloco.
      </AlertBox>
    </PageContainer>
  );
}
