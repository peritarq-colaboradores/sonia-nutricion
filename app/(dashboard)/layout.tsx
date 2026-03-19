"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-warm-50">
      {/* Overlay móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 md:ml-64 overflow-y-auto w-full min-w-0">
        {/* Botón hamburguesa — solo móvil */}
        <button
          className="md:hidden fixed top-3.5 left-4 z-30 w-9 h-9 rounded-xl bg-white border border-warm-200 flex items-center justify-center shadow-sm"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-4 h-4 text-warm-600" />
        </button>

        {children}
      </main>
    </div>
  );
}
