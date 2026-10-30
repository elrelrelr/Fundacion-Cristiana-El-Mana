// Catálogo basado en los enlaces del repositorio original (18 programas).
// Cinco fichas se basan en el PDF suministrado; las demás usan redacción orientativa.
// Los contenidos nuevos no equivalen a un plan académico aprobado ni a una habilitación profesional.
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
// objective explica el objetivo; graduateProfile resume el perfil; competencies y careerAreas lo desarrollan.
// audience indica a quién se dirige; approach explica el enfoque; scopeNote delimita alcances; source identifica la fuente.
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
    graduateProfile:
      'Al finalizar el curso, el participante podrá comprender y analizar situaciones de aprendizaje, comunicación y conducta desde los procesos cognitivos. Este perfil corresponde a un curso especializado y no equivale al de una carrera profesional de Psicología.',
    competencies: [
      {
        title: 'Saber conocer',
        icon: 'book',
        items: [
          'Modelos fundamentales de la cognición humana.',
          'Procesos de percepción, atención, memoria y lenguaje.',
          'Bases neurológicas de la comunicación y el aprendizaje.',
        ],
      },
      {
        title: 'Saber hacer',
        icon: 'hands',
        items: [
          'Analizar situaciones educativas y cotidianas desde una perspectiva cognitiva.',
          'Relacionar conceptos de memoria, atención y lenguaje con ejemplos prácticos.',
          'Leer y discutir información académica reconociendo los límites de la propia formación.',
        ],
      },
      {
        title: 'Saber ser',
        icon: 'heart',
        items: [
          'Rigor y curiosidad intelectual.',
          'Respeto por la diversidad de trayectorias y formas de aprender.',
          'Responsabilidad ética sobre el alcance de los conocimientos adquiridos.',
        ],
      },
    ],
    careerAreas: [
      {
        title: 'Apoyo a proyectos educativos',
        description:
          'Colaborar en el análisis de necesidades de aprendizaje y en la revisión de materiales educativos.',
      },
      {
        title: 'Divulgación y contenidos',
        description:
          'Preparar recursos introductorios sobre cognición, comunicación y aprendizaje con lenguaje claro.',
      },
      {
        title: 'Investigación formativa',
        description:
          'Participar como apoyo en lecturas, revisión de fuentes y actividades académicas supervisadas.',
      },
      {
        title: 'Desarrollo personal y profesional',
        description:
          'Aplicar herramientas de análisis cognitivo a la propia organización del estudio y la comunicación.',
      },
    ],
    approach:
      'El curso conecta los fundamentos históricos de la psicología cognitiva con aplicaciones contemporáneas en educación y comunicación. Su alcance es introductorio y especializado: no sustituye un plan de estudios profesional ni habilita para la práctica clínica.',
    scopeNote:
      'Curso especializado. No habilita por sí mismo para el ejercicio profesional de la psicología, la evaluación clínica ni la psicoterapia.',
    source: {
      kind: 'editorial',
      label: 'Redacción orientativa',
      note: 'Programa no incluido en el PDF suministrado.',
    },
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
    graduateProfile:
      'El perfil orientativo se centra en comprender cómo aprenden las personas y en diseñar experiencias educativas pertinentes, inclusivas y evaluables. La formación propuesta busca articular reflexión pedagógica, didáctica y trabajo con la comunidad.',
    competencies: [
      {
        title: 'Saber conocer',
        icon: 'book',
        items: [
          'Teorías del aprendizaje y del desarrollo humano.',
          'Fundamentos de currículo, didáctica y evaluación formativa.',
          'Educación, cultura, diversidad e inclusión.',
        ],
      },
      {
        title: 'Saber hacer',
        icon: 'hands',
        items: [
          'Diseñar secuencias y recursos de aprendizaje contextualizados.',
          'Observar y analizar situaciones educativas para proponer mejoras.',
          'Acompañar procesos de aprendizaje y trabajar con familias y comunidad.',
        ],
      },
      {
        title: 'Saber ser',
        icon: 'heart',
        items: [
          'Vocación de servicio y escucha activa.',
          'Respeto por la diversidad y compromiso con la equidad.',
          'Reflexión crítica y apertura a la innovación responsable.',
        ],
      },
    ],
    careerAreas: [
      {
        title: 'Proyectos pedagógicos',
        description:
          'Participar en el diseño y acompañamiento de experiencias de aprendizaje en contextos formales o no formales, según la normativa aplicable.',
      },
      {
        title: 'Diseño de recursos educativos',
        description:
          'Crear materiales, secuencias didácticas y propuestas de evaluación formativa.',
      },
      {
        title: 'Trabajo comunitario',
        description:
          'Colaborar con iniciativas de acompañamiento educativo, lectura, familias y participación social.',
      },
      {
        title: 'Investigación e innovación',
        description:
          'Sistematizar prácticas y proponer mejoras basadas en la observación y la evidencia.',
      },
    ],
    approach:
      'La propuesta conecta la reflexión pedagógica con el análisis de contextos reales. Prioriza la planeación, la evaluación formativa y la construcción de entornos de aprendizaje respetuosos, sin presentar estos ejes como una malla curricular aprobada.',
    scopeNote:
      'Las funciones docentes y la denominación del título dependen del plan definitivo, la normativa vigente y la certificación que confirme la fundación.',
    source: {
      kind: 'editorial',
      label: 'Redacción orientativa',
      note: 'Programa no incluido en el PDF suministrado.',
    },
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
    graduateProfile:
      'El perfil orientativo integra el estudio contextual de la Biblia, la reflexión teológica y el servicio a la comunidad. Busca formar personas capaces de enseñar, dialogar y acompañar desde la fe cristiana con responsabilidad y respeto.',
    competencies: [
      {
        title: 'Saber conocer',
        icon: 'book',
        items: [
          'Hermenéutica y contexto histórico de los textos bíblicos.',
          'Historia del pensamiento cristiano y teología sistemática.',
          'Ética cristiana, liderazgo y acompañamiento comunitario.',
        ],
      },
      {
        title: 'Saber hacer',
        icon: 'hands',
        items: [
          'Analizar textos bíblicos atendiendo a su contexto histórico y literario.',
          'Preparar enseñanzas y espacios de diálogo respetuoso sobre la fe.',
          'Diseñar y acompañar proyectos de servicio comunitario.',
        ],
      },
      {
        title: 'Saber ser',
        icon: 'heart',
        items: [
          'Coherencia entre fe, ética y vida cotidiana.',
          'Respeto por la libertad religiosa y la diversidad de perspectivas.',
          'Vocación de servicio y trabajo colaborativo.',
        ],
      },
    ],
    careerAreas: [
      {
        title: 'Enseñanza cristiana',
        description:
          'Preparar y facilitar espacios de formación bíblica y reflexión teológica en comunidades e iglesias.',
      },
      {
        title: 'Liderazgo comunitario',
        description:
          'Acompañar equipos, iniciativas sociales y proyectos de servicio desde una perspectiva ética.',
      },
      {
        title: 'Acompañamiento pastoral',
        description:
          'Colaborar en procesos de escucha y orientación comunitaria dentro de los límites de la formación recibida.',
      },
      {
        title: 'Escritura e investigación',
        description:
          'Producir materiales de estudio, reflexión y divulgación teológica con rigor académico.',
      },
    ],
    approach:
      'La propuesta relaciona la interpretación bíblica con la historia del pensamiento cristiano y los desafíos contemporáneos. En coherencia con la identidad de la fundación, promueve el diálogo, la ética y el servicio sin imponer una lectura única de la fe.',
    scopeNote:
      'La denominación del programa, el título y sus alcances deben ser confirmados por la fundación; esta ficha no otorga habilitaciones profesionales reguladas.',
    source: {
      kind: 'editorial',
      label: 'Redacción orientativa',
      note: 'Programa no incluido en el PDF suministrado.',
    },
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
    graduateProfile:
      'El perfil orientativo se dirige al apoyo del cuidado humanizado y seguro de las personas, bajo la supervisión y dentro de los límites de la formación técnica. Integra bioseguridad, comunicación y colaboración con el equipo de salud.',
    competencies: [
      {
        title: 'Saber conocer',
        icon: 'book',
        items: [
          'Principios de bioseguridad y prevención de riesgos.',
          'Fundamentos de anatomía, fisiología y cuidado básico.',
          'Organización de servicios de salud y trabajo en equipo.',
        ],
      },
      {
        title: 'Saber hacer',
        icon: 'hands',
        items: [
          'Apoyar actividades de cuidado e higiene según protocolos y supervisión.',
          'Reconocer señales de alerta y comunicarlas oportunamente al equipo responsable.',
          'Registrar información básica y orientar a pacientes y familias dentro de su alcance.',
        ],
      },
      {
        title: 'Saber ser',
        icon: 'heart',
        items: [
          'Trato digno, empatía y respeto por la autonomía.',
          'Responsabilidad, confidencialidad y disciplina en el cumplimiento de protocolos.',
          'Disposición al aprendizaje continuo y al trabajo interdisciplinario.',
        ],
      },
    ],
    careerAreas: [
      {
        title: 'Apoyo en servicios de salud',
        description:
          'Colaborar en tareas básicas de cuidado y organización bajo protocolos institucionales y supervisión.',
      },
      {
        title: 'Promoción y prevención',
        description:
          'Participar en jornadas educativas y actividades comunitarias de promoción de la salud.',
      },
      {
        title: 'Acompañamiento a personas y familias',
        description:
          'Brindar apoyo informativo y de orientación dentro del alcance técnico confirmado.',
      },
      {
        title: 'Gestión de insumos y registros',
        description:
          'Apoyar la organización de materiales, espacios y registros según los procedimientos del servicio.',
      },
    ],
    approach:
      'La propuesta prioriza el cuidado humanizado, la seguridad del paciente y la comunicación con el equipo de salud. Los escenarios prácticos, la supervisión y las autorizaciones deben verificarse antes de la inscripción.',
    scopeNote:
      'Esta ficha no habilita para ejercer como profesional de enfermería ni para realizar actos clínicos reservados. Las funciones permitidas dependen de la certificación, la normativa y la supervisión.',
    source: {
      kind: 'editorial',
      label: 'Redacción orientativa',
      note: 'Programa no incluido en el PDF suministrado.',
    },
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
    graduateProfile:
      'El perfil orientativo se centra en el apoyo responsable al cuidado animal y al trabajo de equipos veterinarios. Promueve el bienestar animal, la prevención y la educación comunitaria, sin sustituir la formación profesional en medicina veterinaria.',
    competencies: [
      {
        title: 'Saber conocer',
        icon: 'book',
        items: [
          'Principios de bienestar, comportamiento y manejo respetuoso de animales.',
          'Higiene, bioseguridad y cuidados básicos.',
          'Organización de entornos de atención y tenencia responsable.',
        ],
      },
      {
        title: 'Saber hacer',
        icon: 'hands',
        items: [
          'Apoyar la preparación de espacios, materiales y registros bajo supervisión.',
          'Reconocer necesidades básicas de cuidado y comunicar observaciones al equipo veterinario.',
          'Participar en actividades de educación y prevención dirigidas a cuidadores y comunidad.',
        ],
      },
      {
        title: 'Saber ser',
        icon: 'heart',
        items: [
          'Respeto por la vida animal y rechazo al maltrato.',
          'Responsabilidad en el cumplimiento de protocolos y límites de actuación.',
          'Comunicación clara y colaborativa con profesionales y cuidadores.',
        ],
      },
    ],
    careerAreas: [
      {
        title: 'Apoyo en entornos veterinarios',
        description:
          'Colaborar en tareas de organización, higiene y preparación bajo supervisión de profesionales habilitados.',
      },
      {
        title: 'Bienestar y tenencia responsable',
        description:
          'Participar en campañas educativas sobre cuidado, prevención y convivencia con animales.',
      },
      {
        title: 'Gestión de espacios de cuidado',
        description:
          'Apoyar la organización de insumos, registros y condiciones básicas de alojamiento y atención.',
      },
      {
        title: 'Proyectos comunitarios',
        description:
          'Colaborar con iniciativas de sensibilización y protección animal en articulación con entidades competentes.',
      },
    ],
    approach:
      'La propuesta articula bienestar animal, prevención y apoyo seguro a los equipos veterinarios. El componente práctico debe desarrollarse en escenarios autorizados, con protocolos de bioseguridad y supervisión profesional.',
    scopeNote:
      'El diagnóstico, la prescripción, la cirugía y los tratamientos corresponden a médicos veterinarios habilitados. Esta ficha no sustituye ese título profesional.',
    source: {
      kind: 'editorial',
      label: 'Redacción orientativa',
      note: 'Programa no incluido en el PDF suministrado.',
    },
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
    graduateProfile:
      'El perfil orientativo busca comprender la relación entre neurodesarrollo, cognición y aprendizaje para enriquecer la práctica educativa. Se enfatiza la lectura crítica de evidencia y el diseño de apoyos pedagógicos, no el diagnóstico clínico.',
    competencies: [
      {
        title: 'Saber conocer',
        icon: 'book',
        items: [
          'Neurodesarrollo, plasticidad y procesos cognitivos básicos.',
          'Atención, memoria, lenguaje y funciones ejecutivas en el aprendizaje.',
          'Barreras, apoyos educativos y neuromitos frecuentes.',
        ],
      },
      {
        title: 'Saber hacer',
        icon: 'hands',
        items: [
          'Analizar demandas cognitivas de tareas y entornos de aprendizaje.',
          'Proponer ajustes pedagógicos y estrategias de aula contextualizadas.',
          'Colaborar con docentes, familias y equipos interdisciplinarios y reconocer cuándo remitir.',
        ],
      },
      {
        title: 'Saber ser',
        icon: 'heart',
        items: [
          'Pensamiento crítico frente a afirmaciones sobre el cerebro.',
          'Respeto por la variabilidad del desarrollo y las trayectorias educativas.',
          'Prudencia ética y trabajo colaborativo.',
        ],
      },
    ],
    careerAreas: [
      {
        title: 'Apoyo a prácticas educativas',
        description:
          'Colaborar en el análisis de barreras y en la planeación de apoyos dentro de instituciones educativas.',
      },
      {
        title: 'Formación docente',
        description:
          'Diseñar talleres y materiales sobre cognición, aprendizaje y uso responsable de evidencia.',
      },
      {
        title: 'Diseño de recursos',
        description:
          'Revisar actividades y materiales considerando atención, memoria, lenguaje y funciones ejecutivas.',
      },
      {
        title: 'Investigación educativa',
        description:
          'Participar en proyectos de lectura, análisis y sistematización de experiencias de aprendizaje.',
      },
    ],
    approach:
      'La propuesta se aleja de explicaciones simplistas sobre el cerebro y promueve una mirada interdisciplinaria. Su aplicación es educativa: comprender procesos cognitivos para mejorar apoyos, sin convertir la formación en una habilitación clínica.',
    scopeNote:
      'No habilita para realizar diagnósticos neuropsicológicos, evaluaciones clínicas ni tratamientos. Esas actividades requieren formación y autorización profesional específicas.',
    source: {
      kind: 'editorial',
      label: 'Redacción orientativa',
      note: 'Programa no incluido en el PDF suministrado.',
    },
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
    graduateProfile:
      'El perfil orientativo analiza los procesos psicosociales en contextos de privación de libertad y los retos de convivencia, salud mental y reintegración. Propone una actuación ética, interdisciplinaria y centrada en la dignidad humana.',
    competencies: [
      {
        title: 'Saber conocer',
        icon: 'book',
        items: [
          'Sistema penitenciario, derechos humanos y contexto institucional.',
          'Factores psicosociales de riesgo, protección y convivencia.',
          'Enfoques de acompañamiento, reintegración y trabajo en red.',
        ],
      },
      {
        title: 'Saber hacer',
        icon: 'hands',
        items: [
          'Analizar necesidades psicosociales y proponer acciones educativas o de apoyo según el rol profesional.',
          'Participar en iniciativas de convivencia, resolución de conflictos y fortalecimiento de redes.',
          'Colaborar con equipos interdisciplinarios y evaluar iniciativas de reintegración.',
        ],
      },
      {
        title: 'Saber ser',
        icon: 'heart',
        items: [
          'Respeto irrestricto por la dignidad y los derechos de las personas.',
          'Confidencialidad, imparcialidad y responsabilidad ética.',
          'Sensibilidad frente al estigma y compromiso con la inclusión social.',
        ],
      },
    ],
    careerAreas: [
      {
        title: 'Programas psicosociales',
        description:
          'Colaborar en iniciativas de convivencia, educación y fortalecimiento de vínculos, según la habilitación profesional.',
      },
      {
        title: 'Reintegración social',
        description:
          'Apoyar acciones de articulación con familias, comunidad y redes de oportunidades.',
      },
      {
        title: 'Trabajo interdisciplinario',
        description:
          'Participar con equipos jurídicos, sociales y de salud en el análisis de necesidades y rutas de atención.',
      },
      {
        title: 'Investigación aplicada',
        description:
          'Sistematizar experiencias y evaluar programas con enfoque de derechos y rigor metodológico.',
      },
    ],
    approach:
      'La propuesta sitúa la dignidad humana y los derechos en el centro del análisis. Evita reducir la conducta a rasgos individuales y promueve la comprensión del contexto institucional, las redes de apoyo y las oportunidades de reintegración.',
    scopeNote:
      'Las funciones clínicas, periciales o de evaluación psicológica requieren título, habilitación y competencias específicas. El programa no las otorga por sí mismo.',
    source: {
      kind: 'editorial',
      label: 'Redacción orientativa',
      note: 'Programa no incluido en el PDF suministrado.',
    },
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
    graduateProfile:
      'El perfil orientativo explora la relación entre comportamiento humano, derechos y contextos judiciales. Busca aportar criterios éticos y metodológicos al trabajo interdisciplinario, con especial cuidado en testimonio, victimología y límites de la actividad pericial.',
    competencies: [
      {
        title: 'Saber conocer',
        icon: 'book',
        items: [
          'Campos de relación entre psicología y derecho.',
          'Procesos de memoria, testimonio, sesgos y toma de decisiones.',
          'Victimología, derechos humanos y ética profesional.',
        ],
      },
      {
        title: 'Saber hacer',
        icon: 'hands',
        items: [
          'Analizar información psicológica en contextos legales reconociendo sus límites.',
          'Leer críticamente informes y colaborar con equipos jurídicos e interdisciplinarios.',
          'Identificar necesidades de protección, remisión y prevención de revictimización.',
        ],
      },
      {
        title: 'Saber ser',
        icon: 'heart',
        items: [
          'Imparcialidad, rigor y transparencia metodológica.',
          'Respeto por los derechos de todas las partes.',
          'Confidencialidad y responsabilidad sobre el uso de la información.',
        ],
      },
    ],
    careerAreas: [
      {
        title: 'Equipos interdisciplinarios',
        description:
          'Colaborar en el análisis de casos y rutas de atención desde una perspectiva psicosocial y jurídica.',
      },
      {
        title: 'Atención a víctimas',
        description:
          'Participar en iniciativas de orientación, protección y prevención de revictimización según el rol profesional.',
      },
      {
        title: 'Investigación y análisis',
        description:
          'Revisar literatura, informes y evidencia sobre testimonio, decisión y contextos judiciales.',
      },
      {
        title: 'Formación y prevención',
        description:
          'Diseñar actividades educativas sobre derechos, memoria, sesgos y actuación ética.',
      },
    ],
    approach:
      'La propuesta enfatiza el rigor metodológico y la comprensión de los límites de la información psicológica en contextos legales. Distingue el aporte interdisciplinario de la actividad pericial, que exige formación y habilitación específicas.',
    scopeNote:
      'La práctica pericial, la evaluación forense y los informes con efectos judiciales requieren habilitación y competencias específicas. Esta ficha no las confiere.',
    source: {
      kind: 'editorial',
      label: 'Redacción orientativa',
      note: 'Programa no incluido en el PDF suministrado.',
    },
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
    graduateProfile:
      'El perfil orientativo aborda la sexualidad humana desde la educación, los derechos y el trabajo interdisciplinario. Busca fortalecer criterios para la promoción del bienestar, la orientación educativa y la derivación responsable, sin asumir una habilitación clínica automática.',
    competencies: [
      {
        title: 'Saber conocer',
        icon: 'book',
        items: [
          'Dimensiones biológicas, psicológicas, sociales y culturales de la sexualidad.',
          'Derechos sexuales, consentimiento, diversidad y bienestar.',
          'Educación afectivo-sexual, prevención y trabajo en red.',
        ],
      },
      {
        title: 'Saber hacer',
        icon: 'hands',
        items: [
          'Diseñar propuestas educativas respetuosas y contextualizadas.',
          'Reconocer necesidades de orientación y criterios de remisión a profesionales de salud.',
          'Colaborar con equipos interdisciplinarios en proyectos de educación y bienestar.',
        ],
      },
      {
        title: 'Saber ser',
        icon: 'heart',
        items: [
          'Respeto por la diversidad y rechazo a la discriminación.',
          'Escucha activa, confidencialidad y comunicación clara.',
          'Actuación ética dentro de los límites de la formación previa.',
        ],
      },
    ],
    careerAreas: [
      {
        title: 'Educación afectivo-sexual',
        description:
          'Participar en talleres y materiales de educación sexual integral para distintos contextos y edades.',
      },
      {
        title: 'Promoción del bienestar',
        description:
          'Colaborar en iniciativas de prevención, derechos y búsqueda de apoyo profesional.',
      },
      {
        title: 'Trabajo interdisciplinario',
        description:
          'Articular acciones con profesionales de salud, psicología y educación según el caso.',
      },
      {
        title: 'Investigación y divulgación',
        description:
          'Analizar fuentes y producir contenidos responsables sobre sexualidad y bienestar.',
      },
    ],
    approach:
      'Esta ficha de especialización no aparece en el PDF suministrado. Su redacción es orientativa y se distingue del diplomado «Sexología y Terapia Sexual» que sí figura en el documento; no se transfieren automáticamente sus contenidos ni duración.',
    scopeNote:
      'La atención terapéutica o clínica requiere formación previa, habilitación y supervisión cuando corresponda. Este programa no la sustituye ni la garantiza.',
    source: {
      kind: 'editorial',
      label: 'Redacción orientativa',
      note: 'Programa no incluido en el PDF suministrado.',
    },
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
    graduateProfile:
      'El perfil orientativo se centra en comprender los factores nutricionales, funcionales y sociales que influyen en la alimentación de las personas mayores. Propone apoyar la educación alimentaria y el trabajo interdisciplinario, respetando los límites de la práctica profesional.',
    competencies: [
      {
        title: 'Saber conocer',
        icon: 'book',
        items: [
          'Cambios fisiológicos del envejecimiento y su relación con la alimentación.',
          'Factores de riesgo nutricional, sociales y funcionales en la vejez.',
          'Educación alimentaria, entornos accesibles y redes de cuidado.',
        ],
      },
      {
        title: 'Saber hacer',
        icon: 'hands',
        items: [
          'Identificar factores que pueden afectar la alimentación y reconocer señales de alerta para remisión.',
          'Participar en actividades de educación y acompañamiento nutricional dentro del alcance profesional.',
          'Colaborar con equipos de salud, cuidadores y familias en iniciativas de bienestar.',
        ],
      },
      {
        title: 'Saber ser',
        icon: 'heart',
        items: [
          'Respeto por la autonomía, hábitos y contexto cultural de la persona mayor.',
          'Empatía y comunicación clara con personas mayores y cuidadores.',
          'Prudencia, actualización y trabajo interdisciplinario.',
        ],
      },
    ],
    careerAreas: [
      {
        title: 'Programas para personas mayores',
        description:
          'Colaborar en iniciativas de educación alimentaria y envejecimiento saludable en contextos comunitarios o institucionales.',
      },
      {
        title: 'Apoyo a cuidadores y familias',
        description:
          'Orientar sobre organización de entornos de alimentación y búsqueda de valoración profesional.',
      },
      {
        title: 'Promoción y prevención',
        description:
          'Participar en campañas de hábitos saludables y detección de situaciones que requieren atención especializada.',
      },
      {
        title: 'Proyectos interdisciplinarios',
        description:
          'Aportar a equipos de salud, gerontología y nutrición en la planeación de acciones de apoyo.',
      },
    ],
    approach:
      'La propuesta relaciona envejecimiento, alimentación y contexto social. Evita reducir la nutrición geriátrica a una lista de alimentos y promueve la autonomía, la accesibilidad y la derivación oportuna a profesionales cuando se requieren valoraciones clínicas.',
    scopeNote:
      'La valoración nutricional clínica y la prescripción dietética requieren formación y habilitación profesional. Esta ficha no las otorga por sí misma.',
    source: {
      kind: 'editorial',
      label: 'Redacción orientativa',
      note: 'Programa no incluido en el PDF suministrado.',
    },
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
    graduateProfile:
      'El perfil orientativo se dirige a profundizar en investigación, innovación y liderazgo educativo. Busca fortalecer la capacidad de analizar problemas educativos, diseñar propuestas contextualizadas y generar reflexión rigurosa sobre la práctica.',
    competencies: [
      {
        title: 'Saber conocer',
        icon: 'book',
        items: [
          'Teorías contemporáneas de la educación, currículo e inclusión.',
          'Métodos de investigación educativa y ética de la investigación.',
          'Evaluación, innovación y gestión de proyectos educativos.',
        ],
      },
      {
        title: 'Saber hacer',
        icon: 'hands',
        items: [
          'Formular preguntas y proyectos de investigación sobre problemas educativos.',
          'Analizar propuestas curriculares y decisiones pedagógicas con criterios teóricos y contextuales.',
          'Diseñar y evaluar iniciativas de innovación con atención a la inclusión.',
        ],
      },
      {
        title: 'Saber ser',
        icon: 'heart',
        items: [
          'Pensamiento crítico y apertura al diálogo académico.',
          'Compromiso con la equidad y la mejora de las oportunidades de aprendizaje.',
          'Responsabilidad ética en el uso de datos y la participación de comunidades.',
        ],
      },
    ],
    careerAreas: [
      {
        title: 'Investigación educativa',
        description:
          'Desarrollar estudios y sistematizaciones que aporten a la comprensión de problemas de aprendizaje y enseñanza.',
      },
      {
        title: 'Innovación curricular',
        description:
          'Participar en el diseño, revisión y evaluación de propuestas pedagógicas y curriculares.',
      },
      {
        title: 'Liderazgo académico',
        description: 'Acompañar equipos, proyectos institucionales y procesos de mejora educativa.',
      },
      {
        title: 'Asesoría y formación',
        description:
          'Colaborar en la formación de docentes y en la toma de decisiones basada en evidencia y contexto.',
      },
    ],
    approach:
      'La propuesta invita a investigar la práctica educativa y a dialogar con teorías contemporáneas. La estructura académica definitiva, la institución que certifica y las condiciones de titulación deben confirmarse con admisiones.',
    scopeNote:
      'La denominación de maestría, el título, el registro y sus efectos académicos o profesionales dependen de la confirmación institucional y de la normativa aplicable.',
    source: {
      kind: 'editorial',
      label: 'Redacción orientativa',
      note: 'Programa no incluido en el PDF suministrado.',
    },
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
    graduateProfile:
      'El perfil orientativo profundiza en la interpretación de fuentes, la reflexión teológica y la investigación de cuestiones contemporáneas de fe, ética y comunidad. Busca articular rigor académico, diálogo respetuoso y vocación de servicio.',
    competencies: [
      {
        title: 'Saber conocer',
        icon: 'book',
        items: [
          'Hermenéutica bíblica y lectura crítica de fuentes teológicas.',
          'Historia del pensamiento cristiano y debates contemporáneos.',
          'Métodos de investigación, escritura académica y ética social cristiana.',
        ],
      },
      {
        title: 'Saber hacer',
        icon: 'hands',
        items: [
          'Interpretar textos y fuentes teológicas con rigor y contextualización.',
          'Construir argumentos en diálogo con distintas perspectivas y tradiciones.',
          'Formular proyectos de investigación o reflexión teológica aplicada a la comunidad.',
        ],
      },
      {
        title: 'Saber ser',
        icon: 'heart',
        items: [
          'Honestidad intelectual y respeto por las fuentes.',
          'Apertura al diálogo y a la libertad religiosa.',
          'Coherencia entre reflexión, ética y servicio.',
        ],
      },
    ],
    careerAreas: [
      {
        title: 'Investigación teológica',
        description:
          'Desarrollar proyectos de análisis de fuentes, historia y pensamiento cristiano.',
      },
      {
        title: 'Enseñanza y formación',
        description:
          'Participar en espacios de educación teológica y acompañamiento académico según los requisitos institucionales.',
      },
      {
        title: 'Reflexión comunitaria',
        description:
          'Aportar criterios éticos y teológicos a iniciativas sociales y de liderazgo comunitario.',
      },
      {
        title: 'Escritura y divulgación',
        description:
          'Producir materiales académicos y de formación para comunidades e instituciones.',
      },
    ],
    approach:
      'La propuesta conecta la tradición cristiana con preguntas del presente y promueve una investigación respetuosa y rigurosa. El plan definitivo, los requisitos académicos y el alcance de la certificación deben consultarse con la fundación.',
    scopeNote:
      'La denominación de maestría, el título y sus efectos académicos o profesionales requieren confirmación institucional y normativa.',
    source: {
      kind: 'editorial',
      label: 'Redacción orientativa',
      note: 'Programa no incluido en el PDF suministrado.',
    },
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
    graduateProfile:
      'El perfil orientativo se centra en analizar problemas colectivos de salud y en explorar herramientas de investigación, gestión y evaluación de iniciativas. Promueve una mirada interdisciplinaria, comunitaria y basada en evidencia.',
    competencies: [
      {
        title: 'Saber conocer',
        icon: 'book',
        items: [
          'Determinantes sociales de la salud y equidad.',
          'Fundamentos de epidemiología e investigación en salud.',
          'Promoción, prevención, sistemas de salud y gestión de proyectos.',
        ],
      },
      {
        title: 'Saber hacer',
        icon: 'hands',
        items: [
          'Interpretar evidencia sobre problemas de salud colectiva.',
          'Participar en la planeación y evaluación de iniciativas de promoción y prevención.',
          'Articular actores comunitarios e institucionales en proyectos de salud pública.',
        ],
      },
      {
        title: 'Saber ser',
        icon: 'heart',
        items: [
          'Compromiso con la equidad y los derechos en salud.',
          'Rigor en el uso de datos y respeto por las comunidades.',
          'Trabajo interdisciplinario y participación responsable.',
        ],
      },
    ],
    careerAreas: [
      {
        title: 'Programas de salud colectiva',
        description:
          'Colaborar en el diseño, gestión y evaluación de iniciativas de promoción y prevención.',
      },
      {
        title: 'Investigación poblacional',
        description:
          'Participar en estudios sobre determinantes, necesidades y resultados en salud.',
      },
      {
        title: 'Gestión y políticas',
        description:
          'Aportar análisis y evidencia a decisiones institucionales y comunitarias en salud.',
      },
      {
        title: 'Educación y participación',
        description:
          'Diseñar acciones de comunicación y trabajo con comunidades para el bienestar colectivo.',
      },
    ],
    approach:
      'La propuesta relaciona determinantes sociales, evidencia y participación comunitaria. Los requisitos, la carga académica y la certificación del programa anunciado en el catálogo requieren confirmación institucional.',
    scopeNote:
      'La denominación de maestría, el título y sus efectos académicos o profesionales requieren confirmación institucional. No habilita automáticamente para actos clínicos reservados.',
    source: {
      kind: 'editorial',
      label: 'Redacción orientativa',
      note: 'Programa no incluido en el PDF suministrado.',
    },
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
      'Intensidad y duración de referencia del PDF (pp. 1–2): 550 horas, aprox. 11 meses. Confirma calendario y vigencia con admisiones.',
    description: [
      'La Programación Neurolingüística (PNL) reúne modelos y técnicas de comunicación y cambio personal. El contenido publicado aborda liderazgo, negociación, aprendizaje y relaciones en diferentes contextos.',
      'El programa se presenta con una mirada crítica: la evidencia científica sobre la eficacia de la PNL es limitada y no debe confundirse con psicoterapia ni con tratamientos de salud validados. Se invita a distinguir herramientas de comunicación de afirmaciones clínicas.',
    ],
    objective:
      'Conocer los modelos de la PNL y analizar sus aplicaciones comunicativas, limitaciones y relación con la evidencia disponible.',
    graduateProfile:
      'El documento describe un perfil de facilitador comunicacional con herramientas de PNL aplicables a educación, organizaciones y desarrollo personal. La ficha conserva una lectura crítica: la PNL no se presenta como psicoterapia ni como tratamiento de salud validado.',
    competencies: [
      {
        title: 'Saber conocer',
        icon: 'book',
        items: [
          'Historia, presuposiciones y principios de la PNL.',
          'Modelos de comunicación, rapport, anclajes y submodalidades.',
          'Liderazgo, negociación, teoría del cambio y neurociencia del lenguaje.',
        ],
      },
      {
        title: 'Saber hacer',
        icon: 'hands',
        items: [
          'Analizar procesos de comunicación y relaciones interpersonales.',
          'Aplicar técnicas de PNL en actividades educativas, organizacionales y de desarrollo personal.',
          'Evaluar críticamente afirmaciones y actuar dentro de límites éticos y profesionales.',
        ],
      },
      {
        title: 'Saber ser',
        icon: 'heart',
        items: [
          'Empatía, escucha y comunicación respetuosa.',
          'Responsabilidad sobre el alcance de las técnicas y de las promesas de cambio.',
          'Pensamiento crítico frente a la evidencia y las afirmaciones de eficacia.',
        ],
      },
    ],
    careerAreas: [
      {
        title: 'Comunicación y formación',
        description:
          'Facilitar actividades de comunicación, liderazgo y habilidades interpersonales en contextos educativos u organizacionales.',
      },
      {
        title: 'Desarrollo organizacional',
        description:
          'Colaborar en procesos de equipo, negociación y gestión del cambio dentro de organizaciones.',
      },
      {
        title: 'Desarrollo personal',
        description:
          'Acompañar procesos de metas y aprendizaje desde un enfoque no clínico y ético.',
      },
      {
        title: 'Investigación y divulgación crítica',
        description:
          'Analizar modelos de PNL, sus aplicaciones y los límites de la evidencia disponible.',
      },
    ],
    approach:
      'El PDF plantea integrar PNL, comunicación y aprendizaje activo con una mirada crítica. La web no traslada las afirmaciones de eficacia clínica o respaldo institucional del documento como hechos verificados; mantiene la advertencia sobre los límites de la evidencia.',
    scopeNote:
      'La PNL no habilita para ejercer psicoterapia, diagnosticar ni tratar condiciones de salud. Su uso debe respetar la formación previa y los límites profesionales.',
    source: {
      kind: 'pdf',
      label: 'PDF institucional suministrado',
      pages: [1, 2],
      url: 'https://www.mediafire.com/file/o98wdwluqpibowc/cursos+de+la+universidad.pdf/file',
    },
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
      'El PDF (pp. 11–15) indica 240 horas: cuatro niveles de 60 h, integrados por 12 módulos de 20 h. El calendario debe confirmarse con admisiones.',
    description: [
      'Este programa aborda el derecho a una educación de calidad y la eliminación de barreras asociadas a la discapacidad y a los contextos culturales. El contenido publicado toma como referencias la Ley 1618 de 2013 y el Decreto 1421 de 2017 en Colombia.',
      'Propone una mirada centrada en las fortalezas y la diversidad cognitiva. Incluye neurodesarrollo, TEA, TDAH y dislexia, junto con estrategias multisensoriales, adaptaciones curriculares y colaboración con familias y comunidades.',
    ],
    objective:
      'Reconocer barreras para el aprendizaje y explorar estrategias pedagógicas que favorezcan la participación de estudiantes con distintas necesidades y fortalezas.',
    graduateProfile:
      'El documento propone un perfil centrado en comprender el neurodesarrollo, identificar barreras y diseñar apoyos educativos inclusivos. Destaca la colaboración con familias y equipos, el uso de tecnología de apoyo y el respeto por las fortalezas cognitivas.',
    competencies: [
      {
        title: 'Saber conocer',
        icon: 'book',
        items: [
          'Neurodesarrollo, aprendizaje y condiciones como TEA, TDAH y dislexia.',
          'Marco de derechos, Ley 1618 de 2013 y Decreto 1421 de 2017 en Colombia.',
          'Estrategias multisensoriales, ajustes curriculares y tecnologías de apoyo.',
        ],
      },
      {
        title: 'Saber hacer',
        icon: 'hands',
        items: [
          'Diseñar estrategias pedagógicas individualizadas y rutinas visuales.',
          'Seleccionar recursos accesibles y colaborar con familias y equipos multidisciplinarios.',
          'Participar en procesos de transición educativa y laboral y en proyectos de innovación inclusiva.',
        ],
      },
      {
        title: 'Saber ser',
        icon: 'heart',
        items: [
          'Respeto profundo por las diferencias cognitivas y las fortalezas de cada persona.',
          'Paciencia, persistencia y mentalidad abierta para adaptar entornos.',
          'Reflexión ética y disposición a cuestionar prácticas excluyentes.',
        ],
      },
    ],
    careerAreas: [
      {
        title: 'Aulas y apoyos educativos',
        description:
          'Colaborar en prácticas inclusivas y apoyos al aprendizaje en instituciones educativas, según el rol y la normativa.',
      },
      {
        title: 'Trabajo con familias y comunidad',
        description:
          'Acompañar procesos de coordinación, orientación educativa y construcción de redes de apoyo.',
      },
      {
        title: 'Tecnología y recursos accesibles',
        description:
          'Participar en la selección y diseño de materiales, aplicaciones y tecnologías de apoyo.',
      },
      {
        title: 'Investigación e innovación',
        description:
          'Desarrollar proyectos de neuroeducación, sistematización de experiencias y mejora de políticas inclusivas.',
      },
    ],
    approach:
      'El PDF destaca una mirada centrada en fortalezas y no en déficits, con integración de neurociencia, psicología y pedagogía. Propone innovación tecnológica y trabajo interdisciplinario; la detección mencionada se entiende en el ámbito educativo y no como habilitación clínica.',
    scopeNote:
      'El diplomado no habilita para diagnóstico clínico, asesoría psicológica escolar ni intervenciones sanitarias reservadas. Esas funciones exigen titulación y habilitación específicas.',
    source: {
      kind: 'pdf',
      label: 'PDF institucional suministrado',
      pages: [11, 12, 13, 14, 15],
      url: 'https://www.mediafire.com/file/o98wdwluqpibowc/cursos+de+la+universidad.pdf/file',
    },
    audience:
      'Docentes, orientadores, estudiantes de educación y personas interesadas en inclusión educativa.',
    modules: [
      module(
        'Nivel básico',
        'Fundamentos, bases y detección educativa',
        [
          'Fundamentos de la Neurodiversidad · 20 h',
          'Bases neurobiológicas y psicológicas · 20 h',
          'Detección y diagnóstico educativo · 20 h',
        ],
        '60 horas',
      ),
      module(
        'Nivel intermedio',
        'Estrategias de enseñanza y adaptación',
        [
          'Estrategias de enseñanza multisensorial · 20 h',
          'Regulación emocional y social · 20 h',
          'Adaptaciones curriculares avanzadas · 20 h',
        ],
        '60 horas',
      ),
      module(
        'Nivel avanzado',
        'Comunidad, investigación e innovación',
        [
          'Trabajo con familias y comunidad · 20 h',
          'Investigación aplicada en neurodiversidad · 20 h',
          'Innovación en neuroeducación · 20 h',
        ],
        '60 horas',
      ),
      module(
        'Nivel experto',
        'Gestión y diseño curricular inclusivo',
        [
          'Gestión y políticas en neurodiversidad · 20 h',
          'Diseño curricular inclusivo · 20 h',
          'Estrategias didácticas inclusivas · 20 h',
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
      'Intensidad y duración de referencia del PDF (pp. 3–4): 750 horas, aprox. 19 meses. Confirma calendario y vigencia con admisiones.',
    description: [
      'La gerontología ofrece un estudio integral del envejecimiento y de las condiciones que favorecen una vejez activa y saludable. El programa aborda desafíos como la fragilidad, la dependencia, la soledad y las enfermedades crónicas asociadas.',
      'Integra perspectivas biomédicas, de políticas públicas y de psicogerontología para comprender los modelos de atención, el apoyo sociofamiliar y la participación de las personas mayores.',
    ],
    objective:
      'Comprender el envejecimiento desde distintas disciplinas y reconocer estrategias de acompañamiento, participación y atención integral a las personas mayores.',
    graduateProfile:
      'El documento describe un perfil integrador de salud, ciencias sociales y servicios para personas mayores. Busca comprender el envejecimiento, planificar apoyos y promover autonomía, participación y dignidad, respetando los límites de la formación previa.',
    competencies: [
      {
        title: 'Saber conocer',
        icon: 'book',
        items: [
          'Biología y psicología del envejecimiento, y demografía de la vejez.',
          'Enfermedades prevalentes, prevención y modelos de cuidado.',
          'Políticas públicas, servicios gerontológicos y gestión de proyectos sociales.',
        ],
      },
      {
        title: 'Saber hacer',
        icon: 'hands',
        items: [
          'Analizar dimensiones biológicas, psicológicas y sociales del envejecimiento.',
          'Participar en la planificación de cuidados y redes de apoyo sociofamiliar según el rol profesional.',
          'Colaborar en programas de envejecimiento activo, investigación aplicada y gestión de servicios.',
        ],
      },
      {
        title: 'Saber ser',
        icon: 'heart',
        items: [
          'Empatía y respeto por la dignidad y autonomía de la persona mayor.',
          'Compromiso con la inclusión y la participación social.',
          'Mirada interdisciplinaria y sensibilidad frente a la dependencia y la soledad.',
        ],
      },
    ],
    careerAreas: [
      {
        title: 'Programas de envejecimiento activo',
        description:
          'Colaborar en iniciativas de participación, autonomía y bienestar para personas mayores.',
      },
      {
        title: 'Servicios y proyectos sociales',
        description:
          'Participar en la gestión de servicios, redes de apoyo y proyectos comunitarios e institucionales.',
      },
      {
        title: 'Apoyo sociofamiliar',
        description:
          'Aportar a la coordinación entre personas mayores, familias, cuidadores y redes de atención.',
      },
      {
        title: 'Investigación e innovación',
        description:
          'Desarrollar proyectos aplicados sobre envejecimiento, tecnologías de apoyo y diseño universal.',
      },
    ],
    approach:
      'El PDF propone una visión transdisciplinaria que incorpora relaciones intergeneracionales, tecnologías de apoyo y diseño universal. Enfatiza la autonomía frente a la dependencia y la pertinencia social de los servicios para personas mayores.',
    scopeNote:
      'Las funciones clínicas, la valoración sanitaria y la dirección de servicios regulados dependen de la titulación previa y la habilitación profesional. El diplomado no las sustituye.',
    source: {
      kind: 'pdf',
      label: 'PDF institucional suministrado',
      pages: [3, 4],
      url: 'https://www.mediafire.com/file/o98wdwluqpibowc/cursos+de+la+universidad.pdf/file',
    },
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
          'Diabetes, hipertensión y demencias',
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
          'Tecnologías de soporte',
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
      'El PDF (pp. 8–10) propone 160 horas en cuatro niveles de 40 h y sugiere un calendario de 4 a 6 meses. Confirma la programación vigente.',
    description: [
      'La psiconeuroinmunología estudia las interacciones entre los procesos psicológicos y los sistemas nervioso, endocrino e inmune. El programa se aproxima al estrés, las emociones y su relación con distintos procesos de salud.',
      'Incluye perspectivas de fisiología, investigación y colaboración interdisciplinaria. No sustituye la atención médica ni permite atribuir las enfermedades únicamente al estado emocional de una persona.',
    ],
    objective:
      'Comprender los fundamentos de las interacciones psiconeuroinmunológicas y analizar de forma crítica su estudio y sus aplicaciones profesionales.',
    graduateProfile:
      'El documento plantea un perfil interdisciplinario para comprender las relaciones entre procesos psicológicos, sistema nervioso, endocrino e inmune. Destaca la lectura crítica de evidencia, la investigación y el diseño de acciones de bienestar dentro del alcance profesional.',
    competencies: [
      {
        title: 'Saber conocer',
        icon: 'book',
        items: [
          'Fisiología del estrés y del eje hipotálamo-hipófisis-adrenal.',
          'Interacciones entre sistemas nervioso, endocrino e inmune.',
          'Psicología de la salud, investigación y determinantes sociales del bienestar.',
        ],
      },
      {
        title: 'Saber hacer',
        icon: 'hands',
        items: [
          'Interpretar información académica sobre estrés, emociones y salud.',
          'Colaborar en proyectos de investigación y acciones de bienestar dentro del alcance profesional.',
          'Reconocer límites de la evidencia y necesidad de derivación a profesionales de salud.',
        ],
      },
      {
        title: 'Saber ser',
        icon: 'heart',
        items: [
          'Sensibilidad y respeto hacia personas con enfermedades crónicas.',
          'Pensamiento crítico y actualización científica.',
          'Responsabilidad ética: no atribuir enfermedades únicamente al estado emocional.',
        ],
      },
    ],
    careerAreas: [
      {
        title: 'Investigación en salud',
        description:
          'Participar en estudios y proyectos sobre interacciones psiconeuroinmunológicas, según la formación y el rol.',
      },
      {
        title: 'Bienestar organizacional',
        description:
          'Colaborar en programas educativos de manejo del estrés y hábitos saludables en organizaciones.',
      },
      {
        title: 'Educación y divulgación',
        description:
          'Preparar contenidos responsables sobre estrés, autocuidado y búsqueda de atención profesional.',
      },
      {
        title: 'Proyectos interdisciplinarios',
        description:
          'Aportar a iniciativas de salud pública, tecnología en salud y bienestar comunitario.',
      },
    ],
    approach:
      'El PDF organiza el contenido en cuatro niveles y propone investigación, innovación tecnológica y políticas de bienestar. La ficha mantiene un enfoque prudente: comprender la relación mente-cuerpo no significa que los estados emocionales expliquen por sí solos una enfermedad.',
    scopeNote:
      'No habilita para diagnosticar, prescribir, interpretar pruebas clínicas ni tratar enfermedades. Esas actividades corresponden a profesionales de salud habilitados.',
    source: {
      kind: 'pdf',
      label: 'PDF institucional suministrado',
      pages: [8, 9, 10],
      url: 'https://www.mediafire.com/file/o98wdwluqpibowc/cursos+de+la+universidad.pdf/file',
    },
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
      'Intensidad y duración de referencia del PDF (pp. 5–6): 640 horas, aprox. 16 meses. Confirma calendario y vigencia con admisiones.',
    description: [
      'El programa estudia la sexualidad humana en sus dimensiones biológica, psicológica, social y cultural. Promueve una perspectiva respetuosa, inclusiva y orientada al bienestar y a la educación afectivo-sexual.',
      'El contenido abarca fundamentos, educación, clínica e investigación. Los aprendizajes relacionados con diagnóstico e intervención solo pueden aplicarse dentro de la habilitación profesional correspondiente; un diplomado no la reemplaza.',
    ],
    objective:
      'Comprender las dimensiones de la sexualidad y desarrollar una mirada educativa y ética sobre la salud sexual, las relaciones y la diversidad.',
    graduateProfile:
      'El documento describe un perfil clínico-educador interdisciplinario en sexualidad humana. La ficha lo presenta con énfasis en educación, derechos, comunicación y trabajo en red; la intervención clínica queda sujeta a la titulación y habilitación previas.',
    competencies: [
      {
        title: 'Saber conocer',
        icon: 'book',
        items: [
          'Fisiología sexual, psicología de la pareja y dimensiones sociales de la sexualidad.',
          'Salud pública, derechos sexuales y educación sexual integral.',
          'Diversidad, prevención, investigación y ética de la atención.',
        ],
      },
      {
        title: 'Saber hacer',
        icon: 'hands',
        items: [
          'Diseñar propuestas de educación afectivo-sexual y prevención contextualizadas.',
          'Comunicar y escuchar con confidencialidad, respeto y claridad.',
          'Colaborar con equipos de salud y educación y reconocer criterios de remisión profesional.',
        ],
      },
      {
        title: 'Saber ser',
        icon: 'heart',
        items: [
          'Respeto por la diversidad, el consentimiento y la autonomía.',
          'Sensibilidad cultural y rechazo a la coerción y la discriminación.',
          'Actuación ética y científica dentro de los límites de la formación.',
        ],
      },
    ],
    careerAreas: [
      {
        title: 'Educación sexual integral',
        description:
          'Participar en programas educativos para jóvenes, familias y comunidades desde un enfoque de derechos.',
      },
      {
        title: 'Promoción de la salud sexual',
        description:
          'Colaborar en iniciativas de prevención, bienestar y acceso a información y servicios.',
      },
      {
        title: 'Trabajo interdisciplinario',
        description:
          'Aportar a equipos de salud, psicología y educación en proyectos de orientación y acompañamiento.',
      },
      {
        title: 'Investigación y formación',
        description:
          'Desarrollar materiales, estudios y actividades de formación en sexología con rigor y ética.',
      },
    ],
    approach:
      'El PDF propone un abordaje integral, inclusivo y basado en evidencia, con referencias a perspectiva de género, derechos sexuales y tecnologías emergentes. La web conserva esas líneas sin presentar la formación como habilitación clínica automática.',
    scopeNote:
      'El diagnóstico y la terapia sexual requieren formación previa, habilitación y condiciones profesionales específicas. Un diplomado no reemplaza esos requisitos.',
    source: {
      kind: 'pdf',
      label: 'PDF institucional suministrado',
      pages: [5, 6],
      url: 'https://www.mediafire.com/file/o98wdwluqpibowc/cursos+de+la+universidad.pdf/file',
    },
    audience:
      'Profesionales y estudiantes de salud, psicología, educación y áreas afines; consultar requisitos de admisión.',
    modules: [
      module(
        'Nivel básico',
        'Fundamentos de la sexualidad',
        ['Bases biológicas humanas', 'Bases sociales de la sexualidad', 'Introducción clínica'],
        '160 horas',
      ),
      module(
        'Nivel intermedio',
        'Educación y prevención',
        [
          'Estrategias educativas integrales',
          'Prevención de riesgos en salud',
          'Educación afectivo-sexual',
        ],
        '180 horas',
      ),
      module(
        'Nivel avanzado',
        'Clínica y terapéutica',
        [
          'Diagnóstico e intervención clínica: alcance profesional',
          'Disfunciones sexuales',
          'Orientación de pareja y diversidad',
        ],
        '180 horas',
      ),
      module(
        'Nivel experto',
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
  // Video institucional heredado. Puede anularse en una ficha concreta con `video: null`.
  video: p.video ?? (p.original ? 'PT6zEhrBaI0' : null),
  // Video introductorio propio: pega aquí un ID o enlace de YouTube.
  // Ejemplo: introVideo: 'https://www.youtube.com/watch?v=XXXXXXXXXXX'
  // Si está vacío, el área muestra «Video introductorio próximamente».
  // El video institucional heredado queda como enlace secundario cuando existe.
  introVideo: p.introVideo ?? null,
  introVideoTitle: p.introVideoTitle ?? null,
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
  '202601',
  '202602',
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
