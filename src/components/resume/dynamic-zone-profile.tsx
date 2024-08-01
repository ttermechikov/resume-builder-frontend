'use client';

import React from 'react';
import Link from 'next/link';

import EditableElement from '../custom/editable-element';

import type {
  ResumeZoneDynamicComponentProps,
  ResumeProfile,
} from '@/lib/definitions';

const Profile = ({
  data,
  onResumeChange,
}: ResumeZoneDynamicComponentProps<ResumeProfile>) => {
  const handleContentChange = async ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    const resumeZoneData = {
      ...data,
      [name]: value,
    };

    onResumeChange(resumeZoneData);
  };

  return (
    <header className="mb-6">
      <h1 className="text-4xl font-bold mb-2 text-center">
        <EditableElement
          name="Name"
          value={data.Name}
          placeholder="Name"
          onValueChange={handleContentChange}
        />
      </h1>
      <div className="text-gray-600 mb-4 text-center">
        <span>
          <EditableElement
            name="Email"
            value={data.Email}
            placeholder="E-mail"
            onValueChange={handleContentChange}
          />
        </span>{' '}
        |{' '}
        <span>
          <EditableElement
            name="Phone"
            value={data.Phone}
            placeholder="Phone number"
            onValueChange={handleContentChange}
          />
        </span>{' '}
        |{' '}
        <EditableElement
          name="City"
          value={data.City}
          placeholder="City"
          onValueChange={handleContentChange}
        />
        ,{' '}
        <EditableElement
          name="Country"
          value={data.Country}
          placeholder="Country"
          onValueChange={handleContentChange}
        />
      </div>
      <div className="flex justify-between items-center border-t border-b py-2">
        <h2 className="text-xl font-semibold">
          <EditableElement
            name="Specialization"
            value={data.Specialization}
            placeholder="Specialization"
            onValueChange={handleContentChange}
          />
        </h2>
        <div className="flex space-x-2">
          {data.Website && (
            <Link
              href={data.Website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0zm6.2 8.98l-1.41 1.41-3.78-3.78v9.88H8.99V6.61l-3.78 3.78L3.8 8.98 10 2.78l6.2 6.2z" />
              </svg>
            </Link>
          )}
          {data.Linkedin && (
            <Link
              href={data.Linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
          )}
          {data.WhatsApp && (
            <Link
              href={data.WhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-600"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </Link>
          )}
          {data.Telegram && (
            <Link
              href={data.Telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.417 15.181l-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693 12.643-7.911c.595-.394 1.136-.176.691.218z" />
              </svg>
            </Link>
          )}
          {data.Skype && (
            <Link
              href={data.Skype}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-400"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.069 18.874c-4.023 0-5.82-1.979-5.82-3.464 0-.765.561-1.296 1.333-1.296 1.723 0 1.273 2.477 4.487 2.477 1.641 0 2.55-.895 2.55-1.811 0-.551-.269-1.16-1.354-1.429l-3.576-.895c-2.88-.724-3.403-2.286-3.403-3.751 0-3.047 2.861-4.191 5.549-4.191 2.471 0 5.393 1.373 5.393 3.199 0 .784-.688 1.24-1.453 1.24-1.469 0-1.198-2.037-4.164-2.037-1.469 0-2.292.664-2.292 1.617s1.153 1.258 2.157 1.487l2.637.587c2.891.649 3.624 2.346 3.624 3.944 0 2.476-1.902 4.324-5.722 4.324m11.084-4.882l-.029.135-.044-.24c.015.045.044.074.059.12.12-.675.181-1.363.181-2.052 0-1.529-.301-3.012-.898-4.42-.569-1.348-1.395-2.562-2.427-3.596-1.049-1.033-2.247-1.856-3.595-2.426-1.318-.631-2.801-.93-4.328-.93-.72 0-1.444.07-2.143.204l.119.06-.239-.033.119-.025C8.91.274 7.829 0 6.731 0c-1.789 0-3.47.698-4.736 1.967C.729 3.235.032 4.923.032 6.716c0 1.143.292 2.265.844 3.258l.02-.124.041.239-.06-.115c-.114.645-.172 1.299-.172 1.955 0 1.53.3 3.017.884 4.416.568 1.362 1.378 2.576 2.427 3.609 1.034 1.05 2.247 1.857 3.595 2.442 1.394.6 2.877.898 4.404.898.659 0 1.334-.06 1.977-.179l-.119-.062.24.046-.135.03c1.002.569 2.126.871 3.294.871 1.783 0 3.459-.69 4.733-1.963 1.259-1.259 1.962-2.951 1.962-4.749 0-1.138-.299-2.262-.853-3.266" />
              </svg>
            </Link>
          )}
        </div>
      </div>
      <div className="mt-4 text-gray-700">
        <EditableElement
          name="Summary"
          value={data.Summary}
          placeholder="This is the executive summary. Write a few brief, concise, and meaningful sentences about yourself from a professional context and your immediate career goals. Make the length appropriate for your needs, but keep it brief and concise."
          className="w-full min-h-fit"
          onValueChange={handleContentChange}
        />
      </div>
    </header>
  );
};

export default Profile;
