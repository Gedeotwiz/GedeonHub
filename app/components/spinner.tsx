import Image from 'next/image';
import brand from '@/public/brand.png';

export const Spinner = ()=>{
    return(
        <Image 
        src={brand} 
        alt="Brand" 
        width={30} 
        height={30} 
        className="animate-spin rounded-full"
        />
        
    )
}