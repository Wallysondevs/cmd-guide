import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Clipboard, MousePointer, Terminal, Zap } from "lucide-react";

export default function ClipboardCmd() {
  return (
    <PageContainer
      title="Clipboard, Automação de GUI e Utilitários"
      subtitle="Use a área de transferência, automatize cliques, abra programas e gerencie janelas diretamente pelo CMD."
      difficulty="iniciante"
      timeToRead="20 min"
    >
      <h2><Clipboard className="inline-block mr-2 mb-1 w-5 h-5" /> CLIP — Área de Transferência</h2>
      <p>O comando <code>CLIP</code> redireciona a saída de qualquer comando para a área de transferência do Windows.</p>

      <CodeBlock language="batch" title="Enviar texto para o clipboard" code={`:: Copiar resultado de comando para clipboard
dir /b | clip

:: Copiar conteúdo de arquivo para clipboard
type arquivo.txt | clip

:: Copiar output de ipconfig
ipconfig | clip

:: Copiar caminho atual
echo %CD% | clip

:: Copiar data atual
echo %date% | clip

:: Copiar IP da máquina
for /f "tokens=4\" %%a in ('route print ^| findstr \"0.0.0.0 0.0.0.0\"') do echo %%a | clip

:: Copiar lista de processos
tasklist /fo csv | clip`} />

      <h3>Ler da Área de Transferência</h3>
      <CodeBlock language="batch" title="Ler clipboard com PowerShell" code={`:: Ler o conteúdo da área de transferência
powershell -Command "Get-Clipboard\"

:: Salvar clipboard em arquivo
powershell -Command "Get-Clipboard | Out-File C:\\clipboard.txt\"

:: Copiar para clipboard via PowerShell
powershell -Command "Set-Clipboard 'Texto para copiar'\"

:: Copiar conteúdo de arquivo para clipboard
powershell -Command "Get-Content C:\\arquivo.txt | Set-Clipboard\"`} />

      <h2><Terminal className="inline-block mr-2 mb-1 w-5 h-5" /> START — Abrir Programas e Arquivos</h2>
      <CodeBlock language="batch" title="Usar START para abrir coisas" code={`:: Abrir programa
start notepad.exe

:: Abrir arquivo com programa padrão
start C:\\documento.pdf
start C:\\planilha.xlsx

:: Abrir URL no navegador padrão
start https://www.google.com

:: Abrir pasta no Explorer
start C:\\Users\\Joao\\Documentos
start explorer.exe .

:: Abrir CMD em nova janela
start cmd

:: Abrir em pasta específica com título
start "Minha Janela" cmd /k \"cd C:\\Projetos && dir\"

:: Abrir programa em segundo plano (sem janela)
start /B /MIN programa.exe

:: Abrir com prioridade específica
start /HIGH programa-pesado.exe
start /LOW programa-baixa-prioridade.exe`} />

      <h2><MousePointer className="inline-block mr-2 mb-1 w-5 h-5" /> RUNDLL32 — Acessar Funções do Windows</h2>
      <CodeBlock language="batch" title="Funções úteis via rundll32" code={`:: Bloquear a tela
rundll32.exe user32.dll,LockWorkStation

:: Desligar monitor
powershell -Command "(Add-Type -PassThru -MemberDefinition '[DllImport(\"user32.dll")] public static extern int SendMessage(IntPtr hWnd, UInt32 Msg, Int32 wParam, Int32 lParam);' -Name A -Namespace B).SendMessage([IntPtr]::new(-1), 0x0112, 0xF170, 2)"

:: Abrir caixa de diálogo de arquivo
rundll32.exe comdlg32.dll,OpenSaveDialog

:: Abrir configurações de acessibilidade
rundll32.exe shell32.dll,Control_RunDLL access.cpl

:: Abrir painel de controle de rede
rundll32.exe shell32.dll,Control_RunDLL ncpa.cpl

:: Abrir configurações de data/hora
rundll32.exe shell32.dll,Control_RunDLL timedate.cpl`} />

      <h2><Zap className="inline-block mr-2 mb-1 w-5 h-5" /> Atalhos de Produtividade CMD</h2>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-border">
          <thead><tr className="bg-muted">
            <th className="border border-border p-2 text-left">Atalho</th>
            <th className="border border-border p-2 text-left">Função</th>
          </tr></thead>
          <tbody>
            {[
              ["↑ / ↓","Navegar no histórico de comandos"],
              ["F7","Exibir histórico em lista gráfica"],
              ["F8","Auto-complete com base no histórico"],
              ["Tab","Auto-completar arquivos e pastas"],
              ["Ctrl+C","Cancelar comando em execução"],
              ["Ctrl+Z","Sinalizar fim de input (EOF)"],
              ["Ctrl+A","Selecionar todo o texto (no modo de edição)"],
              ["Ctrl+Backspace","Deletar palavra anterior"],
              ["Alt+F7","Limpar histórico de comandos"],
              ["Ctrl+F","Buscar no buffer do CMD"],
              ["Click direito","Colar da área de transferência"],
            ].map(([atalho, fn]) => (
              <tr key={atalho}>
                <td className="border border-border p-2 font-mono text-primary text-sm">{atalho}</td>
                <td className="border border-border p-2 text-sm">{fn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Configurar CMD pelo Registro</h3>
      <CodeBlock language="batch" title="Configurações persistentes do CMD" code={`:: Habilitar o QuickEdit Mode (selecionar texto com mouse)
reg add "HKCU\\Console\" /v QuickEdit /t REG_DWORD /d 1 /f

:: Aumentar tamanho do histórico
reg add "HKCU\\Console\" /v HistoryBufferSize /t REG_DWORD /d 200 /f

:: Número de históricos salvos
reg add "HKCU\\Console\" /v NumberOfHistoryBuffers /t REG_DWORD /d 10 /f

:: Habilitar VT100 (cores ANSI no CMD)
reg add "HKCU\\Console\" /v VirtualTerminalLevel /t REG_DWORD /d 1 /f`} />

      <AlertBox type="success" title="Windows Terminal — Experiência Moderna">
        O Windows Terminal (winget install Microsoft.WindowsTerminal) substitui o CMD com múltiplas abas, suporte a cores ANSI, fontes com ligaduras, temas personalizados e integração com PowerShell e WSL.
      </AlertBox>
    </PageContainer>
  );
}