import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Server, Cpu, HardDrive, Network } from "lucide-react";

export default function Hyper() {
  return (
    <PageContainer
      title="Hyper-V pelo CMD"
      subtitle="Crie e gerencie máquinas virtuais com o Hyper-V do Windows diretamente pelo Prompt de Comando."
      difficulty="avancado"
      timeToRead="30 min"
    >
      <h2><Server className="inline-block mr-2 mb-1 w-5 h-5" /> Ativar o Hyper-V</h2>
      <p>O Hyper-V é o hypervisor nativo do Windows (disponível no Pro, Enterprise e Education). Máquinas virtuais de alto desempenho sem software adicional.</p>

      <AlertBox type="info" title="Requisitos">
        Windows 10/11 Pro ou Enterprise. CPU com suporte a virtualização (Intel VT-x ou AMD-V) habilitado na BIOS/UEFI.
      </AlertBox>

      <CodeBlock language="batch" title="Instalar e verificar Hyper-V" code={`:: Ativar Hyper-V (requer reinicialização)
DISM /Online /Enable-Feature /All /FeatureName:Microsoft-Hyper-V

:: Verificar se virtualização está ativa na CPU
systeminfo | findstr "Hyper-V\"
:: Deve mostrar: Hyper-V Requirements: A hypervisor has been detected

:: Ativar via PowerShell (alternativa)
powershell -Command "Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All\"`} />

      <h2><Cpu className="inline-block mr-2 mb-1 w-5 h-5" /> Gerenciar VMs com PowerShell/Hyper-V</h2>
      <p>O Hyper-V é gerenciado principalmente via PowerShell. Veja os comandos essenciais:</p>

      <CodeBlock language="batch" title="Criar e configurar VMs" code={`:: Abrir gerenciador Hyper-V (GUI)
virtmgmt.msc

:: Via PowerShell: criar VM
powershell -Command "New-VM -Name 'MinhaVM' -MemoryStartupBytes 2GB -SwitchName 'Default Switch' -NewVHDPath 'D:\\VMs\\MinhaVM.vhdx' -NewVHDSizeBytes 50GB\"

:: Iniciar VM
powershell -Command "Start-VM -Name 'MinhaVM'\"

:: Parar VM
powershell -Command "Stop-VM -Name 'MinhaVM'\"

:: Parar forçado (como apertar o botão de força)
powershell -Command "Stop-VM -Name 'MinhaVM' -Force\"

:: Suspender VM
powershell -Command "Suspend-VM -Name 'MinhaVM'\"

:: Listar VMs
powershell -Command "Get-VM | Format-Table Name, State, CPUUsage, MemoryAssigned\"

:: Ver detalhes de uma VM
powershell -Command "Get-VM -Name 'MinhaVM' | Format-List *\"`} />

      <h2><HardDrive className="inline-block mr-2 mb-1 w-5 h-5" /> Snapshots e Checkpoints</h2>
      <CodeBlock language="batch" title="Criar e gerenciar snapshots de VMs" code={`:: Criar checkpoint (snapshot)
powershell -Command "Checkpoint-VM -Name 'MinhaVM' -SnapshotName 'Antes da Atualizacao'\"

:: Listar checkpoints
powershell -Command "Get-VMCheckpoint -VMName 'MinhaVM'\"

:: Restaurar checkpoint
powershell -Command "Restore-VMCheckpoint -VMName 'MinhaVM' -Name 'Antes da Atualizacao'\"

:: Excluir checkpoint
powershell -Command "Remove-VMCheckpoint -VMName 'MinhaVM' -Name 'Antes da Atualizacao'\"

:: Exportar VM completa (backup)
powershell -Command "Export-VM -Name 'MinhaVM' -Path 'D:\\Backup\\VMs'\"`} />

      <h2><Network className="inline-block mr-2 mb-1 w-5 h-5" /> Redes Virtuais</h2>
      <CodeBlock language="batch" title="Configurar switches de rede virtuais" code={`:: Listar switches virtuais
powershell -Command "Get-VMSwitch\"

:: Criar switch externo (acessa a rede física)
powershell -Command "New-VMSwitch -Name 'Switch Externo' -NetAdapterName 'Ethernet' -AllowManagementOS $true\"

:: Criar switch interno (apenas entre VMs e host)
powershell -Command "New-VMSwitch -Name 'Switch Interno' -SwitchType Internal\"

:: Criar switch privado (apenas entre VMs)
powershell -Command "New-VMSwitch -Name 'Switch Privado' -SwitchType Private\"

:: Conectar VM a um switch
powershell -Command "Connect-VMNetworkAdapter -VMName 'MinhaVM' -SwitchName 'Switch Externo'\"`} />

      <h3>Script Completo: Criar VM do Zero</h3>
      <CodeBlock language="batch" title="criar-vm.bat — Provisionar nova VM" code={`@echo off
echo Criando nova VM no Hyper-V...

set VM_NOME=Servidor-Teste
set VM_RAM=2GB
set VM_DISCO=D:\\VMs\\%VM_NOME%.vhdx
set VM_DISCO_SIZE=50GB
set VM_ISO=D:\\ISOs\\ubuntu-22.04.iso

powershell -Command "^
    New-VM -Name '%VM_NOME%' ^
           -MemoryStartupBytes 2GB ^
           -SwitchName 'Default Switch' ^
           -NewVHDPath '%VM_DISCO%' ^
           -NewVHDSizeBytes %VM_DISCO_SIZE% ^
           -Generation 2; ^
    Set-VMProcessor -VMName '%VM_NOME%' -Count 2; ^
    Add-VMDvdDrive -VMName '%VM_NOME%' -Path '%VM_ISO%'; ^
    Start-VM -Name '%VM_NOME%'; ^
    Write-Host 'VM criada e iniciada!'"

echo.
echo VM %VM_NOME% criada com sucesso!
pause`} />

      <AlertBox type="success" title="Hyper-V vs VirtualBox vs VMware">
        O Hyper-V é a melhor opção se você usa Windows Pro/Enterprise: zero custo adicional, integração nativa, melhor desempenho com o host Windows. VirtualBox é melhor para compatibilidade multiplataforma. VMware Workstation é mais robusto para uso profissional.
      </AlertBox>
    </PageContainer>
  );
}