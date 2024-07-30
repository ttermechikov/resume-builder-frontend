import { notFound } from 'next/navigation';
import { getResumeByIdService } from '@/data/services/resume-service';
import ResumeEditor from '@/components/resume/resume-editor';

export default async function Page({
  params,
}: {
  params: { resumeId: number };
}) {
  const resumeId = params.resumeId;
  const resumeResponse = await getResumeByIdService(resumeId);

  if (!resumeResponse.data?.id) {
    notFound();
  }

  const resume = {
    id: resumeResponse.data.id,
    ...resumeResponse.data.attributes,
  };

  return (
    <main className="pt-4 bg-gray-100">
      <ResumeEditor resume={resume} />
    </main>
  );
}
