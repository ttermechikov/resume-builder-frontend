import { getResumeListService } from '@/data/services/resume-service';
import { ResumeList } from '@/components/resume/resume-list';
import CreateNewResume from '@/components/resume/create-new-resume';

export default async function DashboardRoute() {
  const resumeList = await getResumeListService();

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Resumes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ResumeList resumeList={resumeList} />
          <CreateNewResume />
        </div>
      </div>
    </div>
  );
}
