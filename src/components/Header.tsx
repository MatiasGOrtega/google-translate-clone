function Chrome() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-chrome"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
export function Header() {
  return (
    <header className="bg-background border-b px-4 md:px-6 flex items-center h-16 shadow-sm">
        <a href="#" className="flex items-center justify-center gap-4">
            <Chrome />
            <span className="text-xl">Google Translate</span>
        </a>
    </header>
  );
}
