'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

import EditableElement from '../custom/editable-element';

import type {
  ResumeExperienceList,
  ResumeExperienceBlock,
  ResumeZoneDynamicComponentProps,
} from '@/lib/definitions';

const Experiences = ({
  data,
  onResumeChange,
}: ResumeZoneDynamicComponentProps<ResumeExperienceList>) => {
  const handleContentChange = ({
    name,
    value,
    index,
  }: {
    name: string;
    value: string;
    index: number;
  }) => {
    const updatedExperiencesList = data.Experiences.map((exp, ind) =>
      ind === index ? { ...exp, [name]: value } : exp,
    );

    const resumeZoneData = {
      ...data,
      Experiences: updatedExperiencesList,
    };

    onResumeChange(resumeZoneData);
  };

  const addBlock = () => {
    const newExperience: ResumeExperienceBlock = {
      Company: '',
      Position: '',
      StartDate: '',
      EndDate: '',
      Description: '',
    };
    const updatedExperiencesList = [...data.Experiences, newExperience];
    const resumeZoneData = {
      ...data,
      Experiences: updatedExperiencesList,
    };

    onResumeChange(resumeZoneData);
  };

  const removeExperience = (index: number) => {
    data.Experiences.splice(index, 1);

    const resumeZoneData = {
      ...data,
      Experiences: data.Experiences,
    };

    onResumeChange(resumeZoneData);
  };

  const isSingleExperience = data.Experiences.length === 1;

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Experience</h2>
      <div className="space-y-4">
        {data.Experiences.map((experienceData, index) => (
          <div
            key={`experience-${experienceData.id}`}
            className="relative group"
          >
            <div className="mb-2">
              <EditableElement
                name="Company"
                value={experienceData.Company}
                placeholder="Company"
                onValueChange={handleContentChange}
                index={index}
                className="text-lg font-semibold text-gray-800"
              />
              <div className="text-gray-600">
                <EditableElement
                  name="Position"
                  value={experienceData.Position}
                  placeholder="Position"
                  onValueChange={handleContentChange}
                  index={index}
                />
                <span className="mx-2">•</span>
                <EditableElement
                  name="StartDate"
                  value={experienceData.StartDate}
                  placeholder="Start Date"
                  onValueChange={handleContentChange}
                  index={index}
                />
                <span className="mx-2">—</span>
                <EditableElement
                  name="EndDate"
                  value={experienceData.EndDate}
                  placeholder="End Date"
                  onValueChange={handleContentChange}
                  index={index}
                />
              </div>
            </div>
            <EditableElement
              name="Description"
              value={experienceData.Description}
              placeholder="Description"
              onValueChange={handleContentChange}
              index={index}
              className="text-gray-700 w-full"
            />
            <div className="hidden group-hover:flex space-x-2 absolute top-0 right-0">
              <button
                onClick={addBlock}
                className="p-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-500"
              >
                <Plus size={16} />
              </button>
              {!isSingleExperience && (
                <button
                  className="p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-500"
                  onClick={() => removeExperience(index)}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experiences;
