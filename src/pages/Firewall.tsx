import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Shield, Lock, Network, AlertTriangle } from "lucide-react";

const defenderCode = [
  ":: Iniciar scan rapido",
  '"%ProgramFiles%\\Windows Defender\\MpCmdRun.exe\" -Scan -ScanType 1',
  "",
  ":: Scan completo",
  '"%ProgramFiles%\\Windows Defender\\MpCmdRun.exe\" -Scan -ScanType 2',
  "",
  ":: Atualizar definicoes de virus",
  '"%ProgramFiles%\\Windows Defender\\MpCmdRun.exe\" -SignatureUpdate',
].join("\n");

export default function Firewall() {
  return (
    <PageContainer
      title="Firewall e Segurança de Rede"
      subtitle="Configure o Windows Firewall, bloqueie portas, crie regras avançadas e gerencie a segurança de rede via CMD."
      difficulty="avancado"
      timeToRead="30 min"
    >
      <h2><Shield className="inline-block mr-2 mb-1 w-5 h-5" /> NETSH ADVFIREWALL — Firewall Avançado</h2>
      <p>O <code>NETSH ADVFIREWALL</code> é a interface de linha de comando para o Windows Defender Firewall. Permite criar regras complexas, gerenciar perfis e exportar/importar configurações.</p>

      <AlertBox type="warning" title="Execute como Administrador">
        Todos os comandos de firewall exigem privilégios administrativos.
      </AlertBox>

      <h3>Estado e Perfis do Firewall</h3>
      <CodeBlock language="batch" title="Verificar e alterar estado do firewall" code={`:: Ver estado atual de todos os perfis
netsh advfirewall show allprofiles

:: Ver estado do perfil ativo
netsh advfirewall show currentprofile

:: Ativar firewall em todos os perfis
netsh advfirewall set allprofiles state on

:: Desativar firewall (NÃO recomendado em produção)
netsh advfirewall set allprofiles state off

:: Ativar somente no perfil de domínio
netsh advfirewall set domainprofile state on`} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="p-4 border border-border rounded-lg bg-secondary/10">
          <h4 className="font-bold mb-2">Perfil Domain</h4>
          <p className="text-sm">Aplicado quando conectado a uma rede de domínio corporativo.</p>
        </div>
        <div className="p-4 border border-border rounded-lg bg-secondary/10">
          <h4 className="font-bold mb-2">Perfil Private</h4>
          <p className="text-sm">Redes domésticas ou de trabalho confiáveis.</p>
        </div>
        <div className="p-4 border border-border rounded-lg bg-secondary/10">
          <h4 className="font-bold mb-2">Perfil Public</h4>
          <p className="text-sm">Redes públicas — configurações mais restritivas.</p>
        </div>
      </div>

      <h3>Criar Regras de Entrada</h3>
      <CodeBlock language="batch" title="Adicionar regras de entrada (Inbound)" code={`:: Bloquear uma porta (ex: bloquear RDP de fora)
netsh advfirewall firewall add rule name="Bloquear RDP" dir=in action=block protocol=tcp localport=3389

:: Permitir aplicação específica
netsh advfirewall firewall add rule name="Permitir Apache" dir=in action=allow program="C:\\Apache24\bin\\httpd.exe" enable=yes

:: Permitir porta com IP de origem específico
netsh advfirewall firewall add rule name="SSH Admin" dir=in action=allow protocol=tcp localport=22 remoteip=192.168.1.100

:: Permitir faixa de IPs
netsh advfirewall firewall add rule name="LAN Interna" dir=in action=allow remoteip=192.168.1.0/24

:: Bloquear ICMP (ping)
netsh advfirewall firewall add rule name="Bloquear Ping" dir=in action=block protocol=icmpv4:8,any`} />

      <h3>Criar Regras de Saída</h3>
      <CodeBlock language="batch" title="Controlar tráfego de saída (Outbound)" code={`:: Bloquear saída de aplicação
netsh advfirewall firewall add rule name="Bloquear Torrent" dir=out action=block program="C:\\Torrent\torrent.exe\"

:: Bloquear porta de saída
netsh advfirewall firewall add rule name="Bloquear DNS Externo" dir=out action=block protocol=udp remoteport=53

:: Permitir apenas saída para IP específico
netsh advfirewall firewall add rule name="API Interna" dir=out action=allow remoteip=10.0.0.50 protocol=tcp remoteport=8080`} />

      <h3>Gerenciar Regras Existentes</h3>
      <CodeBlock language="batch" title="Listar, modificar e excluir regras" code={`:: Listar todas as regras
netsh advfirewall firewall show rule name=all

:: Buscar regra por nome
netsh advfirewall firewall show rule name="Bloquear RDP"

:: Desabilitar uma regra (sem deletar)
netsh advfirewall firewall set rule name="Bloquear RDP" new enable=no

:: Deletar uma regra
netsh advfirewall firewall delete rule name="Bloquear RDP"

:: Deletar todas as regras de uma vez (CUIDADO!)
netsh advfirewall reset`} />

      <h2><Lock className="inline-block mr-2 mb-1 w-5 h-5" /> Exportar e Importar Configurações</h2>
      <CodeBlock language="batch" title="Backup e restauração do firewall" code={`:: Exportar configuração completa
netsh advfirewall export C:\firewall-backup.wfw

:: Importar configuração
netsh advfirewall import C:\firewall-backup.wfw

:: Restaurar configurações padrão do Windows
netsh advfirewall reset`} />

      <h2><Network className="inline-block mr-2 mb-1 w-5 h-5" /> NETSTAT — Monitorar Conexões</h2>
      <CodeBlock language="batch" title="Monitorar portas e conexões abertas" code={`:: Ver conexões ativas com PID
netstat -ano

:: Ver apenas portas em escuta
netstat -ano | findstr "LISTENING\"

:: Descobrir qual processo usa uma porta
netstat -ano | findstr ":80\"
:: Depois usar o PID:
tasklist | findstr "PID_ENCONTRADO\"

:: Ver estatísticas de rede
netstat -s

:: Atualizar a cada 5 segundos
netstat -ano 5`} />

      <h2><AlertTriangle className="inline-block mr-2 mb-1 w-5 h-5" /> CIPHER — Criptografia EFS</h2>
      <CodeBlock language="batch" title="Criptografar arquivos com EFS" code={`:: Criptografar pasta
cipher /E C:\\Confidencial

:: Descriptografar
cipher /D C:\\Confidencial

:: Ver status de criptografia
cipher /C C:\\Confidencial\\arquivo.txt

:: Limpar dados deletados de forma segura
cipher /W:C:\\ `} />

      <AlertBox type="info" title="Windows Defender pelo CMD">
        Você pode acionar o Windows Defender diretamente usando o MpCmdRun.exe localizado em %ProgramFiles%\Windows Defender\.
      </AlertBox>
      <CodeBlock language="batch" title="Comandos do Windows Defender" code={defenderCode} />
    </PageContainer>
  );
}