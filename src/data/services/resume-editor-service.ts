import { getStrapiURL } from '@/lib/utils';
import { getCookie } from 'cookies-next';
import type { Resume } from '@/lib/definitions';

const baseUrl = getStrapiURL();

export async function editResumeService(userData: Partial<Resume>) {
  if (!userData) {
    throw new Error('"userData" was not provided');
  }

  const url = new URL(`/api/resumes/${userData.id}`, baseUrl);

  // the "id" property will be extracted from an URL
  delete userData.id;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getCookie('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: userData,
      }),
    });

    return response.json();
  } catch (error) {
    console.error('Resume Service Error:', error);
  }
}

export async function createResumeService(userData: Partial<Resume>) {
  if (!userData) {
    throw new Error('"userData" was not provided');
  }

  const url = new URL('/api/resumes', baseUrl);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getCookie('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: userData }),
    });

    return response.json();
  } catch (error) {
    console.error('Resume Service Error:', error);
  }
}
