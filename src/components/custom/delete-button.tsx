'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';

interface DeleteButtonProps {
  resumeId: number;
  deleteAction: (formData: FormData) => Promise<void>;
}

export function DeleteButton({ resumeId, deleteAction }: DeleteButtonProps) {
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
      className="w-full"
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isConfirming ? 'Confirm Delete' : 'Delete'}
    </Button>
  );
}
