/** @format */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import { FiMenu, FiX } from 'react-icons/fi';

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

  const links = [
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Project', id: 'project' },
    { name: 'Contact', id: 'contact' },
  ];

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
      className={`fixed top-0 left-0 w-full z-50 flex justify-around items-center px-6 md:px-0 py-6 transition-all duration-300 ${
        showBg ? 'bg-foreground shadow-lg backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className='transition-transform duration-500 hover:scale-110 hover:rotate-6'>
        <Image
          src={Logo}
          alt='Logo'
          width={200}
          height={150}
          priority
        />
      </div>

      <nav className='hidden lg:flex items-center gap-12'>
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => handleScrollToSection(link.id)}
            className={`relative text-2xl text-background font-medium transition-all duration-300
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
      </nav>

      <div className='flex items-center gap-4'>
        <button className='hidden md:block bg-[#2F2B3A] px-8 py-3 rounded-md text-lg text-white hover:bg-primary transition-colors duration-300'>
          Hire Me!
        </button>

        <button
          className='lg:hidden'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Toggle Menu'
        >
          {isOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </button>
      </div>

      <div
        className={`absolute top-full right-0 w-2/3 sm:w-1/2 bg-background shadow-lg lg:hidden transition-all duration-300 ${
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

          <button className='bg-[#2F2B3A] px-8 py-3 rounded-md text-white hover:bg-primary transition-colors'>
            Hire Me!
          </button>
        </nav>
      </div>
    </header>
  );
}
