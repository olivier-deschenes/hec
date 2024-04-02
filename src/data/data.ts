export const getCourseKey = (course: CourseType) =>
  `${course.prefix}${course.code}`;

export const compateCourseToKey = (course: CourseType, key: string) =>
  getCourseKey(course) === key;

export type CourseType = {
  code: string;
  prefix: string;
  credits: number;
  title: string;
  id: string;
};

export const getMaxCreditsOfCourseBlock = (courseBlock: CourseBlockType) => {
  if ("credits" in courseBlock) {
    return courseBlock.credits;
  }

  return courseBlock.maxCredits;
};

export type CourseBlockType = {
  title: string;
  classes: CourseType[];
  id: string;
} & (
  | { credits: number }
  | {
      minCredits?: number;
      maxCredits: number;
    }
);

export type CourseBlockGroupType = {
  title: string;
  id: string;
  credits?: number;
  courseBlocks: CourseBlockType[];
  optional: boolean;
};

export type ProgramType = {
  title: string;
  courseBlockGroupes: CourseBlockGroupType[];
  id: string;
  resolveClassUrl: (course: CourseType) => string;
  courseCount: number;
  courseCredits: number;
  totalCredits: number;
};

export const OperationsManagementAndLogistics: ProgramType = {
  title:
    "Maîtrise en gestion (M. Sc.) - gestion des opérations et de la logistique",
  resolveClassUrl: (classData) =>
    `https://www.hec.ca/cours/detail/?cours=${classData.prefix}${classData.code}`,
  id: crypto.randomUUID(),
  courseCount: 12,
  courseCredits: 36,
  totalCredits: 45,
  courseBlockGroupes: [
    {
      title: "Bloc de cours obligatoires",
      id: crypto.randomUUID(),
      credits: 21,
      optional: false,
      courseBlocks: [
        {
          title: "Cours obligatoires de la spécialisation",
          credits: 9,
          id: crypto.randomUUID(),
          classes: [
            {
              code: "60515",
              prefix: "OPER",
              credits: 3,
              title: "	Chaîne logistique : fondements et tendances",
              id: crypto.randomUUID(),
            },
            {
              code: "60520",
              prefix: "OPER",
              credits: 3,
              title: "Planification et contrôle de systèmes logistiques",
              id: crypto.randomUUID(),
            },
            {
              code: "60521",
              prefix: "OPER",
              credits: 3,
              title: "Stratégie des opérations et amélioration des processus",
              id: crypto.randomUUID(),
            },
          ],
        },
        {
          title: "Cours obligatoire de méthodologie",
          credits: 6,
          id: crypto.randomUUID(),

          classes: [
            {
              code: "60302",
              credits: 3,
              prefix: "METH",
              title: "Recherche et intervention en gestion",
              id: crypto.randomUUID(),
            },
            {
              code: "60302",
              credits: 3,
              prefix: "OPER",
              title: "Outils d'aide à la décision en gestion des opérations",
              id: crypto.randomUUID(),
            },
          ],
        },
        {
          title: "Cours obligatoire du programme",
          credits: 3,
          id: crypto.randomUUID(),

          classes: [
            {
              code: "60401",
              credits: 3,
              prefix: "GEST",
              title: "Regards croisés sur l'entreprise",
              id: crypto.randomUUID(),
            },
          ],
        },
      ],
    },
    {
      title: "Cours à option de la spécialisation",
      credits: 15,
      id: crypto.randomUUID(),
      optional: true,
      courseBlocks: [
        {
          title: "Bloc 1",
          minCredits: 6,
          maxCredits: 9,
          id: crypto.randomUUID(),

          classes: [
            {
              code: "60403",
              prefix: "MNGT",
              credits: 3,
              title: "Méthodes d'intervention en développement organisationnel",
              id: crypto.randomUUID(),
            },
            {
              code: "60415",
              credits: 3,
              prefix: "MNGT",
              title: "La consultation en gestion",
              id: crypto.randomUUID(),
            },
            {
              code: "60500",
              credits: 3,
              prefix: "OPER",
              title: "Analytique de la chaîne logistique",
              id: crypto.randomUUID(),
            },
            {
              code: "60512",
              credits: 3,
              prefix: "OPER",
              title: "Conception et analyse des systèmes opérationnels",
              id: crypto.randomUUID(),
            },
          ],
        },
        {
          title: "Bloc 2",
          minCredits: 6,
          maxCredits: 9,
          id: crypto.randomUUID(),

          classes: [
            {
              code: "60501",
              credits: 3,
              prefix: "OPER",
              title: "Gestion des systèmes d'entreposage",
              id: crypto.randomUUID(),
            },
            {
              code: "60502",
              credits: 3,
              prefix: "OPER",
              title: "Systèmes de transport",
              id: crypto.randomUUID(),
            },
            {
              code: "60503",
              credits: 3,
              prefix: "OPER",
              title: "Chaîne d'approvisionnement durable",
              id: crypto.randomUUID(),
            },
            {
              code: "60505",
              credits: 3,
              prefix: "OPER",
              title: "Gestion des opérations dans les entreprises de services",
              id: crypto.randomUUID(),
            },
            {
              code: "60530",
              credits: 3,
              prefix: "OPER",
              title: "Stratégie d'approvisionnement",
              id: crypto.randomUUID(),
            },
          ],
        },
        {
          title: "Bloc 3",
          maxCredits: 3,
          id: crypto.randomUUID(),
          classes: [
            {
              code: "60016",
              credits: 3,
              prefix: "INTE",
              title: "Gestion des réseaux d'affaires internationaux",
              id: crypto.randomUUID(),
            },
            {
              code: "60018",
              credits: 3,
              prefix: "METH",
              title: "Exploitation et exploration des données géospatiales",
              id: crypto.randomUUID(),
            },
            {
              code: "60766",
              credits: 3,
              prefix: "TECH",
              title:
                "Progiciels de gestion de la relation client (CRM): enjeux technologiques et méthodologiques",
              id: crypto.randomUUID(),
            },
            {
              code: "60767",
              credits: 3,
              prefix: "TECH",
              title:
                "Progiciels de gestion intégrés (ERP): enjeux technologiques et méthodologiques",
              id: crypto.randomUUID(),
            },
          ],
        },
      ],
    },
    {
      title: "Activités",
      credits: 9,
      id: crypto.randomUUID(),
      optional: false,
      courseBlocks: [
        {
          title: "Activité obligatoire",
          credits: 9,
          id: crypto.randomUUID(),
          classes: [
            {
              code: "66200",
              credits: 0,
              prefix: "ETHI",
              title:
                "La conduite responsable de la recherche : des normes à la pratique",
              id: crypto.randomUUID(),
            },
            {
              code: "66202",
              credits: 9,
              prefix: "INDV",
              title: "Projet supervisé",
              id: crypto.randomUUID(),
            },
          ],
        },
        {
          title: "Activités fortement recommandées",
          id: crypto.randomUUID(),
          credits: 0,
          classes: [
            {
              code: "66219",
              credits: 0,
              prefix: "ATEL",
              id: crypto.randomUUID(),
              title: "Formation documentaire",
            },
            {
              code: "66242",
              credits: 0,
              prefix: "ATEL",
              id: crypto.randomUUID(),
              title: "Comment citer ses sources",
            },
          ],
        },
      ],
    },
  ],
};
