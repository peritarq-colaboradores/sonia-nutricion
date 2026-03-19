"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Save } from "lucide-react";
import { hoy } from "@/lib/utils";

interface ConsultaModalProps {
  pacienteId: string;
  open: boolean;
  onClose: () => void;
}

const ADHERENCIA_OPTS = [
  { value: "muy_buena", label: "Muy buena" },
  { value: "buena",     label: "Buena" },
  { value: "regular",   label: "Regular" },
  { value: "baja",      label: "Baja" },
  { value: "muy_baja",  label: "Muy baja" },
];

const ENERGIA_OPTS = [
  { value: "muy_buena", label: "Muy buena" },
  { value: "buena",     label: "Buena" },
  { value: "normal",    label: "Normal" },
  { value: "baja",      label: "Baja" },
  { value: "muy_baja",  label: "Muy baja" },
];

export default function ConsultaModal({ pacienteId: _pacienteId, open, onClose }: ConsultaModalProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fecha: hoy(),
    motivo: "",
    evolucion_anterior: "",
    adherencia: "buena",
    sintomas: "",
    energia: "normal",
    hambre_saciedad: "",
    observaciones: "",
    cambios_acordados: "",
    notas_privadas: "",
    conclusion: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Nueva consulta"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button loading={loading} icon={<Save className="w-4 h-4" />} onClick={handleSave}>
            Guardar consulta
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Fecha de consulta"
            type="date"
            value={form.fecha}
            onChange={(e) => update("fecha", e.target.value)}
            required
          />
          <Select
            label="Adherencia"
            options={ADHERENCIA_OPTS}
            value={form.adherencia}
            onChange={(e) => update("adherencia", e.target.value)}
          />
        </div>

        <Input
          label="Motivo de consulta"
          value={form.motivo}
          onChange={(e) => update("motivo", e.target.value)}
          placeholder="Ej: Revisión mensual, ajuste de pauta..."
        />

        <Textarea
          label="Evolución desde la última consulta"
          value={form.evolucion_anterior}
          onChange={(e) => update("evolucion_anterior", e.target.value)}
          placeholder="Cambios observados, peso, comentarios del paciente..."
          rows={2}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Nivel de energía"
            options={ENERGIA_OPTS}
            value={form.energia}
            onChange={(e) => update("energia", e.target.value)}
          />
          <Textarea
            label="Hambre / Saciedad"
            value={form.hambre_saciedad}
            onChange={(e) => update("hambre_saciedad", e.target.value)}
            placeholder="Cómo gestiona el hambre..."
            rows={1}
          />
        </div>

        <Textarea
          label="Síntomas"
          value={form.sintomas}
          onChange={(e) => update("sintomas", e.target.value)}
          placeholder="Síntomas reportados..."
          rows={2}
        />

        <Textarea
          label="Observaciones"
          value={form.observaciones}
          onChange={(e) => update("observaciones", e.target.value)}
          placeholder="Observaciones de la consulta..."
          rows={2}
        />

        <Textarea
          label="Cambios acordados"
          value={form.cambios_acordados}
          onChange={(e) => update("cambios_acordados", e.target.value)}
          placeholder="Qué se cambia o ajusta en la pauta..."
          rows={2}
        />

        <Textarea
          label="Conclusión de la consulta"
          value={form.conclusion}
          onChange={(e) => update("conclusion", e.target.value)}
          placeholder="Resumen y conclusión principal..."
          rows={2}
        />

        <Textarea
          label="Notas privadas"
          value={form.notas_privadas}
          onChange={(e) => update("notas_privadas", e.target.value)}
          placeholder="Notas solo visibles para ti..."
          rows={2}
          hint="Estas notas no aparecerán en ningún informe para el paciente."
        />
      </div>
    </Modal>
  );
}
