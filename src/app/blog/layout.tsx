export default function BlogLayout({
  children,
  sidebar,
  profile,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  profile: React.ReactNode;
}) {
  const isLoggedIn = true;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 p-4 border-r">{sidebar}</aside>
      <main className="flex-1 p-6">{children}</main>
      {isLoggedIn && <aside className="w-64 p-4 border-l">{profile}</aside>}
    </div>
  );
}
