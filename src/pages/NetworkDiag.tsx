import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Network, Search, Activity, AlertTriangle } from "lucide-react";

export default function NetworkDiag() {
  return (
    <PageContainer
      title="Diagnóstico Completo de Rede"
      subtitle="Ferramentas e scripts para diagnosticar falhas de rede, latência, DNS, firewall, e conectividade no Windows."
      difficulty="intermediario"
      timeToRead="30 min"
    >
      <h2><Network className="inline-block mr-2 mb-1 w-5 h-5" /> Diagnóstico em Camadas (OSI)</h2>
      <p>O diagnóstico de rede deve seguir as camadas do modelo OSI, do mais básico para o mais específico:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="space-y-2">
          {[
            {n:1, nome:"Física", cmd:"Ver adaptadores no Device Manager"},
            {n:2, nome:"Enlace", cmd:"arp -a | ipconfig"},
            {n:3, nome:"Rede", cmd:"ping gateway | route print"},
            {n:4, nome:"Transporte", cmd:"netstat -ano | telnet porta"},
            {n:5, nome:"Sessão", cmd:"net use | smbclient"},
            {n:6, nome:"Apresentação", cmd:"Protocolo de criptografia"},
            {n:7, nome:"Aplicação", cmd:"nslookup | curl | browser"},
          ].map(({n, nome, cmd}) => (
            <div key={n} className="flex gap-3 p-3 border border-border rounded text-sm">
              <span className="font-mono text-primary font-bold w-6">L{n}</span>
              <span className="font-bold w-24">{nome}</span>
              <span className="text-muted-foreground font-mono text-xs">{cmd}</span>
            </div>
          ))}
        </div>
        <div className="p-4 bg-muted/20 rounded border border-border">
          <h4 className="font-bold mb-3">Sequência de Diagnóstico</h4>
          <ol className="space-y-2 text-sm">
            <li>1. <strong>Adaptador:</strong> Tem cabo/Wi-Fi conectado?</li>
            <li>2. <strong>IP:</strong> Tem endereço IP válido (não 169.x)?</li>
            <li>3. <strong>Gateway:</strong> Consegue pingar o roteador?</li>
            <li>4. <strong>DNS:</strong> Resolve nomes de domínio?</li>
            <li>5. <strong>Internet:</strong> Conecta em IPs externos?</li>
            <li>6. <strong>Firewall:</strong> Alguma porta bloqueada?</li>
            <li>7. <strong>Aplicação:</strong> O serviço está rodando?</li>
          </ol>
        </div>
      </div>

      <h2><Search className="inline-block mr-2 mb-1 w-5 h-5" /> Script de Diagnóstico Completo</h2>
      <CodeBlock language="batch" title="network-diag.bat — Diagnóstico em camadas" code={`@echo off
setlocal
set LOG=C:\\Logs\network-diag-%date:~6,4%%date:~3,2%%date:~0,2%.txt

echo ========================= > %LOG%
echo DIAGNOSTICO DE REDE       >> %LOG%
echo Data: %date% %time%        >> %LOG%
echo PC: %COMPUTERNAME%         >> %LOG%
echo ========================= >> %LOG%
echo. >> %LOG%

:: CAMADA 3 - IP
echo [CAMADA 3: IP e Configuracao de Rede] >> %LOG%
ipconfig /all >> %LOG%
echo. >> %LOG%

:: CAMADA 3 - Gateway
echo [TESTE DE GATEWAY] >> %LOG%
for /f "tokens=3\" %%a in ('route print ^| findstr \"0.0.0.0 0.0.0.0\"') do (
    echo Testando gateway: %%a >> %LOG%
    ping -n 3 %%a >> %LOG%
    goto :after_gw
)
:after_gw
echo. >> %LOG%

:: CAMADA 7 - DNS
echo [TESTE DE DNS] >> %LOG%
nslookup google.com >> %LOG%
nslookup microsoft.com 8.8.8.8 >> %LOG%
echo. >> %LOG%

:: CAMADA 3 - Internet
echo [TESTE DE INTERNET] >> %LOG%
ping -n 3 8.8.8.8 >> %LOG%
ping -n 3 1.1.1.1 >> %LOG%
echo. >> %LOG%

:: CAMADA 4 - Portas (HTTP/HTTPS)
echo [TESTE DE PORTAS] >> %LOG%
powershell -Command "Test-NetConnection -ComputerName google.com -Port 80 -InformationLevel Quiet" >> %LOG%
powershell -Command "Test-NetConnection -ComputerName google.com -Port 443 -InformationLevel Quiet" >> %LOG%
echo. >> %LOG%

:: Tabela de rotas
echo [TABELA DE ROTAS] >> %LOG%
route print >> %LOG%
echo. >> %LOG%

:: Conexões ativas
echo [CONEXOES ATIVAS] >> %LOG%
netstat -ano | findstr "ESTABLISHED\" | head -20 >> %LOG%
echo. >> %LOG%

echo Diagnostico salvo em: %LOG%
type %LOG%
pause`} />

      <h2><Activity className="inline-block mr-2 mb-1 w-5 h-5" /> Testar Portas e Serviços</h2>
      <CodeBlock language="batch" title="Verificar se porta está aberta" code={`:: Testar conexão TCP (PowerShell)
powershell -Command "Test-NetConnection -ComputerName servidor.com -Port 3389\"

:: Testar múltiplas portas
for %%p in (80 443 3389 22 25 110 143) do (
    powershell -Command "Test-NetConnection -ComputerName servidor.com -Port %%p -InformationLevel Quiet -WarningAction SilentlyContinue"
    echo Porta %%p: %errorlevel%
)

:: Telnet como alternativa
telnet servidor.com 80
:: Se conectar (tela em branco), a porta está aberta
:: Se recusar, a porta está fechada/filtrada

:: Verificar portas com NETSTAT
netstat -ano | findstr ":80 \"`} />

      <h2><AlertTriangle className="inline-block mr-2 mb-1 w-5 h-5" /> Problemas Comuns e Soluções</h2>
      <CodeBlock language="batch" title="Reset completo de configurações de rede" code={`@echo off
echo Resetando configuracoes de rede...
echo ATENCAO: Isto vai reiniciar as configuracoes!
pause

:: Resetar pilha TCP/IP
netsh int ip reset C:\\Logs\reset-ip.log

:: Resetar Winsock
netsh winsock reset catalog

:: Limpar cache DNS
ipconfig /flushdns

:: Liberar e renovar IP
ipconfig /release
ipconfig /renew

:: Limpar cache ARP
arp -d *

:: Resetar firewall para padrão
netsh advfirewall reset

echo.
echo Reset concluido! Reinicie o computador.
pause`} />

      <AlertBox type="success" title="NETSH TRACE — Capturar Pacotes de Rede">
        O Windows pode capturar tráfego de rede sem instalar o Wireshark:
        <CodeBlock language="batch" title="Captura de pacotes nativamente" code={`:: Iniciar captura
netsh trace start capture=yes tracefile=C:\\captura.etl maxsize=500

:: Parar captura
netsh trace stop

:: Converter para formato legível
netsh trace convert input=C:\\captura.etl output=C:\\captura.txt`} />
      </AlertBox>
    </PageContainer>
  );
}