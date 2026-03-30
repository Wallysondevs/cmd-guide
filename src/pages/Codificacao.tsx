import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Globe, FileText, Type, Settings } from "lucide-react";

export default function Codificacao() {
  return (
    <PageContainer
      title="Codificação, Unicode e Localização"
      subtitle="Resolva problemas de acentuação, configure code pages, trabalhe com Unicode e crie scripts compatíveis internacionalmente."
      difficulty="intermediario"
      timeToRead="22 min"
    >
      <h2><Globe className="inline-block mr-2 mb-1 w-5 h-5" /> CHCP — Code Pages no CMD</h2>
      <p>O <code>CHCP</code> (Change Code Page) controla qual conjunto de caracteres o CMD usa para exibir e processar texto. Este é o principal motivo de problemas com acentos e caracteres especiais.</p>

      <CodeBlock language="batch" title="Verificar e alterar code page" code={`:: Ver code page atual
chcp

:: Definir para UTF-8 (recomendado para uso moderno)
chcp 65001

:: Definir para Windows-1252 (padrão ocidental)
chcp 1252

:: Definir para IBM 850 (DOS padrão antigo)
chcp 850

:: Definir para OEM 437 (CP437, DOS americano)
chcp 437

:: Definir para Windows 1250 (Europa Central)
chcp 1250`} />

      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-border">
          <thead><tr className="bg-muted">
            <th className="border border-border p-2 text-left">Code Page</th>
            <th className="border border-border p-2 text-left">Nome</th>
            <th className="border border-border p-2 text-left">Uso</th>
          </tr></thead>
          <tbody>
            {[
              ["65001","UTF-8","Padrão moderno, suporta todos os idiomas"],
              ["1252","Windows-1252","Windows ocidental, bom para PT-BR"],
              ["850","IBM 850","DOS ocidental (compatibilidade)"],
              ["437","IBM 437","DOS americano padrão"],
              ["1250","Windows-1250","Europa Central"],
              ["932","Shift-JIS","Japonês"],
              ["936","GBK","Chinês Simplificado"],
            ].map(([cp, nome, uso]) => (
              <tr key={cp}>
                <td className="border border-border p-2 font-mono text-primary">{cp}</td>
                <td className="border border-border p-2">{nome}</td>
                <td className="border border-border p-2 text-sm">{uso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertBox type="warning" title="UTF-8 (65001) pode quebrar algumas ferramentas">
        Ao usar chcp 65001, algumas ferramentas antigas do Windows podem ter comportamento inesperado com o processamento de caracteres. Para scripts internos do Windows, o code page 1252 é mais seguro.
      </AlertBox>

      <h2><FileText className="inline-block mr-2 mb-1 w-5 h-5" /> Arquivos com Acentos em Scripts</h2>
      <CodeBlock language="batch" title="Salvar e ler arquivos com acentos" code={`:: Definir UTF-8 antes de criar arquivos com acentos
chcp 65001
echo Olá Mundo! Ação de configuração. > arquivo-utf8.txt

:: Ler arquivo com codificação correta
chcp 65001
type arquivo-utf8.txt

:: Converter arquivo entre encodings (com PowerShell)
powershell -Command "Get-Content 'arquivo-antigo.txt' -Encoding Default | Set-Content 'arquivo-novo.txt' -Encoding UTF8\"

:: Detectar BOM (Byte Order Mark) em UTF-8
:: Abrir em modo binário para verificar os primeiros bytes
powershell -Command "[System.IO.File]::ReadAllBytes('arquivo.txt')[0..2] -join ','`} />

      <h2><Type className="inline-block mr-2 mb-1 w-5 h-5" /> Fontes e Exibição de Caracteres</h2>
      <CodeBlock language="batch" title="Configurar fonte do CMD para Unicode" code={`:: Pelo registro (persistente para todos os usuários)
reg add "HKCU\\Console\" /v FaceName /t REG_SZ /d \"Consolas\" /f
reg add "HKCU\\Console\" /v FontSize /t REG_DWORD /d 0x00100000 /f

:: Pela janela: clique direito na barra de título > Propriedades > Fonte
:: Escolha "Consolas" ou \"Lucida Console" para melhor suporte Unicode

:: Verificar se fonte suporta um caractere (pelo mapa de caracteres)
charmap`} />

      <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> Localização e Data/Hora</h2>
      <CodeBlock language="batch" title="Formatos de data dependem da localização" code={`:: Ver configuração de localização
echo Data: %date%
echo Hora: %time%

:: Formato pt-BR: DD/MM/AAAA
set DIA=%date:~0,2%
set MES=%date:~3,2%
set ANO=%date:~6,4%

:: Formato en-US: MM/DD/AAAA
:: set MES=%date:~0,2%
:: set DIA=%date:~3,2%
:: set ANO=%date:~6,4%

:: Método universalmente seguro (PowerShell)
for /f %%a in ('powershell -Command "Get-Date -Format yyyy-MM-dd\"') do set DATA_ISO=%%a
echo Data ISO: %DATA_ISO%

:: Nome do mês por extenso em português
for /f %%a in ('powershell -Command "Get-Date -Format MMMM\"') do set MES_NOME=%%a
echo Mês: %MES_NOME%`} />

      <h3>Script Compatível com Múltiplos Idiomas</h3>
      <CodeBlock language="batch" title="Detectar idioma do sistema" code={`@echo off
:: Detectar idioma do Windows
for /f "tokens=3\" %%a in ('reg query \"HKCU\\Control Panel\\International\" /v LocaleName 2^>nul') do set LOCALE=%%a

echo Idioma do sistema: %LOCALE%

if "%LOCALE:~0,2%\"=="pt\" (
    set MSG_OLA=Olá Usuário
    set MSG_OK=Operação concluída
) else (
    set MSG_OLA=Hello User
    set MSG_OK=Operation completed
)

chcp 65001 >nul
echo %MSG_OLA%
echo %MSG_OK%`} />

      <AlertBox type="info" title="Dica: Scripts Batch com Unicode Literal">
        Ao escrever scripts .bat que contenham acentos, salve o arquivo com codificação compatível com o code page do sistema (geralmente ANSI/1252 no Brasil). Evite salvar em UTF-8 sem BOM se os acentos precisam aparecer corretamente no CMD padrão.
      </AlertBox>
    </PageContainer>
  );
}