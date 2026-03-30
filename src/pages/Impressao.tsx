import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Printer, FileText, Settings, List } from "lucide-react";

export default function Impressao() {
  return (
    <PageContainer
      title="Impressão pelo CMD"
      subtitle="Gerencie impressoras, filas de impressão, imprima arquivos e configure spoolers diretamente pelo Prompt de Comando."
      difficulty="intermediario"
      timeToRead="22 min"
    >
      <h2><Printer className="inline-block mr-2 mb-1 w-5 h-5" /> PRINT — Imprimir Arquivos</h2>
      <p>O comando <code>PRINT</code> envia arquivos de texto diretamente para uma impressora.</p>

      <CodeBlock language="batch" title="Imprimir arquivos pelo CMD" code={`:: Imprimir para impressora padrão
print arquivo.txt

:: Imprimir em impressora específica
print /D:"HP LaserJet" relatorio.txt

:: Imprimir em impressora de rede (por caminho UNC)
print /D:\\servidor\\impressora documento.txt

:: Imprimir múltiplos arquivos
for %%f in (C:\\Relatorios\\*.txt) do print /D:"Impressora1\" \"%%f\"`} />

      <AlertBox type="info" title="Limitação do PRINT">
        O comando PRINT nativo do CMD só suporta arquivos de texto simples. Para imprimir PDFs, imagens ou documentos formatados, use os métodos abaixo.
      </AlertBox>

      <h2><FileText className="inline-block mr-2 mb-1 w-5 h-5" /> Imprimir Documentos com START</h2>
      <CodeBlock language="batch" title="Abrir e imprimir com o aplicativo padrão" code={`:: Imprimir PDF com o leitor padrão (Adobe, Edge, etc.)
:: /p = imprimir direto sem abrir janela
start /min "\" \"C:\\Relatorios\relatorio.pdf\" /p

:: Imprimir Word document
start /min "\" \"C:\\Docs\\contrato.docx\" /p

:: Imprimir com programa específico
"C:\\Program Files\\Adobe\\Acrobat\\Acrobat.exe\" /p /h \"C:\\arquivo.pdf\"

:: Imprimir imagem
rundll32 shimgvw.dll ImageView_PrintTo "C:\foto.jpg\" \"NOME_DA_IMPRESSORA\"

:: PowerShell para imprimir PDF de forma mais confiável
powershell -Command "Start-Process 'C:\\arquivo.pdf' -Verb Print\"`} />

      <h2><List className="inline-block mr-2 mb-1 w-5 h-5" /> Gerenciar Fila de Impressão</h2>
      <CodeBlock language="batch" title="Listar e cancelar impressões" code={`:: Listar trabalhos na fila
net print \\servidor\\impressora

:: Pausar trabalho de impressão (número do job)
net print \\servidor\\impressora 42 /pause

:: Continuar trabalho pausado
net print \\servidor\\impressora 42 /resume

:: Cancelar trabalho de impressão
net print \\servidor\\impressora 42 /delete

:: Cancelar TODOS os trabalhos (limpeza total)
:: Via WMI (mais confiável)
powershell -Command "Get-WmiObject Win32_PrintJob | Remove-WmiObject\"

:: Reiniciar spooler (corrige muitos problemas de impressão)
net stop spooler
del /Q /F /S %SYSTEMROOT%\\System32\\spool\\PRINTERS\\*
net start spooler`} />

      <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> Gerenciar Impressoras</h2>
      <CodeBlock language="batch" title="Listar e configurar impressoras" code={`:: Listar impressoras instaladas
wmic printer get Name, Default, WorkOffline, Status

:: Ver impressora padrão
wmic printer where default=TRUE get Name

:: Definir impressora padrão
wmic printer where "Name='HP LaserJet'" call SetDefaultPrinter

:: Adicionar impressora de rede via PowerShell
powershell -Command "Add-Printer -ConnectionName '\\servidor\\HP-Financeiro'\"

:: Remover impressora
wmic printer where "Name='Impressora Antiga'" delete

:: Ver portas de impressão
wmic printerport get Name, PortNumber, Protocol`} />

      <h3>Script: Gerenciar Filas em Múltiplas Impressoras</h3>
      <CodeBlock language="batch" title="limpar-filas.bat — Limpar todas as filas" code={`@echo off
echo Limpando filas de impressao...

:: Parar spooler
net stop spooler >nul 2>&1
if errorlevel 1 (
    echo ERRO: Nao foi possivel parar o spooler
    echo Execute como Administrador
    pause
    exit /b 1
)

:: Limpar arquivos de spool
del /Q /F /S "%SYSTEMROOT%\\System32\\spool\\PRINTERS\\*\" 2>nul

:: Reiniciar spooler
net start spooler >nul 2>&1

echo Filas de impressao limpas com sucesso!
echo.

:: Listar impressoras e status
echo Impressoras disponíveis:
wmic printer get Name, Status /format:list
pause`} />

      <AlertBox type="success" title="Dica: PRINTBRM para Backup de Impressoras">
        O <code>PRINTBRM</code> permite exportar e importar configurações completas de impressoras (drivers, portas, filas):
        <CodeBlock language="batch" title="Backup e restauração de impressoras" code={`:: Exportar todas as impressoras
printbrm -b -f C:\\Backup\\impressoras.printerExport

:: Importar em outro servidor
printbrm -r -f C:\\Backup\\impressoras.printerExport`} />
      </AlertBox>
    </PageContainer>
  );
}