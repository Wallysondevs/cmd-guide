import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { HardDrive, RotateCcw, Search, Layers } from "lucide-react";

export default function Disco() {
  return (
    <PageContainer
      title="Gestão de Disco e Partições"
      subtitle="Domine o DISKPART, CHKDSK, FORMAT e FSUTIL para gerenciar discos, partições e volumes com precisão."
      difficulty="intermediario"
      timeToRead="35 min"
    >
      <h2><HardDrive className="inline-block mr-2 mb-1 w-5 h-5" /> DISKPART — O Gerenciador de Discos</h2>
      <p>O <code>DISKPART</code> é um utilitário interativo e poderoso para criar, excluir, formatar e gerenciar discos e partições diretamente pelo CMD.</p>

      <AlertBox type="danger" title="Atenção: Comandos Destrutivos!">
        O DISKPART pode apagar dados permanentemente sem solicitar confirmação. Sempre verifique qual disco ou volume está selecionado antes de executar comandos destrutivos.
      </AlertBox>

      <h3>Iniciar e Listar Discos</h3>
      <CodeBlock language="batch" title="Abrindo o DISKPART e listando discos" code={`diskpart

DISKPART> list disk
  Disco ###  Status         Tamanho  Livre    Din  GPT
  ---------  -------------  -------  -------  ---  ---
  Disco 0    Online           477 GB      0 B        *
  Disco 1    Online           931 GB  931 GB

DISKPART> list volume
  Volume ###  Ltr  Rótulo       Fs     Tipo        Tamanho  Status
  ----------  ---  -----------  -----  ----------  -------  ------
  Volume 0     C   Sistema      NTFS   Partição      476 GB  Correto
  Volume 1     D   Dados        NTFS   Partição      930 GB  Correto`} />

      <h3>Selecionar, Criar e Excluir Partições</h3>
      <CodeBlock language="batch" title="Criar nova partição primária" code={`diskpart
DISKPART> select disk 1
DISKPART> clean                  :: Apaga TUDO do disco selecionado
DISKPART> convert gpt            :: Converte para GPT (recomendado)
DISKPART> create partition primary size=51200  :: 50 GB
DISKPART> format fs=ntfs label="Dados" quick
DISKPART> assign letter=D
DISKPART> exit`} />

      <CodeBlock language="batch" title="Excluir uma partição específica" code={`diskpart
DISKPART> select disk 1
DISKPART> select volume 2
DISKPART> delete volume override   :: override força exclusão mesmo com dados`} />

      <h3>Script DISKPART (Automatizado)</h3>
      <p>O DISKPART aceita um arquivo de script para automação completa:</p>
      <CodeBlock language="batch" title="script-disco.txt" code={`select disk 1
clean
convert gpt
create partition primary size=102400
format fs=ntfs label="Windows" quick
assign letter=C
create partition primary
format fs=ntfs label="Dados" quick
assign letter=D`} />
      <CodeBlock language="batch" title="Executar script DISKPART" code={`diskpart /s script-disco.txt`} />

      <h2><RotateCcw className="inline-block mr-2 mb-1 w-5 h-5" /> CHKDSK — Verificação de Disco</h2>
      <p>O <code>CHKDSK</code> verifica e repara erros no sistema de arquivos e setores defeituosos do disco.</p>

      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-border">
          <thead><tr className="bg-muted">
            <th className="border border-border p-2 text-left">Parâmetro</th>
            <th className="border border-border p-2 text-left">Função</th>
          </tr></thead>
          <tbody>
            <tr><td className="border border-border p-2"><code>/f</code></td><td className="border border-border p-2">Corrige erros no disco</td></tr>
            <tr><td className="border border-border p-2"><code>/r</code></td><td className="border border-border p-2">Localiza setores defeituosos e recupera dados legíveis</td></tr>
            <tr><td className="border border-border p-2"><code>/x</code></td><td className="border border-border p-2">Força desmontagem do volume antes de verificar</td></tr>
            <tr><td className="border border-border p-2"><code>/scan</code></td><td className="border border-border p-2">Execução online (sem reiniciar) no Windows 8+</td></tr>
            <tr><td className="border border-border p-2"><code>/spotfix</code></td><td className="border border-border p-2">Repara apenas problemas encontrados pelo /scan</td></tr>
          </tbody>
        </table>
      </div>

      <CodeBlock language="batch" title="Verificar e corrigir erros (agendado para reinicialização)" code={`chkdsk C: /f /r

:: Para rodar online em Windows 8+:
chkdsk C: /scan

:: Ver resultado no log de eventos:
wevtutil qe Application /q:"*[System[Provider[@Name='Microsoft-Windows-Chkdsk']]]\" /f:text /c:5`} />

      <h2><Layers className="inline-block mr-2 mb-1 w-5 h-5" /> FORMAT — Formatar Volumes</h2>
      <CodeBlock language="batch" title="Formatação avançada" code={`:: Formatar rápido em NTFS
format D: /fs:ntfs /q /v:"MeusDados\"

:: Formatar em exFAT (ideal para pen drives grandes)
format E: /fs:exfat /q /v:"Externo\"

:: Formatar em FAT32 (compatibilidade máxima)
format F: /fs:fat32 /q`} />

      <h2><Search className="inline-block mr-2 mb-1 w-5 h-5" /> FSUTIL — Utilitário Avançado do Sistema de Arquivos</h2>
      <CodeBlock language="batch" title="Comandos FSUTIL úteis" code={`:: Ver informações de volume
fsutil volume diskfree C:

:: Criar arquivo esparso para testes
fsutil file createnew testfile.bin 1073741824  :: 1 GB

:: Verificar se NTFS ou FAT
fsutil fsinfo volumeinfo C:

:: Listar drives disponíveis
fsutil fsinfo drives

:: Verificar suporte a links simbólicos
fsutil behavior query SymlinkEvaluation`} />

      <AlertBox type="info" title="Dica: Ampliar o C: Sem Reiniciar">
        Você pode usar o DISKPART com <code>extend</code> para expandir um volume sem formatá-lo, desde que o espaço não alocado seja adjacente:
        <CodeBlock language="batch" title="Expandir volume" code={`diskpart
DISKPART> select disk 0
DISKPART> select volume C
DISKPART> extend`} />
      </AlertBox>
    </PageContainer>
  );
}