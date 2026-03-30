import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Network, Share2, HardDrive, Users } from "lucide-react";

export default function CompartilhamentoRede() {
  return (
    <PageContainer
      title="Compartilhamento de Rede"
      subtitle="Configure pastas compartilhadas, mapeie drives de rede e gerencie conexões UNC com NET SHARE e NET USE."
      difficulty="intermediario"
      timeToRead="28 min"
    >
      <h2><Share2 className="inline-block mr-2 mb-1 w-5 h-5" /> NET SHARE — Compartilhar Pastas</h2>
      <p>O comando <code>NET SHARE</code> cria, modifica e remove compartilhamentos de rede diretamente pelo CMD.</p>

      <CodeBlock language="batch" title="Criar e gerenciar compartilhamentos" code={`:: Listar todos os compartilhamentos ativos
net share

:: Compartilhar uma pasta
net share MeusDados=C:\\Users\\Publico /GRANT:"Todos",READ

:: Compartilhar com permissão de leitura e escrita
net share Projetos=D:\\Projetos /GRANT:"Administradores",FULL /GRANT:"Usuarios",CHANGE

:: Definir limite de conexões simultâneas
net share Relatorios=D:\\Relatorios /USERS:10

:: Remover compartilhamento
net share MeusDados /DELETE`} />

      <h3>Compartilhamentos Administrativos (C$, D$, IPC$)</h3>
      <CodeBlock language="batch" title="Shares administrativos padrão" code={`:: Listar shares incluindo os ocultos (com $)
net share

:: Ver compartilhamento específico
net share C$

:: Criar share oculto (termina com $)
net share SecretaBackup$=D:\\Backup`} />

      <AlertBox type="info" title="Dica: Shares Ocultos">
        Pastas compartilhadas que terminam com <code>$</code> ficam ocultas na navegação de rede, mas ainda são acessíveis via caminho UNC direto: <code>\\servidor\SecretaBackup$</code>
      </AlertBox>

      <h2><HardDrive className="inline-block mr-2 mb-1 w-5 h-5" /> NET USE — Mapear Drives de Rede</h2>
      <p>O <code>NET USE</code> conecta e desconecta recursos de rede, como mapear um servidor como letra de unidade.</p>

      <CodeBlock language="batch" title="Mapear e desconectar drives de rede" code={`:: Mapear pasta de rede como drive Z:
net use Z: \\servidor\\Projetos

:: Mapear com credenciais
net use Z: \\servidor\\Projetos /user:dominio\\joao senha123

:: Mapear de forma persistente (reconectar no login)
net use Z: \\servidor\\Projetos /persistent:yes

:: Ver conexões ativas
net use

:: Desconectar um drive mapeado
net use Z: /delete

:: Desconectar todos
net use * /delete /y`} />

      <h3>Caminho UNC — Acesso Direto</h3>
      <CodeBlock language="batch" title="Trabalhar com caminhos UNC" code={`:: Acessar pasta sem mapear drive
dir \\servidor\\Projetos

:: Copiar arquivo via UNC
copy C:\\Relatorio.pdf \\servidor\\Compartilhado\

:: Rodar executável de rede
\\servidor\\Apps\\programa.exe

:: Acessar com credenciais via NET USE temporário
net use \\servidor\\Backup /user:admin senha
dir \\servidor\\Backup`} />

      <h2><Users className="inline-block mr-2 mb-1 w-5 h-5" /> Permissões de Compartilhamento com ICACLS</h2>
      <CodeBlock language="batch" title="Combinar NET SHARE com permissões NTFS" code={`:: Criar pasta e definir permissões NTFS
mkdir D:\\Compartilhado
icacls D:\\Compartilhado /grant "Todos\":(OI)(CI)M
icacls D:\\Compartilhado /grant "Administradores\":(OI)(CI)F

:: Depois compartilhar
net share Compartilhado=D:\\Compartilhado /GRANT:"Todos",FULL`} />

      <h2><Network className="inline-block mr-2 mb-1 w-5 h-5" /> NET VIEW e Descoberta de Rede</h2>
      <CodeBlock language="batch" title="Descobrir computadores e recursos na rede" code={`:: Listar computadores no domínio/workgroup
net view

:: Ver compartilhamentos de um computador específico
net view \\servidor

:: Ver domínios disponíveis
net view /domain

:: Ver recursos de um domínio específico
net view /domain:MEU_DOMINIO`} />

      <h3>Script de Mapeamento Automático</h3>
      <CodeBlock language="batch" title="login-rede.bat — Mapear drives no login" code={`@echo off
:: Script de login - mapear drives de acordo com o grupo do usuario

:: Desconectar mapeamentos anteriores
net use * /delete /y 2>nul

:: Mapear drive compartilhado para todos
net use H: \\fileserver\\home\\%USERNAME% /persistent:yes

:: Mapear drive de departamento
net use T: \\fileserver\\TI /persistent:yes

:: Verificar se mapeamento funcionou
if errorlevel 1 (
    echo AVISO: Falha ao mapear drive de rede.
    echo Verifique se voce esta na rede corporativa.
)

echo Drives de rede configurados com sucesso!
timeout /t 3 /nobreak >nul`} />

      <AlertBox type="success" title="Dica: SUBST para Simular Drives">
        O comando <code>SUBST</code> cria um drive virtual apontando para uma pasta local — útil para simular um drive de rede durante desenvolvimento:
        <CodeBlock language="batch" title="Criar drive virtual local" code={`subst Z: C:\\Users\\Joao\\Documentos\\Projetos
:: Para remover:
subst Z: /D`} />
      </AlertBox>
    </PageContainer>
  );
}