import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { Building, Users, Search, Settings, Shield, Database } from "lucide-react";

  export default function ActiveDirectory() {
    return (
      <PageContainer
        title="Active Directory pelo CMD"
        subtitle="Gerencie usuários, grupos, computadores e políticas do AD com DSQUERY, DSMOD, DSADD, DSRM e NET USE."
        difficulty="avancado"
        timeToRead="50 min"
      >
        <AlertBox type="warning" title="Requisitos">
          Os comandos DS* (DSQUERY, DSMOD, DSADD, DSRM) exigem as Ferramentas de Administração do Active Directory instaladas (RSAT). Execute o CMD em uma conta com privilégios de administrador de domínio.
        </AlertBox>

        <h2><Search className="inline-block mr-2 mb-1 w-5 h-5" /> DSQUERY — Buscar Objetos no AD</h2>
        <p>O <code>DSQUERY</code> busca objetos no Active Directory (usuários, grupos, computadores, OUs) usando filtros. A saída são DNs (Distinguished Names) que podem ser passados para outros comandos DS*.</p>

        <CodeBlock language="batch" title="Buscar usuários no AD" code={`:: Buscar usuário pelo nome
  dsquery user -name "João*"
  :: Saída: "CN=João Silva,OU=TI,DC=empresa,DC=com,DC=br"

  :: Buscar usuário pelo login (samAccountName)
  dsquery user -samid jsilva

  :: Buscar por conta desabilitada
  dsquery user -disabled

  :: Buscar por último logon (nunca logou)
  dsquery user -inactive 4  :: Inativo há 4+ semanas

  :: Buscar usuários que não alteraram senha em 90+ dias
  dsquery user -stalepwd 90

  :: Buscar todos os usuários de uma OU
  dsquery user "OU=Financeiro,DC=empresa,DC=com,DC=br"

  :: Buscar usuários com filtro LDAP avançado
  dsquery * -filter "(&(objectClass=user)(department=TI))" -attr cn mail telephoneNumber

  :: Buscar e limitar resultados
  dsquery user -name "*silva*" -limit 50`} />

        <CodeBlock language="batch" title="Buscar grupos, computadores e OUs" code={`:: Buscar grupo pelo nome
  dsquery group -name "Admins*"

  :: Listar membros de um grupo
  dsget group "CN=Admins TI,OU=Grupos,DC=empresa,DC=com,DC=br" -members

  :: Listar grupos de um usuário
  dsget user "CN=João Silva,OU=TI,DC=empresa,DC=com,DC=br" -memberof

  :: Buscar computadores no AD
  dsquery computer -name "PC-*"
  dsquery computer -inactive 4   :: Computadores inativos há 4+ semanas
  dsquery computer -o rdn        :: Apenas o nome, sem DN completo

  :: Buscar todas as OUs
  dsquery ou "DC=empresa,DC=com,DC=br"

  :: Buscar controladores de domínio
  dsquery server -domain empresa.com.br -forest`} />

        <h2><Users className="inline-block mr-2 mb-1 w-5 h-5" /> DSADD — Criar Objetos no AD</h2>
        <CodeBlock language="batch" title="Criar usuários, grupos e OUs" code={`:: Criar usuário
  dsadd user "CN=Maria Santos,OU=RH,DC=empresa,DC=com,DC=br" ^
      -samid msantos ^
      -upn msantos@empresa.com.br ^
      -fn Maria ^
      -ln Santos ^
      -display "Maria Santos" ^
      -dept "Recursos Humanos" ^
      -title "Analista" ^
      -email msantos@empresa.com.br ^
      -pwd "Senha@2026!" ^
      -mustchpwd yes ^
      -disabled no

  :: Criar grupo de segurança
  dsadd group "CN=GRP-Financeiro,OU=Grupos,DC=empresa,DC=com,DC=br" ^
      -samid GRP-Financeiro ^
      -grouptype -2147483646 ^
      -desc "Grupo de acesso do departamento Financeiro"

  :: Criar OU
  dsadd ou "OU=Filial-SP,OU=Escritorios,DC=empresa,DC=com,DC=br" ^
      -desc "Escritório de São Paulo"

  :: Criar computador no AD
  dsadd computer "CN=PC-001,OU=Workstations,DC=empresa,DC=com,DC=br" ^
      -desc "Computador sala 101"`} />

        <h2><Settings className="inline-block mr-2 mb-1 w-5 h-5" /> DSMOD — Modificar Objetos no AD</h2>
        <CodeBlock language="batch" title="Modificar atributos de usuários e grupos" code={`:: Desabilitar usuário
  dsmod user "CN=João Silva,OU=TI,DC=empresa,DC=com,DC=br" -disabled yes

  :: Habilitar usuário
  dsmod user "CN=João Silva,OU=TI,DC=empresa,DC=com,DC=br" -disabled no

  :: Resetar senha (forçar troca no próximo login)
  dsmod user "CN=João Silva,OU=TI,DC=empresa,DC=com,DC=br" -pwd "NovaSenha@2026!" -mustchpwd yes

  :: Atualizar atributos do usuário
  dsmod user "CN=João Silva,OU=TI,DC=empresa,DC=com,DC=br" ^
      -title "Gerente de TI" ^
      -dept "TI" ^
      -tel "+55 11 9999-8888"

  :: Adicionar usuário a um grupo
  dsmod group "CN=GRP-Admins,OU=Grupos,DC=empresa,DC=com,DC=br" -addmbr "CN=João Silva,OU=TI,DC=empresa,DC=com,DC=br"

  :: Remover usuário de um grupo
  dsmod group "CN=GRP-Admins,OU=Grupos,DC=empresa,DC=com,DC=br" -rmmbr "CN=João Silva,OU=TI,DC=empresa,DC=com,DC=br"

  :: Modificar múltiplos usuários via pipeline
  dsquery user -disabled | dsmod user -disabled no`} />

        <h2><Shield className="inline-block mr-2 mb-1 w-5 h-5" /> Comandos NET para AD</h2>
        <CodeBlock language="batch" title="NET USER, NET GROUP e NET LOCALGROUP" code={`:: Criar usuário local ou de domínio
  net user novouser Senha@2026! /add /domain

  :: Ver informações de usuário no domínio
  net user jsilva /domain
  :: Mostra: grupos, última troca de senha, conta bloqueada, etc.

  :: Definir expiração de senha
  net user jsilva /expires:31/12/2026 /domain

  :: Adicionar usuário a grupo do domínio
  net group "Administradores de Domínio" jsilva /add /domain

  :: Listar membros de um grupo
  net group "Usuários do Domínio" /domain

  :: Listar todos os grupos do domínio
  net group /domain

  :: Verificar contas bloqueadas (via NET)
  net accounts /domain

  :: Desbloquear conta (via PowerShell)
  powershell -Command "Unlock-ADAccount -Identity jsilva"

  :: Resetar senha via PowerShell (mais robusto)
  powershell -Command "Set-ADAccountPassword -Identity jsilva -NewPassword (ConvertTo-SecureString 'NovaSenha@2026!' -AsPlainText -Force) -Reset"`} />

        <h2><Database className="inline-block mr-2 mb-1 w-5 h-5" /> Scripts de Automação AD</h2>

        <h3>Script: Criar múltiplos usuários a partir de CSV</h3>
        <CodeBlock language="batch" title="criar-usuarios-csv.bat" code={`@echo off
  :: Formato do CSV: nome,sobrenome,login,email,ou,senha
  :: Arquivo: usuarios.csv

  echo Criando usuários do arquivo CSV...
  echo.

  for /f "skip=1 tokens=1,2,3,4,5,6 delims=," %%a in (usuarios.csv) do (
      echo Criando: %%c (%%a %%b)
      dsadd user "CN=%%a %%b,%%e,DC=empresa,DC=com,DC=br" ^
          -samid %%c ^
          -upn %%c@empresa.com.br ^
          -fn %%a -ln %%b ^
          -display "%%a %%b" ^
          -email %%d ^
          -pwd %%f ^
          -mustchpwd yes ^
          -disabled no
      echo   Resultado: %ERRORLEVEL%
  )

  echo.
  echo Processo concluído!
  pause`} />

        <h3>Script: Relatório de Contas Inativas</h3>
        <CodeBlock language="batch" title="relatorio-inativos.bat" code={`@echo off
  echo Usuários inativos há 30+ dias:
  echo.
  dsquery user -inactive 4 -limit 1000 | dsget user -samid -disabled -l
  echo.
  echo Computadores inativos há 60+ dias:
  dsquery computer -inactive 9 -limit 500 | dsget computer -samid -desc -l
  pause`} />

        <AlertBox type="info" title="RSAT — Ferramentas de Administração Remota">
          Instale o RSAT no Windows 10/11: Configurações → Recursos Opcionais → Ferramentas de Administração do Active Directory. Ou via CMD: <code>DISM /Online /Add-Capability /CapabilityName:Rsat.ActiveDirectory.DS-LDS.Tools~~~~0.0.1.0</code>
        </AlertBox>
      </PageContainer>
    );
  }