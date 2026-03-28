import { Menu, Terminal, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border h-14 flex items-center px-4 gap-4">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        aria-label="Abrir menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2 lg:hidden">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
          <Terminal className="w-4 h-4 text-primary" />
        </div>
        <span className="font-bold text-sm">CMD Guide</span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <span className="text-xs text-muted-foreground hidden sm:block font-mono">
          C:\&gt; <span className="text-primary animate-pulse">_</span>
        </span>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Alternar tema"
          title={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
      </div>
    </header>
  );
}
