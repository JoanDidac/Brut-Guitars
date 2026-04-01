export default {
    nav: {
        about: 'coneix-me',
        gallery: 'galeria',
        process: 'procés',
        services: 'serveis',
        contact: 'contacte',
    },

    hero: {
        combining1: 'On la',
        keyword1: 'Passió',
        combining2: 'Marida amb',
        keyword2: 'Precisió',
        subtitle: 'Fet a mà, diagnostics d\'oïda i construccions per inspirar músics que exigeixen més del seu instrument.\nCada instrument té una ànima única.',
        cta1: 'Coneix Brut Guitars',
        cta2: 'Encarrega el teu Projecte',
    },

    about: {
        label: 'L\'Artesà',
        title1: 'Construït a mà,',
        title2: "Dissenyat d'oïda",
        p1: "Amb més de 3000 instruments a la meva esquena, he adquirit un profund coneixement de les tècniques de reparació, restauració i optimització de guitarres i baixos elèctrics, acústics i clàssics.",
        p2: "La meva experiència no només em permet abordar cada instrument amb una mirada experta, sinó que també m'ha donat la capacitat de detectar problemes simplement escoltant o tocant l\'instrument en questio. Cada guitarra o baix es tracta amb la mateixa cura i dedicació.",
        stat1Label: "Anys d'Ofici",
        stat2Label: 'Guitarres Ateses',
        stat3Label: 'Satisfacció del Client',
    },

    gallery: {
        label: 'La Col·lecció',
        title: 'El Nostre Portafoli',
        subtitle: 'Cada guitarra és un diàleg únic entre la fusta, cablejat i les mans que la modelen.',
        guitars: [
            { name: 'Yamaha SB-2A Blau Elèctric', spec: 'Tractament Vintage' },
            { name: 'El Nostre Verd Jade', spec: 'Color Customitzat' },
            { name: 'Fender Precision Japan Rosa Pal', spec: 'Elegant Estil Boutique' },
            { name: 'Pala Reparada BRUT', spec: 'Clavillers Precision' },
            { name: 'Detalls de Màstil de Palisandre', spec: 'Trasts Vestits a Mà' },
            { name: 'En Bones Mans', spec: "Testejat per L'Artesà" },
        ],
    },

    process: {
        label: 'El Procés',
        title: 'D\'una Visió a una Realitat Sonora',
        subtitle: "Construir una guitarra a mida és un viatge. Així és com donem vida als instruments dels teus somnis.",
        steps: [
            { number: '01', title: 'Consulta', description: 'Parlem del teu estil de toc, preferències tonals i la música que et mou.' },
            { number: '02', title: 'Selecció de Fusta', description: 'Fustes seleccionades a mà per les seves propietats acústiques i caràcter de veta.' },
            { number: '03', title: 'Forma i Tallat', description: "Cada cos i cada mastil es modela a mà amb eines tradicionals i tècniques refinades." },
            { number: '04', title: 'Acabat i Configuració', description: 'Acabat meticulós, treball de trasts, electrònica i una configuració professional.' },
        ],
    },

    services: {
        label: 'Molt Més que Construccions',
        title: 'El Nostre Catàleg de Serveis :',
        subtitle: "Construir guitarres és un art, però mantenir-les, reparar-les i millorar-les és una necessitat absoluta. Com a músic en actiu, sé exactament el que cal per fer que un instrument estigui a punt per a l'escenari. Tant si necessita un simple ajust, una nova capa de pintura o una resurrecció completa, et tinc cobert.",
        items: [
            {
                id: 'builds',
                title: 'Guitarres a Mida & Personalitzacions',
                shortTitle: 'Construcció',
                desc: "Somies amb una bèstia de 7 cordes sense claviller o una clàssica màquina de blues amb un toc especial? Construeixo instruments adaptats a les teves necessitats sonores i ergonòmiques. Si pots imaginar-ho (i fins i tot si no), podem construir-ho.",
            },
            {
                id: 'setups',
                title: 'Ajustaments & Configuracions Professionals',
                shortTitle: 'Ajustaments',
                desc: "Una guitarra és tan bona com el seu ajustament. Des de l'entonació fins a l'acció, la curvatura del mastil i l'alçada de les pastilles faré que el teu instrument soni de meravella. Digues adéu al trasteig i hola als bends sense esforç.",
            },
            {
                id: 'woodworking',
                title: 'Reparacions Estructurals & Fusteria',
                shortTitle: 'Fusteria',
                desc: "Claviller trencat? Esquerdes? Mastil deformat? No et preocupis. La fusta és viva i de vegades es comporta de forma estranya. M'especialitzo a tornar-li la vida a instruments que ja no funcionen perquè puguin tornar a sonar.",
            },
            {
                id: 'paint',
                title: 'Pintura & Reacabats Personalitzats',
                shortTitle: 'Pintura',
                desc: "Ja sigui que busques un acabat nitrocel·lulòsic elegant, una excèntrica obra d'art modern o un acabat envellit que sembli tret d'una gira d'estadis dels 70, tinc les pintures, la paciència i l'ull artístic perquè destaqui.",
            },
            {
                id: 'fretwork',
                title: 'Treball de Trasts & Retardat',
                shortTitle: 'Trasts',
                desc: "Anivellament, coronat, polit o retrastejat complet. M'asseguraré que cada nota soni nítida i clara a tot el diapasó. Perquè les notes mortes involuntàries són per a aficionats.",
            },
            {
                id: 'electronics',
                title: 'Electrònica & Màgia',
                shortTitle: 'Electrònica',
                desc: "Cablejat personalitzat, canvi de pastilles, divisió de bobines, interruptors de tall i solució per a aquell brunzit misteriós que et torna boig. Practico les arts prohibides de la soldadura.",
            },
        ],
        viewService: 'Veure Pàgina del Servei',
    },

    servicesPage: {
        backBtn: '← Tornar a l\'inici',
        pageTitle: 'Serveis de Luthier',
        pageSubtitle: 'Des d\'ajustaments bàsics fins a restauracions estructurals completes, el teu instrument està en mans expertes.',
        bookBtn: 'Reserva una cita!',
        questionsBtn: 'Preguntes? Truca\'ns!',
        ctaTitle: 'A punt per fer soroll?',
        ctaSubtitle: "Ja sigui una instal·lació estàndard o un projecte personalitzat ambiciós, contacta'ns i parlem del teu projecte.",
        ctaBtn: 'Contacta amb el taller',
        items: [
            {
                id: 'builds',
                title: 'Construcció i personalització a mida',
                subtitle: 'Somnis convertits en fusta i filferro.',
                desc: "Tant si somies amb una bèstia de 7 cordes sense claviller, una clàssica màquina de blues amb un toc modern o una mica completament extravagant, construeixo instruments adaptats a les teves necessitats sonores i ergonòmiques exactes. T'assessorarem sobre fustes, perfils de pal, mides de trasts i electrònica per garantir que el producte final sigui una extensió de les mans.",
            },
            {
                id: 'setups',
                title: 'Ajustaments i configuracions professionals',
                subtitle: 'Fes que la teva guitarra soni com la seda.',
                desc: "Una guitarra és tan bona com la configuració. Des de l'entonació fins a l'acció, des de la curvatura del pal fins a l'alçada de les pastilles, faré que el vostre instrument rendeixi al màxim. No em limito a ajustar-la a les especificacions de fàbrica; el configuro segons les TEVES especificacions, en funció de la força amb què toquis, l'afinació que facis servir i l'estil que toquis.",
            },
            {
                id: 'woodworking',
                title: 'Reparacions estructurals i fusteria',
                subtitle: 'Revivint instruments.',
                desc: "Claviller trencat? Cos esquerdat? Pal deformat? Reforços fluixos a la teva guitarra acústica preferida? No et preocupis. La fusta és viva i de vegades es descontrola. M'especialitzo en reparacions estructurals complexes, utilitzant coles d'origen animal, espigues i tècniques modernes de subjecció per garantir que la reparació sigui sovint més resistent que la fusta original.",
            },
            {
                id: 'paint',
                title: 'Pintura i acabat personalitzats',
                subtitle: 'Acabats elegants, art modern o efectes envellits intensos.',
                desc: "L'acabat d'una guitarra canvia dràsticament el seu estil. Ja sigui que busques un elegant sunburst de nitrocel·lulosa, un remolí original o un acabat envellit intens que sembli haver sobreviscut a una gira d'estadis dels 70, tinc les pintures, la paciència i l'ull artístic per aconseguir un resultat espectacular.",
            },
            {
                id: 'fretwork',
                title: 'Treball de trasts i retardat',
                subtitle: 'Perquè les notes mortes involuntàries són per a aficionats.',
                desc: "Els teus trasts són la interfície entre tu i la fusta. Ofereixo anivellament, coronació i poliment precisos de trasts per eliminar el brunzit i assegurar una entonació perfecta. Si els teus trasts estan completament desgastats, farem un retard complet. Tria filferro vintage, jumbo o actualitza a acer inoxidable.",
            },
            {
                id: 'electronics',
                title: 'Electrònica i màgia',
                subtitle: "Dominant l'art de la soldadura.",
                desc: "Cablejat personalitzat, canvi de pastilles, divisió de bobines, interruptors de tall, interruptors de fase i solució per a aquell brunzit misteriós que et torna boig. Utilitzo potenciòmetres, condensadors i interruptors d'alta qualitat per garantir una ruta de senyal pur.",
            },
        ],
    },

    contact: {
        label: 'Contacte',
        title1: 'Construïm l\'instrument',
        title2: 'dels teus Somnis',
        text: "Necessites assessorament sobre reparacions o ajustaments? Som aquí per respondre totes les teves preguntes amb atenció personalitzada.",
        emailLabel: 'Correu electrònic',
        workshopLabel: 'Taller',
        workshopValue: 'La Garriga, Catalunya',
        socialLabel: 'Xarxes socials',
        formName: 'Nom i cognoms',
        formNamePlaceholder: 'El teu nom',
        formEmail: 'Adreça de correu electronic',
        formEmailPlaceholder: 'el.teu@correu.com',
        formMessage: 'Explica\'m el teu projecte',
        formMessagePlaceholder: "Estic buscant una guitarra personalitzada amb...",
        submitIdle: 'Envia el Missatge',
        submitLoading: '⏳ Enviant…',
        submitSuccess: '✓ Missatge rebut! Message in a bottle...',
        submitError: '✗ Alguna cosa ha fallat — torna-ho a provar',
    },

    footer: {
        tagline: "Guitarres personalitzades fetes a mà, construïdes amb passió i precisió a La Garriga, Catalunya.",
        navigate: 'Navega',
        follow: 'Segueix-nos',
        rights: 'Tots els drets reservats.',
    },
};
