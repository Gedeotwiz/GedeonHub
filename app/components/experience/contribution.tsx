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
            <FaGithub/>
        </div>
        <h2>Gedeontwiz</h2>
      </div>
    );
  }

  return (
    <div className="bg-[#2F2B3A] rounded-xl p-6 hover:border-2  hover:border-[#d9a10636]">
      <div className=" flex gap-5 items-center mb-10">
        <div className='p-1.5 bg-[#2F2B3A] border-2 border-[#d9a10636] rounded-full'>
            <FaGithub size={24}/>
        </div>
        <h2 className='font-bold'>Gedeontwiz</h2>
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