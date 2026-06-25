/** @format */
import Image from 'next/image';
import Header from '../share/header';
import Dashboard from "@/public/service.png"
import Landing from "@/public/gira.png"

export default function Projects() {
  return (
    <section
      id='project'
      className='w-full py-20 scroll-mt-32'
    >
      <div className=' flex flex-col justify-center items-center'>
        <div className='pb-20 flex justify-end w-full md:w-3/4 lg:w-3/5'>
          <Header Text='Featured Projects' />
        </div>
        <div className='w-full md:w-3/4 lg:w-3/5'>
            <div className='w-full bg-amber-600 flex'>
                <div className='w-1/2 bg-black'>
                    <h3>Community Service</h3>
                </div>
                <div className='w-1/2'>
                  <Image src={Dashboard} alt='app'/>
                </div>
            </div>

            <div className='w-full bg-amber-600 flex'>
                <div className='w-1/2'>
                  <Image src={Landing} alt='app'/>
                </div>
                <div className='w-1/2 bg-black'>
                    <h3>Gira E-Commerce</h3>
                </div>
                
            </div>
        </div>
      </div>
    </section>
  );
}
