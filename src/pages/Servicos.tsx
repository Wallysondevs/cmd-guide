import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Server, Settings, Power, PlayCircle, StopCircle, RotateCcw, ShieldAlert } from "lucide-react";

export default function Servicos() {
  return (
    <PageContainer 
      title="Gerenciamento de Serviços" 
      subtitle="Controle processos de segundo plano e serviços do sistema Windows via CMD." 
      difficulty="avancado" 
      timeToRead="22 min"
    >
      <section>
        <p>
          Serviços são programas que rodam em segundo plano, geralmente iniciando junto com o Windows e sem interface com o usuário. O gerenciamento desses serviços é uma tarefa crítica para administradores. No CMD, temos duas ferramentas principais: o comando clássico <code>NET</code> e o poderoso <code>SC</code> (Service Control).
        </p>
      </section>

      <section>
        <h2>1. Ferramenta SC (Service Control)</h2>
        <p>
          O <code>SC</code> é a ferramenta mais completa. Ele permite não apenas iniciar e parar, mas também configurar, criar e excluir serviços.
        </p>
        
        <h3>Consultando Serviços</h3>
        <CodeBlock 
          code={`:: Listar todos os serviços ativos
sc query

:: Listar todos os serviços (incluindo os parados)
sc query state= all

:: Procurar um serviço específico pelo nome
sc query "wuauserv"`} 
          language="batch" 
          title="Consultas com SC" 
        />
        <AlertBox type="info" title="Espaçamento após o sinal de igual">
          Uma peculiaridade do comando <code>SC</code>: deve haver <strong>exatamente um espaço</strong> após o sinal de igual (ex: <code>state= all</code>), senão o comando falhará.
        </AlertBox>

        <h3>Controlando o Estado</h3>
        <CodeBlock 
          code={`:: Iniciar um serviço
sc start "nome_do_servico"

:: Parar um serviço
sc stop "nome_do_servico"`} 
          language="batch" 
        />

        <h3>Configuração e Manutenção</h3>
        <CodeBlock 
          code={`:: Alterar tipo de inicialização (auto, demand, disabled)
sc config "nome_do_servico" start= auto

:: Ver configurações de erro/falha
sc qfailure "nome_do_servico"`} 
          language="batch" 
          title="Configurações avançadas" 
        />
      </section>

      <section>
        <h2>2. Comando NET START/STOP</h2>
        <p>
          O comando <code>NET</code> é mais simples e amigável, aceitando tanto o nome real quanto o "Nome de Exibição" do serviço.
        </p>
        <CodeBlock 
          code={`:: Iniciar o Windows Update
net start "Windows Update"

:: Parar o serviço de Spooler de Impressão
net stop "Spooler de Impressao"`} 
          language="batch" 
          title="Uso simplificado do NET" 
        />
        <p>
          A principal vantagem do <code>NET</code> é que ele aguarda a conclusão da operação antes de retornar ao prompt, enquanto o <code>SC</code> apenas envia o comando e retorna imediatamente.
        </p>
      </section>

      <section>
        <h2>3. Criando e Removendo Serviços</h2>
        <p>
          Você pode transformar qualquer executável em um serviço (embora ele precise ser compatível com a API de serviços do Windows ou usar um wrapper).
        </p>
        <CodeBlock 
          code={`:: Criar um serviço
sc create "MeuServico" binPath= "C:\\Apps\\meu_app.exe" start= auto

:: Deletar um serviço (Cuidado!)
sc delete "MeuServico"`} 
          language="batch" 
          title="Criação e remoção" 
        />
        <AlertBox type="danger" title="Atenção">
          Deletar serviços do sistema pode inutilizar o Windows. Certifique-se de estar operando apenas em serviços de terceiros ou criados por você.
        </AlertBox>
      </section>

      <section>
        <h2>4. Consultas com WMIC</h2>
        <p>
          O WMI permite filtrar serviços por propriedades mais específicas.
        </p>
        <CodeBlock 
          code={`:: Listar serviços que iniciam automaticamente mas estão parados
wmic service where "startmode='Auto' and state<>'Running'" get name,displayname

:: Iniciar um serviço via WMI
wmic service where name='wuauserv' call StartService`} 
          language="batch" 
          title="WMI para monitoramento" 
        />
      </section>

      <section>
        <h2>5. Exemplo Prático: Reinicialização Automática</h2>
        <p>Um script útil para monitorar um serviço que costuma travar e reiniciá-lo se necessário.</p>
        <CodeBlock 
          code={`@echo off
set "SERVICE_NAME=Spooler"

sc query "%SERVICE_NAME%" | find "RUNNING" > nul
if %ERRORLEVEL% NEQ 0 (
    echo [%DATE% %TIME%] Servico %SERVICE_NAME% parado. Reiniciando...
    net start "%SERVICE_NAME%"
) else (
    echo [%DATE% %TIME%] Servico %SERVICE_NAME% operacional.
)`} 
          language="batch" 
          title="Script de Monitoramento" 
        />
      </section>

      <section>
        <h2>6. Comparativo de Comandos</h2>
        <table className="min-w-full border-collapse border border-border my-4">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border p-2">Funcionalidade</th>
              <th className="border border-border p-2">NET</th>
              <th className="border border-border p-2">SC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-2">Iniciar/Parar</td>
              <td className="border border-border p-2">Sim</td>
              <td className="border border-border p-2">Sim</td>
            </tr>
            <tr>
              <td className="border border-border p-2">Mudar Tipo de Início</td>
              <td className="border border-border p-2">Não</td>
              <td className="border border-border p-2">Sim (sc config)</td>
            </tr>
            <tr>
              <td className="border border-border p-2">Criar/Deletar</td>
              <td className="border border-border p-2">Não</td>
              <td className="border border-border p-2">Sim</td>
            </tr>
            <tr>
              <td className="border border-border p-2">Síncrono/Assíncrono</td>
              <td className="border border-border p-2">Síncrono (aguarda)</td>
              <td className="border border-border p-2">Assíncrono (imediato)</td>
            </tr>
          </tbody>
        </table>
      </section>
    </PageContainer>
  );
}
