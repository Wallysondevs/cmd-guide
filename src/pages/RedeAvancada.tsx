import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { Network, Wifi, Shield, Globe, Settings, Activity } from "lucide-react";

  export default function RedeAvancada() {
    return (
      <PageContainer
        title="Rede Avançada com NETSH"
        subtitle="Domine NETSH para configurar interfaces, redes WiFi, firewall, VPN, QoS, proxy e muito mais pelo CMD."
        difficulty="avancado"
        timeToRead="45 min"
      >
        <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> NETSH — Network Shell</h2>
        <p>O <code>NETSH</code> é a ferramenta mais poderosa para configuração de rede no Windows. Funciona de forma interativa ou em linha de comando, e pode ser usado para exportar e importar configurações inteiras de rede.</p>

        <CodeBlock language="batch" title="Comandos essenciais do NETSH" code={`:: Mostrar todas as interfaces de rede
  netsh interface show interface

  :: Ver configuração IP de uma interface
  netsh interface ip show config "Wi-Fi"
  netsh interface ip show config "Ethernet"

  :: Configurar IP estático
  netsh interface ip set address "Ethernet" static 192.168.1.100 255.255.255.0 192.168.1.1

  :: Voltar para DHCP
  netsh interface ip set address "Ethernet" dhcp

  :: Configurar DNS estático
  netsh interface ip set dns "Ethernet" static 8.8.8.8
  netsh interface ip add dns "Ethernet" 8.8.4.4 index=2

  :: Voltar para DNS automático
  netsh interface ip set dns "Ethernet" dhcp

  :: Exportar toda a configuração de rede para arquivo
  netsh -c interface dump > C:\Backup\rede-config.txt

  :: Importar configuração salva
  netsh -f C:\Backup\rede-config.txt`} />

        <h2><Wifi className="inline-block mr-2 mb-1 w-5 h-5" /> NETSH WLAN — Gerenciamento WiFi</h2>
        <p>O <code>netsh wlan</code> permite gerenciar conexões WiFi completamente: listar redes, conectar, desconectar, ver senhas salvas e criar hotspots.</p>

        <CodeBlock language="batch" title="Gerenciar redes WiFi" code={`:: Verificar se o WiFi está ativo
  netsh wlan show interfaces
  :: Mostra: SSID, sinal, velocidade, modo, canal, endereço MAC

  :: Listar redes WiFi disponíveis
  netsh wlan show networks
  netsh wlan show networks mode=bssid  :: Mais detalhes (canal, segurança)

  :: Listar perfis WiFi salvos no computador
  netsh wlan show profiles

  :: Conectar a uma rede WiFi salva
  netsh wlan connect name="MinhaRede"
  netsh wlan connect name="MinhaRede" interface="Wi-Fi"

  :: Desconectar do WiFi
  netsh wlan disconnect
  netsh wlan disconnect interface="Wi-Fi"

  :: Deletar perfil WiFi salvo
  netsh wlan delete profile name="RedeAntiga"

  :: Deletar todos os perfis WiFi
  netsh wlan delete profile name=* i=*`} />

        <CodeBlock language="batch" title="Ver senhas WiFi salvas" code={`:: Ver senha de uma rede WiFi salva (requer admin)
  netsh wlan show profile name="MinhaRede" key=clear
  :: Procure por: Key Content : senha-aqui

  :: Script para listar todas as senhas WiFi salvas
  @echo off
  echo Redes WiFi e suas senhas:
  echo.
  for /f "skip=1 tokens=2,* delims=:" %%a in ('netsh wlan show profiles ^| findstr /i "Profile"') do (
      for /f "tokens=2 delims=:" %%b in ('netsh wlan show profile name="%%a" key=clear ^| findstr /i "Key Content"') do (
          echo Rede: %%a  |  Senha: %%b
      )
  )
  pause`} />

        <CodeBlock language="batch" title="Exportar e importar perfis WiFi" code={`:: Exportar perfil WiFi (sem senha - XML)
  netsh wlan export profile name="MinhaRede" folder=C:\WiFiBackup\

  :: Exportar com senha (requer admin)
  netsh wlan export profile name="MinhaRede" key=clear folder=C:\WiFiBackup\

  :: Importar perfil WiFi em outro computador
  netsh wlan add profile filename="C:\WiFiBackup\Wi-Fi-MinhaRede.xml"

  :: Criar hotspot WiFi (ponto de acesso)
  :: 1. Verificar suporte
  netsh wlan show drivers | findstr "Hosted network supported"

  :: 2. Configurar hotspot
  netsh wlan set hostednetwork mode=allow ssid="MeuHotspot" key="senhasegura123"

  :: 3. Iniciar hotspot
  netsh wlan start hostednetwork

  :: 4. Parar hotspot
  netsh wlan stop hostednetwork

  :: 5. Ver status do hotspot
  netsh wlan show hostednetwork`} />

        <h2><Globe className="inline-block mr-2 mb-1 w-5 h-5" /> Configuração de Proxy</h2>
        <CodeBlock language="batch" title="Configurar proxy do sistema via NETSH e WINHTTP" code={`:: Ver configuração atual de proxy do WinHTTP (usado por serviços do sistema)
  netsh winhttp show proxy

  :: Configurar proxy para WinHTTP
  netsh winhttp set proxy proxy-server="proxy.empresa.com:8080" bypass-list="*.empresa.com;localhost"

  :: Importar proxy das configurações do IE/Edge (usuário atual)
  netsh winhttp import proxy source=ie

  :: Remover proxy do WinHTTP
  netsh winhttp reset proxy

  :: Configurar proxy via registro (para todos os usuários)
  reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable /t REG_DWORD /d 1 /f
  reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer /t REG_SZ /d "proxy.empresa.com:8080" /f

  :: Desativar proxy
  reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable /t REG_DWORD /d 0 /f`} />

        <h2><Shield className="inline-block mr-2 mb-1 w-5 h-5" /> NETSH WFAS — Firewall Avançado</h2>
        <CodeBlock language="batch" title="Gerenciar firewall avançado com NETSH" code={`:: Ver estado do firewall
  netsh advfirewall show allprofiles state

  :: Ativar/desativar firewall por perfil
  netsh advfirewall set domainprofile state on
  netsh advfirewall set privateprofile state on
  netsh advfirewall set publicprofile state off

  :: Adicionar regra de entrada (liberar porta TCP 8080)
  netsh advfirewall firewall add rule name="App Web 8080" protocol=TCP dir=in localport=8080 action=allow

  :: Adicionar regra de saída
  netsh advfirewall firewall add rule name="Bloquear FTP saida" protocol=TCP dir=out remoteport=21 action=block

  :: Listar todas as regras
  netsh advfirewall firewall show rule name=all

  :: Deletar regra
  netsh advfirewall firewall delete rule name="App Web 8080"

  :: Resetar firewall para padrão de fábrica (CUIDADO!)
  netsh advfirewall reset`} />

        <h2><Activity className="inline-block mr-2 mb-1 w-5 h-5" /> Diagnóstico e Roteamento</h2>
        <CodeBlock language="batch" title="Tabela de roteamento e diagnóstico avançado" code={`:: Ver tabela de roteamento
  route print
  route print -4    :: Só IPv4
  route print -6    :: Só IPv6

  :: Adicionar rota estática
  route add 10.0.0.0 mask 255.0.0.0 192.168.1.1
  route add 10.0.0.0 mask 255.0.0.0 192.168.1.1 -p  :: Persistente (sobrevive reboot)

  :: Deletar rota
  route delete 10.0.0.0

  :: Ver estatísticas de rede por interface
  netsh interface ip show ipstats
  netsh interface ip show icmpstats

  :: Resetar pilha TCP/IP (resolve problemas de rede)
  netsh int ip reset
  netsh int tcp reset
  netsh winsock reset    :: Resetar Winsock (requer reboot)

  :: Ver conexões ativas com processo
  netstat -bno
  netstat -ano | findstr :80  :: Quem usa a porta 80?`} />

        <h3>Script: Diagnóstico Completo de Rede</h3>
        <CodeBlock language="batch" title="diagnostico-rede.bat" code={`@echo off
  echo ===== DIAGNÓSTICO DE REDE =====
  echo.

  echo [1] Interfaces de rede:
  netsh interface show interface
  echo.

  echo [2] Configuração IP:
  ipconfig /all | findstr /i "ipv4 subnet gateway dns"
  echo.

  echo [3] Conectividade com gateway:
  for /f "tokens=3" %%g in ('ipconfig ^| findstr "Gateway"') do (
      ping -n 2 %%g >nul 2>&1 && echo Gateway OK: %%g || echo FALHA no gateway: %%g
  )

  echo [4] Conectividade com DNS:
  ping -n 2 8.8.8.8 >nul 2>&1 && echo Internet OK || echo SEM internet

  echo [5] Portas em escuta:
  netstat -an | findstr LISTENING
  echo.

  echo Relatório salvo em: C:\Logs\diag-rede.txt
  pause`} />

        <AlertBox type="info" title="NETSH vs PowerShell">
          Para configurações de rede modernas, o PowerShell com o módulo <code>NetAdapter</code> é mais robusto. Use <code>Get-NetAdapter</code>, <code>Set-NetIPAddress</code>, <code>Get-NetRoute</code>. O NETSH é ideal para scripts em ambientes sem PowerShell ou para compatibilidade com sistemas legados.
        </AlertBox>
      </PageContainer>
    );
  }