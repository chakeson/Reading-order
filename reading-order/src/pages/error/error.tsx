import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
	
	return (
    <div className="flex justify-center items-center flex-row map-height">
      <h1 className='text-2xl sm:text-5xl md:text-6xl lg:text-6xl 3xl:text-9xl'>404</h1>
      <div className='mx-2 border-r-4 md:border-r-4 md:border-l-2 3xl:border-l-8 border-black h-12 sm:h-16 lg:h-20 3xl:h-40'></div>
      <p className='text-xl sm:text-4xl md:text-5xl lg:text-5xl 3xl:text-8xl'>Use the <Link to="/" className='underline'>teleportarium</Link></p>
    </div>
  );
}

export default Error;