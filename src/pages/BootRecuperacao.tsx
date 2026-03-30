import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Power, Settings, AlertTriangle, RefreshCcw } from "lucide-react";

export default function BootRecuperacao() {
  return (
    <PageContainer
      title="Boot e Recuperação do Sistema"
      subtitle="Configure entradas de boot com BCDEDIT, use ferramentas de recuperação e diagnostique problemas de inicialização."
      difficulty="avancado"
      timeToRead="30 min"
    >
      <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> BCDEDIT — Configuração de Boot</h2>
      <p>O <code>BCDEDIT</code> (Boot Configuration Data Edit) controla o gerenciador de boot do Windows. Com ele você pode adicionar entradas, modificar tempos de espera e configurar a recuperação.</p>

      <AlertBox type="danger" title="Risco Alto — Faça Backup Antes">
        Modificar o BCD incorretamente pode impedir o Windows de iniciar. Sempre exporte um backup antes:
        <CodeBlock language="batch" title="Backup do BCD" code={`bcdedit /export C:\bcd-backup.bcd`} />
      </AlertBox>

      <h3>Visualizar Configurações de Boot</h3>
      <CodeBlock language="batch" title="Listar entradas de boot" code={`:: Ver todas as entradas
bcdedit /enum all

:: Ver apenas a entrada ativa
bcdedit

:: Ver entradas de boot (simples)
bcdedit /enum osloader`} />

      <h3>Configurar Tempo de Seleção</h3>
      <CodeBlock language="batch" title="Alterar tempo de exibição do menu de boot" code={`:: Definir tempo em segundos (5 segundos)
bcdedit /timeout 5

:: Exibir menu sempre (tempo infinito)
bcdedit /timeout -1`} />

      <h3>Adicionar e Remover Entradas</h3>
      <CodeBlock language="batch" title="Duplicar entrada de boot atual" code={`:: Copiar entrada atual
bcdedit /copy {current} /d "Windows 11 (Modo Seguro)\"

:: O comando retorna um GUID, ex: {12345678-...}
:: Modificar a entrada para modo seguro
bcdedit /set {GUID} safeboot minimal

:: Remover uma entrada
bcdedit /delete {GUID}`} />

      <h3>Configurar Depuração e Modo Seguro</h3>
      <CodeBlock language="batch" title="Habilitar modos especiais de boot" code={`:: Habilitar modo de depuração global
bcdedit /debug on

:: Forçar boot em modo seguro com rede na PRÓXIMA reinicialização
bcdedit /set {current} safeboot network

:: Remover modo seguro forçado
bcdedit /deletevalue {current} safeboot

:: Habilitar log de boot
bcdedit /set {current} bootlog yes`} />

      <h2><Power className="inline-block mr-2 mb-1 w-5 h-5" /> BOOTREC — Reparar o Registro de Boot</h2>
      <p>O <code>BOOTREC</code> é executado pelo ambiente de recuperação do Windows (WinRE) para reparar problemas graves de boot.</p>

      <CodeBlock language="batch" title="Sequência de reparo de boot (executar no WinRE)" code={`:: Reescrever o MBR (Master Boot Record)
bootrec /fixmbr

:: Reescrever o setor de boot
bootrec /fixboot

:: Procurar instalações Windows e adicionar ao BCD
bootrec /scanos

:: Reconstruir o BCD do zero
bootrec /rebuildbcd`} />

      <AlertBox type="info" title="Como Acessar o WinRE">
        Ligue o PC e force o desligamento 3 vezes durante o boot → O Windows entra automaticamente no WinRE. Ou: Configurações → Sistema → Recuperação → Reinicialização Avançada.
      </AlertBox>

      <h2><RefreshCcw className="inline-block mr-2 mb-1 w-5 h-5" /> REAGENTC — Configurar o WinRE</h2>
      <CodeBlock language="batch" title="Gerenciar ambiente de recuperação" code={`:: Ver status do WinRE
reagentc /info

:: Habilitar WinRE
reagentc /enable

:: Desabilitar WinRE (libera ~500MB)
reagentc /disable`} />

      <h2><AlertTriangle className="inline-block mr-2 mb-1 w-5 h-5" /> SHUTDOWN — Desligar e Reiniciar</h2>
      <CodeBlock language="batch" title="Opções avançadas de shutdown" code={`:: Reiniciar para modo de recuperação
shutdown /r /o /t 0

:: Desligar imediatamente (força fechar programas)
shutdown /s /f /t 0

:: Reiniciar após 60 segundos com mensagem
shutdown /r /t 60 /c "Reiniciando para manutencao\"

:: Cancelar shutdown agendado
shutdown /a

:: Reiniciar em modo de diagnóstico avançado
shutdown /r /o /t 0`} />

      <h3>MSCONFIG — Configuração de Inicialização</h3>
      <CodeBlock language="batch" title="Abrir MSCONFIG pelo CMD" code={`:: Abrir configuração de sistema
msconfig

:: Ou via execução direta
start msconfig.exe`} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 border border-border rounded-lg">
          <h4 className="font-bold mb-2">Aba Geral</h4>
          <p className="text-sm">Inicialização Normal, Diagnóstico ou Seletiva. Configure o que carrega no boot.</p>
        </div>
        <div className="p-4 border border-border rounded-lg">
          <h4 className="font-bold mb-2">Aba Boot</h4>
          <p className="text-sm">Configure opções avançadas: Modo Seguro, Sem GUI de boot, Log de boot.</p>
        </div>
        <div className="p-4 border border-border rounded-lg">
          <h4 className="font-bold mb-2">Aba Serviços</h4>
          <p className="text-sm">Ative/desative serviços de terceiros para diagnóstico.</p>
        </div>
        <div className="p-4 border border-border rounded-lg">
          <h4 className="font-bold mb-2">Aba Inicializar</h4>
          <p className="text-sm">Gerencia programas na inicialização (redireciona ao Gerenciador de Tarefas).</p>
        </div>
      </div>
    </PageContainer>
  );
}