export type Resume = {
  id?: number;
  Title: string;
  Template: string | null;
  AuthorId: number;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  ResumeZone: ResumeZoneDynamicComponent[];
};

export type ResumeZoneDynamicComponent =
  | ResumeProfile
  | ResumeLanguageList
  | ResumeExperienceList
  | ResumeEducationList;

export type ResumeZoneDynamicComponentName =
  ResumeZoneDynamicComponent['__component'];

export type ResumeProfile = {
  id?: number;
  __component: 'resume.profile';
  Name: string;
  Email: string;
  Phone: string;
  Country: string;
  City: string;
  Website: string;
  Linkedin: string;
  Skype: string;
  WhatsApp: string;
  Telegram: string;
  Specialization: string;
  Summary: string;
};

export type ResumeLanguageList = {
  id?: number;
  __component: 'resume.language-list';
  Languages: ResumeLanguageBlock[];
};

export type ResumeLanguageBlock = {
  id?: number;
  Language: string;
  Level: string;
};

export type ResumeExperienceList = {
  id?: number;
  __component: 'resume.experience-list';
  Experiences: ResumeExperienceBlock[];
};

export type ResumeExperienceBlock = {
  id?: number;
  Company: string;
  Position: string;
  StartDate: string;
  EndDate: string;
  Description: string;
};

export type ResumeEducationList = {
  id?: number;
  __component: 'resume.education-list';
  Educations: ResumeEducationBlock[];
};

export type ResumeEducationBlock = {
  id?: number;
  School: string;
  Degree: string;
  StartDate: string;
  EndDate: string;
  Description: string;
};

export type ResumeZoneDynamicComponentProps<
  T extends ResumeZoneDynamicComponent,
> = {
  data: T;
  onResumeChange: (dynamicComponent: T) => void;
};

// api responses
export type ResumeResponseData = {
  id: number;
  attributes: Resume;
};

export type GetResumeResponse = {
  data: ResumeResponseData;
};

export type GetResumeListResponse = {
  data: ResumeResponseData[];
};

export type GetHomePageDataResponse = {
  Title: string;
  Descriptions: string;
  Blocks: HeroSectionBlock[];
};

export type HeroSectionBlock = {
  id: number;
  __component: 'layout.hero-section';
  Heading: string;
  SubHeading: string;
  Image: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  Link: {
    Url: string;
    Text: string;
  };
};
