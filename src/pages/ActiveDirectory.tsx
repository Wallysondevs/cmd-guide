import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Users, Building, Search, Shield } from "lucide-react";

export default function ActiveDirectory() {
  return (
    <PageContainer
      title="Active Directory pelo CMD"
      subtitle="Gerencie usuários, grupos e objetos do Active Directory com comandos NET, DSADD, DSQUERY e DSMOD."
      difficulty="avancado"
      timeToRead="35 min"
    >
      <h2><Users className="inline-block mr-2 mb-1 w-5 h-5" /> Gerenciar Usuários com NET USER</h2>
      <p>O comando <code>NET USER</code> permite criar, modificar e excluir contas de usuário locais e de domínio.</p>

      <CodeBlock language="batch" title="Operações com usuários" code={`:: Listar usuários locais
net user

:: Listar usuários do domínio
net user /domain

:: Ver detalhes de um usuário
net user joaosilva /domain

:: Criar usuário local
net user novousuario Senha@123 /add

:: Criar usuário de domínio
net user novousuario Senha@123 /add /domain

:: Definir configurações do usuário
net user joaosilva /expires:31/12/2025 /domain
net user joaosilva /passwordreq:yes /domain
net user joaosilva /active:yes /domain

:: Forçar troca de senha no próximo login
net user joaosilva /logonpasswordchg:yes /domain

:: Desativar conta
net user joaosilva /active:no /domain

:: Excluir usuário
net user joaosilva /delete /domain`} />

      <h2><Building className="inline-block mr-2 mb-1 w-5 h-5" /> Gerenciar Grupos</h2>
      <CodeBlock language="batch" title="Grupos locais e de domínio" code={`:: Listar grupos locais
net localgroup

:: Listar grupos do domínio
net group /domain

:: Ver membros de um grupo
net localgroup "Administradores"
net group "Domain Admins\" /domain

:: Criar grupo local
net localgroup "Desenvolvedores\" /add

:: Adicionar usuário ao grupo
net localgroup "Administradores" joaosilva /add
net group "Domain Admins" joaosilva /add /domain

:: Remover usuário do grupo
net localgroup "Administradores" joaosilva /delete

:: Excluir grupo
net localgroup "Desenvolvedores\" /delete`} />

      <h2><Search className="inline-block mr-2 mb-1 w-5 h-5" /> DSQUERY — Consultar o Active Directory</h2>
      <p>O <code>DSQUERY</code> permite fazer buscas avançadas no Active Directory a partir do CMD.</p>

      <CodeBlock language="batch" title="Buscar objetos no AD" code={`:: Buscar usuários pelo nome
dsquery user -name "João*\"

:: Buscar usuários em uma OU específica
dsquery user "OU=TI,DC=empresa,DC=com\"

:: Buscar contas desativadas
dsquery user -disabled

:: Buscar contas inativas (sem login há 30 dias)
dsquery user -inactive 4

:: Buscar grupos
dsquery group -name "Dev*\"

:: Buscar computadores
dsquery computer -name "WS*\"

:: Buscar OUs
dsquery ou -name "TI\"

:: Buscar por atributo específico (filtro LDAP)
dsquery * -filter "(&(objectClass=user)(department=TI))\" -attr cn mail`} />

      <h2><Shield className="inline-block mr-2 mb-1 w-5 h-5" /> DSADD, DSMOD, DSMOVE e DSRM</h2>
      <CodeBlock language="batch" title="Criar objetos no AD (DSADD)" code={`:: Criar usuário no AD
dsadd user "CN=Maria Santos,OU=RH,DC=empresa,DC=com\" -samid mariasantos -upn mariasantos@empresa.com -pwd Senha@123 -pwdneverexpires yes -disabled no

:: Criar grupo
dsadd group "CN=Desenvolvedores,OU=TI,DC=empresa,DC=com\" -samid desenvolvedores -scope g -secgrp yes

:: Criar OU
dsadd ou "OU=Marketing,DC=empresa,DC=com\" -desc \"Departamento de Marketing\"`} />

      <CodeBlock language="batch" title="Modificar objetos no AD (DSMOD)" code={`:: Alterar descrição de usuário
dsmod user "CN=Joao Silva,OU=TI,DC=empresa,DC=com\" -desc \"Analista de Sistemas Senior\"

:: Redefinir senha
dsmod user "CN=Joao Silva,OU=TI,DC=empresa,DC=com\" -pwd NovaSenha@456 -mustchpwd yes

:: Desativar conta
dsmod user "CN=Joao Silva,OU=TI,DC=empresa,DC=com\" -disabled yes

:: Adicionar usuário a um grupo
dsmod group "CN=Admins,OU=TI,DC=empresa,DC=com\" -addmbr \"CN=Joao Silva,OU=TI,DC=empresa,DC=com\"`} />

      <CodeBlock language="batch" title="Mover e excluir objetos" code={`:: Mover usuário para outra OU
dsmove "CN=Joao Silva,OU=TI,DC=empresa,DC=com\" -newparent \"OU=Gerencia,DC=empresa,DC=com\"

:: Excluir objeto do AD
dsrm "CN=Joao Silva,OU=TI,DC=empresa,DC=com\" -noprompt

:: Excluir OU e tudo dentro dela
dsrm "OU=Temporarios,DC=empresa,DC=com\" -subtree -noprompt`} />

      <h3>Script: Criar Usuários em Massa</h3>
      <CodeBlock language="batch" title="criar-usuarios.bat" code={`@echo off
:: Ler lista de usuarios de um CSV: nome,login,senha,ou
:: Formato do arquivo usuarios.txt: joao,joaosilva,Senha@123,TI

for /f "tokens=1,2,3,4 delims=,\" %%a in (usuarios.txt) do (
    echo Criando usuario: %%b
    dsadd user "CN=%%a,OU=%%d,DC=empresa,DC=com\" ^
        -samid %%b ^
        -upn %%b@empresa.com ^
        -pwd %%c ^
        -mustchpwd yes ^
        -disabled no ^
        -fn %%a
    if errorlevel 1 (
        echo ERRO ao criar: %%b
    ) else (
        echo Criado: %%b
    )
)
echo Processo concluido!`} />

      <AlertBox type="info" title="Requer RSAT ou DC">
        Os comandos DS* (dsquery, dsadd, dsmod etc.) precisam das ferramentas RSAT (Remote Server Administration Tools) instaladas, ou devem ser executados diretamente em um Domain Controller.
      </AlertBox>
    </PageContainer>
  );
}