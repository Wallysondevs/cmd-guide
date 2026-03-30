import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { Lock, Key, Shield, FileText } from "lucide-react";

export default function Certificados() {
  return (
    <PageContainer
      title="Certificados e CERTUTIL"
      subtitle="Gerencie certificados digitais, calcule hashes, codifique arquivos em Base64 e trabalhe com PKI pelo CMD."
      difficulty="avancado"
      timeToRead="25 min"
    >
      <h2><Lock className="inline-block mr-2 mb-1 w-5 h-5" /> CERTUTIL — Ferramenta de Certificados</h2>
      <p>O <code>CERTUTIL</code> é uma ferramenta nativa do Windows para gerenciar certificados, calcular hashes, codificar e decodificar arquivos — e muito mais.</p>

      <h3>Calcular Hash de Arquivos</h3>
      <p>Uma das funções mais populares do certutil é verificar integridade de arquivos:</p>
      <CodeBlock language="batch" title="Verificar integridade com hash" code={`:: Hash MD5
certutil -hashfile arquivo.iso MD5

:: Hash SHA1
certutil -hashfile arquivo.iso SHA1

:: Hash SHA256 (mais seguro, recomendado)
certutil -hashfile arquivo.iso SHA256

:: Hash SHA512
certutil -hashfile arquivo.iso SHA512

:: Verificar na prática:
certutil -hashfile download.exe SHA256
:: Compare o resultado com o hash divulgado pelo fabricante`} />

      <h3>Codificação Base64</h3>
      <CodeBlock language="batch" title="Codificar e decodificar Base64" code={`:: Codificar arquivo para Base64
certutil -encode arquivo.bin arquivo_base64.txt

:: Decodificar Base64 de volta para binário
certutil -decode arquivo_base64.txt arquivo_original.bin

:: Útil para transferir binários em e-mail ou scripts de texto`} />

      <h2><Key className="inline-block mr-2 mb-1 w-5 h-5" /> Gerenciar o Repositório de Certificados</h2>
      <CodeBlock language="batch" title="Listar e instalar certificados" code={`:: Listar certificados do usuário atual
certutil -store My

:: Listar certificados de autoridades confiáveis
certutil -store Root

:: Listar certificados de computador
certutil -store -enterprise My

:: Importar certificado (.cer) no repositório raiz
certutil -addstore Root certificado-raiz.cer

:: Importar PFX com senha
certutil -importpfx meu-cert.pfx

:: Exportar certificado
certutil -exportpfx -p "minha_senha" My \"NomeDoCert" saida.pfx`} />

      <h3>Verificar e Revogar Certificados</h3>
      <CodeBlock language="batch" title="Validar e verificar certificados" code={`:: Ver detalhes de um certificado
certutil -dump certificado.cer

:: Verificar se certificado foi revogado
certutil -verify certificado.cer

:: Verificar cadeia de confiança
certutil -verify -urlfetch certificado.cer

:: Ver CRL (Certificate Revocation List)
certutil -URL certificado.cer`} />

      <h2><Shield className="inline-block mr-2 mb-1 w-5 h-5" /> Usar CERTMGR — Interface Gráfica pelo CMD</h2>
      <CodeBlock language="batch" title="Abrir gerenciadores de certificado" code={`:: Certificados do usuário atual
certmgr.msc

:: Certificados do computador (requer admin)
:: Executar mmc → Arquivo → Adicionar Snap-in → Certificados

:: Ver via PowerShell (mais detalhado):
:: Get-ChildItem Cert:\\LocalMachine\\My | Format-List *`} />

      <h2><FileText className="inline-block mr-2 mb-1 w-5 h-5" /> CERTREQ — Solicitar Certificados</h2>
      <CodeBlock language="batch" title="Criar e enviar requisição de certificado" code={`:: Criar arquivo de configuração (.inf)
:: Salvar como request.inf:
::   [Version]
::   Signature="$Windows NT$"
::   [NewRequest]
::   Subject = "CN=meu.servidor.com,O=Empresa,C=BR\"
::   KeyLength = 2048
::   KeyAlgorithm = RSA
::   MachineKeySet = True
::   RequestType = PKCS10

:: Gerar requisição de certificado
certreq -new request.inf request.csr

:: Enviar para CA interna
certreq -submit -config "server\\CA" request.csr

:: Aceitar certificado emitido
certreq -accept certificado.cer`} />

      <AlertBox type="info" title="Dica: CERTUTIL como Downloader">
        O certutil pode ser usado para baixar arquivos (útil quando wget/curl não estão disponíveis):
        <CodeBlock language="batch" title="Baixar arquivo com certutil" code={`certutil -urlcache -split -f "https://exemplo.com/arquivo.exe" arquivo.exe`} />
        Nota: Este uso pode ser bloqueado por políticas de segurança corporativas.
      </AlertBox>

      <h3>Limpar Cache de Certificados</h3>
      <CodeBlock language="batch" title="Manutenção do cache PKI" code={`:: Ver cache de URLs
certutil -urlcache

:: Limpar cache PKI
certutil -urlcache *

:: Limpar cache específico
certutil -urlcache http://crl.empresa.com/crl.crl delete`} />
    </PageContainer>
  );
}