import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Database, Search, PlusCircle, Trash2, FileOutput, FileInput, AlertTriangle, List } from "lucide-react";

export default function Registro() {
  return (
    <PageContainer
      title="Registro do Windows via REG"
      subtitle="Gerencie configurações profundas do sistema operacional através do comando REG"
      difficulty="avancado"
      timeToRead="25 min"
    >
      <section>
        <p>
          O Registro do Windows é um banco de dados hierárquico que armazena configurações de baixo nível para o sistema operacional e para aplicativos que optam por usar o registro. O comando <code>REG.exe</code> permite manipular essas chaves sem a necessidade de abrir o <code>regedit.exe</code>.
        </p>
      </section>

      <section>
        <h2><Database className="inline-block mr-2 mb-1" /> Estrutura do Registro</h2>
        <p>O registro é dividido em "Colmeias" (Hives) principais:</p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Abreviação</th>
                <th>Nome Completo</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>HKLM</code></td>
                <td>HKEY_LOCAL_MACHINE</td>
                <td>Configurações globais do computador (Hardware, Software instalado).</td>
              </tr>
              <tr>
                <td><code>HKCU</code></td>
                <td>HKEY_CURRENT_USER</td>
                <td>Configurações do usuário logado atualmente (Papel de parede, cores).</td>
              </tr>
              <tr>
                <td><code>HKCR</code></td>
                <td>HKEY_CLASSES_ROOT</td>
                <td>Associações de arquivos e objetos COM.</td>
              </tr>
              <tr>
                <td><code>HKU</code></td>
                <td>HKEY_USERS</td>
                <td>Configurações de todos os perfis de usuários carregados.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2><Search className="inline-block mr-2 mb-1" /> Consultando Valores (REG QUERY)</h2>
        <p>Para ler o valor de uma chave específica:</p>
        <CodeBlock 
          code={`reg query "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion" /v "ProductName"`} 
          language="batch" 
          title="Ver versão do Windows"
        />
        
        <h3>Opções de Busca:</h3>
        <ul>
          <li><code>/s</code>: Busca recursiva em todas as subchaves.</li>
          <li><code>/f "texto"</code>: Busca por uma string específica nos nomes de chaves ou valores.</li>
          <li><code>/t REG_DWORD</code>: Filtra por tipo de dado.</li>
        </ul>
      </section>

      <section>
        <h2><PlusCircle className="inline-block mr-2 mb-1" /> Adicionando e Modificando (REG ADD)</h2>
        <p>Ao usar <code>REG ADD</code>, se a chave já existir, o valor será atualizado.</p>
        <CodeBlock 
          code={`reg add "HKCU\\Software\\MeuApp" /v "Volume" /t REG_DWORD /d 100 /f`} 
          language="batch" 
          title="Adicionar valor numérico"
        />

        <h3>Tipos de Dados Comuns:</h3>
        <ul>
          <li><code>REG_SZ</code>: String de texto simples.</li>
          <li><code>REG_DWORD</code>: Número inteiro de 32 bits.</li>
          <li><code>REG_BINARY</code>: Dados binários brutos.</li>
          <li><code>REG_MULTI_SZ</code>: Lista de strings separadas por nulo.</li>
        </ul>
        <AlertBox type="warning" title="O parâmetro /F">
          O <code>/f</code> força a sobrescrita sem pedir confirmação. Use com cautela em scripts automatizados.
        </AlertBox>
      </section>

      <section>
        <h2><Trash2 className="inline-block mr-2 mb-1" /> Removendo Dados (REG DELETE)</h2>
        <p>Você pode apagar um valor específico ou uma chave inteira (incluindo tudo dentro dela).</p>
        <CodeBlock 
          code={`REM Apagar apenas um valor\nreg delete "HKCU\\Software\\MeuApp" /v "Volume" /f\n\nREM Apagar a pasta inteira\nreg delete "HKCU\\Software\\MeuApp" /f`} 
          language="batch" 
        />
      </section>

      <section>
        <h2><FileOutput className="inline-block mr-2 mb-1" /> Exportação e Importação</h2>
        <p>Essenciais para backups ou para aplicar configurações em massa em vários computadores.</p>
        
        <h3>Exportar para arquivo .reg</h3>
        <CodeBlock 
          code={`reg export "HKCU\\Control Panel\\Desktop" desktop_backup.reg`} 
          language="batch" 
        />

        <h3>Importar arquivo .reg</h3>
        <CodeBlock 
          code={`reg import desktop_backup.reg`} 
          language="batch" 
        />
      </section>

      <section>
        <h2><AlertTriangle className="inline-block mr-2 mb-1" /> Riscos e Precauções</h2>
        <AlertBox type="danger" title="Perigo Crítico">
          Alterações incorretas no Registro podem corromper o Windows, impedir o boot ou causar falhas inexplicáveis. Sempre faça um backup (export) da chave que pretende modificar antes de executar o comando.
        </AlertBox>
      </section>

      <section>
        <h2>Exemplos Práticos Úteis</h2>

        <h3>1. Desativar o Caps Lock (via Registro)</h3>
        <p>Muitos usuários gostam de remapear teclas alterando o <code>Scancode Map</code> no registro.</p>

        <h3>2. Abrir CMD como Admin na inicialização</h3>
        <CodeBlock 
          code={`reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "AvisoInicial" /t REG_SZ /d "cmd.exe /k echo Bem vindo ao Terminal!" /f`} 
          language="batch" 
        />

        <h3>3. Verificar se o sistema é 64-bit</h3>
        <CodeBlock 
          code={`reg query "HKLM\\System\\CurrentControlSet\\Control\\Session Manager\\Environment" /v PROCESSOR_ARCHITECTURE`} 
          language="batch" 
        />
      </section>

      <section>
        <h2><List className="inline-block mr-2 mb-1" /> Comandos Adicionais</h2>
        <ul>
          <li><code>REG COPY</code>: Copia uma chave para outro local do registro.</li>
          <li><code>REG COMPARE</code>: Compara duas chaves e mostra as diferenças.</li>
          <li><code>REG SAVE / RESTORE</code>: Salva um "hive" inteiro em formato binário (útil para backup de sistema offline).</li>
        </ul>
      </section>
    </PageContainer>
  );
}
