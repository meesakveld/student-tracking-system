const tableName = "education_programmes"; //! Change TABLENAME to the name of the table you want to create

const seed = async function (knex) {
    // Deletes ALL existing entries
    await knex(tableName).del();
    await knex(tableName).insert([
        {
            "title": "Bachelor in het onderwijs : buitengewoon onderwijs",
            "slug": "bachelor-in-het-onderwijs-buitengewoon-onderwijs",
            "academic_year": "2023-24",
            "code": "BNBBUO"
        },
        {
            "title": "Bachelor in de creatieve therapie",
            "slug": "bachelor-in-de-creatieve-therapie",
            "academic_year": "2023-24",
            "code": "BNBCRT"
        },
        {
            "title": "Bachelor in het onderwijs : schoolontwikkeling",
            "slug": "bachelor-in-het-onderwijs-schoolontwikkeling",
            "academic_year": "2023-24",
            "code": "BNBSON"
        },
        {
            "title": "Bachelor in het onderwijs  : zorgverbreding en remediërend leren",
            "slug": "bachelor-in-het-onderwijs-zorgverbreding-en-remedierend-leren",
            "academic_year": "2023-24",
            "code": "BNBZRL"
        },
        {
            "title": "Graduaat in de accounting administration",
            "slug": "graduaat-in-de-accounting-administration",
            "academic_year": "2023-24",
            "code": "GRAAADG"
        },
        {
            "title": "Graduaat in de accounting administration",
            "slug": "graduaat-in-de-accounting-administration",
            "academic_year": "2023-24",
            "code": "GRAAADO"
        },
        {
            "title": "Graduaat in de digitale vormgeving",
            "slug": "graduaat-in-de-digitale-vormgeving",
            "academic_year": "2023-24",
            "code": "GRADVG"
        },
        {
            "title": "Educatieve graduaatsopleiding in het secundair onderwijs",
            "slug": "educatieve-graduaatsopleiding-in-het-secundair-onderwijs",
            "academic_year": "2023-24",
            "code": "GRAEGO"
        },
        {
            "title": "Graduaat in het informatiebeheer",
            "slug": "graduaat-in-het-informatiebeheer",
            "academic_year": "2023-24",
            "code": "GRAIBA"
        },
        {
            "title": "Graduaat in het maatschappelijk werk",
            "slug": "graduaat-in-het-maatschappelijk-werk",
            "academic_year": "2023-24",
            "code": "GRAMAW"
        },
        {
            "title": "Graduaat in de marketing- en communicatiesupport",
            "slug": "graduaat-in-de-marketing-en-communicatiesupport",
            "academic_year": "2023-24",
            "code": "GRAMCS"
        },
        {
            "title": "Graduaat in de orthopedagogie",
            "slug": "graduaat-in-de-orthopedagogie",
            "academic_year": "2023-24",
            "code": "GRAOTP"
        },
        {
            "title": "Graduaat in de orthopedagogische begeleiding",
            "slug": "graduaat-in-de-orthopedagogische-begeleiding",
            "academic_year": "2023-24",
            "code": "GRAOTB"
        },
        {
            "title": "Graduaat in het programmeren",
            "slug": "graduaat-in-het-programmeren",
            "academic_year": "2023-24",
            "code": "GRAPGMG"
        },
        {
            "title": "Graduaat in het programmeren",
            "slug": "graduaat-in-het-programmeren",
            "academic_year": "2023-24",
            "code": "GRAPGMO"
        },
        {
            "title": "Graduaat in het sociaal-cultureel werk",
            "slug": "graduaat-in-het-sociaal-cultureel-werk",
            "academic_year": "2023-24",
            "code": "GRASCW"
        },
        {
            "title": "Graduaat in het transport en de logistiek",
            "slug": "graduaat-in-het-transport-en-de-logistiek",
            "academic_year": "2023-24",
            "code": "GRATRLO"
        },
        {
            "title": "Graduaat in het transport en de logistiek",
            "slug": "graduaat-in-het-transport-en-de-logistiek",
            "academic_year": "2023-24",
            "code": "GRATRLG"
        },
        {
            "title": "Graduaat in de tolk Vlaamse Gebarentaal",
            "slug": "graduaat-in-de-tolk-vlaamse-gebarentaal",
            "academic_year": "2023-24",
            "code": "GRATVG"
        },
        {
            "title": "Bachelor in het bedrijfsmanagement",
            "slug": "bachelor-in-het-bedrijfsmanagement",
            "academic_year": "2023-24",
            "code": "PBABEM"
        },
        {
            "title": "Bachelor in de communicatie",
            "slug": "bachelor-in-de-communicatie",
            "academic_year": "2023-24",
            "code": "PBACOM"
        },
        {
            "title": "Bachelor in de ergotherapie",
            "slug": "bachelor-in-de-ergotherapie",
            "academic_year": "2023-24",
            "code": "PBAERG"
        },
        {
            "title": "Bachelor in de grafische en digitale media",
            "slug": "bachelor-in-de-grafische-en-digitale-media",
            "academic_year": "2023-24",
            "code": "PBAGDM"
        },
        {
            "title": "Bachelor of International Business Management",
            "slug": "bachelor-of-international-business-management",
            "academic_year": "2023-24",
            "code": "PBAIBM"
        },
        {
            "title": "Bachelor of International Communication Management",
            "slug": "bachelor-of-international-communication-management",
            "academic_year": "2023-24",
            "code": "PBAICM"
        },
        {
            "title": "Bachelor of International Graphic and Digital Media",
            "slug": "bachelor-of-international-graphic-and-digital-media",
            "academic_year": "2023-24",
            "code": "PBAIGM"
        },
        {
            "title": "Bachelor of International Journalism",
            "slug": "bachelor-of-international-journalism",
            "academic_year": "2023-24",
            "code": "PBAIJO"
        },
        {
            "title": "Bachelor of International Organisation & Management",
            "slug": "bachelor-of-international-organisation-management",
            "academic_year": "2023-24",
            "code": "PBAIOM"
        },
        {
            "title": "Bachelor in de journalistiek",
            "slug": "bachelor-in-de-journalistiek",
            "academic_year": "2023-24",
            "code": "PBAJOU"
        },
        {
            "title": "Bachelor in de logopedie en de audiologie",
            "slug": "bachelor-in-de-logopedie-en-de-audiologie",
            "academic_year": "2023-24",
            "code": "PBALOA"
        },
        {
            "title": "Bachelor in de mondzorg",
            "slug": "bachelor-in-de-mondzorg",
            "academic_year": "2023-24",
            "code": "PBAMOZ"
        },
        {
            "title": "Bachelor in organisatie & management",
            "slug": "bachelor-in-organisatie-management",
            "academic_year": "2023-24",
            "code": "PBAORM"
        },
        {
            "title": "Educatieve bachelor (Ba) in het kleuteronderwijs",
            "slug": "educatieve-bachelor-ba-in-het-kleuteronderwijs",
            "academic_year": "2023-24",
            "code": "PBAOKO"
        },
        {
            "title": "Educatieve bachelor in het onderwijs: lager onderwijs",
            "slug": "educatieve-bachelor-in-het-onderwijs-lager-onderwijs",
            "academic_year": "2023-24",
            "code": "PBAOLO"
        },
        {
            "title": "Educatieve bachelor in het secundair onderwijs",
            "slug": "educatieve-bachelor-in-het-secundair-onderwijs",
            "academic_year": "2023-24",
            "code": "PBAOSO"
        },
        {
            "title": "Educatieve bachelor in het onderwijs: secundair onderwijs (verkort)",
            "slug": "educatieve-bachelor-in-het-onderwijs-secundair-onderwijs-verkort",
            "academic_year": "2023-24",
            "code": "PBAOSV"
        },
        {
            "title": "Bachelor in de pedagogie van het jonge kind",
            "slug": "bachelor-in-de-pedagogie-van-het-jonge-kind",
            "academic_year": "2023-24",
            "code": "PBAPEK"
        },
        {
            "title": "Bachelor in het sociaal werk",
            "slug": "bachelor-in-het-sociaal-werk",
            "academic_year": "2023-24",
            "code": "PBASPW"
        },
        {
            "title": "Bachelor in de verpleegkunde",
            "slug": "bachelor-in-de-verpleegkunde",
            "academic_year": "2023-24",
            "code": "PBAVPL"
        },
        {
            "title": "Bachelor in de vroedkunde",
            "slug": "bachelor-in-de-vroedkunde",
            "academic_year": "2023-24",
            "code": "PBAVRO"
        },
        {
            "title": "Schakelprogramma in het bedrijfsmanagement",
            "slug": "schakelprogramma-in-het-bedrijfsmanagement",
            "academic_year": "2023-24",
            "code": "SHPBEM"
        },
        {
            "title": "Schakelprogramma in de communicatiewetenschappen",
            "slug": "schakelprogramma-in-de-communicatiewetenschappen",
            "academic_year": "2023-24",
            "code": "SHPBCW"
        },
        {
            "title": "Schakelprogramma in de ergotherapeutische wetenschappen",
            "slug": "schakelprogramma-in-de-ergotherapeutische-wetenschappen",
            "academic_year": "2023-24",
            "code": "SHPBER"
        },
        {
            "title": "Schakelprogramma in de grafische en digitale media",
            "slug": "schakelprogramma-in-de-grafische-en-digitale-media",
            "academic_year": "2023-24",
            "code": "SHPBGM"
        },
        {
            "title": "Schakelprogramma in de journalistiek",
            "slug": "schakelprogramma-in-de-journalistiek",
            "academic_year": "2023-24",
            "code": "SHPBJO"
        },
        {
            "title": "Schakelprogramma in de verpleegkunde en vroedkunde",
            "slug": "schakelprogramma-in-de-verpleegkunde-en-vroedkunde",
            "academic_year": "2023-24",
            "code": "SHPBVV"
        },
        {
            "title": "Postgraduaat dysfagie",
            "slug": "postgraduaat-dysfagie",
            "academic_year": "2023-24",
            "code": "PGRDYS"
        },
        {
            "title": "Postgraduaat Experience Architect",
            "slug": "postgraduaat-experience-architect",
            "academic_year": "2023-24",
            "code": "PGREXA"
        },
        {
            "title": "Postgraduaat Fluency Disorders",
            "slug": "postgraduaat-fluency-disorders",
            "academic_year": "2023-24",
            "code": "PGRFLD"
        },
        {
            "title": "Postgraduaat Freinet",
            "slug": "postgraduaat-freinet",
            "academic_year": "2023-24",
            "code": "PGRFRE"
        },
        {
            "title": "Postgraduaat The Human-Centered Organisation",
            "slug": "postgraduaat-the-human-centered-organisation",
            "academic_year": "2023-24",
            "code": "PGRHCO"
        },
        {
            "title": "Postgraduaat hippotherapie",
            "slug": "postgraduaat-hippotherapie",
            "academic_year": "2023-24",
            "code": "PGRHIP"
        },
        {
            "title": "Postgraduaat HRM",
            "slug": "postgraduaat-hrm",
            "academic_year": "2023-24",
            "code": "PGRHRM"
        },
        {
            "title": "Postgraduaat Inspirerend coachen",
            "slug": "postgraduaat-inspirerend-coachen",
            "academic_year": "2023-24",
            "code": "PGRINC"
        },
        {
            "title": "Postgraduaat Diversiteitssensitief werken, communiceren en leiden",
            "slug": "postgraduaat-diversiteitssensitief-werken-communiceren-en-leiden",
            "academic_year": "2023-24",
            "code": "PGRDIV"
        },
        {
            "title": "Postgraduaat Kaderopleiding hoofdverpleegkundige",
            "slug": "postgraduaat-kaderopleiding-hoofdverpleegkundige",
            "academic_year": "2023-24",
            "code": "PGRKOV"
        },
        {
            "title": "Postgraduaat lactatiekunde",
            "slug": "postgraduaat-lactatiekunde",
            "academic_year": "2023-24",
            "code": "PGRLAC"
        },
        {
            "title": "Postgraduaat Leiden en begeleiden",
            "slug": "postgraduaat-leiden-en-begeleiden",
            "academic_year": "2023-24",
            "code": "PGRLEB"
        },
        {
            "title": "Postgraduaat Levensbeschouwing bij jonge kinderen",
            "slug": "postgraduaat-levensbeschouwing-bij-jonge-kinderen",
            "academic_year": "2023-24",
            "code": "PGRLJK"
        },
        {
            "title": "Postgraduaat Leescoach",
            "slug": "postgraduaat-leescoach",
            "academic_year": "2023-24",
            "code": "PGRLSC"
        },
        {
            "title": "Postgraduaat leerstoornissen",
            "slug": "postgraduaat-leerstoornissen",
            "academic_year": "2023-24",
            "code": "PGRLST"
        },
        {
            "title": "Postgraduaat Mindfulnesstrainer",
            "slug": "postgraduaat-mindfulnesstrainer",
            "academic_year": "2023-24",
            "code": "PGRMTR"
        },
        {
            "title": "Postgraduaat neurogene communicatiestoornissen",
            "slug": "postgraduaat-neurogene-communicatiestoornissen",
            "academic_year": "2023-24",
            "code": "PGRNCS"
        },
        {
            "title": "Postgraduaat neurologische zorg",
            "slug": "postgraduaat-neurologische-zorg",
            "academic_year": "2023-24",
            "code": "PGRNEZ"
        },
        {
            "title": "Postgraduaat Oriënteren op leidinggeven",
            "slug": "postgraduaat-orienteren-op-leidinggeven",
            "academic_year": "2023-24",
            "code": "PGROLG"
        },
        {
            "title": "Postgraduaat Ondernemen met impact",
            "slug": "postgraduaat-ondernemen-met-impact",
            "academic_year": "2023-24",
            "code": "PGROMI"
        },
        {
            "title": "Postgraduaat oncologie",
            "slug": "postgraduaat-oncologie",
            "academic_year": "2023-24",
            "code": "PGRONC"
        },
        {
            "title": "Postgraduaat Palliatieve zorg",
            "slug": "postgraduaat-palliatieve-zorg",
            "academic_year": "2023-24",
            "code": "PGRPAZ"
        },
        {
            "title": "Postgraduaat Podcasting",
            "slug": "postgraduaat-podcasting",
            "academic_year": "2023-24",
            "code": "PGRPDC"
        },
        {
            "title": "Postgraduaat pediatrie en neonatologie",
            "slug": "postgraduaat-pediatrie-en-neonatologie",
            "academic_year": "2023-24",
            "code": "PGRPEN"
        },
        {
            "title": "Postgraduaat Politisering in het sociaal werk",
            "slug": "postgraduaat-politisering-in-het-sociaal-werk",
            "academic_year": "2023-24",
            "code": "PGRPSW"
        },
        {
            "title": "Postgraduaat Rouw- en verliesconsulent",
            "slug": "postgraduaat-rouw-en-verliesconsulent",
            "academic_year": "2023-24",
            "code": "PGRRVC"
        },
        {
            "title": "Postgraduaat School of Branding",
            "slug": "postgraduaat-school-of-branding",
            "academic_year": "2023-24",
            "code": "PGRSOB"
        },
        {
            "title": "Postgraduaat stomatherapie en wondzorg",
            "slug": "postgraduaat-stomatherapie-en-wondzorg",
            "academic_year": "2023-24",
            "code": "PGRSTW"
        },
        {
            "title": "Postgraduaat De vroedvrouw in de eerste lijn",
            "slug": "postgraduaat-de-vroedvrouw-in-de-eerste-lijn",
            "academic_year": "2023-24",
            "code": "PGRVEL"
        },
        {
            "title": "Postgraduaat verpleegkundige in huisartsenpraktijk",
            "slug": "postgraduaat-verpleegkundige-in-huisartsenpraktijk",
            "academic_year": "2023-24",
            "code": "PGRVHP"
        },
        {
            "title": "Postgraduaat Zorgleraar",
            "slug": "postgraduaat-zorgleraar",
            "academic_year": "2023-24",
            "code": "PGRZGL"
        }
    ]
    );
};

export { seed };