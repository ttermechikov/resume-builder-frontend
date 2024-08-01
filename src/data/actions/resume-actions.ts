'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  deleteResumeByIdService,
  updateResumeTitleByIdService,
} from '@/data/services/resume-service';

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

const schemaUpdateResumeTitle = z.object({
  id: z.coerce.number().optional(),
  Title: z.string(),
});

export async function updateResumeTitleAction(
  prevState: any,
  formData: FormData,
) {
  const validatedFields = schemaUpdateResumeTitle.safeParse({
    id: formData.get('id'),
    Title: formData.get('Title'),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Login.',
    };
  }

  const responseData = await updateResumeTitleByIdService(
    validatedFields.data.id,
    validatedFields.data.Title,
  );

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

  // Revalidate the dashboard page to reflect changes
  revalidatePath('/dashboard');
}
