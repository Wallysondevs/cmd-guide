import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { HelpCircle, Info, Search, Book, HelpCircle as HelpIcon, Terminal } from "lucide-react";

export default function Ajuda() {
  return (
    <PageContainer 
      title="Obtendo Ajuda no CMD" 
      subtitle="O segredo dos mestres não é saber tudo, mas saber onde procurar."
      difficulty="iniciante"
      timeToRead="12 min"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-primary" />
          O Sufixo Mágico: /?
        </h2>
        <p>
          No Windows CMD, quase todo comando (interno ou externo) possui uma documentação embutida que pode ser acessada adicionando <code>/?</code> ao final do nome do comando.
        </p>
        <CodeBlock 
          code={`dir /?\ncopy /?\nshutdown /?`} 
          language="batch" 
          title="Invocando a ajuda rápida" 
        />
        <p className="mt-4">
          Isso exibirá:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Uma breve descrição do que o comando faz.</li>
          <li>A <strong>sintaxe</strong> correta (como montar a linha).</li>
          <li>A lista de todos os <strong>parâmetros</strong> (flags) disponíveis.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Interpretando a Sintaxe</h2>
        <p>A documentação do CMD usa uma notação padrão. Entendê-la poupará muito tempo:</p>
        <div className="bg-secondary/20 p-6 rounded-xl border border-border space-y-4">
          <div className="flex gap-3">
            <span className="font-mono text-primary font-bold">[texto]</span>
            <span>Itens entre colchetes são <strong>opcionais</strong>.</span>
          </div>
          <div className="flex gap-3">
            <span className="font-mono text-primary font-bold">{"<texto>"}</span>
            <span>Itens entre chaves angulares são <strong>obrigatórios</strong>. Você deve fornecer um valor.</span>
          </div>
          <div className="flex gap-3">
            <span className="font-mono text-primary font-bold">item1 | item2</span>
            <span>A barra vertical indica uma <strong>escolha</strong>. Use um ou outro, mas não ambos.</span>
          </div>
          <div className="flex gap-3">
            <span className="font-mono text-primary font-bold">...</span>
            <span>Reticências indicam que o item anterior pode ser <strong>repetido</strong> várias vezes.</span>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Book className="w-6 h-6 text-blue-400" />
          O Comando HELP
        </h2>
        <p>
          O comando <code>help</code> sozinho lista a maioria dos comandos disponíveis no sistema com uma descrição curta. É excelente para quando você sabe o que quer fazer, mas esqueceu o nome do comando.
        </p>
        <CodeBlock code={`help`} language="batch" title="Listar comandos do sistema" />
        <p className="mt-4">
          Você também pode usar <code>help nome_do_comando</code>, que geralmente produz o mesmo resultado que <code>nome_do_comando /?</code>.
        </p>
        <CodeBlock code={`help format`} language="batch" />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Flags Comuns em Muitos Comandos</h2>
        <p>Existem alguns padrões que a Microsoft seguiu ao longo das décadas. Muitas flags se repetem em comandos diferentes:</p>
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-secondary/50">
                <th className="border border-border p-3 text-left">Flag</th>
                <th className="border border-border p-3 text-left">Significado Comum</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border p-3 font-mono">/S</td>
                <td className="border border-border p-3">Subdiretórios (Recursivo). Executa a ação na pasta atual e em todas as pastas dentro dela.</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-mono">/Q</td>
                <td className="border border-border p-3">Quiet (Silencioso). Não pede confirmação ("Tem certeza? S/N").</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-mono">/F</td>
                <td className="border border-border p-3">Force (Forçar) ou Full (Completo), dependendo do contexto.</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-mono">/Y</td>
                <td className="border border-border p-3">Yes (Sim). Responde automaticamente "Sim" para qualquer pergunta de sobrescrita.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <AlertBox type="danger" title="Atenção com /Q e /Y">
        Use as flags de silenciamento com extremo cuidado, especialmente em comandos como <code>del</code> ou <code>rd</code>. Elas removem a rede de segurança que o Windows oferece contra exclusões acidentais.
      </AlertBox>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Search className="w-6 h-6 text-green-400" />
          Onde encontrar mais ajuda?
        </h2>
        <p>
          O sistema de ajuda local do CMD é offline e às vezes resumido. Para documentação completa e exemplos avançados, os melhores lugares são:
        </p>
        <ul className="list-disc pl-6 space-y-4 mt-4">
          <li>
            <strong>Microsoft Learn (antigo Docs):</strong> A fonte oficial. Pesquise por "Windows Commands" no Google.
          </li>
          <li>
            <strong>SS64.com:</strong> Considerada a "bíblia" da linha de comando por muitos administradores. Explica cada comando com detalhes técnicos profundos.
          </li>
          <li>
            <strong>Stack Overflow:</strong> Para resolver erros específicos ou lógicas complexas de script Batch.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Exemplo Prático: Descobrindo o XCOPY</h2>
        <p>Imagine que você quer copiar apenas arquivos novos. Como descobrir a flag certa?</p>
        <CodeBlock 
          code={`xcopy /?\n\nREM Ao ler a saída, você encontrará:\nREM /D:m-d-y   Copia arquivos alterados na data especificada ou após.\nREM            Se nenhuma data for fornecida, copia apenas se a origem\nREM            for mais nova que o destino.`} 
          language="batch" 
          title="Processo de descoberta" 
        />
      </section>

      <AlertBox type="info" title="Dica Profissional">
        Muitos comandos modernos do Windows (como o <code>netsh</code> ou <code>wmic</code>) têm sistemas de ajuda contextuais próprios. Tente <code>netsh help</code> ou <code>wmic /?</code> para ver como eles se comportam de forma diferente.
      </AlertBox>

      <section className="mt-16 pt-8 border-t border-border flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold mb-2">Já sabe como se virar?</h3>
          <p className="text-muted-foreground text-sm">Aprenda sobre as variáveis que tornam o sistema dinâmico.</p>
        </div>
        <Link href="/variaveis">
          <a className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition-opacity">
            Variáveis de Ambiente <Terminal className="w-5 h-5" />
          </a>
        </Link>
      </section>
    </PageContainer>
  );
}
