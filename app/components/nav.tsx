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
    { name: 'Contact', url: '#contact' },
  ];

  return (
    <header className="relative flex justify-around items-center px-6 md:px-10 py-6">
      <div className="transition-transform duration-500 hover:scale-110 hover:rotate-6">
        <Image
          src={Logo}
          alt="Logo"
        //   width={70}
        //   height={70}
        />
      </div>

      
      <nav className="hidden md:flex items-center gap-12">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.url}
            className="relative text-xl font-medium transition-colors duration-300 hover:text-amber-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-amber-700 after:transition-all after:duration-300 hover:after:w-full hover:-translate-y-2"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      
      <div className="flex items-center gap-4">
        <button className="hidden md:block bg-[#2F2B3A] px-8 py-3 rounded-md text-lg text-white hover:bg-amber-700 transition-colors duration-300">
          Hire Me
        </button>

        
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </button>
      </div>

      
      <div
        className={`absolute top-full right-0 w-1/2 shadow-lg md:hidden transition-all duration-300 ${
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
              className="text-lg font-medium hover:text-amber-700 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <button className="bg-[#2F2B3A] px-8 py-3 rounded-md text-white hover:bg-amber-700 transition-colors">
            Hire Me
          </button>
        </nav>
      </div>
    </header>
  );
}