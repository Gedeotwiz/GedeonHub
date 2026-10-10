/** @format */

import Image from 'next/image';
import Picture from '@/public/tg.png';
import { FaFacebook } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import Brand from '@/public/brand.png';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className='relative flex min-h-screen bg-foreground flex-col-reverse gap-8 sm:gap-12 lg:gap-12 lg:flex-row justify-center items-center px-5 sm:px-8 lg:px-12 py-24 sm:py-28 lg:py-24'>
        <div className='z-5 left-6 xl:left-10 hidden xl:flex bottom-10 fixed flex-col justify-center items-center gap-4'>
          <span className='[writing-mode:vertical-rl] text-white rotate-180 whitespace-nowrap'>
            gedeontwizerimana6@gmail.com
          </span>
          <div className='ml-3 w-1 h-40 bg-primary' />
        </div>
        <div className='z-10 w-full max-w-2xl lg:flex-1 flex justify-center lg:justify-end'>
          <div className='w-full'>
            <div className='flex flex-wrap justify-start items-center gap-x-3 sm:gap-x-5 mb-4'>
              <h2 className='text-xl text-background sm:text-2xl lg:text-4xl'>I&apos;M</h2>
              <h1 className='text-primary font-extrabold text-3xl sm:text-4xl lg:text-6xl mb-1 md:mb-2 lg:mb-3'>
                Gedeon Tetch
              </h1>
            </div>
            <p className='text-xl sm:text-2xl text-background max-w-xl mb-8 sm:mb-10'>
              UI/UX & Fullstack Developer For Both Web and Mobile
              Application{' '}
            </p>
            <button className='text-primary border-2 border-primary rounded-md px-8 sm:px-10 py-3'>
              Contact Me
            </button>
          </div>
        </div>
        <div className='w-full max-w-sm sm:max-w-md lg:max-w-[42%] lg:flex-1 self-center'>
          <div className='relative aspect-square w-full'>
            <div className='animate-bounce px-3 sm:px-5 py-2 border border-green-700 w-max max-w-[90%] flex items-center justify-center gap-2 absolute right-0 sm:right-4 top-4 sm:top-32 z-20 rounded-es-2xl text-xs sm:text-sm'>
              <Image
                src={Brand}
                alt='lis'
                width={20}
                height={20}
                priority
              />
              <span className='text-green-500'>Available for work</span>
            </div>
            <Image
              src={Picture}
              alt='Profile'
              className='
        w-[78%]
        absolute
        top-[8%]
        left-[2%]
        shadow-[5px_5px_1px_white]
        scale-[0.88]
        translate-x-[2px]
        -translate-y-[4px]
        -rotate-9
        rounded-full
        z-10
        transition-all
        duration-200
        outline-offset-[1rem]
        backface-hidden
        hover:outline-[0.5rem]
        hover:outline-primary
        hover:shadow-[1px_1px_5px_white]
        hover:z-[120]
        hover:scale-[0.9]
        hover:-translate-x-[2px]
        hover:-translate-y-[5px]
        hover:rotate-24
      '
            />

            <svg
              viewBox='0 0 200 200'
              xmlns='http://www.w3.org/2000/svg'
              className='w-full max-w-full absolute right-0.5'
            >
              <path
                fill='#055a76'
                d='M47,-75.1C59.3,-65.2,66.8,-49.5,70.2,-34.3C73.6,-19.1,73,-4.4,68.2,7.8C63.3,20,54.2,29.5,46.6,42.9C39,56.3,32.8,73.5,22.9,75.3C12.9,77,-0.8,63.3,-11.9,53.9C-22.9,44.5,-31.3,39.4,-44.3,33.4C-57.3,27.3,-74.9,20.3,-83.3,7.7C-91.7,-4.8,-90.9,-23,-80.7,-33.4C-70.5,-43.7,-51,-46.3,-36,-55.1C-21,-63.8,-10.5,-78.6,3.4,-83.9C17.3,-89.2,34.6,-85,47,-75.1Z'
                transform='translate(100 100)'
              />
            </svg>
          </div>
        </div>
        <div className='hidden lg:flex w-10 h-20 absolute bottom-8 left-1/2 -translate-x-1/2 border-[5px] border-gray-500 rounded-full justify-center p-1 animate-bounce'>
          <div className='w-4 h-8 rounded-full bg-gray-500 animate-color-change' />
        </div>
        <div className='z-50 right-5 xl:right-10 bottom-10 hidden xl:flex flex-col gap-4 justify-center items-center fixed'>
          <div className='w-1 h-24 xl:h-40 bg-primary' />
          <Link
            href='https://github.com/Gedeotwiz'
            target='_blank'
          >
            <FaGithub
              size={24}
              color='white'
              className='hover:text-secondary'
            />
          </Link>
          <Link
            href='https://www.facebook.com/tgjant.gedeon/'
            target='_blank'
          >
            <FaFacebook
             color='white'
              size={24}
              className='hover:text-secondary'
            />
          </Link>
          <Link
            href='https://www.linkedin.com/in/twizerimana-gedeon-151837326'
            target='_blank'
          >
            <FaLinkedin
            color='white'
              size={24}
              className='hover:text-secondary'
            />
          </Link>
          <Link
            href='https://wa.me/250733117441'
            target='_blank'
          >
            <FaWhatsapp
            color='white'
              size={24}
              className='hover:text-secondary'
            />
          </Link>
        </div>
        
      </section>
    </>
  );
}
