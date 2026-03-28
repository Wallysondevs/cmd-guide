import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Search, Folder, FileText, Network, Cpu, Database, ShieldCheck, Terminal, Code } from "lucide-react";

export default function Referencias() {
  return (
    <PageContainer
      title="Referência Rápida — Tabela de Comandos"
      subtitle="Um guia visual completo com os comandos mais utilizados no Prompt de Comando do Windows"
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <section>
        <p>
          Esta página serve como um "Cheat Sheet" (folha de consulta) para você encontrar rapidamente o comando que precisa, categorizado por funcionalidade.
        </p>
      </section>

      <section>
        <h2><Folder className="inline-block mr-2 mb-1" /> Navegação e Diretórios</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Comando</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>cd</code></td><td>Muda de diretório (Change Directory). <code>cd ..</code> sobe um nível.</td></tr>
              <tr><td><code>dir</code></td><td>Lista arquivos e subpastas. <code>dir /w /p</code> para visualização amigável.</td></tr>
              <tr><td><code>md</code> / <code>mkdir</code></td><td>Cria uma nova pasta (Make Directory).</td></tr>
              <tr><td><code>rd</code> / <code>rmdir</code></td><td>Remove uma pasta vazia. <code>rd /s /q</code> remove pastas com conteúdo.</td></tr>
              <tr><td><code>pushd</code> / <code>popd</code></td><td>Salva o diretório atual em uma pilha e navega para outro, permitindo voltar depois.</td></tr>
              <tr><td><code>tree</code></td><td>Exibe a estrutura de pastas de forma gráfica.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2><FileText className="inline-block mr-2 mb-1" /> Manipulação de Arquivos</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Comando</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>copy</code></td><td>Copia um ou mais arquivos.</td></tr>
              <tr><td><code>move</code></td><td>Move ou renomeia arquivos e pastas.</td></tr>
              <tr><td><code>del</code> / <code>erase</code></td><td>Exclui arquivos.</td></tr>
              <tr><td><code>ren</code> / <code>rename</code></td><td>Renomeia arquivos e pastas.</td></tr>
              <tr><td><code>xcopy</code></td><td>Copia pastas inteiras com subpastas e atributos.</td></tr>
              <tr><td><code>robocopy</code></td><td>O "Robust File Copy" — melhor ferramenta para backups e cópias grandes.</td></tr>
              <tr><td><code>attrib</code></td><td>Altera atributos (Oculto, Somente Leitura, Sistema).</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2><Search className="inline-block mr-2 mb-1" /> Texto e Filtros</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Comando</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>type</code></td><td>Exibe o conteúdo de um arquivo de texto.</td></tr>
              <tr><td><code>more</code></td><td>Exibe o texto uma tela de cada vez.</td></tr>
              <tr><td><code>find</code></td><td>Procura por uma string de texto em um arquivo.</td></tr>
              <tr><td><code>findstr</code></td><td>Versão avançada do find (suporta Regex).</td></tr>
              <tr><td><code>sort</code></td><td>Ordena a entrada de texto.</td></tr>
              <tr><td><code>fc</code></td><td>Compara dois arquivos e mostra as diferenças (File Compare).</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2><Terminal className="inline-block mr-2 mb-1" /> Redirecionadores e Operadores</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Símbolo</th>
                <th>Função</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>{`>`}</code></td><td>Grava a saída em um arquivo (sobrescreve).</td></tr>
              <tr><td><code>{`>>`}</code></td><td>Adiciona a saída ao final de um arquivo (append).</td></tr>
              <tr><td><code>|</code></td><td>Pipe: Envia a saída de um comando para a entrada de outro.</td></tr>
              <tr><td><code>&</code></td><td>Executa o segundo comando após o primeiro.</td></tr>
              <tr><td><code>&&</code></td><td>Executa o segundo comando somente se o primeiro tiver sucesso.</td></tr>
              <tr><td><code>||</code></td><td>Executa o segundo comando somente se o primeiro falhar.</td></tr>
              <tr><td><code>2&gt;NUL</code></td><td>Oculta mensagens de erro.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2><Network className="inline-block mr-2 mb-1" /> Rede e Conectividade</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Comando</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>ipconfig</code></td><td>Exibe configurações de IP. <code>/all</code> para detalhes.</td></tr>
              <tr><td><code>ping</code></td><td>Testa conectividade com um host.</td></tr>
              <tr><td><code>tracert</code></td><td>Rastreia a rota dos pacotes até o destino.</td></tr>
              <tr><td><code>netstat</code></td><td>Lista conexões de rede ativas e portas.</td></tr>
              <tr><td><code>nslookup</code></td><td>Consulta registros de servidores DNS.</td></tr>
              <tr><td><code>netsh</code></td><td>Configurações avançadas de rede e firewall.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2><Cpu className="inline-block mr-2 mb-1" /> Sistema e Processos</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Comando</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>tasklist</code></td><td>Lista todos os processos em execução.</td></tr>
              <tr><td><code>taskkill</code></td><td>Finaliza um processo (pelo PID ou nome).</td></tr>
              <tr><td><code>systeminfo</code></td><td>Exibe informações detalhadas do sistema e hardware.</td></tr>
              <tr><td><code>wmic</code></td><td>Interface de linha de comando para o WMI.</td></tr>
              <tr><td><code>sc</code></td><td>Gerencia serviços do Windows (Service Control).</td></tr>
              <tr><td><code>shutdown</code></td><td>Desliga, reinicia ou agenda o desligamento do PC.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2><Code className="inline-block mr-2 mb-1" /> Variáveis e Scripting</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Comando</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><code>set</code></td><td>Define ou exibe variáveis de ambiente locais.</td></tr>
              <tr><td><code>setx</code></td><td>Define variáveis de ambiente persistentes.</td></tr>
              <tr><td><code>if</code></td><td>Execução condicional em scripts.</td></tr>
              <tr><td><code>for</code></td><td>Loops e iterações sobre arquivos ou conjuntos de dados.</td></tr>
              <tr><td><code>goto</code></td><td>Salta para um rótulo (label) no script.</td></tr>
              <tr><td><code>call</code></td><td>Chama um script ou função externa sem encerrar o atual.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <AlertBox type="info" title="Dica de Ajuda">
        Qualquer comando aceita o parâmetro <code>/?</code> para exibir sua ajuda completa e lista de argumentos disponíveis. Ex: <code>dir /?</code>
      </AlertBox>
    </PageContainer>
  );
}
