import { v4 } from "uuid";

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
  done?: boolean;
};

export const getMaxCreditsOfCourseBlock = (courseBlock: CourseBlockType) => {
  if ("credits" in courseBlock) {
    return courseBlock.credits;
  }

  return courseBlock.maxCredits;
};

export const getDoneCreditsOfCourseBlock = (courseBlock: CourseBlockType) => {
  return courseBlock.classes.reduce((acc, course) => {
    if (course.done) {
      return acc + course.credits;
    }

    return acc;
  }, 0);
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
  id: v4(),
  courseCount: 12,
  courseCredits: 36,
  totalCredits: 45,
  courseBlockGroupes: [
    {
      title: "Bloc de cours préalables",
      id: v4(),
      credits: 3,
      optional: false,
      courseBlocks: [
        {
          title: "Cours préalables",
          credits: 3,
          id: v4(),
          classes: [
            {
              code: "20525",
              prefix: "OPER",
              credits: 3,
              title: "Logistique",
              id: v4(),
              done: true,
            },
          ],
        },
      ],
    },
    {
      title: "Bloc de cours obligatoires",
      id: v4(),
      credits: 21,
      optional: false,
      courseBlocks: [
        {
          title: "Cours obligatoires de la spécialisation",
          credits: 9,
          id: v4(),
          classes: [
            {
              code: "60515",
              prefix: "OPER",
              credits: 3,
              title: "	Chaîne logistique : fondements et tendances",
              id: v4(),
            },
            {
              code: "60520",
              prefix: "OPER",
              credits: 3,
              title: "Planification et contrôle de systèmes logistiques",
              id: v4(),
            },
            {
              code: "60521",
              prefix: "OPER",
              credits: 3,
              title: "Stratégie des opérations et amélioration des processus",
              id: v4(),
              done: true,
            },
          ],
        },
        {
          title: "Cours obligatoire de méthodologie",
          credits: 6,
          id: v4(),

          classes: [
            {
              code: "60302",
              credits: 3,
              prefix: "METH",
              title: "Recherche et intervention en gestion",
              id: v4(),
            },
            {
              code: "60550",
              credits: 3,
              prefix: "OPER",
              title: "Outils d'aide à la décision en gestion des opérations",
              id: v4(),
            },
          ],
        },
        {
          title: "Cours obligatoire du programme",
          credits: 3,
          id: v4(),

          classes: [
            {
              code: "60401",
              credits: 3,
              prefix: "GEST",
              title: "Regards croisés sur l'entreprise",
              id: v4(),
              done: true,
            },
          ],
        },
      ],
    },
    {
      title: "Cours à option de la spécialisation",
      credits: 15,
      id: v4(),
      optional: true,
      courseBlocks: [
        {
          title: "Bloc 1",
          minCredits: 6,
          maxCredits: 9,
          id: v4(),

          classes: [
            {
              code: "60403",
              prefix: "MNGT",
              credits: 3,
              title: "Méthodes d'intervention en développement organisationnel",
              id: v4(),
            },
            {
              code: "60415",
              credits: 3,
              prefix: "MNGT",
              title: "La consultation en gestion",
              id: v4(),
              done: true,
            },
            {
              code: "60500",
              credits: 3,
              prefix: "OPER",
              title: "Analytique de la chaîne logistique",
              id: v4(),
            },
            {
              code: "60512",
              credits: 3,
              prefix: "OPER",
              title: "Conception et analyse des systèmes opérationnels",
              id: v4(),
            },
          ],
        },
        {
          title: "Bloc 2",
          minCredits: 6,
          maxCredits: 9,
          id: v4(),

          classes: [
            {
              code: "60501",
              credits: 3,
              prefix: "OPER",
              title: "Gestion des systèmes d'entreposage",
              id: v4(),
            },
            {
              code: "60502",
              credits: 3,
              prefix: "OPER",
              title: "Systèmes de transport",
              id: v4(),
              done: true,
            },
            {
              code: "60503",
              credits: 3,
              prefix: "OPER",
              title: "Chaîne d'approvisionnement durable",
              id: v4(),
            },
            {
              code: "60505",
              credits: 3,
              prefix: "OPER",
              title: "Gestion des opérations dans les entreprises de services",
              id: v4(),
            },
            {
              code: "60530",
              credits: 3,
              prefix: "OPER",
              title: "Stratégie d'approvisionnement",
              id: v4(),
            },
          ],
        },
        {
          title: "Bloc 3",
          maxCredits: 3,
          id: v4(),
          classes: [
            {
              code: "60016",
              credits: 3,
              prefix: "INTE",
              title: "Gestion des réseaux d'affaires internationaux",
              id: v4(),
            },
            {
              code: "60018",
              credits: 3,
              prefix: "METH",
              title: "Exploitation et exploration des données géospatiales",
              id: v4(),
            },
            {
              code: "60766",
              credits: 3,
              prefix: "TECH",
              title:
                "Progiciels de gestion de la relation client (CRM): enjeux technologiques et méthodologiques",
              id: v4(),
            },
            {
              code: "60767",
              credits: 3,
              prefix: "TECH",
              title:
                "Progiciels de gestion intégrés (ERP): enjeux technologiques et méthodologiques",
              id: v4(),
            },
          ],
        },
      ],
    },
    {
      title: "Activités",
      credits: 9,
      id: v4(),
      optional: false,
      courseBlocks: [
        {
          title: "Activité obligatoire",
          credits: 9,
          id: v4(),
          classes: [
            {
              code: "66200",
              credits: 0,
              prefix: "ETHI",
              title:
                "La conduite responsable de la recherche : des normes à la pratique",
              id: v4(),
            },
            {
              code: "66202",
              credits: 9,
              prefix: "INDV",
              title: "Projet supervisé",
              id: v4(),
            },
          ],
        },
        {
          title: "Activités fortement recommandées",
          id: v4(),
          credits: 0,
          classes: [
            {
              code: "66219",
              credits: 0,
              prefix: "ATEL",
              id: v4(),
              title: "Formation documentaire",
            },
            {
              code: "66242",
              credits: 0,
              prefix: "ATEL",
              id: v4(),
              title: "Comment citer ses sources",
            },
          ],
        },
      ],
    },
  ],
};
