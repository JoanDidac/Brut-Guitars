export default {
    nav: {
        about: 'conocenos',
        gallery: 'galería',
        process: 'proceso',
        services: 'servicios',
        contact: 'contacto',
    },

    hero: {
        combining1: 'Donde la',
        keyword1: 'Pasión',
        combining2: 'Marida con',
        keyword2: 'Precisión',
        subtitle: 'Moldeados a mano, afinados de oído y construidos para inspirar a los músicos que exigen más de su instrumento.\nCada instrumento tiene un alma única.',
        cta1: 'Conoce Brut Guitars',
        cta2: 'Encarga tu Proyecto',
    },

    about: {
        label: 'Nuestra Artesania',
        title1: 'Construidos a Mano',
        title2: 'Acabados de Oido',
        p1: 'Con más de 3000 instrumentos a mis espaldas, he adquirido un profundo conocimiento de las técnicas de reparación, restauración y optimización de guitarras y bajos eléctricos, acústicos y clásicos.',
        p2: 'Mi experiencia no solo me permite abordar cada instrumento con una mirada experta, sino que también me ha dado la capacidad de diagnosticar y detectar problemas simplemente escuchando o tocando el instrumento en question. Gracias a ello, puedo ofrecer soluciones rápidas y precisas, desde un ajuste fino hasta una restauración completa.',
        stat1Label: 'Años de Oficio',
        stat2Label: 'Guitarras Atendidas',
        stat3Label: 'Satisfacción del Cliente',
    },

    gallery: {
        label: 'La Colección',
        title: 'Nuestro Portafolio',
        subtitle: 'Cada guitarra es un diálogo único entre la madera, cableado y las manos que la moldean.',
        guitars: [
            { name: 'Yamaha SB-2A Azul Sónico', spec: 'Tratamiento Vintage' },
            { name: 'Nuestro Verde Jade Vintage', spec: 'Color Customizado' },
            { name: 'Fender Precision Japan Rosa Palo', spec: 'Elegante Estilo Boutique' },
            { name: 'Pala Restaurada BRUT', spec: 'Modelada a Mano · Clavijeros Precision' },
            { name: 'Detalles en Mástil de Palo de Rosa', spec: 'Trastes Montados a Mano' },
            { name: 'En Buenas Manos', spec: 'Testeando a prueba de Estadios' },
        ],
    },

    process: {
        label: 'Nuestro Proceso',
        title: 'De una Vision a una Realidad Audible',
        subtitle: 'Construir una guitarra personalizada es todo un viaje. Así es como hacemos realidad el instrumento de tus sueños.',
        steps: [
            { number: '01', title: 'Consultoria', description: 'Hablamos sobre tu estilo de interpretación, tus preferencias tonales y la música y artistas que te mueven el alma.' },
            { number: '02', title: 'Seleccion de Materiales', description: 'Maderas & Materiales seleccionadas a mano por sus propiedades resonantes, acústicas y sus vetas.' },
            { number: '03', title: 'Moldeado & Personalizacion', description: 'Valoramos la historia de cada instrumento. Cada instrumento se moldea a mano utilizando herramientas tradicionales y técnicas modernas.' },
            { number: '04', title: 'Acabados & Ajuste Fino', description: 'Acabados meticulosos, customizaciones, electrónica y una puesta a punto profesional.' },
        ],
    },

    services: {
        label: 'Mucho mas que simples Creaciones',
        title: 'Catalogo de Servicios:',
        subtitle: 'Construir guitarras es un arte, pero mantenerlas, repararlas y mejorarlas es un derecho humanitario fundamental. Como músico de blues y rock progresivo amante del directo, sé exactamente lo que se necesita para que un instrumento esté listo para el escenario a prueba de balas. Ya sea que necesite un pequeño ajuste, una nueva capa de pintura o una restauración completa, Nosostros nos encargamos de todo.',
        items: [
            {
                id: 'builds',
                title: 'Guitarras a medida & Personalizaciones',
                shortTitle: 'Construcción',
                desc: '¿Sueñas con una bestia de 7 cuerdas sin clavijero o una clásica máquina de blues con un toque especial? Construyo instrumentos adaptados a tus necesidades sonoras y ergonómicas. Si puedes imaginarlo (e incluso si no), podemos construirlo.',
            },
            {
                id: 'setups',
                title: 'Ajustes',
                shortTitle: 'Ajustes',
                desc: 'Una guitarra es tan buena como su ajuste. Desde la entonación hasta la acción, la curvatura del mástil y la altura de las pastillas, haré que tu instrumento suene de maravilla. Dile adiós al trasteo y hola a los bends sin esfuerzo.',
            },
            {
                id: 'woodworking',
                title: 'Carpintería',
                shortTitle: 'Carpintería',
                desc: '¿Clavijero roto? ¿Grietas? ¿Mástil deformado? No te preocupes. La madera está viva y a veces se comporta de forma extraña. Me especializo en devolverle la vida a instrumentos que ya no funcionan para que puedan volver a sonar.',
            },
            {
                id: 'paint',
                title: 'Pintura',
                shortTitle: 'Pintura',
                desc: 'Ya sea que busques un elegante acabado nitrocelulósico, una excéntrica obra de arte moderno o un acabado envejecido que parezca sacado de una gira de estadios de los 70, tengo las pinturas, la paciencia y el ojo artístico para que destaque.',
            },
            {
                id: 'fretwork',
                title: 'Trabajo de trastes',
                shortTitle: 'Trastes',
                desc: 'Nivelación, coronado, pulido o retrasteo completo. Me aseguraré de que cada nota suene nítida y clara en todo el diapasón. Porque las notas muertas involuntarias son para aficionados...',
            },
            {
                id: 'electronics',
                title: 'Electrónica',
                shortTitle: 'Electrónica',
                desc: 'Cableado personalizado, cambio de pastillas, división de bobinas, interruptores de corte y solución para ese zumbido misterioso que te vuelve loco. Practico las artes oscuras de la soldadura.',
            },
        ],
        viewService: 'Ver Todos Servicios',
    },

    servicesPage: {
        backBtn: '← Volver al inicio',
        pageTitle: 'Servicios de Luthier',
        pageSubtitle: 'Desde ajustes básicos hasta restauraciones estructurales completas, tu instrumento está en manos expertas.',
        bookBtn: '¡Reserva una cita!',
        questionsBtn: '¿Preguntas? ¡Llámanos!',
        ctaTitle: '¿Listo para hacer ruido?',
        ctaSubtitle: 'Ya sea una instalación estándar o un proyecto personalizado ambicioso, contáctanos y hablemos de tu proyecto.',
        ctaBtn: 'Contacta con el taller',
        items: [
            {
                id: 'builds',
                title: 'Construcción y personalización a medida',
                subtitle: 'Sueños convertidos en madera y alambre.',
                desc: 'Tanto si sueñas con una bestia de 7 cuerdas sin clavijero, una clásica máquina de blues con un toque moderno o algo completamente extravagante, construyo instrumentos adaptados a tus necesidades sonoras y ergonómicas exactas. Te asesoraremos sobre maderas, perfiles de mástil, tamaños de trastes y electrónica para garantizar que el producto final sea una extensión de tus manos. Si puedes imaginarlo (e incluso si no puedes), podemos construirlo.',
            },
            {
                id: 'setups',
                title: 'Ajustes y configuraciones profesionales',
                subtitle: 'Haz que tu guitarra suene como la seda.',
                desc: 'Una guitarra es tan buena como su configuración. Desde la entonación hasta la acción, desde la curvatura del mástil hasta la altura de las pastillas, haré que tu instrumento rinda al máximo. Dile adiós al zumbido de los trastes, las cuerdas rígidas y los puntos muertos. No me limito a ajustarla a las especificaciones de fábrica; lo configuro según TUS especificaciones, en función de la fuerza con la que toques, la afinación que uses y el estilo que toques.',
            },
            {
                id: 'woodworking',
                title: 'Reparaciones estructurales y carpintería',
                subtitle: 'Reviviendo instrumentos.',
                desc: '¿Clavijero roto? ¿Cuerpo agrietado? ¿Mástil deformado? ¿Refuerzos sueltos en tu guitarra acústica favorita? No te preocupes. La madera está viva y a veces se descontrola (o se cae en el escenario). Me especializo en reparaciones estructurales complejas, utilizando colas de origen animal, espigas y técnicas modernas de sujeción para garantizar que la reparación sea a menudo más resistente que la madera original.',
            },
            {
                id: 'paint',
                title: 'Pintura y acabado personalizados',
                subtitle: 'Acabados elegantes, arte moderno o efectos envejecidos intensos.',
                desc: 'El acabado de una guitarra cambia drásticamente su estilo. Ya sea que busques un elegante sunburst de nitrocelulosa, un remolino original o un acabado envejecido intenso que parezca haber sobrevivido a una gira de estadios de los 70, tengo las pinturas, la paciencia y el ojo artístico para lograr un resultado espectacular. También realizamos retoques menores y rellenos de imperfecciones.',
            },
            {
                id: 'fretwork',
                title: 'Trabajo de trastes y retrasteo',
                subtitle: 'Porque las notas muertas involuntarias son para aficionados...',
                desc: 'Tus trastes son la interfaz entre tú y la madera. Ofrezco nivelación, coronación y pulido precisos de trastes para eliminar el zumbido y asegurar una entonación perfecta. Si tus trastes están completamente desgastados, haremos un retrasteo completo. Elige alambre vintage, jumbo o actualiza a acero inoxidable para que nunca más tengas que retrastear.',
            },
            {
                id: 'electronics',
                title: 'Electrónica & Personalizaciones',
                subtitle: 'Dominando el arte de la soldadura.',
                desc: 'Cableado personalizado, cambio de pastillas, división de bobinas, interruptores de corte, interruptores de fase y solución para ese zumbido misterioso que te vuelve loco. Utilizo potenciómetros, condensadores e interruptores de alta calidad para garantizar una ruta de señal pura. ¿Quieres añadir un preamplificador integrado o recablear completamente un sistema vintage? ¡Vamos a conectarlo!',
            },
        ],
    },

    contact: {
        label: 'Contacto',
        title1: 'Contacto',
        title2: 'Brut Guitars',
        text: '¿Necesitas asesoramiento sobre reparaciones o ajustes? Estamos aquí para responder a todas tus preguntas con atención personalizada.',
        emailLabel: 'Correo electrónico',
        workshopLabel: 'Dirección',
        workshopValue: 'Carrer Banys 47, La Garriga',
        socialLabel: 'Teléfono',
        formName: 'Nombre y apellidos',
        formNamePlaceholder: 'Tu nombre',
        formEmail: 'Correo electrónico',
        formEmailPlaceholder: 'tu@correo.com',
        formMessage: 'Mensaje',
        formMessagePlaceholder: 'Hablemos del proyecto...',
        submitIdle: 'Enviar Mensaje',
        submitLoading: '⏳ Enviando…',
        submitSuccess: '✓ ¡Mensaje Enviado! Message in a bottle...',
        submitError: '✗ Algo ha fallado — inténtalo de nuevo',
    },

    footer: {
        tagline: 'Guitarras personalizadas hechas a mano, construidas con pasión y precisión en La Garriga, Cataluña.',
        navigate: 'Navegar',
        follow: 'Seguir',
        rights: 'Todos los derechos reservados.',
    },
};
