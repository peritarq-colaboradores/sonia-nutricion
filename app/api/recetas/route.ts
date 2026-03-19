import { NextRequest, NextResponse } from "next/server";
import { getRecetas, recetaToRow } from "@/lib/sheets";
import { appendRow } from "@/lib/sheets/client";
import { mockRecetas } from "@/lib/mock-data";
import { generateId } from "@/lib/utils";
import type { Receta } from "@/types";

export async function GET() {
  try {
    const data = (await getRecetas()) ?? mockRecetas;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(mockRecetas);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Omit<Receta, "id" | "created_at" | "updated_at">;
    const nueva: Receta = {
      ...body,
      id: generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await appendRow("Recetas", recetaToRow(nueva));
    return NextResponse.json(nueva, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
