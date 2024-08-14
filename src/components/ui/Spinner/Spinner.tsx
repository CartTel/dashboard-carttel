// import styles from "./Spinner.module.scss";
import './Spinner.css'
// import '@/components/ui/Spinner/'

import Image from 'next/image'

export default function Spinner() {
  return (
    <div className='h-screen flex justify-center items-center flex-col z-10'>


      <div className="flex justify-center items-center mx-auto text-primary cursor-pointer w-full">
        <div className="w-[200px]">
          <Image
            src={'/images/Logo/CARTEL.png'}
            alt="logo"
            width={136}
            height={41}
            priority
            className="text-[1px] md:w-full md:h-full xs:w-full xs:h-full"
          />

        </div>
      </div>
      <div className="spinner"></div>
    </div>
  );
}
