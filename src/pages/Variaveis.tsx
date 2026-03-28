import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Variable, Settings, Shield, Clock, Hash, Cpu, Calendar, Terminal } from "lucide-react";

export default function Variaveis() {
  return (
    <PageContainer 
      title="Variáveis de Ambiente no CMD" 
      subtitle="Domine o uso de variáveis para automação e configuração do sistema" 
      difficulty="intermediario" 
      timeToRead="20 min"
    >
      <section>
        <h2>O que são Variáveis de Ambiente?</h2>
        <p>
          Variáveis de ambiente são pares de nome e valor que o sistema operacional e outros programas utilizam para armazenar informações de configuração. No CMD, elas são fundamentais para scripts batch, permitindo que você armazene dados temporários, caminhos de arquivos, preferências do usuário e muito mais.
        </p>
        <p>
          Elas funcionam como "atalhos" ou "caixas" onde você guarda uma informação para usar depois. Para acessar o valor de uma variável no CMD, envolvemos seu nome com o caractere de porcentagem: <code>%NOME_DA_VARIAVEL%</code>.
        </p>
      </section>

      <section>
        <h2>Gerenciando Variáveis com o Comando SET</h2>
        <p>
          O comando <code>SET</code> é a ferramenta principal para manipular variáveis na sessão atual do Prompt de Comando.
        </p>

        <h3>1. Ver variáveis</h3>
        <p>Para listar todas as variáveis da sessão atual:</p>
        <CodeBlock code={`SET`} language="batch" title="Listar todas as variáveis" />
        <p>Para ver variáveis que começam com uma letra específica (ex: P):</p>
        <CodeBlock code={`SET P`} language="batch" title="Listar variáveis que começam com P" />

        <h3>2. Criar ou modificar uma variável</h3>
        <p>A sintaxe é simples: <code>SET nome=valor</code>. Note que não deve haver espaços ao redor do sinal de igual, a menos que você queira que o espaço faça parte do nome ou do valor.</p>
        <CodeBlock code={`SET MEU_PROJETO=C:\\Projetos\\App1\necho %MEU_PROJETO%`} language="batch" title="Definir e usar variável" />

        <h3>3. Deletar uma variável</h3>
        <p>Para remover uma variável, basta atribuir um valor vazio a ela:</p>
        <CodeBlock code={`SET MEU_PROJETO=\nSET MEU_PROJETO`} language="batch" title="Remover variável" />
        
        <AlertBox type="warning" title="Atenção aos Espaços">
          No comando <code>SET NOME = VALOR</code> (com espaços), o CMD criará uma variável chamada "NOME " (com um espaço no fim) cont eúdo " VALOR" (com um espaço no início). Sempre use <code>SET NOME=VALOR</code> sem espaços desnecessários.
        </AlertBox>
      </section>

      <section>
        <h2>Variáveis Permanentes com SETX</h2>
        <p>
          Diferente do <code>SET</code>, que dura apenas enquanto a janela do CMD estiver aberta, o <code>SETX</code> cria variáveis que persistem após o fechamento do console e reinicializações.
        </p>
        <CodeBlock code={`SETX MINHA_VAR "Valor Permanente"`} language="batch" title="Criar variável de usuário permanente" />
        
        <p>Para criar uma variável a nível de sistema (requer privilégios de Administrador):</p>
        <CodeBlock code={`SETX /M SISTEMA_VAR "Valor Global"`} language="batch" title="Variável de sistema" />

        <AlertBox type="info" title="Dica de Uso">
          O <code>SETX</code> não altera a variável na sessão *atual* do CMD. Você precisará abrir um novo Prompt para ver a alteração.
        </AlertBox>
      </section>

      <section>
        <h2>Variáveis Pré-definidas (Sistema)</h2>
        <p>O Windows já vem com diversas variáveis úteis configuradas. Aqui estão as mais comuns:</p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-2 text-left">Variável</th>
                <th className="border border-border p-2 text-left">Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-border p-2"><code>%PATH%</code></td><td className="border border-border p-2">Lista de diretórios onde o Windows procura executáveis.</td></tr>
              <tr><td className="border border-border p-2"><code>%USERNAME%</code></td><td className="border border-border p-2">Nome do usuário logado no momento.</td></tr>
              <tr><td className="border border-border p-2"><code>%COMPUTERNAME%</code></td><td className="border border-border p-2">Nome da máquina na rede.</td></tr>
              <tr><td className="border border-border p-2"><code>%USERPROFILE%</code></td><td className="border border-border p-2">Caminho da pasta do perfil do usuário (C:\Users\Nome).</td></tr>
              <tr><td className="border border-border p-2"><code>%APPDATA%</code></td><td className="border border-border p-2">Caminho para dados de aplicativos do usuário.</td></tr>
              <tr><td className="border border-border p-2"><code>%TEMP%</code></td><td className="border border-border p-2">Diretório de arquivos temporários.</td></tr>
              <tr><td className="border border-border p-2"><code>%WINDIR%</code></td><td className="border border-border p-2">Local da instalação do Windows.</td></tr>
              <tr><td className="border border-border p-2"><code>%OS%</code></td><td className="border border-border p-2">Nome do sistema operacional.</td></tr>
            </tbody>
          </table>
        </div>

        <h3>Variáveis Dinâmicas</h3>
        <p>Algumas variáveis mudam seu valor "sozinhas" dependendo do contexto:</p>
        <ul>
          <li><code>%DATE%</code>: Data atual.</li>
          <li><code>%TIME%</code>: Hora atual.</li>
          <li><code>%CD%</code>: Diretório atual (Current Directory).</li>
          <li><code>%RANDOM%</code>: Um número aleatório entre 0 e 32767.</li>
          <li><code>%ERRORLEVEL%</code>: O código de erro retornado pelo último comando executado.</li>
        </ul>
      </section>

      <section>
        <h2>Argumentos de Script (%0 a %9)</h2>
        <p>Em scripts <code>.bat</code> ou <code>.cmd</code>, você pode acessar os argumentos passados na chamada do script:</p>
        <ul>
          <li><code>%0</code>: O nome do próprio script.</li>
          <li><code>%1</code> a <code>%9</code>: O primeiro ao nono argumento.</li>
          <li><code>%*</code>: Todos os argumentos passados.</li>
        </ul>
        <CodeBlock code={`@echo off\necho Script sendo executado: %0\necho Primeiro argumento: %1\necho Segundo argumento: %2`} language="batch" title="exemplo.bat" />
      </section>

      <section>
        <h2>Escopo com SETLOCAL e ENDLOCAL</h2>
        <p>
          Para evitar que as variáveis criadas em um script "vazarem" para o ambiente do usuário após o fim da execução, usamos o escopo local.
        </p>
        <CodeBlock code={`@echo off\nSETLOCAL\nSET VAR_INTERNA=Segredo\necho Dentro do local: %VAR_INTERNA%\nENDLOCAL\necho Fora do local: %VAR_INTERNA%`} language="batch" title="Uso de SETLOCAL" />
      </section>

      <section>
        <h2>Expansão Adiada (Delayed Expansion)</h2>
        <p>
          No CMD, as variáveis dentro de blocos de comando (como parênteses em <code>IF</code> ou <code>FOR</code>) são expandidas no momento em que o bloco é lido, não quando é executado. Isso pode causar problemas em loops.
        </p>
        <CodeBlock code={`@echo off\nset count=0\nfor /L %%i in (1,1,5) do (\n  set /a count+=1\n  echo Contagem: %count%\n)\nREM Isso vai imprimir "0" cinco vezes!`} language="batch" title="O problema da expansão comum" />
        
        <p>Para resolver isso, usamos <code>EnableDelayedExpansion</code> e a sintaxe de exclamação <code>!var!</code>:</p>
        <CodeBlock code={`@echo off\nsetlocal enabledelayedexpansion\nset count=0\nfor /L %%i in (1,1,5) do (\n  set /a count+=1\n  echo Contagem: !count!\n)\nREM Agora funciona corretamente.`} language="batch" title="Solução com Expansão Adiada" />
      </section>

      <section>
        <h2>Manipulação de Strings e Substrings</h2>
        <p>O CMD permite manipular o valor das variáveis de forma nativa.</p>
        
        <h3>Substituição de Texto</h3>
        <p>Sintaxe: <code>%var:original=novo%</code></p>
        <CodeBlock code={`SET TEXTO=Banana e Maca\necho %TEXTO:Maca=Uva%`} language="batch" title="Substituir string" />

        <h3>Substrings (Recortes)</h3>
        <p>Sintaxe: <code>%var:~inicio,tamanho%</code></p>
        <ul>
          <li><code>%var:~0,5%</code>: Os primeiros 5 caracteres.</li>
          <li><code>%var:~-3%</code>: Os últimos 3 caracteres.</li>
          <li><code>%var:~3%</code>: Tudo a partir do quarto caractere.</li>
        </ul>
        <CodeBlock code={`SET DATA=%DATE%\nSET ANO=%DATA:~-4%\necho O ano atual e %ANO%`} language="batch" title="Extrair o ano da data" />
      </section>

      <section>
        <h2>Dicas e Armadilhas</h2>
        <AlertBox type="danger" title="Variáveis com Espaços no Caminho">
          Sempre use aspas ao lidar com variáveis que podem conter espaços, como caminhos de arquivos.
          <code>cd "%USERPROFILE%\Desktop"</code> é seguro, enquanto <code>cd %USERPROFILE%\Desktop</code> falhará se o nome do usuário tiver espaços.
        </AlertBox>
        <p>
          Outro ponto importante é o <code>ERRORLEVEL</code>. Muitos programadores iniciantes tentam comparar o erro usando <code>IF %ERRORLEVEL%==0</code>, mas a forma mais robusta é <code>IF NOT ERRORLEVEL 1</code> (que significa "se o erro não for maior ou igual a 1").
        </p>
      </section>
    </PageContainer>
  );
}
