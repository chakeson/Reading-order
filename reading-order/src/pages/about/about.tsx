import React from 'react';
import { FiTwitter } from 'react-icons/fi';

function About() {
	
	return (
    	<div className="flex items-center flex-col map-height">
            <h3 className='w-5/6 md:w-4/6 lg:w-3/6 pt-6 sm:pt-10 pb-2 text-3xl font-bold'>About</h3>
            <main className='w-5/6 md:w-4/6 lg:w-3/6 text-lg pb-2'>
                <p>This website was written as a portfolio project, and opertunity to practise react for frontend and learn backend technologies.</p>

                <p>It aims to solve the problem of reading <a href="https://www.blacklibrary.com/" className='underline' target="_blank" rel="noopener noreferrer">Black Libary</a> books in a spoiler free order and in a mildly cronological order. It also aims to help you keep track of which you have read.</p>
                
                <h4 className='text-lg font-bold'>Special thanks</h4>
                <p>I would like to thank the <a href="https://www.blacklibrary.com/" className='underline' target="_blank" rel="noopener noreferrer">Black Libary</a> for publishing and directing the writting of all of these books.</p>
                
                <p>For helping me with the order of the horus hersey and siege of terra books I would like to thank the <a href="https://www.black-librarium.com/" className='underline' target="_blank" rel="noopener noreferrer">Black Librarium</a>.<a href="https://twitter.com/blacklibrarium" className='inline-block pl-1' target="_blank" rel="noopener noreferrer"><FiTwitter/></a></p>
                
                <p>For providing alot of the information about the books and the order of the Inquistors and Imperial Guard section of books. I would like to thank the <a href="https://wh40k.lexicanum.com/wiki/Main_Page" className='underline' target="_blank" rel="noopener noreferrer">Lexicanum wiki</a>.</p>
            </main>
        </div>
  );
}

export default About;