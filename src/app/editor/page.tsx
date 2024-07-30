import ResumeEditor from '@/components/resume/resume-editor';
import type { Resume } from '@/lib/definitions';

const now = new Date().toUTCString();

const createNewResume = (): Resume => ({
  Title: 'A new resume',
  Template: null,
  AuthorId: 0,
  createdAt: now,
  updatedAt: now,
  publishedAt: now,
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
});

export default function ResumeCreator() {
  const resume = createNewResume();

  return (
    <main className="pt-4 bg-gray-100">
      <ResumeEditor resume={resume} />
    </main>
  );
}
