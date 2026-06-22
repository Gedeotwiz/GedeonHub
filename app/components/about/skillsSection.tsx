/** @format */

import { motion } from 'framer-motion';

export default function SkillsSection() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className='w-full'
    >
        <h3>Core skills</h3>
        <div className='flex flex-wrap w-full'>
            <div className='p-5 bg-background transition border hover:bg-[#d9a10617] border-black hover:border-primary rounded-md md:w-1/3 flex flex-col gap-1 md:gap-3 '>
                <h6>FRONTEND DEVELOPMENT</h6> 
                <p>React, Nextjs with modern state management and UI framework.</p>
            </div>
             <div className='p-5 bg-background transition border hover:bg-[#d9a10617] border-black hover:border-primary rounded-md md:w-1/3 flex flex-col gap-1 md:gap-3 '>
                <h6>FRONTEND DEVELOPMENT</h6> 
                <p>React, Nextjs with modern state management and UI framework.</p>
            </div>
             <div className='p-5 bg-background transition border hover:bg-[#d9a10617] border-black hover:border-primary rounded-md md:w-1/3 flex flex-col gap-1 md:gap-3 '>
                <h6>FRONTEND DEVELOPMENT</h6> 
                <p>React, Nextjs with modern state management and UI framework.</p>
            </div>
             <div className='p-5 bg-background transition border hover:bg-[#d9a10617] border-black hover:border-primary rounded-md md:w-1/3 flex flex-col gap-1 md:gap-3 '>
                <h6>FRONTEND DEVELOPMENT</h6> 
                <p>React, Nextjs with modern state management and UI framework.</p>
            </div>
             <div className='p-5 bg-background transition border hover:bg-[#d9a10617] border-black hover:border-primary rounded-md md:w-1/3 flex flex-col gap-1 md:gap-3 '>
                <h6>FRONTEND DEVELOPMENT</h6> 
                <p>React, Nextjs with modern state management and UI framework.</p>
            </div>
        </div>
    </motion.div>
  );
}
