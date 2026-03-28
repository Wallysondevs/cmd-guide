import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Shield, Lock, Key, Eye, UserCheck, Settings, FileWarning } from "lucide-react";

export default function Atributos() {
  return (
    <PageContainer 
      title="Atributos e Permissões de Arquivos" 
      subtitle="Controle quem pode ler, escrever ou ver seus arquivos no Windows" 
      difficulty="avancado" 
      timeToRead="25 min"
    >
      <section>
        <p>
          No Windows, a segurança e a visibilidade dos arquivos são controladas por dois mecanismos distintos: <strong>Atributos</strong> (herança do DOS) e <strong>Permissões NTFS</strong> (ACLs - Access Control Lists). Entender a diferença entre eles é crucial para proteger dados e resolver problemas de acesso negado.
        </p>

        <h2 className="flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" />
          ATTRIB: Atributos de Arquivo
        </h2>
        <p>
          Os atributos são flags simples anexadas ao arquivo. Eles não dependem de quem é o usuário logado.
        </p>
        <div className="overflow-x-auto my-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-4">Atributo</th>
                <th className="text-left py-2 px-4">Letra</th>
                <th className="text-left py-2 px-4">Significado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 px-4">Read-only</td>
                <td className="py-2 px-4"><code>R</code></td>
                <td className="py-2 px-4">Somente leitura. Impede alterações acidentais.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4">Hidden</td>
                <td className="py-2 px-4"><code>H</code></td>
                <td className="py-2 px-4">Oculto. O arquivo não aparece no DIR comum.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4">System</td>
                <td className="py-2 px-4"><code>S</code></td>
                <td className="py-2 px-4">Arquivo de sistema. Geralmente oculto e protegido.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4">Archive</td>
                <td className="py-2 px-4"><code>A</code></td>
                <td className="py-2 px-4">Arquivo pronto para backup (modificado desde o último backup).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock 
          code={`REM Ver atributos da pasta atual\nattrib\n\nREM Tornar um arquivo oculto e somente leitura\nattrib +h +r segredo.txt\n\nREM Remover atributo de sistema e oculto de forma recursiva (/S /D)\nattrib -s -h C:\\Pasta\\*.* /S /D`} 
          language="batch" 
          title="Uso do ATTRIB" 
        />
        
        <AlertBox type="info" title="Flags Recursivas">
          A flag <code>/s</code> processa arquivos na pasta atual e em todas as subpastas. A flag <code>/d</code> processa também as pastas em si.
        </AlertBox>
      </section>

      <section>
        <h2 className="flex items-center gap-2">
          <Lock className="w-6 h-6 text-primary" />
          ICACLS: Gerenciamento de Permissões
        </h2>
        <p>
          O <code>icacls</code> é a ferramenta moderna (substituta do antigo <code>cacls</code>) para manipular Listas de Controle de Acesso (ACLs) em volumes NTFS. Aqui você define permissões por usuário ou grupo.
        </p>

        <h3>Permissões Comuns</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-4">Código</th>
                <th className="text-left py-2 px-4">Permissão</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>F</code></td>
                <td className="py-2 px-4">Full access (Controle total).</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>M</code></td>
                <td className="py-2 px-4">Modify access (Modificar, ler, gravar, excluir).</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>RX</code></td>
                <td className="py-2 px-4">Read and execute (Ler e executar).</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>R</code></td>
                <td className="py-2 px-4">Read-only (Apenas leitura).</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-4"><code>W</code></td>
                <td className="py-2 px-4">Write-only (Apenas gravação).</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock 
          code={`REM Conceder permissão de modificação para um usuário\nicacls "C:\\Projeto" /grant UsuarioX:M\n\nREM Negar acesso explicitamente\nicacls "C:\\Projeto" /deny UsuarioMalvado:F\n\nREM Remover todas as permissões de um usuário\nicacls "C:\\Projeto" /remove UsuarioX\n\nREM Redefinir permissões para o padrão herdado (/reset)\nicacls "C:\\Pasta" /reset /T /C /L`} 
          language="batch" 
          title="Exemplos ICACLS" 
        />

        <AlertBox type="danger" title="Herança de Permissões">
          Arquivos dentro de uma pasta geralmente herdam as permissões da pasta pai. 
          <br />
          Use <code>/inheritance:e</code> para habilitar, <code>d</code> para desabilitar e copiar permissões, ou <code>r</code> para remover todas as permissões herdadas.
        </AlertBox>

        <h3>Backup e Restauração de ACLs</h3>
        <p>Uma das funções mais úteis do <code>icacls</code> é salvar a estrutura de permissões de uma árvore de diretórios inteira para restaurar depois (útil antes de grandes mudanças).</p>
        <CodeBlock 
          code={`REM Salvar permissões atuais em um arquivo\nicacls C:\\PastaSegura /save permissoes_backup.acl /T\n\nREM Restaurar permissões a partir do arquivo\nicacls C:\\ /restore permissoes_backup.acl`} 
          language="batch" 
          title="Backup de Permissões" 
        />
      </section>

      <section>
        <h2 className="flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-primary" />
          TAKEOWN: Tomando Posse
        </h2>
        <p>
          Às vezes você não tem permissão nem para ver quem tem permissão. Nesses casos, um administrador pode usar o <code>takeown</code> para se tornar o dono do arquivo.
        </p>
        <CodeBlock 
          code={`REM Tomar posse de um arquivo\ntakeown /f "C:\\ArquivoProtegido.txt"\n\nREM Tomar posse de uma pasta inteira recursivamente (/R)\ntakeown /f "C:\\Windows\\PastaAntiga" /r /d y`} 
          language="batch" 
          title="Uso do TAKEOWN" 
        />
        <p className="text-sm italic">
          Nota: <code>/d y</code> responde "Sim" automaticamente para perguntas de confirmação durante a operação recursiva.
        </p>
      </section>

      <section>
        <h2 className="flex items-center gap-2">
          <Key className="w-6 h-6 text-primary" />
          CIPHER: Criptografia de Arquivos
        </h2>
        <p>
          O comando <code>cipher</code> permite gerenciar a criptografia EFS (Encrypting File System) em partições NTFS.
        </p>
        <CodeBlock 
          code={`REM Criptografar um diretório\ncipher /e "C:\\DadosSensiveis"\n\nREM Descriptografar\ncipher /d "C:\\DadosSensiveis"\n\nREM Ver o status de criptografia dos arquivos\ncipher /c\n\nREM Sobrescrever espaço livre em disco para impedir recuperação (/W)\ncipher /w:C:`} 
          language="batch" 
          title="Uso do CIPHER" 
        />
        <AlertBox type="warning" title="Cuidado com a Criptografia">
          Se você criptografar arquivos e perder seu certificado de usuário ou formatar o Windows sem backup das chaves, **os dados serão perdidos permanentemente**. O EFS é vinculado ao perfil do usuário no Windows.
        </AlertBox>
      </section>

      <section>
        <h2 className="flex items-center gap-2">
          <FileWarning className="w-6 h-6 text-primary" />
          NTFS vs. Share Permissions
        </h2>
        <p>
          É importante entender que permissões de **Compartilhamento** (Share) só se aplicam a acessos via rede. Já as permissões **NTFS** se aplicam tanto a acessos locais quanto de rede.
        </p>
        <AlertBox type="info" title="Regra de Ouro">
          Quando as duas permissões existem, o Windows aplica a **mais restritiva**. Por exemplo, se o Compartilhamento permitir "Todos - Controle Total", mas o NTFS permitir apenas "Leitura" para o seu usuário, você terá apenas acesso de leitura.
        </AlertBox>
      </section>

      <section>
        <h2>Exemplo Prático: Script de Segurança</h2>
        <p>
          Em scripts de instalação ou configuração de servidores, é comum garantir que certas pastas tenham permissões restritas. Abaixo um exemplo de como "limpar" uma pasta e dar acesso apenas ao Administrador e a um serviço específico:
        </p>
        <CodeBlock 
          code={`@echo off\nset TARGET=C:\\App\\Logs\n\nREM 1. Torna-se dono da pasta\ntakeown /f "%TARGET%" /r /d y\n\nREM 2. Remove herança e limpa permissões existentes\nicacls "%TARGET%" /inheritance:r\n\nREM 3. Dá acesso total ao grupo de Administradores\nREM (OI) = Object Inherit, (CI) = Container Inherit\nicacls "%TARGET%" /grant Administrators:(OI)(CI)F\n\nREM 4. Dá acesso de leitura/gravação ao usuário do serviço\nicacls "%TARGET%" /grant "ServicoApp":(OI)(CI)M\n\necho Permissoes configuradas com sucesso!`} 
          language="batch" 
          title="Configuração de Segurança via Batch" 
        />
      </section>

      <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
        <Link href="/conteudo">
          <a className="text-primary hover:underline flex items-center gap-2">
            ← Conteúdo de Arquivos
          </a>
        </Link>
        <Link href="/redirecionamento">
          <a className="text-primary hover:underline flex items-center gap-2">
            Redirecionamento →
          </a>
        </Link>
      </div>
    </PageContainer>
  );
}
