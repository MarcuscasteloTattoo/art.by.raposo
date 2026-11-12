/* ==========================================================
   CONTEÚDO DO SITE — edite aqui sem mexer no código
   - site: fotos do carrossel, avaliações e portfólio
   - o botão do Direct do Instagram fica no index.html (id="cta")
   - TXT: textos em português, inglês e espanhol
   Os textos em português do topo, "Sobre" etc. ficam no index.html
   (elementos com data-t); EN/ES ficam em TXT.en.t / TXT.es.t.
   ========================================================== */
/* ============ CONTEÚDO ============
   Fotos: "assets/nome.webp" (cada uma tem uma versão menor "-480" para celular).
   Avaliações: da mais recente para a mais antiga; as que têm foto aparecem primeiro. */
const site = {
  /* carrossel "Projetos recentes" — textos em TXT.*.estilos, na mesma ordem */
  estilos: [
    { img: "assets/projeto-fenix.webp" },
    { img: "assets/projeto-orquidea.webp" },
    { img: "assets/projeto-tornozelo.webp" },
    { img: "assets/projeto-libelula.webp" },
  ],
  /* Avaliações do Google (texto original, em português). meses = há quantos meses.
     Para mostrar fotos: fotos: ["assets/avaliacao-nome-1.webp", ...] */
  avaliacoes: [
    /* { nome: "Nome do cliente", meses: 1, texto: "Texto da avaliação", fotos: ["assets/avaliacao-nome-1.webp"] }, */
  ],
  /* portfólio — descrições em TXT.*.portfolio, na mesma ordem (cada foto tem uma versão "-480" para celular) */
  portfolio: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map((n) => `assets/trabalho-${n}.webp`),
};

/* ============ TEXTOS (PT / EN / ES) ============
   "t" = conteúdo de elementos com data-t; "a" = atributos de elementos com data-a. */
const TXT = {
  pt: {
    lang: "pt-BR",
    desc: "Fineline e blackwork em Miami: tatuagens autorais com traços finos, florais e projetos exclusivos. Conheça o trabalho do tatuador Raposo e chame no Direct do Instagram para criar a sua.",
    rev: { tempo: (n) => `há ${n} ${n === 1 ? "mês" : "meses"}`, mais: "Ler mais", menos: "Ler menos", googleAria: "Avaliação do Google", starsAria: "5 de 5 estrelas", foto: "Foto enviada pelo cliente na avaliação" },
    ampliar: "Ampliar: ",
    marquee: ["FINELINE", "BLACKWORK", "FLORAL", "TRAÇO FINO", "DELICADEZA", "PROJETOS PERSONALIZADOS", "EXCLUSIVIDADE"],
    estilos: [
      ["Fênix nas costas", "Fênix em fineline com plumagem delicada, descendo pela escápula.", "Fênix em fineline nas costas, sobre a escápula"],
      ["Orquídea", "Galho de orquídea em blackwork suave ao longo do braço.", "Galho de orquídea em preto e cinza no braço"],
      ["Floral no tornozelo", "Composição de flores e folhas contornando o tornozelo e o pé.", "Flores e folhas em fineline no tornozelo e no pé"],
      ["Libélula e ramos", "Libélula com ramos de folhas e lettering no antebraço.", "Libélula com ramos de folhas e lettering no antebraço"],
    ],
    portfolio: [
      "Braço floral com peônias, folhas escuras e lettering",
      "Rosto feminino com cocar e ornamentos na panturrilha",
      "Rosto feminino com lua e estrelas na panturrilha, em fineline",
      "Ramo floral delicado ao longo do antebraço",
      "Olho com raios e flores no braço, em fineline",
      "Besouro com folhas em preto e cinza no braço",
      "Cavalo com sol e as frases carpe diem e memento mori no antebraço",
      "Cobra entre girassóis com lettering no antebraço",
      "Água-viva em fineline com detalhes em vermelho na perna",
      "Baleia com corrente e balão na panturrilha",
      "Borboleta com flores e nome em lettering no antebraço",
      "Leopardo se espreguiçando nas costas, com a data 11:11",
    ],
    t: {}, a: {}, /* lidos da própria página */
  },
  en: {
    lang: "en",
    desc: "Fineline & blackwork in Miami: original tattoos with fine lines, florals and exclusive projects. Discover the work of tattoo artist Raposo and send a message on Instagram Direct to create yours.",
    rev: { tempo: (n) => `${n} month${n === 1 ? "" : "s"} ago`, mais: "Read more", menos: "Read less", googleAria: "Google review", starsAria: "5 out of 5 stars", foto: "Photo posted by the client with the review" },
    ampliar: "Enlarge: ",
    marquee: ["FINELINE", "BLACKWORK", "FLORAL", "FINE LINES", "DELICACY", "CUSTOM PROJECTS", "EXCLUSIVITY"],
    estilos: [
      ["Phoenix on the back", "Fineline phoenix with delicate plumage flowing down the shoulder blade.", "Fineline phoenix on the back, over the shoulder blade"],
      ["Orchid", "Orchid branch in soft blackwork along the arm.", "Black and grey orchid branch on the arm"],
      ["Floral ankle piece", "Flowers and leaves wrapping around the ankle and foot.", "Fineline flowers and leaves on the ankle and foot"],
      ["Dragonfly and branches", "Dragonfly with leafy branches and lettering on the forearm.", "Dragonfly with leafy branches and lettering on the forearm"],
    ],
    portfolio: [
      "Floral sleeve with peonies, dark leaves and lettering",
      "Woman's face with a headdress and ornaments on the calf",
      "Woman's face with moon and stars on the calf, fineline",
      "Delicate floral branch along the forearm",
      "Eye with rays and flowers on the arm, fineline",
      "Beetle with leaves in black and grey on the arm",
      "Horse with a sun and the phrases carpe diem and memento mori on the forearm",
      "Snake among sunflowers with lettering on the forearm",
      "Fineline jellyfish with red details on the leg",
      "Whale with a chain and a balloon on the calf",
      "Butterfly with flowers and a name in lettering on the forearm",
      "Stretching leopard on the back, with 11:11",
    ],
    t: {
      h1: 'Fineline <span class="nw">&amp; blackwork</span>',
      heroSub: "Original fineline and blackwork tattoos, with precise lines, soft shading and compositions designed to enhance your body and tell your story.",
      projetos: "Recent projects",
      sobre1: "I'm Raposo, a tattoo artist specializing in fineline and blackwork, with work defined by fine lines, florals and delicate compositions.",
      sobre2: "Every project is designed exclusively, based on your idea and your story, with attention to every line, shadow and detail, so the tattoo follows the movement of your body and stays beautiful over time.",
      sobre3: "Shall we turn your idea into art on skin together?",
      nota: "5.0", avBadge: "31 reviews", avTitulo: "What clients say", avLead: "Real reviews from people who got tattooed by Raposo, straight from Google. (Reviews shown in their original Portuguese.)", avLink: "See all reviews on Google",
      orcTitulo: "Shall we create your next tattoo?",
      orcTexto: "Every project starts with a good conversation. Message me on <strong>Instagram Direct</strong>, tell me your idea, the placement and the size you have in mind, and send references if you have any. From there, I'll design an <strong>exclusive project</strong> for you.",
      orcSub: "Bookings through Direct, by appointment",
      locTitulo: "Find us", locEnd: "Miami – Florida, USA", locAviso: "By appointment only.", locVerMapa: "View on Google Maps", orcBotao: "Get my quote", direitos: "All rights reserved.",
    },
    a: {
      langAria: "Language", heroAlt: "Tattoo artist with glasses and black gloves, focused while tattooing an arm, with a rose tattooed on his neck",
      projetos: "Recent projects", projAnt: "Previous project", projProx: "Next project", portfolio: "Portfolio", avAria: "Client reviews", avAnt: "Previous review", avProx: "Next review",
      locAlt: "Interior of the tattoo studio in Miami, spacious and bright, with black tattoo beds, plants and black and white graffiti murals",
      aboutAlt: "Tattoo artist smiling and giving a thumbs up in the studio, in a black T-shirt and black gloves, with a forearm tattoo",
      igAria: "Raposo's Instagram", lbAria: "Enlarged photo", lbFechar: "Close", lbAnt: "Previous photo", lbProx: "Next photo",
    },
  },
  es: {
    lang: "es",
    desc: "Fineline y blackwork en Miami: tatuajes de autor con trazos finos, florales y proyectos exclusivos. Conoce el trabajo del tatuador Raposo y escríbele por Direct de Instagram para crear el tuyo.",
    rev: { tempo: (n) => `hace ${n} ${n === 1 ? "mes" : "meses"}`, mais: "Leer más", menos: "Leer menos", googleAria: "Reseña de Google", starsAria: "5 de 5 estrellas", foto: "Foto enviada por el cliente en la reseña" },
    ampliar: "Ampliar: ",
    marquee: ["FINELINE", "BLACKWORK", "FLORAL", "TRAZO FINO", "DELICADEZA", "PROYECTOS PERSONALIZADOS", "EXCLUSIVIDAD"],
    estilos: [
      ["Fénix en la espalda", "Fénix en fineline con plumaje delicado, bajando por el omóplato.", "Fénix en fineline en la espalda, sobre el omóplato"],
      ["Orquídea", "Rama de orquídea en blackwork suave a lo largo del brazo.", "Rama de orquídea en negro y gris en el brazo"],
      ["Floral en el tobillo", "Composición de flores y hojas rodeando el tobillo y el pie.", "Flores y hojas en fineline en el tobillo y el pie"],
      ["Libélula y ramas", "Libélula con ramas de hojas y lettering en el antebrazo.", "Libélula con ramas de hojas y lettering en el antebrazo"],
    ],
    portfolio: [
      "Brazo floral con peonías, hojas oscuras y lettering",
      "Rostro femenino con tocado y ornamentos en la pantorrilla",
      "Rostro femenino con luna y estrellas en la pantorrilla, en fineline",
      "Rama floral delicada a lo largo del antebrazo",
      "Ojo con rayos y flores en el brazo, en fineline",
      "Escarabajo con hojas en negro y gris en el brazo",
      "Caballo con sol y las frases carpe diem y memento mori en el antebrazo",
      "Serpiente entre girasoles con lettering en el antebrazo",
      "Medusa en fineline con detalles en rojo en la pierna",
      "Ballena con cadena y globo en la pantorrilla",
      "Mariposa con flores y un nombre en lettering en el antebrazo",
      "Leopardo estirándose en la espalda, con 11:11",
    ],
    t: {
      h1: 'Fineline <span class="nw">&amp; blackwork</span>',
      heroSub: "Tatuajes de autor en fineline y blackwork, con trazos precisos, sombreado suave y composiciones pensadas para realzar tu cuerpo y contar tu historia.",
      projetos: "Proyectos recientes",
      sobre1: "Soy Raposo, tatuador especializado en fineline y blackwork, con un trabajo marcado por trazos finos, florales y composiciones delicadas.",
      sobre2: "Cada proyecto se diseña de forma exclusiva, a partir de tu idea y tu historia, con atención a cada línea, sombra y detalle, para que el tatuaje acompañe el movimiento del cuerpo y siga bonito con el paso del tiempo.",
      sobre3: "¿Transformamos juntos tu idea en arte en la piel?",
      nota: "5,0", avBadge: "31 reseñas", avTitulo: "Lo que dicen los clientes", avLead: "Reseñas reales de quienes ya se tatuaron con Raposo, directo de Google. (Reseñas en su portugués original.)", avLink: "Ver todas las reseñas en Google",
      orcTitulo: "¿Creamos tu próximo tatuaje?",
      orcTexto: "Todo proyecto empieza con una buena conversación. Escríbeme por el <strong>Direct de Instagram</strong>, cuéntame tu idea, la zona del cuerpo y el tamaño que imaginas, y envía referencias si las tienes. A partir de ahí, diseño un <strong>proyecto exclusivo</strong> para ti.",
      orcSub: "Atención por Direct, con cita previa",
      locTitulo: "Dónde estamos", locEnd: "Miami – Florida, EE. UU.", locAviso: "Atención solo con cita previa.", locVerMapa: "Ver en Google Maps", orcBotao: "Quiero mi presupuesto", direitos: "Todos los derechos reservados.",
    },
    a: {
      langAria: "Idioma", heroAlt: "Tatuador con gafas y guantes negros, concentrado mientras tatúa un brazo, con una rosa tatuada en el cuello",
      projetos: "Proyectos recientes", projAnt: "Proyecto anterior", projProx: "Siguiente proyecto", portfolio: "Portafolio", avAria: "Reseñas de clientes", avAnt: "Reseña anterior", avProx: "Siguiente reseña",
      locAlt: "Interior del estudio de tatuajes en Miami, amplio y luminoso, con camillas negras, plantas y murales de grafiti en blanco y negro",
      aboutAlt: "Tatuador sonriendo y haciendo un gesto de aprobación en el estudio, con camiseta negra, guantes negros y un tatuaje en el antebrazo",
      igAria: "Instagram de Raposo", lbAria: "Foto ampliada", lbFechar: "Cerrar", lbAnt: "Foto anterior", lbProx: "Foto siguiente",
    },
  },
};
