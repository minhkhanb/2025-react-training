export default function DashBoardLayout({
  children,
  team,
  analytics,
  admin,
  user,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  const role = 'admin';
  return (
    <>
      {children}
      {team}
      {analytics}
      {role !== 'admin' ? admin : user}
    </>
  );
}
