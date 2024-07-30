'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';

import { deleteResumeByIdService } from '@/data/services/resume-service';

const schemaDeleteResume = z.object({
  id: z.coerce.number(),
});

export async function deleteResumeAction(prevState: any, formData: FormData) {
  const validatedFields = schemaDeleteResume.safeParse({
    id: formData.get('id'),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Login.',
    };
  }

  const responseData = await deleteResumeByIdService(validatedFields.data.id);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'Ops! Something went wrong. Please try again.',
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'Failed to Login.',
    };
  }

  redirect('/dashboard');
}
