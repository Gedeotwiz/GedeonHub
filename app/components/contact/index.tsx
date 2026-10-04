'use client';

import { ContactForm } from "./contactForm";

export default function ContactSection() {
  

  return (
    <section id='contact' className="relative w-full flex justify-center bg-foregroundOpacit py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
      
      <div className='relative w-full max-w-6xl'>
      <div className="absolute -left-10 top-12 w-24 h-44 opacity-80 pointer-events-none md:left-0 lg:w-32 lg:h-56">
        <svg className="w-full h-full fill-current text-green-700/30" viewBox="0 0 100 200">
          <path d="M10,50 Q40,20 80,60 Q50,90 10,50 Z M5,110 Q50,70 90,130 Q40,170 5,110 Z" />
        </svg>
      </div>
      
      <div className="absolute -right-6 bottom-16 w-20 h-36 opacity-80 pointer-events-none md:right-2 lg:w-28 lg:h-48">
        <svg className="w-full h-full fill-current text-green-700/20" viewBox="0 0 100 150">
          <path d="M90,30 Q50,10 20,50 Q40,80 90,30 Z" />
        </svg>
      </div>

      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
       
        <div className="flex w-full lg:w-2/5 flex-col space-y-5 sm:space-y-6 lg:pr-4">
          <div>
            <span className="text-[#d9a106] font-bold text-xs uppercase tracking-wider block mb-1">
              Contact Us
            </span>
            <h2 className="text-[#055a76] font-extrabold text-3xl sm:text-4xl tracking-tight uppercase">
              Get In Touch
            </h2>
          </div>
          
          <p className="text-white text-sm leading-relaxed">
            Need help or contact me for job. I am here to talk to you
          </p>

          <div className="space-y-4 pt-2">
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-[#1b6285] flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 01-7.108-7.108c-.145-.44.02-1.27.393-1.552l1.293-.97c.362-.271.528-.733.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Phone</p>
                <p className="text-sm font-semibold text-white tracking-wide">+250 788 801 966</p>
              </div>
            </div>

            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-[#1b6285] flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Email</p>
                <p className="text-sm font-semibold text-white break-all">gedeontwizerimana6@gmail.com</p>
              </div>
            </div>

            {/* Location Info */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-[#1b6285] flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Location</p>
                <p className="text-sm font-semibold text-white">Nyabiheke, Rwanda</p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            COLUMN 2: Message Form Box
            ========================================================================= */}
          <ContactForm/>
      </div>
      </div>
    </section>
  );
}