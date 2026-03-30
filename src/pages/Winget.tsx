import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Package, Download, RefreshCcw, Search } from "lucide-react";

export default function Winget() {
  return (
    <PageContainer
      title="WINGET e Gerenciamento de Pacotes"
      subtitle="Instale, atualize e remova programas pelo CMD com o Winget, MSIEXEC e outras ferramentas de gerenciamento de software."
      difficulty="iniciante"
      timeToRead="25 min"
    >
      <h2><Package className="inline-block mr-2 mb-1 w-5 h-5" /> WINGET — Gerenciador de Pacotes do Windows</h2>
      <p>O <code>WINGET</code> (Windows Package Manager) é o gerenciador de pacotes oficial da Microsoft, disponível no Windows 10/11. Com ele você instala programas como no apt/brew, direto pelo CMD.</p>

      <AlertBox type="info" title="Como Instalar o Winget">
        O Winget vem pré-instalado no Windows 11. No Windows 10, instale via Microsoft Store: pesquise "App Installer\". Ou via PowerShell: <code>Add-AppxPackage</code> com o pacote da Microsoft.
      </AlertBox>

      <h3>Instalar Programas</h3>
      <CodeBlock language="batch" title="Instalar aplicativos com winget" code={`:: Instalar um programa (com confirmação)
winget install Mozilla.Firefox

:: Instalar sem perguntas (modo silencioso)
winget install Google.Chrome --silent --accept-package-agreements --accept-source-agreements

:: Instalar versão específica
winget install Microsoft.VisualStudioCode --version 1.85.0

:: Instalar por ID exato
winget install --id Git.Git -e

:: Instalar em pasta personalizada
winget install 7zip.7zip --location "D:\\Programas\\7zip\"`} />

      <h3>Buscar e Informações</h3>
      <CodeBlock language="batch" title="Buscar e ver detalhes de pacotes" code={`:: Buscar pacote
winget search "visual studio code"
winget search --id Microsoft.VisualStudioCode

:: Ver detalhes de um pacote
winget show Microsoft.VisualStudioCode

:: Listar programas instalados via winget
winget list

:: Listar TODOS os programas instalados (inclui os sem winget)
winget list --source winget`} />

      <h2><RefreshCcw className="inline-block mr-2 mb-1 w-5 h-5" /> Atualizar e Remover</h2>
      <CodeBlock language="batch" title="Manter programas atualizados" code={`:: Ver programas com atualizações disponíveis
winget upgrade

:: Atualizar programa específico
winget upgrade Mozilla.Firefox

:: Atualizar TODOS os programas (cuidado!)
winget upgrade --all

:: Atualizar tudo exceto um programa
winget upgrade --all --exclude Microsoft.VisualStudioCode

:: Remover programa
winget uninstall Mozilla.Firefox

:: Remover sem confirmação
winget uninstall Mozilla.Firefox --silent`} />

      <h3>Exportar e Importar Lista de Programas</h3>
      <CodeBlock language="batch" title="Backup e restauração de programas" code={`:: Exportar lista de programas instalados
winget export -o C:\\Backup\\programas.json

:: Importar e instalar tudo de uma lista
winget import -i C:\\Backup\\programas.json --accept-package-agreements`} />

      <h2><Download className="inline-block mr-2 mb-1 w-5 h-5" /> MSIEXEC — Instalar Pacotes MSI</h2>
      <CodeBlock language="batch" title="Instalar e desinstalar MSI pelo CMD" code={`:: Instalação silenciosa de MSI
msiexec /i C:\\Downloads\\programa.msi /quiet /norestart

:: Instalação com log
msiexec /i programa.msi /quiet /l*v C:\\Logs\\instalacao.log

:: Desinstalar por GUID (código de produto)
msiexec /x {GUID-DO-PRODUTO} /quiet /norestart

:: Descobrir GUID de programas instalados
wmic product get Name,IdentifyingNumber | findstr "Programa\"

:: Reparar instalação MSI
msiexec /fp C:\\Downloads\\programa.msi /quiet`} />

      <h3>Script de Setup de Máquina</h3>
      <CodeBlock language="batch" title="setup-maquina.bat — Instalar programas essenciais" code={`@echo off
echo Configurando nova maquina de desenvolvimento...
echo.

:: Verificar se winget está disponível
winget --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Winget nao encontrado. Instale o App Installer.
    pause & exit /b 1
)

echo [1/8] Instalando Chrome...
winget install Google.Chrome -s winget --silent --accept-package-agreements

echo [2/8] Instalando VS Code...
winget install Microsoft.VisualStudioCode --silent --accept-package-agreements

echo [3/8] Instalando Git...
winget install Git.Git --silent --accept-package-agreements

echo [4/8] Instalando Node.js...
winget install OpenJS.NodeJS --silent --accept-package-agreements

echo [5/8] Instalando Python...
winget install Python.Python.3.12 --silent --accept-package-agreements

echo [6/8] Instalando 7-Zip...
winget install 7zip.7zip --silent --accept-package-agreements

echo [7/8] Instalando VLC...
winget install VideoLAN.VLC --silent --accept-package-agreements

echo [8/8] Instalando Windows Terminal...
winget install Microsoft.WindowsTerminal --silent --accept-package-agreements

echo.
echo Instalacao concluida! Reinicie o computador.
pause`} />

      <h2><Search className="inline-block mr-2 mb-1 w-5 h-5" /> Programas Úteis pelo CMD</h2>
      <CodeBlock language="batch" title="IDs de pacotes populares" code={`:: Desenvolvimento
winget install Git.Git
winget install Microsoft.VisualStudioCode  
winget install OpenJS.NodeJS
winget install Python.Python.3.12
winget install JetBrains.IntelliJIDEA.Community
winget install Docker.DockerDesktop

:: Utilitários
winget install 7zip.7zip
winget install Notepad++.Notepad++
winget install voidtools.Everything
winget install gerardog.gsudo

:: Navegadores
winget install Google.Chrome
winget install Mozilla.Firefox
winget install Microsoft.Edge

:: Comunicação
winget install Discord.Discord
winget install SlackTechnologies.Slack
winget install Zoom.Zoom`} />
    </PageContainer>
  );
}