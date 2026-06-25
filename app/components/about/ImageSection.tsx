/** @format */

import Hist from '@/public/history.jpeg';
import Jant from '@/public/jant.jpeg';
import Image from 'next/image';

export default function ImagesSection() {
  const images = [{ name: Jant }];
  return (
    <div className='flex flex-col justify-center items-center gap-10'>
      {images.map((image, index) => (
        <div
          key={index}
          className={`relative p-4 transition-all duration-300
      before:content-['']
      before:absolute before:top-0 before:left-0
      before:w-[30px] before:h-[30px]
      before:border-t-[7px] before:border-l-[7px]

      after:content-['']
      after:absolute after:bottom-0 after:right-0
      after:w-[30px] after:h-[30px]
      after:border-b-[7px] after:border-r-[7px]

      hover:before:w-full hover:before:h-full
      hover:after:w-full hover:after:h-full

      ${
        index === 0
          ? 'before:border-[#055a76] after:border-[#055a76]'
          : 'before:border-[#d9a106] after:border-[#d9a106]'
      }
    `}
        >
          <Image
            src={image.name}
            alt='image'
            width={250}
            height={250}
            className='bg-[#555555]'
            priority
          />
        </div>
      ))}
    </div>
  );
}
