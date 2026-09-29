'use client';

import { useEffect, useState } from 'react';
import {GitHubCalendar }from 'react-github-calendar';
import { FaGithub } from 'react-icons/fa';

export default function GithubContributions() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-[#2F2B3A] flex gap-5 rounded-xl p-6">
        <div className='p-3'>
            <FaGithub color="white"/>
        </div>
        <h2 className='text-white'>Gedeotwiz</h2>
      </div>
    );
  }

  return (
    <div className="bg-[#2F2B3A] rounded-xl p-6 hover:border-2  hover:border-[#d9a10636]">
      <div className=" flex gap-5 justify-between items-center mb-10">
        <div className=" flex gap-5 items-center">
          <div className='p-1.5 bg-[#2F2B3A] border-2 border-[#d9a10636] rounded-full'>
            <FaGithub size={24} color='white'/>
        </div>
        <h2 className='font-bold text-white'>Gedeotwiz</h2>
        </div>
        <p className="text-gray-400">
          Explore my GitHub profile to see a range of web and mobile applications, including personal projects and collaborative team projects.
        </p>
      </div>

      <GitHubCalendar
        username="Gedeotwiz"
        colorScheme="dark"
        blockSize={15}
        blockMargin={5}
        fontSize={14}
      />
    </div>
  );
}