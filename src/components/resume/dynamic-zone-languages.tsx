'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

import EditableContent from '../custom/editable-element';

import type {
  ResumeLanguageList,
  ResumeLanguageBlock,
  ResumeZoneDynamicComponentProps,
} from '@/lib/definitions';

const Languages = ({
  data,
  onResumeChange,
}: ResumeZoneDynamicComponentProps<ResumeLanguageList>) => {
  const handleContentChange = ({
    name,
    value,
    index,
  }: {
    name: string;
    value: string;
    index: number;
  }) => {
    const updatedLanguageList = data.Languages.map((lang, ind) =>
      index === ind ? { ...lang, [name]: value } : lang,
    );

    const resumeZoneData = {
      ...data,
      Languages: updatedLanguageList,
    };

    onResumeChange(resumeZoneData);
  };

  const addBlock = () => {
    const newLanguage: ResumeLanguageBlock = {
      Language: '',
      Level: '',
    };
    const updatedLanguageList = [...data.Languages, newLanguage];
    const resumeZoneData = {
      ...data,
      Languages: updatedLanguageList,
    };

    onResumeChange(resumeZoneData);
  };

  const removeLanguage = (index: number) => {
    data.Languages.splice(index, 1);

    const resumeZoneData = {
      ...data,
      Languages: data.Languages,
    };

    onResumeChange(resumeZoneData);
  };

  const isSingleLanguage = data.Languages.length === 1;

  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Languages</h2>
      <div className="space-y-2">
        {data.Languages?.map((languageData, index) => (
          <div
            key={`language-${languageData.id}`}
            className="relative flex items-center group"
          >
            <div className="flex-grow">
              <EditableContent
                name="Language"
                value={languageData.Language}
                placeholder="Language"
                onValueChange={handleContentChange}
                index={index}
                className="text-gray-800"
              />
              <span className="mx-2 text-gray-500">—</span>
              <EditableContent
                name="Level"
                value={languageData.Level}
                placeholder="Level"
                onValueChange={handleContentChange}
                index={index}
                className="text-gray-600"
              />
            </div>
            <div className="hidden group-hover:flex space-x-2 absolute right-0">
              <button
                onClick={addBlock}
                className="p-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-500"
              >
                <Plus size={16} />
              </button>
              {!isSingleLanguage && (
                <button
                  className="p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-500"
                  onClick={() => removeLanguage(index)}
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

export default Languages;
