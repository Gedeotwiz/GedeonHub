/** @format */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo.png';
import { FiMenu, FiX } from 'react-icons/fi';

const links = [
  { name: 'About', id: 'about' },
  { name: 'Experience', id: 'experience' },
  { name: 'Project', id: 'project' },
  { name: 'Contact', id: 'contact' },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBg, setShowBg] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setShowBg(window.scrollY > 10);

      const sections = links.map((link) => link.id);

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);

        if (section) {
          const rect = section.getBoundingClientRect();

          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      setActiveSection(id);

      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 lg:px-10 py-3 sm:py-4 transition-all duration-300 ${
        showBg ? 'bg-foreground shadow-lg backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className='transition-transform duration-500 hover:scale-110 hover:rotate-6'>
        <Image
          src={Logo}
          alt='Logo'
          width={120}
          height={60}
          priority
          className='w-20 sm:w-24 h-auto'
        />
      </div>

      <nav className='hidden xl:flex items-center gap-8 2xl:gap-12'>
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => handleScrollToSection(link.id)}
            className={`relative text-background font-medium transition-all duration-300
      ${
        activeSection === link.id
          ? 'text-primary after:w-full'
          : 'hover:text-primary after:w-0'
      }
      after:absolute
      after:left-0
      after:-bottom-1
      after:h-[2px]
      after:bg-primary
      after:transition-all
      after:duration-300
      hover:after:w-full
    `}
          >
            {link.name}
          </button>
        ))}
        <Link
          href='/blogs'
          className='relative font-medium text-background transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:text-primary hover:after:w-full'
        >
          Blogs
        </Link>
      </nav>

      <div className='flex items-center gap-2 sm:gap-4'>
        <div className='hidden md:flex items-center gap-3'>
          <a
            href='/TG_Resume.pdf'
            download='TG_Resume.pdf'
            className='bg-[#2F2B3A] px-3 lg:px-5 py-2 rounded-md text-sm lg:text-base text-white border-2 border-primary transition-colors duration-300'
          >
           Download My CV
          </a>
          <button className='bg-primary px-4 lg:px-5 py-2 rounded-md text-sm lg:text-base text-white transition-colors duration-300'>
            Hire Me!
          </button>
        </div>

        <button
          className='flex xl:hidden items-center justify-center rounded-md p-2 text-white hover:text-primary focus-visible:outline-2 focus-visible:outline-primary'
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <FiX size={30}  color='white'/> : <FiMenu size={30} color='white'/>}
        </button>
      </div>

      <div
        className={`absolute top-full right-0 w-full sm:w-80 bg-foreground shadow-lg xl:hidden transition-all duration-300 ${
          isOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <nav className='flex flex-col items-center py-6 gap-6'>
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleScrollToSection(link.id)}
              className={`text-lg font-medium text-background transition-colors ${
                activeSection === link.id
                  ? 'text-primary'
                  : 'hover:text-primary'
              }`}
            >
              {link.name}
            </button>
          ))}
          <Link
            href='/blogs'
            onClick={() => setIsOpen(false)}
            className='text-lg font-medium text-background transition-colors hover:text-primary'
          >
            Blogs
          </Link>

          <a
            href='/TG_Resume.pdf'
            download='TG_Resume.pdf'
            onClick={() => setIsOpen(false)}
            className='md:hidden bg-[#2F2B3A] px-8 py-3 rounded-md text-white border border-primary transition-colors'
          >
            Download My CV
          </a>
          <button className='md:hidden bg-primary px-8 py-3 rounded-md text-white transition-colors'>
            Hire Me!
          </button>
        </nav>
      </div>
    </header>
  );
}
