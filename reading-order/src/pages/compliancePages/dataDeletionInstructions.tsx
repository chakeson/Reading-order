import { Link } from 'react-router-dom';

const DataDeletionInstructions = () => {
    return (
    	<div className="flex items-center flex-col map-height">
            <h3 className='w-5/6 md:w-4/6 lg:w-3/6 pt-6 sm:pt-10 pb-2 text-3xl font-bold'>Data Deletion Instructions</h3>
            <main className='w-5/6 md:w-4/6 lg:w-3/6 text-lg pb-2'>
                <p>Start by loggin in <Link to="/login" className='underline'>here</Link>. Then go to the <Link to="/account" className='underline'>account page</Link>. Click on the red <Link to="/login" className='underline'>"Delete Account"</Link> button. A confirmation modal will pop up, follow it's instructions and press the "Delete Account". This will start the deletion and should send you to a confirmation page. The account and all it's data is now deleted.</p>
            </main>
        </div>
    )
}


export default DataDeletionInstructions;