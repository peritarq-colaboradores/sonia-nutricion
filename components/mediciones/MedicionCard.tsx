import { Calendar, Scale } from "lucide-react";
import type { Medicion } from "@/types";
import { formatFecha, clasificarIMC } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface MedicionCardProps {
  medicion: Medicion;
  anterior?: Medicion;
  onClick?: () => void;
}

function Diferencia({ valor, anterior, unit = "", invertir = false }: {
  valor?: number;
  anterior?: number;
  unit?: string;
  invertir?: boolean;
}) {
  if (!valor || !anterior) return null;
  const diff = +(valor - anterior).toFixed(1);
  if (diff === 0) return null;
  const positivo = invertir ? diff < 0 : diff > 0;
  return (
    <span className={`text-xs ml-1 ${positivo ? "text-sage-500" : "text-terra-500"}`}>
      ({diff > 0 ? "+" : ""}{diff}{unit})
    </span>
  );
}

export default function MedicionCard({ medicion, anterior, onClick }: MedicionCardProps) {
  const imcInfo = medicion.imc ? clasificarIMC(medicion.imc) : null;

  return (
    <div
      className="bg-white rounded-xl border border-warm-100 p-4 hover:shadow-soft transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-3.5 h-3.5 text-warm-400" />
        <span className="text-xs font-medium text-warm-500">{formatFecha(medicion.fecha, "d MMMM yyyy")}</span>
        {imcInfo && (
          <Badge variant="warm" className="ml-auto">
            <span className={imcInfo.color}>{imcInfo.label}</span>
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {medicion.peso && (
          <div className="text-center p-2 bg-warm-50 rounded-lg">
            <p className="text-lg font-bold text-warm-900">
              {medicion.peso}
              <Diferencia valor={medicion.peso} anterior={anterior?.peso} unit="kg" invertir />
            </p>
            <p className="text-xs text-warm-400">Peso (kg)</p>
          </div>
        )}
        {medicion.imc && (
          <div className="text-center p-2 bg-warm-50 rounded-lg">
            <p className={`text-lg font-bold ${imcInfo?.color || "text-warm-900"}`}>
              {medicion.imc}
              <Diferencia valor={medicion.imc} anterior={anterior?.imc} invertir />
            </p>
            <p className="text-xs text-warm-400">IMC</p>
          </div>
        )}
        {medicion.porcentaje_grasa && (
          <div className="text-center p-2 bg-warm-50 rounded-lg">
            <p className="text-lg font-bold text-warm-900">
              {medicion.porcentaje_grasa}%
              <Diferencia valor={medicion.porcentaje_grasa} anterior={anterior?.porcentaje_grasa} unit="%" invertir />
            </p>
            <p className="text-xs text-warm-400">% Grasa</p>
          </div>
        )}
      </div>

      {medicion.observaciones && (
        <p className="text-xs text-warm-400 mt-2 truncate">{medicion.observaciones}</p>
      )}
    </div>
  );
}
