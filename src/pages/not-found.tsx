import { Link } from "wouter";
import { Terminal, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="mb-6 p-4 bg-primary/10 rounded-2xl">
        <Terminal className="w-12 h-12 text-primary mx-auto" />
      </div>
      <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Página não encontrada</h2>
      <p className="text-muted-foreground mb-2 font-mono text-sm">
        O sistema não encontrou o arquivo especificado.
      </p>
      <p className="text-muted-foreground mb-8 font-mono text-sm text-primary/70">
        ERRORLEVEL 1
      </p>
      <Link href="/">
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-opacity">
          <Home className="w-4 h-4" /> Voltar ao Início
        </button>
      </Link>
    </div>
  );
}
