/** @format */

import Image from 'next/image';
import Header from '../share/header';
import Dashboard from '@/public/service.png';
import Landing from '@/public/gira.png';
import Link from 'next/link';
import { FaGithub, FaCode } from 'react-icons/fa';

export default function Projects() {
  const projects = [
    {
      id: 1,
      category: 'Service Marketplace',
      status: 'Live',
      statusColor: 'bg-green-600',
      statusTextColor: 'text-green-600',
      title: 'Community Service',
      description:
        'The community service platform is a digital solution designed to connect community members (clients) with trusted service providers in a fast, structured, and secure way. The platform allows users to request services, manage bookings, and monitor service progress through a centralized web-based system.',
      image: Dashboard,
      liveUrl:
        'https://community-service-online-booking.netlify.app/',
      githubUrl:
        'https://github.com/Alight-Rw/Community-Services',
      imagePosition: 'right',
    },

    {
      id: 2,
      category: 'E-Commerce',
      status: 'Live',
      statusColor: 'bg-green-600',
      statusTextColor: 'text-green-600',
      title: 'Gira',
      description:
        'If you have physical items that you would like to donate, we would be grateful for your contribution. Your generosity can make a significant difference by providing much-needed support to those in need.',
      image: Landing,
      liveUrl:
        'https://community-service-online-booking.netlify.app/',
      githubUrl:
        'https://github.com/Alight-Rw/Community-Services',
      imagePosition: 'left',
    },

    {
      id: 3,
      category: 'Service Marketplace',
      status: 'Live',
      statusColor: 'bg-green-600',
      statusTextColor: 'text-green-600',
      title: 'Community Service',
      description:
        'The community service platform is a digital solution designed to connect community members (clients) with trusted service providers in a fast, structured, and secure way. The platform allows users to request services, manage bookings, and monitor service progress through a centralized web-based system.',
      image: Dashboard,
      liveUrl:
        'https://community-service-online-booking.netlify.app/',
      githubUrl:
        'https://github.com/Alight-Rw/Community-Services',
      imagePosition: 'right',
    },

    {
      id: 4,
      category: 'Service Marketplace',
      status: 'Live',
      statusColor: 'bg-green-600',
      statusTextColor: 'text-green-600',
      title: 'Community Service',
      description:
        'The community service platform is a digital solution designed to connect community members (clients) with trusted service providers in a fast, structured, and secure way. The platform allows users to request services, manage bookings, and monitor service progress through a centralized web-based system.',
      image: Dashboard,
      liveUrl:
        'https://community-service-online-booking.netlify.app/',
      githubUrl:
        'https://github.com/Alight-Rw/Community-Services',
      imagePosition: 'left',
    },
  ];

  return (
    <section
      id='project'
      className='w-full py-20 scroll-mt-32'
    >
    
      <div className='flex flex-col p-5 md:p-0 justify-center items-center'>
        
        
        <div className='pb-20 flex justify-end w-full md:w-3/4 lg:w-3/5'>
          <Header Text='Featured Projects' />
        </div>

      
        <div className='w-full md:w-3/4 lg:w-3/5'>
          
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`
                w-full 
                flex 
                flex-col 
                md:flex-row
                overflow-hidden
                hover:border-3 
                hover:border-[#d9a10636]
                ${
                  index === 0
                    ? 'rounded-tl-[20px] rounded-tr-[20px]'
                    : ''
                }
              `}
            >
            
              <div
                className={`
                  w-full 
                  md:w-1/2
                  ${
                    project.imagePosition === 'left'
                      ? 'md:order-1'
                      : 'md:order-2'
                  }
                `}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  className='w-full h-full object-cover'
                />
              </div>

              <div
                className={`
                  w-full 
                  md:w-1/2
                  flex 
                  flex-col 
                  gap-5 
                  px-5 
                  md:px-10 
                  py-10 
                  bg-[#2F2B3A]
                  ${
                    project.imagePosition === 'left'
                      ? 'md:order-2'
                      : 'md:order-1'
                  }
                  ${
                    index === 0
                      ? 'md:rounded-tl-[20px]'
                      : ''
                  }
                `}
              >
                <div className='flex flex-wrap items-center gap-5'>
                  
                  <span className='py-1 px-3 rounded-2xl bg-[#d9a10617] text-primary uppercase font-bold'>
                    {project.category}
                  </span>

                  
                  <div className='flex justify-center items-center gap-2'>
                    <div
                      className={`
                        w-3 
                        h-3 
                        rounded-full 
                        ${project.statusColor}
                      `}
                    />

                    <p className={project.statusTextColor}>
                      {project.status}
                    </p>
                  </div>
                </div>

               
                <h3 className='text-2xl py-3 font-extrabold uppercase'>
                  {project.title}
                </h3>

                
                <p className='text-gray-400'>
                  {project.description}
                </p>

                
                <div className='flex flex-wrap gap-5'>
                  
                  
                  <Link
                    href={project.liveUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex justify-center items-center gap-2 bg-background py-2 md:py-3 px-3 md:px-8 rounded-2xl text-gray-400 hover:bg-secondary transition'
                  >
                    <FaCode />
                    <span>Visit Project</span>
                  </Link>

                
                  <Link
                    href={project.githubUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex justify-center items-center gap-2 py-2 md:py-3 px-3 md:px-8 text-gray-400 border border-secondary rounded-2xl hover:bg-secondary transition'
                  >
                    <FaGithub />
                    <span>View Code</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}