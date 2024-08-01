import Link from 'next/link';

import { deleteResumeAction } from '@/data/actions/resume-actions';
import { Button } from '@/components/ui/button';
import { DeleteButton } from '../custom/delete-button';

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
            className="bg-white border border-gray-200 rounded-lg shadow p-6 h-full"
          >
            <div className="mb-4">
              <h3 className="text-xl font-bold">{resume.attributes.Title}</h3>
              <p className="text-sm text-gray-500">
                Updated: {getFormattedResumeUpdatedDate(resume)}
              </p>
            </div>
            <div className="flex gap-4 mt-auto">
              <Button className="w-full" asChild>
                <Link href={`/editor/${resume.id}`}>Edit</Link>
              </Button>
              <DeleteButton
                resumeId={resume.id}
                deleteAction={deleteResumeWithId}
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
