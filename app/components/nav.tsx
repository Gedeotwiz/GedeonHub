'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'About', url: '#about' },
    { name: 'Experience', url: '#experience' },
    { name: 'Blogs', url: 'blogs' },
    { name: 'Contact', url: '#contact' },
  ];

  return (
    <header className="flex justify-around items-center px-6 md:px-0 py-6 fixed w-full z-50">
      <div className="transition-transform duration-500 hover:scale-110 hover:rotate-6">
        <Image
          src={Logo}
          alt="Logo"
          width={200}
          height={150}
        />
      </div>

      
      <nav className="hidden lg:flex items-center gap-12">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            className="relative text-2xl font-medium transition-colors duration-300 hover:text-primary after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:-translate-y-2"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      
      <div className="flex items-center gap-4">
        <button className="hidden md:block bg-[#2F2B3A] px-8 py-3 rounded-md text-lg text-white hover:bg-primary transition-colors duration-300">
          Hire Me!
        </button>

        
        <button
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </button>
      </div>

      
      <div
        className={`absolute top-full bg-background z-50 right-0 w-1/2 shadow-lg lg:hidden transition-all duration-300 ${
          isOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center py-6 gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <button className="bg-[#2F2B3A] px-8 py-3 rounded-md text-white hover:bg-primary transition-colors">
            Hire Me!
          </button>
        </nav>
      </div>
    </header>
  );
}