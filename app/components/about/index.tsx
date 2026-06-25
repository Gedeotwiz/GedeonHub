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
      <div className=' flex flex-col justify-center items-center'>
        <div className='pb-20 flex justify-start w-full md:w-3/4 lg:w-3/5'>
          <Header Text='About Me' />
        </div>
        <div className='flex flex-col md:flex-row px-5 md:px-0 justify-between w-full md:w-3/4 lg:w-3/5'>
          <div className='w-full md:w-2/3'>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className='text-primary font-bold mb-3'>
                WEB AND MOBILE DEVELOPER
              </h2>
              <p className='text-2xl'>
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

            <div className='flex justify-center md:justify-start items-center gap-5 py-5'>
              {cards.map((card, index) => (
                <div
                  key={index}
                  className='bg-background transition border hover:bg-[#d9a10617] border-black hover:border-primary rounded-md w-[120px] h-[60px] md:w-[200px] md:h-[100px] flex flex-col gap-0 md:gap-2 justify-center items-center'
                >
                  <h1 className='text-primary text-xl md:text-3xl font-bold'>
                    {card.number}
                  </h1>
                  <span>{card.lable}</span>
                </div>
              ))}
            </div>

            <div className='flex gap-5 overflow-x-auto hide-scrollbar'>
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className='flex-none rounded-xl border border-secondary bg-[#055a7611] px-4'
                >
                  <span className='font-bold text-secondary'>{skill}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='hidden md:block'>
            <ImagesSection />
          </div>
        </div>
        <div className='flex justify-start w-full md:w-3/4 lg:w-3/5 py-10'>
          <SkillsSection />
        </div>
      </div>
    </section>
  );
}
