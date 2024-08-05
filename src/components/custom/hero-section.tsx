import NextLink from 'next/link';
import Image from 'next/image';

import type { HeroSectionBlock } from '@/lib/definitions';

export function HeroSection({ data }: { readonly data: HeroSectionBlock }) {
  const { Heading, SubHeading, Image: image, Link } = data;
  const imageURL = 'http://localhost:1337' + image?.data?.attributes?.url;

  return (
    <header className="relative w-full h-screen overflow-hidden">
      <Image
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
        src={imageURL}
        layout="fill"
        objectFit="cover"
        priority
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-20">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
          {Heading}
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl">{SubHeading}</p>
        <NextLink
          className="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100"
          href={Link.Url}
        >
          {Link.Text}
        </NextLink>
      </div>
    </header>
  );
}
