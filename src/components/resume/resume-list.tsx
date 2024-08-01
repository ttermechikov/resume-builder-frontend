import Link from 'next/link';

import { deleteResumeAction } from '@/data/actions/resume-actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { GetResumeListResponse } from '@/lib/definitions';
import { DeleteButton } from '../custom/delete-button';

export function ResumeList({
  resumeList,
}: {
  resumeList: GetResumeListResponse;
}) {
  if (!resumeList?.data?.length) {
    return null;
  }

  return resumeList.data.map((resume) => {
    const deleteResumeWithId = deleteResumeAction.bind(null, resume.id);

    const dateFormatOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    const updatedAt = new Intl.DateTimeFormat(
      'en-US',
      dateFormatOptions,
    ).format(new Date(resume.attributes.updatedAt!));

    return (
      <Card
        key={`resume-${resume.id}`}
        className="w-[350px] h-[320px] flex flex-col justify-between"
      >
        <CardHeader>
          <CardTitle>{resume.attributes.Title}</CardTitle>
          <CardDescription>
            <span className="text-gray-500 text-opacity-75">
              Updated: {updatedAt}
            </span>
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col w-full gap-3">
          <div className="flex items-center  w-full">
            <Link className="w-full" href={`/editor/${resume.id}`}>
              <Button className="w-full">Edit</Button>
            </Link>
          </div>

          <div className="flex items-center w-full">
            <DeleteButton
              resumeId={resume.id}
              deleteAction={deleteResumeWithId}
            />
          </div>
        </CardFooter>
      </Card>
    );
  });
}
