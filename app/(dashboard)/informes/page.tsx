"use client";

import Link from "next/link";
import { FileText, Printer } from "lucide-react";
import Header from "@/components/layout/Header";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { mockPacientes } from "@/lib/mock-data/pacientes";
import { mockPlanes } from "@/lib/mock-data/planes";
import { mockConsultas } from "@/lib/mock-data/consultas";
import { formatFecha } from "@/lib/utils";

export default function InformesPage() {
  // Generar informes disponibles por cada paciente activo
  const informesDisponibles = mockPacientes
    .filter((p) => p.activo)
    .map((paciente) => {
      const ultimaConsulta = mockConsultas
        .filter((c) => c.paciente_id === paciente.id)
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0];
      const planActivo = mockPlanes.find((p) => p.paciente_id === paciente.id && p.activo);
      return { paciente, ultimaConsulta, planActivo };
    });

  return (
    <div className="animate-fade-in">
      <Header
        title="Informes y documentos"
        subtitle="Genera y comparte informes con tus pacientes"
      />

      <div className="px-6 py-6 space-y-4">
        <div className="bg-sage-50 border border-sage-200 rounded-xl px-5 py-4 mb-2">
          <p className="text-sm text-sage-800">
            <strong>Cómo compartir un informe:</strong> Genera el informe, revísalo, y usa el botón
            &quot;Imprimir / PDF&quot; para guardarlo como PDF o imprimirlo. Luego envíalo por email o WhatsApp.
          </p>
        </div>

        {informesDisponibles.map(({ paciente, ultimaConsulta, planActivo }) => (
          <Card key={paciente.id}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-sage-600">
                    {paciente.nombre.charAt(0)}{paciente.apellidos.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-warm-900">{paciente.nombre} {paciente.apellidos}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {paciente.tiene_balon_gastrico && <Badge variant="terra">Balón</Badge>}
                    {ultimaConsulta && (
                      <span className="text-xs text-warm-400">
                        Última consulta: {formatFecha(ultimaConsulta.fecha)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link href={`/informes/${paciente.id}/print`} target="_blank">
                  <Button variant="secondary" size="sm" icon={<Printer className="w-3.5 h-3.5" />}>
                    Informe seguimiento
                  </Button>
                </Link>
                {planActivo && (
                  <Link href={`/informes/${paciente.id}/print?plan=${planActivo.id}`} target="_blank">
                    <Button size="sm" icon={<FileText className="w-3.5 h-3.5" />}>
                      Plan semanal
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
