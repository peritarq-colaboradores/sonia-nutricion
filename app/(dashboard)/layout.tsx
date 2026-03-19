import Sidebar from "@/components/layout/Sidebar";

// Layout compartido para todas las páginas del dashboard
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-warm-50">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="flex-1 ml-64 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
