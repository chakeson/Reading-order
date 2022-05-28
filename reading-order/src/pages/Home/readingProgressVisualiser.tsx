import { useGlobalContext } from '../../context';
import { Link } from 'react-router-dom';


function ReadingProgressVisualiser() {
    const { readingProgress } = useGlobalContext();

    const bookNames = { "horusHeresy":"Horus Heresy","inquisitors":"Inquisitors","imperialGuard":"Imperial Guard"};
    const bookCount = { "horusHeresy":257,"inquisitors":27,"imperialGuard":40};

    return (  
        <>
        <h2 className='text-xl font-semibold pb-1'>Reading progress</h2>
        { Object.keys(bookNames).map(function(key, index) {
            var procentageProgress = (readingProgress[key as keyof typeof bookNames].reduce((a:number,b:number)=>a+b,0)/bookCount[key as keyof typeof bookNames]*100);
            procentageProgress = Math.round(procentageProgress);

            return <div key={index+"progress"} className="flex flex-col pb-2">
                        <div className='flex flex-row justify-between'>
                            <Link to={`/${key.toLowerCase()}`} className="underline font-medium">{bookNames[key as keyof typeof bookNames]}</Link>
                            <div className='text-black text-opacity-70'>{readingProgress[key as keyof typeof bookNames].reduce((a:number,b:number)=>a+b,0)}/{bookCount[key as keyof typeof bookNames]}</div>
                        </div>
                        <div className='rounded-md bg-map shodow-inner-sm shadow-black'>
                            <div className={`rounded-l-md bg-blue2 text-center shodow-bar  ${procentageProgress>0?"text-white":"text-black"}`} style={{width:(procentageProgress.toString()+"%")}} role="progressbar" aria-valuenow={procentageProgress} aria-valuemin={0} aria-valuemax={100}>{procentageProgress}%</div>
                        </div>
                    </div>
            })
        }
        </>
    );
}

export default ReadingProgressVisualiser;