/** @format */

interface IProps{
    leftText:string,
    rightText?:string
}

export default function Header({leftText,rightText}:IProps) {
  return (
    <div
      className="
      relative inline-flex gap-2
      after:content-['']
      after:absolute
      after:left-0
      after:-bottom-2
      after:w-24
      after:h-[9px]
      after:bg-[#055a76]
    "
    >
      <h1 className='text-6xl font-extrabold py-3'>{leftText}</h1>
      {''}
      <h1 className='text-secondary text-6xl font-extrabold py-3'>{rightText}</h1>
    </div>
  );
}
