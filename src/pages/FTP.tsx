import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Upload, Download, Globe, Terminal } from "lucide-react";

export default function FTP() {
  return (
    <PageContainer
      title="Transferência de Arquivos: FTP, BITS e SSH"
      subtitle="Transfira arquivos via FTP, BITSADMIN e SSH diretamente do CMD, com ou sem interface interativa."
      difficulty="intermediario"
      timeToRead="28 min"
    >
      <h2><Globe className="inline-block mr-2 mb-1 w-5 h-5" /> FTP — Protocolo de Transferência de Arquivos</h2>
      <p>O CMD inclui um cliente FTP nativo para transferência de arquivos com servidores FTP.</p>

      <AlertBox type="warning" title="FTP é Inseguro">
        O FTP transmite dados e senhas em texto plano. Prefira SFTP/SCP quando possível. Use FTP apenas em redes internas ou quando o servidor não suportar SFTP.
      </AlertBox>

      <h3>FTP Interativo</h3>
      <CodeBlock language="batch" title="Sessão FTP interativa" code={`:: Conectar ao servidor FTP
ftp ftp.exemplo.com

:: Comandos dentro do FTP interativo:
:: open ftp.servidor.com   :: conectar
:: user joao               :: login
:: cd /pasta/remota        :: navegar
:: ls                      :: listar
:: get arquivo.txt         :: baixar
:: put local.txt           :: enviar
:: mget *.txt              :: baixar múltiplos
:: mput *.csv              :: enviar múltiplos
:: binary                  :: modo binário (para .exe, .zip etc.)
:: ascii                   :: modo texto
:: bye / quit              :: desconectar`} />

      <h3>FTP Automatizado (Sem Interação)</h3>
      <CodeBlock language="batch" title="Script FTP com arquivo de comandos" code={`:: Criar arquivo de comandos FTP
echo open ftp.servidor.com> ftp-script.txt
echo usuario>> ftp-script.txt
echo senha123>> ftp-script.txt
echo binary>> ftp-script.txt
echo cd /uploads>> ftp-script.txt
echo put C:\\Relatorios\relatorio.pdf>> ftp-script.txt
echo get /dados/dados.csv C:\\Baixados\\dados.csv>> ftp-script.txt
echo bye>> ftp-script.txt

:: Executar script FTP
ftp -s:ftp-script.txt -n ftp.servidor.com

:: Limpar arquivo com credenciais
del ftp-script.txt`} />

      <h2><Download className="inline-block mr-2 mb-1 w-5 h-5" /> BITSADMIN — Downloads em Segundo Plano</h2>
      <p>O <code>BITSADMIN</code> usa o serviço BITS (Background Intelligent Transfer Service) para downloads robustos que continuam mesmo após desconexão.</p>

      <CodeBlock language="batch" title="Baixar arquivos com BITSADMIN" code={`:: Download simples
bitsadmin /transfer "MeuDownload" https://exemplo.com/arquivo.zip C:\\Downloads\\arquivo.zip

:: Download com prioridade
bitsadmin /create download-teste
bitsadmin /addfile download-teste https://example.com/file.zip C:\\Downloads\file.zip
bitsadmin /setpriority download-teste NORMAL
bitsadmin /resume download-teste
bitsadmin /complete download-teste

:: Ver todos os jobs BITS
bitsadmin /list /allusers

:: Cancelar job
bitsadmin /cancel download-teste

:: Via PowerShell (mais simples)
powershell -Command "Start-BitsTransfer -Source 'https://exemplo.com/arquivo.zip' -Destination 'C:\\Downloads\\arquivo.zip'\"`} />

      <h2><Terminal className="inline-block mr-2 mb-1 w-5 h-5" /> SSH Nativo no Windows 10/11</h2>
      <p>O Windows 10/11 inclui um cliente SSH nativo. Não precisa instalar PuTTY!</p>

      <CodeBlock language="batch" title="Usar SSH pelo CMD" code={`:: Conectar a servidor SSH
ssh usuario@servidor.exemplo.com

:: Conectar em porta personalizada
ssh -p 2222 usuario@servidor.exemplo.com

:: Copiar arquivo para servidor (SCP)
scp C:\\local\\arquivo.txt usuario@servidor:/home/usuario/

:: Copiar arquivo do servidor
scp usuario@servidor:/home/usuario/arquivo.txt C:\\Downloads\

:: Copiar pasta inteira (recursivo)
scp -r C:\\Projeto usuario@servidor:/home/usuario/

:: Executar comando remoto sem shell interativo
ssh usuario@servidor "sudo systemctl restart nginx\"

:: Criar túnel SSH (port forwarding)
ssh -L 3306:localhost:3306 usuario@servidor`} />

      <h3>Configurar Chaves SSH</h3>
      <CodeBlock language="batch" title="Gerar e configurar chaves SSH" code={`:: Gerar par de chaves RSA
ssh-keygen -t rsa -b 4096 -C "meu-email@empresa.com\"

:: Gerar chave Ed25519 (mais moderna)
ssh-keygen -t ed25519 -C "meu-email@empresa.com\"

:: Ver chaves geradas
dir %USERPROFILE%\\.ssh\

:: Copiar chave pública para servidor (Linux)
:: type %USERPROFILE%\\.ssh\\id_rsa.pub | ssh user@servidor "cat >> ~/.ssh/authorized_keys\"

:: Usar chave específica
ssh -i C:\\Users\\Joao\\.ssh\\minha-chave usuario@servidor`} />

      <h2><Upload className="inline-block mr-2 mb-1 w-5 h-5" /> CERTUTIL como Downloader</h2>
      <CodeBlock language="batch" title="Baixar arquivos com ferramentas nativas" code={`:: Download com certutil (sem instalar curl)
certutil -urlcache -split -f "https://exemplo.com/arquivo.zip" arquivo.zip

:: Download com PowerShell (recomendado)
powershell -Command "Invoke-WebRequest -Uri 'https://exemplo.com/arquivo.zip' -OutFile 'C:\\Downloads\\arquivo.zip'\"

:: Download rápido com PowerShell
powershell -Command "(New-Object Net.WebClient).DownloadFile('https://url.com/file.exe','C:\\Downloads\file.exe')\"

:: Verificar hash após download
certutil -hashfile C:\\Downloads\\arquivo.zip SHA256`} />

      <AlertBox type="info" title="Instalar OpenSSH Server no Windows">
        Para aceitar conexões SSH em uma máquina Windows:
        <CodeBlock language="batch" title="Instalar e configurar SSH Server" code={`:: Via winget
winget install Microsoft.OpenSSH.Beta

:: Ou via PowerShell (Configurações do Windows)
powershell -Command "Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0"
powershell -Command "Start-Service sshd"
powershell -Command "Set-Service -Name sshd -StartupType 'Automatic'\"`} />
      </AlertBox>
    </PageContainer>
  );
}