'use client';

import { useState, useTransition } from 'react';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DeleteButtonProps {
  resumeId: number;
  className?: string;
  deleteAction: (formData: FormData) => Promise<void>;
}

export function DeleteButton({
  resumeId,
  className,
  deleteAction,
}: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDelete = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    setIsConfirming(false);
    const formData = new FormData();
    formData.append('id', String(resumeId));

    startTransition(() => {
      deleteAction(formData);
    });
  };

  return (
    <Button
      className={cn('w-full', className)}
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash2 className="w-4 h-4 mr-2" />
      {isConfirming ? 'Confirm Delete' : 'Delete'}
    </Button>
  );
}
