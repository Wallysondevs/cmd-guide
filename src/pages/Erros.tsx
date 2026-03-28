import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { AlertOctagon, CheckCircle2, Terminal, Info, RefreshCw, LogOut } from "lucide-react";

export default function Erros() {
  return (
    <PageContainer 
      title="Tratamento de Erros com ERRORLEVEL" 
      subtitle="Aprenda a criar scripts resilientes que sabem lidar com falhas de execução." 
      difficulty="intermediario" 
      timeToRead="25 min"
    >
      <section>
        <p>
          Em automação, saber se um comando funcionou ou falhou é fundamental. O Windows utiliza uma variável especial chamada <code>ERRORLEVEL</code> para armazenar o código de saída do último comando executado. Por convenção, o valor <code>0</code> significa sucesso, enquanto qualquer valor entre <code>1</code> e <code>255</code> indica algum tipo de erro ou condição especial.
        </p>
      </section>

      <section>
        <h2>1. Entendendo o %ERRORLEVEL%</h2>
        <p>
          Quase todos os comandos internos do CMD e programas externos (.exe) definem o <code>ERRORLEVEL</code> ao terminar.
        </p>
        <CodeBlock 
          code={`dir C:\\arquivo_que_nao_existe.txt
echo O código de erro foi: %ERRORLEVEL%`} 
          language="batch" 
          title="Verificando o erro básico" 
        />
        <AlertBox type="info" title="Convenção de Códigos">
          Embora varie de programa para programa, a regra geral é:
          <ul className="mt-2 list-disc list-inside">
            <li><strong>0</strong>: Sucesso total</li>
            <li><strong>1</strong>: Erro genérico ou arquivo não encontrado</li>
            <li><strong>2</strong>: Erro de sintaxe ou parâmetros inválidos</li>
            <li><strong>5</strong>: Acesso negado</li>
          </ul>
        </AlertBox>
      </section>

      <section>
        <h2>2. Formas de Verificar Erros</h2>
        <p>Existem três formas principais de testar o nível de erro:</p>
        
        <h3>A. A Sintaxe Clássica: IF ERRORLEVEL n</h3>
        <p>
          Esta forma é um pouco contra-intuitiva: ela testa se o erro é <strong>maior ou igual</strong> a <code>n</code>.
        </p>
        <CodeBlock 
          code={`if errorlevel 1 echo Ocorreu um erro (nivel 1 ou superior)`} 
          language="batch" 
        />

        <h3>B. A Sintaxe Moderna: IF %ERRORLEVEL% EQU n</h3>
        <p>
          Esta é a forma mais precisa, permitindo testar igualdade exata usando operadores como <code>EQU</code>, <code>NEQ</code>, <code>GTR</code>, etc.
        </p>
        <CodeBlock 
          code={`if %ERRORLEVEL% NEQ 0 (
    echo Erro critico detectado!
    exit /b %ERRORLEVEL%
)`} 
          language="batch" 
        />

        <h3>C. Operadores de Encadeamento (&& e ||)</h3>
        <p>
          Uma forma elegante e curta de tratar erros em linha única:
        </p>
        <ul>
          <li><code>&&</code> executa o próximo comando <strong>apenas se o anterior teve sucesso (0)</strong>.</li>
          <li><code>||</code> executa o próximo comando <strong>apenas se o anterior falhou (não-0)</strong>.</li>
        </ul>
        <CodeBlock 
          code={`mkdir backup && echo Pasta criada com sucesso!
copy dados.txt backup\\ || echo Falha ao copiar arquivos.`} 
          language="batch" 
          title="Operadores lógicos de execução" 
        />
      </section>

      <section>
        <h2>3. Forçando Erros para Testes</h2>
        <p>
          Você pode usar o comando <code>EXIT /B n</code> para terminar uma sub-rotina ou script com um código de erro específico, ou <code>SET /A ERRORLEVEL=n</code> para simular durante o desenvolvimento.
        </p>
        <CodeBlock 
          code={`@echo off
setlocal
:: Simula um erro de acesso negado
exit /b 5`} 
          language="batch" 
          title="Saindo com código customizado" 
        />
      </section>

      <section>
        <h2>4. Redirecionamento de Erros (STDERR)</h2>
        <p>
          Por padrão, mensagens de erro são enviadas para a saída de erro padrão (stream 2). Você pode capturá-las separadamente.
        </p>
        <CodeBlock 
          code={`:: Redireciona apenas erros para erro.log
comando_problematico.exe 2> erro.log

:: Redireciona tudo (sucesso e erro) para o mesmo arquivo
meu_script.bat > log_geral.txt 2>&1`} 
          language="batch" 
          title="Gerenciamento de Logs" 
        />
      </section>

      <section>
        <h2>5. Exemplo de Script Robusto</h2>
        <p>Abaixo, um exemplo de um script de backup que verifica pré-requisitos e trata falhas em cada etapa.</p>
        <CodeBlock 
          code={`@echo off
set "SOURCE=C:\\Dados"
set "DEST=D:\\Backup"

echo Verificando pasta de origem...
if not exist "%SOURCE%" (
    echo [ERRO] Pasta de origem nao encontrada.
    exit /b 1
)

echo Iniciando copia...
robocopy "%SOURCE%" "%DEST%" /E /R:3 /W:5
if %ERRORLEVEL% GTR 8 (
    echo [ERRO] Falha grave no Robocopy. Codigo: %ERRORLEVEL%
    goto :FAIL
)

echo Backup concluido com sucesso!
exit /b 0

:FAIL
echo Enviando alerta de falha...
:: Comandos para enviar email ou logar em servidor
exit /b %ERRORLEVEL%`} 
          language="batch" 
          title="Estrutura de script resiliente" 
        />
      </section>

      <section>
        <h2>6. Padrão "Retry Loop" (Tentativas Automáticas)</h2>
        <p>Útil para operações de rede ou arquivos que podem estar bloqueados temporariamente.</p>
        <CodeBlock 
          code={`set /a "retries=0"

:RETRY_ZONE
set /a "retries+=1"
echo Tentativa %retries%...
meu_comando_instavel.exe
if %ERRORLEVEL% EQU 0 goto :SUCCESS

if %retries% LSS 3 (
    timeout /t 5
    goto :RETRY_ZONE
)

echo [ERRO] Falha apos 3 tentativas.
exit /b 1

:SUCCESS
echo Operacao concluida!`} 
          language="batch" 
          title="Lógica de re-tentativa" 
        />
      </section>

      <section>
        <h2>7. Resumo de Comparações</h2>
        <table className="min-w-full border-collapse border border-border my-4">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border p-2">Sintaxe</th>
              <th className="border border-border p-2">Comportamento</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-2"><code>if errorlevel 1</code></td>
              <td className="border border-border p-2">Verdadeiro se erro for 1 ou maior</td>
            </tr>
            <tr>
              <td className="border border-border p-2"><code>if not errorlevel 1</code></td>
              <td className="border border-border p-2">Verdadeiro se erro for 0 (sucesso)</td>
            </tr>
            <tr>
              <td className="border border-border p-2"><code>if %ERRORLEVEL% EQU 0</code></td>
              <td className="border border-border p-2">Verdadeiro apenas se erro for exatamente 0</td>
            </tr>
            <tr>
              <td className="border border-border p-2"><code>if %ERRORLEVEL% NEQ 0</code></td>
              <td className="border border-border p-2">Verdadeiro se houver QUALQUER erro</td>
            </tr>
          </tbody>
        </table>
      </section>
    </PageContainer>
  );
}
