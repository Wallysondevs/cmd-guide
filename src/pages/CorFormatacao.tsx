import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Palette, Monitor, Type, Layers } from "lucide-react";

export default function CorFormatacao() {
  return (
    <PageContainer
      title="Cores, Formatação e Interface do CMD"
      subtitle="Personalize a aparência do CMD com cores, tamanho de janela, título e crie interfaces visuais com menus e barras de progresso."
      difficulty="iniciante"
      timeToRead="20 min"
    >
      <h2><Palette className="inline-block mr-2 mb-1 w-5 h-5" /> COLOR — Definir Cores do Terminal</h2>
      <p>O comando <code>COLOR</code> define as cores de fundo e primeiro plano do CMD. É definido por dois dígitos hexadecimais: fundo+texto.</p>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-2 my-6">
        {[
          {code:"0",name:"Preto",bg:"bg-black",text:"text-white"},
          {code:"1",name:"Azul",bg:"bg-blue-900",text:"text-white"},
          {code:"2",name:"Verde",bg:"bg-green-700",text:"text-white"},
          {code:"3",name:"Ciano",bg:"bg-cyan-600",text:"text-white"},
          {code:"4",name:"Vermelho",bg:"bg-red-700",text:"text-white"},
          {code:"5",name:"Magenta",bg:"bg-purple-700",text:"text-white"},
          {code:"6",name:"Amarelo",bg:"bg-yellow-600",text:"text-black"},
          {code:"7",name:"Branco",bg:"bg-gray-200",text:"text-black"},
          {code:"8",name:"Cinza",bg:"bg-gray-600",text:"text-white"},
          {code:"9",name:"Az.Claro",bg:"bg-blue-500",text:"text-white"},
          {code:"A",name:"Vd.Claro",bg:"bg-green-400",text:"text-black"},
          {code:"B",name:"Ci.Claro",bg:"bg-cyan-400",text:"text-black"},
          {code:"C",name:"Vm.Claro",bg:"bg-red-400",text:"text-black"},
          {code:"D",name:"Mg.Claro",bg:"bg-purple-400",text:"text-black"},
          {code:"E",name:"Am.Claro",bg:"bg-yellow-300",text:"text-black"},
          {code:"F",name:"Bc.Brilh",bg:"bg-white",text:"text-black"},
        ].map(c => (
          <div key={c.code} className={`p-2 rounded text-center text-xs font-mono ${c.bg} ${c.text}`}>
            <div className="font-bold">{c.code}</div>
            <div>{c.name}</div>
          </div>
        ))}
      </div>

      <CodeBlock language="batch" title="Usar o comando COLOR" code={`:: Fundo preto, texto verde (estilo Matrix)
color 0A

:: Fundo azul, texto branco (estilo DOS clássico)
color 1F

:: Fundo preto, texto amarelo (avisos)
color 0E

:: Fundo vermelho, texto branco (alertas)
color 4F

:: Restaurar padrão (preto e branco)
color`} />

      <h2><Monitor className="inline-block mr-2 mb-1 w-5 h-5" /> MODE — Tamanho da Janela</h2>
      <CodeBlock language="batch" title="Configurar tamanho e buffer do CMD" code={`:: Ver configuração atual
mode

:: Definir largura e altura da janela (colunas e linhas)
mode con: cols=120 lines=40

:: Definir apenas a largura
mode con: cols=80

:: Modo de 80x25 (clássico)
mode con: cols=80 lines=25`} />

      <h2><Type className="inline-block mr-2 mb-1 w-5 h-5" /> TITLE — Título da Janela</h2>
      <CodeBlock language="batch" title="Personalizar o título da janela CMD" code={`:: Definir título estático
title Meu Script de Backup v2.0

:: Título dinâmico com variáveis
title Backup em andamento - %date% %time%

:: Atualizar título durante execução
set PASSO=1
set TOTAL=5

:processar
title [%PASSO%/%TOTAL%] Processando arquivo %PASSO%...
:: processa algo...
set /a PASSO+=1
if %PASSO% leq %TOTAL% goto :processar

title Backup Concluido!`} />

      <h2><Layers className="inline-block mr-2 mb-1 w-5 h-5" /> Criar Menus Interativos</h2>
      <CodeBlock language="batch" title="Menu principal com CHOICE" code={`@echo off
:menu_principal
cls
color 0B
echo ============================================
echo     SISTEMA DE GERENCIAMENTO v1.0
echo ============================================
echo.
echo   [1] Fazer Backup
echo   [2] Restaurar Backup
echo   [3] Verificar Disco
echo   [4] Listar Usuarios
echo   [5] Configuracoes
echo   [0] Sair
echo.
echo ============================================

choice /c 1234560 /n /m "Escolha uma opcao: "

if errorlevel 7 goto :sair
if errorlevel 6 goto :sair
if errorlevel 5 goto :config
if errorlevel 4 goto :usuarios
if errorlevel 3 goto :disco
if errorlevel 2 goto :restaurar
if errorlevel 1 goto :backup
goto :menu_principal

:backup
cls
echo Iniciando backup...
timeout /t 2 /nobreak >nul
goto :menu_principal

:sair
color
cls
echo Ate logo!
exit /b 0`} />

      <h3>Barra de Progresso Visual</h3>
      <CodeBlock language="batch" title="Simular barra de progresso" code={`@echo off
setlocal enabledelayedexpansion

call :BarraProgresso 0 100
timeout /t 1 /nobreak >nul
call :BarraProgresso 25 100
timeout /t 1 /nobreak >nul
call :BarraProgresso 50 100
timeout /t 1 /nobreak >nul
call :BarraProgresso 75 100
timeout /t 1 /nobreak >nul
call :BarraProgresso 100 100
echo.
echo Concluido!
goto :eof

:BarraProgresso
set /a PORCENT=%~1 * 100 / %~2
set /a BARRAS=%PORCENT% / 5
set BAR=
for /l %%i in (1,1,%BARRAS%) do set BAR=!BAR!█
set /a ESPACOS=20-%BARRAS%
for /l %%i in (1,1,%ESPACOS%) do set BAR=!BAR!░
<nul set /p "=[%BAR%] %PORCENT%%% "
echo.
<nul set /p "=[%BAR%] %PORCENT%%%   "
exit /b`} />

      <AlertBox type="info" title="Dica: CLS e Animações">
        Use <code>cls</code> para limpar a tela e reescrever conteúdo, criando efeitos de atualização em tempo real. Combine com <code>timeout</code> para animações simples de loading.
      </AlertBox>
    </PageContainer>
  );
}