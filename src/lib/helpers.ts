// @ts-ignore
import html2pdf from 'html2pdf.js';

import Profile from '@/components/resume/dynamic-zone-profile';
import Experiences from '@/components/resume/dynamic-zone-experiences';
import Educations from '@/components/resume/dynamic-zone-educations';
import Languages from '@/components/resume/dynamic-zone-languages';

import type {
  Resume,
  ResumeEducationList,
  ResumeExperienceList,
  ResumeLanguageList,
  ResumeZoneDynamicComponent,
  ResumeZoneDynamicComponentName,
} from './definitions';

export const generatePDF = (
  element: HTMLDivElement | null,
  resumeTitle?: string,
) => {
  if (!element) return;

  const opt = {
    margin: [-6, 0],
    padding: 0,
    filename: `${resumeTitle || 'resume'}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  try {
    html2pdf().from(element).set(opt).save();
  } catch (e) {
    console.error('Print error', e);
  }
};

export const createEducationList = (): ResumeEducationList => ({
  __component: 'resume.education-list',
  Educations: [
    {
      School: '',
      Degree: '',
      StartDate: '',
      EndDate: '',
      Description: '',
    },
  ],
});

export const createExperienceList = (): ResumeExperienceList => ({
  __component: 'resume.experience-list',
  Experiences: [
    {
      Company: '',
      Position: '',
      StartDate: '',
      EndDate: '',
      Description: '',
    },
  ],
});

export const createLanguageList = (): ResumeLanguageList => ({
  __component: 'resume.language-list',
  Languages: [
    {
      Language: '',
      Level: '',
    },
  ],
});

export const createResumeDynamicComponent = (
  dynamicComponentName: ResumeZoneDynamicComponentName,
) => {
  if (dynamicComponentName === 'resume.education-list') {
    return createEducationList();
  } else if (dynamicComponentName === 'resume.experience-list') {
    return createExperienceList();
  } else if (dynamicComponentName === 'resume.language-list') {
    return createLanguageList();
  }
};

export const updateResumeZone = (
  resumeZone: Resume['ResumeZone'],
  updatedDynamicComponent: ResumeZoneDynamicComponent,
) => {
  return resumeZone.map((dynamicComponent) => {
    if (dynamicComponent.__component === updatedDynamicComponent.__component) {
      return updatedDynamicComponent;
    }

    return dynamicComponent;
  });
};

export const filterResumeZone = (
  resumeZone: Resume['ResumeZone'],
  dynamicComponentName: ResumeZoneDynamicComponentName,
) => {
  return resumeZone.filter((dynamicComponent) => {
    return dynamicComponent.__component !== dynamicComponentName;
  });
};

export const rearrangeResumeZone = (
  resumeZone: Resume['ResumeZone'],
  dynamicComponentName: ResumeZoneDynamicComponentName,
  direction: 'up' | 'down',
) => {
  const componentIndex = resumeZone.findIndex(
    (dynamicComponent) => dynamicComponent.__component === dynamicComponentName,
  );

  if (componentIndex === -1) {
    console.error(
      `rearrangeResumeZone error: Component ${dynamicComponentName} not found in resumeZone`,
    );
    return resumeZone;
  }

  const newIndex = direction === 'up' ? componentIndex - 1 : componentIndex + 1;

  // Create a new array with the moved component
  const newResumeZone = [...resumeZone];
  const [movedComponent] = newResumeZone.splice(componentIndex, 1);
  newResumeZone.splice(newIndex, 0, movedComponent);

  return newResumeZone;
};

export const mergeResumeData = (
  resume: Resume,
  resumeOverrides: Partial<Resume>,
) => {
  return { ...resume, ...resumeOverrides };
};

export const getResumeDynamicComponent = (
  dynamicComponentName: ResumeZoneDynamicComponentName,
) => {
  if (dynamicComponentName === 'resume.profile') {
    return Profile;
  } else if (dynamicComponentName === 'resume.language-list') {
    return Languages;
  } else if (dynamicComponentName === 'resume.experience-list') {
    return Experiences;
  } else if (dynamicComponentName === 'resume.education-list') {
    return Educations;
  }

  return null;
};

export const dynamicComponentsNamesMap: Record<
  ResumeZoneDynamicComponentName,
  string
> = {
  'resume.profile': 'Profile',
  'resume.language-list': 'Languages',
  'resume.experience-list': 'Experience',
  'resume.education-list': 'Education',
};

const dynamicComponents = Object.keys(dynamicComponentsNamesMap);

export const getMissingDynamicComponents = (
  resumeZone: Resume['ResumeZone'],
) => {
  return dynamicComponents.filter(
    (componentName) =>
      !resumeZone.some(
        (usedDynamicComponent) =>
          usedDynamicComponent.__component === componentName,
      ),
  );
};
