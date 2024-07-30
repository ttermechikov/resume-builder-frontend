import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import type { ResumeProfile } from '@/lib/definitions';

type ResumeProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ResumeProfile) => void;
  initialData?: Partial<ResumeProfile>;
};

export default function ResumeProfileModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: ResumeProfileModalProps) {
  const { register, handleSubmit, reset } = useForm<ResumeProfile>();

  useEffect(() => {
    if (isOpen && initialData) {
      reset(initialData);
    }
  }, [isOpen, initialData, reset]);

  const onSubmit = (data: ResumeProfile) => {
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Resume Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Linkedin" className="text-right">
              Linkedin
            </Label>
            <Input
              id="Linkedin"
              className="col-span-3"
              {...register('Linkedin')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Skype" className="text-right">
              Skype
            </Label>
            <Input id="Skype" className="col-span-3" {...register('Skype')} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Telegram" className="text-right">
              Telegram
            </Label>
            <Input
              id="Telegram"
              className="col-span-3"
              {...register('Telegram')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Website" className="text-right">
              Website
            </Label>
            <Input
              id="Website"
              className="col-span-3"
              {...register('Website')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="WhatsApp" className="text-right">
              WhatsApp
            </Label>
            <Input
              id="WhatsApp"
              className="col-span-3"
              {...register('WhatsApp')}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              className="bg-transparent text-blue-500 hover:bg-blue-100"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
