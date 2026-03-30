import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Terminal, Download, RefreshCcw, Layers } from "lucide-react";

export default function WSL() {
  return (
    <PageContainer
      title="WSL — Windows Subsystem for Linux"
      subtitle="Instale e use o Linux diretamente no Windows pelo CMD: Ubuntu, Debian, Kali e mais, sem VM ou dual boot."
      difficulty="intermediario"
      timeToRead="28 min"
    >
      <h2><Download className="inline-block mr-2 mb-1 w-5 h-5" /> Instalar o WSL</h2>
      <p>O WSL (Windows Subsystem for Linux) permite rodar distribuições Linux diretamente no Windows 10/11, integradas ao sistema de arquivos e à rede do Windows.</p>

      <AlertBox type="info" title="Requisitos">
        Windows 10 versão 2004+ (build 19041) ou Windows 11. Execute o CMD como Administrador.
      </AlertBox>

      <CodeBlock language="batch" title="Instalar WSL 2 (forma mais simples)" code={`:: Instalar WSL com Ubuntu padrão
wsl --install

:: Instalar distribuição específica
wsl --install -d Ubuntu-22.04
wsl --install -d Debian
wsl --install -d kali-linux

:: Ver distribuições disponíveis
wsl --list --online

:: Atualizar o kernel WSL
wsl --update

:: Definir WSL 2 como padrão
wsl --set-default-version 2`} />

      <h2><RefreshCcw className="inline-block mr-2 mb-1 w-5 h-5" /> Gerenciar Distribuições</h2>
      <CodeBlock language="batch" title="Listar e gerenciar distros WSL" code={`:: Listar distros instaladas e status
wsl --list --verbose
wsl -l -v

:: Iniciar distro padrão
wsl

:: Iniciar distro específica
wsl -d Ubuntu-22.04

:: Definir distro padrão
wsl --set-default Ubuntu-22.04

:: Desligar todas as distros
wsl --shutdown

:: Desligar distro específica
wsl --terminate Ubuntu-22.04

:: Exportar distro como backup
wsl --export Ubuntu-22.04 C:\\Backup\\ubuntu.tar

:: Importar distro
wsl --import MeuUbuntu D:\\WSL\\Ubuntu C:\\Backup\\ubuntu.tar`} />

      <h2><Terminal className="inline-block mr-2 mb-1 w-5 h-5" /> Executar Comandos Linux pelo CMD</h2>
      <CodeBlock language="batch" title="Rodar comandos Linux sem sair do CMD" code={`:: Executar comando único
wsl ls -la

:: Executar script bash
wsl bash -c "apt update && apt upgrade -y\"

:: Executar como root
wsl -u root apt install nginx

:: Rodar pipeline Linux
wsl cat /var/log/syslog | wsl grep "error\" | wsl head -20

:: Usar ferramentas Linux com arquivos Windows
wsl grep -r "TODO\" /mnt/c/Users/Joao/Projetos/`} />

      <h3>Integração Windows ↔ Linux</h3>
      <CodeBlock language="batch" title="Acessar arquivos entre os sistemas" code={`:: No CMD: acessar arquivos Linux
:: Caminho: \\wsl$\\Ubuntu\\home\\joao

dir \\wsl$\\Ubuntu\\home\\joao
copy \\wsl$\\Ubuntu\\home\\joao\\script.sh C:\\Scripts\

:: No bash WSL: acessar arquivos Windows
:: Windows está montado em /mnt/c, /mnt/d, etc.
wsl ls /mnt/c/Users/Joao/Documents

:: Abrir explorador do Windows em pasta Linux
wsl explorer.exe .

:: Abrir VS Code no projeto Linux
wsl code .`} />

      <h2><Layers className="inline-block mr-2 mb-1 w-5 h-5" /> Configurar o WSL</h2>
      <CodeBlock language="batch" title="Arquivo de configuração .wslconfig" code={`:: Criar arquivo C:\\Users\\SEU_USUARIO\\.wslconfig
:: com as configurações desejadas:

:: [wsl2]
:: memory=4GB          # Limitar RAM usada pelo WSL
:: processors=2        # Número de CPUs virtuais
:: swap=2GB            # Swap
:: localhostForwarding=true  # Forwarding de portas
:: nestedVirtualization=false

:: Depois reiniciar WSL
wsl --shutdown
wsl`} />

      <AlertBox type="success" title="WSL + Docker Desktop">
        O Docker Desktop no Windows usa o WSL 2 como backend. Com isso você pode rodar containers Docker sem a sobrecarga de uma VM completa — é muito mais eficiente e rápido.
      </AlertBox>

      <h3>Comandos Linux Essenciais via WSL</h3>
      <CodeBlock language="batch" title="Combinando CMD e Linux" code={`:: Verificar conectividade com curl (Linux)
wsl curl -s https://api.github.com/zen

:: Processar CSV com awk
wsl awk -F, "NR>1 {sum += $3} END {print sum}\" /mnt/c/dados.csv

:: Compactar pasta com tar
wsl tar -czf /mnt/d/backup.tar.gz /mnt/c/Users/Joao/Projetos

:: Usar sed para substituição em arquivo
wsl sed -i "s/localhost/servidor.empresa.com/g\" /mnt/c/app/config.ini

:: Converter finais de linha CRLF → LF
wsl sed -i "s/\\r$//\" /mnt/c/Scripts/script.sh`} />
    </PageContainer>
  );
}