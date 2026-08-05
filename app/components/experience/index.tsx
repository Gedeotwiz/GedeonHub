import Header from "../share/header"
import GithubContributions from "./contribution"

export default function Experience(){
    return (
         <section
              id='experience'
              className='w-full bg-foregroundOpacit py-20 scroll-mt-32'
            >
              <div className=' flex flex-col justify-center items-center'>
                <div className='pb-20 flex justify-end w-full md:w-3/4 lg:w-3/5'>
                  <Header Text='Work Experience' />
                </div>
                <div className='pb-20  w-full md:w-3/4 lg:w-3/5'>
                   <GithubContributions/>
                </div>
                </div>
                </section>
    )
}