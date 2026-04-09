import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { HardDrive, Archive, Settings, Search, FolderOpen } from "lucide-react";

  export default function Fsutil() {
    return (
      <PageContainer
        title="FSUTIL, COMPACT e Sistema de Arquivos"
        subtitle="Operações avançadas no sistema de arquivos NTFS com FSUTIL, compressão com COMPACT e mapeamento de drives com SUBST."
        difficulty="avancado"
        timeToRead="35 min"
      >
        <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> FSUTIL — File System Utility</h2>
        <p>O <code>FSUTIL</code> é a ferramenta mais poderosa para operações de baixo nível no sistema de arquivos NTFS. Gerencia sparse files, hard links, junctions, quotas, USN journal e muito mais. Requer privilégios de Administrador.</p>

        <CodeBlock language="batch" title="Informações do volume e sistema de arquivos" code={`:: Ver informações detalhadas do volume
  fsutil volume diskfree C:
  :: Saída:
  :: Total number of free bytes: 50,231,123,968
  :: Total number of bytes: 256,026,337,280

  :: Ver informações do sistema de arquivos
  fsutil fsinfo volumeinfo C:
  :: Mostra: nome do volume, serial, tipo FS, flags

  :: Ver setores e clusters do volume
  fsutil fsinfo ntfsinfo C:
  :: Mostra: tamanho do setor, tamanho do cluster, total de clusters

  :: Listar volumes no sistema
  fsutil volume list

  :: Ver se o volume suporta compressão
  fsutil volume diskfree C: 2>nul && echo NTFS ativo

  :: Verificar suporte a LFN (Long File Names)
  fsutil behavior query disable8dot3`} />

        <CodeBlock language="batch" title="Hard Links e Junctions" code={`:: Criar hard link (dois nomes para o mesmo arquivo)
  :: Hard links só funcionam no mesmo volume
  fsutil hardlink create C:\\Atalhos\\config-link.ini C:\\App\\config.ini
  :: Agora config-link.ini e config.ini apontam para o mesmo arquivo

  :: Listar hard links de um arquivo
  fsutil hardlink list C:\\App\\config.ini

  :: Criar junction (link de diretório - funciona entre volumes)
  :: Equivalente a um "atalho" de pasta no NTFS
  mklink /j C:\\DadosAntigos D:\\MigraçãoDados
  :: Ao acessar C:\\DadosAntigos, você está vendo D:\\MigraçãoDados

  :: Criar link simbólico para arquivo
  mklink C:\\atalho-config.ini C:\\App\\config.ini

  :: Criar link simbólico para pasta (requer admin ou modo desenvolvedor)
  mklink /d C:\\MinhaPasta D:\\PastaReal

  :: Listar links simbólicos
  dir /al C:\\`} />

        <CodeBlock language="batch" title="Sparse Files e Arquivos Grandes" code={`:: Criar sparse file (arquivo grande que ocupa pouco espaço real em disco)
  :: Útil para reservar espaço ou criar discos virtuais

  :: Criar arquivo de 10GB que ocupa quase zero espaço
  fsutil file createnew C:\\Temp\\arquivo-sparse.dat 10737418240
  fsutil sparse setflag C:\\Temp\\arquivo-sparse.dat

  :: Ver se arquivo é sparse
  fsutil sparse queryflag C:\\Temp\\arquivo-sparse.dat

  :: Criar arquivo de tamanho fixo real (para benchmark de disco)
  fsutil file createnew C:\\Temp\\teste-velocidade.dat 104857600
  :: Cria arquivo de 100MB (102400 * 1024)

  :: Definir tamanho de arquivo existente (truncar ou expandir)
  fsutil file seteof C:\\Temp\\arquivo.dat 1073741824`} />

        <h2><Archive className="inline-block mr-2 mb-1 w-5 h-5" /> COMPACT — Compressão NTFS</h2>
        <p>O <code>COMPACT</code> gerencia a compressão nativa do NTFS. Arquivos comprimidos são transparentes ao sistema — você os usa normalmente, mas ocupam menos espaço em disco. Ideal para arquivos de logs, documentos e textos.</p>

        <CodeBlock language="batch" title="Comprimir e descomprimir arquivos" code={`:: Ver status de compressão de pasta e arquivos
  compact /a
  :: [C] = Compressed, [U] = Uncompressed

  :: Comprimir um arquivo
  compact /c C:\\Logs\\antigo.log

  :: Comprimir pasta inteira (subpastas incluídas)
  compact /c /s:C:\\Logs\\

  :: Comprimir pasta e marcar para compressão de futuros arquivos
  compact /c /s /i C:\\Arquivos_Antigos\\

  :: Descomprimir arquivo
  compact /u C:\\Logs\\antigo.log

  :: Descomprimir pasta inteira
  compact /u /s:C:\\Logs\\

  :: Compactar Windows (CompactOS — Windows 10+)
  :: Reduz instalação do Windows sem perda de funcionalidade
  compact /CompactOS:always
  :: Desfazer:
  compact /CompactOS:never

  :: Ver status do CompactOS
  compact /CompactOS:query`} />

        <h2><FolderOpen className="inline-block mr-2 mb-1 w-5 h-5" /> SUBST — Mapear Pastas como Drives</h2>
        <CodeBlock language="batch" title="Criar drives virtuais com SUBST" code={`:: Mapear pasta como drive virtual
  subst Z: C:\\Projetos\\MeuProjeto\\src
  :: Agora Z: apontará para C:\\Projetos\\MeuProjeto\\src

  :: Verificar mapeamentos existentes
  subst

  :: Remover mapeamento
  subst Z: /d

  :: Exemplo prático: facilitar acesso a pasta profunda
  subst X: "C:\\Users\\Joao\\Documents\\Trabalho\\Projetos\\2026\\Q1\\Relatórios"
  :: Agora basta digitar X: no CMD

  :: Nota: subst não persiste após reboot
  :: Para tornar permanente, adicione ao autoexec ou startup
  :: via schtasks para rodar ao login:
  schtasks /create /tn "SubstX" /tr "subst X: C:\\Projetos" /sc onlogon /ru %USERNAME% /f`} />

        <h2><Search className="inline-block mr-2 mb-1 w-5 h-5" /> FSUTIL — Diagnóstico Avançado</h2>
        <CodeBlock language="batch" title="USN Journal e diagnóstico de volume" code={`:: Ver status do USN Journal (Change Journal)
  fsutil usn queryjournal C:
  :: O USN Journal registra todas as mudanças no volume

  :: Criar USN Journal (se não existir)
  fsutil usn createjournal m=1000 a=100 C:

  :: Deletar USN Journal
  fsutil usn deletejournal /d C:

  :: Verificar comportamentos do sistema de arquivos
  fsutil behavior query
  :: Mostra: disable8dot3, allowExtChar, bugcheckOnCorrupt, etc.

  :: Desativar criação de nomes 8.3 (melhora performance em volumes grandes)
  fsutil behavior set disable8dot3 1

  :: Verificar se o volume está sujo (precisa de chkdsk)
  fsutil dirty query C:
  :: "Volume - C: is NOT Dirty" = OK

  :: Marcar volume como sujo (forçar chkdsk no próximo boot)
  fsutil dirty set C:

  :: Ver quotas de disco de um usuário
  fsutil quota query C: | findstr /i "joao"

  :: Defragmentar via linha de comando
  defrag C: /u /v   :: /u = mostra progresso, /v = verbose`} />

        <h3>Script: Análise de Uso de Disco</h3>
        <CodeBlock language="batch" title="analise-disco.bat — Encontrar maiores pastas" code={`@echo off
  echo Analisando uso de disco...
  echo.

  :: Top 20 pastas maiores no C:
  powershell -Command "
      Get-ChildItem 'C:\\' -Recurse -ErrorAction SilentlyContinue | 
      Where-Object { \\$_.PSIsContainer } |
      Sort-Object { (Get-ChildItem \\$_.FullName -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum } -Descending |
      Select-Object -First 20 FullName |
      Format-Table -AutoSize
  "

  echo.
  echo Espaço livre em cada volume:
  fsutil volume diskfree C:
  pause`} />

        <AlertBox type="info" title="NTFS vs exFAT vs FAT32">
          <strong>NTFS</strong>: Use em volumes internos do Windows. Suporta permissões, criptografia EFS, compressão, hard links, shadow copies e arquivos maiores que 4GB. <strong>exFAT</strong>: Use em pendrives e SSDs externos para compatibilidade com Mac/Linux/câmeras. <strong>FAT32</strong>: Evite — limite de 4GB por arquivo.
        </AlertBox>
      </PageContainer>
    );
  }