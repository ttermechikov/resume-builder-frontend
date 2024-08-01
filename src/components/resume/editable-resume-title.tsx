'use client';

import { useRef, useState, useTransition } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Edit, Save, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateResumeTitleAction } from '@/data/actions/resume-actions';

import type { Resume } from '@/lib/definitions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      size="sm"
      className="bg-blue-500 hover:bg-blue-600 text-white"
    >
      {pending ? 'Saving...' : <Save className="w-4 h-4" />}
    </Button>
  );
}

interface EditableResumeTitleProps {
  id: Resume['id'];
  initialTitle: Resume['Title'];
}

export function EditableResumeTitle({
  id,
  initialTitle,
}: EditableResumeTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [state, formAction] = useFormState(updateResumeTitleAction, null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
      setIsEditing(false);
    });
  };

  return (
    <div className="flex items-center h-10 mb-2">
      {isEditing ? (
        <form
          ref={formRef}
          action={handleSubmit}
          className="flex items-center w-full"
        >
          <input type="hidden" name="id" value={id} />
          <Input
            name="Title"
            defaultValue={initialTitle}
            className="mr-2 h-10 flex-grow"
            autoFocus
          />
          <div className="flex space-x-2">
            <SubmitButton />
            <Button
              onClick={() => setIsEditing(false)}
              type="button"
              variant="outline"
              size="sm"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </form>
      ) : (
        <>
          <h3 className="text-xl font-bold text-gray-800 truncate flex-grow">
            {initialTitle}
          </h3>
          <Button
            onClick={() => setIsEditing(true)}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-blue-500"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </>
      )}
    </div>
  );
}
