import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { Lock, Shield, Key, HardDrive, FileCheck } from "lucide-react";

  export default function BitLocker() {
    return (
      <PageContainer
        title="BitLocker e Criptografia"
        subtitle="Proteja dados com BitLocker (MANAGE-BDE), criptografia EFS (CIPHER) e gerencie chaves de recuperação pelo CMD."
        difficulty="avancado"
        timeToRead="35 min"
      >
        <h2><Lock className="inline-block mr-2 mb-1 w-5 h-5" /> MANAGE-BDE — BitLocker Drive Encryption</h2>
        <p>O <code>MANAGE-BDE</code> é a ferramenta de linha de comando para gerenciar o BitLocker — o sistema de criptografia de disco completo do Windows. Disponível no Windows 10/11 Pro, Enterprise e Education.</p>

        <AlertBox type="info" title="Requisitos">
          Requer Windows Pro, Enterprise ou Education. Recomendado: chip TPM 1.2 ou 2.0. Execute o CMD como Administrador.
        </AlertBox>

        <CodeBlock language="batch" title="Verificar status do BitLocker" code={`:: Ver status de todos os volumes
  manage-bde -status
  :: Saída para cada volume:
  :: Volume C: [Windows]
  :: Size:               237.92 GB
  :: BitLocker Version:  2.0
  :: Conversion Status:  Fully Encrypted
  :: Percentage Encrypted: 100.0%
  :: Encryption Method:  XTS-AES 128
  :: Protection Status:  Protection On
  :: Lock Status:        Unlocked

  :: Ver status de volume específico
  manage-bde -status C:
  manage-bde -status D:

  :: Ver protetores de chave configurados
  manage-bde -protectors -get C:
  :: Mostra: TPM, Senha, Chave de Recuperação, Certificado`} />

        <CodeBlock language="batch" title="Ativar e configurar BitLocker" code={`:: Ativar BitLocker no volume C: com TPM + PIN
  manage-bde -on C: -sk E:\ -RecoveryPassword -tpm
  manage-bde -protectors -add C: -TPMAndPIN

  :: Ativar BitLocker com só senha (sem TPM)
  manage-bde -on C: -password

  :: Ativar em volume de dados D: com senha
  manage-bde -on D: -password
  :: Vai pedir para digitar e confirmar a senha

  :: Ativar com chave de recuperação salva em pendrive
  manage-bde -on C: -sk E:\ -rp
  :: -sk E:\ = salva startup key no pendrive E:
  :: -rp = gera e exibe senha de recuperação de 48 dígitos

  :: Ativar sem TPM (via política de grupo)
  :: Primeiro: gpedit.msc → Configuração do Computador → Modelos Administrativos
  :: → Componentes do Windows → BitLocker → Unidades do Sistema Operacional
  :: → Exigir autenticação adicional na inicialização → Habilitar + marcar "Permitir BitLocker sem TPM"

  :: Ativar com chave USB
  manage-bde -on C: -StartupKey E:\`} />

        <CodeBlock language="batch" title="Gerenciar chaves de recuperação" code={`:: Ver chave de recuperação de 48 dígitos
  manage-bde -protectors -get C: -Type RecoveryPassword
  :: Saída:
  :: Recovery Password:
  :: 123456-234567-345678-456789-567890-678901-789012-890123

  :: Salvar chave de recuperação em arquivo
  manage-bde -protectors -get C: > C:\Temp\bitlocker-key-C.txt

  :: Adicionar nova chave de recuperação ao volume
  manage-bde -protectors -add C: -RecoveryPassword

  :: Fazer backup da chave para o Active Directory (domínio)
  manage-bde -protectors -adbackup C: -id {GUID-DO-PROTETOR}

  :: Remover protetor específico
  manage-bde -protectors -delete C: -id {GUID-DO-PROTETOR}

  :: Desbloquear volume usando chave de recuperação
  manage-bde -unlock D: -RecoveryPassword 123456-234567-345678-456789-567890-678901-789012-890123`} />

        <CodeBlock language="batch" title="Ativar e desativar proteção" code={`:: Suspender BitLocker temporariamente (para updates de firmware)
  manage-bde -protectors -disable C:
  :: Proteção SUSPENSA (ainda criptografado, mas sem verificação TPM)

  :: Reativar a proteção
  manage-bde -protectors -enable C:

  :: Desativar BitLocker completamente (descriptografar - demorado!)
  manage-bde -off C:
  :: Aguardar conclusão (pode levar horas em discos grandes)

  :: Monitorar progresso da criptografia/descriptografia
  manage-bde -status C: | findstr "Percentage"

  :: Pausar criptografia em andamento
  manage-bde -pause C:

  :: Retomar criptografia pausada
  manage-bde -resume C:`} />

        <h2><FileCheck className="inline-block mr-2 mb-1 w-5 h-5" /> CIPHER — Criptografia EFS</h2>
        <p>O <code>CIPHER</code> gerencia a criptografia EFS (Encrypting File System) — criptografia a nível de arquivo individual no NTFS. Diferente do BitLocker (que criptografa todo o disco), o EFS criptografa arquivos específicos vinculados ao usuário.</p>

        <CodeBlock language="batch" title="Criptografar e descriptografar arquivos com EFS" code={`:: Criptografar arquivo com EFS
  cipher /e arquivo-secreto.docx

  :: Criptografar pasta inteira (e novos arquivos criados nela)
  cipher /e C:\DadosSigilosos\

  :: Criptografar pasta e todos os subdiretórios
  cipher /e /s:C:\DadosSigilosos\

  :: Descriptografar arquivo
  cipher /d arquivo-secreto.docx

  :: Descriptografar pasta inteira
  cipher /d /s:C:\DadosSigilosos\

  :: Ver status de criptografia de arquivos na pasta atual
  cipher
  :: [E] = Encrypted, [U] = Unencrypted

  :: Ver status de uma pasta específica
  cipher /s:C:\Documentos\`} />

        <CodeBlock language="batch" title="CIPHER — Apagar dados com segurança" code={`:: IMPORTANTE: apagar dados de forma irrecuperável
  :: O CIPHER preenche o espaço livre com dados aleatórios
  :: Isso impede recuperação de arquivos deletados por softwares forenses

  :: Sobrescrever espaço livre do disco C: (3 passagens)
  cipher /w:C:\
  :: -w = wipe (limpa espaço livre)
  :: /w:C:\ = todo o espaço livre do volume C:

  :: Isso pode demorar horas em discos grandes
  :: Ideal para antes de vender o computador`} />

        <h2><Key className="inline-block mr-2 mb-1 w-5 h-5" /> Backup de Certificados EFS</h2>
        <CodeBlock language="batch" title="Exportar e importar certificado EFS" code={`:: Ver certificado EFS do usuário atual
  cipher /r:C:\Backup\efs-cert
  :: Cria dois arquivos:
  :: efs-cert.cer  (certificado público)
  :: efs-cert.pfx  (certificado + chave privada - protegido por senha)

  :: IMPORTANTE: faça backup do .pfx
  :: Sem ele, os arquivos criptografados com EFS ficam INACESSÍVEIS
  :: se o perfil do usuário for corrompido ou o sistema for reinstalado

  :: Importar certificado EFS em outro computador
  certutil -importpfx C:\Backup\efs-cert.pfx

  :: Ver agentes de recuperação configurados
  cipher /k       :: Ver thumbprint do certificado do usuário atual
  cipher /u /n    :: Ver todos os arquivos EFS criptografados`} />

        <h3>Script: Auditoria de Arquivos Criptografados</h3>
        <CodeBlock language="batch" title="audit-efs.bat — Listar arquivos criptografados" code={`@echo off
  echo Listando arquivos com criptografia EFS...
  echo.

  :: Buscar arquivos com atributo E (encrypted) em todo o C:
  cipher /u /n > C:\Logs\efs-audit.txt 2>&1

  echo Resultado salvo em C:\Logs\efs-audit.txt
  echo Total de arquivos criptografados:
  find /c ":" C:\Logs\efs-audit.txt
  echo.
  echo Dica: arquivos com EFS aparecem em VERDE no Explorer
  pause`} />

        <AlertBox type="warning" title="BitLocker vs EFS: Qual Usar?">
          Use o <strong>BitLocker</strong> para proteger todos os dados do disco — especialmente em laptops contra roubo físico. Use o <strong>EFS</strong> para proteger arquivos específicos contra outros usuários do mesmo computador. Em ambientes corporativos, use os dois: BitLocker para o disco + EFS para arquivos confidenciais específicos.
        </AlertBox>

        <AlertBox type="warning" title="Atenção: Perca de Chave EFS">
          Se o perfil do usuário for corrompido ou a conta do AD for deletada sem backup do certificado EFS, os arquivos criptografados se tornam PERMANENTEMENTE INACESSÍVEIS. Sempre exporte o certificado com <code>cipher /r</code> e guarde em local seguro.
        </AlertBox>
      </PageContainer>
    );
  }