/** @format */

import { motion } from 'framer-motion';

export default function SkillsSection() {
  const skillsCard = [
    {
      title: 'FRONTEND DEVELOPMENT',
      description:
        'React, Nextjs with modern state management and UI framework.',
    },
    {
      title: 'BACKEND DEVELOPMENT',
      description:
        'Building secure and scalable RESTful APIs with Node.js, NestJS, and modern database technologies.',
    },
    {
      title: 'MOBILE DEVELOPMENT',
      description:
        'Developing fast and user-friendly mobile applications for Android and iOS using React Native.',
    },
    {
      title: 'UI/UX DESIGNER',
      description:
        'Crafting user-friendly designs that balance aesthetics, accessibility, and functionality.',
    },
    {
      title: 'PROJECT MANAGEMENT',
      description:
        'Managing project timelines, team collaboration, and successful product delivery.',
    },
    {
      title: 'TEAM LEADER',
      description:
        'Empowering teams through clear communication, collaboration, and strategic direction.',
    },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className='w-full px-5 md:px-0'
    >
      <h3 className='text-2xl font-bold mb-5'>Core skills</h3>
      <div className='flex flex-wrap w-full gap-5 md:gap-12'>
        {skillsCard.map((skills, index) => (
          <div
            key={index}
            className='p-5 bg-foregroundOpacit transition border hover:bg-[#d9a10617] border-black hover:border-primary rounded-md md:w-[265px] flex flex-col gap-1 md:gap-3 '
          >
            <h6 className='text-white font-extrabold'>{skills.title}</h6>
            <p className='text-gray-400'>{skills.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
