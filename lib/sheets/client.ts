// Google Sheets desactivado — la app usa datos mock en modo demo.
// Para activar Sheets en el futuro, configurar las variables de entorno.
export function getSheetsClient() {
  return null;
}

// Stubs — en modo demo todo devuelve vacío/null
export async function readSheet(_sheetName: string): Promise<string[][]> { return [] }
export async function appendRow(_sheetName: string, _values: unknown[]): Promise<void> { return }
export async function updateRowById(_sheetName: string, _id: string, _values: unknown[]): Promise<void> { return }
