import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Repeat, FolderTree, FileSearch, Hash, List, Terminal, ChevronRight } from "lucide-react";

export default function Loops() {
  return (
    <PageContainer 
      title="Loops com FOR: O Guia Completo" 
      subtitle="Dominando a ferramenta mais poderosa e complexa do Prompt de Comando" 
      difficulty="avancado" 
      timeToRead="30 min"
    >
      <section>
        <p>
          O comando <code>FOR</code> é, sem dúvida, o recurso mais potente do CMD. Ele permite processar listas de arquivos, percorrer diretórios recursivamente, contar números e até analisar a saída de outros comandos linha por linha.
        </p>
      </section>

      <section>
        <div className="flex items-center gap-2 mt-8 mb-4">
          <Repeat className="w-6 h-6 text-primary" />
          <h2 className="m-0">Sintaxe Básica: Linha de Comando vs Script</h2>
        </div>
        <AlertBox type="warning" title="Diferença Crucial">
          A sintaxe do <code>FOR</code> muda dependendo de onde você o usa:<br/>
          • No terminal direto: use um sinal de porcentagem (<code>%i</code>).<br/>
          • Dentro de um arquivo .bat: use dois sinais de porcentagem (<code>%%i</code>).
        </AlertBox>
        <CodeBlock 
          code={`:: No terminal\nFOR %i IN (A, B, C) DO ECHO %i\n\n:: No script .bat\nFOR %%i IN (A, B, C) DO (\n  ECHO Processando item: %%i\n)`} 
          language="batch" 
          title="Sintaxe de porcentagem"
        />
      </section>

      <section>
        <div className="flex items-center gap-2 mt-8 mb-4">
          <Hash className="w-6 h-6 text-primary" />
          <h2 className="m-0">FOR /L: Loops Numéricos</h2>
        </div>
        <p>Usado para contar ou repetir uma ação um número específico de vezes.</p>
        <p>Sintaxe: <code>FOR /L %%i IN (inicio, passo, fim) DO ...</code></p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <CodeBlock 
            code={`:: Contar de 1 a 5\nFOR /L %%i IN (1,1,5) DO ECHO %%i`} 
            language="batch" 
            title="Contagem progressiva"
          />
          <CodeBlock 
            code={`:: Contar de 10 a 0 (passo negativo)\nFOR /L %%i IN (10,-2,0) DO ECHO %%i`} 
            language="batch" 
            title="Contagem regressiva"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mt-8 mb-4">
          <FileSearch className="w-6 h-6 text-primary" />
          <h2 className="m-0">FOR /F: Processamento de Dados</h2>
        </div>
        <p>
          Este é o "canivete suíço" do CMD. Ele pode ler arquivos de texto, strings ou a saída de comandos.
        </p>
        
        <h3>Opções do FOR /F</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-border my-4">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2">Opção</th>
                <th className="border border-border p-2">Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-border p-2"><code>delims=</code></td><td className="border border-border p-2">Define caracteres separadores (padrão é espaço e tab).</td></tr>
              <tr><td className="border border-border p-2"><code>tokens=</code></td><td className="border border-border p-2">Quais colunas/partes extrair (ex: 1, 2-4, *).</td></tr>
              <tr><td className="border border-border p-2"><code>skip=n</code></td><td className="border border-border p-2">Ignora as primeiras N linhas.</td></tr>
              <tr><td className="border border-border p-2"><code>usebackq</code></td><td className="border border-border p-2">Permite usar aspas em nomes de arquivos ou crases para comandos.</td></tr>
            </tbody>
          </table>
        </div>

        <CodeBlock 
          code={`:: Extrair 1ª e 2ª coluna de um CSV separado por vírgula\nFOR /F "tokens=1,2 delims=," %%A IN (dados.csv) DO (\n  ECHO Nome: %%A - Idade: %%B\n)`} 
          language="batch" 
          title="Processando CSV"
        />

        <CodeBlock 
          code={`:: Processar saída de um comando (lista de processos)\nFOR /F "skip=3 tokens=1" %%P IN ('tasklist') DO (\n  ECHO Processo em execucao: %%P\n)`} 
          language="batch" 
          title="Lendo saída de comando"
        />
      </section>

      <section>
        <div className="flex items-center gap-2 mt-8 mb-4">
          <FolderTree className="w-6 h-6 text-primary" />
          <h2 className="m-0">Iteração de Diretórios e Arquivos</h2>
        </div>
        
        <h3>FOR /D (Diretórios)</h3>
        <p>Itera apenas sobre pastas no diretório especificado.</p>
        <CodeBlock 
          code={`FOR /D %%d IN (C:\\*) DO ECHO Pasta encontrada: %%d`} 
          language="batch" 
        />

        <h3>FOR /R (Recursivo)</h3>
        <p>Percorre toda a árvore de diretórios a partir de um ponto.</p>
        <CodeBlock 
          code={`:: Encontrar todos os arquivos .log no drive C:\nFOR /R C:\\ %%f IN (*.log) DO ECHO Arquivo de log: %%f`} 
          language="batch" 
        />
      </section>

      <section>
        <div className="flex items-center gap-2 mt-8 mb-4">
          <List className="w-6 h-6 text-primary" />
          <h2 className="m-0">Modificadores de Variável</h2>
        </div>
        <p>Dentro de um loop <code>FOR</code>, você pode expandir as variáveis de arquivo para obter metadados:</p>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-border my-4">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2">Modificador</th>
                <th className="border border-border p-2">Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-border p-2"><code>%%~fA</code></td><td className="border border-border p-2">Caminho completo (Full path)</td></tr>
              <tr><td className="border border-border p-2"><code>%%~nA</code></td><td className="border border-border p-2">Apenas o Nome do arquivo</td></tr>
              <tr><td className="border border-border p-2"><code>%%~xA</code></td><td className="border border-border p-2">Apenas a Extensão</td></tr>
              <tr><td className="border border-border p-2"><code>%%~sA</code></td><td className="border border-border p-2">Caminho curto (8.3 caracteres)</td></tr>
              <tr><td className="border border-border p-2"><code>%%~zA</code></td><td className="border border-border p-2">Tamanho do arquivo em bytes</td></tr>
              <tr><td className="border border-border p-2"><code>%%~tA</code></td><td className="border border-border p-2">Data e Hora da última modificação</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mt-8 mb-4">
          <Terminal className="w-6 h-6 text-primary" />
          <h2 className="m-0">Exemplos Avançados</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4>Renomear arquivos em lote (Adicionar Prefixo)</h4>
            <CodeBlock 
              code={`FOR %%f IN (*.jpg) DO REN "%%f" "Backup_%%f"`} 
              language="batch" 
            />
          </div>
          <div>
            <h4>Contar quantos arquivos existem em uma pasta</h4>
            <CodeBlock 
              code={`@ECHO OFF\nSET /A CONTADOR=0\nFOR %%f IN (*.*) DO SET /A CONTADOR+=1\nECHO Existem %CONTADOR% arquivos nesta pasta.`} 
              language="batch" 
            />
          </div>
        </div>
      </section>

      <div className="mt-12 flex justify-between">
        <Link href="/fluxo-controle">
          <a className="flex items-center gap-2 text-primary hover:underline">
            ← Voltar para Fluxo de Controle
          </a>
        </Link>
        <Link href="/strings">
          <a className="flex items-center gap-2 text-primary hover:underline">
            Ir para Strings e Matemática →
          </a>
        </Link>
      </div>
    </PageContainer>
  );
}
