import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Settings, Globe, Code, Layers } from "lucide-react";

export default function AmbientePath() {
  return (
    <PageContainer
      title="Variáveis de Ambiente e PATH Avançado"
      subtitle="Domine a configuração do PATH do sistema, gerencie variáveis de ambiente persistentes e entenda os escopos de variáveis no Windows."
      difficulty="intermediario"
      timeToRead="28 min"
    >
      <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> Tipos de Variáveis de Ambiente</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="p-4 border border-border rounded-lg bg-secondary/10">
          <h4 className="font-bold mb-2">Locais (Sessão)</h4>
          <p className="text-sm">Existem apenas na sessão CMD atual. Criadas com <code>SET</code>. Somem quando o CMD é fechado.</p>
        </div>
        <div className="p-4 border border-border rounded-lg bg-secondary/10">
          <h4 className="font-bold mb-2">Usuário</h4>
          <p className="text-sm">Persistentes para o usuário atual. Salvas no Registro em <code>HKCU\Environment</code>.</p>
        </div>
        <div className="p-4 border border-border rounded-lg bg-secondary/10">
          <h4 className="font-bold mb-2">Sistema</h4>
          <p className="text-sm">Afetam todos os usuários. Salvas em <code>HKLM\SYSTEM\...\Environment</code>. Requer admin.</p>
        </div>
      </div>

      <h2><Globe className="inline-block mr-2 mb-1 w-5 h-5" /> Criar Variáveis Persistentes com SETX</h2>
      <p>O <code>SETX</code> cria variáveis de ambiente que persistem após fechar o CMD.</p>

      <CodeBlock language="batch" title="SETX — criar variáveis persistentes" code={`:: Criar variável para o usuário atual
setx MINHA_VAR "valor aqui\"

:: Criar variável de sistema (requer admin)
setx MINHA_VAR "valor aqui\" /M

:: Criar com valor de outra variável
setx JAVA_HOME "%ProgramFiles%\\Java\\jdk-17\"

:: Listar variáveis persistentes (via registro)
reg query HKCU\\Environment
reg query "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment\"

:: ATENÇÃO: SETX não atualiza a sessão atual!
:: Após SETX, abra um novo CMD para ver a variável`} />

      <AlertBox type="warning" title="SETX vs SET">
        <strong>SET</strong> cria variáveis apenas na sessão atual (temporárias). <strong>SETX</strong> salva no Registro e a variável persiste entre sessões — mas NÃO está disponível na sessão atual onde foi criada. Abra um novo CMD para usá-la.
      </AlertBox>

      <h2><Code className="inline-block mr-2 mb-1 w-5 h-5" /> Gerenciar o PATH</h2>
      <CodeBlock language="batch" title="Ver e modificar o PATH" code={`:: Ver PATH atual
echo %PATH%

:: Ver PATH de forma legível (uma entrada por linha)
echo %PATH:;=&echo.%

:: Ver PATH do sistema via PowerShell
powershell -Command "[Environment]::GetEnvironmentVariable('PATH', 'Machine') -split ';'\"

:: Adicionar ao PATH do usuário permanentemente
setx PATH "%PATH%;C:\\MeuPrograma\bin\"

:: Adicionar ao PATH do SISTEMA (requer admin)
setx PATH "%PATH%;C:\\MeuPrograma\bin\" /M

:: Método mais seguro (não duplica):
powershell -Command "^
    $old = [Environment]::GetEnvironmentVariable('PATH', 'User'); ^
    $new = 'C:\\MeuPrograma\bin'; ^
    if ($old -notlike "*$new*") { ^
        [Environment]::SetEnvironmentVariable('PATH', "$old;$new", 'User') ^
    }"`} />

      <h3>Variáveis de Ambiente Padrão do Windows</h3>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-border">
          <thead><tr className="bg-muted">
            <th className="border border-border p-2 text-left">Variável</th>
            <th className="border border-border p-2 text-left">Valor Típico</th>
            <th className="border border-border p-2 text-left">Uso</th>
          </tr></thead>
          <tbody>
            {[
              ["%USERPROFILE%","C:\Users\Joao","Pasta do usuário atual"],
              ["%APPDATA%","C:\Users\Joao\AppData\Roaming","Dados de aplicações"],
              ["%LOCALAPPDATA%","C:\Users\Joao\AppData\Local","Dados locais de apps"],
              ["%TEMP% / %TMP%","C:\Users\Joao\AppData\Local\Temp","Arquivos temporários"],
              ["%SYSTEMROOT%","C:\Windows","Pasta do Windows"],
              ["%PROGRAMFILES%","C:\Program Files","Programas 64-bit"],
              ["%PROGRAMFILES(x86)%","C:\Program Files (x86)","Programas 32-bit"],
              ["%COMPUTERNAME%","MEUPC","Nome do computador"],
              ["%USERNAME%","joaosilva","Nome do usuário logado"],
              ["%USERDOMAIN%","EMPRESA","Domínio ou workgroup"],
              ["%OS%","Windows_NT","Sistema operacional"],
              ["%PROCESSOR_ARCHITECTURE%","AMD64","Arquitetura da CPU"],
              ["%NUMBER_OF_PROCESSORS%","8","Núm. de processadores lógicos"],
            ].map(([v, val, uso]) => (
              <tr key={v}>
                <td className="border border-border p-2 font-mono text-primary text-sm">{v}</td>
                <td className="border border-border p-2 text-sm text-muted-foreground">{val}</td>
                <td className="border border-border p-2 text-sm">{uso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2><Layers className="inline-block mr-2 mb-1 w-5 h-5" /> Gerenciar via Interface Gráfica</h2>
      <CodeBlock language="batch" title="Abrir painel de variáveis de ambiente" code={`:: Abrir Properties do Sistema
sysdm.cpl

:: Depois: Avançado → Variáveis de Ambiente

:: Ou direto via PowerShell GUI
powershell -Command "rundll32 sysdm.cpl,EditEnvironmentVariables\"`} />

      <AlertBox type="success" title="Dica: Recarregar PATH sem reiniciar CMD">
        Após usar SETX, você pode recarregar o PATH na sessão atual sem abrir novo CMD:
        <CodeBlock language="batch" title="Recarregar PATH da sessão" code={`:: Ler PATH do registro e aplicar
for /f "tokens=2*\" %%a in ('reg query HKCU\\Environment /v PATH 2^>nul') do set USERPATH=%%b
for /f "tokens=2*\" %%a in ('reg query \"HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment\" /v PATH 2^>nul') do set SYSPATH=%%b
set PATH=%SYSPATH%;%USERPATH%`} />
      </AlertBox>
    </PageContainer>
  );
}