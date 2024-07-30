import Link from 'next/link';

export default function CreateNewResume() {
  return (
    <Link
      href="editor"
      className="flex items-center justify-center w-[350px] h-[320px] border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors duration-300"
    >
      <div className="text-center">
        <div className="text-blue-400 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <span className="text-blue-400 font-medium">Create New Resume</span>
      </div>
    </Link>
  );
}
