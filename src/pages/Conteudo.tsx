import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { FileText, Search, Diff, PlusSquare, Hash, AlignLeft, Eye } from "lucide-react";

export default function Conteudo() {
  return (
    <PageContainer 
      title="Conteúdo de Arquivos" 
      subtitle="Visualização, busca, comparação e manipulação de fluxos de texto" 
      difficulty="intermediario" 
      timeToRead="18 min"
    >
      <section>
        <p>
          Além de mover e copiar arquivos, o CMD oferece ferramentas poderosas para ler o que está dentro deles e realizar buscas rápidas. Para administradores de sistema, ser capaz de filtrar logs ou comparar arquivos de configuração diretamente no terminal é uma habilidade essencial.
        </p>

        <h2 className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary" />
          TYPE e MORE: Lendo Arquivos
        </h2>
        <p>
          O comando mais simples para ler um arquivo é o <code>type</code>. Ele apenas despeja todo o conteúdo no console.
        </p>
        <CodeBlock 
          code={`REM Mostrar conteúdo de um arquivo\ntype config.ini\n\nREM Mostrar múltiplos arquivos (um após o outro)\ntype arquivo1.txt arquivo2.txt`} 
          language="batch" 
          title="Uso do TYPE" 
        />
        
        <p>
          Se o arquivo for muito grande, ele passará rápido demais pela tela. Para isso, usamos o <code>more</code>, que pausa a exibição a cada tela cheia.
        </p>
        <CodeBlock 
          code={`REM Paginar arquivo\nmore longo_log.txt\n\nREM Usar o pipe com more\ndir C:\\Windows\\System32 | more`} 
          language="batch" 
          title="Uso do MORE" 
        />
        <AlertBox type="info" title="Comandos do MORE">
          Enquanto visualiza com <code>more</code>, você pode apertar <code>Espaço</code> para a próxima página ou <code>Enter</code> para a próxima linha. <code>Q</code> sai da visualização.
        </AlertBox>
      </section>

      <section>
        <h2 className="flex items-center gap-2">
          <PlusSquare className="w-6 h-6 text-primary" />
          Criando e Concatenando Arquivos
        </h2>
        <p>
          Você não precisa de um editor de texto para criar arquivos simples.
        </p>
        <CodeBlock 
          code={`REM Criar arquivo com uma linha\necho "Minha primeira linha" > novo_arquivo.txt\n\nREM Adicionar linha ao final (append)\necho "Segunda linha" >> novo_arquivo.txt\n\nREM Criar arquivo interativamente (digite e termine com CTRL+Z)\ncopy con manual.txt`} 
          language="batch" 
          title="Criação rápida" 
        />
      </section>

      <section>
        <h2 className="flex items-center gap-2">
          <Search className="w-6 h-6 text-primary" />
          FIND e FINDSTR: Busca de Texto
        </h2>
        <p>
          Existem dois comandos principais para busca. O <code>find</code> é mais simples, enquanto o <code>findstr</code> suporta Expressões Regulares (Regex).
        </p>

        <h3>FIND</h3>
        <CodeBlock 
          code={`REM Buscar "erro" (case-sensitive)\nfind "erro" logs.txt\n\nREM Buscar "erro" ignorando maiúsculas/minúsculas (/I)\nfind /I "erro" logs.txt\n\nREM Contar quantas linhas possuem a palavra (/C)\nfind /C "login" access.log`} 
          language="batch" 
          title="Exemplos FIND" 
        />

        <h3>FINDSTR (Busca Avançada)</h3>
        <p>
          O <code>findstr</code> é muito mais versátil. Ele pode buscar em vários arquivos simultaneamente e usar padrões complexos.
        </p>
        <CodeBlock 
          code={`REM Buscar em todos os arquivos .txt da pasta e subpastas (/S)\nfindstr /S /I "senha" *.txt\n\nREM Buscar linhas que COMEÇAM com "ERROR" ou "WARN"\nfindstr /R "^ERROR ^WARN" app.log\n\nREM Buscar apenas arquivos que CONTÉM a palavra (/M)\nfindstr /M "TODO" src\\*.js`} 
          language="batch" 
          title="Exemplos FINDSTR" 
        />

        <h4>Flags Comuns do FINDSTR</h4>
        <div className="overflow-x-auto my-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-4">Flag</th>
                <th className="text-left py-2 px-4">Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>/R</code></td>
                <td className="py-2 px-4">Usa strings de busca como expressões regulares.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>/V</code></td>
                <td className="py-2 px-4">Imprime apenas as linhas que NÃO contêm a string.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>/N</code></td>
                <td className="py-2 px-4">Imprime o número da linha antes de cada linha encontrada.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>/B</code></td>
                <td className="py-2 px-4">Corresponde ao padrão se estiver no início da linha.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>/E</code></td>
                <td className="py-2 px-4">Corresponde ao padrão se estiver no final da linha.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="flex items-center gap-2">
          <Diff className="w-6 h-6 text-primary" />
          FC e COMP: Comparação de Arquivos
        </h2>
        <p>
          Precisa saber se dois arquivos são idênticos?
        </p>
        <ul>
          <li><strong>FC (File Compare)</strong>: Compara dois arquivos e mostra as diferenças. Ideal para arquivos de texto.</li>
          <li><strong>COMP</strong>: Uma comparação mais antiga, geralmente usada para arquivos binários, comparando byte a byte.</li>
        </ul>
        <CodeBlock 
          code={`REM Comparar dois arquivos de texto mostrando os números das linhas (/N)\nfc /N config_old.txt config_new.txt\n\nREM Comparação binária (/B)\nfc /B imagem1.jpg imagem2.jpg`} 
          language="batch" 
          title="Comparando arquivos" 
        />
      </section>

      <section>
        <h2 className="flex items-center gap-2">
          <Hash className="w-6 h-6 text-primary" />
          Truques de Manipulação (Head, Tail, WC)
        </h2>
        <p>
          O CMD não tem comandos nativos <code>head</code>, <code>tail</code> ou <code>wc</code> (word count) como o Linux, mas podemos simulá-los:
        </p>
        
        <div className="space-y-4">
          <div>
            <strong>Contar Linhas (WC -l):</strong>
            <CodeBlock code={`find /C "" arquivo.txt`} language="batch" />
          </div>
          
          <div>
            <strong>Pular as primeiras N linhas (Head alternativo):</strong>
            <CodeBlock code={`more +10 arquivo.txt`} language="batch" title="Começa a exibir a partir da linha 10" />
          </div>

          <div>
            <strong>Pegar as últimas linhas (Tail alternativo - Complexo):</strong>
            <p className="text-sm">No CMD puro, o tail é difícil sem um loop <code>FOR</code> ou ferramentas externas, mas você pode usar o <code>findstr</code> com números de linha e filtrar.</p>
          </div>
        </div>
      </section>

      <AlertBox type="warning" title="Codificação de Arquivos">
        O CMD lida melhor com arquivos codificados em <strong>ANSI</strong> ou <strong>UTF-8 sem BOM</strong>. Se você tentar usar <code>type</code> em um arquivo UTF-16, poderá ver caracteres estranhos. Use o comando <code>chcp 65001</code> para mudar o console para UTF-8 se necessário.
      </AlertBox>

      <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
        <Link href="/arquivos">
          <a className="text-primary hover:underline flex items-center gap-2">
            ← Manipulação de Arquivos
          </a>
        </Link>
        <Link href="/atributos">
          <a className="text-primary hover:underline flex items-center gap-2">
            Atributos e Permissões →
          </a>
        </Link>
      </div>
    </PageContainer>
  );
}
