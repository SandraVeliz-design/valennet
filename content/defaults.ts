export type ServiceContent = {
  n: string;
  title: string;
  copy: string;
  /** Contenido ampliado para la ficha pública de la solución (HTML básico). */
  details?: string;
  tags: string[];
  category?: 'Infraestructura y conectividad'|'Data Center y continuidad'|'Ciberseguridad'|'Seguridad electrónica'|'Servicios complementarios';
  outcome?: string;
  audience?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
  imageAlt?: string;
  gallery?: Array<{ url: string; alt?: string }>;
  featured?: boolean;
  visible?: boolean;
};

export type CertificationContent = {
  id: string;
  issuer: 'Cisco' | 'VMware' | 'Microsoft';
  title: string;
  category: 'Data Center' | 'Networking' | 'Seguridad' | 'Cloud y transformación';
  year?: string;
  image?: string;
  featured: boolean;
  visible: boolean;
};

export type SiteContent = {
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    foundation: string;
    location: string;
    focus: string;
    principles: string[];
    closing: string;
    image?: string;
    imageAlt?: string;
    visible: boolean;
  };
  services: ServiceContent[];
  solutions?: {
    eyebrow: string;
    title: string;
    description: string;
    categories: string[];
  };
  capacity: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ title: string; description: string }>;
    closing: string;
    visible: boolean;
  };
  certifications: CertificationContent[];
  projects: Array<{
    id: string;
    title: string;
    sector: string;
    summary: string;
    client: string;
    image?: string;
    imageAlt?: string;
    showClient: boolean;
    visible?: boolean;
    status: 'draft' | 'published';
  }>;
  courses: Array<{
    id: string;
    title: string;
    category: string;
    modality: string;
    status: 'draft' | 'available' | 'coming-soon';
    visible?: boolean;
  }>;
  training: {
    title: string;
    description: string;
    categories: string[];
  };
  contact: {
    title: string;
    email: string;
    whatsapp: string;
  };
};

export const defaultContent: SiteContent = {
  hero: {
    eyebrow: 'Ingeniería e implementación tecnológica',
    title: 'Infraestructura preparada para proyectos de',
    accent: 'alta exigencia.',
    description: 'Diseñamos e implementamos soluciones de infraestructura TI, Data Center, seguridad y conectividad para organizaciones que necesitan rendimiento, continuidad y protección.',
  },
  about: {
    eyebrow: 'Quiénes somos',
    title: 'Integramos infraestructura, seguridad y conectividad para operaciones que no pueden detenerse.',
    description: 'Valennet Solutions diseña e implementa infraestructura tecnológica para organizaciones que necesitan continuidad, seguridad y capacidad de crecimiento. Integramos distintas tecnologías y fabricantes en una solución coordinada, desde el diagnóstico hasta el soporte.',
    foundation: '2024',
    location: 'Perú',
    focus: 'Integración tecnológica y transformación digital',
    principles: ['Diseño según requerimientos', 'Implementación coordinada', 'Continuidad y soporte'],
    closing: 'Entendemos la operación, diseñamos la arquitectura adecuada y acompañamos su evolución después de la implementación.',
    image: '/project-data-center.png',
    imageAlt: 'Imagen referencial de infraestructura tecnológica y data center',
    visible: true,
  },
  services: [
    { n:'01', title:'Infraestructura TI', copy:'Arquitecturas de conectividad, cómputo y disponibilidad diseñadas para sostener operaciones críticas.', tags:['Networking','Servidores','Hiperconvergencia'], category:'Infraestructura y conectividad', outcome:'Una base tecnológica estable y preparada para crecer.', ctaLabel:'Evaluar mi infraestructura', featured:true, visible:true },
    { n:'02', title:'Data Center', copy:'Diseño e implementación de las capas que mantienen la información disponible, organizada y preparada para crecer.', tags:['On-premise','Cloud','Continuidad'], category:'Data Center y continuidad', outcome:'Información disponible, protegida y recuperable.', ctaLabel:'Diseñar mi Data Center', featured:true, visible:true },
    { n:'03', title:'Ciberseguridad', copy:'Protección incorporada desde la arquitectura para reducir exposición y fortalecer cada entorno.', tags:['Perímetro','Hardening','Hacking ético'], category:'Ciberseguridad', outcome:'Menor exposición y mayor control sobre los riesgos.', ctaLabel:'Proteger mi operación', featured:true, visible:true },
    { n:'04', title:'Seguridad electrónica', copy:'Videovigilancia conectada a una infraestructura confiable para observar, registrar y responder.', tags:['CCTV / IP','Monitoreo','Integración'], category:'Seguridad electrónica', outcome:'Visibilidad y respuesta sobre instalaciones y activos.', ctaLabel:'Integrar seguridad', featured:true, visible:true },
    { n:'05', title:'Redes y conectividad', copy:'Redes LAN, WAN, WLAN y WiFi diseñadas para conectar personas, sedes y operaciones con estabilidad.', tags:['LAN / WAN','WLAN','WiFi Analytics'], category:'Infraestructura y conectividad', featured:false },
    { n:'06', title:'Virtualización y backup', copy:'Entornos virtualizados y respaldos confiables para optimizar la agilidad, disponibilidad y recuperación de la información.', tags:['Virtualización','Backup','Recuperación'], category:'Data Center y continuidad', featured:false },
    { n:'07', title:'Cableado estructurado', copy:'Instalaciones ordenadas y certificables para sostener redes estables en interiores, data centers y sedes.', tags:['Fibra óptica','UTP','Certificación'], category:'Servicios complementarios', featured:false },
    { n:'08', title:'Comunicaciones unificadas', copy:'Integración de voz, video, mensajería y correo electrónico para mejorar la colaboración empresarial.', tags:['Voz','Video','Colaboración'], category:'Infraestructura y conectividad', featured:false },
    { n:'09', title:'Outsourcing TI', copy:'Soporte presencial y remoto, mantenimiento preventivo y acompañamiento técnico para la operación diaria.', tags:['Soporte','Mantenimiento','Operación'], category:'Servicios complementarios', featured:false },
    { n:'10', title:'Equipamiento tecnológico', copy:'Suministro de equipos informáticos, periféricos y soluciones multimedia según las necesidades de cada organización.', tags:['Workstations','Impresión','Multimedia'], category:'Servicios complementarios', featured:false },
  ],
  solutions: {
    eyebrow: '01 / SOLUCIONES',
    title: 'Ingeniería de extremo a extremo.',
    description: 'Cuatro capas conectadas para convertir una necesidad tecnológica en una operación estable.',
    categories: ['Todas','Infraestructura y conectividad','Data Center y continuidad','Ciberseguridad','Seguridad electrónica'],
  },
  capacity: {
    eyebrow: '02 / CAPACIDAD TÉCNICA',
    title: 'Capacidad para integrar proyectos tecnológicos de alta complejidad.',
    description: 'Coordinamos tecnologías, fabricantes y equipos especializados para construir soluciones confiables en entornos exigentes.',
    items: [
      { title:'MULTITECNOLOGÍA', description:'Integramos infraestructura, conectividad, seguridad, nube y telecomunicaciones.' },
      { title:'MULTIFABRICANTE', description:'Combinamos tecnologías y marcas de acuerdo con los requerimientos de cada proyecto.' },
      { title:'MISIÓN CRÍTICA', description:'Diseñamos para entornos donde la continuidad, la seguridad y la disponibilidad son esenciales.' },
      { title:'ALCANCE NACIONAL', description:'Articulamos implementación, mantenimiento y soporte presencial o remoto.' },
    ],
    closing: 'Un solo equipo para coordinar tecnologías, fabricantes y etapas de implementación.',
    visible: true,
  },
  certifications: [
    {id:'cisco-ccnp-dc',issuer:'Cisco',title:'CCNP Data Center',category:'Data Center',featured:true,visible:true},
    {id:'cisco-ccnp-security',issuer:'Cisco',title:'CCNP Security',category:'Seguridad',featured:true,visible:true},
    {id:'cisco-ccnp-enterprise',issuer:'Cisco',title:'CCNP Enterprise',category:'Networking',featured:true,visible:true},
    {id:'cisco-enterprise-core',issuer:'Cisco',title:'Cisco Certified Specialist - Enterprise Core',category:'Networking',featured:false,visible:true},
    {id:'cisco-enterprise-advanced',issuer:'Cisco',title:'Cisco Certified Specialist - Enterprise Advanced Infrastructure Implementation',category:'Networking',featured:false,visible:true},
    {id:'cisco-dc-core',issuer:'Cisco',title:'Cisco Certified Specialist - Data Center Core',category:'Data Center',featured:false,visible:true},
    {id:'cisco-dc-aci',issuer:'Cisco',title:'Cisco Certified Specialist - Data Center ACI Implementation',category:'Data Center',featured:false,visible:true},
    {id:'cisco-dc-design',issuer:'Cisco',title:'Cisco Certified Specialist - Data Center Design',category:'Data Center',featured:false,visible:true},
    {id:'cisco-security-identity',issuer:'Cisco',title:'Cisco Certified Specialist - Security Identity Management Implementation',category:'Seguridad',featured:false,visible:true},
    {id:'cisco-security-core',issuer:'Cisco',title:'Cisco Certified Specialist - Security Core',category:'Seguridad',featured:false,visible:true},
    {id:'cisco-devnet',issuer:'Cisco',title:'Cisco Certified DevNet Associate',category:'Networking',featured:false,visible:true},
    {id:'vmware-vcie-2024',issuer:'VMware',title:'VMware Certified Implementation Expert - Data Center Virtualization',category:'Data Center',year:'2024',featured:true,visible:true},
    {id:'vmware-vcap-deploy-2024',issuer:'VMware',title:'VMware Certified Advanced Professional - Data Center Virtualization Deploy [V2]',category:'Data Center',year:'2024',featured:false,visible:true},
    {id:'vmware-vcap-design-2021',issuer:'VMware',title:'VMware Certified Advanced Professional - Data Center Virtualization Design',category:'Data Center',year:'2021',featured:false,visible:true},
    {id:'vmware-vcp-nv-2020',issuer:'VMware',title:'VMware Certified Professional - Network Virtualization',category:'Networking',year:'2020',featured:true,visible:true},
    {id:'vmware-vcp-dcv-2020',issuer:'VMware',title:'VMware Certified Professional - Data Center Virtualization',category:'Data Center',year:'2020',featured:false,visible:true},
    {id:'vmware-vca-dbt-2020',issuer:'VMware',title:'VMware Certified Associate - Digital Business Transformation',category:'Cloud y transformación',year:'2020',featured:false,visible:true},
    {id:'vmware-double-vcp',issuer:'VMware',title:'Double VCP - Data Center Virtualization & Network Virtualization',category:'Data Center',featured:false,visible:true},
    {id:'microsoft-azure-fundamentals',issuer:'Microsoft',title:'Microsoft Certified: Azure Fundamentals',category:'Cloud y transformación',featured:true,visible:true},
  ],
  projects: [],
  courses: [],
  training: {
    title: 'La infraestructura también conecta conocimiento.',
    description: 'Formación técnica orientada a profesionales y equipos que necesitan aplicar lo aprendido en escenarios reales.',
    categories: ['Networking','Seguridad informática','Hacking ético','Pentesting'],
  },
  contact: {
    title: 'Conectemos tu próximo proyecto.',
    email: '',
    whatsapp: '',
  },
};
