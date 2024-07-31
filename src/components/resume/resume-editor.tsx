'use client';

import EditableInput from '@/components/custom/editable-element';
import A4Page from '@/components/resume/resume-page';
import {
  createResumeService,
  editResumeService,
} from '@/data/services/resume-editor-service';
import Profile from '@/components/resume/dynamic-zone-profile';
import { useRouter } from 'next/navigation';
import Languages from './dynamic-zone-languages';
import {
  Resume,
  ResumeProfile,
  ResumeZoneDynamicComponent,
  ResumeZoneDynamicComponentName,
} from '@/lib/definitions';
import { useMemo, useState, useRef } from 'react';
import Experiences from './dynamic-zone-experiences';
import Educations from './dynamic-zone-educations';
import { Minus, ChevronUp, ChevronDown, Plus, Pencil } from 'lucide-react';

import ResumeProfileModal from '../modals/profile-modal';

// @ts-ignore
import html2pdf from 'html2pdf.js';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type ResumeEditorProps = {
  resume: Resume;
};

export default function ResumeEditor({ resume }: ResumeEditorProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [resumeZone, setResumeZone] = useState(() => resume.ResumeZone);
  const resumeProfile = useMemo(() => {
    return resumeZone.find(
      (dynamicComponent) => dynamicComponent.__component === 'resume.profile',
    );
  }, [resumeZone]);
  const router = useRouter();

  const generatePDF = () => {
    if (!contentRef.current) return;

    const opt = {
      margin: [-6, 0],
      padding: 0,
      filename: `${resume.Title || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    try {
      html2pdf().from(contentRef.current).set(opt).save();
    } catch (e) {
      console.error('Print error', e);
    }
  };

  const updateResume = async (resume: Partial<Resume>) => {
    if (resume.id) {
      const res = await editResumeService(resume);

      if (res.data.id === resume.id) {
        return Promise.resolve();
      }
    } else {
      const res = await createResumeService(resume);

      router.push(`/editor/${res.data.id}`);
    }
  };

  const handleDynamicComponentChange = async (
    updatedDynamicComponent: ResumeZoneDynamicComponent,
  ) => {
    const updatedResumeZone = resumeZone.map((dynamicComponent) => {
      if (dynamicComponent.id === updatedDynamicComponent.id) {
        return updatedDynamicComponent;
      }

      return dynamicComponent;
    });

    const updatedResume: Partial<Resume> = {
      id: resume.id,
      ResumeZone: updatedResumeZone,
    };

    await updateResume(updatedResume);
    setResumeZone(updatedResumeZone);
  };

  const removeDynamicComponent = async (
    componentName: ResumeZoneDynamicComponentName,
  ) => {
    const updatedResumeZone = resumeZone.filter(
      (dynamicComponent) => dynamicComponent.__component !== componentName,
    );

    const updatedResume: Partial<Resume> = {
      id: resume.id,
      ResumeZone: updatedResumeZone,
    };

    await updateResume(updatedResume);
    setResumeZone(updatedResumeZone);
  };

  const moveDynamicComponent = (
    componentName: ResumeZoneDynamicComponentName,
    direction: 'up' | 'down',
  ) => {
    const componentIndex = resumeZone.findIndex(
      (dynamicComponent) => dynamicComponent.__component === componentName,
    );

    if (componentIndex === -1) {
      console.error(`Component ${componentName} not found in resumeZone`);
      return;
    }

    const newIndex =
      direction === 'up' ? componentIndex - 1 : componentIndex + 1;

    // Create a new array with the moved component
    const newResumeZone = [...resumeZone];
    const [movedComponent] = newResumeZone.splice(componentIndex, 1);
    newResumeZone.splice(newIndex, 0, movedComponent);

    updateResume({ ...resume, ResumeZone: newResumeZone });

    setResumeZone(newResumeZone);
  };

  const moveDynamicComponentUp = (
    componentName: ResumeZoneDynamicComponentName,
  ) => moveDynamicComponent(componentName, 'up');

  const moveDynamicComponentDown = (
    componentName: ResumeZoneDynamicComponentName,
  ) => moveDynamicComponent(componentName, 'down');

  const handleTitleChange = ({ value }: { value: string }) => {
    const updatedResume: Partial<Resume> = {
      id: resume.id,
      Title: value,
    };

    updateResume(updatedResume);
  };

  const dynamicComponentsMap = {
    'resume.profile': Profile,
    'resume.language-list': Languages,
    'resume.experience-list': Experiences,
    'resume.education-list': Educations,
  };

  const dynamicComponentsNamesMap: Record<
    ResumeZoneDynamicComponentName,
    string
  > = {
    'resume.profile': 'Profile',
    'resume.language-list': 'Languages',
    'resume.experience-list': 'Experience',
    'resume.education-list': 'Education',
  };

  const dynamicComponents = Object.keys(dynamicComponentsMap);

  const availableComponentsToAdd = dynamicComponents.filter(
    (componentName) =>
      !resumeZone.some(
        (usedDynamicComponent) =>
          usedDynamicComponent.__component === componentName,
      ),
  );

  const addDynamicComponent = (
    dynamicComponentName: ResumeZoneDynamicComponentName,
  ) => {
    let dynamicComponent!: ResumeZoneDynamicComponent;

    if (dynamicComponentName === 'resume.education-list') {
      dynamicComponent = {
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
      };
    } else if (dynamicComponentName === 'resume.experience-list') {
      dynamicComponent = {
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
      };
    } else if (dynamicComponentName === 'resume.language-list') {
      dynamicComponent = {
        __component: 'resume.language-list',
        Languages: [
          {
            Language: '',
            Level: '',
          },
        ],
      };
    }

    if (!dynamicComponent) {
      return console.error('Nothing found to add');
    }

    setResumeZone([...resumeZone, dynamicComponent]);
  };

  const handleResumeProfileSave = async (data: ResumeProfile) => {
    handleDynamicComponentChange(data);
  };

  const renderNewComponentAddBlock = () => {
    return availableComponentsToAdd.length ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 text-white bg-blue-500 hover:bg-blue-600 transition-colors">
            <Plus size={20} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {availableComponentsToAdd.map((dynamicComponentName) => (
            <DropdownMenuItem
              key={dynamicComponentName}
              onClick={() =>
                addDynamicComponent(
                  dynamicComponentName as ResumeZoneDynamicComponentName,
                )
              }
            >
              {
                dynamicComponentsNamesMap[
                  dynamicComponentName as ResumeZoneDynamicComponentName
                ]
              }
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    ) : null;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between mb-8 min-w-[210mm]">
        <EditableInput
          name="Title"
          placeholder="Resume Title"
          value={resume.Title}
          className="text-3xl font-bold"
          onValueChange={handleTitleChange}
        />
        <div>
          <button
            onClick={generatePDF}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Generate PDF
          </button>
        </div>
      </div>
      <A4Page ref={contentRef}>
        {resumeZone.map((componentData, index) => {
          const isFirstComponent = index === 1;
          const isLastComponent = index === resumeZone.length - 1;

          let component = null;

          if (componentData.__component === 'resume.profile') {
            component = (
              <Profile
                key={`DynamicZoneComponent-${componentData.id}`}
                data={componentData}
                onResumeChange={handleDynamicComponentChange}
              />
            );
          } else if (componentData.__component === 'resume.language-list') {
            component = (
              <Languages
                key={`DynamicZoneComponent-${componentData.id}`}
                data={componentData}
                onResumeChange={handleDynamicComponentChange}
              />
            );
          } else if (componentData.__component === 'resume.experience-list') {
            component = (
              <Experiences
                key={`DynamicZoneComponent-${componentData.id}`}
                data={componentData}
                onResumeChange={handleDynamicComponentChange}
              />
            );
          } else if (componentData.__component === 'resume.education-list') {
            component = (
              <Educations
                key={`DynamicZoneComponent-${componentData.id}`}
                data={componentData}
                onResumeChange={handleDynamicComponentChange}
              />
            );
          }

          return (
            <div key={componentData.id} className="relative group/component">
              <div className="flex">
                <div className="absolute -left-10 top-0 h-full flex items-center">
                  <div className="flex flex-col bg-blue-500 rounded-full overflow-hidden invisible group-hover/component:visible transition-all duration-200 ease-in-out">
                    {componentData.__component === 'resume.profile' ? (
                      <>
                        <button
                          onClick={() => setIsProfileModalOpen(true)}
                          className="p-2 text-white hover:bg-blue-600 transition-colors"
                        >
                          <Pencil size={20} />
                        </button>
                        {renderNewComponentAddBlock()}
                      </>
                    ) : (
                      <>
                        {renderNewComponentAddBlock()}
                        {!isFirstComponent && (
                          <button
                            className="p-2 text-white hover:bg-blue-600 transition-colors"
                            onClick={() =>
                              moveDynamicComponentUp(componentData.__component)
                            }
                          >
                            <ChevronUp size={20} />
                          </button>
                        )}

                        {!isLastComponent && (
                          <button
                            className="p-2 text-white hover:bg-blue-600 transition-colors"
                            onClick={() =>
                              moveDynamicComponentDown(
                                componentData.__component,
                              )
                            }
                          >
                            <ChevronDown size={20} />
                          </button>
                        )}

                        <button
                          className="p-2 text-white bg-red-500 hover:bg-red-600 transition-colors"
                          onClick={() =>
                            removeDynamicComponent(componentData.__component)
                          }
                        >
                          <Minus size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex-grow">{component}</div>
              </div>

              {!isLastComponent && (
                <hr className="my-6 border-t border-gray-300" />
              )}
            </div>
          );
        })}
      </A4Page>
      <ResumeProfileModal
        initialData={{ ...resumeProfile }}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSave={handleResumeProfileSave}
      />
    </div>
  );
}
