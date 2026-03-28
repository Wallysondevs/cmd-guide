import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Lightbulb, Zap, Star, Keyboard, Settings, Terminal, Clock, Search } from "lucide-react";

export default function Dicas() {
  return (
    <PageContainer
      title="Dicas e Truques do CMD"
      subtitle="Técnicas avançadas, atalhos e segredos para turbinar sua produtividade no Prompt de Comando"
      difficulty="intermediario"
      timeToRead="20 min"
    >
      <AlertBox type="info" title="Guia de produtividade">
        Esta página reúne truques que a maioria dos usuários nunca descobre. Vá testando cada um — o ganho de velocidade é real.
      </AlertBox>

      <h2><Keyboard className="inline-block mr-2 mb-1 w-5 h-5" /> Atalhos de Teclado Avançados</h2>
      <p>Além dos atalhos básicos (seta para cima/baixo, Tab), o CMD tem recursos escondidos:</p>
      <table>
        <thead>
          <tr>
            <th>Atalho</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>F1</code></td><td>Repete o último comando letra por letra</td></tr>
          <tr><td><code>F2 + tecla</code></td><td>Copia o último comando até a tecla especificada</td></tr>
          <tr><td><code>F3</code></td><td>Repete o último comando inteiro</td></tr>
          <tr><td><code>F7</code></td><td>Abre popup com histórico de comandos</td></tr>
          <tr><td><code>F8</code></td><td>Busca no histórico comandos que começam com o que você digitou</td></tr>
          <tr><td><code>F9</code></td><td>Acessa um comando do histórico pelo número</td></tr>
          <tr><td><code>Ctrl+Home / End</code></td><td>Rola a tela até o topo/fim do histórico</td></tr>
          <tr><td><code>Ctrl+M</code></td><td>Ativa o modo de seleção de texto sem usar o mouse</td></tr>
          <tr><td><code>Alt+F4</code></td><td>Fecha a janela do CMD</td></tr>
          <tr><td><code>Ctrl+C</code></td><td>Aborta o comando atual imediatamente</td></tr>
        </tbody>
      </table>

      <h2><Zap className="inline-block mr-2 mb-1 w-5 h-5" /> One-Liners Poderosos</h2>
      <p>Comandos únicos que fazem coisas surpreendentes:</p>
      <CodeBlock
        code={`REM Listar todos os processos e as portas que usam (sem Task Manager)
netstat -ano | findstr LISTENING

REM Ver o IP público da máquina via CMD
nslookup myip.opendns.com resolver1.opendns.com

REM Matar todos os processos de um programa (ex: Chrome)
taskkill /F /IM chrome.exe /T

REM Ver qual processo está usando uma porta específica (ex: 8080)
netstat -ano | findstr :8080

REM Limpar cache DNS em uma linha
ipconfig /flushdns && ipconfig /registerdns

REM Gerar um arquivo de texto com a estrutura de pastas do projeto
tree /f /a > estrutura.txt

REM Ver todos os drivers instalados
driverquery /v | more

REM Listar todos os usuários do sistema
net user

REM Verificar integridade dos arquivos do sistema
sfc /scannow`}
        language="batch"
        title="Comandos poderosos de uma linha só"
      />

      <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> Personalizando o Prompt</h2>
      <p>O prompt <code>C:\Users\Nome&gt;</code> pode ser completamente personalizado com a variável <code>PROMPT</code>:</p>
      <CodeBlock
        code={`REM Mostrar data e hora no prompt
PROMPT $D $T$G

REM Prompt minimalista com apenas o diretório atual
PROMPT $P$G

REM Prompt estilo Linux com cor verde (requer ANSI)
PROMPT $E[32m$P$E[0m$G

REM Restaurar o prompt padrão
PROMPT

REM Codigos especiais para o PROMPT:
REM $P = Diretorio atual
REM $G = Sinal de maior (>)
REM $D = Data atual
REM $T = Hora atual
REM $N = Letra do drive atual
REM $L = Sinal de menor (<)
REM $$ = Sinal de cifrao ($)
REM $_ = Nova linha`}
        language="batch"
        title="Personalizando o prompt do CMD"
      />

      <h2><Terminal className="inline-block mr-2 mb-1 w-5 h-5" /> Truques com ECHO e REM</h2>
      <CodeBlock
        code={`@ECHO OFF

REM Este e um comentario normal

:: Este e outro jeito de comentar (mais rapido)

REM Imprimir linha em branco
ECHO.

REM Criar uma linha separadora visual
ECHO ==========================================

REM Imprimir sem nova linha ao final (util para menus)
SET /P _=Pressione qualquer tecla... <NUL

REM Desativar e reativar o eco para uma linha especifica
ECHO OFF
ECHO Esta linha nao mostra o comando
ECHO ON
ECHO Esta linha MOSTRA o comando antes de executar`}
        language="batch"
        title="Truques com ECHO e comentários"
      />

      <h2><Search className="inline-block mr-2 mb-1 w-5 h-5" /> DOSKEY — Macros e Aliases</h2>
      <p>O <code>DOSKEY</code> permite criar atalhos para comandos longos, funcionando como aliases do Linux.</p>
      <CodeBlock
        code={`REM Criar um alias (valido apenas na sessao atual)
DOSKEY ls=dir /b /a $*
DOSKEY cls=cls
DOSKEY home=cd %USERPROFILE%
DOSKEY ip=ipconfig /all
DOSKEY up=cd ..
DOSKEY ..=cd ..
DOSKEY ...=cd ..\..

REM Usar parametros nos macros
DOSKEY grep=findstr $*
DOSKEY rm=del /q $*
DOSKEY mv=move $*
DOSKEY cp=copy $*

REM Ver todos os macros definidos
DOSKEY /macros

REM Salvar macros em arquivo para carregar depois
DOSKEY /macros > meus_macros.txt
DOSKEY /macrofile=meus_macros.txt`}
        language="batch"
        title="Criando aliases com DOSKEY"
      />

      <AlertBox type="info" title="Tornando os aliases permanentes">
        Os aliases do DOSKEY desaparecem quando o CMD fecha. Para torná-los permanentes, crie um arquivo <code>.bat</code> com todos os comandos DOSKEY e configure-o para rodar na inicialização do CMD usando a chave do registro: <code>HKCU\Software\Microsoft\Command Processor\AutoRun</code>.
      </AlertBox>

      <h2><Clock className="inline-block mr-2 mb-1 w-5 h-5" /> Medindo Performance com TIME</h2>
      <CodeBlock
        code={`@ECHO OFF
SET INICIO=%TIME%

REM === Coloque aqui o codigo a medir ===
ping 8.8.8.8 -n 5 > NUL
REM =====================================

SET FIM=%TIME%
ECHO Iniciou: %INICIO%
ECHO Terminou: %FIM%
ECHO (Calcule a diferenca manualmente ou use PowerShell para precisao)`}
        language="batch"
        title="Medindo tempo de execução"
      />

      <h2><Lightbulb className="inline-block mr-2 mb-1 w-5 h-5" /> Truques Avançados de Redirecionamento</h2>
      <CodeBlock
        code={`REM Executar comando e mostrar saida E salvar em arquivo ao mesmo tempo
dir C:\ 2>&1 | tee saida.txt
REM Nota: tee nao existe no CMD padrao, use este workaround:
dir C:\ > saida.txt & type saida.txt

REM Suprimir TODOS os outputs (stdout e stderr)
comando > NUL 2>&1

REM Salvar apenas os erros
comando 2> erros.txt

REM Salvar stdout e stderr em arquivos separados
comando > saida.txt 2> erros.txt

REM Passar conteudo de um arquivo como entrada de um comando
sort < lista_desordenada.txt > lista_ordenada.txt

REM Encadear multiplos pipes
dir /b | sort | findstr ".txt" | more`}
        language="batch"
        title="Redirecionamento avançado"
      />

      <h2><Star className="inline-block mr-2 mb-1 w-5 h-5" /> Segredos Menos Conhecidos</h2>
      <CodeBlock
        code={`REM Abrir o CMD ja em um diretorio especifico
cmd /k "cd /d C:\Projetos\MeuProjeto"

REM Executar um script bat e manter o CMD aberto
cmd /k script.bat

REM Executar comando como Administrador sem clicar direito
runas /user:Administrator "cmd /k script.bat"

REM Ver o historico completo do CMD atual
doskey /history

REM Limpar o historico de comandos (sem fechar o CMD)
doskey /reinstall

REM Abrir varias instancias do CMD de uma vez
start cmd && start cmd && start cmd

REM Executar um comando em loop infinito com delay
:LOOP
seu_comando_aqui
timeout /t 60 /nobreak > NUL
GOTO LOOP

REM Verificar se um programa esta instalado antes de usar
where python >NUL 2>&1
IF %ERRORLEVEL% NEQ 0 (
    ECHO Python nao encontrado!
) ELSE (
    ECHO Python disponivel!
    python --version
)`}
        language="batch"
        title="Segredos e casos de uso avançados"
      />

      <h2>Configurando o CMD via Propriedades</h2>
      <p>Clique com o botão direito na barra de título do CMD e acesse <strong>Propriedades</strong> para personalizar:</p>
      <table>
        <thead>
          <tr>
            <th>Configuração</th>
            <th>O que muda</th>
            <th>Recomendação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tamanho do buffer de tela</td>
            <td>Quantas linhas de histórico ficam visíveis no scroll</td>
            <td>9999 (máximo)</td>
          </tr>
          <tr>
            <td>Tamanho do buffer de histórico</td>
            <td>Quantos comandos o F7/seta lembram</td>
            <td>200+</td>
          </tr>
          <tr>
            <td>QuickEdit Mode</td>
            <td>Selecionar e copiar texto com o mouse</td>
            <td>Ativado</td>
          </tr>
          <tr>
            <td>Insert Mode</td>
            <td>Digitar texto no meio de um comando</td>
            <td>Ativado</td>
          </tr>
          <tr>
            <td>Fonte</td>
            <td>Visual do terminal</td>
            <td>Consolas 14pt ou Cascadia Code</td>
          </tr>
        </tbody>
      </table>

      <AlertBox type="success" title="Próximo passo">
        Agora que você conhece os truques, veja a seção de <strong>Referências</strong> para uma lista completa de todos os comandos do CMD com descrições rápidas.
      </AlertBox>
    </PageContainer>
  );
}
