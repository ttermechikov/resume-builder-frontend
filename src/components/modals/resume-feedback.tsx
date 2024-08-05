import React from 'react';
import ReactMarkdown from 'react-markdown';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface FeedbackModalProps {
  feedback: string;
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackModal({
  feedback,
  isOpen,
  onClose,
}: FeedbackModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI Feedback on Your Resume</DialogTitle>
          <DialogDescription>
            Here&apos;s a detailed review of your resume
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <ReactMarkdown
            components={{
              h3: ({ node, ...props }) => (
                <h3 className="text-lg font-semibold mt-4 mb-2" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="text-sm text-gray-600 mb-2" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5 mb-2" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-5 mb-2" {...props} />
              ),
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            }}
          >
            {feedback}
          </ReactMarkdown>
        </div>
      </DialogContent>
    </Dialog>
  );
}
