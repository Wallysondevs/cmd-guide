import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Key, Search, Plus, Trash2, Download, Upload } from "lucide-react";

export default function Registro() {
  return (
    <PageContainer
      title="Registro do Windows via REG"
      subtitle="Consulte, modifique e automatize o Registro do Windows diretamente pelo CMD usando o comando REG."
      difficulty="avancado"
      timeToRead="20 min"
    >
      <AlertBox type="warning" title="Cuidado com o Registro">
        O Registro do Windows é a espinha dorsal do sistema operacional. Modificações incorretas podem causar instabilidade ou falhas de inicialização. Sempre exporte um backup antes de fazer alterações.
      </AlertBox>

      <h2>Estrutura do Registro do Windows</h2>
      <p>
        O Registro é organizado em <strong>hives</strong> (colmeias), que são as raízes principais da hierarquia:
      </p>
      <table>
        <thead>
          <tr>
            <th>Hive</th>
            <th>Abreviação</th>
            <th>Conteúdo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>HKEY_LOCAL_MACHINE</td>
            <td>HKLM</td>
            <td>Configurações do sistema (todos os usuários)</td>
          </tr>
          <tr>
            <td>HKEY_CURRENT_USER</td>
            <td>HKCU</td>
            <td>Configurações do usuário logado</td>
          </tr>
          <tr>
            <td>HKEY_CLASSES_ROOT</td>
            <td>HKCR</td>
            <td>Associações de arquivos e COM objects</td>
          </tr>
          <tr>
            <td>HKEY_USERS</td>
            <td>HKU</td>
            <td>Configurações de todos os perfis de usuário</td>
          </tr>
          <tr>
            <td>HKEY_CURRENT_CONFIG</td>
            <td>HKCC</td>
            <td>Configurações de hardware atuais</td>
          </tr>
        </tbody>
      </table>

      <h2>Tipos de Valores</h2>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Exemplo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>REG_SZ</td>
            <td>String de texto simples</td>
            <td>"C:\Windows\System32"</td>
          </tr>
          <tr>
            <td>REG_EXPAND_SZ</td>
            <td>String com variáveis de ambiente expandíveis</td>
            <td>"%SystemRoot%\system32"</td>
          </tr>
          <tr>
            <td>REG_DWORD</td>
            <td>Número inteiro de 32 bits</td>
            <td>1, 0, 255</td>
          </tr>
          <tr>
            <td>REG_QWORD</td>
            <td>Número inteiro de 64 bits</td>
            <td>Valores grandes</td>
          </tr>
          <tr>
            <td>REG_BINARY</td>
            <td>Dados binários em hexadecimal</td>
            <td>00 01 FF A0</td>
          </tr>
          <tr>
            <td>REG_MULTI_SZ</td>
            <td>Lista de strings separadas por \0</td>
            <td>Múltiplos valores</td>
          </tr>
        </tbody>
      </table>

      <h2>REG QUERY — Consultando o Registro</h2>
      <p>O subcomando <code>REG QUERY</code> permite ler chaves e valores do registro.</p>
      <CodeBlock
        code={`REM Consultar um valor específico
reg query "HKLM\\Software\\Microsoft\\Windows NT\\CurrentVersion" /v ProductName

REM Resultado esperado:
REM HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows NT\\CurrentVersion
REM     ProductName    REG_SZ    Windows 10 Pro

REM Consultar toda uma chave (todos os valores)
reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer"

REM Consultar recursivamente uma chave e suas sub-chaves
reg query "HKCU\\Software\\MinhaApp" /s

REM Buscar por nome de valor em todo o registro (lento!)
reg query HKLM /f "Windows Defender" /t REG_SZ /s /k

REM Flags de busca:
REM /f "texto"    - padrão de busca
REM /t tipo       - tipo do valor (REG_SZ, REG_DWORD, etc)
REM /s            - busca recursiva em sub-chaves
REM /k            - busca em nomes de chaves
REM /d            - busca em dados dos valores
REM /c            - busca case-sensitive
REM /e            - correspondência exata`}
        language="batch"
        title="REG QUERY — exemplos de consulta"
      />

      <CodeBlock
        code={`REM Ver versão do Windows
reg query "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" /v CurrentBuildNumber

REM Ver se o Windows Defender está ativo
reg query "HKLM\\SOFTWARE\\Microsoft\\Windows Defender" /v DisableAntiSpyware

REM Verificar programas na inicialização (usuário atual)
reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run"

REM Verificar programas na inicialização (todos os usuários)
reg query "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run"

REM Ver servidores DNS configurados
reg query "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v NameServer`}
        language="batch"
        title="Consultas práticas do dia a dia"
      />

      <h2>REG ADD — Adicionando e Modificando Valores</h2>
      <p>Use <code>REG ADD</code> para criar chaves ou adicionar/modificar valores.</p>
      <CodeBlock
        code={`REM Sintaxe:
REM reg add ChaveDoCaminho /v NomeDoValor /t Tipo /d Dado /f

REM Criar uma chave (sem valores, apenas a estrutura)
reg add "HKCU\\Software\\MinhaEmpresa\\MeuApp"

REM Adicionar um valor do tipo string (REG_SZ)
reg add "HKCU\\Software\\MinhaEmpresa\\MeuApp" /v NomeUsuario /t REG_SZ /d "João Silva" /f

REM Adicionar um valor numérico (REG_DWORD)
reg add "HKCU\\Software\\MinhaEmpresa\\MeuApp" /v VersaoSchema /t REG_DWORD /d 5 /f

REM Adicionar um valor expandível (REG_EXPAND_SZ)
reg add "HKCU\\Software\\MinhaEmpresa\\MeuApp" /v DiretorioBase /t REG_EXPAND_SZ /d "%APPDATA%\\MeuApp" /f

REM /f = força sobrescrever se o valor já existir (sem pedir confirmação)
REM Sem /f, o CMD perguntará se deseja sobrescrever`}
        language="batch"
        title="REG ADD — criando e modificando valores"
      />

      <CodeBlock
        code={`REM Adicionar programa à inicialização automática do Windows
reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "MeuPrograma" /t REG_SZ /d "C:\\Apps\\meuprograma.exe" /f

REM Desativar tela de bloqueio (requer direitos de administrador)
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\Personalization" /v NoLockScreen /t REG_DWORD /d 1 /f

REM Configurar o tamanho da memória virtual (arquivo de paginação)
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v PagingFiles /t REG_MULTI_SZ /d "C:\\pagefile.sys 2048 4096" /f

REM Definir política de execução de scripts (equivalente ao PowerShell)
REM reg add "HKLM\\SOFTWARE\\Microsoft\\PowerShell\\1\\ShellIds\\Microsoft.PowerShell" /v ExecutionPolicy /t REG_SZ /d RemoteSigned /f`}
        language="batch"
        title="Exemplos de configuração do sistema via registro"
      />

      <h2>REG DELETE — Removendo Chaves e Valores</h2>
      <AlertBox type="danger" title="Irreversível!">
        A exclusão de chaves do registro não pode ser desfeita com Ctrl+Z. Sempre exporte um backup antes de deletar.
      </AlertBox>
      <CodeBlock
        code={`REM Remover um valor específico
reg delete "HKCU\\Software\\MinhaEmpresa\\MeuApp" /v NomeUsuario /f

REM Remover uma chave inteira (e todos os seus valores e sub-chaves)
reg delete "HKCU\\Software\\MinhaEmpresa\\MeuApp" /f

REM Remover programa da inicialização automática
reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "MeuPrograma" /f

REM Remover uma sub-chave específica
reg delete "HKCU\\Software\\MinhaEmpresa" /va /f
REM /va = remove todos os valores, mas mantém a chave

REM Sem /f, o CMD pedirá confirmação antes de deletar`}
        language="batch"
        title="REG DELETE — removendo entradas"
      />

      <h2>REG EXPORT e REG IMPORT — Backup e Restauração</h2>
      <CodeBlock
        code={`REM Exportar uma chave para arquivo .reg (backup)
reg export "HKCU\\Software\\MinhaEmpresa" C:\\backup\\minhaempresa.reg

REM Exportar o hive inteiro (muito grande!)
reg export HKCU C:\\backup\\hkcu_completo.reg

REM Exportar apenas um valor específico é impossível com REG EXPORT
REM (EXPORT sempre exporta a chave completa)

REM Importar um arquivo .reg
reg import C:\\backup\\minhaempresa.reg

REM Também é possível dar duplo clique no arquivo .reg no Explorer
REM para importar via interface gráfica`}
        language="batch"
        title="Backup e restauração de chaves"
      />

      <h2>REG COPY — Copiando Chaves</h2>
      <CodeBlock
        code={`REM Copiar uma chave para outro local (mesmo computador)
reg copy "HKCU\\Software\\MinhaEmpresa" "HKCU\\Software\\MinhaEmpresa_Backup" /s /f

REM Copiar chave de um computador remoto para o local
REM reg copy "\\\\ServidorRemoto\\HKLM\\Software\\App" "HKLM\\Software\\App" /s /f

REM /s = copia recursivamente todas as sub-chaves`}
        language="batch"
        title="REG COPY — copiando estruturas de chaves"
      />

      <h2>Exemplos Práticos de Scripts</h2>
      <CodeBlock
        code={`@ECHO OFF
REM Script: backup_registro.bat
REM Faz backup de chaves importantes do registro

SET BACKUP_DIR=C:\\Backups\\Registro
SET DATA=%DATE:~6,4%-%DATE:~3,2%-%DATE:~0,2%

IF NOT EXIST "%BACKUP_DIR%" MD "%BACKUP_DIR%"

ECHO Iniciando backup do registro em %DATA%...

REM Exporta chaves importantes
reg export "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" "%BACKUP_DIR%\\inicializacao_usuario_%DATA%.reg" /y
reg export "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" "%BACKUP_DIR%\\inicializacao_sistema_%DATA%.reg" /y
reg export "HKCU\\Software" "%BACKUP_DIR%\\software_usuario_%DATA%.reg" /y

ECHO Backup concluído em %BACKUP_DIR%
PAUSE`}
        language="batch"
        title="Script de backup automático do registro"
      />

      <CodeBlock
        code={`@ECHO OFF
REM Script: verificar_windows.bat
REM Exibe informações do Windows via registro

FOR /F "tokens=2*" %%A IN ('reg query "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" /v ProductName 2^>NUL') DO SET PRODUTO=%%B
FOR /F "tokens=2*" %%A IN ('reg query "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" /v CurrentBuildNumber 2^>NUL') DO SET BUILD=%%B
FOR /F "tokens=2*" %%A IN ('reg query "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion" /v ReleaseId 2^>NUL') DO SET VERSAO=%%B

ECHO ================================
ECHO Informações do Windows
ECHO ================================
ECHO Produto  : %PRODUTO%
ECHO Build    : %BUILD%
ECHO Release  : %VERSAO%
ECHO ================================`}
        language="batch"
        title="Lendo informações do Windows via registro"
      />

      <CodeBlock
        code={`@ECHO OFF
REM Script: gerenciar_inicializacao.bat
REM Lista e gerencia programas de inicialização

ECHO === Programas na Inicialização (Usuário Atual) ===
reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" 2>NUL

ECHO.
ECHO === Programas na Inicialização (Sistema) ===
reg query "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" 2>NUL

ECHO.
SET /P REMOVER=Deseja remover algum programa? (s/n): 
IF /I "%REMOVER%"=="s" (
    SET /P NOME=Nome do programa a remover: 
    reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "%NOME%" /f
    IF %ERRORLEVEL% EQU 0 (
        ECHO Programa "%NOME%" removido da inicialização.
    ) ELSE (
        ECHO Programa não encontrado na inicialização do usuário.
        ECHO Tentando na inicialização do sistema ^(requer Admin^)...
        reg delete "HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "%NOME%" /f
    )
)`}
        language="batch"
        title="Gerenciador de programas de inicialização"
      />

      <h2>Resumo dos Comandos REG</h2>
      <table>
        <thead>
          <tr>
            <th>Subcomando</th>
            <th>Ação</th>
            <th>Uso Típico</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>REG QUERY</td>
            <td>Consultar valores e chaves</td>
            <td>Ler configurações do sistema</td>
          </tr>
          <tr>
            <td>REG ADD</td>
            <td>Criar ou modificar valores</td>
            <td>Configurar aplicativos e sistema</td>
          </tr>
          <tr>
            <td>REG DELETE</td>
            <td>Remover chaves ou valores</td>
            <td>Limpar entradas obsoletas</td>
          </tr>
          <tr>
            <td>REG EXPORT</td>
            <td>Exportar para arquivo .reg</td>
            <td>Backup de configurações</td>
          </tr>
          <tr>
            <td>REG IMPORT</td>
            <td>Importar arquivo .reg</td>
            <td>Restaurar ou distribuir configs</td>
          </tr>
          <tr>
            <td>REG COPY</td>
            <td>Copiar chaves</td>
            <td>Duplicar configurações</td>
          </tr>
          <tr>
            <td>REG COMPARE</td>
            <td>Comparar chaves</td>
            <td>Verificar diferenças</td>
          </tr>
          <tr>
            <td>REG SAVE/RESTORE</td>
            <td>Salvar/restaurar hive binário</td>
            <td>Backup completo de hive</td>
          </tr>
        </tbody>
      </table>

      <AlertBox type="info" title="Dica: Regedit como complemento">
        Para navegação visual e operações complexas, use o <code>regedit.exe</code> (Ctrl+R, digite regedit). 
        O comando REG no CMD é ideal para automação em scripts, mas o regedit facilita a exploração e edição manual.
      </AlertBox>
    </PageContainer>
  );
}
