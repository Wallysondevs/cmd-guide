import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { FileCode, Folder, Copy, Move, Trash2, Edit3, ShieldCheck, Zap, HardDrive } from "lucide-react";

export default function Arquivos() {
  return (
    <PageContainer 
      title="Manipulação de Arquivos e Pastas" 
      subtitle="Domine os comandos fundamentais para gerenciar o sistema de arquivos no Windows" 
      difficulty="iniciante" 
      timeToRead="20 min"
    >
      <section>
        <p>
          A manipulação de arquivos e diretórios é a base de quase qualquer operação no Prompt de Comando. Desde uma simples cópia até backups complexos e sincronização de dados, o CMD oferece ferramentas poderosas que, embora antigas, ainda são extremamente eficientes e amplamente utilizadas em scripts de automação (arquivos .bat ou .cmd).
        </p>

        <h2 className="flex items-center gap-2">
          <FileCode className="w-6 h-6 text-primary" />
          Conceitos Básicos: Wildcards (Curingas)
        </h2>
        <p>
          Antes de mergulhar nos comandos, é vital entender os <strong>wildcards</strong>. Eles permitem que você selecione múltiplos arquivos de uma só vez baseando-se em padrões de nomes.
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-4">Curinga</th>
                <th className="text-left py-2 px-4">Descrição</th>
                <th className="text-left py-2 px-4">Exemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>*</code></td>
                <td className="py-2 px-4">Representa zero ou mais caracteres.</td>
                <td className="py-2 px-4"><code>*.txt</code> (todos os arquivos de texto)</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>?</code></td>
                <td className="py-2 px-4">Representa exatamente um único caractere.</td>
                <td className="py-2 px-4"><code>relat??.doc</code> (relat01.doc, relatAB.doc)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="flex items-center gap-2">
          <Copy className="w-6 h-6 text-primary" />
          COPY: Cópia Básica e Concatenação
        </h2>
        <p>
          O comando <code>copy</code> é usado para copiar um ou mais arquivos de um local para outro. Ele não copia subdiretórios (para isso, use o XCOPY ou ROBOCOPY).
        </p>
        <CodeBlock 
          code={`REM Copiar um arquivo\ncopy documento.txt C:\\Backup\\\n\nREM Copiar todos os arquivos .jpg para a pasta imagens\ncopy *.jpg .\\imagens\\\n\nREM Copiar e renomear ao mesmo tempo\ncopy antigo.txt novo.txt`} 
          language="batch" 
          title="Exemplos do comando COPY" 
        />

        <h3>Flags Importantes do COPY</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-4">Flag</th>
                <th className="text-left py-2 px-4">Função</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>/Y</code></td>
                <td className="py-2 px-4">Suprime a confirmação para sobrescrever um arquivo existente.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>/-Y</code></td>
                <td className="py-2 px-4">Força a confirmação antes de sobrescrever (padrão).</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>/V</code></td>
                <td className="py-2 px-4">Verifica se os novos arquivos foram gravados corretamente.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>/B</code></td>
                <td className="py-2 px-4">Indica um arquivo binário.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>/A</code></td>
                <td className="py-2 px-4">Indica um arquivo de texto ASCII.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <AlertBox type="info" title="Dica: Concatenando Arquivos">
          Você pode usar o <code>copy</code> para unir arquivos! 
          <br />
          <code>copy parte1.txt + parte2.txt arquivo_final.txt</code>
        </AlertBox>
      </section>

      <section>
        <h2 className="flex items-center gap-2">
          <Move className="w-6 h-6 text-primary" />
          MOVE e REN: Mover e Renomear
        </h2>
        <p>
          Enquanto o <code>copy</code> duplica, o <code>move</code> transfere o arquivo, removendo-o da origem.
        </p>
        <CodeBlock 
          code={`REM Mover arquivo\nmove foto.png D:\\Fotos\\Ferias\\\n\nREM Mover e renomear diretório\nmove C:\\AntigoNome C:\\NovoNome\n\nREM Renomear arquivo (apenas no mesmo diretório)\nren "nome original.txt" "nome_novo.txt"`} 
          language="batch" 
          title="MOVE e REN" 
        />
        <AlertBox type="warning" title="Atenção">
          O comando <code>ren</code> (ou <code>rename</code>) não permite especificar um novo caminho para o arquivo. Ele apenas altera o nome dentro da mesma pasta. Para mover para outra pasta com novo nome, use <code>move</code>.
        </AlertBox>
      </section>

      <section>
        <h2 className="flex items-center gap-2">
          <Trash2 className="w-6 h-6 text-primary" />
          DEL / ERASE: Exclusão de Arquivos
        </h2>
        <p>
          O comando <code>del</code> exclui um ou mais arquivos. <strong>Cuidado:</strong> arquivos deletados via CMD não vão para a Lixeira!
        </p>
        <CodeBlock 
          code={`REM Deletar um arquivo específico\ndel segredo.txt\n\nREM Deletar silenciosamente (/Q) todos os .tmp de todas as subpastas (/S)\ndel /S /Q *.tmp\n\nREM Deletar arquivos com atributos específicos (ex: leitura obrigatória /A:R)\ndel /A:R arquivo_protegido.txt`} 
          language="batch" 
          title="Exemplos do comando DEL" 
        />
        
        <h3>Parâmetros do DEL</h3>
        <ul>
          <li><code>/P</code>: Pede confirmação antes de excluir cada arquivo.</li>
          <li><code>/F</code>: Força a exclusão de arquivos somente leitura.</li>
          <li><code>/S</code>: Exclui arquivos especificados de todos os subdiretórios.</li>
          <li><code>/Q</code>: Modo silencioso, não pede confirmação (cuidado com o <code>*.*</code>).</li>
          <li><code>/A</code>: Seleciona arquivos com base em atributos (H para ocultos, S para sistema, etc).</li>
        </ul>
      </section>

      <section>
        <h2 className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" />
          XCOPY: Cópia Avançada
        </h2>
        <p>
          O <code>xcopy</code> é uma versão muito mais poderosa do <code>copy</code>, capaz de copiar árvores de diretórios inteiras e manter atributos de arquivos.
        </p>
        <CodeBlock 
          code={`REM Copia tudo, incluindo subpastas vazias (/E) e arquivos ocultos (/H)\nxcopy C:\\Projetos D:\\Backup\\Projetos /E /H /Y /I`} 
          language="batch" 
          title="Uso do XCOPY" 
        />

        <h3>Principais Flags do XCOPY</h3>
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
                <td className="py-2 px-4"><code>/S</code></td>
                <td className="py-2 px-4">Copia diretórios e subdiretórios, exceto os vazios.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>/E</code></td>
                <td className="py-2 px-4">Copia diretórios e subdiretórios, incluindo os vazios.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>/D:m-d-y</code></td>
                <td className="py-2 px-4">Copia arquivos alterados na data especificada ou depois dela.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>/I</code></td>
                <td className="py-2 px-4">Se o destino não existir e estiver copiando mais de um arquivo, assume que o destino é um diretório.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>/C</code></td>
                <td className="py-2 px-4">Continua copiando mesmo que ocorram erros.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>/H</code></td>
                <td className="py-2 px-4">Copia arquivos ocultos e de sistema também.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>/K</code></td>
                <td className="py-2 px-4">Copia atributos. O Xcopy normal redefine o atributo somente leitura.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="flex items-center gap-2">
          <HardDrive className="w-6 h-6 text-primary" />
          ROBOCOPY: O "Robust File Copy"
        </h2>
        <p>
          O <code>robocopy</code> é a ferramenta definitiva para replicação de arquivos no Windows. Ele foi projetado para lidar com grandes volumes de dados e conexões de rede instáveis.
        </p>
        <CodeBlock 
          code={`REM Espelhar diretório (/MIR): deleta no destino o que não existe na origem!\nrobocopy C:\\Dados Z:\\Backup /MIR /W:5 /R:3 /LOG:log_backup.txt\n\nREM Mover arquivos (/MOVE) ignorando certas extensões\nrobocopy C:\\Temp D:\\Arquivo /MOVE /XF *.tmp *.log`} 
          language="batch" 
          title="Exemplos de ROBOCOPY" 
        />

        <h3>Diferenciais do ROBOCOPY</h3>
        <ul>
          <li><strong>/MIR (Mirror)</strong>: Sincroniza dois diretórios. <strong>Perigo:</strong> Deleta arquivos no destino se eles não existirem mais na origem.</li>
          <li><strong>/Z (Restartable Mode)</strong>: Se a rede cair no meio de um arquivo grande, ele continua de onde parou.</li>
          <li><strong>/R:n e /W:n</strong>: Número de tentativas (Retries) e tempo de espera (Wait) entre elas em caso de erro.</li>
          <li><strong>/MT[:n]</strong>: Multi-threaded copying. Copia vários arquivos simultaneamente (padrão 8 threads).</li>
          <li><strong>/LOG:arquivo.txt</strong>: Redireciona o status para um arquivo de log em vez da tela.</li>
        </ul>
      </section>

      <section>
        <h2 className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-primary" />
          Dicas Práticas e Armadilhas
        </h2>
        <AlertBox type="danger" title="Barra final (Trailing Slash)">
          No CMD, <code>C:\Pasta</code> e <code>C:\Pasta\</code> podem ser interpretados de forma diferente por alguns comandos. 
          No <code>XCOPY</code>, se o destino não terminar com barra, ele pode perguntar se o destino é um arquivo ou diretório. Use sempre a barra final para diretórios para evitar ambiguidades.
        </AlertBox>

        <h3>Exemplo de Script de Sincronização Simples</h3>
        <p>Um pequeno script batch para rodar diariamente e manter seus documentos seguros:</p>
        <CodeBlock 
          code={`@echo off\nset ORIGEM=C:\\Users\\Usuario\\Documents\nset DESTINO=E:\\Backup_Documentos\n\necho Iniciando Backup em %date% as %time%...\nrobocopy "%ORIGEM%" "%DESTINO%" /MIR /FFT /Z /XA:H /W:5 /R:2 /MT:16 /LOG:backup_log.txt\n\nif %ERRORLEVEL% LEQ 4 (\n    echo Backup concluido com sucesso!\n) else (\n    echo Ocorreram erros significativos no backup. Verifique o log.\n)\npause`} 
          language="batch" 
          title="backup_diario.bat" 
        />
        <p>
          Note o uso do <code>%ERRORLEVEL%</code>. O Robocopy retorna códigos específicos: 0-4 são geralmente "sucesso" ou "nenhuma mudança", acima de 8 indica falhas graves.
        </p>
      </section>

      <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
        <Link href="/navegacao">
          <a className="text-primary hover:underline flex items-center gap-2">
            ← Navegação básica
          </a>
        </Link>
        <Link href="/conteudo">
          <a className="text-primary hover:underline flex items-center gap-2">
            Conteúdo de Arquivos →
          </a>
        </Link>
      </div>
    </PageContainer>
  );
}
