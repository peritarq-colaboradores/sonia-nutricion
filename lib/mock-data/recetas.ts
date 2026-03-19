import type { Receta } from "@/types";

export const mockRecetas: Receta[] = [
  {
    id: "r1",
    titulo: "Bowl de yogur griego con frutas y semillas",
    descripcion: "Desayuno saciante, rico en proteínas y probióticos. Rápido de preparar.",
    ingredientes: `- 200g yogur griego natural (0% o 2%)
- 1 puñado de frutos rojos (frescos o congelados)
- 1 cdta de semillas de chía
- 1 cdta de semillas de lino molido
- 1 cdta de miel o dátiles picados (opcional)
- Canela al gusto`,
    pasos: `1. Verter el yogur en un bol amplio.
2. Añadir los frutos rojos por encima.
3. Espolvorear las semillas de chía y lino.
4. Añadir la miel si se desea.
5. Terminar con canela al gusto.`,
    tipo_comida: "desayuno",
    tiempo_estimado: 5,
    dificultad: "facil",
    etiquetas: ["alta_proteina", "saciante", "rapida", "sin_gluten", "apta_balon"],
    observaciones: "Ideal para pacientes con hipotiroidismo. Evitar el lino si hay problemas con estrógenos.",
    compatibilidades: "Apto balón en fases blanda/normal. Omitir semillas en fases iniciales.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r2",
    titulo: "Tortilla de espinacas y queso fresco",
    descripcion: "Cena ligera, rápida y muy nutritiva. Rica en proteína y hierro.",
    ingredientes: `- 2-3 huevos camperos
- 1 puñado generoso de espinacas frescas
- 50g queso fresco (tipo Burgos o mozzarella light)
- Sal, pimienta y orégano
- Aceite de oliva virgen extra`,
    pasos: `1. Saltear las espinacas en la sartén con un poco de AOVE 2 minutos.
2. Batir los huevos con sal y pimienta.
3. Añadir el queso fresco desmenuzado a los huevos.
4. Incorporar las espinacas a la mezcla.
5. Cocinar la tortilla a fuego medio, voltear cuando esté cuajada por debajo.`,
    tipo_comida: "cena",
    tiempo_estimado: 10,
    dificultad: "facil",
    etiquetas: ["alta_proteina", "rapida", "digestiva", "sin_gluten", "vegetariana", "apta_balon"],
    observaciones: "Perfecta para balón gástrico en fase blanda. Cocinar bien para facilitar digestión.",
    compatibilidades: "Apta para fase adaptación balón. Sin restricciones generales.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r3",
    titulo: "Lentejas con verduras (batch cooking)",
    descripcion: "Plato tradicional adaptado para batch cooking. Nutritivo, saciante y económico.",
    ingredientes: `- 250g lentejas pardinas o castellanas
- 1 zanahoria grande
- 1 puerro
- 2 dientes de ajo
- 1 tomate maduro
- 1/2 pimiento rojo
- Pimentón dulce, cúrcuma, laurel
- Aceite de oliva virgen extra, sal`,
    pasos: `1. Sofreír el ajo, puerro y pimiento en AOVE 5 min.
2. Añadir zanahoria en dados y tomate rallado. Cocinar 5 min más.
3. Incorporar las lentejas lavadas y cubrir con agua o caldo.
4. Añadir especias y laurel.
5. Cocer 25-30 min a fuego medio-bajo hasta que estén tiernas.
6. Rectificar de sal y dejar reposar.`,
    tipo_comida: "comida",
    tiempo_estimado: 45,
    dificultad: "facil",
    etiquetas: ["saciante", "batch_cooking", "baja_carga_glucemica", "antiinflamatoria", "vegetariana", "sin_gluten", "tupper", "economica"],
    observaciones: "Aguanta bien en nevera 4 días. Congelar en raciones.",
    compatibilidades: "No recomendada en fase inicial de balón. Ideal para pacientes con SOP.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r4",
    titulo: "Salmón al horno con verduras asadas",
    descripcion: "Plato completo, antiinflamatorio y muy fácil. Ideal para cualquier perfil.",
    ingredientes: `- 1 lomo de salmón por persona (150-180g)
- 1 calabacín
- 1 pimiento rojo y 1 pimiento verde
- 1 cebolla
- Limón, eneldo, ajo en polvo
- Aceite de oliva virgen extra, sal`,
    pasos: `1. Precalentar el horno a 200ºC.
2. Cortar todas las verduras en juliana y colocar en bandeja.
3. Aliñar las verduras con AOVE, sal y especias. Hornear 15 min.
4. Colocar el salmón encima de las verduras.
5. Exprimir medio limón y hornear 12-15 min más.`,
    tipo_comida: "comida",
    tiempo_estimado: 35,
    dificultad: "facil",
    etiquetas: ["alta_proteina", "antiinflamatoria", "sin_gluten", "sin_lacteos", "baja_carga_glucemica"],
    observaciones: "Omega-3 antiinflamatorio. Muy recomendado en SOP y menopausia.",
    compatibilidades: "Apto para balón en fase blanda/normal. Reducir tamaño para balón.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r5",
    titulo: "Crema de calabaza y jengibre",
    descripcion: "Crema suave, digestiva y muy saciante. Perfecta para cenas y primer plato.",
    ingredientes: `- 500g calabaza pelada
- 1 cebolla
- 1 diente de ajo
- 1 cm de jengibre fresco rallado (o 1/2 cdta en polvo)
- 400ml caldo de verduras
- Aceite de oliva, sal, pimienta
- Cúrcuma y nuez moscada (opcional)`,
    pasos: `1. Sofreír la cebolla y el ajo en AOVE 5 min.
2. Añadir la calabaza en dados y el jengibre.
3. Cubrir con caldo y cocinar 20 min hasta que esté tierna.
4. Añadir especias y triturar con batidora de mano.
5. Ajustar textura con más caldo si es necesario.`,
    tipo_comida: "cena",
    tiempo_estimado: 30,
    dificultad: "facil",
    etiquetas: ["digestiva", "apta_balon", "vegetariana", "sin_gluten", "sin_lacteos", "antiinflamatoria", "batch_cooking"],
    observaciones: "Ideal para balón gástrico en todas las fases. Muy digestiva.",
    compatibilidades: "Perfecta en fase líquida/semilíquida de balón. Suavizar jengibre si hay reflujo.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r6",
    titulo: "Pudding de chía con leche de avena",
    descripcion: "Snack o desayuno con preparación nocturna. Sin cocción.",
    ingredientes: `- 200ml leche de avena (o almendras)
- 3 cdas de semillas de chía
- 1 cdta de miel o sirope de agave
- Vainilla al gusto
- Frutas y granola para decorar`,
    pasos: `1. Mezclar la leche con las semillas de chía y la miel.
2. Remover bien y dejar 5 minutos.
3. Remover de nuevo para evitar grumos.
4. Refrigerar toda la noche (mínimo 4 horas).
5. Al servir, añadir fruta fresca y un poco de granola.`,
    tipo_comida: "snack",
    tiempo_estimado: 5,
    dificultad: "facil",
    etiquetas: ["saciante", "rapida", "vegetariana", "vegana", "sin_gluten", "pocos_ingredientes"],
    observaciones: "Preparar la noche anterior. Cambia los toppings para variar.",
    compatibilidades: "No apto en fase inicial balón por volumen de semillas.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r7",
    titulo: "Pollo al limón con quinoa",
    descripcion: "Plato completo, alto en proteína y muy versátil para tupper.",
    ingredientes: `- 150g pechuga o muslo de pollo sin piel
- 80g quinoa seca
- Zumo de 1 limón
- Ajo, romero, tomillo
- Aceite de oliva, sal
- Espinacas baby para acompañar`,
    pasos: `1. Macerar el pollo 30 min con limón, ajo y hierbas.
2. Cocinar la quinoa en doble volumen de agua 15 min.
3. Cocinar el pollo en sartén o grill hasta dorar.
4. Servir la quinoa con las espinacas baby y el pollo encima.
5. Aliñar con el jugo de la cocción del pollo.`,
    tipo_comida: "comida",
    tiempo_estimado: 30,
    dificultad: "facil",
    etiquetas: ["alta_proteina", "saciante", "sin_gluten", "tupper", "baja_carga_glucemica"],
    observaciones: "Excelente para batch cooking. La quinoa se puede preparar en cantidad.",
    compatibilidades: "Adaptar textura del pollo para balón (desmenuzar).",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r8",
    titulo: "Huevo pochado con aguacate y tostada integral",
    descripcion: "Desayuno completo, nutritivo y fácil. Muy popular y versátil.",
    ingredientes: `- 2 huevos
- 1/2 aguacate maduro
- 1-2 rebanadas de pan integral de calidad
- Sal, pimienta, zumo de limón
- Semillas de sésamo o hemp (opcional)
- Vinagre de manzana (para pochar)`,
    pasos: `1. Calentar agua con un chorrito de vinagre en un cazo pequeño.
2. Hacer un remolino con la cuchara y añadir el huevo.
3. Cocer 3-4 min según textura deseada.
4. Tostar el pan y extender el aguacate con sal y limón.
5. Colocar el huevo pochado encima y añadir semillas.`,
    tipo_comida: "desayuno",
    tiempo_estimado: 10,
    dificultad: "media",
    etiquetas: ["alta_proteina", "saciante", "vegetariana"],
    observaciones: "La grasa del aguacate aporta saciedad duradera.",
    compatibilidades: "No recomendado en fase inicial de balón. El pan dificulta digestión en balón.",
    created_at: "2024-01-01T00:00:00Z",
  },
  // ─── DESAYUNOS ADICIONALES ────────────────────────────────────────────────
  {
    id: "r9",
    titulo: "Tostadas de ricotta con fresas y miel",
    descripcion: "Desayuno ligero, fresco y muy apetecible. Listo en 5 minutos.",
    ingredientes: `- 2 rebanadas de pan de centeno o masa madre
- 80g ricotta fresca
- 6-8 fresas
- 1 cdta de miel
- Ralladura de limón
- Menta fresca (opcional)`,
    pasos: `1. Tostar el pan ligeramente.
2. Extender la ricotta generosamente.
3. Cortar las fresas y distribuirlas encima.
4. Añadir hilo de miel y ralladura de limón.
5. Decorar con menta si se desea.`,
    tipo_comida: "desayuno",
    tiempo_estimado: 5,
    dificultad: "facil",
    etiquetas: ["rapida", "vegetariana", "pocos_ingredientes"],
    observaciones: "Sustituir pan por crackers sin gluten si es necesario.",
    compatibilidades: "No apta en fase inicial de balón por la textura del pan.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r10",
    titulo: "Smoothie proteico de plátano y mantequilla de cacahuete",
    descripcion: "Batido denso, saciante y muy nutritivo. Ideal cuando no hay tiempo para cocinar.",
    ingredientes: `- 1 plátano maduro (puede ser congelado)
- 200ml leche semidesnatada o bebida vegetal
- 1 cda de mantequilla de cacahuete 100% natural
- 1 cda de proteína en polvo (opcional)
- 1 cdta de cacao puro
- Hielo al gusto`,
    pasos: `1. Poner todos los ingredientes en la batidora.
2. Triturar hasta obtener textura lisa.
3. Servir inmediatamente.`,
    tipo_comida: "desayuno",
    tiempo_estimado: 3,
    dificultad: "facil",
    etiquetas: ["alta_proteina", "saciante", "rapida", "sin_gluten", "pocos_ingredientes", "apta_balon"],
    observaciones: "Ajustar la leche para conseguir la textura deseada.",
    compatibilidades: "Ideal para balón desde fase líquida. Retirar la granola en fases iniciales.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r11",
    titulo: "Porridge de avena con manzana y canela",
    descripcion: "Desayuno caliente, reconfortante y muy digestivo. Ideal en invierno.",
    ingredientes: `- 60g copos de avena
- 250ml leche (o bebida vegetal)
- 1/2 manzana rallada
- 1 cdta de canela
- 1 cdta de miel
- Nueces o almendras para decorar`,
    pasos: `1. Calentar la leche en un cazo a fuego medio.
2. Añadir los copos de avena y remover.
3. Cocinar 5 minutos removiendo hasta espesar.
4. Incorporar la manzana rallada y la canela.
5. Servir con miel y frutos secos encima.`,
    tipo_comida: "desayuno",
    tiempo_estimado: 8,
    dificultad: "facil",
    etiquetas: ["saciante", "digestiva", "vegetariana", "baja_carga_glucemica", "apta_balon"],
    observaciones: "Usar copos de avena sin gluten certificados si hay sensibilidad.",
    compatibilidades: "Apta balón en fase blanda/normal. Cocinar más tiempo para textura más suave.",
    created_at: "2024-01-01T00:00:00Z",
  },
  // ─── COMIDAS ADICIONALES ─────────────────────────────────────────────────
  {
    id: "r12",
    titulo: "Merluza al vapor con patata y aceite de oliva",
    descripcion: "Plato suave, muy digestivo y fácil de preparar. Excelente para balón gástrico.",
    ingredientes: `- 180g merluza fresca o congelada
- 150g patata
- Aceite de oliva virgen extra
- Zumo de limón, perejil
- Sal`,
    pasos: `1. Cocer la patata en agua con sal 20 minutos.
2. Cocinar la merluza al vapor o en papillote 10-12 minutos.
3. Emplatar la patata chafada ligeramente.
4. Colocar la merluza encima.
5. Aliñar con AOVE, limón y perejil.`,
    tipo_comida: "comida",
    tiempo_estimado: 25,
    dificultad: "facil",
    etiquetas: ["alta_proteina", "digestiva", "apta_balon", "sin_gluten", "sin_lacteos", "baja_carga_glucemica"],
    observaciones: "Perfecta para todas las fases del balón gástrico.",
    compatibilidades: "Ideal desde fase blanda en adelante. Para fase líquida, triturar todo.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r13",
    titulo: "Arroz integral con pollo y verduras salteadas",
    descripcion: "Plato completo de tupper. Se prepara en 30 minutos y dura varios días.",
    ingredientes: `- 80g arroz integral
- 150g pechuga de pollo
- 1 calabacín
- 1 pimiento rojo
- 1 cebolla
- Ajo, pimentón, cúrcuma
- AOVE, sal`,
    pasos: `1. Cocer el arroz integral según instrucciones (30-35 min).
2. Cortar el pollo en dados y saltear con ajo 8 min.
3. Añadir las verduras en tiras y saltear 10 min más.
4. Mezclar con el arroz y sazonar.`,
    tipo_comida: "comida",
    tiempo_estimado: 40,
    dificultad: "facil",
    etiquetas: ["alta_proteina", "saciante", "sin_gluten", "tupper", "batch_cooking", "baja_carga_glucemica"],
    observaciones: "Conserva 4 días en nevera. Ideal para preparar en cantidad.",
    compatibilidades: "No recomendado en fases iniciales de balón.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r14",
    titulo: "Ensalada de garbanzos con atún y verduras",
    descripcion: "Ensalada completa y saciante sin necesidad de cocinar. Lista en 10 minutos.",
    ingredientes: `- 200g garbanzos cocidos (bote)
- 1 lata de atún al natural
- 1 tomate
- 1/2 pepino
- 1/4 cebolla morada
- Aceitunas negras
- AOVE, vinagre, sal`,
    pasos: `1. Escurrir y enjuagar los garbanzos.
2. Cortar todas las verduras en dados pequeños.
3. Mezclar todo en un bol.
4. Añadir el atún escurrido.
5. Aliñar con AOVE, vinagre y sal al gusto.`,
    tipo_comida: "comida",
    tiempo_estimado: 10,
    dificultad: "facil",
    etiquetas: ["alta_proteina", "saciante", "rapida", "sin_gluten", "sin_lacteos", "pocos_ingredientes"],
    observaciones: "Puede prepararse con antelación. Guardar el aliño aparte.",
    compatibilidades: "No apta en fases iniciales de balón gástrico.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r15",
    titulo: "Pasta integral con pesto de albahaca y pavo",
    descripcion: "Plato versátil y muy completo. El pesto casero marca la diferencia.",
    ingredientes: `- 80g pasta integral
- 120g pechuga de pavo en filete
- Para el pesto: albahaca fresca, piñones, ajo, AOVE, parmesano, sal`,
    pasos: `1. Cocer la pasta según instrucciones.
2. Triturar la albahaca con piñones, ajo, AOVE y parmesano.
3. Marcar el pavo en la sartén 3-4 min por lado.
4. Mezclar la pasta escurrida con el pesto.
5. Servir con el pavo en lonchas encima.`,
    tipo_comida: "comida",
    tiempo_estimado: 25,
    dificultad: "media",
    etiquetas: ["alta_proteina", "saciante", "tupper"],
    observaciones: "Usar pasta sin gluten si hay sensibilidad.",
    compatibilidades: "No apta en fases iniciales de balón.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r16",
    titulo: "Revuelto de champiñones, espinacas y gambas",
    descripcion: "Plato ligero y muy proteico. Listo en menos de 15 minutos.",
    ingredientes: `- 3 huevos
- 150g champiñones
- 1 puñado de espinacas
- 100g gambas peladas (frescas o descongeladas)
- Ajo, AOVE, sal, pimienta`,
    pasos: `1. Saltear el ajo picado en AOVE.
2. Añadir champiñones laminados y cocinar 5 min.
3. Incorporar las gambas y las espinacas 2 min más.
4. Batir los huevos con sal y añadir a la sartén.
5. Remover suavemente hasta cuajar a fuego bajo.`,
    tipo_comida: "comida",
    tiempo_estimado: 15,
    dificultad: "facil",
    etiquetas: ["alta_proteina", "rapida", "sin_gluten", "sin_lacteos", "baja_carga_glucemica", "apta_balon"],
    observaciones: "Muy versátil: sirve como comida ligera o cena.",
    compatibilidades: "Apto balón en fase blanda. Cocinar bien hasta textura muy tierna.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r17",
    titulo: "Ensalada tibia de quinoa, aguacate y pollo",
    descripcion: "Ensalada saciante y antiinflamatoria. Perfecta para llevar al trabajo.",
    ingredientes: `- 70g quinoa
- 120g pechuga de pollo a la plancha
- 1/2 aguacate
- Tomates cherry, rúcula
- AOVE, limón, sal
- Semillas de girasol`,
    pasos: `1. Cocer la quinoa en doble volumen de agua 15 min.
2. Hacer el pollo a la plancha con sal y pimienta.
3. Montar la ensalada con rúcula, quinoa templada y tomates.
4. Añadir el aguacate en láminas y el pollo en tiras.
5. Aliñar con AOVE y limón. Terminar con semillas.`,
    tipo_comida: "comida",
    tiempo_estimado: 25,
    dificultad: "facil",
    etiquetas: ["alta_proteina", "saciante", "antiinflamatoria", "sin_gluten", "sin_lacteos", "tupper", "baja_carga_glucemica"],
    observaciones: "Ideal para SOP y control glucémico.",
    compatibilidades: "No recomendada en fases iniciales de balón.",
    created_at: "2024-01-01T00:00:00Z",
  },
  // ─── CENAS ADICIONALES ───────────────────────────────────────────────────
  {
    id: "r18",
    titulo: "Sopa de pollo con verduras y fideos finos",
    descripcion: "Cena reconfortante, ligera y muy digestiva. Ideal en temporada fría.",
    ingredientes: `- 1 muslo de pollo sin piel
- 1 zanahoria
- 1 rama de apio
- 1/2 puerro
- 50g fideos finos
- Caldo de pollo casero o brick
- Perejil, sal`,
    pasos: `1. Cocer el pollo con las verduras en caldo 30 min.
2. Retirar el pollo, deshebrar y reservar.
3. Añadir los fideos al caldo 4-5 min.
4. Incorporar el pollo deshebrado.
5. Rectificar de sal y servir con perejil.`,
    tipo_comida: "cena",
    tiempo_estimado: 40,
    dificultad: "facil",
    etiquetas: ["digestiva", "apta_balon", "sin_lacteos", "batch_cooking"],
    observaciones: "Perfecta para cuando hay malestar digestivo o náuseas.",
    compatibilidades: "Excelente para todas las fases de balón gástrico. Retirar los fideos en fase líquida.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r19",
    titulo: "Lubina al horno con limón y hierbas",
    descripcion: "Cena proteica, ligera y con mucho sabor. Lista en 20 minutos.",
    ingredientes: `- 1 lubina entera o en filetes (200g)
- 1 limón en rodajas
- Tomillo, romero, ajo
- AOVE, sal, pimienta`,
    pasos: `1. Precalentar el horno a 200ºC.
2. Hacer cortes en el lomo de la lubina.
3. Introducir rodajas de limón y hierbas en los cortes.
4. Regar con AOVE y salpimentar.
5. Hornear 18-20 minutos.`,
    tipo_comida: "cena",
    tiempo_estimado: 25,
    dificultad: "facil",
    etiquetas: ["alta_proteina", "digestiva", "sin_gluten", "sin_lacteos", "baja_carga_glucemica", "apta_balon"],
    observaciones: "Muy recomendada en dietas para menopausia y SOP.",
    compatibilidades: "Apta balón en fase blanda/normal. Asegurarse de que esté bien tierna.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r20",
    titulo: "Crema fría de pepino y yogur (tzatziki adaptado)",
    descripcion: "Cena refrescante y muy ligera. Ideal en verano o cuando hace calor.",
    ingredientes: `- 1 pepino grande
- 200g yogur griego
- 1 diente de ajo pequeño
- Eneldo fresco o seco
- Zumo de limón, sal
- AOVE`,
    pasos: `1. Rallar el pepino y escurrir bien el agua.
2. Mezclar con el yogur, ajo picado y eneldo.
3. Añadir zumo de limón y sal.
4. Refrigerar 30 min antes de servir.
5. Terminar con hilo de AOVE.`,
    tipo_comida: "cena",
    tiempo_estimado: 10,
    dificultad: "facil",
    etiquetas: ["digestiva", "vegetariana", "sin_gluten", "rapida", "pocos_ingredientes", "baja_carga_glucemica"],
    observaciones: "Servir con crudités o crackers sin gluten.",
    compatibilidades: "Apta para balón en fases avanzadas.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r21",
    titulo: "Calabacín relleno de atún y tomate",
    descripcion: "Cena vistosa, ligera y muy nutritiva. Fácil de preparar con antelación.",
    ingredientes: `- 2 calabacines medianos
- 2 latas de atún al natural
- 2 tomates maduros
- 1/4 cebolla
- AOVE, orégano, sal`,
    pasos: `1. Partir los calabacines por la mitad y vaciar con cuchara.
2. Sofreír la cebolla y la pulpa del calabacín 5 min.
3. Mezclar con el atún, tomate picado y orégano.
4. Rellenar los calabacines con la mezcla.
5. Hornear a 180ºC 20 minutos.`,
    tipo_comida: "cena",
    tiempo_estimado: 35,
    dificultad: "facil",
    etiquetas: ["alta_proteina", "sin_gluten", "sin_lacteos", "baja_carga_glucemica", "antiinflamatoria"],
    observaciones: "Preparar con antelación y hornear al momento.",
    compatibilidades: "No recomendado en fases iniciales de balón.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r22",
    titulo: "Puré de zanahoria y naranja (para balón)",
    descripcion: "Puré suave con toque dulce natural. Ideal en fases de textura blanda.",
    ingredientes: `- 4 zanahorias
- Zumo de 1 naranja
- 1 trocito de jengibre
- Caldo de verduras
- AOVE, sal`,
    pasos: `1. Pelar y trocear las zanahorias.
2. Cocer en caldo con el jengibre 20 minutos.
3. Triturar añadiendo el zumo de naranja.
4. Ajustar textura con más caldo si es necesario.
5. Añadir un hilo de AOVE y sal.`,
    tipo_comida: "cena",
    tiempo_estimado: 30,
    dificultad: "facil",
    etiquetas: ["digestiva", "apta_balon", "vegetariana", "sin_gluten", "sin_lacteos", "antiinflamatoria"],
    observaciones: "Ideal para pacientes con balón gástrico o digestión delicada.",
    compatibilidades: "Perfecta desde fase semilíquida en adelante.",
    created_at: "2024-01-01T00:00:00Z",
  },
  // ─── SNACKS Y MEDIAS MAÑANAS ─────────────────────────────────────────────
  {
    id: "r23",
    titulo: "Manzana con mantequilla de almendra",
    descripcion: "Snack rápido, saciante y con muy buena combinación de azúcar y grasa.",
    ingredientes: `- 1 manzana
- 1-2 cdas mantequilla de almendra 100%
- Canela (opcional)`,
    pasos: `1. Lavar y cortar la manzana en gajos.
2. Servir junto a la mantequilla de almendra para dipear.
3. Espolvorear canela si se desea.`,
    tipo_comida: "snack",
    tiempo_estimado: 2,
    dificultad: "facil",
    etiquetas: ["saciante", "rapida", "vegetariana", "sin_gluten", "sin_lacteos", "pocos_ingredientes"],
    observaciones: "Buena opción para controlar el hambre emocional.",
    compatibilidades: "No apta en fase inicial de balón.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r24",
    titulo: "Kéfir con frutas del bosque y granola sin azúcar",
    descripcion: "Snack o desayuno ligero rico en probióticos. Muy beneficioso para el microbioma.",
    ingredientes: `- 200ml kéfir natural
- 80g frutas del bosque (arándanos, frambuesas)
- 2 cdas granola sin azúcar
- 1 cdta miel (opcional)`,
    pasos: `1. Verter el kéfir en un bol.
2. Añadir las frutas del bosque.
3. Cubrir con la granola.
4. Añadir miel si se desea.`,
    tipo_comida: "snack",
    tiempo_estimado: 3,
    dificultad: "facil",
    etiquetas: ["saciante", "rapida", "vegetariana", "sin_gluten", "pocos_ingredientes", "apta_balon"],
    observaciones: "Especialmente recomendado en pacientes con disbiosis o hinchazón.",
    compatibilidades: "Apto balón omitiendo la granola. Solo kéfir + fruta suave en fases iniciales.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r25",
    titulo: "Crackers de arroz con queso fresco y pepino",
    descripcion: "Snack muy fácil, sin cocción y perfectamente balanceado.",
    ingredientes: `- 4-5 crackers de arroz
- 60g queso fresco batido
- 1/2 pepino en rodajas
- Eneldo, sal, pimienta`,
    pasos: `1. Extender el queso fresco en cada cracker.
2. Colocar rodajas de pepino encima.
3. Sazonar con eneldo, sal y pimienta.`,
    tipo_comida: "snack",
    tiempo_estimado: 3,
    dificultad: "facil",
    etiquetas: ["rapida", "vegetariana", "sin_gluten", "pocos_ingredientes", "baja_carga_glucemica"],
    observaciones: "Muy útil como snack de tarde para evitar el picoteo.",
    compatibilidades: "Precaución con los crackers en fase inicial de balón.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r26",
    titulo: "Edamame al vapor con sal marina",
    descripcion: "Snack proteico japonés, muy saciante y nutritivo. Listo en 5 minutos.",
    ingredientes: `- 150g edamame congelado
- Sal marina gruesa`,
    pasos: `1. Cocer el edamame al vapor o en agua 5 minutos.
2. Escurrir y espolvorear con sal marina.
3. Servir caliente o templado.`,
    tipo_comida: "snack",
    tiempo_estimado: 5,
    dificultad: "facil",
    etiquetas: ["alta_proteina", "saciante", "rapida", "vegetariana", "sin_gluten", "sin_lacteos", "pocos_ingredientes"],
    observaciones: "Excelente fuente de proteína vegetal. Muy recomendado en SOP.",
    compatibilidades: "No apta en fases iniciales de balón.",
    created_at: "2024-01-01T00:00:00Z",
  },
  // ─── RECETAS ESPECIALES BALÓN GÁSTRICO ───────────────────────────────────
  {
    id: "r27",
    titulo: "Caldo casero de pollo y verduras (fase líquida)",
    descripcion: "Base esencial para la fase líquida del balón. Nutritivo y muy reconfortante.",
    ingredientes: `- 1 carcasa de pollo o contramuslos
- 2 zanahorias
- 1 rama de apio
- 1 puerro
- 1 cebolla
- Laurel, pimienta en grano
- Sal`,
    pasos: `1. Poner todos los ingredientes en una olla grande cubiertos de agua.
2. Llevar a ebullición y espumar.
3. Cocer a fuego bajo 45-60 minutos.
4. Colar el caldo y descartar los sólidos.
5. Rectificar de sal. Dejar enfriar y desgrasar si es necesario.`,
    tipo_comida: "comida",
    tiempo_estimado: 70,
    dificultad: "facil",
    etiquetas: ["digestiva", "apta_balon", "sin_gluten", "sin_lacteos", "batch_cooking"],
    observaciones: "Preparar en cantidad y congelar en porciones.",
    compatibilidades: "Indicado desde el primer día post-colocación. Fuente de electrolitos.",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "r28",
    titulo: "Natillas de vainilla caseras (sin azúcar)",
    descripcion: "Postre o merienda suave, fácil de tragar y proteico. Perfecto para balón.",
    ingredientes: `- 500ml leche semidesnatada
- 3 yemas de huevo
- 2 cdas de maicena
- Stevia o eritritol al gusto
- Vainilla en rama o extracto`,
    pasos: `1. Calentar la leche con la vainilla sin hervir.
2. Batir yemas con maicena y edulcorante.
3. Añadir la leche caliente poco a poco sin dejar de remover.
4. Cocinar a fuego bajo removiendo hasta espesar.
5. Servir en vasitos y dejar enfriar.`,
    tipo_comida: "snack",
    tiempo_estimado: 20,
    dificultad: "media",
    etiquetas: ["digestiva", "apta_balon", "vegetariana", "sin_gluten", "batch_cooking"],
    observaciones: "Sin azúcar añadido. Se conserva 3 días en nevera.",
    compatibilidades: "Ideal desde fase semilíquida en adelante. Muy tolerada.",
    created_at: "2024-01-01T00:00:00Z",
  },
];
