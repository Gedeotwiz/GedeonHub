/** @format */

interface IProps{
    Text:string,
}

export default function Header({Text}:IProps) {
  return (
    <div
      className="
      relative 
      after:content-['']
      after:absolute
      after:left-0
      after:-bottom-2
      after:w-24
      after:h-[9px]
      after:bg-[#055a76]
    "
    >
      <h1 className='text-6xl font-extrabold py-3 bg-gradient-to-r from-white to-[#055a76] bg-clip-text text-transparent'>{Text}</h1>
    </div>
  );
}
