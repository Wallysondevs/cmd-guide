import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Copy, Clock, Shield, RotateCcw } from "lucide-react";

export default function Robocopy() {
  return (
    <PageContainer
      title="ROBOCOPY — Cópia Avançada de Arquivos"
      subtitle="Domine o Robust File Copy para backups, sincronização e migração de dados com controle total sobre cada detalhe."
      difficulty="intermediario"
      timeToRead="30 min"
    >
      <h2><Copy className="inline-block mr-2 mb-1 w-5 h-5" /> O que é o ROBOCOPY?</h2>
      <p>O <code>ROBOCOPY</code> (Robust File Copy) é uma ferramenta nativa do Windows projetada para copiar arquivos e diretórios de forma confiável, com suporte a retentativas, espelhos e logs detalhados. Ele substitui o <code>XCOPY</code> em praticamente todos os cenários.</p>

      <h3>Sintaxe Básica</h3>
      <CodeBlock language="batch" title="Estrutura do comando ROBOCOPY" code={`robocopy ORIGEM DESTINO [ARQUIVOS] [OPÇÕES]

:: Exemplo simples: copiar pasta
robocopy C:\\Documentos D:\\Backup\\Documentos

:: Copiar apenas arquivos .pdf
robocopy C:\\Docs D:\\Backup *.pdf

:: Copiar com subpastas
robocopy C:\\Projeto D:\\Backup /E`} />

      <h3>Flags de Cópia Essenciais</h3>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-border">
          <thead><tr className="bg-muted">
            <th className="border border-border p-2 text-left">Flag</th>
            <th className="border border-border p-2 text-left">Descrição</th>
          </tr></thead>
          <tbody>
            {[
              ["/E","Copia subpastas, incluindo as vazias"],
              ["/S","Copia subpastas, excluindo as vazias"],
              ["/MIR","Espelha: copia e deleta o que não existe na origem"],
              ["/MOV","Move arquivos (exclui da origem após copiar)"],
              ["/MOVE","Move arquivos e pastas"],
              ["/COPYALL","Copia todos os atributos, incluindo segurança (DATS)"],
              ["/DCOPY:DA","Copia atributos e timestamps de pastas"],
              ["/NP","Sem barra de progresso (mais rápido em scripts)"],
              ["/LOG:arquivo","Grava log detalhado em arquivo"],
              ["/TEE","Mostra no console E grava no log"],
              ["/R:3","3 tentativas em caso de falha (padrão: 1M)"],
              ["/W:5","Aguarda 5 segundos entre tentativas"],
              ["/MT:8","Multithreading com 8 threads (mais rápido)"],
            ].map(([flag, desc]) => (
              <tr key={flag}>
                <td className="border border-border p-2 font-mono text-primary">{flag}</td>
                <td className="border border-border p-2 text-sm">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2><Clock className="inline-block mr-2 mb-1 w-5 h-5" /> Casos de Uso Práticos</h2>

      <h3>1. Backup Incremental</h3>
      <CodeBlock language="batch" title="Copiar apenas arquivos modificados" code={`:: /XO exclui arquivos mais antigos que o destino (incremental)
robocopy C:\\Trabalho D:\\Backup\\Trabalho /E /XO /MT:8

:: Com log e 3 retentativas
robocopy C:\\Trabalho D:\\Backup /E /XO /MT:8 /R:3 /W:5 /LOG+:C:\\Logs\backup.log /TEE`} />

      <h3>2. Espelho Exato (Mirror)</h3>
      <CodeBlock language="batch" title="Manter cópia idêntica à origem" code={`:: /MIR = /E + deleta arquivos extras no destino
robocopy C:\\Site D:\\Backup\\Site /MIR /MT:16 /LOG:C:\\Logs\\mirror.log

:: ATENÇÃO: /MIR deleta do destino o que não existe na origem!`} />

      <h3>3. Migração com Permissões</h3>
      <CodeBlock language="batch" title="Migrar servidor preservando ACLs" code={`:: Copiar tudo incluindo permissões NTFS
robocopy \\servidor-antigo\\Dados D:\\Dados /E /COPYALL /MT:8 /R:3 /W:10 /LOG:C:\\Logs\\migracao.log /TEE`} />

      <h3>4. Sincronização de Pastas</h3>
      <CodeBlock language="batch" title="Sincronizar duas pastas" code={`:: Sincronizar pasta local com servidor
robocopy C:\\Projetos \\servidor\\Projetos /E /XO /MIR /MT:8 /DCOPY:DA`} />

      <h2><Shield className="inline-block mr-2 mb-1 w-5 h-5" /> Exclusões e Filtros</h2>
      <CodeBlock language="batch" title="Controlar o que copiar ou excluir" code={`:: Excluir extensões específicas
robocopy C:\\Docs D:\\Backup /E /XF *.tmp *.log *.bak

:: Excluir pastas
robocopy C:\\Projeto D:\\Backup /E /XD node_modules .git __pycache__

:: Excluir arquivos ocultos e do sistema
robocopy C:\\Windows D:\\Backup /E /XA:HS

:: Copiar somente arquivos novos (criados nos últimos 7 dias)
robocopy C:\\Downloads D:\\Backup /MAXAGE:7 /E`} />

      <h2><RotateCcw className="inline-block mr-2 mb-1 w-5 h-5" /> Códigos de Retorno do ROBOCOPY</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
        {[
          {code:"0","desc":"Nenhum arquivo copiado (tudo igual)","color":"text-green-400"},
          {code:"1","desc":"Arquivos copiados com sucesso","color":"text-green-400"},
          {code:"2","desc":"Arquivos extras no destino","color":"text-blue-400"},
          {code:"4","desc":"Arquivos incompatíveis","color":"text-yellow-400"},
          {code:"8","desc":"Falha ao copiar alguns arquivos","color":"text-red-400"},
          {code:"16","desc":"Erro fatal","color":"text-red-600"},
        ].map(({code, desc, color}) => (
          <div key={code} className="flex items-center gap-3 p-3 border border-border rounded">
            <span className={`font-mono font-bold text-xl ${color}`}>{code}</span>
            <span className="text-sm">{desc}</span>
          </div>
        ))}
      </div>

      <CodeBlock language="batch" title="backup-diario.bat — Script completo" code={`@echo off
setlocal
set ORIGEM=C:\\Dados
set DESTINO=D:\\Backup
set DATA=%date:~6,4%-%date:~3,2%-%date:~0,2%
set LOG=C:\\Logs\backup-%DATA%.log

echo Iniciando backup em %date% %time% > %LOG%

robocopy "%ORIGEM%\" \"%DESTINO%\\%DATA%\" /E /XO /MT:8 /R:3 /W:5 /NP /LOG+:%LOG%

if errorlevel 8 (
    echo ERRO: Backup falhou! Verifique %LOG%
) else (
    echo Backup concluido com sucesso!
)

:: Manter apenas os últimos 30 backups
forfiles /p "%DESTINO%\" /d -30 /c \"cmd /c rmdir /s /q @path\" 2>nul
endlocal`} />

      <AlertBox type="success" title="ROBOCOPY vs XCOPY">
        Prefira sempre o ROBOCOPY: ele suporta arquivos abertos (VSS), retentativas automáticas, multithreading, preserva permissões NTFS e gera logs detalhados. O XCOPY não tem nenhum desses recursos.
      </AlertBox>
    </PageContainer>
  );
}