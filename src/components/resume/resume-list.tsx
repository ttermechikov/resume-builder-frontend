import Link from 'next/link';
import { Edit } from 'lucide-react';

import { deleteResumeAction } from '@/data/actions/resume-actions';
import { Button } from '@/components/ui/button';
import { DeleteButton } from '../custom/delete-button';
import { EditableResumeTitle } from './editable-resume-title';

import type {
  GetResumeListResponse,
  ResumeResponseData,
} from '@/lib/definitions';

type ResumeListProps = {
  resumeList: GetResumeListResponse;
};

export function ResumeList({ resumeList }: ResumeListProps) {
  if (!resumeList?.data?.length) {
    return null;
  }

  return (
    <>
      {resumeList.data.map((resume) => {
        const deleteResumeWithId = deleteResumeAction.bind(null, resume.id);

        return (
          <div
            key={`resume-${resume.id}`}
            className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between transition-all hover:shadow-md h-full"
          >
            <div>
              <EditableResumeTitle
                id={resume.id}
                initialTitle={resume.attributes.Title}
              />
              <p className="text-sm text-gray-500 mb-4">
                Updated: {getFormattedResumeUpdatedDate(resume)}
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                className="flex-1 bg-blue-500 hover:bg-blue-600 transition-colors"
                asChild
              >
                <Link href={`/editor/${resume.id}`}>
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </Link>
              </Button>
              <DeleteButton
                resumeId={resume.id}
                deleteAction={deleteResumeWithId}
                className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

const getFormattedResumeUpdatedDate = (resume: ResumeResponseData) => {
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  const updatedAt = new Intl.DateTimeFormat('en-US', dateFormatOptions).format(
    new Date(resume.attributes.updatedAt!),
  );

  return updatedAt;
};
