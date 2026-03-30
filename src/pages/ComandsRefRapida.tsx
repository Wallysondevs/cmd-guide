import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { BookOpen, Zap, Search, Terminal } from "lucide-react";

export default function ComandsRefRapida() {
  return (
    <PageContainer
      title="Referência Rápida de Comandos"
      subtitle="Guia rápido de consulta: os 150+ comandos CMD mais usados, organizados por categoria com exemplos objetivos."
      difficulty="iniciante"
      timeToRead="20 min"
    >
      <h2><BookOpen className="inline-block mr-2 mb-1 w-5 h-5" /> Comandos de Navegação e Arquivos</h2>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-border text-sm">
          <thead><tr className="bg-muted">
            <th className="border border-border p-2 text-left">Comando</th>
            <th className="border border-border p-2 text-left">Uso rápido</th>
            <th className="border border-border p-2 text-left">Descrição</th>
          </tr></thead>
          <tbody>
            {[
              ["cd","cd C:\Pasta","Mudar diretório"],
              ["dir","dir /a /s","Listar arquivos"],
              ["md / mkdir","mkdir NovaPasta","Criar pasta"],
              ["rd / rmdir","rmdir /s /q Pasta","Remover pasta"],
              ["copy","copy origem destino","Copiar arquivo"],
              ["xcopy","xcopy /E /I pasta dest","Copiar pasta"],
              ["robocopy","robocopy src dst /E /MT:8","Cópia robusta"],
              ["move","move arquivo destino","Mover arquivo"],
              ["del","del /f /q arquivo","Deletar arquivo"],
              ["ren","ren arquivo.txt novo.txt","Renomear"],
              ["type","type arquivo.txt","Ver conteúdo"],
              ["more","dir | more","Paginação"],
              ["find","find texto arquivo","Buscar texto"],
              ["findstr","findstr /i /s txt *","Busca avançada"],
              ["tree","tree /f","Árvore de pastas"],
              ["attrib","attrib +h arquivo","Atributos de arquivo"],
              ["fc","fc arquivo1 arquivo2","Comparar arquivos"],
              ["comp","comp arquivo1 arquivo2","Comparar binários"],
              ["replace","replace novo.txt dest","Substituir arquivo"],
              ["mklink","mklink /D link pasta","Criar link simbólico"],
            ].map(([cmd, ex, desc]) => (
              <tr key={cmd}>
                <td className="border border-border p-2 font-mono text-primary">{cmd}</td>
                <td className="border border-border p-2 font-mono text-xs text-muted-foreground">{ex}</td>
                <td className="border border-border p-2">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2><Zap className="inline-block mr-2 mb-1 w-5 h-5" /> Comandos de Sistema</h2>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-border text-sm">
          <thead><tr className="bg-muted">
            <th className="border border-border p-2 text-left">Comando</th>
            <th className="border border-border p-2 text-left">Exemplo</th>
            <th className="border border-border p-2 text-left">Descrição</th>
          </tr></thead>
          <tbody>
            {[
              ["tasklist","tasklist /fo table","Listar processos"],
              ["taskkill","taskkill /im chrome.exe /f","Matar processo"],
              ["systeminfo","systeminfo | find \"OS\"","Info do sistema"],
              ["sc","sc query wuauserv","Gerenciar serviços"],
              ["net start","net start Spooler","Iniciar serviço"],
              ["net stop","net stop Spooler","Parar serviço"],
              ["shutdown","shutdown /r /t 60","Desligar/reiniciar"],
              ["schtasks","schtasks /query /fo table","Tarefas agendadas"],
              ["reg","reg query HKCU\Env","Registro Windows"],
              ["wmic","wmic cpu get Name","WMI queries"],
              ["runas","runas /user:admin cmd","Executar como outro user"],
              ["clip","echo texto | clip","Copiar para clipboard"],
              ["start","start notepad.exe","Abrir programa"],
              ["timeout","timeout /t 5","Esperar N segundos"],
              ["choice","choice /c YN /m \"Confirma?\"","Prompt de escolha"],
              ["pause","pause","Aguardar tecla"],
              ["exit","exit /b 0","Sair com código"],
              ["cls","cls","Limpar tela"],
              ["color","color 0A","Mudar cores"],
              ["title","title Meu Script","Título da janela"],
            ].map(([cmd, ex, desc]) => (
              <tr key={cmd}>
                <td className="border border-border p-2 font-mono text-primary">{cmd}</td>
                <td className="border border-border p-2 font-mono text-xs text-muted-foreground">{ex}</td>
                <td className="border border-border p-2">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2><Search className="inline-block mr-2 mb-1 w-5 h-5" /> Comandos de Rede</h2>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-border text-sm">
          <thead><tr className="bg-muted">
            <th className="border border-border p-2 text-left">Comando</th>
            <th className="border border-border p-2 text-left">Exemplo</th>
            <th className="border border-border p-2 text-left">Descrição</th>
          </tr></thead>
          <tbody>
            {[
              ["ipconfig","ipconfig /all","Config de rede"],
              ["ping","ping -t 8.8.8.8","Testar conectividade"],
              ["tracert","tracert google.com","Traçar rota"],
              ["nslookup","nslookup google.com","Consulta DNS"],
              ["netstat","netstat -ano","Conexões ativas"],
              ["netsh","netsh wlan show profiles","Config de rede avançada"],
              ["net use","net use Z: \\srv\pasta","Mapear drive"],
              ["net share","net share Docs=C:\Docs","Compartilhar pasta"],
              ["net view","net view \\servidor","Ver compartilhamentos"],
              ["net user","net user joao /domain","Gerenciar usuários"],
              ["net group","net group Admins /domain","Gerenciar grupos"],
              ["route","route print","Tabela de roteamento"],
              ["arp","arp -a","Cache ARP (IP→MAC)"],
              ["nbtstat","nbtstat -n","NetBIOS"],
              ["pathping","pathping google.com","Ping com estatísticas"],
              ["ftp","ftp servidor.com","Cliente FTP"],
              ["ssh","ssh user@servidor","Conexão SSH"],
              ["scp","scp arquivo user@srv:/path","Copiar via SSH"],
            ].map(([cmd, ex, desc]) => (
              <tr key={cmd}>
                <td className="border border-border p-2 font-mono text-primary">{cmd}</td>
                <td className="border border-border p-2 font-mono text-xs text-muted-foreground">{ex}</td>
                <td className="border border-border p-2">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2><Terminal className="inline-block mr-2 mb-1 w-5 h-5" /> Comandos de Disco e Segurança</h2>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-border text-sm">
          <thead><tr className="bg-muted">
            <th className="border border-border p-2 text-left">Comando</th>
            <th className="border border-border p-2 text-left">Exemplo</th>
            <th className="border border-border p-2 text-left">Descrição</th>
          </tr></thead>
          <tbody>
            {[
              ["diskpart","diskpart","Gerenciar discos/partições"],
              ["chkdsk","chkdsk C: /f /r","Verificar disco"],
              ["format","format D: /fs:ntfs /q","Formatar volume"],
              ["fsutil","fsutil volume diskfree C:","Info de volume"],
              ["bcdedit","bcdedit /enum all","Config de boot"],
              ["sfc","sfc /scannow","Verificar arquivos Windows"],
              ["dism","dism /Online /Cleanup-Image /RestoreHealth","Reparar Windows"],
              ["cipher","cipher /E pasta","Criptografar EFS"],
              ["icacls","icacls pasta /grant Todos:F","Permissões NTFS"],
              ["cacls","cacls arquivo","Permissões (legado)"],
              ["takeown","takeown /f arquivo","Tomar posse"],
              ["runas","runas /user:admin programa.exe","Executar como admin"],
              ["gpupdate","gpupdate /force","Atualizar Group Policy"],
              ["gpresult","gpresult /r","Ver GPO aplicadas"],
              ["secedit","secedit /analyze","Análise de segurança"],
              ["certutil","certutil -hashfile arq SHA256","Hash de arquivo"],
              ["netsh advfirewall","netsh advfirewall show all","Firewall"],
            ].map(([cmd, ex, desc]) => (
              <tr key={cmd}>
                <td className="border border-border p-2 font-mono text-primary">{cmd}</td>
                <td className="border border-border p-2 font-mono text-xs text-muted-foreground">{ex}</td>
                <td className="border border-border p-2">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertBox type="success" title="Como obter ajuda de qualquer comando">
        Para qualquer comando, use <code>COMANDO /?</code> para ver todas as opções:
        <CodeBlock language="batch" title="Obter ajuda detalhada" code={`robocopy /?
schtasks /create /?
netsh advfirewall firewall /?
wmic process /?   `} />
      </AlertBox>
    </PageContainer>
  );
}