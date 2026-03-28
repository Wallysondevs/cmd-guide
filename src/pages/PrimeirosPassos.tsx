import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Keyboard, Terminal, HelpCircle, Settings, MousePointer2, Cpu } from "lucide-react";
import { Link } from "wouter";

export default function PrimeirosPassos() {
  return (
    <PageContainer
      title="Primeiros Passos no CMD"
      subtitle="Tudo o que você precisa saber para abrir, configurar e executar seus primeiros comandos com segurança."
      difficulty="iniciante"
      timeToRead="25 min"
    >
      <h2><Terminal className="inline-block mr-2 mb-1 w-5 h-5" /> Como Abrir o Prompt de Comando</h2>
      <p>Existem várias formas de invocar o CMD no Windows. Conhecer os diferentes métodos ajuda em situações distintas — como quando a interface gráfica trava.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 border border-border rounded-lg bg-secondary/10">
          <h4 className="font-bold mb-2">Win + R (Executar)</h4>
          <p className="text-sm">Pressione <code>Win + R</code>, digite <code>cmd</code> e pressione Enter. O método mais rápido.</p>
        </div>
        <div className="p-4 border border-border rounded-lg bg-secondary/10">
          <h4 className="font-bold mb-2">Busca do Windows</h4>
          <p className="text-sm">Abra o Menu Iniciar, digite <strong>"Prompt de Comando"</strong> ou <strong>"cmd"</strong> e selecione o aplicativo.</p>
        </div>
        <div className="p-4 border border-border rounded-lg bg-secondary/10">
          <h4 className="font-bold mb-2">Como Administrador</h4>
          <p className="text-sm">Na busca, clique com o botão <strong>direito</strong> no CMD e escolha <em>"Executar como administrador"</em>. Essencial para comandos de sistema.</p>
        </div>
        <div className="p-4 border border-border rounded-lg bg-secondary/10">
          <h4 className="font-bold mb-2">Barra de Endereços do Explorer</h4>
          <p className="text-sm">Abra o Explorador de Arquivos, clique na barra de endereços, digite <code>cmd</code> e pressione Enter. Abre já na pasta atual.</p>
        </div>
        <div className="p-4 border border-border rounded-lg bg-secondary/10">
          <h4 className="font-bold mb-2">Shift + Clique Direito</h4>
          <p className="text-sm">Em qualquer pasta do Explorer, segure <code>Shift</code> e clique com o botão direito em espaço vazio. Selecione <em>"Abrir janela de comando aqui"</em>.</p>
        </div>
        <div className="p-4 border border-border rounded-lg bg-secondary/10">
          <h4 className="font-bold mb-2">Pelo Gerenciador de Tarefas</h4>
          <p className="text-sm">Ctrl+Shift+Esc → Arquivo → Executar nova tarefa → digite <code>cmd</code>. Útil quando a interface está travada.</p>
        </div>
      </div>

      <h2>Entendendo a Interface</h2>
      <p>A janela do CMD é deliberadamente simples. Veja o que cada elemento significa:</p>

      <div className="bg-muted/30 border border-border rounded-lg p-4 font-mono text-sm my-4">
        <p className="text-muted-foreground mb-2">Exemplo de prompt típico:</p>
        <p><span className="text-primary">C:\Users\JoaoSilva\Documentos</span><span className="text-foreground">&gt;</span><span className="animate-pulse">_</span></p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Elemento</th>
            <th>Significado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>C:</code></td>
            <td>Letra do drive/disco atual</td>
          </tr>
          <tr>
            <td><code>\Users\JoaoSilva\Documentos</code></td>
            <td>Caminho completo do diretório atual</td>
          </tr>
          <tr>
            <td><code>&gt;</code></td>
            <td>Separador — indica que o CMD aguarda um comando</td>
          </tr>
          <tr>
            <td><code>_</code> (cursor piscante)</td>
            <td>Posição onde o texto digitado aparecerá</td>
          </tr>
        </tbody>
      </table>

      <AlertBox type="warning" title="Usuário comum vs. Administrador">
        Quando o CMD abre com <strong>"Administrador: Prompt de Comando"</strong> na barra de título, você tem poderes totais sobre o sistema. Comandos executados como usuário comum não podem alterar arquivos do sistema. Sempre que encontrar "Acesso negado", verifique se precisa de privilégios de administrador.
      </AlertBox>

      <h2><Keyboard className="inline-block mr-2 mb-1 w-5 h-5" /> Teclas de Atalho Essenciais</h2>
      <p>Dominar estes atalhos vai multiplicar sua velocidade no CMD:</p>
      <table>
        <thead>
          <tr>
            <th>Tecla / Atalho</th>
            <th>Função</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>Tab</code></td><td>Autocompletar nomes de arquivos e pastas. Pressione várias vezes para ciclar pelas opções.</td></tr>
          <tr><td><code>↑ / ↓</code></td><td>Navega pelo histórico de comandos já executados nesta sessão.</td></tr>
          <tr><td><code>F7</code></td><td>Abre um popup visual com a lista de comandos recentes.</td></tr>
          <tr><td><code>F8</code></td><td>Busca no histórico: digite o início do comando e pressione F8 para encontrá-lo.</td></tr>
          <tr><td><code>Ctrl + C</code></td><td>Interrompe um comando em execução (fundamental para loops infinitos e pings contínuos).</td></tr>
          <tr><td><code>Ctrl + Z</code></td><td>Sinal de fim de arquivo (EOF) em alguns contextos.</td></tr>
          <tr><td><code>Home / End</code></td><td>Move o cursor para o início/fim da linha digitada.</td></tr>
          <tr><td><code>Ctrl + ← →</code></td><td>Move palavra por palavra no comando digitado.</td></tr>
          <tr><td><code>Insert</code></td><td>Alterna entre modo de inserção e sobreposição.</td></tr>
          <tr><td><code>Esc</code></td><td>Apaga toda a linha digitada atualmente.</td></tr>
          <tr><td><code>Alt + Enter</code></td><td>Alterna entre janela normal e tela cheia.</td></tr>
        </tbody>
      </table>

      <h2>Estrutura de um Comando</h2>
      <p>Quase todos os comandos do CMD seguem este padrão:</p>

      <div className="bg-muted/30 border border-border rounded-lg p-4 font-mono text-center text-lg my-4">
        COMANDO [argumento1] [argumento2] [/flag1] [/flag2]
      </div>

      <CodeBlock
        code={`REM Exemplo prático:
dir C:\\Windows /w /p

REM Anatomia:
REM  dir       = o comando (listar diretório)
REM  C:\\Windows = argumento (qual pasta listar)
REM  /w        = flag "wide" (formato largo, múltiplas colunas)
REM  /p        = flag "pause" (pausar a cada tela cheia)

REM Outro exemplo:
xcopy C:\\Origem D:\\Destino /s /e /y

REM  xcopy     = copiar arquivos e subpastas
REM  C:\\Origem  = pasta de origem
REM  D:\\Destino = pasta de destino
REM  /s        = incluir subpastas
REM  /e        = incluir pastas vazias
REM  /y        = sobrescrever sem perguntar`}
        language="batch"
        title="Anatomia de um comando CMD"
      />

      <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> Configurando o CMD para Melhor Uso</h2>
      <p>Clique com o botão direito na barra de título e acesse <strong>Propriedades</strong>:</p>
      <table>
        <thead>
          <tr>
            <th>Configuração</th>
            <th>Recomendação</th>
            <th>Por quê</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Buffer de tela (altura)</td>
            <td>9999</td>
            <td>Ver muito mais linhas ao rolar para cima</td>
          </tr>
          <tr>
            <td>Buffer de histórico</td>
            <td>200+</td>
            <td>Lembrar mais comandos com ↑ e F7</td>
          </tr>
          <tr>
            <td>QuickEdit Mode</td>
            <td>Ativado</td>
            <td>Selecionar e copiar texto com o mouse</td>
          </tr>
          <tr>
            <td>Fonte</td>
            <td>Consolas 14pt</td>
            <td>Melhor legibilidade e suporte a Unicode</td>
          </tr>
          <tr>
            <td>Tamanho da janela</td>
            <td>120×30</td>
            <td>Caber mais informação horizontalmente</td>
          </tr>
        </tbody>
      </table>

      <h2><Cpu className="inline-block mr-2 mb-1 w-5 h-5" /> Primeiros Comandos Práticos</h2>
      <p>Experimente executar estes comandos em ordem para se familiarizar com o ambiente:</p>

      <h3>1. Onde estou? (CD e DIR)</h3>
      <CodeBlock
        code={`REM Ver o diretório atual
cd

REM Listar o conteúdo da pasta atual
dir

REM Listar em formato compacto
dir /b

REM Mostrar arquivos ocultos também
dir /a

REM Mostrar tamanho em formato legível
dir /q`}
        language="batch"
        title="Orientação inicial"
      />

      <h3>2. Navegando entre pastas</h3>
      <CodeBlock
        code={`REM Entrar em uma subpasta
cd Documentos

REM Voltar um nível
cd ..

REM Voltar à raiz do drive
cd \

REM Ir diretamente para qualquer caminho
cd C:\Users\Public

REM Mudar de drive (D: E: etc.)
D:

REM Mudar de drive e pasta ao mesmo tempo
cd /d D:\Projetos`}
        language="batch"
        title="Navegação básica"
      />

      <h3>3. Criando e removendo pastas</h3>
      <CodeBlock
        code={`REM Criar uma pasta
md MinhaPasta

REM Criar pasta com subpastas de uma vez
md "Projeto\src\assets\images"

REM Remover pasta vazia
rd MinhaVaziaPasta

REM Remover pasta com todo o conteúdo (cuidado!)
rd /s /q "Pasta Completa"`}
        language="batch"
        title="Gerenciando pastas"
      />

      <h3>4. Exibindo texto e variáveis</h3>
      <CodeBlock
        code={`REM Exibir texto
echo Olá, mundo!

REM Ver seu nome de usuário
echo %USERNAME%

REM Ver o hostname do computador
echo %COMPUTERNAME%

REM Ver o caminho da pasta de perfil do usuário
echo %USERPROFILE%

REM Listar todas as variáveis de ambiente
set`}
        language="batch"
        title="Saída de texto e variáveis"
      />

      <h3>5. Limpando a tela</h3>
      <CodeBlock
        code={`REM Limpar a tela do CMD
cls

REM Fechar o CMD
exit

REM Fechar apenas uma janela CMD filho (aberta por outro script)
exit /b`}
        language="batch"
        title="Controle da janela"
      />

      <AlertBox type="info" title="CMD é insensível a maiúsculas">
        Diferente do Linux/macOS, o CMD é <strong>case-insensitive</strong>. <code>DIR</code>, <code>dir</code> e <code>DiR</code> funcionam igual. O mesmo vale para nomes de arquivos e pastas.
      </AlertBox>

      <h2>O Comando HELP</h2>
      <p>O CMD tem um sistema de ajuda embutido. Para qualquer comando que você não conheça:</p>
      <CodeBlock
        code={`REM Ver a lista de todos os comandos disponíveis
help

REM Ver ajuda detalhada de um comando específico
help dir
help copy
help xcopy

REM Alternativa equivalente com /?
dir /?
xcopy /?
netstat /?`}
        language="batch"
        title="Sistema de ajuda do CMD"
      />

      <section className="mt-12 pt-8 border-t border-border">
        <h3 className="text-lg font-bold mb-3">Próximos passos</h3>
        <div className="flex gap-4 flex-wrap">
          <Link href="/ajuda">
            <a className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all text-sm">
              Aprenda a usar a ajuda <HelpCircle className="w-4 h-4" />
            </a>
          </Link>
          <Link href="/navegacao">
            <a className="inline-flex items-center gap-2 px-5 py-2 border border-border rounded-lg font-semibold hover:bg-muted transition-all text-sm">
              Navegação avançada →
            </a>
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
