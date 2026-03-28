import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Folder, FolderTree, ArrowLeftRight, Navigation, Search, Info, HardDrive } from "lucide-react";

export default function Navegacao() {
  return (
    <PageContainer 
      title="Navegação no Sistema de Arquivos" 
      subtitle="Domine os comandos essenciais para explorar diretórios e gerenciar pastas" 
      difficulty="iniciante" 
      timeToRead="15 min"
    >
      <section>
        <h2>O Básico da Navegação</h2>
        <p>
          Navegar pelo Prompt de Comando é a habilidade fundamental para qualquer usuário de CMD. Em vez de cliques e ícones, usamos caminhos de texto e comandos para nos mover entre as unidades de disco e pastas.
        </p>
      </section>

      <section>
        <h2>CD (Change Directory)</h2>
        <p>O comando <code>CD</code> (ou <code>CHDIR</code>) é usado para mudar o diretório atual.</p>
        
        <h3>Movimentação básica:</h3>
        <ul>
          <li><code>cd Pasta</code>: Entra na pasta "Pasta".</li>
          <li><code>cd ..</code>: Volta um nível para a pasta pai.</li>
          <li><code>cd \</code>: Volta para a raiz da unidade atual (ex: C:\).</li>
        </ul>

        <AlertBox type="danger" title="Mudando de Unidade">
          Se você estiver no <code>C:</code> e quiser ir para o <code>D:</code>, o comando <code>cd D:\Pasta</code> NÃO funcionará sozinho. Você deve usar o parâmetro <code>/D</code>:
          <CodeBlock code={`cd /d D:\\Arquivos`} language="batch" title="Mudar de unidade e pasta simultaneamente" />
          Ou simplesmente digite a letra do drive:
          <CodeBlock code={`D:`} language="batch" title="Trocar de drive" />
        </AlertBox>
      </section>

      <section>
        <h2>DIR: Listagem de Conteúdo</h2>
        <p>O comando <code>DIR</code> exibe os arquivos e subpastas de um diretório. Ele é extremamente poderoso devido às suas flags.</p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2 text-left">Flag</th>
                <th className="border border-border p-2 text-left">Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-border p-2"><code>/p</code></td><td className="border border-border p-2">Pausa a cada tela cheia.</td></tr>
              <tr><td className="border border-border p-2"><code>/w</code></td><td className="border border-border p-2">Formato largo (só nomes, várias colunas).</td></tr>
              <tr><td className="border border-border p-2"><code>/s</code></td><td className="border border-border p-2">Recursivo (lista subpastas também).</td></tr>
              <tr><td className="border border-border p-2"><code>/b</code></td><td className="border border-border p-2">Formato básico (apenas nomes, sem cabeçalhos).</td></tr>
              <tr><td className="border border-border p-2"><code>/a</code></td><td className="border border-border p-2">Mostra arquivos com atributos específicos (ex: <code>/ah</code> para ocultos).</td></tr>
              <tr><td className="border border-border p-2"><code>/o</code></td><td className="border border-border p-2">Ordenação (ex: <code>/on</code> por nome, <code>/os</code> por tamanho).</td></tr>
            </tbody>
          </table>
        </div>
        <CodeBlock code={`dir /s /b *.txt`} language="batch" title="Procurar todos os .txt no drive atual" />
      </section>

      <section>
        <h2>Criando e Removendo Pastas</h2>
        <h3>MD ou MKDIR (Make Directory)</h3>
        <p>Cria novos diretórios. Um recurso legal do MD no Windows é que ele cria a árvore completa se as pastas intermediárias não existirem.</p>
        <CodeBlock code={`md "Projeto\\src\\assets\\images"`} language="batch" title="Criar múltiplas pastas de uma vez" />

        <h3>RD ou RMDIR (Remove Directory)</h3>
        <p>Remove pastas vazias por padrão. Para remover uma pasta com todo o seu conteúdo:</p>
        <CodeBlock code={`rd /s /q "Antiga_Pasta"`} language="batch" title="Remoção forçada e silenciosa" />
        <ul>
          <li><code>/s</code>: Remove todos os arquivos e subpastas.</li>
          <li><code>/q</code>: Modo "Quiet" (não pede confirmação).</li>
        </ul>
      </section>

      <section>
        <h2>PUSHD e POPD: A Pilha de Diretórios</h2>
        <p>Estes comandos são salvadores de vida em scripts complexos. O <code>PUSHD</code> "lembra" onde você está antes de mudar para outra pasta, e o <code>POPD</code> te traz de volta.</p>
        <CodeBlock code={`pushd C:\\Windows\\System32\nREM Faz algo aqui...\npopd\nREM Voce voltou exatamente para onde estava antes do pushd.`} language="batch" title="Uso da pilha de diretórios" />
        
        <AlertBox type="info" title="Vantagem extra">
          O <code>PUSHD</code> consegue mapear caminhos de rede (UNC) como <code>\\\\Servidor\\Pasta</code> temporariamente para uma letra de drive, o que o <code>CD</code> comum não faz.
        </AlertBox>
      </section>

      <section>
        <h2>TREE: Visualização Estrutural</h2>
        <p>Exibe a estrutura de pastas graficamente.</p>
        <CodeBlock code={`tree /f /a`} language="batch" title="Ver árvore de pastas e arquivos" />
        <ul>
          <li><code>/f</code>: Inclui os arquivos na exibição.</li>
          <li><code>/a</code>: Usa caracteres de texto comuns em vez de linhas gráficas (melhor para salvar em arquivos .txt).</li>
        </ul>
      </section>

      <section>
        <h2>O Comando PATH</h2>
        <p>
          O <code>PATH</code> é uma variável especial que diz ao CMD onde procurar por comandos. Se você digita <code>python</code> e ele não é encontrado, provavelmente o diretório dele não está no PATH.
        </p>
        <CodeBlock code={`path\nREM Mostra o path atual\nset PATH=%PATH%;C:\\NovoCaminho\nREM Adiciona temporariamente um caminho`} language="batch" title="Gerenciar o PATH" />
      </section>

      <section>
        <h2>Caminhos Relativos vs Absolutos</h2>
        <p>Entender a diferença é crucial para criar scripts portáteis:</p>
        <ul>
          <li><strong>Absoluto:</strong> Começa da raiz do drive (<code>C:\Pasta\Arquivo.txt</code>). Funciona de qualquer lugar, mas quebra se o drive mudar.</li>
          <li><strong>Relativo:</strong> Baseado na sua posição atual (<code>.\subpasta\config.json</code> ou <code>..\fotos\vacas.jpg</code>).</li>
        </ul>
      </section>

      <section>
        <h2>Coringas (Wildcards)</h2>
        <p>Use coringas para afetar múltiplos arquivos:</p>
        <ul>
          <li><code>*</code>: Representa qualquer número de caracteres.</li>
          <li><code>?</code>: Representa um único caractere.</li>
        </ul>
        <CodeBlock code={`dir *.png\ndel documento_??.docx`} language="batch" title="Uso de coringas" />
      </section>
    </PageContainer>
  );
}
