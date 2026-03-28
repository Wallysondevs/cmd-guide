import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Calendar, Clock, Play, Trash2, Search, Edit, StopCircle, AlertTriangle } from "lucide-react";

export default function Agendamento() {
  return (
    <PageContainer
      title="Agendamento de Tarefas com SCHTASKS"
      subtitle="Domine a automação de execuções periódicas no Windows via linha de comando"
      difficulty="intermediario"
      timeToRead="20 min"
    >
      <section>
        <p>
          O agendamento de tarefas é um dos pilares da administração de sistemas Windows. Enquanto muitos usuários utilizam a interface gráfica (Task Scheduler), o comando <code>SCHTASKS</code> oferece um poder de automação muito superior, permitindo criar, modificar e gerenciar tarefas complexas através de scripts ou remotamente.
        </p>
      </section>

      <section>
        <h2><Calendar className="inline-block mr-2 mb-1" /> O Comando SCHTASKS</h2>
        <p>
          O <code>SCHTASKS</code> substituiu o antigo comando <code>AT</code> (que ainda existe por compatibilidade, mas é limitado). Ele permite que um administrador agende programas ou scripts para serem executados em horários específicos ou após eventos determinados.
        </p>

        <h3>Operações Principais</h3>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Parâmetro</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>/CREATE</code></td>
                <td>Cria uma nova tarefa agendada.</td>
              </tr>
              <tr>
                <td><code>/DELETE</code></td>
                <td>Exclui uma ou mais tarefas agendadas.</td>
              </tr>
              <tr>
                <td><code>/QUERY</code></td>
                <td>Exibe todas as tarefas agendadas no sistema.</td>
              </tr>
              <tr>
                <td><code>/CHANGE</code></td>
                <td>Altera as propriedades de uma tarefa existente.</td>
              </tr>
              <tr>
                <td><code>/RUN</code></td>
                <td>Inicia uma tarefa agendada imediatamente.</td>
              </tr>
              <tr>
                <td><code>/END</code></td>
                <td>Interrompe um programa em execução iniciado por uma tarefa.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2><Edit className="inline-block mr-2 mb-1" /> Criando Tarefas (/CREATE)</h2>
        <p>
          A criação de tarefas é a parte mais complexa devido à enorme quantidade de opções de agendamento.
        </p>
        
        <h3>Argumentos Essenciais:</h3>
        <ul>
          <li><code>/TN "nome"</code>: Nome da tarefa (Task Name).</li>
          <li><code>/TR "caminho"</code>: Caminho do executável ou script (Task Run).</li>
          <li><code>/SC tipo</code>: Agenda (Schedule). Valores: MINUTE, HOURLY, DAILY, WEEKLY, MONTHLY, ONCE, ONSTART, ONLOGON, ONIDLE.</li>
        </ul>

        <h3>Exemplo: Tarefa Diária de Backup</h3>
        <p>Criar uma tarefa que executa um script de backup todos os dias às 03:00 da manhã.</p>
        <CodeBlock 
          code={`schtasks /create /tn "BackupDiario" /tr "C:\\Scripts\\backup.bat" /sc daily /st 03:00 /f`} 
          language="batch" 
          title="Backup Diário" 
        />
        <AlertBox type="info" title="O parâmetro /F">
          O uso de <code>/F</code> (Force) força a criação da tarefa mesmo que já exista uma com o mesmo nome, sobrescrevendo-a.
        </AlertBox>

        <h3>Modificadores e Frequência (/MO)</h3>
        <p>O parâmetro <code>/MO</code> permite refinar a frequência:</p>
        <ul>
          <li>A cada 20 minutos: <code>/sc minute /mo 20</code></li>
          <li>A cada 2 dias: <code>/sc daily /mo 2</code></li>
          <li>A cada 3 semanas: <code>/sc weekly /mo 3</code></li>
        </ul>

        <CodeBlock 
          code={`schtasks /create /tn "LimpezaTemporarios" /tr "del /q /s %temp%\\*" /sc hourly /mo 2`} 
          language="batch" 
          title="Limpeza a cada 2 horas" 
        />
      </section>

      <section>
        <h2><Search className="inline-block mr-2 mb-1" /> Consultando Tarefas (/QUERY)</h2>
        <p>
          Para listar as tarefas existentes e verificar seu status (se rodaram com sucesso ou quando será a próxima execução):
        </p>
        <CodeBlock 
          code={`schtasks /query /fo TABLE /v`} 
          language="batch" 
          title="Listar tarefas detalhadamente" 
        />
        <p>Formatos de saída (<code>/FO</code>): <code>TABLE</code>, <code>LIST</code> ou <code>CSV</code>.</p>
      </section>

      <section>
        <h2><Play className="inline-block mr-2 mb-1" /> Execução Manual e Remoção</h2>
        <p>
          Às vezes você precisa rodar a tarefa agora, sem esperar o horário agendado:
        </p>
        <CodeBlock 
          code={`schtasks /run /tn "BackupDiario"`} 
          language="batch" 
          title="Executar agora" 
        />

        <p>Para remover uma tarefa que não é mais necessária:</p>
        <CodeBlock 
          code={`schtasks /delete /tn "AntigaTarefa" /f`} 
          language="batch" 
          title="Excluir tarefa" 
        />
      </section>

      <section>
        <h2><AlertTriangle className="inline-block mr-2 mb-1" /> Permissões e Segurança</h2>
        <p>
          Muitas tarefas falham porque o script precisa de privilégios de administrador ou porque o usuário não está logado.
        </p>
        <ul>
          <li><code>/RU "usuario"</code>: Define o usuário que executará a tarefa.</li>
          <li><code>/RP "senha"</code>: Define a senha (se omitido e não for SYSTEM, o prompt pedirá).</li>
          <li><code>/RL HIGHEST</code>: Executa com privilégios administrativos (Run Level Highest).</li>
        </ul>

        <CodeBlock 
          code={`schtasks /create /tn "AdminUpdate" /tr "update.bat" /sc daily /st 12:00 /rl highest /ru SYSTEM`} 
          language="batch" 
          title="Executar como SYSTEM com privilégios máximos" 
        />
      </section>

      <section>
        <h2>Dicas e Erros Comuns</h2>
        <AlertBox type="warning" title="Caminhos com espaços">
          Sempre use aspas duplas se o caminho do script ou o nome da tarefa contiver espaços. Ex: <code>/tr "\\"C:\\Meus Scripts\\run.bat\\""</code>. Note as barras invertidas para escapar as aspas internas se necessário.
        </AlertBox>
        
        <p>
          O <strong>ERRORLEVEL</strong> após a execução de um comando <code>SCHTASKS</code> indica se a operação de agendamento (e não a execução do script em si) foi bem-sucedida.
        </p>
        <ul>
          <li><code>0</code>: Sucesso.</li>
          <li><code>1</code>: Falha (permissão negada, tarefa não encontrada, sintaxe incorreta).</li>
        </ul>
      </section>

      <section>
        <h2>Exemplos Práticos Reais</h2>
        
        <h3>1. Monitoramento a cada 5 minutos</h3>
        <CodeBlock 
          code={`schtasks /create /tn "MonitorServico" /tr "C:\\scripts\\check_service.bat" /sc minute /mo 5`} 
          language="batch"
        />

        <h3>2. Execução Única em data futura</h3>
        <CodeBlock 
          code={`schtasks /create /tn "Migracao" /tr "C:\\scripts\\migrate.bat" /sc once /sd 31/12/2024 /st 23:59`} 
          language="batch"
        />

        <h3>3. Ao fazer Logon</h3>
        <CodeBlock 
          code={`schtasks /create /tn "MapDrives" /tr "C:\\scripts\\map.bat" /sc onlogon`} 
          language="batch"
        />
      </section>
    </PageContainer>
  );
}
