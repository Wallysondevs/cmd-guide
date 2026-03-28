import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { FunctionSquare, Terminal, Variable, ArrowRight, Save, Info, AlertTriangle } from "lucide-react";

export default function Funcoes() {
  return (
    <PageContainer 
      title="Funções e Sub-rotinas em Batch" 
      subtitle="Domine a modularização de scripts para criar códigos reutilizáveis e organizados." 
      difficulty="intermediario" 
      timeToRead="20 min"
    >
      <section>
        <p>
          Diferente de linguagens de programação modernas, o Batch não possui "funções" no sentido estrito da palavra. No entanto, ele oferece um mecanismo poderoso chamado <strong>Sub-rotinas</strong>. Através do comando <code>CALL</code> e do uso de rótulos (labels), podemos simular o comportamento de funções, permitindo a reutilização de código e a criação de scripts muito mais complexos e legíveis.
        </p>
      </section>

      <section>
        <h2>1. Definindo e Chamando Sub-rotinas</h2>
        <p>
          Uma sub-rotina é definida por um rótulo (uma linha que começa com dois pontos, como <code>:minha_funcao</code>) e termina com o comando <code>EXIT /B</code> ou <code>GOTO :EOF</code>.
        </p>
        <CodeBlock 
          code={`@echo off
echo Iniciando o script principal.
call :MinhaSubrotina
echo De volta ao script principal.
pause
exit /b

:MinhaSubrotina
echo --- Dentro da sub-rotina ---
exit /b`} 
          language="batch" 
          title="Exemplo básico de CALL" 
        />
        <AlertBox type="info" title="O comando EXIT /B">
          O parâmetro <code>/B</code> é crucial. Ele diz ao interpretador para sair apenas da sub-rotina atual (ou do script atual) e retornar ao chamador. Se você usar apenas <code>exit</code>, o prompt de comando fechará completamente.
        </AlertBox>
      </section>

      <section>
        <h2>2. Passagem de Parâmetros</h2>
        <p>
          Você pode passar argumentos para uma sub-rotina da mesma forma que passa para um script. Dentro da sub-rotina, esses valores são acessados através de <code>%1</code>, <code>%2</code>, <code>%*</code>, etc.
        </p>
        <CodeBlock 
          code={`@echo off
call :Saudar "João" "Bom dia"
call :Saudar "Maria" "Boa tarde"
exit /b

:Saudar
echo Ola %~1, %~2!
exit /b`} 
          language="batch" 
          title="Sub-rotina com parâmetros" 
        />
        <p>
          O modificador <code>%~1</code> remove as aspas duplas do argumento, o que é uma boa prática para evitar erros de sintaxe ao concatenar strings.
        </p>
      </section>

      <section>
        <h2>3. Escopo de Variáveis (SETLOCAL)</h2>
        <p>
          Por padrão, todas as variáveis no Batch são globais. Se você alterar uma variável dentro de uma sub-rotina, ela permanecerá alterada no script principal. Para evitar isso, utilizamos <code>SETLOCAL</code> e <code>ENDLOCAL</code>.
        </p>
        <CodeBlock 
          code={`@echo off
set "MINHA_VAR=Original"
echo Antes: %MINHA_VAR%
call :AlterarVar
echo Depois: %MINHA_VAR%
exit /b

:AlterarVar
setlocal
set "MINHA_VAR=Alterada Localmente"
echo Dentro: %MINHA_VAR%
endlocal
exit /b`} 
          language="batch" 
          title="Uso de SETLOCAL para variáveis locais" 
        />
      </section>

      <section>
        <h2>4. Retornando Valores</h2>
        <p>
          Como não existe um comando <code>return valor</code>, existem duas formas comuns de retornar dados:
        </p>
        <ul>
          <li><strong>Variáveis Globais:</strong> A sub-rotina define uma variável que o script principal lê.</li>
          <li><strong>Expansão Retardada com ENDLOCAL:</strong> Uma técnica avançada para "vazar" uma variável específica para fora do escopo local.</li>
        </ul>
        <CodeBlock 
          code={`:Somar
setlocal
set /a "resultado=%~1 + %~2"
(
  endlocal
  set "%~3=%resultado%"
)
exit /b`} 
          language="batch" 
          title="Retornando valor por referência simulada" 
        />
        <p>
          No exemplo acima, o terceiro parâmetro é o <em>nome</em> da variável onde o resultado deve ser armazenado.
        </p>
      </section>

      <section>
        <h2>5. Chamando Scripts Externos</h2>
        <p>
          O comando <code>CALL</code> também serve para executar outros arquivos <code>.bat</code> ou <code>.cmd</code>. Sem o <code>CALL</code>, o script atual seria encerrado e o controle passaria permanentemente para o novo script.
        </p>
        <CodeBlock 
          code={`:: No script principal.bat
call outro_script.bat arg1 arg2
echo O outro script terminou.`} 
          language="batch" 
          title="Executando scripts externos" 
        />
      </section>

      <section>
        <h2>6. Exemplos Práticos</h2>
        <h3>Função de Log com Data e Hora</h3>
        <CodeBlock 
          code={`:Log
echo [%DATE% %TIME%] %~1 >> script.log
exit /b`} 
          language="batch" 
          title="Sub-rotina de Logging" 
        />

        <h3>Verificação de Arquivo</h3>
        <CodeBlock 
          code={`:CheckFile
if exist "%~1" (
    echo Arquivo %~1 encontrado.
    set "FILE_EXISTS=1"
) else (
    echo ERRO: Arquivo %~1 nao encontrado!
    set "FILE_EXISTS=0"
)
exit /b`} 
          language="batch" 
          title="Validando existência de arquivo" 
        />
      </section>

      <section>
        <h2>7. Diferenças Importantes</h2>
        <table className="min-w-full border-collapse border border-border my-4">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border p-2">Recurso</th>
              <th className="border border-border p-2">CALL :label</th>
              <th className="border border-border p-2">CALL script.bat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-2">Localização</td>
              <td className="border border-border p-2">Mesmo arquivo</td>
              <td className="border border-border p-2">Arquivo separado</td>
            </tr>
            <tr>
              <td className="border border-border p-2">Velocidade</td>
              <td className="border border-border p-2">Mais rápido (memória)</td>
              <td className="border border-border p-2">Mais lento (I/O de disco)</td>
            </tr>
            <tr>
              <td className="border border-border p-2">Compartilhamento</td>
              <td className="border border-border p-2">Fácil (mesmo contexto)</td>
              <td className="border border-border p-2">Variáveis são passadas/herdadas</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>8. Dicas e Armadilhas</h2>
        <AlertBox type="danger" title="O GOTO :EOF">
          Sempre coloque um <code>exit /b</code> ou <code>goto :EOF</code> antes das suas definições de funções no final do arquivo. Caso contrário, o interpretador "cairá" dentro da primeira função ao terminar a execução do bloco principal.
        </AlertBox>
        <p>
          <strong>Recursão:</strong> O Batch suporta recursão (uma função chamando a si mesma), mas há um limite de profundidade na pilha de chamadas do Windows. Use com cautela para evitar o travamento do interpretador.
        </p>
      </section>
    </PageContainer>
  );
}
