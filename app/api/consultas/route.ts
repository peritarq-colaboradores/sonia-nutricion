import { NextRequest, NextResponse } from "next/server";
import { getConsultas, consultaToRow } from "@/lib/sheets";
import { appendRow } from "@/lib/sheets/client";
import { mockConsultas } from "@/lib/mock-data";
import { generateId } from "@/lib/utils";
import type { Consulta } from "@/types";

export async function GET(req: NextRequest) {
  const pacienteId = req.nextUrl.searchParams.get("paciente_id");
  try {
    let data = (await getConsultas()) ?? mockConsultas;
    if (pacienteId) data = data.filter((c) => c.paciente_id === pacienteId);
    // Ordenar más reciente primero
    data = [...data].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    return NextResponse.json(data);
  } catch {
    let data = mockConsultas;
    if (pacienteId) data = data.filter((c) => c.paciente_id === pacienteId);
    return NextResponse.json(data);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Omit<Consulta, "id" | "created_at">;
    const nueva: Consulta = {
      ...body,
      id: generateId(),
      created_at: new Date().toISOString(),
    };
    await appendRow("Consultas", consultaToRow(nueva));
    return NextResponse.json(nueva, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
