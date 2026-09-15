const routeData = {
  start: { index: '01 / 03', title: 'Salida', description: 'El punto donde todo se vuelve posible. Revisa el horario de convocatoria y llega con tiempo para preparar tu bicicleta.', distance: 'por definir', elevation: 'por definir', time: 'por definir' },
  forest: { index: '02 / 03', title: 'Bosque', description: 'El terreno cambia aquí. La lectura de la ruta, el ritmo y la capacidad de escuchar tu bicicleta se vuelven parte de la carrera.', distance: 'por definir', elevation: 'por definir', time: 'por definir' },
  finish: { index: '03 / 03', title: 'Meta', description: 'La última curva se disfruta distinto cuando conoces el camino. Aquí encontrarás la referencia de llegada y los accesos al tablero de resultados.', distance: 'por definir', elevation: 'por definir', time: 'por definir' }
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
      '.hero-footnote span:nth-child(2)': 'Official event information',
      '#event-title': 'A full day.<br><em>One start line.</em>',
      '.event-intro .lead-copy': 'Valdivia Bike Fest brings together those who come for the challenge and stay for the landscape. Everything you need to prepare for your race, in one place.',
      '.event-intro .arrow-link': 'Discover the event <span aria-hidden="true">↗</span>',
      '#route-title': 'Read the terrain<br>before you <em>ride it.</em>',
      '.route-header-copy': 'Explore a route reference and discover how a VBK race day is organized. Official distance, elevation, and schedule details will be published here.',
      '#schedule-title': 'Everything<br>in its <em>time.</em>',
      '#results-title': 'Your mark<br>stays <em>here.</em>',
      '.results-copy > p:not(.section-kicker)': 'When the race ends, come back to find your time, your category, and where you placed in the pack.',
      '#valdivia-title': 'Come for<br>the race.<br><em>Stay for<br>the city.</em>',
      '.valdivia-copy > p:not(.section-kicker)': 'A city of rivers, rain, and deep green. Turn your race into a getaway and discover the place that gives this experience its character.',
      '#contact-title': 'See you<br>on the <em>route.</em>'
    },
    es: {
      '#hero-title': 'La ruta<br><em>te está</em><br>esperando.',
      '.hero-intro': 'Una competencia de mountain bike entre bosque, agua y ciudad. Guarda tu lugar en la línea de partida y conoce el terreno antes de llegar.',
      '.hero-footnote span:nth-child(2)': 'Información oficial del evento',
      '#event-title': 'Un día completo.<br><em>Una línea de partida.</em>',
      '.event-intro .lead-copy': 'Valdivia Bike Fest reúne a quienes llegan por el desafío y se quedan por el paisaje. Todo lo que necesitas para preparar tu carrera, en un solo lugar.',
      '.event-intro .arrow-link': 'Conoce el evento <span aria-hidden="true">↗</span>',
      '#route-title': 'Lee el terreno<br>antes de <em>vivirlo.</em>',
      '.route-header-copy': 'Explora una referencia del trazado y descubre cómo se organiza una jornada VBK. Los datos oficiales de distancia, desnivel y horarios se publicarán aquí.',
      '#schedule-title': 'Todo en<br><em>su momento.</em>',
      '#results-title': 'La marca<br>queda <em>aquí.</em>',
      '.results-copy > p:not(.section-kicker)': 'Cuando la carrera termine, vuelve a este panel para buscar tu tiempo, tu categoría y el lugar que ocupaste en el pelotón.',
      '#valdivia-title': 'Ven por<br>la carrera.<br><em>Quédate por<br>la ciudad.</em>',
      '.valdivia-copy > p:not(.section-kicker)': 'Una ciudad de ríos, lluvia y verde profundo. Haz de tu carrera una escapada y conoce el lugar que le da su carácter a esta experiencia.',
      '#contact-title': 'Nos vemos<br>en la <em>ruta.</em>'
    }
  },
  evento: {
    en: { '.inner-intro h1': 'The race<br>starts <em>earlier.</em>', '.inner-intro > p:last-child': 'The information you need to decide, prepare your bike, and arrive in Valdivia with your mind set on the route.' },
    es: { '.inner-intro h1': 'La carrera<br>empieza <em>antes.</em>', '.inner-intro > p:last-child': 'La información que necesitas para decidir, preparar tu bicicleta y llegar a Valdivia con la cabeza puesta en la ruta.' }
  },
  ruta: {
    en: { '.inner-intro h1': 'Know the<br><em>terrain.</em>', '.inner-intro > p:last-child': 'A reference guide to read the race before the official course and schedule are published.' },
    es: { '.inner-intro h1': 'Conoce el<br><em>terreno.</em>', '.inner-intro > p:last-child': 'Una guía de referencia para leer la carrera antes de que publiquemos el trazado y los horarios oficiales.' }
  },
  resultados: {
    en: { '.inner-intro h1': 'Your mark<br><em>stays here.</em>', '.inner-intro > p:last-child': 'The official board will go live after each start. Come back to find your time and category result.' },
    es: { '.inner-intro h1': 'Tu marca<br><em>queda aquí.</em>', '.inner-intro > p:last-child': 'El tablero oficial se activará después de cada largada. Vuelve para buscar tu tiempo y revisar el resultado de tu categoría.' }
  },
  valdivia: {
    en: { '.inner-intro h1': 'Race in the<br>city of<br><em>water.</em>', '.inner-intro > p:last-child': 'Come for the competition. Stay for the rivers, the forest, and a city best explored without rushing.' },
    es: { '.inner-intro h1': 'Corre en la<br>ciudad del<br><em>agua.</em>', '.inner-intro > p:last-child': 'Ven por la competencia. Quédate por los ríos, el bosque y una ciudad que se recorre mejor sin apuro.' }
  },
  contacto: {
    en: { '.inner-intro h1': 'Let’s talk<br>about the <em>route.</em>', '.inner-intro > p:last-child': 'Have a question about the event, registration, or missing information? Write to us from Valdivia.' },
    es: { '.inner-intro h1': 'Hablemos<br>de la <em>ruta.</em>', '.inner-intro > p:last-child': '¿Tienes una pregunta sobre el evento, la inscripción o la información que falta? Escríbenos y te responderemos desde Valdivia.' }
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

function setupRegistrationLinks() {
  document.querySelectorAll('[data-registration]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (link.href.includes('example.com')) {
        event.preventDefault();
        showToast(currentLanguage === 'es' ? 'Conecta aquí la URL de la plataforma de inscripciones antes de publicar.' : 'Connect the registration platform URL here before publishing.');
      }
    });
  });
}

function setupMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    menu.hidden = isOpen;
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
    toggle.setAttribute('aria-label', 'Cambiar idioma');
    toggle.dataset.languageToggle = '';
    toggle.innerHTML = '<span data-language-label>EN</span><span class="language-dot"></span>';
    actions.insertBefore(toggle, actions.firstChild);
  }
  toggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    document.documentElement.lang = currentLanguage;
    document.querySelector('[data-language-label]').textContent = currentLanguage === 'es' ? 'EN' : 'ES';
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.dataset.i18n;
      node.textContent = translations[currentLanguage][key];
    });
    const isIndex = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html');
    const pageName = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const copy = (isIndex ? pageCopy.index : pageCopy[pageName])?.[currentLanguage] || {};
    Object.entries(copy).forEach(([selector, text]) => {
      document.querySelectorAll(selector).forEach((node) => { node.innerHTML = text; });
    });
    const common = currentLanguage === 'en'
      ? { '.main-nav a:nth-child(1)': 'Event', '.main-nav a:nth-child(2)': 'Route & schedule', '.main-nav a:nth-child(3)': 'Results', '.main-nav a:nth-child(4)': 'Valdivia', '.main-nav a:nth-child(5)': 'Contact', '[data-registration]': 'Register <span aria-hidden="true">↗</span>' }
      : { '.main-nav a:nth-child(1)': 'Evento', '.main-nav a:nth-child(2)': 'Ruta y horario', '.main-nav a:nth-child(3)': 'Resultados', '.main-nav a:nth-child(4)': 'Valdivia', '.main-nav a:nth-child(5)': 'Contacto', '[data-registration]': 'Inscríbete <span aria-hidden="true">↗</span>' };
    Object.entries(common).forEach(([selector, text]) => document.querySelectorAll(selector).forEach((node) => { node.innerHTML = text; }));
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

setupRegistrationLinks();
setupMobileMenu();
setupLanguageToggle();
setupRouteTabs();
setupCountdown();
setupHeaderScroll();
