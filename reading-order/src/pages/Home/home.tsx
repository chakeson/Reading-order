import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../context';
import ReadingProgressVisualiser from './readingProgressVisualiser';

// Show login and register based on if user is signed in or not.
// Show reading progress if user is signed in.

function Home() {
    const { isSignedIn } = useGlobalContext();


    return (
        <div className='w-full flex justify-center pt-6 sm:pt-10 map-height'>
        <div className='flex justify-center items-start '>
        <main className='grid gap-5 grid-cols-1 md:grid-cols-2 w-5/6 md:w-4/6 lg:w-3/6'>
            <div className='md:col-span-2'>
                <h1 className='font-bold text-3xl'>Black Library reading order guides</h1>
                <p className='text-lg'>The black libarary books can be many and it can be confusing at times to keep track of what you have read and in what order to read them to avoid spoilers. This website seeks to help you keep track of it all and in what order to read them.</p>
            </div>

            <div className={`${isSignedIn?"justify-self-center md:col-span-2":"col-span-2"}`}>
                <ReadingProgressVisualiser/>
            </div>
            
            {!isSignedIn && 
            <div className='flex flex-col col-span-2'>
                <p><Link to="/login" className='underline font-semibold'>Login</Link> or <Link to="/register" className='underline font-semibold'>Register</Link> to save your reading progress</p>
            </div>}
        
        </main>
        </div>
        </div>
    );
}

export default Home;