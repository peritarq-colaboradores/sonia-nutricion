import { NextRequest, NextResponse } from "next/server";
import { getPacientes, getBalonGastrico, pacienteToRow } from "@/lib/sheets";
import { appendRow } from "@/lib/sheets/client";
import { mockPacientes, mockBalonGastrico } from "@/lib/mock-data";
import { generateId, hoy } from "@/lib/utils";
import type { Paciente } from "@/types";

export async function GET(req: NextRequest) {
  const tipo = req.nextUrl.searchParams.get("tipo");

  try {
    if (tipo === "balon") {
      const data = (await getBalonGastrico()) ?? mockBalonGastrico;
      return NextResponse.json(data);
    }
    const data = (await getPacientes()) ?? mockPacientes;
    return NextResponse.json(data);
  } catch {
    const data = tipo === "balon" ? mockBalonGastrico : mockPacientes;
    return NextResponse.json(data);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Omit<Paciente, "id" | "created_at">;
    const nuevo: Paciente = {
      ...body,
      id: generateId(),
      created_at: new Date().toISOString(),
      fecha_alta: hoy(),
    };
    await appendRow("Pacientes", pacienteToRow(nuevo));
    return NextResponse.json(nuevo, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
