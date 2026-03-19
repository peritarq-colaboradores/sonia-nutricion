import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración para PWA y optimizaciones
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts"],
  },
};

export default nextConfig;
