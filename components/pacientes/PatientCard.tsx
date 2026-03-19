"use client";

import Link from "next/link";
import { Phone, Mail, Calendar, ChevronRight, Circle } from "lucide-react";
import type { Paciente } from "@/types";
import { formatFecha, calcularEdad, getIniciales } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface PatientCardProps {
  paciente: Paciente;
}

export default function PatientCard({ paciente }: PatientCardProps) {
  const edad = calcularEdad(paciente.fecha_nacimiento);
  const iniciales = getIniciales(paciente.nombre, paciente.apellidos);

  return (
    <Link href={`/pacientes/${paciente.id}`}>
      <div className="bg-white rounded-2xl border border-warm-100 shadow-card p-5
                      hover:shadow-card-hover transition-all duration-200 group cursor-pointer">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-11 h-11 rounded-xl bg-sage-100 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-sage-600">{iniciales}</span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="font-semibold text-warm-900 text-sm truncate group-hover:text-sage-700 transition-colors">
                {paciente.nombre} {paciente.apellidos}
              </h3>
              <ChevronRight className="w-4 h-4 text-warm-300 flex-shrink-0 group-hover:text-sage-500 transition-colors" />
            </div>

            <p className="text-xs text-warm-500 mb-2 truncate">
              {edad} años · {paciente.objetivo_principal || "Sin objetivo definido"}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {paciente.tiene_balon_gastrico && (
                <Badge variant="terra">Balón gástrico</Badge>
              )}
              {paciente.patologias && (
                <Badge variant="warm" className="truncate max-w-32">
                  {paciente.patologias.split(",")[0].trim()}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-warm-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Alta: {formatFecha(paciente.fecha_alta)}
              </span>
              {paciente.telefono && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {paciente.telefono}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Estado activo */}
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-warm-50">
          <Circle
            className={`w-2 h-2 ${paciente.activo ? "fill-sage-400 text-sage-400" : "fill-warm-300 text-warm-300"}`}
          />
          <span className="text-xs text-warm-400">
            {paciente.activo ? "Paciente activo" : "Paciente inactivo"}
          </span>
        </div>
      </div>
    </Link>
  );
}
