// Catálogo basado en los enlaces del repositorio original (18 programas).
// Los contenidos nuevos son orientativos, no un plan académico aprobado.
// No publicar fechas, precios, acreditaciones o titulaciones sin verificarlos.
// CATEGORÍAS DEL MENÚ Y DEL CATÁLOGO.
// id es la clave interna; name es el nombre completo; short es la etiqueta corta; icon el dibujo.
export const categories = [
  {
    id: 'profesionales',
    name: 'Profesionales y técnicos',
    short: 'Profesionales',
    icon: 'graduation',
  },
  { id: 'especializaciones', name: 'Especializaciones', short: 'Especializaciones', icon: 'award' },
  { id: 'maestrias', name: 'Maestrías', short: 'Maestrías', icon: 'book' },
  { id: 'diplomados', name: 'Diplomados', short: 'Diplomados', icon: 'certificate' },
];
// Crea un módulo: título, explicación, temas y una nota opcional de horas o lecciones.
const module = (title, description, items, meta = '') => ({ title, description, items, meta });
// Texto para los datos que todavía debe confirmar admisiones.
const pending = 'Por confirmar con admisiones';
// PROGRAMAS. Cada objeto de la lista corresponde a una ficha y una tarjeta.
// id identifica el programa; file conserva su dirección; name y title son sus nombres.
// category elige el grupo; icon y tone cambian el dibujo y el color.
// tagline es la frase inicial; summary es el resumen de la tarjeta; description son los párrafos.
// objective explica el objetivo; profile enumera aprendizajes; audience indica a quién se dirige.
// requirements enumera requisitos; modules contiene los módulos; notice agrega una aclaración.
// duration y workload indican tiempo; durationNote aclara límites; original conserva datos previos.
// Los datos sin confirmar deben seguir marcados como pendientes, no se completan con suposiciones.
export const programs = [
  // Ficha: psicologia. Se publica en vistas/psicologia.html.
  {
    id: 'psicologia',
    file: 'psicologia.html',
    name: 'Psicología',
    title: 'Psicología Cognitiva',
    category: 'profesionales',
    icon: 'brain',
    tone: 'blue',
    tagline: 'Comprender la mente. Conectar con las personas.',
    summary:
      'Explora la percepción, la memoria y el lenguaje en nuestro curso especializado en Psicología Cognitiva.',
    original: true,
    duration: pending,
    workload: '8 horas de contenidos introductorios*',
    durationNote:
      '*Suma de los cuatro módulos publicados. No corresponde a la duración total del programa, que debe confirmar admisiones.',
    description: [
      'El Curso Especializado en Psicología Cognitiva propone un recorrido por los procesos mentales humanos, desde sus fundamentos históricos hasta sus aplicaciones contemporáneas. Integra conocimientos teóricos y actividades de análisis para comprender cómo percibimos, recordamos, aprendemos y nos comunicamos.',
      'Con un enfoque práctico, el contenido invita a relacionar los conceptos con situaciones educativas, sociales y de la vida cotidiana, siempre desde el respeto por las personas y la responsabilidad ética.',
    ],
    objective:
      'Comprender los fundamentos de los procesos cognitivos y desarrollar herramientas de análisis de la percepción, la atención, la memoria y el lenguaje.',
    profile: [
      'Reconocer los principales modelos de la cognición humana.',
      'Analizar situaciones de aprendizaje y comunicación desde una perspectiva cognitiva.',
      'Leer y discutir información académica, reconociendo los límites de la propia formación.',
    ],
    audience:
      'Personas interesadas en la psicología, estudiantes y profesionales que deseen aproximarse al estudio de la cognición.',
    requirements: [
      'Consultar con admisiones el nivel de formación previo requerido.',
      'Contar con acceso a internet y un dispositivo para las actividades virtuales.',
      'Disponer de tiempo para la lectura, el estudio autónomo y las actividades propuestas.',
    ],
    notice:
      'El enlace «Psicología» del catálogo original presenta este curso especializado en Psicología Cognitiva. Consulta la denominación, el alcance y la certificación antes de inscribirte; esta ficha no equivale a la oferta de un título profesional.',
    modules: [
      module(
        'Introducción',
        'Fundamentos y perspectivas históricas',
        [
          'Conceptos fundamentales',
          'Historia de la psicología cognitiva',
          'Estructura cognitiva humana',
        ],
        '4 lecciones · 1,5 h',
      ),
      module(
        'Percepción',
        'El proceso perceptual humano',
        ['Procesos bottom-up y top-down', 'Atención selectiva', 'Constancia perceptual'],
        '5 lecciones · 2 h',
      ),
      module(
        'Memoria',
        'Tipos, funciones y procesos',
        ['Memoria sensorial', 'Memoria de trabajo', 'Memoria a largo plazo'],
        '6 lecciones · 2,5 h',
      ),
      module(
        'Lenguaje',
        'Adquisición y uso del lenguaje',
        ['Bases neurológicas', 'Desarrollo del lenguaje', 'Comunicación efectiva'],
        '5 lecciones · 2 h',
      ),
    ],
  },
  // Ficha: pedagogia. Se publica en vistas/pedagogia.html.
  {
    id: 'pedagogia',
    file: 'pedagogia.html',
    name: 'Licenciatura en Pedagogía',
    category: 'profesionales',
    icon: 'book',
    tone: 'sage',
    tagline: 'Enseñar también es transformar vidas.',
    summary:
      'Acércate al aprendizaje, la didáctica y la construcción de entornos educativos más humanos e inclusivos.',
    description: [
      'La pedagogía reflexiona sobre cómo aprendemos y sobre el papel de la educación en la comunidad. Esta ficha introduce áreas de estudio relacionadas con el desarrollo humano, la planeación de experiencias de aprendizaje y la práctica educativa.',
      'El enfoque propuesto conecta la reflexión con el contexto: reconocer las necesidades de los estudiantes, acompañar sus procesos y construir ambientes de participación y respeto.',
    ],
    objective:
      'Explorar fundamentos pedagógicos y herramientas para diseñar, acompañar y evaluar experiencias de aprendizaje contextualizadas.',
    profile: [
      'Analizar situaciones educativas desde diferentes enfoques pedagógicos.',
      'Diseñar propuestas didácticas que reconozcan la diversidad de quienes aprenden.',
      'Participar en proyectos de acompañamiento educativo y trabajo comunitario.',
    ],
    audience:
      'Personas con vocación educativa e interés en los procesos de enseñanza y aprendizaje.',
    modules: [
      module('Fundamentos de la educación', 'Comprender el sentido de enseñar', [
        'Historia y corrientes de la pedagogía',
        'Educación, cultura y sociedad',
        'Ética de la labor educativa',
      ]),
      module('Aprendizaje y desarrollo', 'Reconocer distintas maneras de aprender', [
        'Desarrollo humano y primera infancia',
        'Teorías del aprendizaje',
        'Diversidad e inclusión educativa',
      ]),
      module('Didáctica y currículo', 'Diseñar experiencias significativas', [
        'Planeación y diseño curricular',
        'Recursos y mediaciones digitales',
        'Evaluación formativa',
      ]),
      module('Práctica e investigación', 'Reflexionar sobre la experiencia', [
        'Observación de contextos educativos',
        'Proyectos pedagógicos comunitarios',
        'Investigación y sistematización de prácticas',
      ]),
    ],
  },
  // Ficha: teologia. Se publica en vistas/teologia.html.
  {
    id: 'teologia',
    file: 'teologia.html',
    name: 'Licenciatura en Teología',
    category: 'profesionales',
    icon: 'crossbook',
    tone: 'sand',
    tagline: 'Conocimiento, fe y vocación de servicio.',
    summary:
      'Profundiza en la reflexión bíblica, el pensamiento cristiano y el servicio responsable a la comunidad.',
    description: [
      'El estudio de la teología invita a conocer las Escrituras en su contexto, dialogar con la historia del pensamiento cristiano y reflexionar sobre la relación entre la fe y la vida cotidiana.',
      'La formación se orienta al discernimiento, el liderazgo con valores y el acompañamiento respetuoso de las comunidades, en coherencia con la identidad cristiana de la fundación.',
    ],
    objective:
      'Relacionar la interpretación de los textos bíblicos con la reflexión teológica, la enseñanza y el servicio comunitario.',
    profile: [
      'Analizar textos bíblicos con atención a su contexto histórico y literario.',
      'Construir espacios de enseñanza y diálogo respetuoso sobre la fe.',
      'Participar en iniciativas comunitarias desde la ética y la vocación de servicio.',
    ],
    audience:
      'Personas interesadas en el estudio teológico, la enseñanza cristiana y el liderazgo comunitario.',
    modules: [
      module('Estudios bíblicos', 'Un acercamiento contextual a las Escrituras', [
        'Introducción al Antiguo y Nuevo Testamento',
        'Contexto histórico y cultural',
        'Herramientas de interpretación bíblica',
      ]),
      module('Historia y pensamiento', 'Comprender la tradición cristiana', [
        'Historia del cristianismo',
        'Fundamentos de teología sistemática',
        'Fe, razón y diálogo contemporáneo',
      ]),
      module('Ética y comunidad', 'Una fe que se expresa en el servicio', [
        'Ética cristiana',
        'Liderazgo y responsabilidad comunitaria',
        'Respeto a la diversidad y libertad religiosa',
      ]),
      module('Enseñanza y acompañamiento', 'Llevar la reflexión a la práctica', [
        'Pedagogía de la enseñanza bíblica',
        'Diseño de proyectos de servicio',
        'Acompañamiento pastoral y sus límites',
      ]),
    ],
  },
  // Ficha: enfermeria. Se publica en vistas/enfermeria.html.
  {
    id: 'enfermeria',
    file: 'enfermeria.html',
    name: 'Técnica en Enfermería',
    category: 'profesionales',
    icon: 'stethoscope',
    tone: 'rose',
    practical: true,
    tagline: 'Cuidar con conocimiento y sensibilidad.',
    summary:
      'Conoce los fundamentos del cuidado, la promoción de la salud y el apoyo a los equipos de atención.',
    description: [
      'El cuidado de la salud exige preparación, sensibilidad y responsabilidad. Esta ficha presenta ejes introductorios relacionados con el bienestar, la bioseguridad y el apoyo a la atención de las personas.',
      'La formación práctica en salud debe desarrollarse en escenarios autorizados, bajo supervisión y dentro de las competencias permitidas. Consulta las condiciones del programa antes de iniciar cualquier proceso de matrícula.',
    ],
    objective:
      'Conocer principios del cuidado humanizado y del apoyo seguro a los procesos de atención en salud.',
    profile: [
      'Reconocer medidas de bioseguridad y prevención de riesgos.',
      'Comprender la importancia de la comunicación y el trato digno en el cuidado.',
      'Identificar funciones de apoyo y límites de actuación dentro de un equipo de salud.',
    ],
    audience:
      'Personas con vocación de cuidado e interés en la atención y el bienestar de la comunidad.',
    notice:
      'La modalidad práctica, los escenarios de formación, la denominación del certificado y las autorizaciones aplicables deben verificarse con admisiones. Esta ficha no habilita para ejercer funciones clínicas.',
    modules: [
      module('Bases del cuidado', 'Comprender a la persona y sus necesidades', [
        'Anatomía y fisiología introductoria',
        'Cuidado humanizado y ética',
        'Comunicación con pacientes y familias',
      ]),
      module('Seguridad y prevención', 'Crear entornos de cuidado seguros', [
        'Bioseguridad y control de infecciones',
        'Identificación de riesgos',
        'Registro y confidencialidad de la información',
      ]),
      module('Promoción de la salud', 'Acompañar el bienestar de la comunidad', [
        'Hábitos saludables y autocuidado',
        'Educación para la salud',
        'Redes comunitarias de apoyo',
      ]),
      module('Práctica supervisada', 'Condiciones por confirmar con admisiones', [
        'Protocolos institucionales',
        'Trabajo interdisciplinario',
        'Escenarios y requisitos de práctica autorizada',
      ]),
    ],
  },
  // Ficha: veterinaria. Se publica en vistas/veterinaria.html.
  {
    id: 'veterinaria',
    file: 'veterinaria.html',
    name: 'Técnica en Veterinaria',
    category: 'profesionales',
    icon: 'paw',
    tone: 'sage',
    practical: true,
    tagline: 'Una vocación que cuida todas las vidas.',
    summary:
      'Explora el bienestar animal, la prevención y el apoyo responsable en entornos de cuidado veterinario.',
    description: [
      'El bienestar animal requiere observación, manejo respetuoso y trabajo en equipo. Esta ficha organiza áreas de estudio sobre cuidados básicos, prevención y apoyo a los profesionales de medicina veterinaria.',
      'El abordaje de procedimientos y prácticas debe ajustarse a la normativa, las condiciones del programa y la supervisión de profesionales habilitados. No sustituye una formación profesional en medicina veterinaria.',
    ],
    objective:
      'Identificar fundamentos de bienestar animal y de apoyo seguro a los equipos veterinarios, dentro de un alcance formativo claramente definido.',
    profile: [
      'Reconocer necesidades básicas de cuidado y bienestar de los animales.',
      'Comprender prácticas de higiene, prevención y manejo responsable.',
      'Apoyar acciones de educación y sensibilización bajo orientación profesional.',
    ],
    audience:
      'Personas interesadas en el cuidado animal y en las tareas de apoyo en entornos veterinarios.',
    notice:
      'Consulta la modalidad de las prácticas, sus escenarios, los requisitos sanitarios y la certificación. El diagnóstico, la prescripción y los tratamientos corresponden a profesionales habilitados.',
    modules: [
      module('Bienestar animal', 'Respeto por la vida y el entorno', [
        'Principios de bienestar animal',
        'Comportamiento y manejo respetuoso',
        'Ética del cuidado animal',
      ]),
      module('Fundamentos de salud', 'Conocer para prevenir', [
        'Anatomía y fisiología introductoria',
        'Higiene y bioseguridad',
        'Nutrición y cuidados básicos',
      ]),
      module('Apoyo al equipo veterinario', 'Trabajo responsable y supervisado', [
        'Organización de espacios y materiales',
        'Registros y comunicación con cuidadores',
        'Prevención y educación comunitaria',
      ]),
      module('Práctica y comunidad', 'Condiciones por confirmar con admisiones', [
        'Escenarios de práctica supervisada',
        'Protocolos de seguridad',
        'Proyectos de bienestar y tenencia responsable',
      ]),
    ],
  },
  // Ficha: neuropsicologia-educacion. Se publica en vistas/neuropsicologia-educacion.html.
  {
    id: 'neuropsicologia-educacion',
    file: 'neuropsicologia-educacion.html',
    name: 'Neuropsicología de la Educación',
    category: 'especializaciones',
    icon: 'brain',
    tone: 'blue',
    tagline: 'Entender el aprendizaje para acompañarlo mejor.',
    summary:
      'Relaciona los procesos cognitivos y el desarrollo con los desafíos cotidianos de la educación.',
    description: [
      'La neuropsicología de la educación estudia la relación entre los procesos cognitivos y el aprendizaje. Esta propuesta temática se acerca a la atención, la memoria, el lenguaje y las funciones ejecutivas en contextos educativos.',
      'Se propone una mirada interdisciplinaria, cuidadosa con la evidencia científica y alejada de explicaciones simplistas sobre el cerebro. El propósito es enriquecer la comprensión de los procesos de aprendizaje.',
    ],
    objective:
      'Analizar aportes de la neuropsicología a la comprensión del desarrollo y a la planeación de apoyos educativos inclusivos.',
    profile: [
      'Relacionar procesos cognitivos con situaciones de aprendizaje.',
      'Distinguir hallazgos científicos de neuromitos frecuentes.',
      'Proponer apoyos educativos y reconocer cuándo se requiere una remisión profesional.',
    ],
    audience:
      'Profesionales de educación, psicología y áreas afines; el perfil de ingreso definitivo debe confirmarse.',
    modules: [
      module('Cognición y desarrollo', 'Bases para comprender el aprendizaje', [
        'Neurodesarrollo y plasticidad',
        'Atención, memoria y lenguaje',
        'Funciones ejecutivas',
      ]),
      module('Diversidad en el aula', 'Reconocer necesidades y fortalezas', [
        'Variabilidad del aprendizaje',
        'Barreras y apoyos educativos',
        'Trabajo con familias',
      ]),
      module('Estrategias educativas', 'Del conocimiento al acompañamiento', [
        'Planeación de apoyos',
        'Evaluación formativa',
        'Colaboración interdisciplinaria',
      ]),
      module('Lectura de evidencia', 'Una práctica reflexiva', [
        'Análisis de literatura científica',
        'Identificación de neuromitos',
        'Proyecto de aplicación educativa',
      ]),
    ],
  },
  // Ficha: psicologia-penitenciaria. Se publica en vistas/psicologia-penitenciaria.html.
  {
    id: 'psicologia-penitenciaria',
    file: 'psicologia-penitenciaria.html',
    name: 'Psicología Penitenciaria',
    category: 'especializaciones',
    icon: 'shield',
    tone: 'sand',
    tagline: 'Dignidad humana en contextos de transformación.',
    summary:
      'Una mirada psicológica y ética a la convivencia, la salud mental y la reintegración social.',
    description: [
      'La psicología penitenciaria analiza los procesos psicosociales presentes en contextos de privación de libertad. Esta ficha se centra en la dignidad humana, la convivencia y los retos de la reintegración social.',
      'Los contenidos orientativos promueven una comprensión contextual de las personas y las instituciones, con atención a los derechos humanos y a los límites éticos del ejercicio profesional.',
    ],
    objective:
      'Comprender retos psicosociales del contexto penitenciario y criterios éticos para el trabajo interdisciplinario y la reintegración.',
    profile: [
      'Analizar factores psicosociales presentes en entornos penitenciarios.',
      'Reconocer enfoques de derechos y necesidades de acompañamiento.',
      'Participar en la formulación de iniciativas de convivencia y reintegración según su habilitación profesional.',
    ],
    audience:
      'Profesionales de psicología, ciencias sociales y áreas relacionadas; consultar requisitos específicos.',
    modules: [
      module('Contexto y derechos', 'Comprender la realidad institucional', [
        'Sistema penitenciario y sociedad',
        'Derechos humanos y dignidad',
        'Ética y confidencialidad',
      ]),
      module('Procesos psicosociales', 'Personas, vínculos y entornos', [
        'Adaptación y convivencia',
        'Factores de riesgo y protección',
        'Salud mental y redes de apoyo',
      ]),
      module('Acompañamiento', 'Perspectivas de trabajo interdisciplinario', [
        'Enfoques psicoeducativos',
        'Resolución de conflictos',
        'Coordinación con equipos profesionales',
      ]),
      module('Reintegración social', 'Construir oportunidades de participación', [
        'Familia y comunidad',
        'Diseño de programas sociales',
        'Seguimiento y evaluación de iniciativas',
      ]),
    ],
  },
  // Ficha: psicologia-juridica. Se publica en vistas/psicologia-juridica.html.
  {
    id: 'psicologia-juridica',
    file: 'psicologia-juridica.html',
    name: 'Psicología Jurídica',
    category: 'especializaciones',
    icon: 'scale',
    tone: 'blue',
    tagline: 'Donde la comprensión humana dialoga con la justicia.',
    summary:
      'Conoce la relación entre el comportamiento, los derechos y los contextos de actuación de la justicia.',
    description: [
      'La psicología jurídica explora la relación entre el comportamiento humano y el derecho. Esta ficha reúne ejes de estudio sobre testimonio, victimología, toma de decisiones y responsabilidad profesional.',
      'El trabajo en ámbitos judiciales exige rigor metodológico, imparcialidad y respeto por los derechos de las personas. Las actividades periciales requieren formación y habilitación específicas.',
    ],
    objective:
      'Reconocer los campos de relación entre psicología y derecho, sus fundamentos y los criterios éticos de la actuación profesional.',
    profile: [
      'Distinguir los principales ámbitos de la psicología jurídica.',
      'Analizar las implicaciones éticas de la información psicológica en contextos legales.',
      'Comprender el papel del trabajo interdisciplinario y los límites de la práctica pericial.',
    ],
    audience:
      'Profesionales de psicología, derecho y áreas afines; admisiones debe confirmar el perfil requerido.',
    modules: [
      module('Psicología y derecho', 'Un marco para el diálogo interdisciplinario', [
        'Campos de la psicología jurídica',
        'Conceptos jurídicos básicos',
        'Ética y derechos humanos',
      ]),
      module('Testimonio y memoria', 'Comprender la información en contexto', [
        'Procesos de memoria y testimonio',
        'Sesgos y toma de decisiones',
        'Entrevista y garantías de protección',
      ]),
      module('Victimología', 'Enfoques de atención y dignidad', [
        'Impacto psicosocial de la victimización',
        'Prevención de la revictimización',
        'Redes de atención y remisión',
      ]),
      module('Práctica e investigación', 'Rigor en la actuación profesional', [
        'Lectura crítica de informes',
        'Fundamentos de investigación',
        'Alcance y límites de la actividad pericial',
      ]),
    ],
  },
  // Ficha: sexologia-terapia. Se publica en vistas/sexologia-terapia.html.
  {
    id: 'sexologia-terapia',
    file: 'sexologia-terapia.html',
    name: 'Sexología y Terapia',
    category: 'especializaciones',
    icon: 'heart',
    tone: 'rose',
    tagline: 'Bienestar, respeto y una mirada integral.',
    summary:
      'Profundiza en la sexualidad humana desde la educación, los derechos y el trabajo interdisciplinario.',
    description: [
      'La sexología aborda la sexualidad en sus dimensiones biológicas, psicológicas, sociales y culturales. Los ejes propuestos promueven una comprensión respetuosa de la diversidad, el consentimiento y el bienestar.',
      'La atención terapéutica debe ser realizada por profesionales habilitados. La ficha no ofrece asesoría clínica ni acredita por sí misma para el diagnóstico o tratamiento.',
    ],
    objective:
      'Analizar la sexualidad humana desde un enfoque integral, ético y basado en derechos, reconociendo los alcances de la educación y la atención profesional.',
    profile: [
      'Comprender dimensiones de la sexualidad y el bienestar.',
      'Diseñar propuestas educativas respetuosas y contextualizadas.',
      'Reconocer criterios de remisión y colaboración con profesionales de salud.',
    ],
    audience:
      'Profesionales de salud, psicología, educación y áreas afines; consultar el perfil de admisión.',
    modules: [
      module('Fundamentos de sexología', 'Una mirada a la experiencia humana', [
        'Dimensiones de la sexualidad',
        'Desarrollo a lo largo de la vida',
        'Contexto social y cultural',
      ]),
      module('Derechos y educación', 'Respeto, cuidado y participación', [
        'Consentimiento y derechos',
        'Diversidad e inclusión',
        'Diseño de acciones educativas',
      ]),
      module('Salud y relaciones', 'Perspectivas interdisciplinarias', [
        'Bienestar y comunicación de pareja',
        'Prevención y factores de protección',
        'Remisión a servicios especializados',
      ]),
      module('Reflexión profesional', 'Ética y evidencia', [
        'Confidencialidad y límites profesionales',
        'Lectura crítica de investigaciones',
        'Proyecto educativo o de investigación',
      ]),
    ],
  },
  // Ficha: nutricion-geriatrica. Se publica en vistas/nutricion-geriatrica.html.
  {
    id: 'nutricion-geriatrica',
    file: 'nutricion-geriatrica.html',
    name: 'Nutrición Geriátrica',
    category: 'especializaciones',
    icon: 'leaf',
    tone: 'sage',
    tagline: 'Acompañar el bienestar en cada etapa de la vida.',
    summary:
      'Explora los factores nutricionales, sociales y de cuidado relacionados con el envejecimiento.',
    description: [
      'La alimentación en la vejez está relacionada con cambios fisiológicos, condiciones de salud y factores sociales. Esta ficha propone una aproximación interdisciplinaria al bienestar nutricional de las personas mayores.',
      'Se enfatizan el trato digno, la prevención y la colaboración con profesionales de nutrición y salud. No se promueven dietas ni prescripciones individuales desde esta página.',
    ],
    objective:
      'Comprender factores que influyen en la nutrición de las personas mayores y reconocer estrategias de educación y cuidado interdisciplinario.',
    profile: [
      'Identificar factores sociales y fisiológicos que afectan la alimentación.',
      'Reconocer señales que ameritan valoración profesional.',
      'Participar en iniciativas de educación y acompañamiento del bienestar.',
    ],
    audience:
      'Profesionales vinculados con nutrición, salud y atención a personas mayores; requisitos sujetos a confirmación.',
    modules: [
      module('Envejecimiento y alimentación', 'Comprender los cambios de la vida', [
        'Cambios fisiológicos y funcionales',
        'Factores sociales y culturales',
        'Autonomía y dignidad',
      ]),
      module('Riesgos y prevención', 'Reconocer necesidades de atención', [
        'Fragilidad y riesgo nutricional',
        'Seguridad alimentaria',
        'Remisión y seguimiento profesional',
      ]),
      module('Cuidado interdisciplinario', 'Colaborar para el bienestar', [
        'Trabajo con cuidadores y familias',
        'Entornos de alimentación accesibles',
        'Educación para hábitos saludables',
      ]),
      module('Programas de apoyo', 'Diseñar iniciativas pertinentes', [
        'Promoción del envejecimiento saludable',
        'Proyectos comunitarios',
        'Lectura de evidencia y evaluación',
      ]),
    ],
  },
  // Ficha: maestria-educacion. Se publica en vistas/maestria-educacion.html.
  {
    id: 'maestria-educacion',
    file: 'maestria-educacion.html',
    name: 'Maestría en Educación',
    category: 'maestrias',
    icon: 'book',
    tone: 'sage',
    tagline: 'Repensar la educación. Abrir nuevos caminos.',
    summary:
      'Una aproximación a la investigación, la innovación pedagógica y el liderazgo educativo.',
    description: [
      'La reflexión avanzada sobre educación permite examinar las prácticas, los contextos y las políticas que orientan el aprendizaje. Esta ficha presenta ejes temáticos de investigación, currículo e innovación.',
      'El programa aparece en el catálogo institucional original. La estructura académica definitiva, la institución que certifica, los requisitos y las condiciones de titulación deben consultarse directamente con admisiones.',
    ],
    objective:
      'Explorar herramientas de investigación y reflexión crítica aplicables a problemas educativos contextualizados.',
    profile: [
      'Formular preguntas de investigación sobre procesos educativos.',
      'Analizar propuestas curriculares y decisiones pedagógicas.',
      'Diseñar iniciativas de innovación con atención a la inclusión y el contexto.',
    ],
    audience:
      'Profesionales con interés en investigación y transformación educativa; verificar titulación de ingreso.',
    modules: [
      module('Perspectivas educativas', 'Leer críticamente los contextos', [
        'Teorías contemporáneas de la educación',
        'Educación, cultura y sociedad',
        'Políticas e inclusión',
      ]),
      module('Currículo e innovación', 'Diseñar nuevas posibilidades', [
        'Análisis curricular',
        'Mediaciones y entornos digitales',
        'Evaluación de aprendizajes',
      ]),
      module('Investigación educativa', 'Construir conocimiento con rigor', [
        'Enfoques cualitativos y cuantitativos',
        'Diseño de proyectos',
        'Ética de la investigación',
      ]),
      module('Liderazgo y proyecto', 'Dialogar con la realidad educativa', [
        'Gestión y participación',
        'Innovación situada',
        'Seminario de proyecto de investigación',
      ]),
    ],
  },
  // Ficha: maestria-teologia. Se publica en vistas/maestria-teologia.html.
  {
    id: 'maestria-teologia',
    file: 'maestria-teologia.html',
    name: 'Maestría en Teología',
    category: 'maestrias',
    icon: 'crossbook',
    tone: 'sand',
    tagline: 'Profundizar en la fe, dialogar con el presente.',
    summary:
      'Investiga el pensamiento teológico y su relación con los desafíos de la comunidad contemporánea.',
    description: [
      'La investigación teológica invita a profundizar en las fuentes de la tradición cristiana y a dialogar con las preguntas del presente. Los ejes propuestos relacionan interpretación, pensamiento y servicio.',
      'Se presenta una orientación temática del programa anunciado en el catálogo. Consulta el plan definitivo, los requisitos académicos y el alcance de la certificación con la fundación.',
    ],
    objective:
      'Articular reflexión teológica e investigación para analizar cuestiones contemporáneas de fe, ética y vida comunitaria.',
    profile: [
      'Interpretar fuentes teológicas con rigor y contextualización.',
      'Construir argumentos en diálogo con distintas perspectivas.',
      'Formular proyectos de investigación o reflexión teológica aplicada.',
    ],
    audience:
      'Profesionales con formación o trayectoria afín a la teología; confirmar los requisitos específicos.',
    modules: [
      module('Hermenéutica e interpretación', 'Profundizar en las fuentes', [
        'Enfoques de hermenéutica bíblica',
        'Contexto e interpretación',
        'Lectura crítica de fuentes',
      ]),
      module('Pensamiento teológico', 'Tradición y preguntas contemporáneas', [
        'Teología sistemática',
        'Historia del pensamiento cristiano',
        'Debates teológicos actuales',
      ]),
      module('Ética y sociedad', 'La reflexión en comunidad', [
        'Ética social cristiana',
        'Diálogo y libertad religiosa',
        'Servicio y transformación comunitaria',
      ]),
      module('Investigación teológica', 'Un camino de estudio riguroso', [
        'Métodos de investigación',
        'Escritura académica',
        'Seminario de proyecto',
      ]),
    ],
  },
  // Ficha: maestria-salud-publica. Se publica en vistas/maestria-salud-publica.html.
  {
    id: 'maestria-salud-publica',
    file: 'maestria-salud-publica.html',
    name: 'Maestría en Salud Pública',
    category: 'maestrias',
    icon: 'globe',
    tone: 'blue',
    tagline: 'Pensar la salud desde lo colectivo.',
    summary:
      'Conoce enfoques de promoción, prevención y gestión orientados al bienestar de las comunidades.',
    description: [
      'La salud pública estudia las condiciones que influyen en el bienestar colectivo y en las oportunidades de vivir de manera saludable. Esta ficha introduce áreas como determinantes sociales, epidemiología y gestión de iniciativas.',
      'El enfoque propuesto invita a trabajar de forma interdisciplinaria y con participación comunitaria. Los requisitos, la carga académica y la certificación del programa requieren confirmación institucional.',
    ],
    objective:
      'Analizar problemas colectivos de salud y explorar herramientas de investigación y gestión para propuestas contextualizadas.',
    profile: [
      'Reconocer determinantes sociales de la salud.',
      'Interpretar evidencia sobre problemas de salud colectiva.',
      'Participar en la planeación y evaluación de iniciativas de promoción y prevención.',
    ],
    audience:
      'Profesionales de salud, ciencias sociales y áreas afines; consultar las condiciones de ingreso.',
    modules: [
      module('Salud y sociedad', 'Comprender las condiciones del bienestar', [
        'Determinantes sociales',
        'Equidad y participación comunitaria',
        'Ética en salud pública',
      ]),
      module('Investigación poblacional', 'Herramientas para comprender problemas', [
        'Fundamentos de epidemiología',
        'Lectura e interpretación de evidencia',
        'Métodos de investigación en salud',
      ]),
      module('Promoción y prevención', 'Diseñar iniciativas con la comunidad', [
        'Educación para la salud',
        'Entornos saludables',
        'Participación y redes de apoyo',
      ]),
      module('Gestión y políticas', 'De las necesidades a las propuestas', [
        'Sistemas y políticas de salud',
        'Gestión de proyectos',
        'Evaluación de intervenciones colectivas',
      ]),
    ],
  },
  // Ficha: pnl. Se publica en vistas/PNL.html.
  {
    id: 'pnl',
    file: 'PNL.html',
    name: 'Programación Neurolingüística (PNL)',
    category: 'diplomados',
    icon: 'chat',
    tone: 'sand',
    original: true,
    tagline: 'Comunicar con intención. Aprender con criterio.',
    summary:
      'Estudia modelos de comunicación y desarrollo personal con una mirada crítica a su alcance y evidencia.',
    duration: 'Aprox. 11 meses',
    workload: '550 horas',
    durationNote:
      'Duración publicada en el sitio original. Confirma calendario, intensidad y vigencia con admisiones.',
    description: [
      'La Programación Neurolingüística (PNL) reúne modelos y técnicas de comunicación y cambio personal. El contenido publicado aborda liderazgo, negociación, aprendizaje y relaciones en diferentes contextos.',
      'El programa se presenta con una mirada crítica: la evidencia científica sobre la eficacia de la PNL es limitada y no debe confundirse con psicoterapia ni con tratamientos de salud validados. Se invita a distinguir herramientas de comunicación de afirmaciones clínicas.',
    ],
    objective:
      'Conocer los modelos de la PNL y analizar sus aplicaciones comunicativas, limitaciones y relación con la evidencia disponible.',
    profile: [
      'Reconocer modelos y técnicas de comunicación de la PNL.',
      'Reflexionar sobre habilidades de escucha, negociación y liderazgo.',
      'Evaluar críticamente las afirmaciones y actuar dentro de límites éticos y profesionales.',
    ],
    audience:
      'Personas interesadas en comunicación, educación y desarrollo de habilidades interpersonales.',
    modules: [
      module(
        'Nivel básico',
        'Fundamentos e historia inicial',
        [
          'Historia y principios básicos',
          'Presuposiciones de la PNL',
          'Conocimientos de comunicación',
        ],
        '150 horas',
      ),
      module(
        'Nivel intermedio',
        'Aplicaciones prácticas de PNL',
        ['Anclajes y submodalidades', 'Patrón Swish y rapport', 'Estilos de comunicación'],
        '150 horas',
      ),
      module(
        'Nivel avanzado',
        'PNL profesional avanzada',
        ['Liderazgo y modelado avanzado', 'Estrategias de negociación', 'Teoría del cambio'],
        '150 horas',
      ),
      module(
        'Nivel experto',
        'Integración e investigación',
        [
          'Investigación en PNL',
          'Neurociencia del lenguaje',
          'Neuroventas e inteligencia emocional',
        ],
        '100 horas',
      ),
    ],
  },
  // Ficha: inclusion-educativa. Se publica en vistas/InclusionEducativaYNeurodiversidad.html.
  {
    id: 'inclusion-educativa',
    file: 'InclusionEducativaYNeurodiversidad.html',
    name: 'Inclusión Educativa y Neurodiversidad',
    category: 'diplomados',
    icon: 'people',
    tone: 'sage',
    original: true,
    tagline: 'Cada forma de aprender merece un lugar.',
    summary:
      'Reconoce la diversidad del aprendizaje y construye estrategias para una educación más inclusiva.',
    duration: '4 niveles de formación',
    workload: '240 horas',
    durationNote:
      '60 horas por nivel según el contenido original. El calendario debe confirmarse con admisiones.',
    description: [
      'Este programa aborda el derecho a una educación de calidad y la eliminación de barreras asociadas a la discapacidad y a los contextos culturales. El contenido publicado toma como referencias la Ley 1618 de 2013 y el Decreto 1421 de 2017 en Colombia.',
      'Propone una mirada centrada en las fortalezas y la diversidad cognitiva. Incluye neurodesarrollo, TEA, TDAH y dislexia, junto con estrategias multisensoriales, adaptaciones curriculares y colaboración con familias y comunidades.',
    ],
    objective:
      'Reconocer barreras para el aprendizaje y explorar estrategias pedagógicas que favorezcan la participación de estudiantes con distintas necesidades y fortalezas.',
    profile: [
      'Comprender conceptos de neurodiversidad y desarrollo.',
      'Proponer estrategias y ajustes educativos contextualizados.',
      'Promover el trabajo conjunto entre docentes, familias y comunidad.',
    ],
    audience:
      'Docentes, orientadores, estudiantes de educación y personas interesadas en inclusión educativa.',
    modules: [
      module(
        'Fase inicial',
        'Bases y diagnóstico educativo',
        [
          'Fundamentos de la neurodiversidad',
          'Bases neurobiológicas del aprendizaje',
          'Detección y cribados psicopedagógicos',
        ],
        '60 horas',
      ),
      module(
        'Fase práctica',
        'Estrategias de enseñanza',
        [
          'Enseñanza multisensorial y rutinas',
          'Regulación emocional y social',
          'Adaptaciones curriculares avanzadas',
        ],
        '60 horas',
      ),
      module(
        'Fase de integración',
        'Comunidad e innovación',
        [
          'Trabajo con familias y comunidad',
          'Investigación aplicada',
          'Innovación en neuroeducación e IA',
        ],
        '60 horas',
      ),
      module(
        'Fase avanzada',
        'Gestión y diseño curricular',
        [
          'Políticas en neurodiversidad',
          'Diseño curricular inclusivo',
          'Estrategias didácticas aplicadas',
        ],
        '60 horas',
      ),
    ],
  },
  // Ficha: gerontologia. Se publica en vistas/Gerontologia.html.
  {
    id: 'gerontologia',
    file: 'Gerontologia.html',
    name: 'Gerontología',
    category: 'diplomados',
    icon: 'hands',
    tone: 'rose',
    original: true,
    tagline: 'Más comprensión. Más dignidad al envejecer.',
    summary:
      'Estudia el envejecimiento desde una mirada integral, humana y conectada con la comunidad.',
    duration: 'Aprox. 19 meses',
    workload: '750 horas',
    durationNote:
      'Duración aproximada publicada en el sitio original. Consulta el calendario vigente.',
    description: [
      'La gerontología ofrece un estudio integral del envejecimiento y de las condiciones que favorecen una vejez activa y saludable. El programa aborda desafíos como la fragilidad, la dependencia, la soledad y las enfermedades crónicas asociadas.',
      'Integra perspectivas biomédicas, de políticas públicas y de psicogerontología para comprender los modelos de atención, el apoyo sociofamiliar y la participación de las personas mayores.',
    ],
    objective:
      'Comprender el envejecimiento desde distintas disciplinas y reconocer estrategias de acompañamiento, participación y atención integral a las personas mayores.',
    profile: [
      'Analizar dimensiones biológicas, psicológicas y sociales del envejecimiento.',
      'Participar en proyectos y redes de apoyo sociofamiliar.',
      'Comprender políticas y modelos de atención, respetando los alcances de su formación previa.',
    ],
    audience:
      'Personas vinculadas al cuidado, la intervención social y el acompañamiento a personas mayores.',
    modules: [
      module(
        'Nivel básico',
        'Introducción al envejecimiento',
        [
          'Demografía del envejecimiento',
          'Biología del envejecimiento normal',
          'Psicología del adulto mayor',
        ],
        '200 horas',
      ),
      module(
        'Nivel intermedio',
        'Salud y atención geriátrica',
        [
          'Enfermedades prevalentes',
          'Diabetes e infraestructura de atención',
          'Técnicas de prevención y cuidado',
        ],
        '200 horas',
      ),
      module(
        'Nivel avanzado',
        'Políticas y servicios gerontológicos',
        [
          'Modelos de atención integral',
          'Cuidado domiciliario e institucional',
          'Gestión de proyectos sociales',
        ],
        '200 horas',
      ),
      module(
        'Nivel experto',
        'Investigación y liderazgo',
        [
          'Proyectos de investigación aplicada',
          'Innovación en servicios para mayores',
          'Liderazgo en equipos multidisciplinarios',
        ],
        '150 horas',
      ),
    ],
  },
  // Ficha: pni. Se publica en vistas/Psiconeuroinmunologia.html.
  {
    id: 'pni',
    file: 'Psiconeuroinmunologia.html',
    name: 'Psiconeuroinmunología (PNI)',
    category: 'diplomados',
    icon: 'brain',
    tone: 'blue',
    original: true,
    tagline: 'Conectar saberes para comprender la salud.',
    summary:
      'Explora las relaciones entre procesos psicológicos, sistema nervioso, hormonas e inmunidad.',
    duration: 'Aprox. 4 a 6 meses',
    workload: '160 horas',
    durationNote:
      'Cuatro niveles de 40 horas según el sitio original. Confirma la programación vigente.',
    description: [
      'La psiconeuroinmunología estudia las interacciones entre los procesos psicológicos y los sistemas nervioso, endocrino e inmune. El programa se aproxima al estrés, las emociones y su relación con distintos procesos de salud.',
      'Incluye perspectivas de fisiología, investigación y colaboración interdisciplinaria. No sustituye la atención médica ni permite atribuir las enfermedades únicamente al estado emocional de una persona.',
    ],
    objective:
      'Comprender los fundamentos de las interacciones psiconeuroinmunológicas y analizar de forma crítica su estudio y sus aplicaciones profesionales.',
    profile: [
      'Reconocer funciones e interacciones de los sistemas nervioso, endocrino e inmune.',
      'Interpretar información académica sobre estrés y salud.',
      'Comprender estrategias de bienestar desde un enfoque interdisciplinario y basado en evidencia.',
    ],
    audience:
      'Profesionales y estudiantes de áreas de salud y bienestar; verificar requisitos específicos con admisiones.',
    modules: [
      module(
        'Nivel básico',
        'Fundamentos de la PNI',
        [
          'Fisiología del estrés',
          'Eje hipotálamo-hipófisis-adrenal',
          'Estructura del sistema inmune',
        ],
        '40 horas',
      ),
      module(
        'Nivel intermedio',
        'Interacciones mente-cuerpo',
        [
          'Estrés crónico en patologías',
          'Infecciones, alergias y enfermedades autoinmunes',
          'Influencia de ansiedad y trauma',
        ],
        '40 horas',
      ),
      module(
        'Nivel avanzado',
        'PNI en escenarios clínicos',
        [
          'PNI en embarazo y geriatría',
          'Abordaje en cáncer y salud cardiovascular',
          'Diseño de intervenciones clínicas: alcance profesional',
        ],
        '40 horas',
      ),
      module(
        'Nivel experto',
        'Investigación y gestión',
        [
          'Investigación avanzada en salud',
          'Innovación y biosensores',
          'Políticas de salud integrativa',
        ],
        '40 horas',
      ),
    ],
  },
  // Ficha: sexologia. Se publica en vistas/SexologiaYTerapiaSexual.html.
  {
    id: 'sexologia',
    file: 'SexologiaYTerapiaSexual.html',
    name: 'Sexología y Terapia Sexual',
    category: 'diplomados',
    icon: 'heart',
    tone: 'rose',
    original: true,
    tagline: 'Conocimiento que promueve respeto y bienestar.',
    summary:
      'Un acercamiento integral a la sexualidad humana, la educación y el acompañamiento interdisciplinario.',
    duration: 'Aprox. 16 meses',
    workload: '640 horas',
    durationNote:
      'Distribución publicada en el sitio original. Consulta fechas y condiciones de la cohorte.',
    description: [
      'El programa estudia la sexualidad humana en sus dimensiones biológica, psicológica, social y cultural. Promueve una perspectiva respetuosa, inclusiva y orientada al bienestar y a la educación afectivo-sexual.',
      'El contenido abarca fundamentos, educación, clínica e investigación. Los aprendizajes relacionados con diagnóstico e intervención solo pueden aplicarse dentro de la habilitación profesional correspondiente; un diplomado no la reemplaza.',
    ],
    objective:
      'Comprender las dimensiones de la sexualidad y desarrollar una mirada educativa y ética sobre la salud sexual, las relaciones y la diversidad.',
    profile: [
      'Reconocer fundamentos biológicos, psicológicos y sociales de la sexualidad.',
      'Participar en iniciativas de educación afectivo-sexual y prevención.',
      'Comprender enfoques de atención interdisciplinaria y los límites de la propia práctica.',
    ],
    audience:
      'Profesionales y estudiantes de salud, psicología, educación y áreas afines; consultar requisitos de admisión.',
    modules: [
      module(
        'Fundamentos',
        'Bases de la sexualidad',
        ['Bases biológicas humanas', 'Bases sociales de la sexualidad', 'Introducción clínica'],
        '160 horas',
      ),
      module(
        'Educación',
        'Educación y prevención',
        [
          'Estrategias educativas integrales',
          'Prevención de riesgos en salud',
          'Educación afectivo-sexual',
        ],
        '180 horas',
      ),
      module(
        'Clínica',
        'Clínica y terapéutica',
        [
          'Diagnóstico e intervención clínica: alcance profesional',
          'Disfunciones sexuales',
          'Orientación de pareja y diversidad',
        ],
        '180 horas',
      ),
      module(
        'Experto',
        'Investigación y liderazgo',
        ['Formación de formadores', 'Metodologías de investigación', 'Liderazgo institucional'],
        '120 horas',
      ),
    ],
  },
  // Los valores siguientes se usan cuando una ficha no define un dato propio.
  // No sustituyen ni modifican las duraciones originales verificadas.
].map((p) => ({
  title: p.name,
  duration: pending,
  workload: pending,
  durationNote:
    'La duración, la intensidad horaria y las fechas de inicio aún deben ser confirmadas por la fundación.',
  requirements: [
    'Solicitar a admisiones el listado oficial de documentos y el nivel de formación previo exigido.',
    'Contar con un dispositivo y conexión a internet para las actividades virtuales.',
    'Confirmar disponibilidad, modalidad, prácticas y condiciones antes de realizar pagos.',
  ],
  ...p,
  modality: p.practical ? 'Consultar componente práctico' : 'Modalidad virtual',
  video: p.original ? 'PT6zEhrBaI0' : null,
}));
// FOTOGRAFÍAS ORIGINALES. Cada nombre corresponde a un JPG de imagenes/carousel/.
// Los cuatro primeros números indican el año; no hace falta renombrar los archivos.
export const gallery = [
  '2021',
  '202101',
  '202102',
  '202103',
  '202201',
  '202202',
  '202301',
  '202302',
  '202303',
  '202304',
  '202305',
  '202402',
  '202403',
  '202501',
  '202502',
  '202503',
  '202504',
  '202505',
  '202506',
  '202507',
  '2016',
  '2018',
];
// SEDES. Cada fila contiene ciudad y departamento; no agrega direcciones sin confirmar.
export const locations = [
  ['La Cumbre', 'Valle del Cauca'],
  ['Santander de Quilichao', 'Cauca'],
  ['Buenaventura', 'Valle del Cauca'],
  ['Barranquilla', 'Atlántico'],
  ['Bucaramanga', 'Santander'],
];
