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

const pageCopy = {
  index: {
    en: {
      '#hero-title': 'The route<br><em>is waiting.</em>',
      '.hero-intro': 'A mountain bike competition between forest, water, and city. Save your place at the start line and know the terrain before you arrive.',
      '.signal-line': 'Valdivia / Chile <span class="signal-rule"></span> VBF / NEXT EDITION',
      '.status-message': '10–14 March 2027 <span aria-hidden="true">↗</span>',
      
      '#event-title': 'Five days.<br><em>Two formats.</em>',
      '.event-intro .lead-copy': 'Valdivia Bike Fest brings together those who come for the challenge and stay for the landscape. Everything you need to prepare for your race, in one place.',
      '.event-intro .arrow-link': 'Discover the event <span aria-hidden="true">↗</span>',
      '.event-grid-label': 'WHAT YOU\'LL FIND',
      '.info-list li:nth-child(1) strong': 'Two race<br>formats',
      '.info-list li:nth-child(1) em': 'XCO and XCC circuits in Valdivia.',
      '.info-list li:nth-child(2) strong': 'Information<br>without surprises',
      '.info-list li:nth-child(2) em': 'Route, schedule, and clear recommendations.',
      '.info-list li:nth-child(3) strong': 'The energy<br>of the pack',
      '.info-list li:nth-child(3) em': 'A community that starts before pedaling.',
      
      '#route-title': 'Read the terrain<br>before you <em>ride it.</em>',
      '.route-header-copy': 'Explore a route reference and discover how a VBF race day is organized. Official distance, elevation, and schedule details will be published here.',
      '.route-tab:nth-child(1) strong': 'XCO',
      '.route-tab:nth-child(1) small': 'Cross-Country Olympic · ~3.6 km per lap',
      '.route-tab:nth-child(2) strong': 'XCC',
      '.route-tab:nth-child(2) small': 'Short Track · ~0.81 km per lap',
      '.route-detail-top span:last-child': 'OFFICIAL',
      '.detail-footer span': 'Schedule and lap counts per category are defined at the technical meeting.',
      '.detail-footer a': 'View full route <span aria-hidden="true">↗</span>',
      
      '#schedule-title': 'Everything<br>in its <em>time.</em>',
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
      
      '#results-title': 'Your mark<br>stays <em>here.</em>',
      '.results-copy > p:not(.section-kicker)': 'When the race ends, come back to find your time, your category, and where you placed in the pack.',
      '.results-copy .arrow-link': 'View results <span aria-hidden="true">↗</span>',
      '.results-board-head span:first-child': 'VBF / RESULTS',
      '.results-board-head span:last-child': 'COMING SOON',
      '.results-empty strong': 'Results<br>to be published',
      '.results-empty p': 'The board activates after the race.',
      '.results-board-foot span:nth-child(1)': 'OVERALL',
      '.results-board-foot span:nth-child(2)': 'CATEGORIES',
      '.results-board-foot span:nth-child(3)': 'TIMES',
      
      '#valdivia-title': 'Come for<br>the race.<br><em>Stay for<br>the city.</em>',
      '.valdivia-copy > p:not(.section-kicker)': 'A city of rivers, rain, and deep green. Turn your race into a getaway and discover the place that gives this experience its character.',
      '.valdivia-copy .arrow-link': 'Discover Valdivia <span aria-hidden="true">↗</span>',
      '.map-phrase': 'WHERE WATER<br>MEETS THE FOREST',
      
      '#contact-title': 'See you<br>on the <em>route.</em>',
      '.cta-coordinate': 'VALDIVIA / CHILE',
      '.final-cta .section-kicker': 'Your next race',
      '.cta-actions .text-link': 'Contact us <span aria-hidden="true">↗</span>',
      
      '.site-footer .footer-links a:nth-child(1)': 'Event',
      '.site-footer .footer-links a:nth-child(2)': 'Route & schedule',
      '.site-footer .footer-links a:nth-child(3)': 'Results',
      '.site-footer .footer-links a:nth-child(4)': 'Valdivia',
      '.site-footer .footer-links a:nth-child(5)': 'Contact',
      '.footer-meta span:first-child': '© VBF / Valdivia, Chile',
      '.footer-meta span:last-child': 'ES / EN'
    },
    es: {
      '#hero-title': 'La ruta<br><em>te está</em><br>esperando.',
      '.hero-intro': 'Una competencia de mountain bike entre bosque, agua y ciudad. Guarda tu lugar en la línea de partida y conoce el terreno antes de llegar.',
      '.signal-line': 'Valdivia / Chile <span class="signal-rule"></span> VBF / PRÓXIMA EDICIÓN',
      '.status-message': '10–14 marzo 2027 <span aria-hidden="true">↗</span>',
      
      '#event-title': 'Cinco días.<br><em>Dos formatos.</em>',
      '.event-intro .lead-copy': 'Valdivia Bike Fest reúne a quienes llegan por el desafío y se quedan por el paisaje. Todo lo que necesitas para preparar tu carrera, en un solo lugar.',
      '.event-intro .arrow-link': 'Conoce el evento <span aria-hidden="true">↗</span>',
      '.event-grid-label': 'LO QUE ENCONTRARÁS',
      '.info-list li:nth-child(1) strong': 'Dos formatos<br>de carrera',
      '.info-list li:nth-child(1) em': 'Circuitos XCO y XCC en Valdivia.',
      '.info-list li:nth-child(2) strong': 'Información<br>sin sorpresas',
      '.info-list li:nth-child(2) em': 'Ruta, horarios y recomendaciones claras.',
      '.info-list li:nth-child(3) strong': 'La energía<br>del pelotón',
      '.info-list li:nth-child(3) em': 'Una comunidad que empieza antes de pedalear.',
      
      '#route-title': 'Lee el terreno<br>antes de <em>vivirlo.</em>',
      '.route-header-copy': 'Explora una referencia del trazado y descubre cómo se organiza una jornada VBF. Los datos oficiales de distancia, desnivel y horarios se publicarán aquí.',
      '.route-tab:nth-child(1) strong': 'XCO',
      '.route-tab:nth-child(1) small': 'Cross-Country Olímpico · ~3,6 km por vuelta',
      '.route-tab:nth-child(2) strong': 'XCC',
      '.route-tab:nth-child(2) small': 'Short Track · ~0,81 km por vuelta',
      '.route-detail-top span:last-child': 'OFICIAL',
      '.detail-footer span': 'Horarios y vueltas por categoría se definen en el congreso técnico.',
      '.detail-footer a': 'Ver ruta completa <span aria-hidden="true">↗</span>',
      
      '#schedule-title': 'Todo en<br><em>su momento.</em>',
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
      
      '#results-title': 'La marca<br>queda <em>aquí.</em>',
      '.results-copy > p:not(.section-kicker)': 'Cuando la carrera termine, vuelve a este panel para buscar tu tiempo, tu categoría y el lugar que ocupaste en el pelotón.',
      '.results-copy .arrow-link': 'Ver resultados <span aria-hidden="true">↗</span>',
      '.results-board-head span:first-child': 'VBF / RESULTADOS',
      '.results-board-head span:last-child': 'PRÓXIMAMENTE',
      '.results-empty strong': 'Resultados<br>por publicar',
      '.results-empty p': 'El tablero se activa después de la carrera.',
      '.results-board-foot span:nth-child(1)': 'GENERAL',
      '.results-board-foot span:nth-child(2)': 'CATEGORÍAS',
      '.results-board-foot span:nth-child(3)': 'TIEMPOS',
      
      '#valdivia-title': 'Ven por<br>la carrera.<br><em>Quédate por<br>la ciudad.</em>',
      '.valdivia-copy > p:not(.section-kicker)': 'Una ciudad de ríos, lluvia y verde profundo. Haz de tu carrera una escapada y conoce el lugar que le da su carácter a esta experiencia.',
      '.valdivia-copy .arrow-link': 'Descubre Valdivia <span aria-hidden="true">↗</span>',
      '.map-phrase': 'DONDE EL AGUA<br>ENCUENTRA EL BOSQUE',
      
      '#contact-title': 'Nos vemos<br>en la <em>ruta.</em>',
      '.cta-coordinate': 'VALDIVIA / CHILE',
      '.final-cta .section-kicker': 'Tu próxima carrera',
      '.cta-actions .text-link': 'Contáctanos <span aria-hidden="true">↗</span>',
      
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
      '.inner-intro .section-kicker': 'Valdivia Bike Fest / Event',
      '.inner-intro h1': 'The race<br>starts <em>earlier.</em>', 
      '.inner-intro > p:last-child': 'The information you need to decide, prepare your bike, and arrive in Valdivia with your mind set on the route.',
      '.inner-aside': 'VBF / 01<br><span>EVERYTHING YOU<br>NEED TO KNOW</span>',
      '.inner-content h2': 'Five days that<br>are lived<br>in full.',
      '.inner-content p:first-of-type': 'Valdivia Bike Fest 2027 takes place from Wednesday, March 10 to Sunday, March 14 at the Complejo Deportivo ASENAV. The event begins with kit pickup at 9:00 AM and features two race formats: XCO (Cross-Country Olympic) and XCC (Short Track).',
      '.detail-list li:nth-child(1) strong': 'Competition',
      '.detail-list li:nth-child(1) em': 'Two circuits, multiple categories, one venue.',
      '.detail-list li:nth-child(2) strong': 'Community',
      '.detail-list li:nth-child(2) em': 'Riders, families, and supporters share the experience.',
      '.detail-list li:nth-child(3) strong': 'Information',
      '.detail-list li:nth-child(3) em': 'Route, schedule, and recommendations in one place.'
    },
    es: { 
      '.inner-intro .section-kicker': 'Valdivia Bike Fest / Evento',
      '.inner-intro h1': 'La carrera<br>empieza <em>antes.</em>', 
      '.inner-intro > p:last-child': 'La información que necesitas para decidir, preparar tu bicicleta y llegar a Valdivia con la cabeza puesta en la ruta.',
      '.inner-aside': 'VBF / 01<br><span>TODO LO QUE<br>NECESITAS SABER</span>',
      '.inner-content h2': 'Cinco días que<br>se viven<br>completos.',
      '.inner-content p:first-of-type': 'Valdivia Bike Fest 2027 se realiza del miércoles 10 al domingo 14 de marzo en el Complejo Deportivo ASENAV. El evento inicia con el retiro de kits a las 9:00 y cuenta con dos formatos de carrera: XCO (Cross-Country Olímpico) y XCC (Short Track).',
      '.detail-list li:nth-child(1) strong': 'Competencia',
      '.detail-list li:nth-child(1) em': 'Dos circuitos, múltiples categorías, una sede.',
      '.detail-list li:nth-child(2) strong': 'Comunidad',
      '.detail-list li:nth-child(2) em': 'Corredores, familias y seguidores comparten la experiencia.',
      '.detail-list li:nth-child(3) strong': 'Información',
      '.detail-list li:nth-child(3) em': 'Ruta, horarios y recomendaciones en un solo lugar.'
    }
  },
  ruta: {
    en: { 
      '.inner-intro .section-kicker': 'Valdivia Bike Fest / Route & schedule',
      '.inner-intro h1': 'Two circuits.<br><em>One venue.</em>', 
      '.inner-intro > p:last-child': 'Valdivia Bike Fest 2027 features two race formats: Cross-Country Olympic (XCO) and Short Track (XCC). Both circuits start and finish at Complejo Deportivo ASENAV.',
      
      // Circuits section
      '.circuit-card:nth-child(1) .circuit-label': 'Circuit 01',
      '.circuit-card:nth-child(1) .circuit-full-name': 'Cross-Country Olympic',
      '.circuit-card:nth-child(1) .metric:nth-child(1) .metric-label': 'Distance per lap',
      '.circuit-card:nth-child(1) .metric:nth-child(2) .metric-label': 'Accumulated elevation',
      '.circuit-card:nth-child(1) .metric:nth-child(3) .metric-unit': 'point',
      '.circuit-card:nth-child(1) .metric:nth-child(3) .metric-label': 'Aid station',
      '.circuit-card:nth-child(1) .circuit-details p': 'Technical circuit with forest sections, climbs, and descents. Terrain reading and sustained pace are key. Spectator zones allow following the race at strategic points.',
      '.circuit-card:nth-child(1) .circuit-status .status-label': 'Schedule',
      '.circuit-card:nth-child(1) .circuit-status .status-value': 'To be confirmed at technical congress',
      
      '.circuit-card:nth-child(2) .circuit-label': 'Circuit 02',
      '.circuit-card:nth-child(2) .circuit-full-name': 'Short Track',
      '.circuit-card:nth-child(2) .metric:nth-child(1) .metric-label': 'Distance per lap',
      '.circuit-card:nth-child(2) .metric:nth-child(2) .metric-label': 'Accumulated elevation',
      '.circuit-card:nth-child(2) .metric:nth-child(3) .metric-label': 'Approx. duration',
      '.circuit-card:nth-child(2) .circuit-details p': 'Short and explosive circuit. Intense race format with multiple laps. 2026 reference: ~10 laps Elite Men, ~9 laps Elite Women. Official 2027 laps will be communicated at the technical congress.',
      '.circuit-card:nth-child(2) .circuit-status .status-label': 'Schedule',
      '.circuit-card:nth-child(2) .circuit-status .status-value': 'To be confirmed at technical congress',
      
      // Event strip
      '.route-event-item:nth-child(1) .route-event-label': 'Kit pickup',
      '.route-event-item:nth-child(1) .route-event-value': 'Wed 10 Mar — 9:00 AM',
      '.route-event-item:nth-child(2) .route-event-label': 'Technical congress',
      '.route-event-item:nth-child(2) .route-event-value': 'To be confirmed',
      '.route-event-item:nth-child(3) .route-event-label': 'XCO / XCC starts',
      '.route-event-item:nth-child(3) .route-event-value': 'Sun 14 Mar — To be confirmed',
      '.route-event-item:nth-child(4) .route-event-label': 'Awards ceremony',
      '.route-event-item:nth-child(4) .route-event-value': 'After each finish',
      
      // RideWithGPS section
      '.rwgps-section .section-kicker': 'Interactive viewer',
      '.rwgps-container h2': 'Explore the<br><em>full route.</em>',
      '.rwgps-badge': 'GPS Route',
      '.rwgps-stat:nth-child(1) .rwgps-stat-label': 'Distance (km)',
      '.rwgps-stat:nth-child(2) .rwgps-stat-label': 'Elevation (m)',
      '.rwgps-stat:nth-child(3) .rwgps-stat-label': 'Est. time',
      '.rwgps-placeholder-footer span': 'Route viewer coming soon'
    },
    es: { 
      '.inner-intro .section-kicker': 'Valdivia Bike Fest / Ruta y horario',
      '.inner-intro h1': 'Dos circuitos.<br><em>Una sede.</em>', 
      '.inner-intro > p:last-child': 'Valdivia Bike Fest 2027 cuenta con dos formatos de carrera: Cross-Country Olímpico (XCO) y Short Track (XCC). Ambos circuitos tienen salida y llegada en el Complejo Deportivo ASENAV.',
      
      // Circuits section
      '.circuit-card:nth-child(1) .circuit-label': 'Circuito 01',
      '.circuit-card:nth-child(1) .circuit-full-name': 'Cross-Country Olímpico',
      '.circuit-card:nth-child(1) .metric:nth-child(1) .metric-label': 'Distancia por vuelta',
      '.circuit-card:nth-child(1) .metric:nth-child(2) .metric-label': 'Desnivel acumulado',
      '.circuit-card:nth-child(1) .metric:nth-child(3) .metric-unit': 'punto',
      '.circuit-card:nth-child(1) .metric:nth-child(3) .metric-label': 'Abastecimiento',
      '.circuit-card:nth-child(1) .circuit-details p': 'Circuito técnico con sectores de bosque, escalada y descenso. La lectura del terreno y el ritmo sostenido son clave. Sectores destinados al público permiten seguir la carrera en puntos estratégicos.',
      '.circuit-card:nth-child(1) .circuit-status .status-label': 'Horario',
      '.circuit-card:nth-child(1) .circuit-status .status-value': 'Por confirmar en congreso técnico',
      
      '.circuit-card:nth-child(2) .circuit-label': 'Circuito 02',
      '.circuit-card:nth-child(2) .circuit-full-name': 'Short Track',
      '.circuit-card:nth-child(2) .metric:nth-child(1) .metric-label': 'Distancia por vuelta',
      '.circuit-card:nth-child(2) .metric:nth-child(2) .metric-label': 'Desnivel acumulado',
      '.circuit-card:nth-child(2) .metric:nth-child(3) .metric-label': 'Duración aprox.',
      '.circuit-card:nth-child(2) .circuit-details p': 'Circuito corto y explosivo. Formato de carrera intenso con múltiples vueltas. Referencia 2026: ~10 vueltas Elite Masculino, ~9 vueltas Elite Femenino. Las vueltas oficiales 2027 se comunican en el congreso técnico.',
      '.circuit-card:nth-child(2) .circuit-status .status-label': 'Horario',
      '.circuit-card:nth-child(2) .circuit-status .status-value': 'Por confirmar en congreso técnico',
      
      // Event strip
      '.route-event-item:nth-child(1) .route-event-label': 'Retiro de kits',
      '.route-event-item:nth-child(1) .route-event-value': 'Mié 10 mar — 9:00 hrs',
      '.route-event-item:nth-child(2) .route-event-label': 'Congreso técnico',
      '.route-event-item:nth-child(2) .route-event-value': 'Por confirmar',
      '.route-event-item:nth-child(3) .route-event-label': 'Largadas XCO / XCC',
      '.route-event-item:nth-child(3) .route-event-value': 'Dom 14 mar — Por confirmar',
      '.route-event-item:nth-child(4) .route-event-label': 'Premiación',
      '.route-event-item:nth-child(4) .route-event-value': 'Después de cada llegada',
      
      // RideWithGPS section
      '.rwgps-section .section-kicker': 'Visualizador interactivo',
      '.rwgps-container h2': 'Explora la<br><em>ruta completa.</em>',
      '.rwgps-badge': 'Ruta GPS',
      '.rwgps-stat:nth-child(1) .rwgps-stat-label': 'Distancia (km)',
      '.rwgps-stat:nth-child(2) .rwgps-stat-label': 'Desnivel (m)',
      '.rwgps-stat:nth-child(3) .rwgps-stat-label': 'Tiempo est.',
      '.rwgps-placeholder-footer span': 'Visualizador de ruta disponible próximamente'
    }
  },
  resultados: {
    en: { 
      '.inner-intro .section-kicker': 'Valdivia Bike Fest / Results',
      '.inner-intro h1': 'Your mark<br><em>stays here.</em>', 
      '.inner-intro > p:last-child': 'The official board will go live after each start. Come back to find your time and category result.',
      '.results-page-board .results-board-head span:first-child': 'VBF / RESULTS',
      '.results-page-board .results-board-head span:last-child': 'COMING SOON',
      '.results-page-board .results-empty strong': 'Results<br>to be published',
      '.results-page-board .results-empty p': 'The board activates after the race.',
      '.results-page-board .results-board-foot span:nth-child(1)': 'XCO',
      '.results-page-board .results-board-foot span:nth-child(2)': 'XCC / SHORT TRACK',
      '.results-page-board .results-board-foot span:nth-child(3)': 'CATEGORIES'
    },
    es: { 
      '.inner-intro .section-kicker': 'Valdivia Bike Fest / Resultados',
      '.inner-intro h1': 'Tu marca<br><em>queda aquí.</em>', 
      '.inner-intro > p:last-child': 'El tablero oficial se activará después de cada largada. Vuelve para buscar tu tiempo y revisar el resultado de tu categoría.',
      '.results-page-board .results-board-head span:first-child': 'VBF / RESULTADOS',
      '.results-page-board .results-board-head span:last-child': 'PRÓXIMAMENTE',
      '.results-page-board .results-empty strong': 'Resultados<br>por publicar',
      '.results-page-board .results-empty p': 'El tablero se activa después de la carrera.',
      '.results-page-board .results-board-foot span:nth-child(1)': 'XCO',
      '.results-page-board .results-board-foot span:nth-child(2)': 'XCC / SHORT TRACK',
      '.results-page-board .results-board-foot span:nth-child(3)': 'CATEGORÍAS'
    }
  },
  valdivia: {
    en: { 
      '.valdivia-hero-content .section-kicker': 'Valdivia Bike Fest / Valdivia', 
      '.valdivia-hero-content h1': 'Race in the<br><em>city of water</em>', 
      '.valdivia-intro-text': 'Valdivia is a city of rivers, rain, and deep green. Come for the competition, stay for the forests, the gastronomy, and a culture best explored without rushing. Here water meets forest, and every corner has a story to tell.', 
      '.valdivia-recommendations-header .section-kicker': 'Recommendations', 
      '.valdivia-recommendations-header h2': 'Discover<br><em>Valdivia.</em>',
      // Destinations nav tooltips
      '.destinations-nav-item:nth-child(1)': 'Forests',
      '.destinations-nav-item:nth-child(2)': 'Volcano',
      '.destinations-nav-item:nth-child(3)': 'Wetlands',
      '.destinations-nav-item:nth-child(4)': 'Breweries',
      '.destinations-nav-item:nth-child(5)': 'History',
      // Destination sections
      '#alerce-costero-title': 'Alerce Costero: <span class="destination-title-accent">ancient forests</span> by the Pacific',
      '#alerce-costero .destination-description': 'Enter one of the most biodiverse temperate forests on the planet. Alerce Costero National Park is home to millenary trees, trails among myrtles and coigües, and unique coastal landscapes in the Los Ríos Region.',
      '#alerce-costero .destination-link': 'Learn more <span aria-hidden="true">↗</span>',
      '#mocho-choshuenco-title': 'Mocho Choshuenco: mountains, <span class="destination-title-accent">snow and adventure</span>',
      '#mocho-choshuenco .destination-description': 'Climb to the crater of this active volcano and discover a turquoise lagoon at its summit. Mocho Choshuenco National Reserve offers trekking, winter sports, and panoramic views of the Andes and the Pacific Ocean.',
      '#mocho-choshuenco .destination-link': 'Learn more <span aria-hidden="true">↗</span>',
      '#punucapa-title': 'Punucapa: <span class="destination-title-accent">wetlands</span>, rivers and nature',
      '#punucapa .destination-description': 'Navigate the Punucapa wetlands, a unique ecosystem where rivers meet the forest. Observe native birds, explore trails among aquatic vegetation, and discover the biodiversity of Valdivian wetlands.',
      '#punucapa .destination-link': 'Learn more <span aria-hidden="true">↗</span>',
      '#cervezas-title': 'The <span class="destination-title-accent">brewing tradition</span> of Valdivia',
      '#cervezas .destination-description': 'Valdivia is the birthplace of craft beer in Chile. Discover the German-Valdivian brewing heritage, visit historic breweries like Kunstmann and Schopfloch, and taste unique beers made with local ingredients.',
      '#cervezas .destination-link': 'Learn more <span aria-hidden="true">↗</span>',
      '#fuerte-niebla-title': 'Fuerte Niebla: <span class="destination-title-accent">history</span> by the sea',
      '#fuerte-niebla .destination-description': 'Visit the Castillo de Niebla, one of the most important Spanish colonial fortresses in South America. Explore its walls, museums, and cannons while enjoying panoramic views of Valdivia Bay and the Calle-Calle River.',
      '#fuerte-niebla .destination-link': 'Learn more <span aria-hidden="true">↗</span>'
    },
    es: { 
      '.valdivia-hero-content .section-kicker': 'Valdivia Bike Fest / Valdivia', 
      '.valdivia-hero-content h1': 'Corre en la<br><em>ciudad del agua</em>', 
      '.valdivia-intro-text': 'Valdivia es una ciudad de ríos, lluvia y verde profundo. Ven por la competencia, quédate por los bosques, la gastronomía y una cultura que se recorre mejor sin apuro. Aquí el agua encuentra el bosque, y cada esquina tiene una historia que contar.', 
      '.valdivia-recommendations-header .section-kicker': 'Recomendaciones', 
      '.valdivia-recommendations-header h2': 'Descubre<br><em>Valdivia.</em>',
      // Destinations nav tooltips
      '.destinations-nav-item:nth-child(1)': 'Bosques',
      '.destinations-nav-item:nth-child(2)': 'Volcán',
      '.destinations-nav-item:nth-child(3)': 'Humedales',
      '.destinations-nav-item:nth-child(4)': 'Cervezas',
      '.destinations-nav-item:nth-child(5)': 'Historia',
      // Destination sections
      '#alerce-costero-title': 'Alerce Costero: <span class="destination-title-accent">bosques milenarios</span> junto al Pacífico',
      '#alerce-costero .destination-description': 'Entra a uno de los bosques templados más biodiversos del planeta. El Parque Nacional Alerce Costero es hogar de árboles milenarios, senderos entre arrayanes y coigües, y paisajes costeros únicos en la Región de Los Ríos.',
      '#alerce-costero .destination-link': 'Conocer más <span aria-hidden="true">↗</span>',
      '#mocho-choshuenco-title': 'Mocho Choshuenco: montañas, <span class="destination-title-accent">nieve y aventura</span>',
      '#mocho-choshuenco .destination-description': 'Asciende al cráter de este volcán activo y descubre una laguna turquesa en su cumbre. La Reserva Nacional Mocho Choshuenco ofrece trekking, deportes de invierno y vistas panorámicas de los Andes y el océano Pacífico.',
      '#mocho-choshuenco .destination-link': 'Conocer más <span aria-hidden="true">↗</span>',
      '#punucapa-title': 'Punucapa: <span class="destination-title-accent">humedales</span>, ríos y naturaleza',
      '#punucapa .destination-description': 'Navega los humedales de Punucapa, un ecosistema único donde los ríos encuentran el bosque. Observa aves nativas, explora senderos entre vegetación acuática y descubre la biodiversidad de los humedales valdivianos.',
      '#punucapa .destination-link': 'Conocer más <span aria-hidden="true">↗</span>',
      '#cervezas-title': 'La <span class="destination-title-accent">tradición cervecera</span> de Valdivia',
      '#cervezas .destination-description': 'Valdivia es la cuna de la cerveza artesanal en Chile. Descubre la herencia cervecera alemana-valdiviana, visita cervecerías históricas como Kunstmann y Schopfloch, y degusta cervezas únicas hechas con ingredientes locales.',
      '#cervezas .destination-link': 'Conocer más <span aria-hidden="true">↗</span>',
      '#fuerte-niebla-title': 'Fuerte Niebla: <span class="destination-title-accent">historia</span> junto al mar',
      '#fuerte-niebla .destination-description': 'Visita el Castillo de Niebla, una de las fortalezas coloniales españolas más importantes de Sudamérica. Recorre sus murallas, museos y cañones mientras disfrutas vistas panorámicas de la bahía de Valdivia y el río Calle-Calle.',
      '#fuerte-niebla .destination-link': 'Conocer más <span aria-hidden="true">↗</span>'
    }
  },
  contacto: {
    en: {
      '.contact-hero .inner-intro .section-kicker': 'Valdivia Bike Fest / Contact',
      '.contact-hero .inner-intro h1': "Let's talk<br>about the <em>route.</em>",
      '.contact-hero .inner-intro > p:last-child': 'Have a question about the event, registration, or missing information? Write to us from Valdivia.',
      '.contact-form-title': 'Send us <em>a message</em>',
      'label[for="contact-name"]': 'Name',
      'label[for="contact-email"]': 'Email',
      'label[for="contact-message"]': 'Message',
      '.contact-form .button': 'Send message <span>↗</span>',
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
      '.contact-hero .inner-intro h1': 'Hablemos<br>de la <em>ruta.</em>',
      '.contact-hero .inner-intro > p:last-child': '¿Tienes una pregunta sobre el evento, la inscripción o la información que falta? Escríbenos y te responderemos desde Valdivia.',
      '.contact-form-title': 'Escríbenos <em>un mensaje</em>',
      'label[for="contact-name"]': 'Nombre',
      'label[for="contact-email"]': 'Email',
      'label[for="contact-message"]': 'Mensaje',
      '.contact-form .button': 'Enviar mensaje <span>↗</span>',
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
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    menu.hidden = isOpen;
    // Update aria-label based on current language and state
    toggle.setAttribute('aria-label', currentLanguage === 'es'
      ? (!isOpen ? 'Cerrar menú' : 'Abrir menú')
      : (!isOpen ? 'Close menu' : 'Open menu'));
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
  }));
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
          '[data-registration]': 'Register <span aria-hidden="true">↗</span>',
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
          '[data-registration]': 'Inscríbete <span aria-hidden="true">↗</span>',
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
    if (distance <= 0) { message.textContent = currentLanguage === 'es' ? 'La carrera está en marcha ↗' : 'Race day is live ↗'; return; }
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
  const onScroll = () => {
    if (window.scrollY > threshold) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function setupValdiviaCarousel() {
  const carousel = document.querySelector('.valdivia-carousel');
  if (!carousel) return;
  const images = carousel.querySelectorAll('.carousel-img');
  if (images.length < 2) return;
  let current = 0;
  const interval = 5000;
  setInterval(() => {
    images[current].classList.remove('active');
    current = (current + 1) % images.length;
    images[current].classList.add('active');
  }, interval);
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

function setupContactLightbox() {
  const lightbox = document.getElementById('contact-lightbox');
  if (!lightbox) return;
  
  const gallery = document.querySelector('.contact-gallery');
  const triggers = gallery ? gallery.querySelectorAll('[data-gallery-trigger]') : [];
  const closeButtons = lightbox.querySelectorAll('[data-lightbox-close]');
  const lightboxImage = lightbox.querySelector('.contact-lightbox-image');
  
  if (!triggers.length || !lightboxImage) return;
  
  const openLightbox = (imgSrc, imgAlt) => {
    lightboxImage.src = imgSrc;
    lightboxImage.alt = imgAlt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImage.src = '';
    document.body.style.overflow = '';
  };
  
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const img = trigger.querySelector('img');
      if (img) {
        openLightbox(img.src, img.alt);
      }
    });
  });
  
  closeButtons.forEach((btn) => {
    btn.addEventListener('click', closeLightbox);
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) {
      closeLightbox();
    }
  });
}

setupMobileMenu();
setupLanguageToggle();
setupRouteTabs();
setupCountdown();
setupHeaderScroll();
setupValdiviaCarousel();
setupDestinationsNav();
setupScrollAnimations();
setupContactLightbox();

// Actualizar todos los enlaces de inscripción con la URL centralizada
function updateRegistrationLinks() {
  document.querySelectorAll('[data-registration]').forEach(link => {
    link.href = REGISTRATION_URL;
  });
}

updateRegistrationLinks();
