"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Printer, Download, Share2, Copy, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { mockPacientes } from "@/lib/mock-data/pacientes";
import { mockConsultas } from "@/lib/mock-data/consultas";
import { mockMediciones } from "@/lib/mock-data/mediciones";
import { mockPlanes, mockPlanItems } from "@/lib/mock-data/planes";
import { mockRecetas } from "@/lib/mock-data/recetas";
import {
  formatFecha, calcularEdad, clasificarIMC,
  DIAS_SEMANA_LABEL, MOMENTO_LABEL, ADHERENCIA_LABEL, NIVEL_ACTIVIDAD_LABEL
} from "@/lib/utils";
import type { DiaSemana, MomentoComida } from "@/types";

const DIAS: DiaSemana[] = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"];
const MOMENTOS: MomentoComida[] = ["desayuno","media_manana","comida","merienda","cena"];

export default function PrintPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const pacienteId = params.id as string;
  const planId = searchParams.get("plan");
  const tipo = searchParams.get("tipo") || "seguimiento";

  const [copied, setCopied] = useState(false);

  const paciente = mockPacientes.find((p) => p.id === pacienteId);
  const consultas = mockConsultas
    .filter((c) => c.paciente_id === pacienteId)
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  const mediciones = mockMediciones
    .filter((m) => m.paciente_id === pacienteId)
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  const plan = planId ? mockPlanes.find((p) => p.id === planId) : mockPlanes.find((p) => p.paciente_id === pacienteId && p.activo);
  const planItems = plan ? mockPlanItems.filter((i) => i.plan_id === plan.id) : [];

  const ultimaConsulta = consultas[0];
  const ultimaMedicion = mediciones[0];
  const medicionAnterior = mediciones[1];

  const handlePrint = () => window.print();
  const handleCopy = async () => {
    if (!paciente) return;
    const texto = generarTextoCompartible();
    await navigator.clipboard.writeText(texto);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generarTextoCompartible = () => {
    if (!paciente) return "";
    let texto = `INFORME NUTRICIONAL — ${paciente.nombre} ${paciente.apellidos}\n`;
    texto += `Fecha: ${formatFecha(new Date().toISOString())}\n\n`;
    if (ultimaConsulta) {
      texto += `ÚLTIMA CONSULTA (${formatFecha(ultimaConsulta.fecha)})\n`;
      texto += `${ultimaConsulta.conclusion || ""}\n\n`;
      if (ultimaConsulta.cambios_acordados) {
        texto += `Cambios acordados: ${ultimaConsulta.cambios_acordados}\n\n`;
      }
    }
    if (plan) {
      texto += `PLAN SEMANAL: ${plan.nombre}\n`;
      DIAS.forEach((dia) => {
        const items = planItems.filter((i) => i.dia === dia);
        if (items.length > 0) {
          texto += `\n${DIAS_SEMANA_LABEL[dia].toUpperCase()}\n`;
          items.forEach((item) => {
            const receta = item.receta_id ? mockRecetas.find((r) => r.id === item.receta_id) : null;
            texto += `  ${MOMENTO_LABEL[item.momento]}: ${receta?.titulo || item.descripcion_libre || ""}\n`;
          });
        }
      });
    }
    return texto;
  };

  if (!paciente) {
    return (
      <div className="p-8 text-center">
        <p className="text-warm-500">Paciente no encontrado.</p>
      </div>
    );
  }

  const edad = calcularEdad(paciente.fecha_nacimiento);

  return (
    <>
      {/* Barra de herramientas — solo pantalla, no impresión */}
      <div className="no-print fixed top-0 left-0 right-0 z-50 bg-warm-900/95 backdrop-blur-sm px-6 py-3 flex items-center justify-between">
        <div className="text-white">
          <p className="font-semibold text-sm">Vista de impresión</p>
          <p className="text-warm-400 text-xs">{paciente.nombre} {paciente.apellidos}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={copied ? <Check className="w-3.5 h-3.5 text-sage-500" /> : <Copy className="w-3.5 h-3.5" />}
            onClick={handleCopy}
          >
            {copied ? "Copiado" : "Copiar texto"}
          </Button>
          <Button
            size="sm"
            icon={<Printer className="w-3.5 h-3.5" />}
            onClick={handlePrint}
          >
            Imprimir / PDF
          </Button>
        </div>
      </div>

      {/* Documento de impresión */}
      <div className="print-container bg-white min-h-screen pt-16 px-8 py-8 print:pt-0 print:px-0 print:py-0 max-w-4xl mx-auto">

        {/* Encabezado */}
        <div className="print-header mb-8 pb-6 border-b-2 border-sage-500">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-sage-500 flex items-center justify-center print:bg-sage-500">
                  <span className="text-white font-bold text-xs">SN</span>
                </div>
                <div>
                  <p className="font-bold text-sage-700 text-sm">Sonia Nutrición</p>
                  <p className="text-warm-400 text-xs">Dietista-Nutricionista Colegiada</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-warm-400">Fecha de emisión</p>
              <p className="text-sm font-medium text-warm-800">{formatFecha(new Date().toISOString(), "d MMMM yyyy")}</p>
            </div>
          </div>

          <div className="mt-6">
            <h1 className="text-2xl font-bold text-warm-900">
              {planId ? `Plan Nutricional Semanal` : "Informe de Seguimiento Nutricional"}
            </h1>
            <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-sm text-warm-600">
              <span><strong>Paciente:</strong> {paciente.nombre} {paciente.apellidos}</span>
              <span><strong>Edad:</strong> {edad} años</span>
              {paciente.objetivo_principal && (
                <span><strong>Objetivo:</strong> {paciente.objetivo_principal}</span>
              )}
            </div>
          </div>
        </div>

        {/* Sección: Últimas mediciones */}
        {ultimaMedicion && (
          <div className="print-section mb-8">
            <h2 className="text-lg font-bold text-warm-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-sage-500 rounded-full inline-block" />
              Evolución — Últimas mediciones
            </h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-sage-50">
                  <th className="text-left px-4 py-2.5 font-semibold text-warm-700 border border-warm-200 rounded-l-lg">Parámetro</th>
                  <th className="text-center px-4 py-2.5 font-semibold text-warm-700 border border-warm-200">
                    {medicionAnterior ? formatFecha(medicionAnterior.fecha) : "Anterior"}
                  </th>
                  <th className="text-center px-4 py-2.5 font-semibold text-warm-700 border border-warm-200 bg-sage-100">
                    Actual ({formatFecha(ultimaMedicion.fecha)})
                  </th>
                  {medicionAnterior && (
                    <th className="text-center px-4 py-2.5 font-semibold text-warm-700 border border-warm-200">Cambio</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Peso (kg)", actual: ultimaMedicion.peso, anterior: medicionAnterior?.peso, invertir: true },
                  { label: "IMC", actual: ultimaMedicion.imc, anterior: medicionAnterior?.imc, invertir: true },
                  { label: "% Grasa corporal", actual: ultimaMedicion.porcentaje_grasa, anterior: medicionAnterior?.porcentaje_grasa, invertir: true },
                  { label: "Masa muscular (kg)", actual: ultimaMedicion.masa_muscular, anterior: medicionAnterior?.masa_muscular, invertir: false },
                  { label: "Perímetro cintura (cm)", actual: ultimaMedicion.perimetro_cintura, anterior: medicionAnterior?.perimetro_cintura, invertir: true },
                  { label: "Perímetro cadera (cm)", actual: ultimaMedicion.perimetro_cadera, anterior: medicionAnterior?.perimetro_cadera, invertir: true },
                ].filter((r) => r.actual).map((row, i) => {
                  const diff = row.anterior && row.actual ? +(row.actual - row.anterior).toFixed(1) : null;
                  const positivo = diff === null ? null : row.invertir ? diff < 0 : diff > 0;
                  return (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-warm-50"}>
                      <td className="px-4 py-2.5 font-medium text-warm-700 border border-warm-200">{row.label}</td>
                      <td className="text-center px-4 py-2.5 text-warm-500 border border-warm-200">
                        {row.anterior ?? "—"}
                      </td>
                      <td className="text-center px-4 py-2.5 font-semibold text-warm-900 border border-warm-200 bg-sage-50">
                        {row.actual}
                      </td>
                      {medicionAnterior && (
                        <td className={`text-center px-4 py-2.5 font-medium border border-warm-200 text-sm ${
                          positivo === true ? "text-sage-600" : positivo === false ? "text-red-500" : "text-warm-400"
                        }`}>
                          {diff !== null ? (diff > 0 ? `+${diff}` : `${diff}`) : "—"}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {ultimaMedicion.observaciones && (
              <p className="text-xs text-warm-500 mt-2 italic">{ultimaMedicion.observaciones}</p>
            )}
          </div>
        )}

        {/* Sección: Última consulta */}
        {ultimaConsulta && (
          <div className="print-section mb-8">
            <h2 className="text-lg font-bold text-warm-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-terra-400 rounded-full inline-block" />
              Última consulta — {formatFecha(ultimaConsulta.fecha, "d MMMM yyyy")}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {ultimaConsulta.evolucion_anterior && (
                <div className="print-card">
                  <p className="text-xs font-semibold text-warm-500 mb-1">Evolución</p>
                  <p className="text-sm text-warm-800">{ultimaConsulta.evolucion_anterior}</p>
                </div>
              )}
              {ultimaConsulta.cambios_acordados && (
                <div className="print-card border-l-4 border-l-sage-400">
                  <p className="text-xs font-semibold text-warm-500 mb-1">Cambios acordados</p>
                  <p className="text-sm text-warm-800">{ultimaConsulta.cambios_acordados}</p>
                </div>
              )}
              {ultimaConsulta.conclusion && (
                <div className="print-card border-l-4 border-l-terra-400">
                  <p className="text-xs font-semibold text-warm-500 mb-1">Conclusión</p>
                  <p className="text-sm text-warm-800">{ultimaConsulta.conclusion}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sección: Plan semanal */}
        {plan && (
          <div className="print-section mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-warm-900 flex items-center gap-2">
                  <span className="w-1 h-5 bg-blue-400 rounded-full inline-block" />
                  {plan.nombre}
                </h2>
                {plan.fecha_inicio && (
                  <p className="text-xs text-warm-400 mt-0.5">
                    Período: {formatFecha(plan.fecha_inicio)}
                    {plan.fecha_fin && ` — ${formatFecha(plan.fecha_fin)}`}
                  </p>
                )}
              </div>
              {plan.kcal_objetivo && (
                <div className="text-right">
                  <p className="text-lg font-bold text-sage-700">{plan.kcal_objetivo} kcal</p>
                  <p className="text-xs text-warm-400">objetivo diario</p>
                </div>
              )}
            </div>

            {plan.observaciones_generales && (
              <div className="bg-warm-50 rounded-xl px-4 py-3 mb-4 text-sm text-warm-700 border border-warm-200">
                <strong>Notas:</strong> {plan.observaciones_generales}
              </div>
            )}

            {/* Grid semanal */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="border border-warm-200 px-2 py-2 bg-warm-100 text-warm-600 w-24">Momento</th>
                    {DIAS.map((dia) => (
                      <th key={dia} className="border border-warm-200 px-2 py-2 bg-sage-50 text-sage-700 font-semibold">
                        {DIAS_SEMANA_LABEL[dia]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOMENTOS.map((momento, mi) => (
                    <tr key={momento} className={mi % 2 === 0 ? "bg-white" : "bg-warm-50"}>
                      <td className="border border-warm-200 px-2 py-2 font-medium text-warm-600">
                        {MOMENTO_LABEL[momento]}
                      </td>
                      {DIAS.map((dia) => {
                        const item = planItems.find((i) => i.dia === dia && i.momento === momento);
                        const receta = item?.receta_id ? mockRecetas.find((r) => r.id === item.receta_id) : null;
                        const contenido = receta?.titulo || item?.descripcion_libre;
                        return (
                          <td key={dia} className="border border-warm-200 px-2 py-2 text-warm-700 align-top">
                            {contenido || <span className="text-warm-200">—</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recomendaciones generales */}
        {paciente.observaciones_generales && (
          <div className="print-section mb-8">
            <h2 className="text-lg font-bold text-warm-900 mb-3 flex items-center gap-2">
              <span className="w-1 h-5 bg-warm-400 rounded-full inline-block" />
              Recomendaciones generales
            </h2>
            <div className="print-card">
              <p className="text-sm text-warm-800 whitespace-pre-line">{paciente.observaciones_generales}</p>
            </div>
          </div>
        )}

        {/* Pie de página */}
        <div className="mt-12 pt-6 border-t border-warm-200 flex items-end justify-between text-xs text-warm-400">
          <div>
            <p className="font-medium text-warm-600">Sonia — Dietista-Nutricionista</p>
            <p>Documento generado el {formatFecha(new Date().toISOString(), "d MMMM yyyy")}</p>
            <p className="mt-1 italic">
              Este documento es una herramienta de apoyo nutricional. No sustituye consulta médica.
            </p>
          </div>
          <div className="text-right">
            <p>Confidencial · Uso privado</p>
          </div>
        </div>

      </div>
    </>
  );
}
