import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Activity, Zap, GitCompare, Calculator, ArrowRightLeft, ShieldAlert } from "lucide-react";

export default function Operadores() {
  return (
    <PageContainer 
      title="Operadores e Lógica no CMD" 
      subtitle="Aprenda a criar scripts inteligentes com encadeamento, comparações e matemática" 
      difficulty="intermediario" 
      timeToRead="22 min"
    >
      <section>
        <h2>Introdução à Lógica de Scripts</h2>
        <p>
          Os operadores no Prompt de Comando permitem que você conecte comandos, tome decisões baseadas em condições e realize cálculos matemáticos. Sem eles, o CMD seria apenas uma ferramenta de execução sequencial simples. Com eles, você pode criar automações complexas.
        </p>
      </section>

      <section>
        <h2>Operadores de Encadeamento de Comandos</h2>
        <p>Esses operadores permitem executar múltiplos comandos em uma única linha, controlando o fluxo baseado no sucesso ou falha do comando anterior.</p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2 text-left">Operador</th>
                <th className="border border-border p-2 text-left">Ação</th>
                <th className="border border-border p-2 text-left">Exemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-2"><code>&</code></td>
                <td className="border border-border p-2">Executa o primeiro comando e depois o segundo, independente do resultado.</td>
                <td className="border border-border p-2"><code>dir & echo Fim</code></td>
              </tr>
              <tr>
                <td className="border border-border p-2"><code>&&</code></td>
                <td className="border border-border p-2">Executa o segundo comando <strong>apenas se</strong> o primeiro terminar com sucesso (ERRORLEVEL 0).</td>
                <td className="border border-border p-2"><code>mkdir Backup && xcopy * Backup</code></td>
              </tr>
              <tr>
                <td className="border border-border p-2"><code>||</code></td>
                <td className="border border-border p-2">Executa o segundo comando <strong>apenas se</strong> o primeiro falhar (ERRORLEVEL diferente de 0).</td>
                <td className="border border-border p-2"><code>del arquivo.txt || echo Arquivo nao encontrado</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <AlertBox type="info" title="Exemplo Prático de Fluxo">
          <code>ipconfig /release && ipconfig /renew || echo Falha na Conexao</code>
          <p>Tenta renovar o IP. Se a liberação der certo, tenta renovar. Se qualquer um dos passos falhar, avisa sobre a falha.</p>
        </AlertBox>
      </section>

      <section>
        <h2>Operadores de Comparação no Comando IF</h2>
        <p>O comando <code>IF</code> é a base da lógica condicional no CMD. Para comparar valores, usamos palavras-chave específicas (especialmente para números).</p>

        <h3>Comparações de String</h3>
        <p>Usamos <code>==</code> para verificar igualdade. Recomenda-se usar aspas para evitar erros com strings vazias.</p>
        <CodeBlock code={`IF "%NOME%"=="Joao" echo Ola Joao!`} language="batch" title="Comparação de string" />

        <h3>Comparações Numéricas</h3>
        <p>Diferente de linguagens modernas que usam <code>&gt;</code> ou <code>&lt;</code>, o CMD usa siglas:</p>
        <ul>
          <li><code>EQU</code> - Igual a (Equal)</li>
          <li><code>NEQ</code> - Diferente de (Not Equal)</li>
          <li><code>LSS</code> - Menor que (Less Than)</li>
          <li><code>LEQ</code> - Menor ou igual a (Less or Equal)</li>
          <li><code>GTR</code> - Maior que (Greater Than)</li>
          <li><code>GEQ</code> - Maior ou igual a (Greater or Equal)</li>
        </ul>
        <CodeBlock code={`IF %IDADE% GEQ 18 (echo Maior de idade) ELSE (echo Menor de idade)`} language="batch" title="Lógica condicional com números" />

        <h3>Outras Condições Especiais</h3>
        <ul>
          <li><code>IF EXIST arquivo.txt</code>: Verifica se o arquivo existe.</li>
          <li><code>IF DEFINED variavel</code>: Verifica se uma variável foi criada.</li>
          <li><code>IF ERRORLEVEL n</code>: Verifica se o código de retorno do último comando é maior ou igual a <code>n</code>.</li>
        </ul>
        <p>O operador <code>NOT</code> pode ser usado para negar qualquer uma dessas condições.</p>
        <CodeBlock code={`IF NOT EXIST "config.ini" (echo Criando arquivo...\necho default=true > config.ini)`} language="batch" title="Uso do NOT" />
      </section>

      <section>
        <h2>Aritmética com SET /A</h2>
        <p>Para realizar cálculos matemáticos, você deve usar o parâmetro <code>/A</code> do comando <code>SET</code>.</p>
        <CodeBlock code={`SET /A soma=10 + 5\nSET /A resultado=(5 * 2) / 3\nSET /A resto=10 %% 3`} language="batch" title="Operações matemáticas" />
        
        <AlertBox type="warning" title="O Sinal de Porcentagem">
          Em cálculos de resto de divisão (módulo), usamos <code>%</code> na linha de comando, mas em scripts <code>.bat</code> devemos dobrar para <code>%%</code> para escapar o caractere.
        </AlertBox>

        <h3>Operadores Aritméticos Suportados:</h3>
        <ul>
          <li><code>+ - * / %</code>: Operações básicas.</li>
          <li><code>( )</code>: Agrupamento para precedência.</li>
          <li><code>+= -= *= /= %=</code>: Operadores de atribuição abreviada (ex: <code>SET /A n+=1</code>).</li>
        </ul>

        <h3>Operadores Bit a Bit (Bitwise):</h3>
        <p>Úteis para programadores de baixo nível ou scripts avançados:</p>
        <ul>
          <li><code>&</code>: AND</li>
          <li><code>|</code>: OR</li>
          <li><code>^</code>: XOR</li>
          <li><code>~</code>: NOT</li>
          <li><code>&lt;&lt;</code>: Shift Left (Deslocamento à esquerda)</li>
          <li><code>&gt;&gt;</code>: Shift Right (Deslocamento à direita)</li>
        </ul>
      </section>

      <section>
        <h2>Redirecionamento e Pipes</h2>
        <p>Os operadores de redirecionamento controlam para onde vai a saída de um comando e de onde vem sua entrada.</p>
        
        <ul>
          <li><code>&gt;</code>: Grava a saída em um arquivo (sobrescreve se já existir).</li>
          <li><code>&gt;&gt;</code>: Adiciona a saída ao final de um arquivo existente (append).</li>
          <li><code>&lt;</code>: Lê a entrada de um arquivo em vez do teclado.</li>
          <li><code>|</code> (Pipe): Envia a saída do primeiro comando como entrada para o segundo.</li>
        </ul>

        <CodeBlock code={`echo Lista de Arquivos > lista.txt\ndir /b >> lista.txt\ntype lista.txt | find "txt"`} language="batch" title="Uso de Redirecionamento e Pipe" />

        <h3>Streams de Saída e Erros</h3>
        <p>No Windows, existem dois "fluxos" principais:</p>
        <ol>
          <li><code>1</code>: STDOUT (Saída padrão de texto).</li>
          <li><code>2</code>: STDERR (Mensagens de erro).</li>
        </ol>
        <p>Você pode redirecionar erros separadamente:</p>
        <CodeBlock code={`comando_que_falha 2> erros.log\ncomando_silencioso > arquivos.txt 2>NUL`} language="batch" title="Ocultar ou salvar erros" />
        <p>O truque <code>2&gt;&amp;1</code> combina o erro com a saída normal:</p>
        <CodeBlock code={`meu_script.bat > logs.txt 2>&1`} language="batch" title="Capturar tudo (saída + erros)" />
      </section>

      <section>
        <h2>Resumo dos Operadores</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-border text-xs sm:text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2">Operador</th>
                <th className="border border-border p-2">Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-border p-2"><code>&</code></td><td className="border border-border p-2">Separador de comandos.</td></tr>
              <tr><td className="border border-border p-2"><code>&&</code></td><td className="border border-border p-2">E lógico (sucesso).</td></tr>
              <tr><td className="border border-border p-2"><code>||</code></td><td className="border border-border p-2">OU lógico (falha).</td></tr>
              <tr><td className="border border-border p-2"><code>&gt;</code> / <code>&gt;&gt;</code></td><td className="border border-border p-2">Redirecionar saída.</td></tr>
              <tr><td className="border border-border p-2"><code>&lt;</code></td><td className="border border-border p-2">Redirecionar entrada.</td></tr>
              <tr><td className="border border-border p-2"><code>|</code></td><td className="border border-border p-2">Pipe (canal).</td></tr>
              <tr><td className="border border-border p-2"><code>==</code></td><td className="border border-border p-2">Igualdade de string.</td></tr>
              <tr><td className="border border-border p-2"><code>^</code></td><td className="border border-border p-2">Caractere de escape.</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </PageContainer>
  );
}
