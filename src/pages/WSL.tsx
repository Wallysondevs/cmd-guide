import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { Terminal, Download, RefreshCcw, Layers, Network, Settings, Wrench } from "lucide-react";

  export default function WSL() {
    return (
      <PageContainer
        title="WSL — Windows Subsystem for Linux"
        subtitle="Instale e use o Linux diretamente no Windows pelo CMD: Ubuntu, Debian, Kali e mais, sem VM ou dual boot."
        difficulty="intermediario"
        timeToRead="40 min"
      >
        <h2><Download className="inline-block mr-2 mb-1 w-5 h-5" /> Instalar o WSL</h2>
        <p>O WSL (Windows Subsystem for Linux) permite rodar distribuições Linux diretamente no Windows 10/11, integradas ao sistema de arquivos e à rede do Windows. O WSL 2 usa um kernel Linux real rodando em uma VM leve, oferecendo compatibilidade total com chamadas de sistema Linux.</p>

        <AlertBox type="info" title="Requisitos">
          Windows 10 versão 2004+ (build 19041) ou Windows 11. Execute o CMD como Administrador. Para WSLg (apps gráficos), Windows 11 ou Windows 10 Insider Preview build 21364+.
        </AlertBox>

        <CodeBlock language="batch" title="Instalar WSL 2" code={`:: Instalar WSL com Ubuntu padrão (requer reinicialização)
  wsl --install

  :: Instalar distribuição específica
  wsl --install -d Ubuntu-22.04
  wsl --install -d Ubuntu-24.04
  wsl --install -d Debian
  wsl --install -d kali-linux
  wsl --install -d openSUSE-42
  wsl --install -d OracleLinux_8_7

  :: Ver distribuições disponíveis online
  wsl --list --online
  :: Saída esperada:
  ::   NAME                  FRIENDLY NAME
  ::   Ubuntu                Ubuntu
  ::   Ubuntu-22.04          Ubuntu 22.04 LTS
  ::   kali-linux            Kali Linux Rolling
  ::   Debian                Debian GNU/Linux

  :: Atualizar o kernel WSL
  wsl --update

  :: Ver versão atual do WSL
  wsl --version

  :: Definir WSL 2 como padrão (recomendado)
  wsl --set-default-version 2`} />

        <h2><RefreshCcw className="inline-block mr-2 mb-1 w-5 h-5" /> Gerenciar Distribuições</h2>
        <CodeBlock language="batch" title="Listar, iniciar e controlar distros WSL" code={`:: Listar distros instaladas e status
  wsl --list --verbose
  wsl -l -v
  :: Saída:
  ::   NAME            STATE           VERSION
  :: * Ubuntu-22.04    Running         2
  ::   Debian          Stopped         2

  :: Iniciar distro padrão
  wsl

  :: Iniciar distro específica
  wsl -d Ubuntu-22.04

  :: Iniciar como usuário específico
  wsl -d Ubuntu-22.04 -u root
  wsl -d Ubuntu-22.04 -u joao

  :: Definir distro padrão
  wsl --set-default Ubuntu-22.04

  :: Converter distro de WSL 1 para WSL 2
  wsl --set-version Ubuntu 2

  :: Desligar todas as distros (libera memória RAM)
  wsl --shutdown

  :: Desligar distro específica
  wsl --terminate Ubuntu-22.04

  :: Remover uma distro (apaga todos os dados!)
  wsl --unregister Ubuntu-22.04`} />

        <h2><Terminal className="inline-block mr-2 mb-1 w-5 h-5" /> Executar Comandos Linux pelo CMD</h2>
        <CodeBlock language="batch" title="Rodar comandos Linux sem sair do CMD" code={`:: Executar comando único no WSL
  wsl ls -la /home

  :: Executar script bash
  wsl bash -c "apt update && apt upgrade -y"

  :: Executar como root sem mudar de usuário
  wsl -u root apt install -y nginx

  :: Rodar pipeline Linux completo
  wsl cat /var/log/syslog | wsl grep "error" | wsl head -20

  :: Usar ferramentas Linux com arquivos Windows
  wsl grep -rn "TODO" /mnt/c/Users/Joao/Projetos/

  :: Processar CSV com awk
  wsl awk -F, "NR>1 {sum += \\$3} END {print sum}" /mnt/c/dados.csv

  :: Contar linhas em arquivo Windows
  wsl wc -l /mnt/c/logs/acesso.log

  :: Converter finais de linha CRLF para LF
  wsl sed -i "s/\\r$//" /mnt/c/Scripts/script.sh

  :: Usar curl Linux (mais completo que o do Windows)
  wsl curl -s -o /dev/null -w "%{http_code}" https://meusite.com.br`} />

        <h3>Integração Windows ↔ Linux: Arquivos</h3>
        <CodeBlock language="batch" title="Acessar arquivos entre os dois sistemas" code={`:: No CMD: acessar o sistema de arquivos Linux
  :: O Windows monta o WSL em \\wsl$\\NomeDaDistro
  dir \\wsl$\\\\Ubuntu-22.04\\home\\joao
  copy \\wsl$\\\\Ubuntu-22.04\\home\\joao\\script.sh C:\\Scripts\\

  :: No bash WSL: acessar Windows (montado em /mnt/)
  wsl ls /mnt/c/Users/Joao/Documents
  wsl ls /mnt/d/Projetos

  :: Copiar arquivo do Windows para Linux
  wsl cp /mnt/c/dados.csv /home/joao/analise/

  :: Abrir Explorer do Windows em pasta Linux
  wsl explorer.exe .

  :: Abrir VS Code a partir do Linux (extensão Remote WSL)
  wsl code .

  :: Abrir arquivo no Notepad a partir do WSL
  wsl notepad.exe /mnt/c/arquivo.txt`} />

        <h2><Network className="inline-block mr-2 mb-1 w-5 h-5" /> Rede e Port Forwarding</h2>
        <p>O WSL 2 usa uma interface de rede virtualizada. Serviços rodando no Linux ficam acessíveis do Windows via <code>localhost</code>, mas acesso externo requer port forwarding.</p>

        <CodeBlock language="batch" title="Descobrir IP do WSL e configurar port forwarding" code={`:: Descobrir o IP interno do WSL 2
  wsl hostname -I
  :: Saída: 172.22.144.5

  :: Ver IP a partir do CMD
  wsl cat /etc/resolv.conf | findstr nameserver

  :: Port forwarding: expor porta do WSL para a rede local
  :: Exemplo: expor servidor web na porta 8080 do WSL para porta 8080 do Windows
  netsh interface portproxy add v4tov4 listenport=8080 listenaddress=0.0.0.0 connectport=8080 connectaddress=172.22.144.5

  :: Listar port proxies configurados
  netsh interface portproxy show all

  :: Remover port forwarding
  netsh interface portproxy delete v4tov4 listenport=8080 listenaddress=0.0.0.0

  :: Script automático: atualizar forwarding com IP dinâmico do WSL
  for /f "tokens=*" %%i in ('wsl hostname -I') do set WSL_IP=%%i
  netsh interface portproxy add v4tov4 listenport=80 listenaddress=0.0.0.0 connectport=80 connectaddress=%WSL_IP%`} />

        <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> Configurar o WSL (.wslconfig e wsl.conf)</h2>
        <CodeBlock language="batch" title="Arquivo .wslconfig — limites de recursos" code={`:: Criar C:\\Users\\SEU_USUARIO\\.wslconfig com as configurações:

  :: [wsl2]
  :: memory=4GB              # Máximo de RAM que o WSL pode usar
  :: processors=4            # Máximo de CPUs virtuais
  :: swap=2GB                # Tamanho do arquivo de swap
  :: swapFile=C:\\Temp\\wsl-swap.vhdx  # Local do arquivo de swap
  :: localhostForwarding=true         # Redireciona localhost automaticamente
  :: nestedVirtualization=true        # Habilita virtualização aninhada
  :: guiApplications=true             # Habilita WSLg (apps gráficos)
  :: debugConsole=false               # Console de debug da VM

  :: Criar o arquivo via CMD:
  (
    echo [wsl2]
    echo memory=4GB
    echo processors=4
    echo swap=2GB
    echo localhostForwarding=true
  ) > "%USERPROFILE%\\.wslconfig"

  :: Reiniciar para aplicar
  wsl --shutdown`} />

        <CodeBlock language="batch" title="Arquivo wsl.conf — dentro do Linux" code={`:: Criar /etc/wsl.conf DENTRO da distro Linux (via WSL)
  wsl -u root bash -c "cat > /etc/wsl.conf << 'EOF'
  [boot]
  systemd=true

  [automount]
  enabled=true
  root=/mnt/
  options=metadata,umask=22,fmask=11

  [network]
  generateHosts=true
  generateResolvConf=true
  hostname=meu-wsl

  [interop]
  enabled=true
  appendWindowsPath=true
  EOF"

  :: Depois reiniciar WSL
  wsl --shutdown`} />

        <h2><Layers className="inline-block mr-2 mb-1 w-5 h-5" /> Backup e Restauração de Distros</h2>
        <CodeBlock language="batch" title="Exportar e importar distribuições WSL" code={`:: Exportar distro como backup (comprimido .tar)
  wsl --export Ubuntu-22.04 D:\\Backup\\ubuntu-backup.tar

  :: Importar em qualquer pasta
  wsl --import Ubuntu-Restaurado D:\\WSL\\Ubuntu D:\\Backup\\ubuntu-backup.tar

  :: Clonar distro (criar cópia)
  wsl --export Ubuntu-22.04 D:\\Temp\\ubuntu-clone.tar
  wsl --import Ubuntu-Clone D:\\WSL\\Clone D:\\Temp\\ubuntu-clone.tar

  :: Importar como WSL 2 (explícito)
  wsl --import Debian-Novo D:\\WSL\\Debian D:\\Backup\\debian.tar --version 2

  :: Listar após importar
  wsl -l -v`} />

        <h2><Wrench className="inline-block mr-2 mb-1 w-5 h-5" /> Troubleshooting</h2>

        <AlertBox type="warning" title="Erros Comuns e Soluções">
          Se o WSL não iniciar, experimente os comandos de diagnóstico abaixo.
        </AlertBox>

        <CodeBlock language="batch" title="Diagnóstico e correção de problemas" code={`:: Erro: "WslRegisterDistribution failed with error: 0x80370102"
  :: Causa: virtualização não habilitada na BIOS
  :: Solução: ativar Intel VT-x ou AMD-V na BIOS/UEFI
  systeminfo | findstr /i "hyper-v"

  :: Erro: "WslRegisterDistribution failed with error: 0x8007019e"
  :: Causa: WSL não instalado corretamente
  :: Solução:
  dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
  dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

  :: Erro de rede no WSL (não consegue pingar)
  wsl -- bash -c "echo 'nameserver 8.8.8.8' > /etc/resolv.conf"

  :: Reiniciar WSL completamente
  wsl --shutdown
  net stop LxssManager
  net start LxssManager
  wsl

  :: Ver logs do WSL (para diagnóstico avançado)
  wsl --status
  wsl --version

  :: Reparar instalação do WSL
  wsl --install --no-distribution
  wsl --update --rollback  :: Voltar versão anterior do kernel`} />

        <AlertBox type="success" title="WSLg — Apps Gráficos Linux no Windows 11">
          Com o WSLg, você pode rodar aplicativos Linux com interface gráfica diretamente no Windows, sem precisar de servidor X externo. Instale normalmente dentro do WSL: <code>sudo apt install gedit firefox gimp</code> e execute — a janela aparece no Windows automaticamente.
        </AlertBox>

        <AlertBox type="info" title="WSL + Docker Desktop">
          O Docker Desktop no Windows usa o WSL 2 como backend. Com isso você pode rodar containers Docker sem a sobrecarga de uma VM completa — é muito mais eficiente e rápido. Configure em Docker Desktop → Settings → Resources → WSL Integration.
        </AlertBox>
      </PageContainer>
    );
  }