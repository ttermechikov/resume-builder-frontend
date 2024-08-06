import { getStrapiURL } from '@/lib/utils';

const baseUrl = getStrapiURL();

export async function getHomePageData() {
  const url = new URL('/api/home-page?populate=deep', baseUrl);

  try {
    const response = await fetch(url.href, { cache: 'no-cache' });
    const jsonData = await response.json();
    const data = jsonData.data.attributes;

    return data;
  } catch (error) {
    console.error(error);
  }
}
