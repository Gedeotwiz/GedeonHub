/** @format */
'use client';

import Header from '../share/header';
import ImagesSection from './ImageSection';
import { motion } from 'framer-motion';
import SkillsSection from './skillsSection';

export default function About() {
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const totalYear = currentYear - startYear + 1;

  const cards = [
    { number: '60+', lable: 'Project' },
    { number: '4+', lable: 'Clients' },
    { number: '3.5+', lable: 'Years Exp' },
  ];
  const skills = [
    'React',
    'React Native',
    'Nextjs',
    'Nestjs',
    'Nodejs',
    'Typescript',
    'RTK',
    'UI/UX',
    'Mongodb',
    'PostgresQL',
  ];
  return (
    <section
      id='about'
      className='bg-[#2F2B3A] w-full py-20 scroll-mt-32'
    >
      <div className='flex flex-col justify-center items-center px-4 sm:px-6'>
        <div className='pb-12 sm:pb-16 flex justify-start w-full max-w-6xl'>
          <Header Text='About Me' />
        </div>
        <div className='flex flex-col md:flex-row gap-8 md:gap-10 justify-between w-full max-w-6xl'>
          <div className='w-full md:flex-1 min-w-0'>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className='text-primary font-bold mb-3'>
                WEB AND MOBILE DEVELOPER
              </h2>
              <p className='text-lg sm:text-xl lg:text-2xl text-gray-400'>
                Full-stack web and mobile developer passionate about creating
                responsive and user-friendly web applications. Skilled in
                React.js, React Native, Next.js, Node.js, and NestJS, with
                experience of {totalYear} years in both frontend and backend
                development.
              </p>
            </motion.div>

            <div className='flex justify-center my-6 md:hidden'>
              <ImagesSection />
            </div>

            <div className='grid grid-cols-3 gap-2 sm:gap-4 py-5'>
              {cards.map((card, index) => (
                <div
                  key={index}
                  className='bg-foregroundOpacit transition border hover:bg-[#d9a10617] border-black hover:border-primary rounded-md min-w-0 min-h-16 sm:min-h-20 md:min-h-24 flex flex-col gap-0 md:gap-2 justify-center items-center text-center'
                >
                  <h1 className='text-primary text-xl md:text-3xl font-bold'>
                    {card.number}
                  </h1>
                  <span className='text-xs sm:text-sm'>{card.lable}</span>
                </div>
              ))}
            </div>

            <div className='flex flex-wrap gap-2 sm:gap-3'>
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className='rounded-xl border border-secondary bg-[#055a7611] px-3 py-1'
                >
                  <span className='font-bold text-secondary'>{skill}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='hidden md:flex md:flex-1 md:justify-end'>
            <ImagesSection />
          </div>
        </div>
        <div className='flex justify-start w-full max-w-6xl py-10'>
          <SkillsSection />
        </div>
      </div>
    </section>
  );
}
