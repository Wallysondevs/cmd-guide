import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Globe, Wifi, Activity, Server, ShieldCheck, Share2, Terminal, Radio } from "lucide-react";

export default function Rede() {
  return (
    <PageContainer
      title="Rede e Diagnóstico de Conectividade"
      subtitle="Ferramentas essenciais de linha de comando para troubleshooting, diagnóstico e configuração de rede no Windows"
      difficulty="intermediario"
      timeToRead="30 min"
    >
      <p>
        O Prompt de Comando é a ferramenta favorita dos administradores de rede. Através dele, é possível descobrir por que a internet não funciona, testar a latência de servidores, verificar portas abertas, monitorar conexões ativas e até gerenciar senhas de Wi-Fi — tudo sem instalar nenhum software adicional.
      </p>

      <h2><Wifi className="inline-block mr-2 mb-1 w-5 h-5" /> IPCONFIG: Conhecendo seu Endereço</h2>
      <p>O primeiro passo em qualquer diagnóstico de rede é saber qual IP sua máquina recebeu e quais são as configurações do adaptador.</p>
      <table>
        <thead>
          <tr>
            <th>Comando</th>
            <th>O que faz</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>ipconfig</code></td><td>Mostra IPs básicos, máscara de sub-rede e gateway padrão</td></tr>
          <tr><td><code>ipconfig /all</code></td><td>Detalhes completos: MAC, DHCP, DNS, WINS</td></tr>
          <tr><td><code>ipconfig /release</code></td><td>Libera o endereço IP obtido via DHCP</td></tr>
          <tr><td><code>ipconfig /renew</code></td><td>Solicita um novo IP ao servidor DHCP</td></tr>
          <tr><td><code>ipconfig /flushdns</code></td><td>Limpa o cache de resolução DNS local</td></tr>
          <tr><td><code>ipconfig /registerdns</code></td><td>Força re-registro do nome do computador no DNS</td></tr>
          <tr><td><code>ipconfig /displaydns</code></td><td>Mostra o cache DNS atual (entradas recentes)</td></tr>
        </tbody>
      </table>

      <CodeBlock
        code={`REM Diagnóstico completo do adaptador
ipconfig /all

REM Sequência clássica de reset de IP
ipconfig /release
ipconfig /flushdns
ipconfig /renew

REM Ver apenas o IPv4 do adaptador principal
ipconfig | findstr "IPv4"

REM Ver apenas o gateway padrão
ipconfig | findstr "Gateway"`}
        language="batch"
        title="IPCONFIG — diagnóstico e reset"
      />

      <h2><Activity className="inline-block mr-2 mb-1 w-5 h-5" /> PING: Teste de Conectividade</h2>
      <p>
        O <code>ping</code> envia pacotes ICMP para um destino e mede o tempo de resposta (latência). É a ferramenta de diagnóstico mais fundamental da rede.
      </p>
      <CodeBlock
        code={`REM Ping básico (4 pacotes padrão)
ping google.com

REM Ping contínuo (Ctrl+C para parar)
ping 8.8.8.8 -t

REM Ping com 10 tentativas
ping google.com -n 10

REM Ping com pacotes maiores (teste de MTU)
ping -l 1400 google.com

REM Ping forçando IPv4 ou IPv6
ping -4 google.com
ping -6 ipv6.google.com

REM Ping com timeout personalizado (ms)
ping -w 2000 servidor-lento.com

REM Testar conectividade interna vs externa
ping 192.168.1.1        :: Testar gateway local
ping 8.8.8.8            :: Testar internet (Google DNS)
ping google.com         :: Testar resolução DNS + internet`}
        language="batch"
        title="PING — variações e diagnóstico"
      />

      <AlertBox type="info" title="Interpretando o resultado do PING">
        <strong>TTL (Time to Live):</strong> indica por quantos roteadores o pacote pode passar. Windows = ~128, Linux = ~64, roteadores Cisco = ~255. Se o TTL chega baixo, o pacote percorreu muitos saltos.
        <br /><br />
        <strong>Tempo em ms:</strong> abaixo de 20ms é excelente, 20-100ms é normal, acima de 200ms pode causar problemas em VoIP e jogos.
      </AlertBox>

      <h2><Globe className="inline-block mr-2 mb-1 w-5 h-5" /> TRACERT: Rastreando o Caminho</h2>
      <p>O <code>tracert</code> mostra todo o caminho que seus pacotes percorrem até o destino, identificando em qual ponto da rede está ocorrendo lentidão ou perda.</p>
      <CodeBlock
        code={`REM Traceroute básico
tracert google.com

REM Sem resolução de nomes (muito mais rápido)
tracert -d 8.8.8.8

REM Com máximo de 15 saltos
tracert -h 15 google.com

REM Forçar IPv4
tracert -4 google.com

REM Interpretar a saída:
REM "* * * Tempo limite da solicitação" = firewall bloqueando ICMP (não significa falha)
REM Saltos com latência alta = gargalo naquele roteador
REM Onde os * aparecem pela primeira vez = ponto de falha`}
        language="batch"
        title="TRACERT — rastreando o caminho dos pacotes"
      />

      <h2><Radio className="inline-block mr-2 mb-1 w-5 h-5" /> NSLOOKUP: Diagnóstico de DNS</h2>
      <p>Ferramenta essencial para verificar se um domínio aponta para o IP correto, debugar problemas de DNS e consultar registros específicos.</p>
      <CodeBlock
        code={`REM Resolução básica de nome
nslookup google.com

REM Usando servidor DNS específico (Google DNS)
nslookup google.com 8.8.8.8

REM Consultar tipo de registro específico
nslookup -type=MX gmail.com          :: Servidores de e-mail
nslookup -type=NS google.com         :: Nameservers
nslookup -type=TXT google.com        :: Registros TXT (SPF, DKIM)
nslookup -type=AAAA google.com       :: IPv6 (registro AAAA)
nslookup -type=CNAME www.google.com  :: Alias

REM Lookup reverso (IP → nome)
nslookup 8.8.8.8

REM Modo interativo (mais poderoso)
nslookup
> set type=MX
> gmail.com
> exit`}
        language="batch"
        title="NSLOOKUP — diagnóstico de DNS"
      />

      <h2><Server className="inline-block mr-2 mb-1 w-5 h-5" /> NETSTAT: Monitorando Conexões</h2>
      <p>O <code>netstat</code> mostra todas as conexões de rede ativas, portas abertas e processos associados.</p>
      <table>
        <thead>
          <tr>
            <th>Flag</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>-a</code></td><td>Todas as conexões e portas de escuta</td></tr>
          <tr><td><code>-n</code></td><td>Endereços e portas em formato numérico (mais rápido)</td></tr>
          <tr><td><code>-o</code></td><td>Exibe o PID do processo dono da conexão</td></tr>
          <tr><td><code>-b</code></td><td>Nome do executável (requer Admin)</td></tr>
          <tr><td><code>-e</code></td><td>Estatísticas do adaptador Ethernet</td></tr>
          <tr><td><code>-s</code></td><td>Estatísticas por protocolo (TCP, UDP, ICMP)</td></tr>
          <tr><td><code>-r</code></td><td>Tabela de roteamento</td></tr>
          <tr><td><code>5</code></td><td>Atualizar a cada 5 segundos</td></tr>
        </tbody>
      </table>
      <CodeBlock
        code={`REM Ver portas em escuta com seus processos
netstat -ano | findstr LISTENING

REM Descobrir qual programa usa a porta 8080
netstat -ano | findstr :8080

REM Ver todas as conexões estabelecidas
netstat -ano | findstr ESTABLISHED

REM Associar PID ao nome do processo
netstat -ano | findstr :443
REM Depois: tasklist | findstr <PID_encontrado>

REM Monitorar conexões em tempo real (atualiza a cada 3s)
netstat -ano 3

REM Ver estatísticas de rede por protocolo
netstat -s`}
        language="batch"
        title="NETSTAT — monitorando conexões e portas"
      />

      <h2><Terminal className="inline-block mr-2 mb-1 w-5 h-5" /> NETSH: O Canivete Suíço da Rede</h2>
      <p>O <code>netsh</code> (Network Shell) permite configurar praticamente qualquer aspecto da rede via linha de comando.</p>
      <CodeBlock
        code={`REM Ver senha do Wi-Fi atual
netsh wlan show profile name="NOME_DA_REDE" key=clear
REM Procure por "Key Content" no resultado

REM Listar todas as redes Wi-Fi salvas
netsh wlan show profiles

REM Ver redes Wi-Fi disponíveis ao redor
netsh wlan show networks mode=bssid

REM Exportar perfil Wi-Fi para arquivo (backup)
netsh wlan export profile name="NOME_DA_REDE" folder=C:\Backup

REM Importar perfil Wi-Fi
netsh wlan add profile filename="C:\Backup\REDE.xml"

REM Desconectar do Wi-Fi atual
netsh wlan disconnect

REM Ver configuração atual do firewall
netsh advfirewall show allprofiles

REM Adicionar regra no firewall (ex: liberar porta 8080 TCP)
netsh advfirewall firewall add rule name="App8080" ^
    protocol=TCP dir=in localport=8080 action=allow

REM Desativar firewall (NÃO recomendado em produção)
netsh advfirewall set allprofiles state off

REM Reativar firewall
netsh advfirewall set allprofiles state on`}
        language="batch"
        title="NETSH — configurações de rede e firewall"
      />

      <h2><ShieldCheck className="inline-block mr-2 mb-1 w-5 h-5" /> NET: Gerenciando Recursos de Rede</h2>
      <CodeBlock
        code={`REM Mapear unidade de rede
net use Z: \\Servidor\Compartilhamento /user:Dominio\Usuario Senha /persistent:yes

REM Desconectar unidade mapeada
net use Z: /delete

REM Mapear temporariamente (sem persistir após reinicialização)
net use Z: \\Servidor\Compartilhamento

REM Ver unidades mapeadas
net use

REM Ver compartilhamentos do computador local
net share

REM Criar compartilhamento
net share MeuDados=C:\Dados /grant:Todos,LEITURA

REM Remover compartilhamento
net share MeuDados /delete

REM Ver máquinas na rede local (grupo de trabalho)
net view

REM Ver máquinas em um domínio específico
net view /domain:MEUDOMAIN`}
        language="batch"
        title="NET — recursos e compartilhamentos de rede"
      />

      <h2><Share2 className="inline-block mr-2 mb-1 w-5 h-5" /> Scripts de Diagnóstico</h2>
      <CodeBlock
        code={`@ECHO OFF
ECHO ============================================
ECHO    DIAGNÓSTICO DE REDE - %DATE% %TIME%
ECHO ============================================
ECHO.

ECHO [1/5] Verificando configuracao do adaptador...
ipconfig | findstr /R "Adaptador\|IPv4\|Gateway\|DNS"
ECHO.

ECHO [2/5] Testando gateway local...
FOR /F "tokens=3 delims=: " %%G IN ('ipconfig ^| findstr "Gateway Padrao"') DO SET GW=%%G
IF DEFINED GW (
    ping -n 2 %GW% | findstr "ms\|perdidos"
) ELSE (
    ECHO Gateway nao encontrado!
)
ECHO.

ECHO [3/5] Testando DNS (8.8.8.8)...
ping -n 2 8.8.8.8 | findstr "ms\|perdidos"
ECHO.

ECHO [4/5] Testando resolucao DNS...
nslookup google.com 2>&1 | findstr "Address\|erro"
ECHO.

ECHO [5/5] Testando internet (google.com)...
ping -n 2 google.com | findstr "ms\|perdidos\|host"
ECHO.

ECHO ============================================
ECHO Diagnostico concluido!
ECHO ============================================
PAUSE`}
        language="batch"
        title="Script completo de diagnóstico de rede"
      />

      <AlertBox type="success" title="Dica de administrador">
        Combine <code>netstat -ano</code> com <code>tasklist /FI "PID eq XXXX"</code> para identificar exatamente qual programa está usando uma porta suspeita. Isso é fundamental para detectar malware ou aplicações travadas.
      </AlertBox>
    </PageContainer>
  );
}
