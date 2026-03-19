import { Calendar, MessageSquare, ChevronRight } from "lucide-react";
import type { Consulta } from "@/types";
import { formatFecha } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

const ADHERENCIA_COLOR: Record<string, "sage" | "terra" | "warm" | "yellow" | "red"> = {
  muy_buena: "sage",
  buena:     "sage",
  regular:   "yellow",
  baja:      "terra",
  muy_baja:  "red",
};

const ADHERENCIA_LABEL: Record<string, string> = {
  muy_buena: "Adherencia muy buena",
  buena:     "Buena adherencia",
  regular:   "Adherencia regular",
  baja:      "Baja adherencia",
  muy_baja:  "Adherencia muy baja",
};

interface ConsultaCardProps {
  consulta: Consulta;
  onClick?: () => void;
}

export default function ConsultaCard({ consulta, onClick }: ConsultaCardProps) {
  return (
    <div
      className="bg-white rounded-xl border border-warm-100 p-4 hover:shadow-soft transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center gap-1 text-xs text-warm-400">
              <Calendar className="w-3 h-3" />
              {formatFecha(consulta.fecha, "d MMMM yyyy")}
            </span>
            {consulta.adherencia && (
              <Badge variant={ADHERENCIA_COLOR[consulta.adherencia]}>
                {ADHERENCIA_LABEL[consulta.adherencia]}
              </Badge>
            )}
          </div>

          <h4 className="text-sm font-medium text-warm-800 mb-1 group-hover:text-sage-700 transition-colors">
            {consulta.motivo || "Consulta de seguimiento"}
          </h4>

          {consulta.conclusion && (
            <p className="text-xs text-warm-500 line-clamp-2 flex items-start gap-1">
              <MessageSquare className="w-3 h-3 mt-0.5 flex-shrink-0" />
              {consulta.conclusion}
            </p>
          )}
        </div>

        <ChevronRight className="w-4 h-4 text-warm-300 group-hover:text-sage-500 flex-shrink-0 transition-colors mt-0.5" />
      </div>
    </div>
  );
}
