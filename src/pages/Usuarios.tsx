import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Users, UserPlus, UserMinus, ShieldCheck, Key, Info, Unlock } from "lucide-react";

export default function Usuarios() {
  return (
    <PageContainer 
      title="Gerenciamento de Usuários e Grupos" 
      subtitle="Administre contas locais, privilégios e permissões via Prompt de Comando." 
      difficulty="intermediario" 
      timeToRead="20 min"
    >
      <section>
        <p>
          O Windows oferece ferramentas robustas de linha de comando para a administração de contas de usuário. Isso é essencial para automatizar a criação de usuários em massa ou para gerenciar servidores Windows Core que não possuem interface gráfica. O comando principal para estas tarefas é o <code>NET USER</code> e o <code>NET LOCALGROUP</code>.
        </p>
      </section>

      <section>
        <h2>1. Gerenciando Usuários (NET USER)</h2>
        <p>
          Com este comando você pode criar, modificar e excluir contas de usuário locais.
        </p>
        
        <h3>Listar e Consultar</h3>
        <CodeBlock 
          code={`:: Listar todos os usuários locais
net user

:: Ver detalhes de um usuário específico
net user Administrador`} 
          language="batch" 
        />

        <h3>Criar e Deletar</h3>
        <CodeBlock 
          code={`:: Criar um novo usuário com senha
net user "NomeUsuario" "Senha123" /add

:: Deletar um usuário
net user "NomeUsuario" /delete`} 
          language="batch" 
          title="Adição e remoção" 
        />

        <h3>Opções Avançadas</h3>
        <CodeBlock 
          code={`:: Desativar uma conta temporariamente
net user "João" /active:no

:: Definir data de expiração para a conta (DD/MM/AAAA)
net user "Estagiario" /expires:31/12/2024

:: Obrigar troca de senha no próximo login
net user "UsuarioNovo" /passwordchg:yes`} 
          language="batch" 
          title="Modificando atributos" 
        />
      </section>

      <section>
        <h2>2. Gerenciando Grupos (NET LOCALGROUP)</h2>
        <p>
          Grupos permitem organizar usuários e aplicar permissões em massa. O grupo mais importante é o de <code>Administradores</code>.
        </p>
        <CodeBlock 
          code={`:: Listar todos os grupos
net localgroup

:: Ver membros de um grupo específico
net localgroup Administradores

:: Adicionar um usuário ao grupo de administradores
net localgroup Administradores "NomeUsuario" /add

:: Criar um novo grupo customizado
net localgroup "Desenvolvedores" /add`} 
          language="batch" 
          title="Trabalhando com grupos" 
        />
      </section>

      <section>
        <h2>3. Identificação com WHOAMI</h2>
        <p>
          O comando <code>WHOAMI</code> ajuda a descobrir com qual usuário você está logado e quais são seus privilégios atuais.
        </p>
        <CodeBlock 
          code={`:: Ver usuário atual
whoami

:: Ver todos os grupos e privilégios (muito detalhado)
whoami /all

:: Verificar apenas privilégios (útil para ver se tem direitos de Admin)
whoami /priv`} 
          language="batch" 
          title="Identidade e privilégios" 
        />
      </section>

      <section>
        <h2>4. Executando como outro usuário (RUNAS)</h2>
        <p>
          Permite iniciar um programa usando as credenciais de outra conta.
        </p>
        <CodeBlock 
          code={`:: Executar CMD como Administrador (solicitará senha)
runas /user:Administrador cmd.exe

:: Abrir o Bloco de Notas como outro usuário
runas /user:NOME_DO_PC\\Usuario2 notepad.exe`} 
          language="batch" 
          title="Troca de contexto" 
        />
        <AlertBox type="warning" title="Limitação do RUNAS">
          O <code>runas</code> não permite passar a senha via linha de comando por razões de segurança. Você precisará digitá-la manualmente no prompt.
        </AlertBox>
      </section>

      <section>
        <h2>5. Verificando Privilégios de Administrador</h2>
        <p>Um truque comum em scripts para garantir que eles tenham permissão para rodar comandos protegidos:</p>
        <CodeBlock 
          code={`@echo off
net session >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERRO: Este script deve ser executado como Administrador!
    pause
    exit /b 1
)
echo Privilegios confirmados. Continuando...`} 
          language="batch" 
          title="Check de Admin" 
        />
      </section>

      <section>
        <h2>6. Políticas de Senha (NET ACCOUNTS)</h2>
        <p>Configurações globais para todas as contas de usuário locais.</p>
        <CodeBlock 
          code={`:: Ver política atual
net accounts

:: Exigir senha com no mínimo 8 caracteres
net accounts /minpwlen:8

:: Bloquear conta após 5 tentativas erradas
net accounts /lockoutthreshold:5`} 
          language="batch" 
          title="Segurança de conta" 
        />
      </section>

      <section>
        <h2>Tabela de Referência Rápida</h2>
        <table className="min-w-full border-collapse border border-border my-4">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border p-2">Tarefa</th>
              <th className="border border-border p-2">Comando</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-2">Trocar Senha</td>
              <td className="border border-border p-2"><code>net user nome nova_senha</code></td>
            </tr>
            <tr>
              <td className="border border-border p-2">Criar Grupo</td>
              <td className="border border-border p-2"><code>net localgroup nome /add</code></td>
            </tr>
            <tr>
              <td className="border border-border p-2">Ver Grupos do Usuário</td>
              <td className="border border-border p-2"><code>whoami /groups</code></td>
            </tr>
            <tr>
              <td className="border border-border p-2">Forçar Logoff</td>
              <td className="border border-border p-2"><code>shutdown /l</code></td>
            </tr>
          </tbody>
        </table>
      </section>
    </PageContainer>
  );
}
