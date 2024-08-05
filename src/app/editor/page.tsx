import ResumeEditor from '@/components/resume/resume-editor';

import type { Resume } from '@/lib/definitions';

export default function ResumeCreator() {
  const resume: Resume = {
    Title: 'A new resume',
    Template: null,
    AuthorId: 0,
    ResumeZone: [
      {
        __component: 'resume.profile',
        Name: '',
        Email: '',
        Phone: '',
        Country: '',
        City: '',
        Website: '',
        Linkedin: '',
        Skype: '',
        WhatsApp: '',
        Telegram: '',
        Specialization: '',
        Summary: '',
      },
    ],
  };

  return (
    <main className="pt-4 bg-gray-100">
      <ResumeEditor resume={resume} />
    </main>
  );
}
