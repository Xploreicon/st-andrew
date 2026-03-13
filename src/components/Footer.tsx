import { Twitter, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-8 px-6 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 text-muted">
      <p className="text-sm">© 2026 Andrew.</p>
      <div className="flex items-center gap-4 mt-4 sm:mt-0">
        <a href="https://x.com/standrew0x" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
          <Twitter size={20} />
          <span className="sr-only">Twitter</span>
        </a>
        <a href="https://t.me/standrew0x" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
          <Send size={20} />
          <span className="sr-only">Telegram</span>
        </a>
      </div>
    </footer>
  );
}

