import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Link, Folder, ArrowRight, HardDrive } from "lucide-react";

export default function LinksSimbolicos() {
  return (
    <PageContainer
      title="Links Simbólicos e Junções"
      subtitle="Crie atalhos virtuais no sistema de arquivos com MKLINK para economizar espaço, organizar pastas e resolver conflitos de caminho."
      difficulty="intermediario"
      timeToRead="22 min"
    >
      <h2><Link className="inline-block mr-2 mb-1 w-5 h-5" /> MKLINK — Criando Links no Windows</h2>
      <p>O <code>MKLINK</code> cria diferentes tipos de links no sistema de arquivos NTFS. São como atalhos, mas transparentes para aplicações — o sistema de arquivos trata o link como se fosse o arquivo ou pasta real.</p>

      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-border">
          <thead><tr className="bg-muted">
            <th className="border border-border p-2 text-left">Tipo</th>
            <th className="border border-border p-2 text-left">Comando</th>
            <th className="border border-border p-2 text-left">Alvo</th>
            <th className="border border-border p-2 text-left">Cruzar Volumes?</th>
          </tr></thead>
          <tbody>
            <tr>
              <td className="border border-border p-2 font-bold">Link Simbólico (arquivo)</td>
              <td className="border border-border p-2 font-mono text-sm">mklink link.txt alvo.txt</td>
              <td className="border border-border p-2">Arquivo</td>
              <td className="border border-border p-2 text-green-400">Sim</td>
            </tr>
            <tr>
              <td className="border border-border p-2 font-bold">Link Simbólico (pasta)</td>
              <td className="border border-border p-2 font-mono text-sm">mklink /D PastaLink AltoPasta</td>
              <td className="border border-border p-2">Pasta</td>
              <td className="border border-border p-2 text-green-400">Sim</td>
            </tr>
            <tr>
              <td className="border border-border p-2 font-bold">Junction (junção)</td>
              <td className="border border-border p-2 font-mono text-sm">mklink /J PastaLink AltoPasta</td>
              <td className="border border-border p-2">Pasta (local)</td>
              <td className="border border-border p-2 text-yellow-400">Apenas local</td>
            </tr>
            <tr>
              <td className="border border-border p-2 font-bold">Hard Link</td>
              <td className="border border-border p-2 font-mono text-sm">mklink /H link.txt alvo.txt</td>
              <td className="border border-border p-2">Arquivo</td>
              <td className="border border-border p-2 text-red-400">Não</td>
            </tr>
          </tbody>
        </table>
      </div>

      <AlertBox type="warning" title="Requer Administrador">
        A criação de links simbólicos (/D e padrão) requer privilégios de administrador ou a política SeCreateSymbolicLinkPrivilege habilitada. Junções (/J) podem ser criadas por usuários comuns.
      </AlertBox>

      <h2><Folder className="inline-block mr-2 mb-1 w-5 h-5" /> Exemplos Práticos</h2>

      <h3>Link Simbólico de Arquivo</h3>
      <CodeBlock language="batch" title="Criar link para arquivo" code={`:: Criar link simbólico de arquivo
mklink C:\\config.ini D:\\Configs\\config.ini

:: Verificar o link
dir C:\\config.ini

:: Saída mostra: config.ini [D:\\Configs\\config.ini]`} />

      <h3>Link Simbólico de Pasta</h3>
      <CodeBlock language="batch" title="Criar link para pasta (requer admin)" code={`:: Link simbólico de diretório
mklink /D C:\\Projetos D:\\Workspace\\Projetos

:: Agora C:\\Projetos aponta para D:\\Workspace\\Projetos
cd C:\\Projetos
dir :: mostra conteúdo de D:\\Workspace\\Projetos`} />

      <h3>Junction (Junção de Diretório)</h3>
      <CodeBlock language="batch" title="Criar junção (sem precisar de admin)" code={`:: Junção de diretório (mais compatível, sem admin)
mklink /J C:\\Logs D:\\Logs\\Servidor

:: Junção para UNC path
mklink /J C:\\ServidorDados \\servidor\\dados`} />

      <h3>Hard Link</h3>
      <CodeBlock language="batch" title="Criar hard link (mesmo volume)" code={`:: Hard link: dois nomes para o mesmo arquivo físico
mklink /H C:\backup\relatorio.pdf C:\\atual\relatorio.pdf

:: Ambos referenciam os mesmos dados no disco
:: Deletar um não afeta o outro`} />

      <h2><ArrowRight className="inline-block mr-2 mb-1 w-5 h-5" /> Casos de Uso Reais</h2>

      <h3>1. Mover pasta de sistema sem quebrar aplicação</h3>
      <CodeBlock language="batch" title="Mover pasta e criar link no local original" code={`:: Ex: Mover pasta de jogo para outro HD
:: 1. Mover os dados
robocopy "C:\\Games\\MeuJogo\" \"D:\\Games\\MeuJogo\" /E /MOVE

:: 2. Criar link no local original
mklink /J "C:\\Games\\MeuJogo\" \"D:\\Games\\MeuJogo\"

:: O jogo funciona normalmente, mas os dados estão no D:`} />

      <h3>2. Compartilhar configuração entre projetos</h3>
      <CodeBlock language="batch" title="Link para config compartilhada" code={`:: Um único arquivo de config usado por múltiplos projetos
mklink C:\\ProjetoA\\config.json C:\\SharedConfig\\config.json
mklink C:\\ProjetoB\\config.json C:\\SharedConfig\\config.json
mklink C:\\ProjetoC\\config.json C:\\SharedConfig\\config.json

:: Alterar C:\\SharedConfig\\config.json afeta todos os projetos`} />

      <h2><HardDrive className="inline-block mr-2 mb-1 w-5 h-5" /> Gerenciar e Remover Links</h2>
      <CodeBlock language="batch" title="Ver e remover links" code={`:: Ver links simbólicos em uma pasta
dir /AL :: lista apenas links simbólicos (reparse points)

:: Remover link simbólico de arquivo
del C:\\config.ini :: remove apenas o link, não o alvo

:: Remover link simbólico de pasta (rmdir, NÃO usa /S)
rmdir C:\\Projetos :: remove apenas o link

:: ATENÇÃO: não use rmdir /S em links de pasta!
:: Isso DELETA os arquivos do alvo!`} />

      <AlertBox type="danger" title="Cuidado com rmdir /S em Junções">
        Nunca use <code>rmdir /S</code> em uma junção ou link de diretório — isso vai deletar os arquivos do destino real, não apenas o link! Use apenas <code>rmdir PastaLink</code> (sem /S).
      </AlertBox>
    </PageContainer>
  );
}