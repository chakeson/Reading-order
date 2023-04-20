import { BsFillGearFill } from "react-icons/bs";

function Loading() {

	return (
        <div className="flex flex-row justify-center items-center map-height fadeIn">
            <h1 className='mr-1 sm:mr-4 font-extrabold text-2xl sm:text-5xl md:text-6xl lg:text-6xl 3xl:text-9xl'>Loading</h1>
            {/* Spinning gear loading screen */}
            <span className="mt-2 text-1xl sm:text-3xl md:text-4xl lg:text-4xl 3xl:text-9xl animate-spin-slow ">
                <BsFillGearFill size="1.5em" color="black"/>
            </span>

    </div>
  );
}

export default Loading;


/*

            <div className="flex items-end text-2xl sm:text-5xl md:text-6xl lg:text-6xl 3xl:text-9xl">
                <span className="animate-spin-slow">
                    <BsFillGearFill size="1.5em" color="black"/>
                </span>
                <span className="-ml-4 -mr-8 mb-8 animate-spin-slow-reverse animation-delay-500"> {-mx-4 }
                <BsFillGearFill size="1.5em" color="black"/>
                </span>
                <span className="mb-[90px] animate-spin-slow ">{ mb-20 }
                    <BsFillGearFill size="1.5em" color="black"/>
                </span>
            </div>

      <span className="star-streak"></span>


import shipLeft from "./shipLeft.webp"
import shipRight from "./shipRight.webp"

      <img src={shipLeft} alt="" className="mt-5 h-24 sm:h-40 md:h-40 lg:h-52 3xl:h-64" />
      <h1 className='font-extrabold text-2xl sm:text-5xl md:text-6xl lg:text-6xl 3xl:text-9xl'>Loading</h1>
      <img src={shipRight} alt="" className="mt-5 h-24 sm:h-40 md:h-40 lg:h-52 3xl:h-64" />

*/