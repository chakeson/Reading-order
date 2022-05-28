import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../context';
import ReadingProgressVisualiser from './readingProgressVisualiser';

// Show login and register based on if user is signed in or not.
// Show reading progress if user is signed in.

function Home() {
    const { isSignedIn } = useGlobalContext();


    return (
        <div className='w-full flex justify-center'>
        <main className='grid grid-cols-1 md:grid-cols-2 w-5/6 md:w-4/6 lg:w-3/6'>
            <div className='md:col-span-2'>
                <h1>Black Library Reading order guides</h1>
                <p>The black libarary books can be many and it can be confusing at times to keep track of what you have read or listened to. Aswell in what order to read it as to avoid spoilers. Thus far this is most pressing with the horus heresy series with over 60 main books and many short stories.</p>
            </div>

            <div className={`${isSignedIn?"justify-self-center md:col-span-2":""}`}>
                <ReadingProgressVisualiser/>
            </div>
            
            {!isSignedIn && 
            <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>}
        
        </main>
        </div>
    );
}

export default Home;