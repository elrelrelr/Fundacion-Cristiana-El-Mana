# Revisión de contenido y conservación

## Fuente y alcance

Se trabajó sobre el repositorio `elrelrelr/Fundaci-n-Cristiana-El-Man-`, commit `414e3a91c88d486da328dd0fd19f6e142e9e3661`, el sitio público y las recomendaciones suministradas por el propietario.

El documento de recomendaciones asumía varias páginas de psicología que no correspondían al catálogo real. Se priorizaron los **18 programas que sí aparecían enlazados**. No se agregaron ofertas de psicología clínica, organizacional o social, ni maestrías clínicas, sin una oferta institucional que las respaldara.

## Fichas que ya existían

| Ruta conservada | Contenido conservado | Duración publicada |
|---|---|---|
| `psicologia.html` | Curso especializado en Psicología Cognitiva: introducción, percepción, memoria y lenguaje; 4/5/6/5 lecciones | Los módulos suman 8 h; no se usa como duración de carrera |
| `PNL.html` | Básico, intermedio, avanzado y experto; temas originales | 550 h, aproximadamente 11 meses |
| `InclusionEducativaYNeurodiversidad.html` | Cuatro fases con sus temas originales | 240 h, cuatro niveles de 60 h |
| `Gerontologia.html` | Cuatro niveles, dimensiones del envejecimiento, políticas e investigación | 750 h, aproximadamente 19 meses |
| `Psiconeuroinmunologia.html` | Cuatro niveles, fisiología, interacciones, escenarios e investigación | 160 h, aproximadamente 4–6 meses |
| `SexologiaYTerapiaSexual.html` | Fundamentos, educación, clínica e investigación | 640 h, aproximadamente 16 meses |

Las fechas y la vigencia de esas intensidades requieren confirmación. El repositorio no contenía precios publicados en las fichas, aunque tenía estilos y un título que mencionaban pagos: **no se agregaron valores ni botones de cobro**.

## Fichas faltantes completadas

- `pedagogia.html`: Licenciatura en Pedagogía.
- `teologia.html`: Licenciatura en Teología.
- `enfermeria.html`: Técnica en Enfermería.
- `veterinaria.html`: Técnica en Veterinaria.
- `neuropsicologia-educacion.html`: Neuropsicología de la Educación.
- `psicologia-penitenciaria.html`: Psicología Penitenciaria.
- `psicologia-juridica.html`: Psicología Jurídica.
- `sexologia-terapia.html`: Sexología y Terapia.
- `nutricion-geriatrica.html`: Nutrición Geriátrica.
- `maestria-educacion.html`: Maestría en Educación.
- `maestria-teologia.html`: Maestría en Teología.
- `maestria-salud-publica.html`: Maestría en Salud Pública.

En ellas, las descripciones y ejes temáticos son **redacción editorial orientativa**, no una malla curricular aprobada. Las páginas lo indican. No se inventaron créditos, resoluciones, duración, costos, docentes, certificaciones ni cohortes.

## Qué debe confirmar la fundación

1. Denominación oficial y naturaleza de cada programa: curso, educación continuada, formación técnica, titulación, etc.
2. Entidad que certifica, autorizaciones aplicables, alcance y posibles requisitos para ejercer profesiones reguladas.
3. Perfil y documentos de ingreso; requisitos sanitarios y profesionales cuando corresponda.
4. Malla, intensidad, calendario, evaluaciones y prácticas; especialmente en enfermería y veterinaria.
5. Valores, convocatorias, disponibilidad y condiciones de becas del 50% al 75%.
6. Misión y visión revisadas, política institucional de tratamiento de datos y responsables legales.
7. Vigencia de los canales y del folleto institucional.

## Decisiones de veracidad

- Se evitó presentar un curso cognitivo como una carrera profesional de Psicología. Se conserva la ruta y el contenido original, con una aclaración visible.
- Se eliminaron de la redacción nueva las promesas de éxito garantizado, empleo o habilitación profesional automática.
- Se corrigió la afirmación sobre eficacia científicamente validada de la PNL: el contenido ahora explicita límites de evidencia y no la presenta como tratamiento clínico validado.
- Los contenidos de salud no sustituyen atención médica ni habilitan por sí mismos para diagnosticar, prescribir o intervenir clínicamente.
- La referencia institucional a las leyes 133 y 115 de 1994 se conserva sin presentarla como acreditación de cada programa.
- No se inventaron testimonios. Se incluyeron dos fotografías reales de comunidad y una invitación a solicitar referencias autorizadas para el programa.
- El original mezclaba «más de 15 años» y «20 años». Se conserva su historia narrativa sin convertir esa inconsistencia en un dato promocional o contador.
- No se creó un bloque de estadísticas. Los números de becas, módulos, años del archivo y conteos de resultados cumplen funciones informativas existentes, no métricas de resultados institucionales.
- No se copiaron del ejemplo SEO precios de cero pesos ni fechas de inicio ficticias/pasadas. El JSON-LD contiene únicamente datos básicos respaldados por el sitio.

## Recursos conservados

- Todas las imágenes originales permanecen sin modificación en `imagenes/`.
- Todas las fotos del carrusel siguen disponibles, incluidas 2016 y 2018.
- Los cinco videos anteriores y el video de Psicología usaban el mismo ID de YouTube. Se conserva ese ID como video enlazado originalmente, con carga bajo demanda y enlace alternativo. No se afirma haber verificado que sea un video específico para cada programa.
- Se conservan WhatsApp, Facebook, YouTube, el correo, teléfono, sedes, logo, modo oscuro, búsqueda, carrusel, cohete y reverso de la moneda de WhatsApp. Las animaciones se simplificaron y pueden pausarse.
- El PDF se recuperó del enlace público de Drive que ya estaba en el pie y se guardó íntegro en `documentos/folleto-institucional.pdf`. **No es un folleto actualizado**: puede contener cifras o afirmaciones anteriores y debe revisarse por la institución. No se incorporaron esas cifras a la página.

## Respaldo

La versión inicial permanece en el historial Git, commit `414e3a91c88d486da328dd0fd19f6e142e9e3661`. Se retiró su ZIP duplicado para ahorrar espacio. `contenido-original.json` conserva una extracción de los textos y enlaces de las páginas originales. Las implementaciones antiguas de navegación y estilo se reemplazaron por componentes nativos compartidos; no se borraron los originales gráficos ni los temas académicos para conseguir el rediseño.
