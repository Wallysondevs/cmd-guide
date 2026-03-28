import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Filter, Search, SortAsc, Scissors, ListFilter, FileJson } from "lucide-react";

export default function Filtros() {
  return (
    <PageContainer 
      title="Filtros de Texto no CMD" 
      subtitle="Extraia exatamente a informação que você precisa de grandes volumes de texto" 
      difficulty="intermediario" 
      timeToRead="22 min"
    >
      <section>
        <p>
          Processar logs, filtrar saídas de comandos de rede ou organizar listas de arquivos são tarefas do dia a dia. No CMD, os "filtros" são comandos que lêem uma entrada (geralmente via Pipe <code>|</code>) e produzem uma saída modificada ou reduzida.
        </p>

        <h2 className="flex items-center gap-2">
          <Search className="w-6 h-6 text-primary" />
          FIND: O Filtro Mais Simples
        </h2>
        <p>
          O <code>find</code> é a maneira mais rápida de filtrar linhas que contêm uma string específica.
        </p>
        <CodeBlock 
          code={`REM Filtrar apenas conexões ESTABELECIDAS no netstat\nnetstat -an | find "ESTABLISHED"\n\nREM Contar quantas vezes o IP aparece no log\ntype access.log | find /C "192.168.1.1"\n\nREM Mostrar linhas que NÃO contêm a palavra "INFO" (/V)\ntasklist | find /V "svchost.exe"`} 
          language="batch" 
          title="Exemplos com FIND" 
        />
        <h3>Flags do FIND para filtragem:</h3>
        <ul>
          <li><code>/I</code>: Ignora maiúsculas/minúsculas.</li>
          <li><code>/V</code>: Inverte o filtro (mostra o que não corresponde).</li>
          <li><code>/C</code>: Apenas conta o número de linhas.</li>
          <li><code>/N</code>: Mostra o número da linha original.</li>
        </ul>
      </section>

      <section>
        <h2 className="flex items-center gap-2">
          <ListFilter className="w-6 h-6 text-primary" />
          FINDSTR: Filtragem com Expressões Regulares
        </h2>
        <p>
          Para filtros complexos, o <code>findstr</code> é indispensável. Ele funciona como um "mini-grep" do Windows.
        </p>
        <CodeBlock 
          code={`REM Filtrar linhas que terminam com .exe\ndir /B | findstr /R "\\.exe$"\n\nREM Buscar por múltiplos padrões (OU lógico)\nfindstr "erro falha fatal" app.log\n\nREM Filtrar linhas que contém apenas números\necho 123 | findstr /R "^[0-9]*$"`} 
          language="batch" 
          title="FINDSTR Avançado" 
        />

        <h3>Metacaracteres Suportados:</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-4">Char</th>
                <th className="text-left py-2 px-4">Significado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>.</code></td>
                <td className="py-2 px-4">Qualquer caractere único.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>*</code></td>
                <td className="py-2 px-4">Zero ou mais repetições.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>^</code></td>
                <td className="py-2 px-4">Início da linha.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>$</code></td>
                <td className="py-2 px-4">Final da linha.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>[class]</code></td>
                <td className="py-2 px-4">Qualquer caractere no conjunto (ex: <code>[a-z]</code>).</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>[^class]</code></td>
                <td className="py-2 px-4">Qualquer caractere FORA do conjunto.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>\&lt; \&gt;</code></td>
                <td className="py-2 px-4">Início e fim de palavra.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="flex items-center gap-2">
          <SortAsc className="w-6 h-6 text-primary" />
          SORT: Ordenação de Dados
        </h2>
        <p>
          O comando <code>sort</code> organiza as linhas em ordem alfabética ou numérica.
        </p>
        <CodeBlock 
          code={`REM Ordenar lista de usuários\nnet user | sort\n\nREM Ordenar em ordem reversa (/R)\ndir /B | sort /R\n\nREM Ordenar baseando-se na coluna 10 (/+10)\ntasklist | sort /+57`} 
          language="batch" 
          title="Uso do SORT" 
        />
        <AlertBox type="info" title="Dica de Coluna">
          A flag <code>/+n</code> é muito útil para saídas tabeladas como o <code>tasklist</code>, onde você pode querer ordenar pelo uso de memória ou PID.
        </AlertBox>
      </section>

      <section>
        <h2 className="flex items-center gap-2">
          <Filter className="w-6 h-6 text-primary" />
          Combinações Poderosas (One-liners)
        </h2>
        <p>A verdadeira mágica acontece quando você combina vários filtros:</p>
        
        <div className="space-y-6">
          <div>
            <strong>Encontrar processos consumindo muita memória:</strong>
            <CodeBlock code={`tasklist | sort /+57 | findstr /V "Console"`} language="batch" />
          </div>

          <div>
            <strong>Listar apenas nomes de diretórios:</strong>
            <CodeBlock code={`dir /AD /B | sort`} language="batch" />
          </div>

          <div>
            <strong>Verificar se um serviço está rodando e alertar:</strong>
            <CodeBlock code={`sc query "wuauserv" | find "RUNNING" || echo "Servico Parado!"`} language="batch" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="flex items-center gap-2">
          <FileJson className="w-6 h-6 text-primary" />
          Equivalentes Unix no CMD
        </h2>
        <p>Se você vem do Linux, aqui está uma "tabela de tradução":</p>
        <div className="overflow-x-auto my-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-4">Comando Linux</th>
                <th className="text-left py-2 px-4">Equivalente CMD</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>grep</code></td>
                <td className="py-2 px-4"><code>findstr</code> ou <code>find</code></td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>sort</code></td>
                <td className="py-2 px-4"><code>sort</code></td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>more / less</code></td>
                <td className="py-2 px-4"><code>more</code></td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>wc -l</code></td>
                <td className="py-2 px-4"><code>find /C ""</code></td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>head</code></td>
                <td className="py-2 px-4"><code>more +n</code> (parcial)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Dicas de Performance</h2>
        <p>
          Filtrar arquivos gigantes (Gigas de logs) diretamente no CMD pode ser lento. 
          Sempre tente restringir a busca o máximo possível antes de passar para o próximo pipe. 
          O <code>findstr</code> costuma ser mais rápido que o <code>find</code> para buscas em arquivos grandes devido à sua implementação interna.
        </p>
      </section>

      <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
        <Link href="/redirecionamento">
          <a className="text-primary hover:underline flex items-center gap-2">
            ← Redirecionamento
          </a>
        </Link>
        <Link href="/">
          <a className="text-primary hover:underline flex items-center gap-2">
            Voltar ao Início
          </a>
        </Link>
      </div>
    </PageContainer>
  );
}
