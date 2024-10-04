export function Footer() {
  return (
    <footer className="bg-muted border-t px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <a href="https://github.com/MatiasGOrtega" className="text-sm hover:underline" target="_blank">
          My GitHub
        </a>
        <a href="https://github.com/MatiasGOrtega/google-translate-clone" className="text-sm hover:underline" target="_blank">
          Repo
        </a>
      </div>
      <p className="text-sm text-muted-foreground">
        &copy; 2024 Google Translate by Papulo. All rights reserved.
      </p>
    </footer>
  );
}