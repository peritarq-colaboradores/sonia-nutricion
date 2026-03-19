"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { Save } from "lucide-react";
import { hoy, calcularIMC } from "@/lib/utils";

interface MedicionModalProps {
  pacienteId: string;
  open: boolean;
  onClose: () => void;
}

export default function MedicionModal({ pacienteId: _pacienteId, open, onClose }: MedicionModalProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fecha: hoy(),
    peso: "",
    altura: "",
    porcentaje_grasa: "",
    masa_muscular: "",
    agua_corporal: "",
    grasa_visceral: "",
    perimetro_cintura: "",
    perimetro_cadera: "",
    perimetro_abdomen: "",
    masa_osea: "",
    metabolismo_basal: "",
    edad_metabolica: "",
    observaciones: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const imcCalculado =
    form.peso && form.altura
      ? calcularIMC(parseFloat(form.peso), parseFloat(form.altura) / 100)
      : null;

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
      title="Registrar medición"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button loading={loading} icon={<Save className="w-4 h-4" />} onClick={handleSave}>
            Guardar medición
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        {/* Fecha y datos básicos */}
        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Fecha"
            type="date"
            value={form.fecha}
            onChange={(e) => update("fecha", e.target.value)}
            required
          />
          <Input
            label="Peso (kg)"
            type="number"
            step="0.1"
            value={form.peso}
            onChange={(e) => update("peso", e.target.value)}
            placeholder="70.5"
          />
          <Input
            label="Altura (cm)"
            type="number"
            value={form.altura}
            onChange={(e) => update("altura", e.target.value)}
            placeholder="165"
          />
        </div>

        {/* IMC calculado automáticamente */}
        {imcCalculado !== null && (
          <div className="bg-sage-50 border border-sage-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
            <span className="text-sm text-sage-700">
              IMC calculado: <strong>{imcCalculado}</strong>
            </span>
          </div>
        )}

        {/* Composición corporal */}
        <div>
          <p className="text-xs font-semibold text-warm-500 uppercase tracking-wider mb-3">
            Composición corporal
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Input label="% Grasa corporal" type="number" step="0.1" value={form.porcentaje_grasa} onChange={(e) => update("porcentaje_grasa", e.target.value)} placeholder="28.5" />
            <Input label="Masa muscular (kg)" type="number" step="0.1" value={form.masa_muscular} onChange={(e) => update("masa_muscular", e.target.value)} placeholder="44.0" />
            <Input label="Agua corporal (%)" type="number" step="0.1" value={form.agua_corporal} onChange={(e) => update("agua_corporal", e.target.value)} placeholder="50.0" />
            <Input label="Grasa visceral (nivel)" type="number" value={form.grasa_visceral} onChange={(e) => update("grasa_visceral", e.target.value)} placeholder="5" />
            <Input label="Masa ósea (kg)" type="number" step="0.1" value={form.masa_osea} onChange={(e) => update("masa_osea", e.target.value)} placeholder="2.5" />
            <Input label="Metabolismo basal (kcal)" type="number" value={form.metabolismo_basal} onChange={(e) => update("metabolismo_basal", e.target.value)} placeholder="1450" />
          </div>
        </div>

        {/* Perímetros */}
        <div>
          <p className="text-xs font-semibold text-warm-500 uppercase tracking-wider mb-3">
            Perímetros (cm)
          </p>
          <div className="grid grid-cols-3 gap-4">
            <Input label="Cintura" type="number" value={form.perimetro_cintura} onChange={(e) => update("perimetro_cintura", e.target.value)} placeholder="80" />
            <Input label="Cadera" type="number" value={form.perimetro_cadera} onChange={(e) => update("perimetro_cadera", e.target.value)} placeholder="98" />
            <Input label="Abdomen" type="number" value={form.perimetro_abdomen} onChange={(e) => update("perimetro_abdomen", e.target.value)} placeholder="86" />
          </div>
        </div>

        {/* Otros */}
        <div className="grid grid-cols-2 gap-4">
          <Input label="Edad metabólica" type="number" value={form.edad_metabolica} onChange={(e) => update("edad_metabolica", e.target.value)} placeholder="35" />
        </div>

        <Textarea
          label="Observaciones"
          value={form.observaciones}
          onChange={(e) => update("observaciones", e.target.value)}
          placeholder="Notas sobre la medición..."
          rows={2}
        />
      </div>
    </Modal>
  );
}
