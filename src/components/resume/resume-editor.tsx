'use client';

import React from 'react';
import A4Page from '@/components/resume/resume-page';
import {
  createResumeService,
  editResumeService,
} from '@/data/services/resume-editor-service';
import { useRouter } from 'next/navigation';
import {
  Resume,
  ResumeZoneDynamicComponent,
  ResumeZoneDynamicComponentName,
} from '@/lib/definitions';
import { useMemo, useState, useRef } from 'react';
import { Minus, ChevronUp, ChevronDown, Plus, Pencil } from 'lucide-react';

import ResumeProfileModal from '../modals/profile-modal';
import { Button } from '../ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getFeedbackFromChatGPT } from '@/data/services/chatgpt-service';

import {
  createResumeDynamicComponent,
  generatePDF,
  updateResumeZone,
  mergeResumeData,
  filterResumeZone,
  rearrangeResumeZone,
  getResumeDynamicComponent,
  getMissingDynamicComponents,
  dynamicComponentsNamesMap,
} from '@/lib/helpers';

type ResumeEditorProps = {
  resume: Resume;
};

export default function ResumeEditor({ resume }: ResumeEditorProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [resumeZone, setResumeZone] = useState(() => resume.ResumeZone);
  const router = useRouter();
  const resumeProfile = useMemo(() => {
    return resumeZone.find(
      (dynamicComponent) => dynamicComponent.__component === 'resume.profile',
    );
  }, [resumeZone]);

  const saveResume = async (resume: Partial<Resume>) => {
    if (resume.id) {
      return await editResumeService(resume);
    }

    return await createResumeService(resume).then((res) => {
      if (!res.data?.id) {
        console.error(`Resume create error`, res);
      }
      router.push(`/editor/${res.data.id}`);
    });
  };

  const saveNewResumeZone = async (newResumeZone: Resume['ResumeZone']) => {
    const updatedResume = mergeResumeData(resume, {
      ResumeZone: newResumeZone,
    });

    await saveResume(updatedResume);
    setResumeZone(newResumeZone);
  };

  const handleDynamicComponentChange = async (
    updatedDynamicComponent: ResumeZoneDynamicComponent,
  ) => {
    const updatedResumeZone = updateResumeZone(
      resumeZone,
      updatedDynamicComponent,
    );

    await saveNewResumeZone(updatedResumeZone);
  };

  const removeDynamicComponent = async (
    dynamicComponentName: ResumeZoneDynamicComponentName,
  ) => {
    const updatedResumeZone = filterResumeZone(
      resumeZone,
      dynamicComponentName,
    );

    await saveNewResumeZone(updatedResumeZone);
  };

  const moveDynamicComponent = async (
    dynamicComponentName: ResumeZoneDynamicComponentName,
    direction: 'up' | 'down',
  ) => {
    const updatedResumeZone = rearrangeResumeZone(
      resumeZone,
      dynamicComponentName,
      direction,
    );

    await saveNewResumeZone(updatedResumeZone);
  };

  const addDynamicComponent = async (
    dynamicComponentName: ResumeZoneDynamicComponentName,
  ) => {
    let dynamicComponent = createResumeDynamicComponent(dynamicComponentName);

    if (!dynamicComponent) {
      return console.error('Nothing found to add');
    }

    const updatedResumeZone = [...resumeZone, dynamicComponent];

    await saveNewResumeZone(updatedResumeZone);
  };

  const availableComponentsToAdd = getMissingDynamicComponents(resumeZone);

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
      <div className="flex justify-between items-center mb-8 py-2 min-w-[210mm]">
        <h1 className="text-3xl font-bold">{resume.Title}</h1>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => getFeedbackFromChatGPT(resume)}
            disabled={!resume.id}
            className="hidden px-4 py-2 rounded "
          >
            Get AI Feedback
          </Button>
          <Button
            onClick={() => generatePDF(contentRef.current, resume.Title)}
            disabled={!resume.id}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Generate PDF
          </Button>
        </div>
      </div>
      <A4Page ref={contentRef}>
        {resumeZone.map((componentData, index) => {
          const isFirstComponent = index === 1;
          const isLastComponent = index === resumeZone.length - 1;

          const DynamicComponent = getResumeDynamicComponent(
            componentData.__component,
          );

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
                              moveDynamicComponent(
                                componentData.__component,
                                'up',
                              )
                            }
                          >
                            <ChevronUp size={20} />
                          </button>
                        )}

                        {!isLastComponent && (
                          <button
                            className="p-2 text-white hover:bg-blue-600 transition-colors"
                            onClick={() =>
                              moveDynamicComponent(
                                componentData.__component,
                                'down',
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

                <div className="flex-grow">
                  {React.createElement(DynamicComponent as any, {
                    key: `DynamicZoneComponent-${componentData.id}`,
                    data: componentData,
                    onResumeChange: handleDynamicComponentChange,
                  })}
                </div>
              </div>

              {!isLastComponent && (
                <hr className="my-4 border-t border-gray-300" />
              )}
            </div>
          );
        })}
      </A4Page>
      <ResumeProfileModal
        initialData={{ ...resumeProfile }}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSave={handleDynamicComponentChange}
      />
    </div>
  );
}
