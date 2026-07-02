(function () {
  "use strict";

  const header = document.getElementById("header");
  const nav = document.getElementById("siteNav");
  const toggle = document.getElementById("navToggle");
  const links = Array.from(document.querySelectorAll(".site-nav .nav-link[href^='#']"));
  const langButtons = Array.from(document.querySelectorAll(".lang-btn"));
  const i18nNodes = Array.from(document.querySelectorAll("[data-i18n]"));
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const messages = {
    en: {
      menu_toggle: "Menu",
      nav_what: "What we do",
      nav_who: "Who we are",
      nav_clients: "Clients and cases",
      nav_contact: "Contact",
      hero_eyebrow: "LibrAIry - AI spin-off from UPM",
      hero_title: "AI-powered knowledge systems",
      hero_subtitle: "LibrAIry builds intelligent systems to explore, connect and query expert knowledge.",
      hero_copy: "We combine knowledge graphs, natural language processing, semantic search and advanced artificial intelligence to transform complex documents, terminologies and data into reliable digital services.",
      hero_cta: "Get in touch",
      what_title: "What we do",
      what_intro: "LibrAIry develops AI-powered solutions for organisations that need to structure, connect and exploit specialised knowledge.",
      what_1: "Knowledge graphs to model concepts, entities and relationships over complex information.",
      what_2: "Natural language processing to analyse, structure and enrich specialised textual content.",
      what_3: "Semantic search to retrieve information by meaning, context and conceptual similarity.",
      what_4: "Conversational AI to enable reliable natural language access to trusted sources.",
      who_title: "Who we are",
      who_p1: "LibrAIry is a spin-off of Universidad Politecnica de Madrid created to transfer advanced research in artificial intelligence, natural language processing and knowledge graphs into real-world digital solutions.",
      who_p2: "Our work has been supported by the CDTI NEOTEC programme, which promotes technology-based companies with a strong R&D component.",
      clients_title: "Clients and success cases",
      clients_intro: "Our technology has been deployed in institutional environments involving leading organisations in research, terminology, language technologies and digital knowledge services.",
      clients_note_prefix: "Technology deployed in the framework of the",
      clients_note_link: "TeresIA hub",
      footer_company: "Spin-off of Universidad Politecnica de Madrid specialised in AI-powered knowledge systems.",
      footer_fin_title: "Financing and institutional support",
      footer_fin_1: "LibrAIry has received support from the CDTI NEOTEC programme for the development of R&D-based technology.",
      footer_fin_2: "NEOTEC project reference: SNEO-20222324.",
      footer_fin_3: "Action funded in the framework of support for technology-based companies with a strong innovation and knowledge transfer component."
    },
    es: {
      menu_toggle: "Menu",
      nav_what: "Que hacemos",
      nav_who: "Quienes somos",
      nav_clients: "Clientes y casos",
      nav_contact: "Contacto",
      hero_eyebrow: "LibrAIry - spin-off de IA de la UPM",
      hero_title: "Sistemas de conocimiento impulsados por IA",
      hero_subtitle: "LibrAIry construye sistemas inteligentes para explorar, conectar y consultar conocimiento experto.",
      hero_copy: "Combinamos grafos de conocimiento, procesamiento del lenguaje natural, busqueda semantica e inteligencia artificial avanzada para transformar documentos, terminologias y datos complejos en servicios digitales fiables.",
      hero_cta: "Contactar",
      what_title: "Que hacemos",
      what_intro: "LibrAIry desarrolla soluciones basadas en IA para organizaciones que necesitan estructurar, conectar y explotar conocimiento especializado.",
      what_1: "Grafos de conocimiento para modelar conceptos, entidades y relaciones sobre informacion compleja.",
      what_2: "Procesamiento del lenguaje natural para analizar, estructurar y enriquecer contenido textual especializado.",
      what_3: "Busqueda semantica para recuperar informacion por significado, contexto y similitud conceptual.",
      what_4: "IA conversacional para habilitar acceso fiable en lenguaje natural a fuentes de conocimiento confiables.",
      who_title: "Quienes somos",
      who_p1: "LibrAIry es una spin-off de la Universidad Politecnica de Madrid creada para transferir investigacion avanzada en inteligencia artificial, procesamiento del lenguaje natural y grafos de conocimiento a soluciones digitales reales.",
      who_p2: "Nuestro trabajo ha contado con el apoyo del programa CDTI NEOTEC, que impulsa empresas de base tecnologica con un fuerte componente de I+D.",
      clients_title: "Clientes y casos de exito",
      clients_intro: "Nuestra tecnologia se ha desplegado en entornos institucionales con organizaciones de referencia en investigacion, terminologia, tecnologias del lenguaje y servicios digitales de conocimiento.",
      clients_note_prefix: "Tecnologia desplegada en el marco del",
      clients_note_link: "hub de TeresIA",
      footer_company: "Spin-off de la Universidad Politecnica de Madrid especializada en sistemas de conocimiento basados en IA.",
      footer_fin_title: "Financiacion e impulso institucional",
      footer_fin_1: "LibrAIry ha recibido apoyo del programa NEOTEC de CDTI para el desarrollo de tecnologia basada en I+D.",
      footer_fin_2: "Referencia del proyecto NEOTEC: SNEO-20222324.",
      footer_fin_3: "Actuacion financiada en el marco de ayudas a empresas de base tecnologica con alto componente de innovacion y transferencia de conocimiento."
    }
  };

  function setScrolledState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  function closeMobileNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function setActiveLink() {
    const scrollPos = window.scrollY + 140;
    links.forEach((link) => {
      const id = link.getAttribute("href");
      const section = id ? document.querySelector(id) : null;
      if (!section) return;
      const inView = scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight;
      link.classList.toggle("active", inView);
    });
  }

  function applyLanguage(lang) {
    const selected = messages[lang] ? lang : "en";
    const dict = messages[selected];

    document.documentElement.lang = selected;

    i18nNodes.forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (key && dict[key]) {
        node.textContent = dict[key];
      }
    });

    langButtons.forEach((button) => {
      button.classList.toggle("is-active", button.getAttribute("data-lang") === selected);
    });

    try {
      localStorage.setItem("librairy-language", selected);
    } catch (error) {
      // Ignore storage errors in restricted environments.
    }
  }

  function syncMotionPreference() {
    if (reduceMotionQuery.matches) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 780) {
        closeMobileNav();
      }
    });
  });

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.getAttribute("data-lang") || "en";
      applyLanguage(lang);
    });
  });

  window.addEventListener("scroll", () => {
    setScrolledState();
    setActiveLink();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 780) {
      closeMobileNav();
    }
    setActiveLink();
  });

  if (reduceMotionQuery.addEventListener) {
    reduceMotionQuery.addEventListener("change", syncMotionPreference);
  } else if (reduceMotionQuery.addListener) {
    reduceMotionQuery.addListener(syncMotionPreference);
  }

  let preferred = "en";
  try {
    preferred = localStorage.getItem("librairy-language") || "en";
  } catch (error) {
    preferred = "en";
  }

  applyLanguage(preferred);
  syncMotionPreference();
  setScrolledState();
  setActiveLink();
})();
