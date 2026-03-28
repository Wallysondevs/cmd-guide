import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Quote, Sparkles, AlertTriangle, FileCode, Monitor, HardDrive } from "lucide-react";

export default function Caracteres() {
  return (
    <PageContainer 
      title="Caracteres Especiais e Escape" 
      subtitle="Entenda o significado dos símbolos reservados e como usá-los corretamente" 
      difficulty="avancado" 
      timeToRead="18 min"
    >
      <section>
        <h2>O Desafio dos Caracteres Especiais</h2>
        <p>
          No CMD, certos caracteres têm funções específicas. Se você tentar imprimir um deles diretamente com <code>echo</code>, o interpretador tentará executar sua função em vez de mostrá-lo. Saber lidar com esses caracteres é o que diferencia um criador de scripts iniciante de um avançado.
        </p>
      </section>

      <section>
        <h2>Lista de Caracteres Reservados</h2>
        <p>Estes símbolos têm "poderes" especiais no shell do Windows:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
          <div className="p-3 border rounded-lg bg-muted/30"><code>&</code> - Conector</div>
          <div className="p-3 border rounded-lg bg-muted/30"><code>|</code> - Pipe</div>
          <div className="p-3 border rounded-lg bg-muted/30"><code>{'<'}</code> <code>{'>'}</code> - Redirecionadores</div>
          <div className="p-3 border rounded-lg bg-muted/30"><code>^</code> - Escape</div>
          <div className="p-3 border rounded-lg bg-muted/30"><code>(</code> <code>)</code> - Blocos</div>
          <div className="p-3 border rounded-lg bg-muted/30"><code>%</code> - Variáveis</div>
          <div className="p-3 border rounded-lg bg-muted/30"><code>!</code> - Expansão Adiada</div>
          <div className="p-3 border rounded-lg bg-muted/30"><code>@</code> - Ocultar comando</div>
          <div className="p-3 border rounded-lg bg-muted/30"><code>"</code> - Aspas (strings)</div>
        </div>
      </section>

      <section>
        <h2>O Caractere de Escape: Circunflexo (^)</h2>
        <p>
          O <code>^</code> é usado para "anular" o significado especial do próximo caractere. Se você quer imprimir um <code>{'<code>&amp;</code>'}</code>, deve escrever <code>^&amp;</code>.
        </p>
        <CodeBlock code={`echo Batman ^& Robin\necho 100^% completo\necho Este e um maior que: ^>`} language="batch" title="Usando escape" />

        <AlertBox type="info" title="Escape de Linha">
          Você também pode usar o <code>^</code> no final de uma linha para indicar que o comando continua na próxima linha, o que ajuda muito na organização de scripts longos.
          <CodeBlock code={`copy "C:\\Origem\\arquivo.txt" ^\n     "D:\\Destino\\copia.txt"`} language="batch" />
        </AlertBox>
      </section>

      <section>
        <h2>Aspas e Caminhos com Espaços</h2>
        <p>
          O caractere de aspas duplas <code>"</code> é vital quando lidamos com nomes de pastas ou arquivos que contêm espaços. Sem aspas, o CMD entende cada palavra como um argumento separado.
        </p>
        <CodeBlock code={`cd "C:\\Program Files\\Google\\Chrome"\ndel "C:\\Meus Documentos\\foto.jpg"`} language="batch" title="Aspas em caminhos" />
        
        <AlertBox type="warning" title="Aspas Aninhadas">
          Diferente de linguagens como JavaScript ou Python, o CMD não lida bem com aspas simples <code>'</code> para strings. Use sempre aspas duplas <code>"</code>.
        </AlertBox>
      </section>

      <section>
        <h2>O Enigma da Porcentagem (%)</h2>
        <p>A porcentagem é usada para referenciar variáveis, mas sua regra de escape muda dependendo de ONDE você está:</p>
        <ul>
          <li><strong>Direto no CMD:</strong> Use uma única porcentagem para variáveis (<code>%VAR%</code>) e escape com nada (é difícil escapar % no prompt interativo).</li>
          <li><strong>Dentro de um Script (.bat):</strong> Use duas porcentagens para variáveis de loop (<code>%%i</code>) ou para escapar uma porcentagem literal (<code>%%</code>).</li>
        </ul>
        <CodeBlock code={`REM Em um arquivo .bat:\necho O progresso e de 50%%\nfor %%i in (*.txt) do echo %%i`} language="batch" title="Porcentagem em scripts" />
      </section>

      <section>
        <h2>Variáveis de Expansão de Referência (FOR)</h2>
        <p>Quando usamos o comando <code>FOR</code>, temos acesso a modificadores especiais para tratar os caminhos detectados:</p>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2 text-left">Sintaxe</th>
                <th className="border border-border p-2 text-left">Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-border p-2"><code>%%~fI</code></td><td className="border border-border p-2">Caminho completo (Full path).</td></tr>
              <tr><td className="border border-border p-2"><code>%%~dI</code></td><td className="border border-border p-2">Apenas a letra do Drive (C:).</td></tr>
              <tr><td className="border border-border p-2"><code>%%~pI</code></td><td className="border border-border p-2">Apenas o caminho da pasta (Path).</td></tr>
              <tr><td className="border border-border p-2"><code>%%~nI</code></td><td className="border border-border p-2">Apenas o nome do arquivo (Name).</td></tr>
              <tr><td className="border border-border p-2"><code>%%~xI</code></td><td className="border border-border p-2">Apenas a extensão (.txt).</td></tr>
              <tr><td className="border border-border p-2"><code>%%~zI</code></td><td className="border border-border p-2">Tamanho do arquivo (Size).</td></tr>
            </tbody>
          </table>
        </div>
        <CodeBlock code={`for %%i in (C:\\Windows\\System32\\notepad.exe) do (\n  echo Nome: %%~ni\n  echo Ext: %%~xi\n)`} language="batch" title="Exemplo de modificadores FOR" />
      </section>

      <section>
        <h2>Dispositivos Especiais (NUL, CON, etc.)</h2>
        <p>O Windows herdou do MS-DOS nomes de "arquivos" reservados que representam dispositivos do sistema. Você não pode criar arquivos com esses nomes.</p>
        <ul>
          <li><code>NUL</code>: O "buraco negro" do sistema. Tudo que você envia para cá desaparece. Muito usado para esconder saídas: <code>{"comando > NUL"}</code>.</li>
          <li><code>CON</code>: O Console (teclado para entrada, tela para saída).</li>
          <li><code>PRN</code> ou <code>LPT1</code>: A impressora.</li>
          <li><code>COM1</code> a <code>COM9</code>: Portas seriais.</li>
        </ul>
        <CodeBlock code={`REM Criar um arquivo digitando direto no teclado:\ncopy CON novo_arquivo.txt\n(Digite o texto aqui e aperte CTRL+Z para salvar)`} language="batch" title="Uso do dispositivo CON" />
      </section>

      <section>
        <h2>Tokens e Delimitadores em FOR /F</h2>
        <p>Ao processar texto com <code>FOR /F</code>, caracteres como espaço e vírgula são delimitadores padrão. Você pode customizar isso:</p>
        <CodeBlock code={`REM Processar um arquivo CSV:\nfor /f "tokens=1,2 delims=," %%a in (dados.csv) do (\n  echo Coluna 1: %%a - Coluna 2: %%b\n)`} language="batch" title="Delimitadores customizados" />
      </section>
    </PageContainer>
  );
}
