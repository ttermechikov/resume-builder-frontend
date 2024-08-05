import { getHomePageData } from '@/data/services/home-page-service';
import { HeroSection } from '@/components/custom/hero-section';

import type { GetHomePageDataResponse } from '@/lib/definitions';

export default async function Home() {
  const data: GetHomePageDataResponse = await getHomePageData();

  const heroSectionData = data.Blocks.find(
    (block) => block.__component === 'layout.hero-section',
  );

  if (!heroSectionData) {
    return <div>Something went wrong</div>;
  }

  return <HeroSection data={heroSectionData} />;
}
