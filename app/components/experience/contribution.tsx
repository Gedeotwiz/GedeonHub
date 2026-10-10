'use client';

import { useSyncExternalStore } from 'react';
import {GitHubCalendar }from 'react-github-calendar';
import { FaGithub } from 'react-icons/fa';

export default function GithubContributions() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <div className="bg-[#2F2B3A] flex items-center gap-4 rounded-xl p-4 sm:p-6">
        <div className='p-3'>
            <FaGithub color="white"/>
        </div>
        <h2 className='text-white'>Gedeotwiz</h2>
      </div>
    );
  }

  return (
    <div className="min-w-0 max-w-[845px] bg-[#2F2B3A] rounded-xl p-4 sm:p-6 hover:border-2 hover:border-[#d9a10636]">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-between sm:items-center mb-2 sm:mb-6 ">
        <div className="flex gap-4 sm:gap-5 items-center">
          <div className='p-1.5 bg-[#2F2B3A] border-2 border-[#d9a10636] rounded-full'>
            <FaGithub size={24} color='white'/>
        </div>
        <h2 className='font-bold text-white'>Gedeotwiz</h2>
        </div>
        <div className='w-full flex justify-end items-end sm:max-w-xs'>
        <span className='text-blue-500 casoul pointer'>Visit to see all</span>
        </div>
       
      </div>

      <div>
        <GitHubCalendar
          username="Gedeotwiz"
          colorScheme="dark"
          blockSize={12}
          blockMargin={3}
          fontSize={12}
        />
      </div>
    </div>
  );
}