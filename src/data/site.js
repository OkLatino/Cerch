// Datos verificados de CERCH (Contexto_CERCH.md + sitio original).
export const CONTACT = {
  name: 'CERCH',
  legal: 'Centro de Especialidades Renales de Chilpancingo S.C.',
  phones: ['747 116 0237', '747 265 3143'],
  whatsapp: '5217472194953',
  whatsappText: 'Hola, me gustaría agendar una cita en CERCH',
  emails: [
    'citas@cespecialidadesrenales.com.mx',
    'contacto@cespecialidadesrenales.com.mx',
  ],
  address: {
    line1: 'Av. Reyes Aztecas Mz 1 Lt 6 y 7',
    line2: 'Fraccionamiento Huicacalli, C.P. 39096',
    city: 'Chilpancingo de los Bravo, Guerrero',
  },
  mapsUrl:
    'https://maps.google.com/?q=Av.+Reyes+Aztecas+Mz+1+Lt+6+y+7,+Fraccionamiento+Huicacalli,+Chilpancingo,+Guerrero',
  social: {
    facebook: 'https://www.facebook.com/share/14Qgq4bXShd/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/hemodialisis.centro?igsh=NTdwNWU4MGwwd2kx',
    tiktok: 'https://www.tiktok.com/@hemodialisis.centro?_r=1&_t=ZS-91UDARhtiB',
    youtube: 'https://youtube.com/shorts/4IwTEHFdEgY?si=C2iWAKDd5sdiZKP0',
  },
  cofepris: {
    clave: '253301201A2681',
    institucion: 'Universidad Nacional Autónoma de México (UNAM)',
    cedula: '3152712',
  },
}

export function waLink(text) {
  const msg = encodeURIComponent(text || CONTACT.whatsappText)
  return `https://wa.me/${CONTACT.whatsapp}?text=${msg}`
}

export const SERVICES = [
  {
    id: 'hemodialisis',
    icon: 'droplet',
    title: 'Hemodiálisis',
    featured: true,
    desc: 'Tratamiento de última generación con máquinas modernas, en un ambiente cómodo y monitoreado por especialistas certificados.',
    features: [
      'Equipos de última tecnología',
      'Monitoreo continuo especializado',
      'Instalaciones cómodas y seguras',
      'Atención personalizada por sesión',
    ],
  },
  {
    id: 'nefrologia-adultos',
    icon: 'user',
    title: 'Nefrología de adultos',
    desc: 'Prevención, diagnóstico y tratamiento de enfermedades renales en pacientes adultos.',
    schedule: 'Lun a Vie 17:30–20:00 · Sáb 11:00–14:00',
  },
  {
    id: 'nefrologia-pediatrica',
    icon: 'pediatric',
    title: 'Nefrología pediátrica',
    desc: 'Atención especializada para niños con problemas renales, en un ambiente pensado para los más pequeños.',
    schedule: 'Lun a Sáb 10:30–13:00',
  },
  {
    id: 'dialisis-peritoneal',
    icon: 'cycle',
    title: 'Diálisis peritoneal',
    desc: 'Alternativa de diálisis con acompañamiento clínico y capacitación para el paciente y su familia.',
  },
  {
    id: 'trasplante-renal',
    icon: 'heart',
    title: 'Trasplante renal',
    desc: 'Valoración, preparación y seguimiento para pacientes candidatos a trasplante de riñón.',
  },
  {
    id: 'enfermedad-renal-cronica',
    icon: 'shield',
    title: 'Insuficiencia y enfermedad renal crónica',
    desc: 'Manejo integral de la insuficiencia renal y la enfermedad renal crónica en todas sus etapas.',
  },
]

export const BLOG_POSTS = [
  {
    category: 'Prevención',
    title: '10 hábitos para mantener tus riñones sanos',
    excerpt:
      'Las prácticas diarias que ayudan a prevenir enfermedades renales y mejorar tu calidad de vida.',
    date: '5 Dic 2025',
    read: '5 min',
    href: '/pages/habitos-rinones-sanos.html',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=520&fit=crop',
  },
  {
    category: 'Síntomas',
    title: 'Señales de alerta: cuándo consultar a un nefrólogo',
    excerpt:
      'Conoce los síntomas que indican que es momento de acudir con un especialista en riñones.',
    date: '2 Dic 2025',
    read: '4 min',
    href: '/pages/senales-alerta-nefrologo.html',
    img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=520&fit=crop',
  },
  {
    category: 'Tratamiento',
    title: 'Hemodiálisis: todo lo que necesitas saber',
    excerpt:
      'Una guía completa sobre el tratamiento de hemodiálisis y cómo mejora la vida de los pacientes.',
    date: '28 Nov 2025',
    read: '6 min',
    href: '/pages/hemodialisis-todo-saber.html',
    img: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=520&fit=crop',
  },
  {
    category: 'Nutrición',
    title: 'Alimentación renal: qué comer y qué evitar',
    excerpt:
      'Recomendaciones nutricionales para cuidar tus riñones y acompañar tu tratamiento.',
    date: '20 Nov 2025',
    read: '5 min',
    href: '/pages/alimentacion-renal.html',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=520&fit=crop',
  },
  {
    category: 'Bienestar',
    title: 'Ejercicio y salud renal: cómo cuidarte en movimiento',
    excerpt:
      'La actividad física adecuada para personas con enfermedad renal y sus beneficios.',
    date: '12 Nov 2025',
    read: '4 min',
    href: '/pages/ejercicio-renal.html',
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=520&fit=crop',
  },
  {
    category: 'Tecnología',
    title: 'Tecnología renal: avances que mejoran el tratamiento',
    excerpt:
      'Innovaciones en diálisis y diagnóstico que hacen más segura la atención renal.',
    date: '4 Nov 2025',
    read: '5 min',
    href: '/pages/tecnologia-renal.html',
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=520&fit=crop',
  },
]
