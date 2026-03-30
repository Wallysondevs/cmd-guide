import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Network, Activity, Globe, Search } from "lucide-react";

export default function RedeAvancada() {
  return (
    <PageContainer
      title="Rede Avançada no CMD"
      subtitle="Diagnóstico profundo com NETSH, configuração de rotas, análise ARP, NBTSTAT e ferramentas avançadas de rede."
      difficulty="avancado"
      timeToRead="35 min"
    >
      <h2><Network className="inline-block mr-2 mb-1 w-5 h-5" /> NETSH — Administração de Rede Completa</h2>
      <p>O <code>NETSH</code> (Network Shell) é o canivete suíço da rede no Windows. Configura interfaces, Wi-Fi, proxy, e muito mais.</p>

      <h3>Configurar IP Estático e DHCP</h3>
      <CodeBlock language="batch" title="Definir IP estático via NETSH" code={`:: Ver interfaces disponíveis
netsh interface show interface

:: Definir IP estático
netsh interface ip set address "Ethernet" static 192.168.1.100 255.255.255.0 192.168.1.1

:: Definir DNS
netsh interface ip set dns "Ethernet" static 8.8.8.8
netsh interface ip add dns "Ethernet\" 8.8.4.4 index=2

:: Voltar para DHCP
netsh interface ip set address "Ethernet" dhcp
netsh interface ip set dns "Ethernet" dhcp`} />

      <h3>Configurações de Wi-Fi</h3>
      <CodeBlock language="batch" title="Gerenciar redes Wi-Fi pelo CMD" code={`:: Listar redes disponíveis
netsh wlan show networks

:: Ver perfis Wi-Fi salvos
netsh wlan show profiles

:: Ver senha de uma rede salva
netsh wlan show profile name="MinhaRede" key=clear

:: Conectar em uma rede
netsh wlan connect name="MinhaRede"

:: Desconectar
netsh wlan disconnect

:: Criar ponto de acesso (hotspot)
netsh wlan set hostednetwork mode=allow ssid="MeuHotspot" key="senha12345"
netsh wlan start hostednetwork
netsh wlan stop hostednetwork

:: Exportar perfil de rede
netsh wlan export profile name="MinhaRede" folder=C:\\Backup`} />

      <h3>Proxy e Configurações HTTP</h3>
      <CodeBlock language="batch" title="Configurar proxy do sistema" code={`:: Ver configuração atual de proxy
netsh winhttp show proxy

:: Definir proxy
netsh winhttp set proxy proxy-server="http://proxy.empresa.com:8080" bypass-list="*.local;192.168.*\"

:: Importar configurações do IE/Edge
netsh winhttp import proxy source=ie

:: Remover proxy
netsh winhttp reset proxy`} />

      <h2><Activity className="inline-block mr-2 mb-1 w-5 h-5" /> ROUTE — Tabela de Roteamento</h2>
      <CodeBlock language="batch" title="Gerenciar rotas de rede" code={`:: Ver tabela de roteamento
route print

:: Adicionar rota estática (temporária)
route add 10.0.0.0 mask 255.0.0.0 192.168.1.1

:: Adicionar rota persistente (sobrevive ao reboot)
route -p add 10.0.0.0 mask 255.0.0.0 192.168.1.1

:: Excluir rota
route delete 10.0.0.0

:: Ver rota para um destino específico
route print 10.*`} />

      <h2><Search className="inline-block mr-2 mb-1 w-5 h-5" /> ARP, NBTSTAT e Ferramentas de Diagnóstico</h2>
      <CodeBlock language="batch" title="ARP — Cache de endereços MAC" code={`:: Ver tabela ARP (IP → MAC)
arp -a

:: Ver ARP de interface específica
arp -a -N 192.168.1.100

:: Adicionar entrada estática
arp -s 192.168.1.200 AA-BB-CC-DD-EE-FF

:: Limpar cache ARP
arp -d *

:: Ver apenas IPs ativos na rede local
for /l %i in (1,1,254) do @ping -n 1 -w 100 192.168.1.%i | find "TTL=" && arp -a | find \"192.168.1.%i\"`} />

      <CodeBlock language="batch" title="NBTSTAT — Diagnóstico NetBIOS" code={`:: Ver tabela NetBIOS local
nbtstat -n

:: Ver cache de nomes NetBIOS
nbtstat -c

:: Ver tabela de um IP remoto
nbtstat -A 192.168.1.50

:: Atualizar cache NetBIOS
nbtstat -R`} />

      <h2><Globe className="inline-block mr-2 mb-1 w-5 h-5" /> IPCONFIG Avançado</h2>
      <CodeBlock language="batch" title="Comandos IPCONFIG avançados" code={`:: Ver tudo (incluindo IPv6, DHCP, DNS)
ipconfig /all

:: Renovar IP via DHCP
ipconfig /release
ipconfig /renew

:: Limpar cache DNS
ipconfig /flushdns

:: Ver cache DNS atual
ipconfig /displaydns

:: Registrar DNS (atualizar registro no servidor)
ipconfig /registerdns`} />

      <h3>PATHPING e TRACERT</h3>
      <CodeBlock language="batch" title="Rastrear rota e medir latência" code={`:: Traceroute básico
tracert google.com

:: Tracert com resolução inversa desativada (mais rápido)
tracert -d google.com

:: PATHPING — combina ping + tracert com estatísticas de perda
pathping -n google.com

:: Ping contínuo com tamanho de pacote maior
ping -t -l 1400 8.8.8.8`} />

      <AlertBox type="info" title="Script de Diagnóstico Completo de Rede">
        <CodeBlock language="batch" title="diagnostico-rede.bat" code={`@echo off
echo === DIAGNOSTICO DE REDE ===
echo Data: %date% Hora: %time%
echo.
echo [1] Interfaces e IPs:
ipconfig
echo.
echo [2] Gateway acessivel?
ping -n 1 192.168.1.1
echo.
echo [3] DNS funcionando?
nslookup google.com
echo.
echo [4] Internet acessivel?
ping -n 2 8.8.8.8
echo.
echo [5] Conexoes ativas:
netstat -ano | findstr "ESTABLISHED"
echo.
echo Diagnostico concluido!
pause`} />
      </AlertBox>
    </PageContainer>
  );
}