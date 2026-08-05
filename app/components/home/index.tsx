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
      <div className='flex bg-foreground flex-col-reverse gap-20 h-auto lg:gap-0 lg:flex-row justify-center items-center py-30'>
        <div className='z-5 left-1/10 hidden md:block bottom-10 fixed flex flex-col justify-center items-center gap-4'>
          <span className='[writing-mode:vertical-rl] text-white rotate-180 whitespace-nowrap'>
            gedeontwizerimana6@gmail.com
          </span>
          <div className='ml-3 w-1 h-40 bg-primary' />
        </div>
        <div className=' px-9 md:px-6 flex justify-end lg:p-0'>
          <div className='w-full md:w-4/5'>
            <div className='flex justify-start items-center gap-5  mb-5'>
              <h2 className='text-xl text-background md:text-2xl lg:text-4xl'>I'M </h2>
              <h1 className='text-primary font-extrabold text-2xl md:text-4xl lg:text-6xl mb-1 md:mb-2 lg:mb-3'>
                Gedeon Tetch
              </h1>
            </div>
            <p className='text-2xl text-background w-4/5 mb-10'>
              UI/UX & Fullstack Developer For Both Web and Mobile
              Application{' '}
            </p>
            <button className='text-primary border-2 border-primary rounded-md px-10 py-3'>
              Contact Me
            </button>
          </div>
        </div>
        <div className=' w-full  h-auto md:w-[80%] lg:w-[40%] self-center'>
          <div className='relative h-[40vh] md:h-[50vh] lg:h-[70vh]'>
            <div className='animate-bounce px-5 py-2 border-1 border-green-700 w-[200px] flex justify-center gap-2 absolute right-32 top-24 z-50 rounded-es-2xl'>
              <Image
                src={Brand}
                alt='lis'
                width={20}
                height={20}
                priority
              />
              <span className='marker:text-green-500'>Available for work</span>
            </div>
            <Image
              src={Picture}
              alt='Profile'
              className='
        w-[75%]
        absolute
        top-0
        left-0
        shadow-[5px_5px_1px_white]
        scale-[0.7]
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
        hover:scale-[0.71]
        hover:-translate-x-[2px]
        hover:-translate-y-[5px]
        hover:rotate-24
      '
            />

            <svg
              viewBox='0 0 200 200'
              xmlns='http://www.w3.org/2000/svg'
              className='w-full absolute right-0.5'
            >
              <path
                fill='#055a76'
                d='M47,-75.1C59.3,-65.2,66.8,-49.5,70.2,-34.3C73.6,-19.1,73,-4.4,68.2,7.8C63.3,20,54.2,29.5,46.6,42.9C39,56.3,32.8,73.5,22.9,75.3C12.9,77,-0.8,63.3,-11.9,53.9C-22.9,44.5,-31.3,39.4,-44.3,33.4C-57.3,27.3,-74.9,20.3,-83.3,7.7C-91.7,-4.8,-90.9,-23,-80.7,-33.4C-70.5,-43.7,-51,-46.3,-36,-55.1C-21,-63.8,-10.5,-78.6,3.4,-83.9C17.3,-89.2,34.6,-85,47,-75.1Z'
                transform='translate(100 100)'
              />
            </svg>
          </div>
        </div>
        <div className='w-10 h-20 absolute bottom-20 left-1/3  border-[5px] border-gray-500 rounded-full flex justify-center p-1 animate-bounce'>
          <div className='w-4 h-8 rounded-full bg-gray-500 animate-color-change' />
        </div>
        <div className='z-50 right-1/10 bottom-10 flex flex-col gap-4 justify-center items-center fixed'>
          <div className='w-1 h-40 bg-primary' />
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
      </div>
    </>
  );
}
