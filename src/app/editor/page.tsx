import ResumeEditor from '@/components/resume/resume-editor';
import { createNewResume } from '@/lib/helpers';

export default function ResumeCreator() {
  const resume = createNewResume();

  return (
    <main className="pt-4 bg-gray-100">
      <ResumeEditor resume={resume} />
    </main>
  );
}
