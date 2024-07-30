import { getResumeListService } from '@/data/services/resume-service';
import { ResumeList } from '@/components/resume/resume-list';
import CreateNewResume from '@/components/resume/create-new-resume';

export default async function DashboardRoute() {
  const resumeList = await getResumeListService();

  return (
    <div className="flex flex-wrap justify-normal items-center gap-4 p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
      <ResumeList resumeList={resumeList} />
      <CreateNewResume />
    </div>
  );
}
