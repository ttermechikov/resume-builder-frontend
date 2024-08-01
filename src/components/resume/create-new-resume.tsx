import Link from 'next/link';

export default function CreateNewResume() {
  return (
    <Link
      href="/editor"
      className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300 p-6"
    >
      <div className="text-center">
        <div className="text-blue-500 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
        <span className="text-gray-600 dark:text-gray-400 font-medium">
          Create New CV
        </span>
      </div>
    </Link>
  );
}
