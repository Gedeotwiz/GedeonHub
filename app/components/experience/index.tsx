import Header from "../share/header"
import { ContentExperiance } from "./ContentExperiance"
import GithubContributions from "./contribution"

export default function Experience() {
  return (
    <section
      id='experience'
      className='w-full bg-foregroundOpacit py-20 scroll-mt-32'
    >
      <div className='flex flex-col justify-center items-center px-4 sm:px-6'>
        <div className='pb-14 sm:pb-20 w-full max-w-6xl'>
          <ContentExperiance />
        </div>
        <div className='pb-12 sm:pb-20 w-full max-w-6xl'>
          <GithubContributions />
        </div>
      </div>
    </section>
  )
}