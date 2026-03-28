import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Shield, User, Lock, Key, FileWarning, RotateCcw, Save } from "lucide-react";

export default function Permissoes() {
  return (
    <PageContainer
      title="Permissões com ICACLS e TAKEOWN"
      subtitle="Gerencie o controle de acesso e posse de arquivos no sistema de arquivos NTFS"
      difficulty="avancado"
      timeToRead="25 min"
    >
      <section>
        <p>
          No Windows, a segurança de arquivos e pastas é baseada em Listas de Controle de Acesso (ACLs). Dominar os comandos <code>ICACLS</code> e <code>TAKEOWN</code> é essencial para resolver problemas de "Acesso Negado", automatizar a segurança de servidores e garantir que dados sensíveis estejam protegidos contra acessos não autorizados.
        </p>
      </section>

      <section>
        <h2><Shield className="inline-block mr-2 mb-1" /> O Comando ICACLS</h2>
        <p>
          O <code>ICACLS</code> (Integrity Control Access Control List) é a ferramenta definitiva para exibir ou modificar permissões. Ele é o sucessor do antigo <code>CACLS</code>.
        </p>

        <h3>Visualizando Permissões</h3>
        <p>Para ver quem tem acesso a um arquivo ou pasta:</p>
        <CodeBlock code={`icacls "C:\\PastaSegura"`} language="batch" />
        <p>A saída mostrará usuários e siglas como <code>(F)</code>, <code>(R)</code>, <code>(W)</code>. Vamos entender o que significam.</p>

        <h3>Tabela de Permissões (Direitos de Acesso)</h3>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Sigla</th>
                <th>Permissão</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>F</code></td>
                <td>Full Access</td>
                <td>Controle total (Ler, Gravar, Modificar, Excluir, Mudar Permissões).</td>
              </tr>
              <tr>
                <td><code>M</code></td>
                <td>Modify</td>
                <td>Modificar (Ler, Gravar, Excluir).</td>
              </tr>
              <tr>
                <td><code>RX</code></td>
                <td>Read & Execute</td>
                <td>Ler e Executar arquivos.</td>
              </tr>
              <tr>
                <td><code>R</code></td>
                <td>Read</td>
                <td>Somente leitura.</td>
              </tr>
              <tr>
                <td><code>W</code></td>
                <td>Write</td>
                <td>Somente gravação.</td>
              </tr>
              <tr>
                <td><code>D</code></td>
                <td>Delete</td>
                <td>Permissão para excluir o objeto.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2><Lock className="inline-block mr-2 mb-1" /> Concedendo e Negando Acesso</h2>
        
        <h3>Conceder (/grant)</h3>
        <p>Para dar permissão de leitura e execução para o usuário "Joao":</p>
        <CodeBlock code={`icacls "arquivo.txt" /grant Joao:RX`} language="batch" />

        <h3>Negar (/deny)</h3>
        <p>A negação explícita sempre tem prioridade sobre a concessão.</p>
        <CodeBlock code={`icacls "arquivo.txt" /deny "Visitante":F`} language="batch" />

        <h3>Substituir permissões existentes (:r)</h3>
        <p>Por padrão, o <code>/grant</code> adiciona permissões. Se quiser substituir as que o usuário já tem, use <code>:r</code>.</p>
        <CodeBlock code={`icacls "arquivo.txt" /grant:r Joao:F`} language="batch" />

        <AlertBox type="danger" title="Cuidado com a Negação">
          Se você aplicar um <code>/deny Everyone:F</code> em uma pasta, nem você nem o administrador conseguirão acessá-la sem ferramentas de recuperação ou tomando a posse novamente.
        </AlertBox>
      </section>

      <section>
        <h2><Key className="inline-block mr-2 mb-1" /> Herança e Propagação</h2>
        <p>Em diretórios, é importante definir como as permissões se comportam para subpastas e arquivos novos.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded-lg">
            <h4 className="font-bold">Flags de Herança</h4>
            <ul>
              <li><code>(OI)</code>: Object Inherit - Arquivos herdam.</li>
              <li><code>(CI)</code>: Container Inherit - Pastas herdam.</li>
              <li><code>(IO)</code>: Inherit Only - Não aplica ao objeto atual, só aos filhos.</li>
              <li><code>(NP)</code>: No Propagate - Não passa para além dos filhos diretos.</li>
            </ul>
          </div>
          <div className="border p-4 rounded-lg">
            <h4 className="font-bold">Controle de Herança</h4>
            <ul>
              <li><code>/inheritance:e</code>: Habilita herança.</li>
              <li><code>/inheritance:d</code>: Desabilita herança e copia os itens.</li>
              <li><code>/inheritance:r</code>: Remove todas as permissões herdadas.</li>
            </ul>
          </div>
        </div>

        <CodeBlock 
          code={`icacls "C:\\Projetos" /grant Usuarios:(OI)(CI)M`} 
          language="batch" 
          title="Permissão de Modificação recursiva" 
        />
      </section>

      <section>
        <h2><User className="inline-block mr-2 mb-1" /> Tomando Posse com TAKEOWN</h2>
        <p>
          Se você encontrar um erro de "Acesso Negado" mesmo sendo administrador, pode ser que você não seja o "Dono" (Owner) do arquivo.
        </p>
        <CodeBlock code={`takeown /F "C:\\PastaProtegida" /R /D Y`} language="batch" title="Tomar posse recursivamente" />
        
        <p>Argumentos:</p>
        <ul>
          <li><code>/F</code>: Caminho do arquivo ou diretório.</li>
          <li><code>/R</code>: Recursivo (inclui subpastas).</li>
          <li><code>/D Y</code>: Responde "Sim" automaticamente para prompts de confirmação.</li>
          <li><code>/A</code>: Atribui a posse ao grupo de Administradores em vez do usuário atual.</li>
        </ul>
      </section>

      <section>
        <h2><Save className="inline-block mr-2 mb-1" /> Backup e Restauração de ACLs</h2>
        <p>Você pode salvar o estado atual das permissões para restaurar depois ou replicar em outro lugar.</p>
        
        <CodeBlock 
          code={`REM Salvar\nicacls C:\\Dados /save permissoes_backup.txt /t\n\nREM Restaurar\nicacls C:\\ /restore permissoes_backup.txt`} 
          language="batch" 
        />
        <AlertBox type="info" title="Dica de Restauração">
          Ao restaurar, o <code>icacls</code> espera que você aponte para o diretório PAI da pasta salva no backup.
        </AlertBox>
      </section>

      <section>
        <h2>Exemplos Práticos</h2>

        <h3>1. Resetar permissões para o padrão</h3>
        <p>Útil quando uma pasta está "bagunçada" com permissões estranhas:</p>
        <CodeBlock code={`icacls "C:\\PastaBugada" /reset /t /c /l`} language="batch" />

        <h3>2. Remover um usuário específico de todos os arquivos</h3>
        <CodeBlock code={`icacls "C:\\Dados" /remove "ExFuncionario" /t`} language="batch" />

        <h3>3. Script para "Destravar" pasta de sistema</h3>
        <CodeBlock 
          code={`takeown /f "C:\\Windows\\MinhaPasta" /a /r /d y\nicacls "C:\\Windows\\MinhaPasta" /grant administrators:F /t`} 
          language="batch" 
        />
      </section>
    </PageContainer>
  );
}
