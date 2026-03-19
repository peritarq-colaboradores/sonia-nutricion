import { NextRequest, NextResponse } from "next/server";
import { getMediciones, medicionToRow } from "@/lib/sheets";
import { appendRow } from "@/lib/sheets/client";
import { mockMediciones } from "@/lib/mock-data";
import { generateId } from "@/lib/utils";
import type { Medicion } from "@/types";

export async function GET(req: NextRequest) {
  const pacienteId = req.nextUrl.searchParams.get("paciente_id");
  try {
    let data = (await getMediciones()) ?? mockMediciones;
    if (pacienteId) data = data.filter((m) => m.paciente_id === pacienteId);
    data = [...data].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    return NextResponse.json(data);
  } catch {
    let data = mockMediciones;
    if (pacienteId) data = data.filter((m) => m.paciente_id === pacienteId);
    return NextResponse.json(data);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Omit<Medicion, "id" | "created_at">;
    const nueva: Medicion = {
      ...body,
      id: generateId(),
      created_at: new Date().toISOString(),
    };
    await appendRow("Mediciones", medicionToRow(nueva));
    return NextResponse.json(nueva, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
