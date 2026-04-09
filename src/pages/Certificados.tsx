import { PageContainer } from "@/components/layout/PageContainer";
  import { CodeBlock } from "@/components/ui/CodeBlock";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { Lock, Shield, Key, FileCheck, Search, RefreshCcw } from "lucide-react";

  export default function Certificados() {
    return (
      <PageContainer
        title="Certificados e CERTUTIL"
        subtitle="Gerencie certificados digitais, valide hashes, codifique arquivos em Base64, teste SSL e trabalhe com PKI pelo CMD."
        difficulty="avancado"
        timeToRead="35 min"
      >
        <h2><FileCheck className="inline-block mr-2 mb-1 w-5 h-5" /> CERTUTIL — Utilitário de Certificados</h2>
        <p>O <code>CERTUTIL</code> é uma das ferramentas mais versáteis do Windows: gerencia certificados digitais, calcula hashes criptográficos, codifica/decodifica Base64, baixa arquivos e muito mais. Está disponível em todas as versões do Windows sem instalação adicional.</p>

        <h2><Shield className="inline-block mr-2 mb-1 w-5 h-5" /> Verificação de Integridade com Hash</h2>
        <CodeBlock language="batch" title="Calcular e verificar hashes de arquivos" code={`:: Calcular hash SHA-256 (mais usado para verificação)
  certutil -hashfile arquivo.iso SHA256
  :: Saída:
  :: SHA256 hash of arquivo.iso:
  :: a4b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1
  :: CertUtil: -hashfile command completed successfully.

  :: Outros algoritmos suportados
  certutil -hashfile arquivo.zip MD5
  certutil -hashfile arquivo.zip SHA1
  certutil -hashfile arquivo.zip SHA512

  :: Comparar hash com valor esperado (script automático)
  set ARQUIVO=C:\Downloads\programa.exe
  set ESPERADO=a4b1c2d3...

  for /f "skip=1 tokens=*" %%h in ('certutil -hashfile "%ARQUIVO%" SHA256') do (
      if "%%h"=="%ESPERADO%" (
          echo HASH VÁLIDO: arquivo integro!
      ) else (
          echo HASH INVALIDO: arquivo corrompido ou modificado!
      )
      goto :done
  )
  :done`} />

        <h2><Key className="inline-block mr-2 mb-1 w-5 h-5" /> Codificação Base64</h2>
        <CodeBlock language="batch" title="Codificar e decodificar Base64" code={`:: Codificar arquivo em Base64
  certutil -encode arquivo.bin arquivo.b64
  :: Gera arquivo Base64 com cabeçalho BEGIN/END CERTIFICATE

  :: Decodificar Base64 de volta para binário
  certutil -decode arquivo.b64 arquivo-original.bin

  :: Codificar string (via arquivo temporário)
  echo Minha mensagem secreta > temp.txt
  certutil -encode temp.txt temp_b64.txt
  del temp.txt

  :: Decodificar string Base64 recebida
  echo aGVsbG8gd29ybGQ= > entrada.b64
  certutil -decode entrada.b64 saida.txt
  type saida.txt`} />

        <h2><Shield className="inline-block mr-2 mb-1 w-5 h-5" /> Gerenciar Repositórios de Certificados</h2>
        <CodeBlock language="batch" title="Listar e explorar repositórios de certificados" code={`:: Listar certificados do usuário atual
  certutil -store My
  certutil -store My "Nome do Certificado"

  :: Listar certificados da máquina (requer admin)
  certutil -store -enterprise My
  certutil -store -machine My

  :: Repositórios disponíveis:
  :: My              = Certificados pessoais
  :: Root            = Autoridades certificadoras raiz
  :: CA              = Autoridades certificadoras intermediárias
  :: TrustedPeople   = Pessoas confiáveis
  :: Disallowed      = Certificados revogados

  :: Listar CAs raiz confiáveis
  certutil -store Root

  :: Listar todos os repositórios
  certutil -enumstore

  :: Ver certificado específico por número serial
  certutil -store My "serial:1234567890abcdef"`} />

        <CodeBlock language="batch" title="Importar e exportar certificados" code={`:: Importar certificado .cer (CER/DER) para repositório
  certutil -addstore Root certificado-raiz.cer
  certutil -addstore My meu-certificado.cer

  :: Importar certificado .pfx (com chave privada)
  certutil -importpfx meu-certificado.pfx NoExport
  certutil -importpfx meu-certificado.pfx NoExport,NoChain

  :: Exportar certificado (sem chave privada)
  certutil -store My "Meu Certificado" | findstr "Serial"
  :: Depois usar MMC ou PowerShell para exportar com chave

  :: Exportar via PowerShell integrado
  powershell -Command "Get-ChildItem Cert:\CurrentUser\My | Export-Certificate -FilePath cert.cer -Type CERT"

  :: Remover certificado do repositório
  certutil -delstore My "thumb-print-do-certificado"`} />

        <h2><Search className="inline-block mr-2 mb-1 w-5 h-5" /> Verificar Certificados SSL de Sites</h2>
        <CodeBlock language="batch" title="Testar e diagnosticar SSL/TLS" code={`:: Baixar e exibir certificado SSL de um site
  certutil -ping meusite.com

  :: Verificar cadeia de certificados de um site
  powershell -Command "& {
      \$req = [System.Net.WebRequest]::Create('https://meusite.com.br')
      \$req.GetResponse() | Out-Null
      \$cert = \$req.ServicePoint.Certificate
      Write-Host 'Assunto:' \$cert.Subject
      Write-Host 'Emissor:' \$cert.Issuer
      Write-Host 'Valido até:' \$cert.GetExpirationDateString()
      Write-Host 'Thumbprint:' \$cert.GetCertHashString()
  }"

  :: Verificar certificado local (arquivo .cer)
  certutil -verify -urlfetch certificado.cer

  :: Verificar CRL (Certificate Revocation List)
  certutil -verify -urlfetch -f certificado.cer

  :: Testar conexão SSL na porta 443
  powershell -Command "Test-NetConnection meusite.com -Port 443"`} />

        <h2><Lock className="inline-block mr-2 mb-1 w-5 h-5" /> Download de Arquivos com CERTUTIL</h2>
        <p>O CERTUTIL pode ser usado para baixar arquivos via HTTP/HTTPS — útil em ambientes restritos onde ferramentas como curl não estão disponíveis.</p>

        <CodeBlock language="batch" title="Baixar arquivos via CERTUTIL" code={`:: Baixar arquivo via HTTP/HTTPS
  certutil -urlcache -f -split https://exemplo.com/arquivo.zip arquivo.zip

  :: Baixar e verificar integridade automaticamente
  certutil -urlcache -f https://exemplo.com/arquivo.zip arquivo.zip
  certutil -hashfile arquivo.zip SHA256

  :: Limpar cache de URLs do CERTUTIL
  certutil -urlcache -f *

  :: Baixar CRL (Certificate Revocation List) de uma CA
  certutil -url certificado.cer
  :: Abre interface visual para baixar AIA e CDP`} />

        <h2><RefreshCcw className="inline-block mr-2 mb-1 w-5 h-5" /> Diagnóstico de PKI e Certificados</h2>
        <CodeBlock language="batch" title="Diagnosticar problemas de certificado" code={`:: Verificar a data atual do sistema (importante para validade de certs)
  date /t
  time /t

  :: Testar se certificado está na cadeia de confiança
  certutil -verify certificado.crt

  :: Ver informações detalhadas de um arquivo PFX
  certutil -dump arquivo.pfx
  certutil -p "senha" -dump arquivo.pfx

  :: Ver política de certificados do sistema
  certutil -getkey thumbprint outputblob

  :: Registrar provedor CSP (Cryptographic Service Provider)
  certutil -csplist

  :: Ver chaves de criptografia disponíveis
  certutil -key

  :: Diagnosticar erros de autenticação de smart card
  certutil -scinfo`} />

        <h3>Script: Verificar Expiração de Certificados</h3>
        <CodeBlock language="batch" title="cert-check.bat — Alertar sobre certs expirando em 30 dias" code={`@echo off
  echo Verificando certificados expirando em 30 dias...
  echo.

  powershell -Command "
      \$limite = (Get-Date).AddDays(30)
      Get-ChildItem Cert:\LocalMachine\My | Where-Object {
          \$_.NotAfter -lt \$limite -and \$_.NotAfter -gt (Get-Date)
      } | ForEach-Object {
          Write-Host 'EXPIRANDO: ' \$_.Subject
          Write-Host '  Válido até: ' \$_.NotAfter
          Write-Host '  Thumbprint: ' \$_.Thumbprint
          Write-Host ''
      }
  "
  echo Verificação concluída.
  pause`} />

        <AlertBox type="warning" title="Segurança ao Usar CERTUTIL">
          O <code>certutil -urlcache</code> é frequentemente usado em ataques (LOLBin — Living Off the Land). Em ambientes corporativos, monitore seu uso via logs de eventos (Event ID 4688). Use apenas em contextos autorizados.
        </AlertBox>

        <AlertBox type="info" title="PKI Corporativa">
          Em ambientes com Active Directory, os certificados são distribuídos via Política de Grupo (GPO). Use <code>certutil -dspublish</code> para publicar certificados no AD e <code>certutil -dstemplate</code> para listar templates disponíveis na CA corporativa.
        </AlertBox>
      </PageContainer>
    );
  }