import { NextRequest, NextResponse } from "next/server";
import { getPlanes, getPlanItems, planToRow, planItemToRow } from "@/lib/sheets";
import { appendRow } from "@/lib/sheets/client";
import { mockPlanes, mockPlanItems } from "@/lib/mock-data";
import { generateId } from "@/lib/utils";
import type { PlanSemanal } from "@/types";

export async function GET(req: NextRequest) {
  const pacienteId = req.nextUrl.searchParams.get("paciente_id");
  const incluirItems = req.nextUrl.searchParams.get("items") === "true";

  try {
    let planes = (await getPlanes()) ?? mockPlanes;
    const items = incluirItems ? ((await getPlanItems()) ?? mockPlanItems) : [];

    if (pacienteId) planes = planes.filter((p) => p.paciente_id === pacienteId);

    if (incluirItems) {
      const planesConItems = planes.map((plan) => ({
        ...plan,
        items: items.filter((i) => i.plan_id === plan.id),
      }));
      return NextResponse.json(planesConItems);
    }

    return NextResponse.json(planes);
  } catch {
    let planes = mockPlanes;
    if (pacienteId) planes = planes.filter((p) => p.paciente_id === pacienteId);
    return NextResponse.json(planes);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Omit<PlanSemanal, "id" | "created_at" | "updated_at">;
    const nuevo: PlanSemanal = {
      ...body,
      id: generateId(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await appendRow("Planes", planToRow(nuevo));

    // Guardar los items del plan si se incluyen
    if (body.items && body.items.length > 0) {
      for (const item of body.items) {
        const newItem = { ...item, id: generateId(), plan_id: nuevo.id };
        await appendRow("PlanItems", planItemToRow(newItem));
      }
    }

    return NextResponse.json(nuevo, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
