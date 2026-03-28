import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Activity, XCircle, Play, List, Cpu, Search, Clock } from "lucide-react";

export default function Processos() {
  return (
    <PageContainer 
      title="Gerenciamento de Processos" 
      subtitle="Monitore, inicie e encerre aplicativos diretamente pela linha de comando." 
      difficulty="iniciante" 
      timeToRead="18 min"
    >
      <section>
        <p>
          O gerenciamento de processos no CMD é essencial para administradores de sistemas e desenvolvedores. Através de comandos como <code>TASKLIST</code> e <code>TASKKILL</code>, você tem o poder do Gerenciador de Tarefas do Windows em modo texto, permitindo automações que seriam impossíveis via interface gráfica.
        </p>
      </section>

      <section>
        <h2>1. Listando Processos com TASKLIST</h2>
        <p>
          O comando <code>TASKLIST</code> exibe todos os processos em execução no momento.
        </p>
        <CodeBlock 
          code={`tasklist`} 
          language="batch" 
          title="Lista básica" 
        />
        
        <h3>Filtros Avançados (/FI)</h3>
        <p>Você pode filtrar os resultados para encontrar exatamente o que procura:</p>
        <CodeBlock 
          code={`:: Listar processos que usam mais de 100MB de RAM
tasklist /FI "MEMUSAGE gt 100000"

:: Listar apenas o processo do Chrome
tasklist /FI "IMAGENAME eq chrome.exe"

:: Listar processos de um usuário específico
tasklist /FI "USERNAME eq NOME_DO_USUARIO"`} 
          language="batch" 
          title="Uso de filtros" 
        />

        <h3>Formatos de Saída (/FO)</h3>
        <p>Útil para processar dados em outros scripts ou Excel:</p>
        <CodeBlock 
          code={`:: Saída em formato CSV
tasklist /FO CSV /NH > processos.csv`} 
          language="batch" 
        />
      </section>

      <section>
        <h2>2. Encerrando Processos com TASKKILL</h2>
        <p>
          O comando <code>TASKKILL</code> é usado para fechar programas. Ele pode enviar um sinal de fechamento suave ou forçar o encerramento.
        </p>
        <CodeBlock 
          code={`:: Fechar o bloco de notas suavemente
taskkill /IM notepad.exe

:: Forçar o fechamento do Chrome (e todos os seus processos filhos)
taskkill /F /IM chrome.exe /T

:: Encerrar pelo ID do processo (PID)
taskkill /PID 1234 /F`} 
          language="batch" 
          title="Finalizando processos" 
        />
        <AlertBox type="warning" title="Cuidado com o flag /F">
          O uso de <code>/F</code> (forçar) não dá chance ao aplicativo de salvar dados pendentes. Use apenas quando o programa estiver travado.
        </AlertBox>
      </section>

      <section>
        <h2>3. Iniciando Programas com START</h2>
        <p>
          O comando <code>START</code> inicia um programa ou script em uma nova janela.
        </p>
        <CodeBlock 
          code={`:: Abrir o navegador em segundo plano
start /B chrome.exe "https://google.com"

:: Iniciar um script e aguardar ele terminar antes de continuar
start /WAIT backup.bat

:: Iniciar com prioridade alta
start /ABOVENORMAL notepad.exe`} 
          language="batch" 
          title="Iniciando aplicativos" 
        />
        <AlertBox type="info" title="Dica de Aspas">
          Ao usar o <code>START</code> com caminhos que contêm espaços, o primeiro conjunto de aspas é interpretado como o título da janela. Sempre use: <code>start "" "C:\\Caminho Com Espaco\\app.exe"</code>.
        </AlertBox>
      </section>

      <section>
        <h2>4. Consultas com WMIC PROCESS</h2>
        <p>
          Para informações técnicas detalhadas, o <code>WMIC</code> (Windows Management Instrumentation) é imbatível.
        </p>
        <CodeBlock 
          code={`:: Obter o caminho executável de um processo
wmic process where "name='explorer.exe'" get ExecutablePath

:: Obter PID e uso de CPU
wmic process get Caption,ProcessId,KernelModeTime`} 
          language="batch" 
          title="Consultas WMI" 
        />
      </section>

      <section>
        <h2>5. Temporizadores e Espera</h2>
        <p>
          Muitas vezes precisamos esperar que um processo termine ou dar um intervalo entre execuções.
        </p>
        <CodeBlock 
          code={`:: Aguardar 10 segundos (interrompível por tecla)
timeout /t 10

:: Aguardar 5 segundos (sem aceitar teclas)
timeout /t 5 /nobreak

:: O truque clássico do PING (se o timeout não estiver disponível)
ping -n 6 127.0.0.1 > nul`} 
          language="batch" 
          title="Comandos de pausa" 
        />
      </section>

      <section>
        <h2>6. Referência de Filtros TASKLIST</h2>
        <table className="min-w-full border-collapse border border-border my-4">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border p-2">Filtro</th>
              <th className="border border-border p-2">Descrição</th>
              <th className="border border-border p-2">Operadores</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-2"><code>IMAGENAME</code></td>
              <td className="border border-border p-2">Nome do executável</td>
              <td className="border border-border p-2">eq, ne</td>
            </tr>
            <tr>
              <td className="border border-border p-2"><code>PID</code></td>
              <td className="border border-border p-2">Process ID</td>
              <td className="border border-border p-2">eq, ne, gt, lt...</td>
            </tr>
            <tr>
              <td className="border border-border p-2"><code>MEMUSAGE</code></td>
              <td className="border border-border p-2">Uso de memória (KB)</td>
              <td className="border border-border p-2">gt, lt, ge, le</td>
            </tr>
            <tr>
              <td className="border border-border p-2"><code>STATUS</code></td>
              <td className="border border-border p-2">Running | Not Responding</td>
              <td className="border border-border p-2">eq, ne</td>
            </tr>
          </tbody>
        </table>
      </section>
    </PageContainer>
  );
}
