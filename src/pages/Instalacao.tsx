import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { Package, Download, Settings, RefreshCcw, Shield } from "lucide-react";

  export default function Instalacao() {
    return (
      <PageContainer
        title="Instalação Silenciosa de Programas"
        subtitle="Instale, atualize e remova programas sem interação do usuário com MSIEXEC, parâmetros /quiet, WINGET em lote e automação de instaladores."
        difficulty="avancado"
        timeToRead="35 min"
      >
        <h2><Package className="inline-block mr-2 mb-1 w-5 h-5" /> MSIEXEC — Instaladores MSI</h2>
        <p>O <code>MSIEXEC</code> é a ferramenta para instalar, modificar, reparar e remover pacotes Windows Installer (.msi). Com ele, você automatiza instalações completamente silenciosas, sem nenhuma janela ou prompt para o usuário.</p>

        <CodeBlock language="batch" title="Instalar pacote MSI silenciosamente" code={`:: Instalação silenciosa básica
  msiexec /i programa.msi /quiet /norestart

  :: Instalar com log detalhado
  msiexec /i programa.msi /quiet /norestart /log C:\Logs\instala.log

  :: Instalar com log verbose (máximo detalhe)
  msiexec /i programa.msi /quiet /norestart /l*v C:\Logs\instala-verbose.log

  :: Opções de interface (/q):
  :: /quiet       = Sem interface alguma (completamente silencioso)
  :: /passive     = Barra de progresso apenas (sem prompts)
  :: /qn          = Sem interface (mesmo que /quiet)
  :: /qb          = Interface básica (barra de progresso)
  :: /qb!         = Básica sem botão Cancelar
  :: /qr          = Interface reduzida

  :: Instalar em pasta personalizada
  msiexec /i programa.msi /quiet INSTALLDIR="C:\MinhaPasta\Programa"

  :: Instalar com propriedades adicionais
  msiexec /i programa.msi /quiet ADDLOCAL=ALL REMOVE=Feature1`} />

        <CodeBlock language="batch" title="Desinstalar e reparar via MSIEXEC" code={`:: Desinstalar via arquivo MSI
  msiexec /x programa.msi /quiet /norestart

  :: Desinstalar via ProductCode (GUID)
  msiexec /x {12345678-ABCD-1234-ABCD-123456789012} /quiet /norestart

  :: Encontrar ProductCode de um programa instalado
  reg query HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall /s | findstr /i "DisplayName ProductCode" | findstr /i "chrome"

  :: Reparar instalação corrompida
  msiexec /f programa.msi /quiet

  :: Opções de reparo (/f):
  :: /fp = Reinstala se arquivo ausente
  :: /fo = Reinstala se arquivo ausente ou versão anterior
  :: /fe = Reinstala se igual ou anterior
  :: /fd = Reinstala sempre
  :: /fc = Reinstala se checksum diferir
  :: /fa = Força reinstalação de todos os arquivos

  :: Ver versão instalada de MSI
  msiexec /i programa.msi /quiet /l*v - | findstr "ProductVersion"`} />

        <h2><Download className="inline-block mr-2 mb-1 w-5 h-5" /> Instaladores EXE com Flags Silenciosas</h2>
        <p>Muitos instaladores EXE aceitam parâmetros de linha de comando para instalação silenciosa. Os parâmetros variam por instalador — veja os mais comuns:</p>

        <CodeBlock language="batch" title="Flags silenciosas para instaladores comuns" code={`:: INNO SETUP (muito comum em softwares open source)
  programa_setup.exe /SILENT /NORESTART
  programa_setup.exe /VERYSILENT /NORESTART /SUPPRESSMSGBOXES

  :: NULLSOFT (NSIS) — outro instalador comum
  programa_setup.exe /S

  :: InstallShield
  programa_setup.exe /s /v"/qn REBOOT=ReallySuppress"
  programa_setup.exe /s /v/qn

  :: Microsoft Visual C++ Redistributable
  vc_redist.x64.exe /install /quiet /norestart
  vc_redist.x86.exe /install /quiet /norestart

  :: .NET Framework
  dotNetFx45_Full_x86_x64.exe /q /norestart

  :: 7-Zip
  7z2301-x64.exe /S /D="C:\Program Files\7-Zip"

  :: VLC Media Player
  vlc-3.0.18-win64.exe /L=1046 /S   :: /L=1046 = Português Brasileiro

  :: Firefox
  Firefox_Setup.exe -ms

  :: Google Chrome
  GoogleChrome.exe /silent /install

  :: Adobe Reader
  AcroRdrDC.exe /sAll /rs /rps /l /msi EULA_ACCEPT=YES /qn REBOOT=SUPPRESS

  :: Verificar flags disponíveis (muitos instaladores mostram com /?)
  programa_setup.exe /?
  programa_setup.exe /help`} />

        <h2><RefreshCcw className="inline-block mr-2 mb-1 w-5 h-5" /> WINGET — Gerenciador de Pacotes</h2>
        <CodeBlock language="batch" title="Instalar e gerenciar programas com WINGET" code={`:: Buscar programa
  winget search "visual studio code"
  winget search vscode
  winget search --id Microsoft.VisualStudioCode

  :: Instalar programa silenciosamente
  winget install Microsoft.VisualStudioCode --silent
  winget install Microsoft.VisualStudioCode -e --silent --accept-package-agreements --accept-source-agreements

  :: Instalar versão específica
  winget install Git.Git --version 2.40.0

  :: Instalar em local específico
  winget install Python.Python.3.11 --location "D:\Programas\Python"

  :: Atualizar programa específico
  winget upgrade Microsoft.VisualStudioCode --silent

  :: Atualizar TODOS os programas instalados
  winget upgrade --all --silent --accept-package-agreements

  :: Desinstalar programa
  winget uninstall Microsoft.VisualStudioCode --silent

  :: Listar programas instalados
  winget list
  winget list | findstr /i "microsoft"

  :: Exportar lista de programas para JSON
  winget export -o C:\Backup\programas.json

  :: Restaurar todos os programas de outro PC
  winget import -i C:\Backup\programas.json --accept-package-agreements`} />

        <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> Listar e Remover Programas via CMD</h2>
        <CodeBlock language="batch" title="Gerenciar programas instalados via WMIC e Registro" code={`:: Listar todos os programas instalados (WMIC)
  wmic product get Name, Version, Vendor > C:\Relatorios\programas.txt

  :: Buscar programa específico
  wmic product where "name like '%Adobe%'" get Name, Version

  :: Desinstalar via WMIC
  wmic product where "name='Adobe Reader DC'" call uninstall
  :: Responde automaticamente "yes" quando questionar

  :: Listar via registro (mais rápido que WMIC)
  reg query HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall /s | findstr "DisplayName"
  reg query HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall /s | findstr "DisplayName"

  :: Listar programas 32-bit em sistema 64-bit
  reg query HKLM\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall /s | findstr "DisplayName"

  :: Encontrar string de desinstalação
  reg query "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" /s | findstr /i "uninstallstring.*chrome"`} />

        <h3>Script: Implantação em Lote</h3>
        <CodeBlock language="batch" title="deploy-softwares.bat — Instalar lista de programas" code={`@echo off
  echo ===== IMPLANTAÇÃO DE SOFTWARES =====
  echo Iniciando em: %DATE% %TIME%
  echo.
  set LOG=C:\Logs\deploy-%DATE:~6,4%%DATE:~3,2%%DATE:~0,2%.log
  echo Deploy iniciado em %DATE% %TIME% > "%LOG%"

  :: Lista de instalações via WINGET
  set PKGS=^
      Git.Git ^
      Microsoft.VisualStudioCode ^
      Python.Python.3.11 ^
      Notepad++.Notepad++ ^
      7zip.7zip

  for %%p in (%PKGS%) do (
      echo Instalando %%p...
      winget install %%p --silent --accept-package-agreements --accept-source-agreements >> "%LOG%" 2>&1
      if %ERRORLEVEL% EQU 0 (
          echo   [OK] %%p >> "%LOG%"
      ) else (
          echo   [ERRO] %%p - código %ERRORLEVEL% >> "%LOG%"
      )
  )

  echo.
  echo Instalações concluídas! Log: %LOG%
  echo Erros encontrados:
  findstr "[ERRO]" "%LOG%"
  pause`} />

        <AlertBox type="info" title="Encontrar Flags Silenciosas">
          Site útil para descobrir parâmetros silenciosos de qualquer instalador: <strong>silentinstallhq.com</strong>. Você também pode usar o <strong>Orca</strong> (Microsoft) para abrir arquivos .msi e ver propriedades e features disponíveis.
        </AlertBox>

        <AlertBox type="success" title="Dica: Chocolatey e Scoop">
          Além do WINGET nativo, o <strong>Chocolatey</strong> (chocolatey.org) e o <strong>Scoop</strong> são gerenciadores de pacotes alternativos com repositórios ainda maiores. O Chocolatey é especialmente popular em ambientes corporativos.
        </AlertBox>
      </PageContainer>
    );
  }