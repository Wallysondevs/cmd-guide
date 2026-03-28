import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { FileCode, Terminal, Info, AlertTriangle, Save, Play, Palette, HelpCircle, ArrowRightLeft, ShieldCheck, Clock } from "lucide-react";

export default function Scripts() {
  return (
    <PageContainer 
      title="Criando Scripts Batch (.bat / .cmd)" 
      subtitle="O guia definitivo para automação no Windows usando arquivos de lote" 
      difficulty="iniciante" 
      timeToRead="20 min"
    >
      <section>
        <p>
          Arquivos de lote (batch files) são scripts de texto simples que contêm uma série de comandos executados sequencialmente pelo interpretador de comandos do Windows (CMD). Eles são a forma mais básica e poderosa de automatizar tarefas repetitivas no ambiente Windows sem a necessidade de instalar linguagens de programação complexas.
        </p>
      </section>

      <section>
        <div className="flex items-center gap-2 mt-8 mb-4">
          <ArrowRightLeft className="w-6 h-6 text-primary" />
          <h2 className="m-0">Diferença entre .bat e .cmd</h2>
        </div>
        <p>
          Historicamente, existem duas extensões principais para scripts de lote. Embora hoje em dia funcionem de forma quase idêntica, há sutilezas históricas:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-border my-4">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2">Extensão</th>
                <th className="border border-border p-2">Origem</th>
                <th className="border border-border p-2">Comportamento</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2"><code>.bat</code></td>
                <td className="border border-border p-2">MS-DOS / Windows 9x</td>
                <td className="border border-border p-2">A extensão original. Compatível com todos os sistemas.</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><code>.cmd</code></td>
                <td className="border border-border p-2">Windows NT</td>
                <td className="border border-border p-2">Introduzida para o interpretador <code>cmd.exe</code>. Ignora comandos específicos do DOS antigo.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <AlertBox type="info" title="Qual usar?">
          Para sistemas modernos (Windows 10/11), não há diferença prática. No entanto, o uso de <code>.bat</code> ainda é o padrão mais comum pela compatibilidade universal.
        </AlertBox>
      </section>

      <section>
        <div className="flex items-center gap-2 mt-8 mb-4">
          <Save className="w-6 h-6 text-primary" />
          <h2 className="m-0">Criando o Primeiro Script</h2>
        </div>
        <ol>
          <li>Abra um editor de texto simples (Bloco de Notas, VS Code, Notepad++, etc).</li>
          <li>Escreva seus comandos (um por linha).</li>
          <li>Salve o arquivo com a extensão <code>.bat</code> (ex: <code>meuscript.bat</code>).</li>
          <li>Certifique-se de que o "Tipo" no salvamento do Bloco de Notas seja "Todos os Arquivos (*.*)".</li>
        </ol>
        <CodeBlock 
          code={`@ECHO OFF\nTITLE Meu Primeiro Script\nECHO Ola Mundo!\nPAUSE`} 
          language="batch" 
          title="ola_mundo.bat" 
        />
      </section>

      <section>
        <div className="flex items-center gap-2 mt-8 mb-4">
          <Terminal className="w-6 h-6 text-primary" />
          <h2 className="m-0">Comandos Fundamentais de Scripting</h2>
        </div>
        
        <h3>@ECHO OFF</h3>
        <p>
          Por padrão, o CMD exibe cada comando antes de executá-lo. O comando <code>@ECHO OFF</code> no início do script impede que os comandos em si apareçam na tela, mostrando apenas a saída (output). O símbolo <code>@</code> serve para esconder o próprio comando <code>ECHO OFF</code>.
        </p>

        <h3>REM e :: (Comentários)</h3>
        <p>
          Comentários são essenciais para documentar o que seu código faz. Eles são ignorados pelo interpretador.
        </p>
        <ul>
          <li><code>REM</code>: Abreviação de "Remark". É o comando oficial.</li>
          <li><code>::</code>: Um "hack" comum que funciona como comentário e é visualmente mais limpo.</li>
        </ul>
        <CodeBlock 
          code={`REM Este e um comentario oficial\n:: Este tambem funciona como comentario`} 
          language="batch" 
        />

        <h3>ECHO e PAUSE</h3>
        <ul>
          <li><code>ECHO Mensagem</code>: Exibe texto na tela.</li>
          <li><code>ECHO.</code>: Exibe uma linha em branco (não esqueça o ponto logo após o ECHO).</li>
          <li><code>PAUSE</code>: Interrompe a execução e aguarda que o usuário pressione qualquer tecla. Essencial para scripts que rodam via clique duplo, caso contrário a janela fecha instantaneamente ao terminar.</li>
        </ul>

        <h3>TITLE e COLOR</h3>
        <p>Personalize a aparência da janela do terminal enquanto o script roda.</p>
        <CodeBlock 
          code={`TITLE Ferramenta de Manutencao\nCOLOR 0A :: Fundo preto, texto verde (estilo hacker)`} 
          language="batch" 
        />
        <p>A tabela de cores usa dois dígitos hexadecimais: o primeiro para o fundo e o segundo para o texto.</p>
      </section>

      <section>
        <div className="flex items-center gap-2 mt-8 mb-4">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="m-0">Passagem de Parâmetros</h2>
        </div>
        <p>
          Você pode passar informações para o script ao executá-lo (ex: <code>meuscript.bat arquivo.txt backup</code>).
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-border my-4">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2">Variável</th>
                <th className="border border-border p-2">Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2"><code>%0</code></td>
                <td className="border border-border p-2">O nome/caminho do próprio script.</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><code>%1</code> a <code>%9</code></td>
                <td className="border border-border p-2">Argumentos passados na ordem.</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><code>%*</code></td>
                <td className="border border-border p-2">Todos os argumentos passados.</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><code>%~dp0</code></td>
                <td className="border border-border p-2">O caminho da unidade e diretório onde o script está (muito útil!).</td>
              </tr>
              <tr>
                <td className="border border-border p-2"><code>%~n0</code></td>
                <td className="border border-border p-2">Apenas o nome do script (sem extensão).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>O comando SHIFT</h3>
        <p>
          Se você tiver mais de 9 argumentos, use <code>SHIFT</code>. Ele "move" os argumentos para a esquerda: o %2 vira %1, o %3 vira %2, e assim por diante, permitindo acessar o 10º argumento via %9.
        </p>

        <h3>Verificando Argumentos</h3>
        <CodeBlock 
          code={`IF "%1"=="" (\n  ECHO Erro: Voce precisa fornecer um nome de arquivo.\n  PAUSE\n  EXIT /B 1\n)`} 
          language="batch" 
          title="Validacao de entrada"
        />
      </section>

      <section>
        <div className="flex items-center gap-2 mt-8 mb-4">
          <Play className="w-6 h-6 text-primary" />
          <h2 className="m-0">Exemplos Práticos</h2>
        </div>

        <div className="space-y-8">
          <div>
            <h4>1. Script de Backup Simples</h4>
            <p>Copia arquivos de uma pasta para outra usando <code>XCOPY</code>.</p>
            <CodeBlock 
              code={`@ECHO OFF\nSET ORIGEM=C:\\MeusDocumentos\nSET DESTINO=D:\\Backup\n\nECHO Iniciando backup...\nXCOPY "%ORIGEM%" "%DESTINO%" /D /E /C /I /H /Y\n\nIF %ERRORLEVEL% EQU 0 (\n  ECHO Backup concluido com sucesso!\n) ELSE (\n  ECHO Ocorreu um erro no backup.\n)\nPAUSE`} 
              language="batch" 
            />
          </div>

          <div>
            <h4>2. Limpeza de Temporários</h4>
            <p>Limpa pastas que acumulam lixo no sistema.</p>
            <CodeBlock 
              code={`@ECHO OFF\nTITLE Limpeza de Sistema\nECHO Limpando arquivos temporarios...\n\nDEL /S /Q /F %TEMP%\\*.*\nFOR /D %%p IN ("%TEMP%\\*.*") DO RD /S /Q "%%p"\n\nECHO Limpeza concluida!\nTIMEOUT /T 5`} 
              language="batch" 
            />
          </div>

          <div>
            <h4>3. Log com Timestamp</h4>
            <p>Registra eventos em um arquivo com data e hora.</p>
            <CodeBlock 
              code={`@ECHO OFF\nSET LOGFILE=%~dp0meulog.log\n\nSET DATETIME=%DATE% %TIME%\nECHO [%DATETIME%] O script foi executado por %USERNAME% >> "%LOGFILE%"\nECHO Log gerado em %LOGFILE%`} 
              language="batch" 
            />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mt-8 mb-4">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <h2 className="m-0">Boas Práticas</h2>
        </div>
        <ul>
          <li><strong>Use Aspas:</strong> Sempre envolva caminhos de arquivos em aspas (<code>"%VAR%"</code>) para evitar erros com nomes que contenham espaços.</li>
          <li><strong>EXIT /B:</strong> Use <code>EXIT /B [codigo]</code> para sair de um script ou função sem fechar a janela do CMD se ele tiver sido chamado de outro lugar.</li>
          <li><strong>Localidade de Variáveis:</strong> Use <code>SETLOCAL</code> no início do script para que as variáveis criadas não "vazem" para o ambiente global do sistema após o término.</li>
          <li><strong>Comentários:</strong> Documente a finalidade de cada bloco lógico complexo.</li>
        </ul>
      </section>

      <AlertBox type="warning" title="Atenção: Nomes de Arquivos">
        Evite dar nomes aos seus scripts que sejam iguais a comandos do sistema (ex: <code>ping.bat</code> ou <code>dir.bat</code>). Isso pode causar loops infinitos ou comportamentos inesperados.
      </AlertBox>

      <div className="mt-12 flex justify-between">
        <Link href="/variaveis">
          <a className="flex items-center gap-2 text-primary hover:underline">
            ← Voltar para Variáveis
          </a>
        </Link>
        <Link href="/fluxo-controle">
          <a className="flex items-center gap-2 text-primary hover:underline">
            Ir para Fluxo de Controle →
          </a>
        </Link>
      </div>
    </PageContainer>
  );
}
