import { getStrapiURL } from '@/lib/utils';
import { getAuthToken } from './get-token';

import type {
  GetResumeListResponse,
  GetResumeResponse,
  Resume,
} from '@/lib/definitions';

const baseUrl = getStrapiURL();

export async function getResumeListService(): Promise<GetResumeListResponse> {
  const url = new URL('/api/resumes?populate=*', baseUrl);
  const authToken = await getAuthToken();

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      cache: 'no-store',
    });

    return response.json();
  } catch (error) {
    console.error('Resume Service Error:', error);
    throw error;
  }
}

export async function getResumeByIdService(
  resumeId: Resume['id'],
): Promise<GetResumeResponse> {
  if (!resumeId) {
    throw new Error('"resumeId" was not provided');
  }

  const url = new URL(`/api/resumes/${resumeId}?populate=deep`, baseUrl);
  const authToken = await getAuthToken();

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      cache: 'no-store',
    });

    return response.json();
  } catch (error) {
    console.error('Resume Service Error:', error);
    throw error;
  }
}

export async function deleteResumeByIdService(resumeId: Resume['id']) {
  if (!resumeId) {
    throw new Error('"resumeId" was not provided');
  }

  const url = new URL(`/api/resumes/${resumeId}`, baseUrl);
  const authToken = await getAuthToken();

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.json();
  } catch (error) {
    console.error('Resume Service Error:', error);
  }
}

export async function updateResumeTitleByIdService(
  resumeId: Resume['id'],
  Title: Resume['Title'],
) {
  if (!resumeId || !Title) {
    throw new Error('data was not provided');
  }

  const url = new URL(`/api/resumes/${resumeId}`, baseUrl);
  const authToken = await getAuthToken();

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: { Title },
      }),
    });

    return response.json();
  } catch (error) {
    console.error('Resume Service Error:', error);
  }
}
