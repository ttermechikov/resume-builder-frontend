'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

import EditableContent from '../custom/editable-element';

import type {
  ResumeEducationList,
  ResumeEducationBlock,
  ResumeZoneDynamicComponentProps,
} from '@/lib/definitions';

const Educations = ({
  data,
  onResumeChange,
}: ResumeZoneDynamicComponentProps<ResumeEducationList>) => {
  const handleContentChange = ({
    name,
    value,
    index,
  }: {
    name: string;
    value: string;
    index: number;
  }) => {
    const updatedEducationsList = data.Educations.map((education, ind) =>
      ind === index ? { ...education, [name]: value } : education,
    );

    const resumeZoneData = {
      ...data,
      Educations: updatedEducationsList,
    };

    onResumeChange(resumeZoneData);
  };

  const addBlock = () => {
    const newExperience: ResumeEducationBlock = {
      School: '',
      Degree: '',
      StartDate: '',
      EndDate: '',
      Description: '',
    };
    const updatedEducationsList = [...data.Educations, newExperience];
    const resumeZoneData = {
      ...data,
      Educations: updatedEducationsList,
    };

    onResumeChange(resumeZoneData);
  };

  const removeExperience = (index: number) => {
    data.Educations.splice(index, 1);

    const resumeZoneData = {
      ...data,
      Educations: data.Educations,
    };

    onResumeChange(resumeZoneData);
  };

  const isSingleExperience = data.Educations.length === 1;

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Educations</h2>
      <div className="space-y-4">
        {data.Educations?.map((experienceData, index) => (
          <div
            key={`experience-${experienceData.id}`}
            className="relative group"
          >
            <div className="mb-2">
              <EditableContent
                name="School"
                value={experienceData.School}
                placeholder="School"
                onValueChange={handleContentChange}
                index={index}
                className="text-lg font-semibold text-gray-800"
              />
              <div className="text-gray-600">
                <EditableContent
                  name="Degree"
                  value={experienceData.Degree}
                  placeholder="Degree"
                  onValueChange={handleContentChange}
                  index={index}
                />
                <span className="mx-2">•</span>
                <EditableContent
                  name="StartDate"
                  value={experienceData.StartDate}
                  placeholder="Start Date"
                  onValueChange={handleContentChange}
                  index={index}
                />
                <span className="mx-2">—</span>
                <EditableContent
                  name="EndDate"
                  value={experienceData.EndDate}
                  placeholder="End Date"
                  onValueChange={handleContentChange}
                  index={index}
                />
              </div>
            </div>
            <EditableContent
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

export default Educations;
