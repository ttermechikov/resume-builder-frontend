import { getResumeListService } from '@/data/services/resume-service';
import { ResumeList } from '@/components/resume/resume-list';
import CreateNewResume from '@/components/resume/create-new-resume';

export default async function DashboardRoute() {
  const resumeList = await getResumeListService();

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Resumes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <ResumeList resumeList={resumeList} />
          <CreateNewResume />
        </div>
      </div>
    </div>
  );
}
