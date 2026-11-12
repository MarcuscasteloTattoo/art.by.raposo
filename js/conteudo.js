/* ==========================================================
   CONTEÚDO DO SITE — edite aqui sem mexer no código
   - site: WhatsApp, webhook, fotos do carrossel, avaliações e portfólio
   - TXT: textos em português, inglês e espanhol
   Os textos em português do topo, "Sobre" etc. ficam no index.html
   (elementos com data-t); EN/ES ficam em TXT.en.t / TXT.es.t.
   ========================================================== */
/* ============ CONTEÚDO ============
   Fotos: "assets/nome.webp" (cada uma tem uma versão menor "-480" para celular).
   Avaliações: da mais recente para a mais antiga; as que têm foto aparecem primeiro. */
const site = {
  whatsapp: "https://wa.me/5521974722394",
  /* cada cadastro do formulário é enviado para este webhook do Make */
  webhook: "https://hook.eu2.make.com/o2xbnfxrosgcu4cgpsg8t1vr08kiicxt",
  /* carrossel "Projetos recentes" — textos em TXT.*.estilos, na mesma ordem */
  estilos: [
    { img: "assets/projeto-mitologia.webp" },
    { img: "assets/projeto-felino.webp" },
    { img: "assets/projeto-rosto-felino.webp" },
    { img: "assets/projeto-homenagem.webp" },
  ],
  /* Avaliações do Google (texto original, em português). meses = há quantos meses.
     Para mostrar fotos: fotos: ["assets/avaliacao-nome-1.webp", ...] */
  avaliacoes: [
    { nome: "Jessika Goulart", meses: 3, texto: "Simplesmente impecável! O resultado superou todas as minhas expectativas. O traço é perfeito, o sombreado ficou incrível, os detalhes são impressionantes e a tatuagem ficou exatamente como eu sonhava. Além de ser um artista extremamente talentoso, foi muito atencioso, cuidadoso e profissional durante todo o processo. Me senti segura do início ao fim. Recomendo de olhos fechados e, com certeza, voltarei para fazer as próximas tatuagens. Muito obrigada por transformar uma ideia em uma verdadeira obra de arte! 👏🏼🐚", fotos: ["assets/avaliacao-jessika.webp"] },
    { nome: "Iury Alves", meses: 5, texto: "O cara faz um trabalho tão bonito que parece mentira hahahahahaha super recomendo. Profissional super habilidoso, atencioso, limpo e organizado. Pode ir sem medo!" },
    { nome: "dayanna de mello loureiro da costa", meses: 5, texto: "Léo é extremamente dedicado e atento.\nSe preocupa em cada detalhe. Adorei o atendimento maravilhoso!!\nProfissional brabo demais!!! Parabéns pelo trabalho 👏🏼👏🏼\nRecomendo de coração o trabalho do Léo!…" },
    { nome: "Flavio Ribeiro Pinto Filho", meses: 6, texto: "Profissional muito bem capacitado. Além das obras de arte que faz com tinta, tanto realismo quanto os outros estilos de tatuagem, segue todas as diretrizes de higiene e guia os clientes com os tratamentos pós tattoo. Conheço há 10 anos o profissional e recomendo muito seu serviço." },
    { nome: "douglas bolívar", meses: 7, texto: "Quero agradecer ao Tatuador Leandro, não só pela tatuagem, que ficou muito boa, o trabalho do cara é realmente top, mas pela atenção, esse cara foi o único que foi paciente comigo, desde o início até o fim, não é atoa que viramos amigos, parabéns pelo seu trabalho, pelo profissionalismo e por esse ser humano de um coração gigante que você é.\nSUCESSO.", fotos: ["assets/avaliacao-douglas-1.webp"] },
    { nome: "Luiz Fernando Rodrigues da Rocha F…", meses: 7, texto: "Muito bom atendimento, o ambiente era limpo e organizado e o resultado ficou melhor do que eu imaginava. Com certeza voltaria recomendo !" },
    { nome: "Leandro", meses: 7, texto: "Simplesmente o melhor tatuador que já conheci! O trabalho é surreal de tão perfeito. A tatuagem realista ficou ABSURDAMENTE fiel aos detalhes, sombras impecáveis, profundidade incrível e um acabamento que parece uma fotografia na pele.\n\nAlém do talento fora do comum, é um profissional extremamente atencioso, cuidadoso e perfeccionista. Desde o atendimento até o resultado final, tudo foi impecável. Dá para ver claramente a paixão e dedicação em cada detalhe.\n\nSe você está procurando tatuagem realista de altíssimo nível, pode ir sem medo. Superou todas as minhas expectativas. ⭐⭐⭐⭐⭐" },
    { nome: "Jefferson Coelho", meses: 7, texto: "Top D++++, e referência no que faz!!! Parabéns meu mano!!!\n😁👌🏼…" },
    { nome: "Erik Frazao", meses: 7, texto: "Excelente profissional, esse eu indico de olhos fechados 💪🏾…" },
    { nome: "Elvis Chaves", meses: 7, texto: "Um dos melhores que já vi na minha vida !! Super indico", fotos: ["assets/avaliacao-elvis-1.webp"] },
    { nome: "Leandro Cezar", meses: 8, texto: "Profissional excepcional em realismo. Desde o primeiro contato até a finalização da tatuagem, o atendimento foi impecável, sempre com atenção, cuidado e profissionalismo. Cada detalhe é pensado com precisão, transformando ideias em artes únicas e cheias de personalidade. O resultado final supera expectativas, mostrando não só técnica absurda, mas também sensibilidade artística. Recomendo de olhos fechados para quem busca uma tatuagem realista de alto nível.", fotos: ["assets/avaliacao-leandro-cezar-1.webp", "assets/avaliacao-leandro-cezar-2.webp"] },
    { nome: "Lene Villela", meses: 8, texto: "Fiz uma tatuagem simplesmente maravilhosa amei o trabalho amei os traços o atendimento a tatuagem ficou linda" },
    { nome: "Sophia Jesus", meses: 8, texto: "Sou cliente do Léo há 10 anos e, ao longo de todo esse tempo, ele só evoluiu para melhor. Recentemente fiz uma nova tattoo com ele e, mais uma vez, fiquei impressionada. É incrível como ele é um profissional e artista magnífico.\n\nTenho orgulho de todas as tatuagens que fiz com ele, mas essa mais recente — depois das especializações que realizou — me surpreendeu novamente. Não apenas pelo realismo impecável, mas também pela experiência durante a sessão: senti quase nada de dor e, após a tattoo, era como se eu nem tivesse feito. Cheguei ao ponto de esquecer que tinha tatuado, zero dor e resultado perfeito.\n\nPodem ir sem medo. O estúdio é um lugar super acolhedor, fui muito bem recebida por ele e pela esposa. Fiquei horas lá e tive um tratamento VIP, do início ao fim.\nSou muito grata pela experiência incrível." },
  ],
  /* portfólio — descrições em TXT.*.portfolio, na mesma ordem (cada foto tem uma versão "-480" para celular) */
  portfolio: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map((n) => `assets/trabalho-${n}.webp`),
};

/* ============ TEXTOS (PT / EN / ES) ============
   "t" = conteúdo de elementos com data-t; "a" = atributos de elementos com data-a. */
const TXT = {
  pt: {
    lang: "pt-BR",
    desc: "Realismo preto e cinza: tatuagens realistas com riqueza de detalhes e projetos personalizados. Conheça o trabalho do tatuador Léo Lead e solicite seu orçamento pelo WhatsApp.",
    msg: "Olá, vim pelo site do Léo Lead e quero fazer minha tatuagem!",
    rev: { tempo: (n) => `há ${n} ${n === 1 ? "mês" : "meses"}`, mais: "Ler mais", menos: "Ler menos", googleAria: "Avaliação do Google", starsAria: "5 de 5 estrelas", foto: "Foto enviada pelo cliente na avaliação" },
    form: { nome: "Nome", tel: "Telefone", errNome: "Digite seu nome.", errTel: "Digite um telefone válido com DDD.", ok: "Recebemos seu contato! Continue a conversa no WhatsApp que acabou de abrir." },
    ampliar: "Ampliar: ",
    marquee: ["REALISMO", "PRETO & CINZA", "DETALHISMO", "PROFUNDIDADE", "CONTRASTE", "PROJETOS PERSONALIZADOS", "EXCLUSIVIDADE"],
    estilos: [
      ["Mitologia grega", "Braço fechado em realismo preto e cinza: Zeus, templo grego e guerreiro espartano.", "Braço fechado em realismo preto e cinza com Zeus, um templo grego e um guerreiro espartano, e mãos em oração na costela"],
      ["Realismo colorido", "Felino entre folhagens e helicônias tropicais, em cores vivas e cheias de detalhe.", "Tatuagem colorida de felino entre folhagens e helicônias no antebraço"],
      ["Retrato com felino", "Rosto feminino que se funde a um felino, em realismo no ombro.", "Rosto feminino que se funde a um felino, em realismo no ombro"],
      ["Homenagem", "O olhar de uma criança com a frase Ad vitam e a data, em realismo no peito.", "Olhar de uma criança com a frase Ad vitam e a data 07.06.24 no peito"],
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
    desc: "Black & grey realism: realistic tattoos rich in detail, with custom projects. Discover the work of tattoo artist Léo Lead and request your quote on WhatsApp.",
    msg: "Hi, I came from Léo Lead's website and I'd like to get a tattoo!",
    rev: { tempo: (n) => `${n} month${n === 1 ? "" : "s"} ago`, mais: "Read more", menos: "Read less", googleAria: "Google review", starsAria: "5 out of 5 stars", foto: "Photo posted by the client with the review" },
    form: { nome: "Name", tel: "Phone", errNome: "Please enter your name.", errTel: "Please enter a valid phone number with area code.", ok: "We got your details! Continue the conversation in the WhatsApp chat that just opened." },
    ampliar: "Enlarge: ",
    marquee: ["REALISM", "BLACK & GREY", "ATTENTION TO DETAIL", "DEPTH", "CONTRAST", "CUSTOM PROJECTS", "EXCLUSIVITY"],
    estilos: [
      ["Greek mythology", "Black and grey realism sleeve: Zeus, a Greek temple and a Spartan warrior.", "Black and grey realism sleeve with Zeus, a Greek temple and a Spartan warrior, plus praying hands on the ribs"],
      ["Color realism", "A big cat among tropical leaves and heliconias, in vivid, detailed color.", "Color tattoo of a big cat among leaves and heliconias on the forearm"],
      ["Portrait with a big cat", "A woman's face merging into a big cat, realism on the shoulder.", "Woman's face merging into a big cat, realism on the shoulder"],
      ["Tribute", "A child's eyes with the phrase Ad vitam and a date, realism on the chest.", "A child's eyes with the phrase Ad vitam and the date 07.06.24 on the chest"],
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
      h1: 'Black <span class="nw">&amp; grey</span> realism',
      heroSub: "Black and grey realistic tattoos with depth, contrast and rich detail in every custom project.",
      projetos: "Recent projects",
      sobre1: "I'm Léo Lead, a tattoo artist specializing in black and grey realism.",
      sobre2: "Every project is custom-made from your idea and your story, with attention to every shadow, texture and detail.",
      sobre3: "Shall we turn your ideas into art together?",
      nota: "5.0", avBadge: "31 reviews", avTitulo: "What clients say", avLead: "Real reviews from people who got tattooed by Léo Lead, straight from Google. (Reviews shown in their original Portuguese.)", avLink: "See all reviews on Google",
      orcTitulo: "What is the average price of a tattoo with Léo Lead?",
      orcTexto: 'A tattoo with <strong>Léo Lead</strong> costs on average <strong class="nw">R$1,500 to R$2,500</strong> (Brazilian reais), <strong>for a 6 to 10 hour session</strong>.',
      orcSub: "Request your quote by signing up below",
      fNome: "Name", fTel: "Phone / WhatsApp",
      locTitulo: "Find us", locAviso: "Private studio. Visits by appointment only.", locVerMapa: "View on Google Maps", orcBotao: "Get my quote", direitos: "All rights reserved.",
    },
    a: {
      langAria: "Language", heroAlt: "Tattoo artist with glasses and black gloves, focused while tattooing an arm, with a rose tattooed on his neck",
      projetos: "Recent projects", projAnt: "Previous project", projProx: "Next project", portfolio: "Portfolio", avAria: "Client reviews", avAnt: "Previous review", avProx: "Next review",
      aboutAlt: "Tattoo artist smiling and giving a thumbs up in the studio, in a black T-shirt and black gloves, with a forearm tattoo",
      igAria: "Léo Lead's Instagram", fNomePh: "Your full name", lbAria: "Enlarged photo", lbFechar: "Close", lbAnt: "Previous photo", lbProx: "Next photo",
    },
  },
  es: {
    lang: "es",
    desc: "Realismo en negro y gris: tatuajes realistas con gran riqueza de detalles y proyectos personalizados. Conoce el trabajo del tatuador Léo Lead y solicita tu presupuesto por WhatsApp.",
    msg: "¡Hola! Vengo del sitio web de Léo Lead y quiero hacerme un tatuaje.",
    rev: { tempo: (n) => `hace ${n} ${n === 1 ? "mes" : "meses"}`, mais: "Leer más", menos: "Leer menos", googleAria: "Reseña de Google", starsAria: "5 de 5 estrellas", foto: "Foto enviada por el cliente en la reseña" },
    form: { nome: "Nombre", tel: "Teléfono", errNome: "Escribe tu nombre.", errTel: "Escribe un teléfono válido con código de área.", ok: "¡Recibimos tus datos! Continúa la conversación en el WhatsApp que se acaba de abrir." },
    ampliar: "Ampliar: ",
    marquee: ["REALISMO", "NEGRO & GRIS", "DETALLISMO", "PROFUNDIDAD", "CONTRASTE", "PROYECTOS PERSONALIZADOS", "EXCLUSIVIDAD"],
    estilos: [
      ["Mitología griega", "Manga en realismo negro y gris: Zeus, templo griego y guerrero espartano.", "Manga en realismo negro y gris con Zeus, un templo griego y un guerrero espartano, y manos en oración en las costillas"],
      ["Realismo a color", "Felino entre hojas y heliconias tropicales, en colores vivos y llenos de detalle.", "Tatuaje a color de un felino entre hojas y heliconias en el antebrazo"],
      ["Retrato con felino", "Rostro femenino que se funde con un felino, en realismo en el hombro.", "Rostro femenino que se funde con un felino, en realismo en el hombro"],
      ["Homenaje", "La mirada de un niño con la frase Ad vitam y la fecha, en realismo en el pecho.", "Mirada de un niño con la frase Ad vitam y la fecha 07.06.24 en el pecho"],
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
      h1: 'Realismo en negro <span class="nw">y gris</span>',
      heroSub: "Tatuajes realistas en negro y gris, con profundidad, contraste y gran riqueza de detalles en cada proyecto personalizado.",
      projetos: "Proyectos recientes",
      sobre1: "Soy Léo Lead, tatuador especializado en realismo en negro y gris.",
      sobre2: "Cada proyecto se crea de forma personalizada, a partir de tu idea y tu historia, con atención a cada sombra, textura y detalle.",
      sobre3: "¿Transformamos juntos tus ideas en arte?",
      nota: "5,0", avBadge: "31 reseñas", avTitulo: "Lo que dicen los clientes", avLead: "Reseñas reales de quienes ya se tatuaron con Léo Lead, directo de Google. (Reseñas en su portugués original.)", avLink: "Ver todas las reseñas en Google",
      orcTitulo: "¿Cuál es el precio promedio de un tatuaje con Léo Lead?",
      orcTexto: 'Un tatuaje con <strong>Léo Lead</strong> cuesta en promedio <strong class="nw">R$1.500 a R$2.500</strong> (reales brasileños), <strong>sesión de 6 a 10 horas</strong>.',
      orcSub: "Solicita tu presupuesto registrándote abajo",
      fNome: "Nombre", fTel: "Teléfono / WhatsApp",
      locTitulo: "Dónde estamos", locAviso: "Estudio privado. Atención solo con cita previa.", locVerMapa: "Ver en Google Maps", orcBotao: "Quiero recibir mi presupuesto", direitos: "Todos los derechos reservados.",
    },
    a: {
      langAria: "Idioma", heroAlt: "Tatuador con gafas y guantes negros, concentrado mientras tatúa un brazo, con una rosa tatuada en el cuello",
      projetos: "Proyectos recientes", projAnt: "Proyecto anterior", projProx: "Siguiente proyecto", portfolio: "Portafolio", avAria: "Reseñas de clientes", avAnt: "Reseña anterior", avProx: "Siguiente reseña",
      aboutAlt: "Tatuador sonriendo y haciendo un gesto de aprobación en el estudio, con camiseta negra, guantes negros y un tatuaje en el antebrazo",
      igAria: "Instagram de Léo Lead", fNomePh: "Tu nombre completo", lbAria: "Foto ampliada", lbFechar: "Cerrar", lbAnt: "Foto anterior", lbProx: "Foto siguiente",
    },
  },
};
