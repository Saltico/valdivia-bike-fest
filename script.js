// URL oficial de inscripciones - fácilmente reemplazable
const REGISTRATION_URL = 'https://www.eventrid.cl/eventos/mvk/valdivia-bikefest-2026';

const routeData = {
  xco: { index: '01 / 02', title: 'XCO', description: 'Cross-Country Olímpico con largada y llegada en el Complejo Deportivo ASENAV. Circuito de ~3,6 km y ~170 m de desnivel por vuelta, con un punto de abastecimiento y sectores para público.', distance: '~3,6 km / vuelta', elevation: '~170 m / vuelta', time: 'Por confirmar' },
  xcc: { index: '02 / 02', title: 'XCC', description: 'Short Track en el Complejo Deportivo ASENAV: ~0,81 km y ~18 m de desnivel por vuelta, con ~20 minutos de duración. Referencia 2026: ~10 vueltas Elite Masculino y ~9 Elite Femenino.', distance: '~0,81 km / vuelta', elevation: '~18 m / vuelta', time: 'Por confirmar' }
};

const translations = {
  es: { status: 'Próxima edición', days: 'días', hours: 'horas', minutes: 'min', seconds: 'seg' },
  en: { status: 'Next edition', days: 'days', hours: 'hours', minutes: 'min', seconds: 'sec' }
};

let currentLanguage = 'es';
let toastTimer;

const demoResultsData = {
  xco: [
    { pos:1, dorsal:101, name:"Matías Castillo", club:"VBK Team", cat:"elite-m", catLabel:"Elite M", time:"1:24:32", dif:"—" },
    { pos:2, dorsal:102, name:"Felipe Vera", club:"MTB Valdivia", cat:"elite-m", catLabel:"Elite M", time:"1:25:44", dif:"+1:12" },
    { pos:3, dorsal:103, name:"Tomás Oyarzún", club:"Pedal Sur", cat:"elite-m", catLabel:"Elite M", time:"1:26:18", dif:"+1:46" },
    { pos:4, dorsal:104, name:"Andrés Muñoz", club:"Team Austral", cat:"sub23-m", catLabel:"Sub23 M", time:"1:27:05", dif:"+2:33" },
    { pos:5, dorsal:105, name:"Joaquín Cárdenas", club:"CC Osorno", cat:"sub23-m", catLabel:"Sub23 M", time:"1:28:11", dif:"+3:39" },
    { pos:6, dorsal:106, name:"Bastián Leal", club:"VBK Team", cat:"junior-m", catLabel:"Junior M", time:"1:29:40", dif:"+5:08" },
    { pos:7, dorsal:107, name:"Rocío Navarro", club:"MTB Valdivia", cat:"elite-f", catLabel:"Elite F", time:"1:30:22", dif:"+5:50" },
    { pos:8, dorsal:108, name:"Javiera Salinas", club:"Pedal Sur", cat:"elite-f", catLabel:"Elite F", time:"1:31:05", dif:"+6:33" },
    { pos:9, dorsal:109, name:"Camila Ponce", club:"Team Austral", cat:"sub23-f", catLabel:"Sub23 F", time:"1:32:48", dif:"+8:16" },
    { pos:10, dorsal:110, name:"Isidora Araneda", club:"CC Osorno", cat:"junior-f", catLabel:"Junior F", time:"1:33:29", dif:"+8:57" },
    { pos:11, dorsal:111, name:"Héctor Barría", club:"VBK Team", cat:"master-a", catLabel:"Master A", time:"1:34:55", dif:"+10:23" },
    { pos:12, dorsal:112, name:"Sergio Mansilla", club:"Pedal Sur", cat:"master-b", catLabel:"Master B", time:"1:35:40", dif:"+11:08" },
    { pos:13, dorsal:113, name:"Patricio Oelckers", club:"MTB Valdivia", cat:"master-c", catLabel:"Master C", time:"1:38:12", dif:"+13:40" },
    { pos:14, dorsal:114, name:"Renato Soto", club:"Team Austral", cat:"master-d", catLabel:"Master D", time:"1:41:03", dif:"+16:31" },
    { pos:15, dorsal:115, name:"Nicolás Paredes", club:"CC Osorno", cat:"open", catLabel:"Open", time:"1:42:20", dif:"+17:48" }
  ],
  xcc: [
    { pos:1, dorsal:201, name:"Ignacio Delgado", club:"VBK Team", cat:"elite-m", catLabel:"Elite M", time:"19:42", dif:"—" },
    { pos:2, dorsal:202, name:"Alonso Bahamonde", club:"MTB Valdivia", cat:"elite-m", catLabel:"Elite M", time:"19:58", dif:"+0:16" },
    { pos:3, dorsal:203, name:"Vicente Arroyo", club:"Pedal Sur", cat:"elite-m", catLabel:"Elite M", time:"20:11", dif:"+0:29" },
    { pos:4, dorsal:204, name:"Dante Ojeda", club:"Team Austral", cat:"sub23-m", catLabel:"Sub23 M", time:"20:25", dif:"+0:43" },
    { pos:5, dorsal:205, name:"Lucas Villalobos", club:"CC Osorno", cat:"sub23-m", catLabel:"Sub23 M", time:"20:40", dif:"+0:58" },
    { pos:6, dorsal:206, name:"Benjamín Soto", club:"VBK Team", cat:"junior-m", catLabel:"Junior M", time:"20:55", dif:"+1:13" },
    { pos:7, dorsal:207, name:"Florencia Orellana", club:"MTB Valdivia", cat:"elite-f", catLabel:"Elite F", time:"21:08", dif:"+1:26" },
    { pos:8, dorsal:208, name:"Antonia Riquelme", club:"Pedal Sur", cat:"elite-f", catLabel:"Elite F", time:"21:22", dif:"+1:40" },
    { pos:9, dorsal:209, name:"Emilia Cárdenas", club:"Team Austral", cat:"sub23-f", catLabel:"Sub23 F", time:"21:45", dif:"+2:03" },
    { pos:10, dorsal:210, name:"Martina Fuentes", club:"CC Osorno", cat:"junior-f", catLabel:"Junior F", time:"22:01", dif:"+2:19" },
    { pos:11, dorsal:211, name:"Rodrigo Millar", club:"VBK Team", cat:"master-a", catLabel:"Master A", time:"22:30", dif:"+2:48" },
    { pos:12, dorsal:212, name:"Eduardo Ulloa", club:"Pedal Sur", cat:"master-b", catLabel:"Master B", time:"22:55", dif:"+3:13" },
    { pos:13, dorsal:213, name:"Carlos Huenchul", club:"MTB Valdivia", cat:"master-c", catLabel:"Master C", time:"23:30", dif:"+3:48" },
    { pos:14, dorsal:214, name:"Mario Trejo", club:"Team Austral", cat:"master-d", catLabel:"Master D", time:"24:12", dif:"+4:30" },
    { pos:15, dorsal:215, name:"Sebastián Calfu", club:"CC Osorno", cat:"open", catLabel:"Open", time:"24:48", dif:"+5:06" }
  ]
};

const pageCopy = {
  index: {
    en: {
      '#hero-title': 'The route<br><em>is waiting</em>',
      '.hero-intro': 'A mountain bike competition between forest, water, and city. Save your place at the start line and know the terrain before you arrive.',
      '.signal-line': 'Valdivia / Chile <span class="signal-rule"></span> VBF / NEXT EDITION',
      '.status-message': '10–14 March 2027 <span aria-hidden="true">↗\uFE0E</span>',
      '#event-title': 'Five days<br><em>Two formats</em>',
      '.event-intro .lead-copy': 'Valdivia Bike Fest brings together those who come for the challenge and stay for the landscape. Everything you need to prepare for your race, in one place.',
      '.event-intro .arrow-link': 'Discover the event <span aria-hidden="true">↗\uFE0E</span>',
      '.event-grid-label': 'WHAT YOU\'LL FIND',
      '.info-list li:nth-child(1) strong': 'Two race<br>formats',
      '.info-list li:nth-child(1) em': 'XCO and XCC circuits in Valdivia.',
      '.info-list li:nth-child(2) strong': 'Information<br>without surprises',
      '.info-list li:nth-child(2) em': 'Route, schedule, and clear recommendations.',
      '.info-list li:nth-child(3) strong': 'The energy<br>of the pack',
      '.info-list li:nth-child(3) em': 'A community that starts before pedaling.',
      
      '#route-title': 'Read the terrain<br>before you <em>ride it</em>',
      '.route-tab:nth-child(1) strong': 'XCO',
      '.route-tab:nth-child(1) small': 'Cross-Country Olympic · ~3.6 km per lap',
      '.route-tab:nth-child(2) strong': 'XCC',
      '.route-tab:nth-child(2) small': 'Short Track · ~0.81 km per lap',
      '.route-detail-top span:last-child': 'OFFICIAL',
      '.detail-footer span': 'Schedule and lap counts per category are defined at the technical meeting.',
      '.detail-footer a': 'View full route <span aria-hidden="true">↗\uFE0E</span>',
      
      '#schedule-title': 'Everything<br>in its <em>time</em>',
      '.schedule-row:nth-child(1) strong': 'Kit pickup',
      '.schedule-row:nth-child(1) span': 'Wednesday, March 10, 9:00 AM',
      '.schedule-row:nth-child(1) em': 'Activities begin',
      '.schedule-row:nth-child(2) strong': 'Technical meeting',
      '.schedule-row:nth-child(2) span': 'Sunday, March 14, TBC',
      '.schedule-row:nth-child(2) em': 'All categories',
      '.schedule-row:nth-child(3) strong': 'Main start',
      '.schedule-row:nth-child(3) span': 'Sunday, March 14, 2:10 PM',
      '.schedule-row:nth-child(3) em': 'The clock starts here',
      '.schedule-row:nth-child(4) strong': 'Results',
      '.schedule-row:nth-child(4) span': 'After each finish',
      '.schedule-row:nth-child(4) em': 'Online query',
      
      '#results-title': 'Your mark<br>stays <em>here</em>',
      '.results-copy > p:not(.section-kicker)': 'When the race ends, find your time, your category, and where you placed in the pack. The official board awaits you on a single screen.',
      '.results-copy .button-dark': 'View full results <span aria-hidden="true">↗\uFE0E</span>',
      
      '#valdivia-title': 'Come to compete<br><em>Discover the city</em>',
      '.valdivia-copy > p:not(.section-kicker)': 'A city of rivers, rain, and deep green. Turn your race into a getaway and discover the place that gives this experience its character.',
      '.valdivia-copy .arrow-link': 'Discover Valdivia <span aria-hidden="true">↗\uFE0E</span>',
      '.map-phrase': 'WHERE WATER<br>MEETS THE FOREST',
      
      '#contact-title': 'See you<br>on the <em>route</em>',
      '.cta-coordinate': 'VALDIVIA / CHILE',
      '.final-cta .section-kicker': 'Your next race',
      '.cta-actions .text-link': 'Contact us <span aria-hidden="true">↗\uFE0E</span>',
      
      '.site-footer .footer-links a:nth-child(1)': 'Event',
      '.site-footer .footer-links a:nth-child(2)': 'Route & schedule',
      '.site-footer .footer-links a:nth-child(3)': 'Results',
      '.site-footer .footer-links a:nth-child(4)': 'Valdivia',
      '.site-footer .footer-links a:nth-child(5)': 'Contact',
      '.footer-meta span:first-child': '© VBF / Valdivia, Chile',
      '.footer-meta span:last-child': 'ES / EN'
    },
    es: {
      '#hero-title': 'La ruta<br><em>está esperando</em>',
      '.hero-intro': 'Una competencia de mountain bike entre bosque, agua y ciudad. Guarda tu lugar en la línea de partida y conoce el terreno antes de llegar.',
      '.signal-line': 'Valdivia / Chile <span class="signal-rule"></span> VBF / PRÓXIMA EDICIÓN',
      '.status-message': '10–14 marzo 2027 <span aria-hidden="true">↗\uFE0E</span>',
      
      '#event-title': 'Cinco días<br><em>Dos formatos</em>',
      '.event-intro .lead-copy': 'Valdivia Bike Fest reúne a quienes llegan por el desafío y se quedan por el paisaje. Todo lo que necesitas para preparar tu carrera, en un solo lugar.',
      '.event-intro .arrow-link': 'Conoce el evento <span aria-hidden="true">↗\uFE0E</span>',
      '.event-grid-label': 'LO QUE ENCONTRARÁS',
      '.info-list li:nth-child(1) strong': 'Dos formatos<br>de carrera',
      '.info-list li:nth-child(1) em': 'Circuitos XCO y XCC en Valdivia.',
      '.info-list li:nth-child(2) strong': 'Información<br>sin sorpresas',
      '.info-list li:nth-child(2) em': 'Ruta, horarios y recomendaciones claras.',
      '.info-list li:nth-child(3) strong': 'La energía<br>del pelotón',
      '.info-list li:nth-child(3) em': 'Una comunidad que empieza antes de pedalear.',
      
      '#route-title': 'Lee el terreno<br>antes de <em>vivirlo</em>',
      '.route-tab:nth-child(1) strong': 'XCO',
      '.route-tab:nth-child(1) small': 'Cross-Country Olímpico · ~3,6 km por vuelta',
      '.route-tab:nth-child(2) strong': 'XCC',
      '.route-tab:nth-child(2) small': 'Short Track · ~0,81 km por vuelta',
      '.route-detail-top span:last-child': 'OFICIAL',
      '.detail-footer span': 'Horarios y vueltas por categoría se definen en el congreso técnico.',
      '.detail-footer a': 'Ver ruta completa <span aria-hidden="true">↗\uFE0E</span>',
      
      '#schedule-title': 'Todo en<br><em>su momento</em>',
      '.schedule-row:nth-child(1) strong': 'Retiro de kit',
      '.schedule-row:nth-child(1) span': 'Miércoles 10 de marzo, 9:00 hrs',
      '.schedule-row:nth-child(1) em': 'Inicio de actividades',
      '.schedule-row:nth-child(2) strong': 'Reunión de corredores',
      '.schedule-row:nth-child(2) span': 'Domingo 14 de marzo, por confirmar',
      '.schedule-row:nth-child(2) em': 'Atención a todas las categorías',
      '.schedule-row:nth-child(3) strong': 'Largada principal',
      '.schedule-row:nth-child(3) span': 'Domingo 14 de marzo, 14:10 hrs',
      '.schedule-row:nth-child(3) em': 'El reloj empieza aquí',
      '.schedule-row:nth-child(4) strong': 'Resultados',
      '.schedule-row:nth-child(4) span': 'Después de cada llegada',
      '.schedule-row:nth-child(4) em': 'Consulta online',
      
      '#results-title': 'La marca<br>queda <em>aquí</em>',
      '.results-copy > p:not(.section-kicker)': 'Cuando la carrera termine, busca tu tiempo, tu categoría y el lugar que ocupaste en el pelotón. El tablero oficial te espera en una sola pantalla.',
      '.results-copy .button-dark': 'Ver resultados completos <span aria-hidden="true">↗\uFE0E</span>',
      
      '#valdivia-title': 'Ven a competir<br><em>Conoce la ciudad</em>',
      '.valdivia-copy > p:not(.section-kicker)': 'Una ciudad de ríos, lluvia y verde profundo. Haz de tu carrera una escapada y conoce el lugar que le da su carácter a esta experiencia.',
      '.valdivia-copy .arrow-link': 'Descubre Valdivia <span aria-hidden="true">↗\uFE0E</span>',
      '.map-phrase': 'DONDE EL AGUA<br>ENCUENTRA EL BOSQUE',
      
      '#contact-title': 'Nos vemos<br>en la <em>ruta</em>',
      '.cta-coordinate': 'VALDIVIA / CHILE',
      '.final-cta .section-kicker': 'Tu próxima carrera',
      '.cta-actions .text-link': 'Contáctanos <span aria-hidden="true">↗\uFE0E</span>',
      
      '.site-footer .footer-links a:nth-child(1)': 'Evento',
      '.site-footer .footer-links a:nth-child(2)': 'Ruta y horario',
      '.site-footer .footer-links a:nth-child(3)': 'Resultados',
      '.site-footer .footer-links a:nth-child(4)': 'Valdivia',
      '.site-footer .footer-links a:nth-child(5)': 'Contacto',
      '.footer-meta span:first-child': '© VBF / Valdivia, Chile',
      '.footer-meta span:last-child': 'ES / EN'
    }
  },
  evento: {
    en: { 
      // 1. Hero
      '.event-hero .section-kicker': 'Valdivia Bike Fest / The event',
      '.event-hero h1': 'The race<br>starts <em>earlier</em>', 
      '.event-hero .inner-intro > p:last-child': 'More than a competition: a meeting point between continental mountain biking and the cycling community of southern Chile.',
      // 2. What is it?
      '.event-intro-section .section-kicker': 'What is it?',
      '.event-intro-section h2': 'An <em>international</em><br>mountain bike event',
      '.event-intro-lead': 'Valdivia Bike Fest is an international mountain bike competition held in Valdivia, Los Ríos Region, Chile. Organized as a round of the <strong>American Continental Series MTB</strong>, the event brings together top cross-country riders from the continent and offers a world-class competitive experience in one of the most distinctive natural settings in southern Chile.',
      '.event-intro-detail-list > div:nth-child(1) strong': 'UCI Calendar',
      '.event-intro-detail-list > div:nth-child(1) p': 'A round of the American Continental Series MTB with points toward the world ranking.',
      '.event-intro-detail-list > div:nth-child(2) strong': 'Two formats',
      '.event-intro-detail-list > div:nth-child(2) p': 'Cross-Country Olympic (XCO) and Short Track (XCC) at a single venue.',
      '.event-intro-detail-list > div:nth-child(3) strong': 'National selection',
      '.event-intro-detail-list > div:nth-child(3) p': 'First selection round for the Chilean National Team.',
      // 3. Purpose
      '.event-purpose-section .section-kicker': 'Purpose',
      '.event-purpose-section h2': 'Why this<br>event <em>exists</em>',
      '.event-purpose-item:nth-child(1) strong': 'Develop mountain biking in Chile',
      '.event-purpose-item:nth-child(1) p': 'Create international-level competitions that place the country on the continental calendar and give Chilean athletes the chance to earn UCI points without leaving home.',
      '.event-purpose-item:nth-child(2) strong': 'Opportunities for riders of all levels',
      '.event-purpose-item:nth-child(2) p': 'From Elite and Sub23 categories to Master, youth, and promotional. The event opens the door to established riders and those just starting their competitive journey.',
      '.event-purpose-item:nth-child(3) strong': 'Competition and community in one place',
      '.event-purpose-item:nth-child(3) p': 'Combining high performance with a family-friendly, inclusive atmosphere where every participant — regardless of level — is a key part of the event.',
      '.event-purpose-item:nth-child(4) strong': 'Position Valdivia as a sports destination',
      '.event-purpose-item:nth-child(4) p': 'Let international riders discover southern Chile: its forests, rivers, and the culture of a city best explored without rushing.',
      // 4. International
      '.event-international-section .section-kicker': 'International character',
      '.event-international-section h2': 'From the continent<br><em>to the world</em>',
      '.event-international-lead': 'Valdivia Bike Fest is part of the <strong>American Continental Series MTB</strong> calendar, which means each edition attracts top cross-country riders from South America and across the Pan-American region, including continental champions, Olympic medalists, and national teams from across the continent.',
      '.international-item:nth-child(1) .international-label': 'Calendar',
      '.international-item:nth-child(1) .international-value': 'American Continental Series MTB',
      '.international-item:nth-child(2) .international-label': 'Points',
      '.international-item:nth-child(2) .international-value': 'UCI World Ranking',
      '.international-item:nth-child(3) .international-label': 'Selection',
      '.international-item:nth-child(3) .international-value': '1st round Chile National Team',
      '.international-item:nth-child(4) .international-label': 'Overseen by',
      '.international-item:nth-child(4) .international-value': 'Fedenacich + COPACI',
      // 5. Community
      '.event-community-section .section-kicker': 'Community',
      '.event-community-section h2': 'An event<br><em>for everyone</em>',
      '.event-community-content > p': 'Valdivia Bike Fest is not just for elite athletes. It is a family-friendly, inclusive event where the community of riders, families, and mountain bike fans comes together around competition and nature.',
      '.community-feature:nth-child(1) strong': 'Open categories',
      '.community-feature:nth-child(1) p': 'Short Track Open and Promotional for those who want the race experience without a UCI license.',
      '.community-feature:nth-child(2) strong': 'Youth and cadets',
      '.community-feature:nth-child(2) p': 'Categories from pre-youth to youth, so the next generation can grow in the sport.',
      '.community-feature:nth-child(3) strong': 'Master A, B, C and D',
      '.community-feature:nth-child(3) p': 'From 30 to 60 and beyond. Competition has no age limit.',
      // 6. Valdivia
      '.event-valdivia-copy .section-kicker': 'Territory',
      '.event-valdivia-copy h2': 'Valdivia<br><em>is the event</em>',
      '.event-valdivia-copy > p:nth-of-type(1)': 'Valdivian forest, mighty rivers, rain, and deep green. Racing in southern Chile is an experience that goes beyond the circuit: it is the land that gives the race its character.',
      '.event-valdivia-copy > p:nth-of-type(2)': 'The territorial identity of Valdivia — its German-Chilote culture, gastronomy, wetlands, and proximity to volcanoes and national parks — makes each edition truly unique.',
      '.event-valdivia-copy .arrow-link': 'Discover Valdivia <span aria-hidden="true">↗\uFE0E</span>',
      // 7. Organizers
      '.event-organizers-section .section-kicker': 'Organized by',
      '.organizer-block:nth-child(1) .organizer-role': 'Organizer',
      '.organizer-block:nth-child(2) .organizer-role': 'Overseen by',
      '.organizer-block:nth-child(3) .organizer-role': 'International backing',
      '.organizer-block:nth-child(2) .organizer-detail': 'Cycling Federation of Chile',
      '.organizer-block:nth-child(3) .organizer-detail': 'Pan American Cycling Confederation',
      // 8. History
      '.event-history-section .section-kicker': 'VBF / History',
      '.event-history-section h2': 'Two editions<br><em>One legacy</em>',
      '.history-card:nth-child(1) .history-edition': 'Second edition',
      '.history-card:nth-child(1) .history-champion:nth-child(1) .champion-label': 'Absolute champion',
      '.history-card:nth-child(1) .history-champion:nth-child(2) .champion-label': 'Women\'s champion',
      '.history-card:nth-child(1) .history-note': 'Opening round of the American Continental Series MTB. First selection round for the Chilean National Team.',
      '.history-card:nth-child(2) .history-edition': 'First edition',
      '.history-card:nth-child(2) .champion-label': 'Data to be confirmed',
      '.history-card:nth-child(2) .history-note': 'Information about the inaugural edition coming soon.',
      // 9. CTA
      '.event-cta-content .section-kicker': 'Next step',
      '.event-cta-content h2': 'See the<br><em>2027 edition</em>',
      '.event-cta-content > p': 'Circuits, schedule, categories, and everything you need to arrive in Valdivia with your mind set on the route.',
      '.event-cta-actions .button-lime': 'See 2027 edition <span aria-hidden="true">↗\uFE0E</span>',
      '.event-cta-actions .button-ghost': 'Register <span aria-hidden="true">↗\uFE0E</span>'
    },
    es: { 
      // 1. Hero
      '.event-hero .section-kicker': 'Valdivia Bike Fest / El evento',
      '.event-hero h1': 'La carrera<br>empieza <em>antes</em>', 
      '.event-hero .inner-intro > p:last-child': 'Más que una competencia: un punto de encuentro entre el mountain bike continental y la comunidad ciclista del sur de Chile.',
      // 2. ¿Qué es?
      '.event-intro-section .section-kicker': '¿Qué es?',
      '.event-intro-section h2': 'Un evento<br><em>internacional</em> de mountain bike',
      '.event-intro-lead': 'Valdivia Bike Fest es una competencia internacional de mountain bike que se realiza en Valdivia, Región de Los Ríos, Chile. Organizada como fecha del <strong>American Continental Series MTB</strong>, el evento reúne a referentes del cross-country continental y ofrece una experiencia competitiva de alto nivel en uno de los entornos naturales más distintivos del sur de Chile.',
      '.event-intro-detail-list > div:nth-child(1) strong': 'Calendario UCI',
      '.event-intro-detail-list > div:nth-child(1) p': 'Fecha del American Continental Series MTB con puntaje para el ranking mundial.',
      '.event-intro-detail-list > div:nth-child(2) strong': 'Dos formatos',
      '.event-intro-detail-list > div:nth-child(2) p': 'Cross-Country Olímpico (XCO) y Short Track (XCC) en una misma sede.',
      '.event-intro-detail-list > div:nth-child(3) strong': 'Seleccionadores nacionales',
      '.event-intro-detail-list > div:nth-child(3) p': 'Primera fecha selectiva para la Selección Nacional de Chile.',
      // 3. Propósito
      '.event-purpose-section .section-kicker': 'Propósito',
      '.event-purpose-section h2': 'Por qué<br><em>existe</em> este evento',
      '.event-purpose-item:nth-child(1) strong': 'Desarrollar el mountain bike en Chile',
      '.event-purpose-item:nth-child(1) p': 'Generar competencias de nivel internacional que posicionen al país en el calendario continental y ofrezcan a los atletas chilenos la oportunidad de sumar puntos UCI sin salir de su territorio.',
      '.event-purpose-item:nth-child(2) strong': 'Oportunidades para atletas de distintos niveles',
      '.event-purpose-item:nth-child(2) p': 'Desde categorías Elite y Sub23 hasta Master, menores y promocional. El evento abre la puerta tanto a corredores consagrados como a quienes recién comienzan su camino competitivo.',
      '.event-purpose-item:nth-child(3) strong': 'Competencia y comunidad en un mismo lugar',
      '.event-purpose-item:nth-child(3) p': 'Combinar el alto rendimiento con un ambiente familiar e inclusivo, donde cada participante —sin importar su nivel— es parte fundamental del evento.',
      '.event-purpose-item:nth-child(4) strong': 'Posicionar a Valdivia como destino deportivo',
      '.event-purpose-item:nth-child(4) p': 'Que los riders internacionales conozcan el sur de Chile: sus bosques, sus ríos y la cultura de una ciudad que se vive mejor sin apuro.',
      // 4. Carácter internacional
      '.event-international-section .section-kicker': 'Carácter internacional',
      '.event-international-section h2': 'Del continente<br><em>para el mundo</em>',
      '.event-international-lead': 'Valdivia Bike Fest forma parte del calendario <strong>American Continental Series MTB</strong>, lo que significa que cada edición atrae a referentes del cross-country sudamericano y panamericano, incluyendo campeones continentales, medallistas olímpicos y equipos nacionales de todo el continente.',
      '.international-item:nth-child(1) .international-label': 'Calendario',
      '.international-item:nth-child(1) .international-value': 'American Continental Series MTB',
      '.international-item:nth-child(2) .international-label': 'Puntaje',
      '.international-item:nth-child(2) .international-value': 'Ranking mundial UCI',
      '.international-item:nth-child(3) .international-label': 'Selectivo',
      '.international-item:nth-child(3) .international-value': '1ª fecha Selección Nacional Chile',
      '.international-item:nth-child(4) .international-label': 'Fiscaliza',
      '.international-item:nth-child(4) .international-value': 'Fedenacich + COPACI',
      // 5. Comunidad
      '.event-community-section .section-kicker': 'Comunidad',
      '.event-community-section h2': 'Un evento<br><em>para todos</em>',
      '.event-community-content > p': 'Valdivia Bike Fest no es solo para atletas de élite. Es un evento familiar e inclusivo donde la comunidad de riders, familias y seguidores del mountain bike se encuentra en torno a la competencia y la naturaleza.',
      '.community-feature:nth-child(1) strong': 'Categorías abiertas',
      '.community-feature:nth-child(1) p': 'Short Track Open y Promocional para quienes quieren vivir la experiencia de competencia sin necesidad de licencia UCI.',
      '.community-feature:nth-child(2) strong': 'Menores y cadetes',
      '.community-feature:nth-child(2) p': 'Categorías desde pre-juvenil hasta juvenil, para que las nuevas generaciones crezcan en el deporte.',
      '.community-feature:nth-child(3) strong': 'Master A, B, C y D',
      '.community-feature:nth-child(3) p': 'Desde los 30 hasta los 60 y más. La competencia no tiene límite de edad.',
      // 6. Valdivia
      '.event-valdivia-copy .section-kicker': 'Territorio',
      '.event-valdivia-copy h2': 'Valdivia<br><em>es el evento</em>',
      '.event-valdivia-copy > p:nth-of-type(1)': 'Bosque valdiviano, ríos caudalosos, lluvia y verde profundo. Competir en el sur de Chile es una experiencia que va más allá del circuito: es el territorio el que le da carácter a la carrera.',
      '.event-valdivia-copy > p:nth-of-type(2)': 'La identidad territorial de Valdivia —su cultura germano-chilota, su gastronomía, sus humedales y su cercanía con volcanes y parques nacionales— convierte cada edición en algo irrepetible.',
      '.event-valdivia-copy .arrow-link': 'Descubre Valdivia <span aria-hidden="true">↗\uFE0E</span>',
      // 7. Organizadores
      '.event-organizers-section .section-kicker': 'Organiza',
      '.organizer-block:nth-child(1) .organizer-role': 'Organiza',
      '.organizer-block:nth-child(2) .organizer-role': 'Fiscaliza',
      '.organizer-block:nth-child(3) .organizer-role': 'Respaldo internacional',
      '.organizer-block:nth-child(2) .organizer-detail': 'Federación de Ciclismo de Chile',
      '.organizer-block:nth-child(3) .organizer-detail': 'Confederación Panamericana de Ciclismo',
      // 8. Historia
      '.event-history-section .section-kicker': 'VBF / Historia',
      '.event-history-section h2': 'Dos ediciones<br><em>Una trayectoria</em>',
      '.history-card:nth-child(1) .history-edition': 'Segunda edición',
      '.history-card:nth-child(1) .history-champion:nth-child(1) .champion-label': 'Campeón absoluto',
      '.history-card:nth-child(1) .history-champion:nth-child(2) .champion-label': 'Campeona femenina',
      '.history-card:nth-child(1) .history-note': 'Fecha inaugural del American Continental Series MTB. Primera fecha selectiva para la Selección Nacional de Chile.',
      '.history-card:nth-child(2) .history-edition': 'Primera edición',
      '.history-card:nth-child(2) .champion-label': 'Datos por confirmar',
      '.history-card:nth-child(2) .history-note': 'Información de la edición inaugural próximamente.',
      // 9. CTA
      '.event-cta-content .section-kicker': 'Siguiente paso',
      '.event-cta-content h2': 'Conoce la<br><em>edición 2027</em>',
      '.event-cta-content > p': 'Circuitos, programa, categorías y todo lo que necesitas para llegar a Valdivia con la cabeza puesta en la ruta.',
      '.event-cta-actions .button-lime': 'Ver edición 2027 <span aria-hidden="true">↗\uFE0E</span>',
      '.event-cta-actions .button-ghost': 'Inscríbete <span aria-hidden="true">↗\uFE0E</span>'
    }
  },
  ruta: {
    en: { 
      // 1. Hero
      '.event-hero .section-kicker': 'Valdivia Bike Fest / 2027 Edition',
      '.event-hero h1': 'Two circuits<br><em>One venue</em>', 
      '.event-hero .inner-intro > p:last-child': 'Everything you need to know about the 2027 edition: dates, circuits, categories, schedule, and registration.',
      // 2. Data board
      '.contact-race-item:nth-child(1) .contact-race-label': 'Date',
      '.contact-race-item:nth-child(1) .contact-race-value': '10–14 March 2027',
      '.contact-race-item:nth-child(2) .contact-race-label': 'Venue',
      '.contact-race-item:nth-child(2) .contact-race-value': 'C.D. ASENAV, Valdivia',
      '.contact-race-item:nth-child(3) .contact-race-label': 'First activity',
      '.contact-race-item:nth-child(3) .contact-race-value': 'Wed 10 Mar — 9:00 AM',
      '.contact-race-item:nth-child(4) .contact-race-label': 'Formats',
      '.contact-race-item:nth-child(4) .contact-race-value': 'XCO / XCC',
      '.contact-race-item:nth-child(5) .contact-race-label': 'UCI points',
      '.contact-race-item:nth-child(5) .contact-race-value': 'World ranking',
      // 3. Formats / Circuits
      '.event-formats-section .section-kicker': 'Race formats',
      '.event-formats-section h2': 'Two circuits<br><em>One venue</em>',
      '.event-formats-grid .circuit-card:nth-child(1) .circuit-label': 'Circuit 01',
      '.event-formats-grid .circuit-card:nth-child(1) .circuit-full-name': 'Cross-Country Olympic',
      '.event-formats-grid .circuit-card:nth-child(1) .metric:nth-child(1) .metric-label': 'Distance per lap',
      '.event-formats-grid .circuit-card:nth-child(1) .metric:nth-child(2) .metric-label': 'Elevation gain',
      '.event-formats-grid .circuit-card:nth-child(1) .metric:nth-child(3) .metric-label': 'Feed zone',
      '.event-formats-grid .circuit-card:nth-child(1) .metric:nth-child(3) .metric-unit': 'point',
      '.event-formats-grid .circuit-card:nth-child(1) .circuit-details p': 'Technical circuit with forest sectors, climbs, and descents. Spectator zones allow you to follow the race at strategic points.',
      '.event-formats-grid .circuit-card:nth-child(1) .status-value': 'Set at the technical meeting',
      '.event-formats-grid .circuit-card:nth-child(2) .circuit-label': 'Circuit 02',
      '.event-formats-grid .circuit-card:nth-child(2) .circuit-full-name': 'Short Track',
      '.event-formats-grid .circuit-card:nth-child(2) .metric:nth-child(1) .metric-label': 'Distance per lap',
      '.event-formats-grid .circuit-card:nth-child(2) .metric:nth-child(2) .metric-label': 'Elevation gain',
      '.event-formats-grid .circuit-card:nth-child(2) .metric:nth-child(3) .metric-label': 'Approx. duration',
      '.event-formats-grid .circuit-card:nth-child(2) .metric:nth-child(3) .metric-unit': 'min',
      '.event-formats-grid .circuit-card:nth-child(2) .circuit-details p': 'Short and explosive circuit. Intense race format with multiple laps. 2026 reference: ~10 laps Elite Men, ~9 Elite Women.',
      '.event-formats-grid .circuit-card:nth-child(2) .status-value': 'Set at the technical meeting',
      '.event-formats-note': 'Schedules, laps, and categories are set at the technical meeting.',
      // 4. Schedule
      '.event-schedule-section .section-kicker': 'Schedule',
      '.event-schedule-section h2': 'Five days<br>lived in <em>full</em>',
      '.event-schedule-row:nth-child(1) strong': 'Wednesday, March 10',
      '.event-schedule-row:nth-child(1) span': 'Kit pickup + accreditation — 9:00 AM',
      '.event-schedule-row:nth-child(1) .schedule-status': 'Confirmed',
      '.event-schedule-row:nth-child(2) strong': 'Thursday, March 11',
      '.event-schedule-row:nth-child(2) span': 'Technical meeting — Time TBC',
      '.event-schedule-row:nth-child(2) .schedule-status': 'Pending',
      '.event-schedule-row:nth-child(3) strong': 'Friday, March 12',
      '.event-schedule-row:nth-child(3) span': 'Races — Time TBC',
      '.event-schedule-row:nth-child(3) .schedule-status': 'Pending',
      '.event-schedule-row:nth-child(4) strong': 'Saturday, March 13',
      '.event-schedule-row:nth-child(4) span': 'Races — Time TBC',
      '.event-schedule-row:nth-child(4) .schedule-status': 'Pending',
      '.event-schedule-row:nth-child(5) strong': 'Sunday, March 14',
      '.event-schedule-row:nth-child(5) span': 'Final starts + awards — Time TBC',
      '.event-schedule-row:nth-child(5) .schedule-status': 'Pending',
      // 6. Categories
      '.event-categories-section .section-kicker': 'Categories',
      '.event-categories-section h2': 'All the<br><em>categories</em>',
      '.category-group:nth-child(1) h3': 'UCI International',
      '.category-group:nth-child(2) h3': 'Master',
      '.category-group:nth-child(3) h3': 'Open',
      '.category-group:nth-child(4) h3': 'Youth',
      '.event-categories-note': 'Category list subject to official confirmation.',
      // 7. Final CTA
      '#route-contact-title': 'See you<br>on the <em>route</em>',
      '.final-cta .section-kicker': 'Your next race',
      '.final-cta .cta-coordinate': 'VALDIVIA / CHILE',
      '.cta-actions .text-link': 'Contact us <span aria-hidden="true">↗\uFE0E</span>'
    },
    es: { 
      // 1. Hero
      '.event-hero .section-kicker': 'Valdivia Bike Fest / Edición 2027',
      '.event-hero h1': 'Dos circuitos<br><em>Una sede</em>', 
      '.event-hero .inner-intro > p:last-child': 'Todo lo que necesitas saber sobre la edición 2027: fechas, circuitos, categorías, programa e inscripción.',
      // 2. Datos clave
      '.contact-race-item:nth-child(1) .contact-race-label': 'Fecha',
      '.contact-race-item:nth-child(1) .contact-race-value': '10–14 marzo 2027',
      '.contact-race-item:nth-child(2) .contact-race-label': 'Sede',
      '.contact-race-item:nth-child(2) .contact-race-value': 'C.D. ASENAV, Valdivia',
      '.contact-race-item:nth-child(3) .contact-race-label': 'Primera actividad',
      '.contact-race-item:nth-child(3) .contact-race-value': 'Mié 10 mar — 09:00 hrs',
      '.contact-race-item:nth-child(4) .contact-race-label': 'Formatos',
      '.contact-race-item:nth-child(4) .contact-race-value': 'XCO / XCC',
      '.contact-race-item:nth-child(5) .contact-race-label': 'Puntos UCI',
      '.contact-race-item:nth-child(5) .contact-race-value': 'Ranking mundial',
      // 3. Formatos / Circuitos
      '.event-formats-section .section-kicker': 'Formatos de competencia',
      '.event-formats-section h2': 'Dos circuitos<br><em>Una sede</em>',
      '.event-formats-grid .circuit-card:nth-child(1) .circuit-label': 'Circuito 01',
      '.event-formats-grid .circuit-card:nth-child(1) .circuit-full-name': 'Cross-Country Olímpico',
      '.event-formats-grid .circuit-card:nth-child(1) .metric:nth-child(1) .metric-label': 'Distancia por vuelta',
      '.event-formats-grid .circuit-card:nth-child(1) .metric:nth-child(2) .metric-label': 'Desnivel acumulado',
      '.event-formats-grid .circuit-card:nth-child(1) .metric:nth-child(3) .metric-label': 'Abastecimiento',
      '.event-formats-grid .circuit-card:nth-child(1) .circuit-details p': 'Circuito técnico con sectores de bosque, escalada y descenso. Sectores destinados al público permiten seguir la carrera en puntos estratégicos.',
      '.event-formats-grid .circuit-card:nth-child(1) .status-value': 'Se define en congreso técnico',
      '.event-formats-grid .circuit-card:nth-child(2) .circuit-label': 'Circuito 02',
      '.event-formats-grid .circuit-card:nth-child(2) .circuit-full-name': 'Short Track',
      '.event-formats-grid .circuit-card:nth-child(2) .metric:nth-child(1) .metric-label': 'Distancia por vuelta',
      '.event-formats-grid .circuit-card:nth-child(2) .metric:nth-child(2) .metric-label': 'Desnivel acumulado',
      '.event-formats-grid .circuit-card:nth-child(2) .metric:nth-child(3) .metric-label': 'Duración aprox.',
      '.event-formats-grid .circuit-card:nth-child(2) .metric:nth-child(3) .metric-unit': 'min',
      '.event-formats-grid .circuit-card:nth-child(2) .circuit-details p': 'Circuito corto y explosivo. Formato de carrera intenso con múltiples vueltas. Referencia 2026: ~10 vueltas Elite Masculino, ~9 Elite Femenino.',
      '.event-formats-grid .circuit-card:nth-child(2) .status-value': 'Se define en congreso técnico',
      '.event-formats-note': 'Horarios, vueltas y categorías se definen en el congreso técnico.',
      // 4. Programa
      '.event-schedule-section .section-kicker': 'Programa',
      '.event-schedule-section h2': 'Cinco días<br>que se viven <em>completos</em>',
      '.event-schedule-row:nth-child(1) strong': 'Miércoles 10 de marzo',
      '.event-schedule-row:nth-child(1) span': 'Retiro de kits + acreditación — 09:00 hrs',
      '.event-schedule-row:nth-child(1) .schedule-status': 'Confirmado',
      '.event-schedule-row:nth-child(2) strong': 'Jueves 11 de marzo',
      '.event-schedule-row:nth-child(2) span': 'Congreso técnico — Horario por confirmar',
      '.event-schedule-row:nth-child(2) .schedule-status': 'Pendiente',
      '.event-schedule-row:nth-child(3) strong': 'Viernes 12 de marzo',
      '.event-schedule-row:nth-child(3) span': 'Competencias — Horario por confirmar',
      '.event-schedule-row:nth-child(3) .schedule-status': 'Pendiente',
      '.event-schedule-row:nth-child(4) strong': 'Sábado 13 de marzo',
      '.event-schedule-row:nth-child(4) span': 'Competencias — Horario por confirmar',
      '.event-schedule-row:nth-child(4) .schedule-status': 'Pendiente',
      '.event-schedule-row:nth-child(5) strong': 'Domingo 14 de marzo',
      '.event-schedule-row:nth-child(5) span': 'Largadas finales + premiación — Horario por confirmar',
      '.event-schedule-row:nth-child(5) .schedule-status': 'Pendiente',
      // 6. Categorías
      '.event-categories-section .section-kicker': 'Categorías',
      '.event-categories-section h2': 'Todas las<br><em>categorías</em>',
      '.category-group:nth-child(1) h3': 'UCI Internacional',
      '.category-group:nth-child(2) h3': 'Master',
      '.category-group:nth-child(3) h3': 'Abiertas',
      '.category-group:nth-child(4) h3': 'Menores',
      '.event-categories-note': 'Listado de categorías sujeto a confirmación oficial.',
      // 7. CTA Final
      '#route-contact-title': 'Nos vemos<br>en la <em>ruta</em>',
      '.final-cta .section-kicker': 'Tu próxima carrera',
      '.final-cta .cta-coordinate': 'VALDIVIA / CHILE',
      '.cta-actions .text-link': 'Contáctanos <span aria-hidden="true">↗\uFE0E</span>'
    }
  },
  resultados: {
    en: {
      '.results-hero .section-kicker': 'Valdivia Bike Fest / Results 2027',
      '.results-hero h1': 'Your mark<br><em>goes here</em>',
      '.results-hero .inner-intro > p:last-child': 'The official board goes live after each start. Come back to find your time and check your category result.',
      '.results-demo-badge': 'DEMO DATA',
      '.results-demo-note': 'Demo table with fictitious data. The official board activates after each start.',
      '.results-board-head span:first-child': 'VBF / RESULTS',
      '.results-board-head span:last-child': 'LIVE \u00b7 DEMO',
      '[data-i18n="results-chip-all"]': 'All',
      '.results-table thead th:nth-child(1)': 'POS',
      '.results-table thead th:nth-child(2)': 'BIB',
      '.results-table thead th:nth-child(3)': 'RIDER',
      '.results-table thead th:nth-child(4)': 'CLUB',
      '.results-table thead th:nth-child(5)': 'CATEGORY',
      '.results-table thead th:nth-child(6)': 'TIME',
      '.results-table thead th:nth-child(7)': 'DIFF.',
      '.results-board-foot span:nth-child(1)': 'XCO',
      '.results-board-foot span:nth-child(2)': 'XCC',
      '.results-board-foot span:nth-child(3)': 'CATEGORIES'
    },
    es: {
      '.results-hero .section-kicker': 'Valdivia Bike Fest / Resultados 2027',
      '.results-hero h1': 'Tu marca<br><em>queda aqu\u00ed</em>',
      '.results-hero .inner-intro > p:last-child': 'El tablero oficial se activar\u00e1 despu\u00e9s de cada largada. Vuelve para buscar tu tiempo y revisar el resultado de tu categor\u00eda.',
      '.results-demo-badge': 'DATOS DE PRUEBA',
      '.results-demo-note': 'Tabla de demostraci\u00f3n con datos ficticios. El tablero oficial se activa despu\u00e9s de cada largada.',
      '.results-board-head span:first-child': 'VBF / RESULTADOS',
      '.results-board-head span:last-child': 'EN VIVO \u00b7 DEMO',
      '[data-i18n="results-chip-all"]': 'Todas',
      '.results-table thead th:nth-child(1)': 'POS',
      '.results-table thead th:nth-child(2)': 'DORSAL',
      '.results-table thead th:nth-child(3)': 'CORREDOR/A',
      '.results-table thead th:nth-child(4)': 'CLUB',
      '.results-table thead th:nth-child(5)': 'CATEGOR\u00cdA',
      '.results-table thead th:nth-child(6)': 'TIEMPO',
      '.results-table thead th:nth-child(7)': 'DIF.',
      '.results-board-foot span:nth-child(1)': 'XCO',
      '.results-board-foot span:nth-child(2)': 'XCC',
      '.results-board-foot span:nth-child(3)': 'CATEGOR\u00cdAS'
    }
  },
  valdivia: {
    en: { 
      '.valdivia-hero-content .section-kicker': 'Valdivia Bike Fest / Valdivia', 
      '.valdivia-hero-content h1': 'Race in the<br><em>city of water</em>', 
      '.valdivia-intro-text': 'Valdivia is a city of rivers, rain, and deep green. Come for the competition, stay for the forests, the gastronomy, and a culture best explored without rushing. Here water meets forest, and every corner has a story to tell.', 
      '.valdivia-recommendations-header .section-kicker': 'Recommendations', 
      '.valdivia-recommendations-header h2': 'Discover<br><em>Valdivia</em>',
      // Destinations nav tooltips
      '.destinations-nav-item:nth-child(1)': 'Forests',
      '.destinations-nav-item:nth-child(2)': 'Volcano',
      '.destinations-nav-item:nth-child(3)': 'Wetlands',
      '.destinations-nav-item:nth-child(4)': 'Breweries',
      '.destinations-nav-item:nth-child(5)': 'History',
      // Destination sections
      '#alerce-costero-title': 'Alerce Costero: <span class="destination-title-accent">ancient forests</span> by the Pacific',
      '#alerce-costero .destination-description': 'Enter one of the most biodiverse temperate forests on the planet. Alerce Costero National Park is home to millenary trees, trails among myrtles and coigües, and unique coastal landscapes in the Los Ríos Region.',
      '#alerce-costero .destination-link': 'Learn more <span aria-hidden="true">↗\uFE0E</span>',
      '#mocho-choshuenco-title': 'Mocho Choshuenco: mountains, <span class="destination-title-accent">snow and adventure</span>',
      '#mocho-choshuenco .destination-description': 'Climb to the crater of this active volcano and discover a turquoise lagoon at its summit. Mocho Choshuenco National Reserve offers trekking, winter sports, and panoramic views of the Andes and the Pacific Ocean.',
      '#mocho-choshuenco .destination-link': 'Learn more <span aria-hidden="true">↗\uFE0E</span>',
      '#punucapa-title': 'Punucapa: <span class="destination-title-accent">wetlands</span>, rivers and nature',
      '#punucapa .destination-description': 'Navigate the Punucapa wetlands, a unique ecosystem where rivers meet the forest. Observe native birds, explore trails among aquatic vegetation, and discover the biodiversity of Valdivian wetlands.',
      '#punucapa .destination-link': 'Learn more <span aria-hidden="true">↗\uFE0E</span>',
      '#cervezas-title': 'The <span class="destination-title-accent">brewing tradition</span> of Valdivia',
      '#cervezas .destination-description': 'Valdivia is the birthplace of craft beer in Chile. Discover the German-Valdivian brewing heritage, visit historic breweries like Kunstmann and Schopfloch, and taste unique beers made with local ingredients.',
      '#cervezas .destination-link': 'Learn more <span aria-hidden="true">↗\uFE0E</span>',
      '#fuerte-niebla-title': 'Fuerte Niebla: <span class="destination-title-accent">history</span> by the sea',
      '#fuerte-niebla .destination-description': 'Visit the Castillo de Niebla, one of the most important Spanish colonial fortresses in South America. Explore its walls, museums, and cannons while enjoying panoramic views of Valdivia Bay and the Calle-Calle River.',
      '#fuerte-niebla .destination-link': 'Learn more <span aria-hidden="true">↗\uFE0E</span>'
    },
    es: { 
      '.valdivia-hero-content .section-kicker': 'Valdivia Bike Fest / Valdivia', 
      '.valdivia-hero-content h1': 'Corre en la<br><em>ciudad del agua</em>', 
      '.valdivia-intro-text': 'Valdivia es una ciudad de ríos, lluvia y verde profundo. Ven por la competencia, quédate por los bosques, la gastronomía y una cultura que se recorre mejor sin apuro. Aquí el agua encuentra el bosque, y cada esquina tiene una historia que contar.', 
      '.valdivia-recommendations-header .section-kicker': 'Recomendaciones', 
      '.valdivia-recommendations-header h2': 'Descubre<br><em>Valdivia</em>',
      // Destinations nav tooltips
      '.destinations-nav-item:nth-child(1)': 'Bosques',
      '.destinations-nav-item:nth-child(2)': 'Volcán',
      '.destinations-nav-item:nth-child(3)': 'Humedales',
      '.destinations-nav-item:nth-child(4)': 'Cervezas',
      '.destinations-nav-item:nth-child(5)': 'Historia',
      // Destination sections
      '#alerce-costero-title': 'Alerce Costero: <span class="destination-title-accent">bosques milenarios</span> junto al Pacífico',
      '#alerce-costero .destination-description': 'Entra a uno de los bosques templados más biodiversos del planeta. El Parque Nacional Alerce Costero es hogar de árboles milenarios, senderos entre arrayanes y coigües, y paisajes costeros únicos en la Región de Los Ríos.',
      '#alerce-costero .destination-link': 'Conocer más <span aria-hidden="true">↗\uFE0E</span>',
      '#mocho-choshuenco-title': 'Mocho Choshuenco: montañas, <span class="destination-title-accent">nieve y aventura</span>',
      '#mocho-choshuenco .destination-description': 'Asciende al cráter de este volcán activo y descubre una laguna turquesa en su cumbre. La Reserva Nacional Mocho Choshuenco ofrece trekking, deportes de invierno y vistas panorámicas de los Andes y el océano Pacífico.',
      '#mocho-choshuenco .destination-link': 'Conocer más <span aria-hidden="true">↗\uFE0E</span>',
      '#punucapa-title': 'Punucapa: <span class="destination-title-accent">humedales</span>, ríos y naturaleza',
      '#punucapa .destination-description': 'Navega los humedales de Punucapa, un ecosistema único donde los ríos encuentran el bosque. Observa aves nativas, explora senderos entre vegetación acuática y descubre la biodiversidad de los humedales valdivianos.',
      '#punucapa .destination-link': 'Conocer más <span aria-hidden="true">↗\uFE0E</span>',
      '#cervezas-title': 'La <span class="destination-title-accent">tradición cervecera</span> de Valdivia',
      '#cervezas .destination-description': 'Valdivia es la cuna de la cerveza artesanal en Chile. Descubre la herencia cervecera alemana-valdiviana, visita cervecerías históricas como Kunstmann y Schopfloch, y degusta cervezas únicas hechas con ingredientes locales.',
      '#cervezas .destination-link': 'Conocer más <span aria-hidden="true">↗\uFE0E</span>',
      '#fuerte-niebla-title': 'Fuerte Niebla: <span class="destination-title-accent">historia</span> junto al mar',
      '#fuerte-niebla .destination-description': 'Visita el Castillo de Niebla, una de las fortalezas coloniales españolas más importantes de Sudamérica. Recorre sus murallas, museos y cañones mientras disfrutas vistas panorámicas de la bahía de Valdivia y el río Calle-Calle.',
      '#fuerte-niebla .destination-link': 'Conocer más <span aria-hidden="true">↗\uFE0E</span>'
    }
  },
  contacto: {
    en: {
      '.contact-hero .inner-intro .section-kicker': 'Valdivia Bike Fest / Contact',
      '.contact-hero .inner-intro h1': "Let's talk<br>about the <em>route</em>",
      '.contact-hero .inner-intro > p:last-child': 'Have a question about the event, registration, or missing information? Write to us from Valdivia.',
      '.contact-form-title': 'Send us <em>a message</em>',
      'label[for="contact-name"]': 'Name',
      'label[for="contact-email"]': 'Email',
      'label[for="contact-message"]': 'Message',
      '.contact-form .button': 'Send message <span>↗\uFE0E</span>',
      '.contact-data-strip .contact-data:nth-child(1) span:first-child': 'DATE',
      '.contact-data-strip .contact-data:nth-child(1) span:last-child': '10 — 14 March 2027',
      '.contact-data-strip .contact-data:nth-child(2) span:first-child': 'VENUE',
      '.contact-data-strip .contact-data:nth-child(2) span:last-child': 'Valdivia, Chile',
      '.contact-data-strip .contact-data:nth-child(3) span:first-child': 'START',
      '.contact-data-strip .contact-data:nth-child(3) span:last-child': 'Complejo Deportivo ASENAV',
      '.contact-data-strip .contact-data:nth-child(4) span:first-child': 'CIRCUITS',
      '.contact-data-strip .contact-data:nth-child(4) span:last-child': 'XCO / XCC',
      '.contact-data-strip .contact-data:nth-child(5) span:first-child': 'OFFICIAL START',
      '.contact-data-strip .contact-data:nth-child(5) span:last-child': 'TBC',
      '.contact-channels-title': 'Direct<br><em>channels</em>',
      '.contact-channel:nth-child(1) span:first-child': 'EMAIL',
      '.contact-channel:nth-child(2) span:first-child': 'INSTAGRAM'
    },
    es: {
      '.contact-hero .inner-intro .section-kicker': 'Valdivia Bike Fest / Contacto',
      '.contact-hero .inner-intro h1': 'Hablemos<br>de la <em>ruta</em>',
      '.contact-hero .inner-intro > p:last-child': '¿Tienes una pregunta sobre el evento, la inscripción o la información que falta? Escríbenos y te responderemos desde Valdivia.',
      '.contact-form-title': 'Escríbenos <em>un mensaje</em>',
      'label[for="contact-name"]': 'Nombre',
      'label[for="contact-email"]': 'Email',
      'label[for="contact-message"]': 'Mensaje',
      '.contact-form .button': 'Enviar mensaje <span>↗\uFE0E</span>',
      '.contact-data-strip .contact-data:nth-child(1) span:first-child': 'FECHA',
      '.contact-data-strip .contact-data:nth-child(1) span:last-child': '10 — 14 marzo 2027',
      '.contact-data-strip .contact-data:nth-child(2) span:first-child': 'SEDE',
      '.contact-data-strip .contact-data:nth-child(2) span:last-child': 'Valdivia, Chile',
      '.contact-data-strip .contact-data:nth-child(3) span:first-child': 'LARGADA',
      '.contact-data-strip .contact-data:nth-child(3) span:last-child': 'Complejo Deportivo ASENAV',
      '.contact-data-strip .contact-data:nth-child(4) span:first-child': 'CIRCUITOS',
      '.contact-data-strip .contact-data:nth-child(4) span:last-child': 'XCO / XCC',
      '.contact-data-strip .contact-data:nth-child(5) span:first-child': 'LARGADA OFICIAL',
      '.contact-data-strip .contact-data:nth-child(5) span:last-child': 'Por confirmar',
      '.contact-channels-title': 'Canales<br><em>directos</em>',
      '.contact-channel:nth-child(1) span:first-child': 'CORREO',
      '.contact-channel:nth-child(2) span:first-child': 'INSTAGRAM'
    }
  }
};

function showToast(message) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 4500);
}

function setupMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-menu');
  if (!toggle || !menu) return;
  const backdrop = document.querySelector('.menu-backdrop');
  let focusTrapHandler = null;

  function getFocusableElements() {
    const els = menu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    return [toggle, ...els];
  }

  function openMenu() {
    menu.hidden = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        menu.classList.add('is-open');
        toggle.classList.add('is-active');
        if (backdrop) backdrop.classList.add('is-open');
      });
    });
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', currentLanguage === 'es'
      ? 'Cerrar menú'
      : 'Close menu');
    document.body.style.overflow = 'hidden';
    const firstLink = menu.querySelector('nav a');
    if (firstLink) firstLink.focus();
    focusTrapHandler = (e) => {
      if (e.key !== 'Tab') return;
      const focusable = getFocusableElements();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', focusTrapHandler);
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.classList.remove('is-active');
    if (backdrop) backdrop.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', currentLanguage === 'es'
      ? 'Abrir menú'
      : 'Open menu');
    document.body.style.overflow = '';
    if (focusTrapHandler) {
      document.removeEventListener('keydown', focusTrapHandler);
      focusTrapHandler = null;
    }
    toggle.focus();
    let handled = false;
    function done() {
      if (handled) return;
      handled = true;
      if (!menu.classList.contains('is-open')) menu.hidden = true;
    }
    menu.addEventListener('transitionend', function handler(e) {
      if (e.target !== menu) return;
      menu.removeEventListener('transitionend', handler);
      done();
    });
    setTimeout(done, 400);
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu(); else openMenu();
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu();
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    closeMenu();
  }));

  // Close menu if viewport resizes past the mobile breakpoint
  const mql = window.matchMedia('(max-width: 760px)');
  function handleResize(e) {
    if (!e.matches && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  }
  if (mql.addEventListener) {
    mql.addEventListener('change', handleResize);
  } else if (mql.addListener) {
    mql.addListener(handleResize);
  }
}

function setupLanguageToggle() {
  let toggle = document.querySelector('[data-language-toggle]');
  if (!toggle) {
    const actions = document.querySelector('.header-actions');
    if (!actions) return;
    toggle = document.createElement('button');
    toggle.className = 'language-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Change language');
    toggle.dataset.languageToggle = '';
    toggle.innerHTML = '<span data-language-label>EN</span><span class="language-dot"></span>';
    actions.insertBefore(toggle, actions.firstChild);
  }
  toggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    document.documentElement.lang = currentLanguage;
    document.querySelector('[data-language-label]').textContent = currentLanguage === 'es' ? 'EN' : 'ES';
    
    // Update aria-label of language toggle
    toggle.setAttribute('aria-label', currentLanguage === 'es' ? 'Cambiar idioma' : 'Change language');
    
    // Update data-i18n elements (countdown labels)
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.dataset.i18n;
      node.textContent = translations[currentLanguage][key];
    });
    
    // Update page-specific copy
    const isIndex = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');
    const pageName = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const copy = (isIndex ? pageCopy.index : pageCopy[pageName])?.[currentLanguage] || {};
    Object.entries(copy).forEach(([selector, text]) => {
      document.querySelectorAll(selector).forEach((node) => { node.innerHTML = text; });
    });
    
    // Update common elements across all pages
    const common = currentLanguage === 'en'
      ? { 
          '.main-nav a:nth-child(1)': 'Event', 
          '.main-nav a:nth-child(2)': 'Route & schedule', 
          '.main-nav a:nth-child(3)': 'Results', 
          '.main-nav a:nth-child(4)': 'Valdivia', 
          '.main-nav a:nth-child(5)': 'Contact',
          '.mobile-menu nav a:nth-child(1)': 'Event',
          '.mobile-menu nav a:nth-child(2)': 'Route & schedule',
          '.mobile-menu nav a:nth-child(3)': 'Results',
          '.mobile-menu nav a:nth-child(4)': 'Valdivia',
          '.mobile-menu nav a:nth-child(5)': 'Contact',
          '[data-registration]': 'Register <span aria-hidden="true">↗\uFE0E</span>',
          '.menu-toggle': null // handled separately for aria-label
        }
      : { 
          '.main-nav a:nth-child(1)': 'Evento', 
          '.main-nav a:nth-child(2)': 'Ruta y horario', 
          '.main-nav a:nth-child(3)': 'Resultados', 
          '.main-nav a:nth-child(4)': 'Valdivia', 
          '.main-nav a:nth-child(5)': 'Contacto',
          '.mobile-menu nav a:nth-child(1)': 'Evento',
          '.mobile-menu nav a:nth-child(2)': 'Ruta y horario',
          '.mobile-menu nav a:nth-child(3)': 'Resultados',
          '.mobile-menu nav a:nth-child(4)': 'Valdivia',
          '.mobile-menu nav a:nth-child(5)': 'Contacto',
          '[data-registration]': 'Inscríbete <span aria-hidden="true">↗\uFE0E</span>',
          '.menu-toggle': null // handled separately for aria-label
        };
    
    Object.entries(common).forEach(([selector, text]) => {
      if (text !== null) {
        document.querySelectorAll(selector).forEach((node) => { node.innerHTML = text; });
      }
    });
    
    // Update menu toggle aria-label
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-label', currentLanguage === 'es' 
        ? (isExpanded ? 'Cerrar menú' : 'Abrir menú')
        : (isExpanded ? 'Close menu' : 'Open menu'));
    }
  });
}

function setupRouteTabs() {
  const tabs = document.querySelectorAll('[data-route-tab]');
  const detail = document.querySelector('[data-route-detail]');
  if (!tabs.length || !detail) return;
    tabs.forEach((tab) => tab.addEventListener('click', () => {
    const item = routeData[tab.dataset.routeTab];
    tabs.forEach((candidate) => {
      const active = candidate === tab;
      candidate.classList.toggle('is-active', active);
      candidate.setAttribute('aria-selected', String(active));
    });
    detail.setAttribute('aria-labelledby', tab.id);
    detail.querySelector('[data-route-index]').textContent = item.index;
    detail.querySelector('[data-route-title]').textContent = item.title;
    detail.querySelector('[data-route-description]').textContent = item.description;
    detail.querySelector('[data-route-distance]').textContent = item.distance;
    detail.querySelector('[data-route-elevation]').textContent = item.elevation;
    detail.querySelector('[data-route-time]').textContent = item.time;
  }));
}

function setupCountdown() {
  const countdown = document.querySelector('[data-countdown]');
  if (!countdown) return;
  const date = countdown.dataset.date;
  const message = document.querySelector('[data-countdown-message]');
  if (!date) return;
  const target = new Date(date).getTime();
  const tick = () => {
    const distance = target - Date.now();
    if (distance <= 0) { message.textContent = currentLanguage === 'es' ? 'La carrera está en marcha ↗\uFE0E' : 'Race day is live ↗\uFE0E'; return; }
    const values = { days: Math.floor(distance / 86400000), hours: Math.floor(distance / 3600000) % 24, minutes: Math.floor(distance / 60000) % 60, seconds: Math.floor(distance / 1000) % 60 };
    Object.entries(values).forEach(([key, value]) => { const node = countdown.querySelector(`[data-${key}]`); if (node) node.textContent = String(value).padStart(2, '0'); });
  };
  tick();
  setInterval(tick, 1000);
}

function setupHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const threshold = 100;
  const onScroll = (target) => {
    const scrollY = target.scrollTop ?? window.scrollY;
    if (scrollY > threshold) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', () => onScroll(window), { passive: true });
  document.querySelectorAll('.valdivia-presentation').forEach(el => {
    el.addEventListener('scroll', () => onScroll(el), { passive: true });
  });
  onScroll(window);
}

function setupCrossfade() {
  const containers = document.querySelectorAll('[data-crossfade]');
  if (!containers.length) return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  containers.forEach(container => {
    const images = container.querySelectorAll('.carousel-img');
    if (images.length < 2) return;
    if (prefersReducedMotion) return;
    let current = 0;
    const interval = parseInt(container.getAttribute('data-interval'), 10) || 5000;
    setInterval(() => {
      images[current].classList.remove('active');
      current = (current + 1) % images.length;
      images[current].classList.add('active');
    }, interval);
  });
}

function renderResultsTable(bodyId, rows) {
  const tbody = document.getElementById(bodyId);
  if (!tbody) return;
  tbody.innerHTML = '';
  rows.forEach(row => {
    const tr = document.createElement('tr');
    tr.dataset.category = row.cat;
    if (row.pos === 1) tr.dataset.podium = '1';
    tr.innerHTML = `<td>${row.pos}</td><td>${row.dorsal}</td><td>${row.name}</td><td>${row.club}</td><td>${row.catLabel}</td><td>${row.time}</td><td>${row.dif}</td>`;
    tbody.appendChild(tr);
  });
}

function renumberVisibleRows(tbody) {
  const rows = tbody.querySelectorAll('tr:not([hidden])');
  rows.forEach((tr, i) => {
    const td = tr.querySelector('td');
    if (td) td.textContent = i + 1;
    if (i === 0) tr.dataset.podium = '1';
    else delete tr.dataset.podium;
  });
}

function applyCategoryFilter() {
  const activeChip = document.querySelector('.results-chip.is-active');
  if (!activeChip) return;
  const cat = activeChip.dataset.category;
  document.querySelectorAll('.results-panel').forEach(panel => {
    const tbody = panel.querySelector('tbody');
    if (!tbody) return;
    tbody.querySelectorAll('tr').forEach(tr => {
      if (cat === 'all' || tr.dataset.category === cat) tr.removeAttribute('hidden');
      else tr.setAttribute('hidden', '');
    });
    renumberVisibleRows(tbody);
  });
}

function setupResultsTabs() {
  const tablist = document.querySelector('.results-tabs');
  if (!tablist) return;
  const tabs = Array.from(tablist.querySelectorAll('.results-tab'));
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const panelId = tab.getAttribute('aria-controls');
      document.querySelectorAll('.results-panel').forEach(p => {
        if (p.id === panelId) p.removeAttribute('hidden');
        else p.setAttribute('hidden', '');
      });
      applyCategoryFilter();
    });
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const idx = tabs.indexOf(tab);
        const next = e.key === 'ArrowRight' ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
        tabs[next].focus();
      }
    });
  });
}

function setupCategoryChips() {
  const chipGroup = document.querySelector('.results-chips');
  if (!chipGroup) return;
  const chips = Array.from(chipGroup.querySelectorAll('.results-chip'));
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      applyCategoryFilter();
    });
  });
}

function setupDestinationsNav() {
  const nav = document.querySelector('.destinations-nav');
  if (!nav) return;
  
  const sections = document.querySelectorAll('.destination-section');
  const navItems = nav.querySelectorAll('.destinations-nav-item');
  
  if (!sections.length || !navItems.length) return;
  
  // IntersectionObserver para detectar sección activa
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach((item) => {
          const isActive = item.getAttribute('href') === `#${id}`;
          item.classList.toggle('is-active', isActive);
        });
      }
    });
  }, observerOptions);
  
  sections.forEach((section) => observer.observe(section));
  
  // Smooth scroll al hacer clic en navegación
  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (!animatedElements.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach((element) => observer.observe(element));
}

setupMobileMenu();
setupLanguageToggle();
setupRouteTabs();
setupCountdown();
setupHeaderScroll();
setupCrossfade();
setupResultsTabs();
setupCategoryChips();
renderResultsTable('results-body-xco', demoResultsData.xco);
renderResultsTable('results-body-xcc', demoResultsData.xcc);
setupDestinationsNav();
setupScrollAnimations();

// Actualizar todos los enlaces de inscripción con la URL centralizada
function updateRegistrationLinks() {
  document.querySelectorAll('[data-registration]').forEach(link => {
    link.href = REGISTRATION_URL;
  });
}

updateRegistrationLinks();
